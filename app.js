// ── Bowl Configuration ──────────────────────────────────────────────
const BOWLS = {
    A: { name: "Bowl A", capacity: 575, group: "575 gal" },
    B: { name: "Bowl B", capacity: 575, group: "575 gal" },
    E: { name: "Bowl E", capacity: 230, group: "230 gal" },
    F: { name: "Bowl F", capacity: 230, group: "230 gal" },
    C: { name: "Bowl C", capacity: 1120, group: "1,120 gal" },
    D: { name: "Bowl D", capacity: 1120, group: "1,120 gal" },
    G: { name: "Bowl G", capacity: 1120, group: "1,120 gal" },
    H: { name: "Bowl H", capacity: 1120, group: "1,120 gal" },
    I: { name: "Bowl I", capacity: 1120, group: "1,120 gal" },
    "The Hull": { name: "The Hull", capacity: 2920, group: "2,920 gal" },
    "Thors Hammer": { name: "Thor's Hammer", capacity: 2920, group: "2,920 gal" },
    "TTT": { name: "TTT", capacity: 4300, group: "4,300 gal" },
    "Stubby": { name: "Stubby", capacity: 30, group: "30 gal" },
    "Ol Iron Sides": { name: "Ol' Iron Sides", capacity: null, group: "Ribbon Mixer" },
};

// Display order for the lanes
const BOWL_ORDER = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "The Hull", "Thors Hammer", "TTT", "Stubby", "Ol Iron Sides"];

// Status flow configuration
const STATUS_FLOW = ["queued", "mixing", "mixing_complete", "pouring", "batch_complete"];
const STATUS_LABELS = {
    queued: "QUEUED",
    mixing: "MIXING",
    mixing_complete: "MIXING COMPLETE",
    pouring: "POURING",
    batch_complete: "BATCH COMPLETE",
};
const STATUS_NEXT_ACTION = {
    queued: { label: "Start Mixing", next: "mixing" },
    mixing: { label: "Mixing Complete", next: "mixing_complete" },
    mixing_complete: { label: "Start Pouring", next: "pouring" },
    pouring: { label: "Batch Complete", next: "batch_complete" },
};

// Packaging sizes in gallons and their unit names
const PACKAGING = {
    "Quart Bottles":    { gallons: 0.25, unit: "Bottles" },
    "24 Oz. Jars":      { gallons: 24 / 128, unit: "Jars" },
    "1 Gallon Jugs":    { gallons: 1, unit: "Jugs" },
    "1 Gallon Pails":   { gallons: 1, unit: "Pails" },
    "4.5 Gallon Pails": { gallons: 4.5, unit: "Pails" },
    "5 Gallon Pails":   { gallons: 5, unit: "Pails" },
    "30 Gallon Kegs":   { gallons: 30, unit: "Kegs" },
    "55 Gallon Drums":  { gallons: 55, unit: "Drums" },
    "275 Gallon Totes": { gallons: 275, unit: "Totes" },
};

// ── Firebase Reference ──────────────────────────────────────────────
const batchesRef = db.ref("batches");
const batchCounterRef = db.ref("meta/batchCounter");
const recycledNumbersRef = db.ref("meta/recycledNumbers");

// ── State ───────────────────────────────────────────────────────────
let batches = [];
let undoStack = []; // stores { id, prevStatus } for admin undo
let operatorUndoStack = []; // separate undo stack for operator
const MAX_UNDO = 20;
let isAdmin = sessionStorage.getItem("adminMode") === "true";
let isOperator = sessionStorage.getItem("operatorMode") === "true";
let activeTab = "active"; // "active" or "completed"
const board = document.getElementById("board");
const adminToggleBtn = document.getElementById("admin-toggle-btn");
const undoBtn = document.getElementById("undo-btn");
const tabActive = document.getElementById("tab-active");
const tabCompleted = document.getElementById("tab-completed");
const completedBoard = document.getElementById("completed-board");

// ── Admin Mode ──────────────────────────────────────────────────────

function updateAdminUI() {
    const adminElements = document.querySelectorAll(".admin-only");
    if (isAdmin) {
        adminToggleBtn.textContent = "Logout Admin";
        adminToggleBtn.classList.add("admin-active");
        adminToggleBtn.classList.remove("operator-active");
        adminElements.forEach((el) => el.classList.remove("hidden"));
        document.body.classList.add("admin-mode");
        document.body.classList.remove("operator-mode");
    } else if (isOperator) {
        adminToggleBtn.textContent = "Logout Operator";
        adminToggleBtn.classList.remove("admin-active");
        adminToggleBtn.classList.add("operator-active");
        adminElements.forEach((el) => el.classList.add("hidden"));
        document.body.classList.remove("admin-mode");
        document.body.classList.add("operator-mode");
    } else {
        adminToggleBtn.textContent = "Login";
        adminToggleBtn.classList.remove("admin-active");
        adminToggleBtn.classList.remove("operator-active");
        adminElements.forEach((el) => el.classList.add("hidden"));
        document.body.classList.remove("admin-mode");
        document.body.classList.remove("operator-mode");
    }
    render();
}

adminToggleBtn.addEventListener("click", () => {
    if (isAdmin || isOperator) {
        // Log out of whichever role
        isAdmin = false;
        isOperator = false;
        sessionStorage.removeItem("adminMode");
        sessionStorage.removeItem("operatorMode");
        updateAdminUI();
    } else {
        // Prompt for password
        const pw = prompt("Enter password:");
        if (pw === ADMIN_PASSWORD) {
            isAdmin = true;
            isOperator = false;
            sessionStorage.setItem("adminMode", "true");
            sessionStorage.removeItem("operatorMode");
            updateAdminUI();
        } else if (pw === OPERATOR_PASSWORD) {
            isOperator = true;
            isAdmin = false;
            sessionStorage.setItem("operatorMode", "true");
            sessionStorage.removeItem("adminMode");
            updateAdminUI();
        } else if (pw !== null) {
            alert("Incorrect password.");
        }
    }
});

// Initialize admin UI on load
updateAdminUI();

// ── Tab Switching ───────────────────────────────────────────────────
tabActive.addEventListener("click", () => {
    activeTab = "active";
    tabActive.classList.add("tab-selected");
    tabCompleted.classList.remove("tab-selected");
    board.classList.remove("hidden");
    completedBoard.classList.add("hidden");
    updateCompletedCount();
});

tabCompleted.addEventListener("click", () => {
    activeTab = "completed";
    tabCompleted.classList.add("tab-selected");
    tabActive.classList.remove("tab-selected");
    board.classList.add("hidden");
    completedBoard.classList.remove("hidden");
    renderCompleted();
});

function updateCompletedCount() {
    const count = batches.filter((b) => b.status === "batch_complete").length;
    const badge = document.getElementById("completed-count");
    badge.textContent = count;
    badge.classList.toggle("hidden", count === 0);
}

// ── Undo Button ─────────────────────────────────────────────────────
function getActiveUndoStack() {
    if (isAdmin) return undoStack;
    if (isOperator) return operatorUndoStack;
    return [];
}

function updateUndoBtn() {
    if (undoBtn) {
        const stack = getActiveUndoStack();
        undoBtn.classList.toggle("hidden", (!isAdmin && !isOperator) || stack.length === 0);
    }
}

undoBtn.addEventListener("click", () => {
    const stack = getActiveUndoStack();
    if ((!isAdmin && !isOperator) || stack.length === 0) return;
    const action = stack.pop();
    const batch = batches.find((b) => b.id === action.id);
    if (batch) {
        batch.status = action.prevStatus;
        batchesRef.child(action.id).update({ status: action.prevStatus });
    }
    updateUndoBtn();
});

// Migrate any existing localStorage data into Firebase (one-time)
function migrateLocalStorage() {
    try {
        const raw = localStorage.getItem("colorDeptBatches");
        if (raw) {
            const oldBatches = JSON.parse(raw);
            if (oldBatches.length > 0) {
                const updates = {};
                for (const batch of oldBatches) {
                    updates[batch.id] = batch;
                }
                batchesRef.update(updates);
                localStorage.removeItem("colorDeptBatches");
            }
        }
    } catch {
        // ignore migration errors
    }
}

// ── Initial Render ──────────────────────────────────────────────────
// Warn if opened as a local file (Firebase won't work)
if (window.location.protocol === "file:") {
    const warn = document.createElement("div");
    warn.style.cssText = "background:#fff3cd;color:#856404;padding:16px 24px;font-weight:600;text-align:center;border-bottom:2px solid #ffc107;";
    warn.textContent = "This app must be served over HTTP (not file://). Use a local server or deploy to GitHub Pages.";
    document.body.prepend(warn);
}

// Render immediately so the board shows even before Firebase connects
render();

// ── Real-Time Listener ──────────────────────────────────────────────
// This fires immediately with current data, then again on every change
// from ANY device/tab connected to this Firebase project.
batchesRef.on("value", (snapshot) => {
    const data = snapshot.val();
    batches = data ? Object.values(data) : [];
    // Migrate old "complete" status to new name and persist
    const migrations = {};
    for (const batch of batches) {
        if (batch.status === "complete") {
            batch.status = "batch_complete";
            migrations[batch.id + "/status"] = "batch_complete";
        }
    }
    if (Object.keys(migrations).length > 0) {
        batchesRef.update(migrations);
    }

    // Assign batch numbers to any batches that don't have one
    const missingNumbers = batches
        .filter((b) => !b.batchNumber)
        .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    if (missingNumbers.length > 0) {
        batchCounterRef.transaction((current) => {
            return (current || 0) + missingNumbers.length;
        }, (error, committed, snapshot) => {
            if (error || !committed) return;
            const endNum = snapshot.val();
            const startNum = endNum - missingNumbers.length + 1;
            const updates = {};
            missingNumbers.forEach((batch, i) => {
                const num = startNum + i;
                const batchNumber = "A" + String(num).padStart(4, "0");
                batch.batchNumber = batchNumber;
                updates[batch.id + "/batchNumber"] = batchNumber;
            });
            batchesRef.update(updates);
        });
    }
    render();
    updateCompletedCount();
    if (activeTab === "completed") renderCompleted();
}, (error) => {
    console.error("Firebase connection error:", error);
    // Show error to user
    const errDiv = document.createElement("div");
    errDiv.style.cssText = "background:#fee;color:#c00;padding:16px 24px;font-weight:600;text-align:center;border-bottom:2px solid #c00;";
    errDiv.textContent = "Firebase error: " + error.message + " — Check your database rules in the Firebase console.";
    document.body.prepend(errDiv);
});

// Run migration after listener is set up
migrateLocalStorage();

// ── Save to Firebase ────────────────────────────────────────────────
function saveBatches() {
    const updates = {};
    for (const batch of batches) {
        updates[batch.id] = batch;
    }
    batchesRef.set(updates);
}

// ── Drag & Drop State ───────────────────────────────────────────────
let draggedId = null;

// ── Rendering ───────────────────────────────────────────────────────
function render() {
    board.innerHTML = "";

    for (const bowlKey of BOWL_ORDER) {
        const bowl = BOWLS[bowlKey];
        const lane = document.createElement("div");
        lane.className = "lane";
        lane.dataset.bowl = bowlKey;

        // Lane header
        const header = document.createElement("div");
        header.className = "lane-header";
        header.innerHTML = `
            <span class="lane-name">${bowl.name}</span>
            <span class="lane-capacity">${bowl.capacity ? bowl.capacity.toLocaleString() + " gal" : bowl.group}</span>
        `;
        lane.appendChild(header);

        // Drop zone container
        const dropZone = document.createElement("div");
        dropZone.className = "drop-zone";
        dropZone.dataset.bowl = bowlKey;

        // Only allow dropping if admin
        if (isAdmin) {
            dropZone.addEventListener("dragover", handleDragOver);
            dropZone.addEventListener("drop", handleDrop);
            dropZone.addEventListener("dragenter", handleDragEnter);
            dropZone.addEventListener("dragleave", handleDragLeave);
        }

        // Get active batches for this bowl (not batch_complete)
        const laneBatches = batches
            .filter((b) => b.bowl === bowlKey && b.status !== "batch_complete")
            .sort((a, b) => {
                const orderA = a.sortOrder != null ? a.sortOrder : a.createdAt;
                const orderB = b.sortOrder != null ? b.sortOrder : b.createdAt;
                return orderA - orderB;
            });

        if (laneBatches.length === 0) {
            const empty = document.createElement("div");
            empty.className = "batch-card empty";
            empty.textContent = "No batches";
            dropZone.appendChild(empty);
        }

        for (const batch of laneBatches) {
            dropZone.appendChild(createBatchCard(batch));
        }

        lane.appendChild(dropZone);
        board.appendChild(lane);
    }

    updateUndoBtn();
}

// ── Completed Tab: Table / Chart / Export ────────────────────────────
let completedView = "table"; // "table" or "chart"
let completedChart = null;

const viewTableBtn = document.getElementById("view-table-btn");
const viewChartBtn = document.getElementById("view-chart-btn");
const exportExcelBtn = document.getElementById("export-excel-btn");
const completedTableWrap = document.getElementById("completed-table-wrap");
const completedChartWrap = document.getElementById("completed-chart-wrap");

viewTableBtn.addEventListener("click", () => {
    completedView = "table";
    viewTableBtn.classList.add("view-btn-active");
    viewChartBtn.classList.remove("view-btn-active");
    completedTableWrap.classList.remove("hidden");
    completedChartWrap.classList.add("hidden");
});

viewChartBtn.addEventListener("click", () => {
    if (isOperator) return; // operators can't access charts
    completedView = "chart";
    viewChartBtn.classList.add("view-btn-active");
    viewTableBtn.classList.remove("view-btn-active");
    completedChartWrap.classList.remove("hidden");
    completedTableWrap.classList.add("hidden");
});

exportExcelBtn.addEventListener("click", exportToExcel);

function getCompletedRows() {
    return batches
        .filter((b) => b.status === "batch_complete")
        .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
        .map((batch) => {
            const bowlInfo = BOWLS[batch.bowl];
            const bowlName = bowlInfo ? bowlInfo.name : batch.bowl;
            const bowlCap = bowlInfo ? bowlInfo.capacity : null;
            const fmtTs = (ts) => ts ? new Date(ts).toLocaleString() : "—";
            return {
                batchNumber: batch.batchNumber || "",
                product: batch.product,
                bowl: bowlName,
                capacity: bowlCap ? bowlCap.toLocaleString() + " gal" : "N/A",
                capacityNum: bowlCap || 0,
                packaging: batch.packaging || "",
                unitCount: batch.unitCount || "",
                viscosity: batch.viscosity || "",
                initials: batch.initials || "",
                pouredBy: batch.pouredBy || "",
                notes: batch.notes || "",
                queuedAt: fmtTs(batch.createdAt),
                mixingStarted: fmtTs(batch.startedAt),
                mixingComplete: fmtTs(batch.mixingCompleteAt),
                pouringStarted: fmtTs(batch.pouringAt),
                batchComplete: fmtTs(batch.completedAt),
                completedAt: batch.completedAt || 0,
                id: batch.id,
            };
        });
}

function renderCompleted() {
    const rows = getCompletedRows();
    const tbody = document.getElementById("completed-table-body");
    const toolbar = document.querySelector(".completed-toolbar");

    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="16" class="completed-empty">No completed batches</td></tr>`;
        if (toolbar) toolbar.classList.add("hidden");
        if (completedChart) { completedChart.destroy(); completedChart = null; }
        return;
    }

    if (toolbar) toolbar.classList.remove("hidden");

    // Hide chart controls for operators
    const viewToggle = document.querySelector(".view-toggle");
    if (viewToggle) {
        viewToggle.classList.toggle("hidden", isOperator && !isAdmin);
    }
    if (isOperator && !isAdmin) {
        // Force table view for operators
        completedView = "table";
        viewTableBtn.classList.add("view-btn-active");
        viewChartBtn.classList.remove("view-btn-active");
        completedTableWrap.classList.remove("hidden");
        completedChartWrap.classList.add("hidden");
    }

    tbody.innerHTML = rows.map((r, i) => `
        <tr>
            <td>${i + 1}</td>
            <td class="batch-num-cell">${escapeHtml(r.batchNumber) || "—"}</td>
            <td>${escapeHtml(r.product)}</td>
            <td>${escapeHtml(r.bowl)}</td>
            <td>${r.capacity}</td>
            <td>${escapeHtml(r.packaging)}</td>
            <td>${r.unitCount ? Number(r.unitCount).toLocaleString() : "—"}</td>
            <td>${r.viscosity ? escapeHtml(r.viscosity) + " KU" : "—"}</td>
            <td>${escapeHtml(r.initials) || "—"}</td>
            <td>${escapeHtml(r.pouredBy) || "—"}</td>
            <td>${escapeHtml(r.notes) || "—"}</td>
            <td class="completed-time-cell">${r.queuedAt}</td>
            <td class="completed-time-cell">${r.mixingStarted}</td>
            <td class="completed-time-cell">${r.mixingComplete}</td>
            <td class="completed-time-cell">${r.pouringStarted}</td>
            <td class="completed-time-cell">${r.batchComplete}${isAdmin ? ` <button class="btn btn-sm btn-delete" data-action="delete" data-id="${r.id}">&times;</button>` : ""}</td>
        </tr>
    `).join("");

}

// ── Chart View ──────────────────────────────────────────────────────
const compounderSelect = document.getElementById("compounder-select");
const compounderStatsDiv = document.getElementById("compounder-stats");
const chartResults = document.getElementById("chart-results");
const chartPlaceholder = document.getElementById("chart-placeholder");
const chartSearchBtn = document.getElementById("chart-search-btn");
const chartDateFrom = document.getElementById("chart-date-from");
const chartDateTo = document.getElementById("chart-date-to");
let dailyChart = null;
let timelineChart = null;
let comparisonChart = null;

chartSearchBtn.addEventListener("click", renderCharts);

function getFilteredRows() {
    let rows = getCompletedRows();
    const from = chartDateFrom.value;
    const to = chartDateTo.value;
    const compounder = compounderSelect.value;

    if (from) {
        const [y, m, d] = from.split("-").map(Number);
        const fromTs = new Date(y, m - 1, d, 0, 0, 0, 0).getTime();
        rows = rows.filter((r) => r.completedAt >= fromTs);
    }
    if (to) {
        const [y, m, d] = to.split("-").map(Number);
        const toTs = new Date(y, m - 1, d, 23, 59, 59, 999).getTime();
        rows = rows.filter((r) => r.completedAt <= toTs);
    }
    if (compounder) {
        rows = rows.filter((r) => r.initials === compounder);
    }
    return rows;
}

function renderCharts() {
    const rows = getFilteredRows();
    const selectedCompounder = compounderSelect.value;

    chartPlaceholder.classList.add("hidden");
    chartResults.classList.remove("hidden");

    // Stats
    if (rows.length > 0) {
        const totalBatches = rows.length;
        const totalGallons = rows.reduce((sum, r) => sum + r.capacityNum, 0);
        compounderStatsDiv.innerHTML = `
            <div class="stat-card">
                <span class="stat-value">${totalBatches}</span>
                <span class="stat-label">Batches</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${totalGallons.toLocaleString()}</span>
                <span class="stat-label">Total Gallons</span>
            </div>
        `;
    } else {
        const who = selectedCompounder || "this range";
        compounderStatsDiv.innerHTML = `<p style="color:#999;font-style:italic;">No completed batches for ${who}</p>`;
    }

    // Destroy old charts
    if (dailyChart) dailyChart.destroy();
    if (completedChart) completedChart.destroy();
    if (timelineChart) timelineChart.destroy();
    if (comparisonChart) comparisonChart.destroy();

    if (rows.length === 0) return;

    // Group by day
    const dayMap = {};
    for (const r of rows) {
        const day = new Date(r.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (!dayMap[day]) dayMap[day] = { count: 0, gallons: 0 };
        dayMap[day].count++;
        dayMap[day].gallons += r.capacityNum;
    }
    const dayLabels = Object.keys(dayMap);
    const dayCounts = dayLabels.map((d) => dayMap[d].count);
    const dayGallons = dayLabels.map((d) => dayMap[d].gallons);

    const dailyTitle = selectedCompounder
        ? `Daily — ${selectedCompounder}`
        : "Daily — All Compounders";

    dailyChart = new Chart(document.getElementById("daily-chart").getContext("2d"), {
        type: "bar",
        data: {
            labels: dayLabels,
            datasets: [
                { label: "Batches", data: dayCounts, backgroundColor: "rgba(39,174,96,0.7)", borderColor: "#27ae60", borderWidth: 1 },
                { label: "Gallons", data: dayGallons, backgroundColor: "rgba(52,152,219,0.5)", borderColor: "#3498db", borderWidth: 1, yAxisID: "y1" },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: dailyTitle, font: { size: 13 } }, legend: { labels: { boxWidth: 12, font: { size: 11 } } } },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, title: { display: true, text: "Batches", font: { size: 11 } } },
                y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, ticks: { font: { size: 10 } }, title: { display: true, text: "Gallons", font: { size: 11 } } },
            },
        },
    });

    // Bowl breakdown chart
    const bowlMap = {};
    for (const r of rows) {
        if (!bowlMap[r.bowl]) bowlMap[r.bowl] = { count: 0, gallons: r.capacityNum };
        bowlMap[r.bowl].count++;
    }
    const bowlLabels = Object.keys(bowlMap);
    const bowlCounts = bowlLabels.map((l) => bowlMap[l].count);
    const bowlGallons = bowlLabels.map((l) => bowlMap[l].gallons * bowlMap[l].count);

    const bowlTitle = selectedCompounder
        ? `By Bowl — ${selectedCompounder}`
        : "By Bowl — All Compounders";

    completedChart = new Chart(document.getElementById("completed-chart").getContext("2d"), {
        type: "bar",
        data: {
            labels: bowlLabels,
            datasets: [
                { label: "Batches", data: bowlCounts, backgroundColor: "rgba(39,174,96,0.7)", borderColor: "#27ae60", borderWidth: 1 },
                { label: "Gallons", data: bowlGallons, backgroundColor: "rgba(52,152,219,0.5)", borderColor: "#3498db", borderWidth: 1, yAxisID: "y1" },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: bowlTitle, font: { size: 13 } }, legend: { labels: { boxWidth: 12, font: { size: 11 } } } },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, title: { display: true, text: "Batches", font: { size: 11 } } },
                y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, ticks: { font: { size: 10 } }, title: { display: true, text: "Gallons", font: { size: 11 } } },
            },
        },
    });

    // Timeline line chart — cumulative batches/gallons over days
    const sortedDays = Object.keys(dayMap).slice().sort((a, b) => {
        return new Date(a + " 2026").getTime() - new Date(b + " 2026").getTime();
    });
    let cumBatches = 0;
    let cumGallons = 0;
    const cumBatchData = sortedDays.map((d) => { cumBatches += dayMap[d].count; return cumBatches; });
    const cumGallonData = sortedDays.map((d) => { cumGallons += dayMap[d].gallons; return cumGallons; });

    const timelineTitle = selectedCompounder
        ? `Production Flow — ${selectedCompounder}`
        : "Production Flow — All";

    timelineChart = new Chart(document.getElementById("timeline-chart").getContext("2d"), {
        type: "line",
        data: {
            labels: sortedDays,
            datasets: [
                { label: "Cumulative Batches", data: cumBatchData, borderColor: "#27ae60", backgroundColor: "rgba(39,174,96,0.1)", fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2 },
                { label: "Cumulative Gallons", data: cumGallonData, borderColor: "#3498db", backgroundColor: "rgba(52,152,219,0.1)", fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2, yAxisID: "y1" },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: timelineTitle, font: { size: 13 } }, legend: { labels: { boxWidth: 12, font: { size: 11 } } } },
            scales: {
                y: { beginAtZero: true, ticks: { font: { size: 10 } }, title: { display: true, text: "Batches", font: { size: 11 } } },
                y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, ticks: { font: { size: 10 } }, title: { display: true, text: "Gallons", font: { size: 11 } } },
            },
        },
    });

    // Compounder comparison — get ALL rows in date range (ignore compounder filter)
    let allRows = getCompletedRows();
    const from = chartDateFrom.value;
    const to = chartDateTo.value;
    if (from) {
        const [fy, fm, fd] = from.split("-").map(Number);
        const fromTs = new Date(fy, fm - 1, fd, 0, 0, 0, 0).getTime();
        allRows = allRows.filter((r) => r.completedAt >= fromTs);
    }
    if (to) {
        const [ty, tm, td] = to.split("-").map(Number);
        const toTs = new Date(ty, tm - 1, td, 23, 59, 59, 999).getTime();
        allRows = allRows.filter((r) => r.completedAt <= toTs);
    }

    const compMap = {};
    for (const r of allRows) {
        const name = r.initials || "Unknown";
        if (!compMap[name]) compMap[name] = { batches: 0, gallons: 0 };
        compMap[name].batches++;
        compMap[name].gallons += r.capacityNum;
    }

    const compNames = Object.keys(compMap).sort((a, b) => compMap[b].batches - compMap[a].batches);
    const compBatches = compNames.map((n) => compMap[n].batches);
    const compGallons = compNames.map((n) => compMap[n].gallons);

    // Highlight selected compounder
    const compColors = compNames.map((n) => n === selectedCompounder ? "rgba(233,69,96,0.8)" : "rgba(39,174,96,0.6)");
    const compGalColors = compNames.map((n) => n === selectedCompounder ? "rgba(233,69,96,0.4)" : "rgba(52,152,219,0.5)");

    comparisonChart = new Chart(document.getElementById("comparison-chart").getContext("2d"), {
        type: "bar",
        data: {
            labels: compNames,
            datasets: [
                { label: "Batches", data: compBatches, backgroundColor: compColors, borderWidth: 0 },
                { label: "Gallons", data: compGallons, backgroundColor: compGalColors, borderWidth: 0, yAxisID: "y1" },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: "Compounder Comparison", font: { size: 13 } }, legend: { labels: { boxWidth: 12, font: { size: 11 } } } },
            scales: {
                x: { beginAtZero: true, ticks: { font: { size: 10 } }, title: { display: true, text: "Batches", font: { size: 11 } } },
                y: { ticks: { font: { size: 10 } } },
                y1: { display: false },
            },
        },
    });
}

function exportToExcel() {
    const rows = getCompletedRows();
    if (rows.length === 0) { alert("No completed batches to export."); return; }

    const data = rows.map((r, i) => ({
        "#": i + 1,
        "Batch #": r.batchNumber || "N/A",
        "Product": r.product,
        "Bowl": r.bowl,
        "Bowl Capacity": r.capacity,
        "Packaging": r.packaging,
        "Unit Count": r.unitCount || "N/A",
        "Viscosity (KU)": r.viscosity || "N/A",
        "Mixed By": r.initials || "N/A",
        "Poured By": r.pouredBy || "N/A",
        "Notes": r.notes || "",
        "Queued": r.queuedAt,
        "Mixing Started": r.mixingStarted,
        "Mixing Complete": r.mixingComplete,
        "Pouring Started": r.pouringStarted,
        "Batch Complete": r.batchComplete,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // Auto-size columns
    const colWidths = Object.keys(data[0]).map((key) => {
        const maxLen = Math.max(key.length, ...data.map((r) => String(r[key]).length));
        return { wch: maxLen + 2 };
    });
    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Completed Batches");

    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `Completed_Batches_${today}.xlsx`);
}

function createBatchCard(batch) {
    const card = document.createElement("div");
    card.className = `batch-card status-${batch.status}`;
    card.dataset.id = batch.id;

    // Only make draggable if admin
    if (isAdmin) {
        card.draggable = true;
        card.addEventListener("dragstart", handleDragStart);
        card.addEventListener("dragend", handleDragEnd);
    }

    const statusLabel = STATUS_LABELS[batch.status] || batch.status.toUpperCase();

    let packagingDisplay = "";
    if (batch.packaging) {
        packagingDisplay = `<span class="card-packaging">${escapeHtml(batch.packaging)}</span>`;
    }
    if (batch.unitCount) {
        packagingDisplay += `<span class="card-packaging">${Number(batch.unitCount).toLocaleString()} units</span>`;
    }

    // Show action buttons based on role
    let actionsHtml = "";
    const nextAction = STATUS_NEXT_ACTION[batch.status];
    const nextBtnClass = batch.status === "queued" ? "btn-start-mixing"
        : batch.status === "mixing" ? "btn-mixing-complete"
        : batch.status === "mixing_complete" ? "btn-pouring"
        : batch.status === "pouring" ? "btn-batch-complete"
        : "";
    if (isAdmin) {
        actionsHtml = `
            <div class="card-actions">
                ${nextAction ? `<button class="btn btn-sm ${nextBtnClass}" data-action="advance" data-id="${batch.id}">${nextAction.label}</button>` : ""}
                <button class="btn btn-sm btn-edit" data-action="edit" data-id="${batch.id}">Edit</button>
                <button class="btn btn-sm btn-delete" data-action="delete" data-id="${batch.id}">&times;</button>
            </div>
        `;
    } else if (isOperator) {
        // Operators can only advance status (click through steps)
        actionsHtml = nextAction ? `
            <div class="card-actions">
                <button class="btn btn-sm ${nextBtnClass}" data-action="advance" data-id="${batch.id}">${nextAction.label}</button>
            </div>
        ` : "";
    }

    let extraInfo = "";
    if (batch.viscosity) extraInfo += `<span class="card-viscosity">Viscosity: ${escapeHtml(batch.viscosity)} KU</span>`;
    if (batch.initials) extraInfo += `<span class="card-initials">Mixed: ${escapeHtml(batch.initials)}</span>`;
    if (batch.pouredBy) extraInfo += `<span class="card-poured-by">Poured: ${escapeHtml(batch.pouredBy)}</span>`;

    const batchNumDisplay = batch.batchNumber ? `<span class="card-batch-number">${escapeHtml(batch.batchNumber)}</span>` : "";

    card.innerHTML = `
        <div class="card-top">
            <span class="card-product">${batchNumDisplay}${escapeHtml(batch.product)}</span>
            <span class="card-status">${statusLabel}</span>
        </div>
        <div class="card-details">
            ${packagingDisplay}
            ${extraInfo}
            ${batch.notes ? `<span class="card-notes">${escapeHtml(batch.notes)}</span>` : ""}
        </div>
        ${actionsHtml}
    `;

    return card;
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ── Drag & Drop Handlers ────────────────────────────────────────────
function handleDragStart(e) {
    if (!isAdmin) return;
    draggedId = e.target.dataset.id;
    e.target.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
    draggedId = null;
    document.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
    document.querySelectorAll(".drop-indicator").forEach((el) => el.remove());
}

function handleDragOver(e) {
    if (!isAdmin) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const dropZone = e.currentTarget;
    const draggingCard = document.querySelector(".dragging");
    if (!draggingCard) return;

    const afterElement = getDragAfterElement(dropZone, e.clientY);

    dropZone.querySelectorAll(".drop-indicator").forEach((el) => el.remove());

    const indicator = document.createElement("div");
    indicator.className = "drop-indicator";

    if (afterElement) {
        dropZone.insertBefore(indicator, afterElement);
    } else {
        dropZone.appendChild(indicator);
    }
}

function handleDragEnter(e) {
    if (!isAdmin) return;
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
}

function handleDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove("drag-over");
        e.currentTarget.querySelectorAll(".drop-indicator").forEach((el) => el.remove());
    }
}

function handleDrop(e) {
    if (!isAdmin) return;
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove("drag-over");
    dropZone.querySelectorAll(".drop-indicator").forEach((el) => el.remove());

    if (!draggedId) return;

    const targetBowl = dropZone.dataset.bowl;
    const batch = batches.find((b) => b.id === draggedId);
    if (!batch) return;

    batch.bowl = targetBowl;

    const afterElement = getDragAfterElement(dropZone, e.clientY);
    const laneBatches = batches
        .filter((b) => b.bowl === targetBowl && b.id !== draggedId)
        .sort((a, b) => {
            const orderA = a.sortOrder != null ? a.sortOrder : a.createdAt;
            const orderB = b.sortOrder != null ? b.sortOrder : b.createdAt;
            return orderA - orderB;
        });

    let insertIndex = laneBatches.length;
    if (afterElement) {
        const afterId = afterElement.dataset.id;
        insertIndex = laneBatches.findIndex((b) => b.id === afterId);
        if (insertIndex === -1) insertIndex = laneBatches.length;
    }

    laneBatches.splice(insertIndex, 0, batch);
    laneBatches.forEach((b, i) => {
        b.sortOrder = i;
    });

    saveBatches();
}

function getDragAfterElement(dropZone, y) {
    const cards = [...dropZone.querySelectorAll(".batch-card:not(.dragging):not(.empty)")];
    let closest = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    for (const card of cards) {
        const box = card.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closest = card;
        }
    }

    return closest;
}

// ── Touch Drag & Drop ───────────────────────────────────────────────
let touchDragEl = null;
let touchClone = null;
let touchStartY = 0;
let touchStartX = 0;
let touchMoved = false;

board.addEventListener("touchstart", (e) => {
    if (!isAdmin) return;
    const card = e.target.closest(".batch-card:not(.empty)");
    if (!card || e.target.closest("[data-action]")) return;

    touchDragEl = card;
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    touchMoved = false;
}, { passive: true });

board.addEventListener("touchmove", (e) => {
    if (!isAdmin || !touchDragEl) return;

    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (!touchMoved && Math.abs(dy) < 10 && Math.abs(dx) < 10) return;

    touchMoved = true;
    e.preventDefault();

    if (!touchClone) {
        draggedId = touchDragEl.dataset.id;
        touchDragEl.classList.add("dragging");

        touchClone = touchDragEl.cloneNode(true);
        touchClone.classList.add("touch-clone");
        touchClone.style.width = touchDragEl.offsetWidth + "px";
        document.body.appendChild(touchClone);
    }

    touchClone.style.left = e.touches[0].clientX - touchClone.offsetWidth / 2 + "px";
    touchClone.style.top = e.touches[0].clientY - touchClone.offsetHeight / 2 + "px";

    const dropZone = getDropZoneAt(e.touches[0].clientX, e.touches[0].clientY);
    document.querySelectorAll(".drop-indicator").forEach((el) => el.remove());
    document.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));

    if (dropZone) {
        dropZone.classList.add("drag-over");
        const afterElement = getDragAfterElement(dropZone, e.touches[0].clientY);
        const indicator = document.createElement("div");
        indicator.className = "drop-indicator";
        if (afterElement) {
            dropZone.insertBefore(indicator, afterElement);
        } else {
            dropZone.appendChild(indicator);
        }
    }
}, { passive: false });

board.addEventListener("touchend", (e) => {
    if (!touchDragEl) return;

    if (touchClone) {
        const touch = e.changedTouches[0];
        const dropZone = getDropZoneAt(touch.clientX, touch.clientY);

        if (dropZone && draggedId) {
            const targetBowl = dropZone.dataset.bowl;
            const batch = batches.find((b) => b.id === draggedId);
            if (batch) {
                batch.bowl = targetBowl;

                const afterElement = getDragAfterElement(dropZone, touch.clientY);
                const laneBatches = batches
                    .filter((b) => b.bowl === targetBowl && b.id !== draggedId)
                    .sort((a, b) => {
                        const orderA = a.sortOrder != null ? a.sortOrder : a.createdAt;
                        const orderB = b.sortOrder != null ? b.sortOrder : b.createdAt;
                        return orderA - orderB;
                    });

                let insertIndex = laneBatches.length;
                if (afterElement) {
                    const afterId = afterElement.dataset.id;
                    insertIndex = laneBatches.findIndex((b) => b.id === afterId);
                    if (insertIndex === -1) insertIndex = laneBatches.length;
                }

                laneBatches.splice(insertIndex, 0, batch);
                laneBatches.forEach((b, i) => {
                    b.sortOrder = i;
                });

                saveBatches();
            }
        }

        touchClone.remove();
        touchClone = null;
    }

    touchDragEl.classList.remove("dragging");
    touchDragEl = null;
    draggedId = null;
    document.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
    document.querySelectorAll(".drop-indicator").forEach((el) => el.remove());
});

function getDropZoneAt(x, y) {
    if (touchClone) touchClone.style.display = "none";
    const el = document.elementFromPoint(x, y);
    if (touchClone) touchClone.style.display = "";
    if (!el) return null;
    return el.closest(".drop-zone");
}

// ── Actions ─────────────────────────────────────────────────────────
// Handle clicks on both boards
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "advance" && (isAdmin || isOperator)) {
        advanceStatus(id);
    } else if (action === "edit" && isAdmin) {
        openEditModal(id);
    } else if (action === "delete" && isAdmin) {
        deleteBatch(id);
    }
});

function advanceStatus(id) {
    const batch = batches.find((b) => b.id === id);
    if (!batch) return;

    const nextAction = STATUS_NEXT_ACTION[batch.status];
    if (!nextAction) return;

    // If advancing from mixing → mixing_complete, show the viscosity/initials modal
    if (batch.status === "mixing" && nextAction.next === "mixing_complete") {
        showMixingCompleteModal(batch);
        return;
    }

    // If advancing from pouring → batch_complete, show the poured-by modal
    if (batch.status === "pouring" && nextAction.next === "batch_complete") {
        showBatchCompleteModal(batch);
        return;
    }

    applyStatusAdvance(batch, nextAction.next);
}

function applyStatusAdvance(batch, nextStatus) {
    // Push to the active role's undo stack
    const stack = getActiveUndoStack();
    stack.push({ id: batch.id, prevStatus: batch.status });
    if (stack.length > MAX_UNDO) stack.shift();

    const now = Date.now();
    batch.status = nextStatus;

    // Record timestamp for each step
    if (nextStatus === "mixing") batch.startedAt = now;
    if (nextStatus === "mixing_complete") batch.mixingCompleteAt = now;
    if (nextStatus === "pouring") batch.pouringAt = now;
    if (nextStatus === "batch_complete") batch.completedAt = now;

    batchesRef.child(batch.id).update(batch);
    updateUndoBtn();
}

// ── Mixing Complete Modal ────────────────────────────────────────────
const mixingCompleteOverlay = document.getElementById("mixing-complete-overlay");
const mixingCompleteForm = document.getElementById("mixing-complete-form");
let pendingMixingBatchId = null;

function showMixingCompleteModal(batch) {
    pendingMixingBatchId = batch.id;
    document.getElementById("mixing-complete-product").textContent = batch.product;
    document.getElementById("viscosity-input").value = "";
    document.getElementById("initials-input").value = "";
    mixingCompleteOverlay.classList.remove("hidden");
    document.getElementById("viscosity-input").focus();
}

document.getElementById("mixing-complete-cancel").addEventListener("click", () => {
    mixingCompleteOverlay.classList.add("hidden");
    pendingMixingBatchId = null;
});

mixingCompleteOverlay.addEventListener("click", (e) => {
    if (e.target === mixingCompleteOverlay) {
        mixingCompleteOverlay.classList.add("hidden");
        pendingMixingBatchId = null;
    }
});

mixingCompleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!pendingMixingBatchId) return;

    const batch = batches.find((b) => b.id === pendingMixingBatchId);
    if (!batch) return;

    batch.viscosity = document.getElementById("viscosity-input").value.trim();
    batch.initials = document.getElementById("initials-input").value;

    mixingCompleteOverlay.classList.add("hidden");
    applyStatusAdvance(batch, "mixing_complete");
    pendingMixingBatchId = null;
});

// ── Batch Complete Modal ──────────────────────────────────────────────
const batchCompleteOverlay = document.getElementById("batch-complete-overlay");
const batchCompleteForm = document.getElementById("batch-complete-form");
let pendingCompleteBatchId = null;

function showBatchCompleteModal(batch) {
    pendingCompleteBatchId = batch.id;
    document.getElementById("batch-complete-product").textContent = batch.product;
    document.getElementById("poured-by-input").value = "";
    batchCompleteOverlay.classList.remove("hidden");
    document.getElementById("poured-by-input").focus();
}

document.getElementById("batch-complete-cancel").addEventListener("click", () => {
    batchCompleteOverlay.classList.add("hidden");
    pendingCompleteBatchId = null;
});

batchCompleteOverlay.addEventListener("click", (e) => {
    if (e.target === batchCompleteOverlay) {
        batchCompleteOverlay.classList.add("hidden");
        pendingCompleteBatchId = null;
    }
});

batchCompleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!pendingCompleteBatchId) return;

    const batch = batches.find((b) => b.id === pendingCompleteBatchId);
    if (!batch) return;

    batch.pouredBy = document.getElementById("poured-by-input").value.trim();

    batchCompleteOverlay.classList.add("hidden");
    applyStatusAdvance(batch, "batch_complete");
    pendingCompleteBatchId = null;
});

function updateStatus(id, newStatus) {
    const batch = batches.find((b) => b.id === id);
    if (batch) {
        undoStack.push({ id: batch.id, prevStatus: batch.status });
        if (undoStack.length > MAX_UNDO) undoStack.shift();

        const now = Date.now();
        batch.status = newStatus;
        if (newStatus === "mixing") batch.startedAt = now;
        if (newStatus === "mixing_complete") batch.mixingCompleteAt = now;
        if (newStatus === "pouring") batch.pouringAt = now;
        if (newStatus === "batch_complete") batch.completedAt = now;
        batchesRef.child(id).update(batch);
        updateUndoBtn();
    }
}

// ── Edit Batch Modal ─────────────────────────────────────────────────
const editOverlay = document.getElementById("edit-overlay");
const editForm = document.getElementById("edit-form");

function openEditModal(id) {
    const batch = batches.find((b) => b.id === id);
    if (!batch) return;

    document.getElementById("edit-batch-id").value = batch.id;
    document.getElementById("edit-batch-number").textContent = batch.batchNumber || "";
    document.getElementById("edit-product").value = batch.product || "";
    document.getElementById("edit-packaging").value = batch.packaging || "";
    document.getElementById("edit-unit-count").value = batch.unitCount || "";
    document.getElementById("edit-viscosity").value = batch.viscosity || "";
    document.getElementById("edit-initials").value = batch.initials || "";
    document.getElementById("edit-poured-by").value = batch.pouredBy || "";
    document.getElementById("edit-notes").value = batch.notes || "";

    editOverlay.classList.remove("hidden");
    document.getElementById("edit-product").focus();
}

document.getElementById("edit-cancel").addEventListener("click", () => {
    editOverlay.classList.add("hidden");
});

editOverlay.addEventListener("click", (e) => {
    if (e.target === editOverlay) editOverlay.classList.add("hidden");
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("edit-batch-id").value;
    const batch = batches.find((b) => b.id === id);
    if (!batch) return;

    batch.product = document.getElementById("edit-product").value.trim();
    batch.packaging = document.getElementById("edit-packaging").value || null;
    const uc = document.getElementById("edit-unit-count").value.trim();
    batch.unitCount = uc ? Number(uc) : null;
    batch.viscosity = document.getElementById("edit-viscosity").value.trim() || null;
    batch.initials = document.getElementById("edit-initials").value || null;
    batch.pouredBy = document.getElementById("edit-poured-by").value.trim() || null;
    batch.notes = document.getElementById("edit-notes").value.trim() || null;

    batchesRef.child(id).update(batch);
    editOverlay.classList.add("hidden");
});

function deleteBatch(id) {
    const batch = batches.find((b) => b.id === id);
    if (batch && batch.batchNumber) {
        // Recycle the batch number for reuse
        const num = parseInt(batch.batchNumber.slice(1), 10);
        if (!isNaN(num)) {
            recycledNumbersRef.push(num);
        }
    }
    batchesRef.child(id).remove();
}

// ── Modal ───────────────────────────────────────────────────────────
const modalOverlay = document.getElementById("modal-overlay");
const batchForm = document.getElementById("batch-form");

document.getElementById("add-batch-btn").addEventListener("click", () => {
    if (!isAdmin) return;
    modalOverlay.classList.remove("hidden");
    document.getElementById("product-name").focus();
});

document.getElementById("cancel-btn").addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
    batchForm.reset();
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add("hidden");
        batchForm.reset();
    }
});

batchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const product = document.getElementById("product-name").value.trim();
    const bowl = document.getElementById("bowl-select").value;
    const packaging = document.getElementById("batch-packaging").value;
    const unitCountVal = document.getElementById("batch-unit-count").value.trim();
    const notes = document.getElementById("batch-notes").value.trim();

    if (!product || !bowl) return;

    const laneBatches = batches.filter((b) => b.bowl === bowl);
    const maxOrder = laneBatches.reduce((max, b) => {
        const order = b.sortOrder != null ? b.sortOrder : b.createdAt;
        return Math.max(max, order);
    }, -1);

    // Generate batch number — reuse recycled numbers first, then increment counter
    function createBatchWithNumber(num) {
        const batchNumber = "A" + String(num).padStart(4, "0");
        const batch = {
            id: generateId(),
            batchNumber,
            product,
            bowl,
            packaging: packaging || null,
            unitCount: unitCountVal ? Number(unitCountVal) : null,
            notes: notes || null,
            status: "queued",
            sortOrder: maxOrder + 1,
            createdAt: Date.now(),
            startedAt: null,
            mixingCompleteAt: null,
            pouringAt: null,
            completedAt: null,
            viscosity: null,
            initials: null,
            pouredBy: null,
        };
        batchesRef.child(batch.id).set(batch);
    }

    recycledNumbersRef.once("value", (snap) => {
        const recycled = snap.val();
        if (recycled) {
            // Find the smallest recycled number
            const entries = Object.entries(recycled);
            let minKey = entries[0][0];
            let minNum = entries[0][1];
            for (const [key, val] of entries) {
                if (val < minNum) { minKey = key; minNum = val; }
            }
            // Remove it from recycled list and use it
            recycledNumbersRef.child(minKey).remove();
            createBatchWithNumber(minNum);
        } else {
            // No recycled numbers, increment counter
            batchCounterRef.transaction((current) => {
                return (current || 0) + 1;
            }, (error, committed, snapshot) => {
                if (error || !committed) {
                    alert("Failed to generate batch number. Please try again.");
                    return;
                }
                createBatchWithNumber(snapshot.val());
            });
        }
    });

    batchForm.reset();
    modalOverlay.classList.add("hidden");
});

// Clear all completed batches
document.getElementById("clear-completed-btn").addEventListener("click", () => {
    if (!isAdmin) return;
    const completedBatches = batches.filter((b) => b.status === "batch_complete");
    const updates = {};
    for (const batch of completedBatches) {
        updates[batch.id] = null;
    }
    batchesRef.update(updates);
});

// ── Helpers ─────────────────────────────────────────────────────────
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Keep Firebase Connected / Auto-Reconnect ────────────────────────
// Force Firebase to stay connected even when the tab is idle
firebase.database().goOnline();

// Re-connect whenever the browser comes back online
window.addEventListener("online", () => {
    firebase.database().goOnline();
});

// Re-connect when the tab becomes visible again
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        firebase.database().goOnline();
    }
});
