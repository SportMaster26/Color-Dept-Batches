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

// ── State ───────────────────────────────────────────────────────────
let batches = [];
let undoStack = []; // stores { id, prevStatus } for undo
const MAX_UNDO = 20;
let isAdmin = sessionStorage.getItem("adminMode") === "true";
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
        adminElements.forEach((el) => el.classList.remove("hidden"));
        document.body.classList.add("admin-mode");
    } else {
        adminToggleBtn.textContent = "Admin Login";
        adminToggleBtn.classList.remove("admin-active");
        adminElements.forEach((el) => el.classList.add("hidden"));
        document.body.classList.remove("admin-mode");
    }
    render();
}

adminToggleBtn.addEventListener("click", () => {
    if (isAdmin) {
        // Log out
        isAdmin = false;
        sessionStorage.removeItem("adminMode");
        updateAdminUI();
    } else {
        // Prompt for password
        const pw = prompt("Enter admin password:");
        if (pw === ADMIN_PASSWORD) {
            isAdmin = true;
            sessionStorage.setItem("adminMode", "true");
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
function updateUndoBtn() {
    if (undoBtn) {
        undoBtn.classList.toggle("hidden", !isAdmin || undoStack.length === 0);
    }
}

undoBtn.addEventListener("click", () => {
    if (!isAdmin || undoStack.length === 0) return;
    const action = undoStack.pop();
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
    completedView = "chart";
    viewChartBtn.classList.add("view-btn-active");
    viewTableBtn.classList.remove("view-btn-active");
    completedChartWrap.classList.remove("hidden");
    completedTableWrap.classList.add("hidden");
    renderCompletedChart();
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
            let unitCount = "";
            let packagingLabel = batch.packaging || "";
            if (batch.packaging) {
                const pkg = PACKAGING[batch.packaging];
                if (pkg && bowlCap) {
                    unitCount = Math.floor(bowlCap / pkg.gallons);
                }
            }
            return {
                product: batch.product,
                bowl: bowlName,
                capacity: bowlCap ? bowlCap.toLocaleString() + " gal" : "N/A",
                capacityNum: bowlCap || 0,
                packaging: packagingLabel,
                unitCount,
                notes: batch.notes || "",
                completed: batch.completedAt ? new Date(batch.completedAt).toLocaleString() : "",
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
        tbody.innerHTML = `<tr><td colspan="8" class="completed-empty">No completed batches</td></tr>`;
        if (toolbar) toolbar.classList.add("hidden");
        if (completedChart) { completedChart.destroy(); completedChart = null; }
        return;
    }

    if (toolbar) toolbar.classList.remove("hidden");

    tbody.innerHTML = rows.map((r, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(r.product)}</td>
            <td>${escapeHtml(r.bowl)}</td>
            <td>${r.capacity}</td>
            <td>${escapeHtml(r.packaging)}</td>
            <td>${r.unitCount ? r.unitCount.toLocaleString() + " approx." : "—"}</td>
            <td>${escapeHtml(r.notes)}</td>
            <td class="completed-time-cell">${r.completed}${isAdmin ? ` <button class="btn btn-sm btn-delete" data-action="delete" data-id="${r.id}">&times;</button>` : ""}</td>
        </tr>
    `).join("");

    // If chart view is active, update chart too
    if (completedView === "chart") {
        renderCompletedChart();
    }
}

function renderCompletedChart() {
    const rows = getCompletedRows();
    if (rows.length === 0) return;

    // Group by bowl: count batches + total gallons
    const bowlMap = {};
    for (const r of rows) {
        if (!bowlMap[r.bowl]) bowlMap[r.bowl] = { count: 0, gallons: r.capacityNum };
        bowlMap[r.bowl].count++;
    }

    const labels = Object.keys(bowlMap);
    const counts = labels.map((l) => bowlMap[l].count);
    const gallons = labels.map((l) => bowlMap[l].gallons * bowlMap[l].count);

    const ctx = document.getElementById("completed-chart").getContext("2d");

    if (completedChart) completedChart.destroy();

    completedChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Batches Completed",
                    data: counts,
                    backgroundColor: "rgba(39, 174, 96, 0.7)",
                    borderColor: "#27ae60",
                    borderWidth: 1,
                    yAxisID: "y",
                },
                {
                    label: "Total Gallons Produced",
                    data: gallons,
                    backgroundColor: "rgba(52, 152, 219, 0.5)",
                    borderColor: "#3498db",
                    borderWidth: 1,
                    yAxisID: "y1",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: "Completed Batches by Bowl", font: { size: 16 } },
                legend: { position: "top" },
            },
            scales: {
                y: {
                    type: "linear",
                    position: "left",
                    title: { display: true, text: "Batch Count" },
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                },
                y1: {
                    type: "linear",
                    position: "right",
                    title: { display: true, text: "Total Gallons" },
                    beginAtZero: true,
                    grid: { drawOnChartArea: false },
                },
            },
        },
    });
}

function exportToExcel() {
    const rows = getCompletedRows();
    if (rows.length === 0) { alert("No completed batches to export."); return; }

    const data = rows.map((r, i) => ({
        "#": i + 1,
        "Product": r.product,
        "Bowl": r.bowl,
        "Bowl Capacity": r.capacity,
        "Packaging": r.packaging,
        "Unit Count": r.unitCount || "N/A",
        "Notes": r.notes,
        "Completed": r.completed,
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

    // Support both old "gallons" field and new "packaging" field
    let packagingDisplay = "";
    if (batch.packaging) {
        const pkg = PACKAGING[batch.packaging];
        const bowlCap = BOWLS[batch.bowl] ? BOWLS[batch.bowl].capacity : null;
        if (pkg && bowlCap) {
            const count = Math.floor(bowlCap / pkg.gallons);
            packagingDisplay = `<span class="card-packaging">${escapeHtml(batch.packaging)} - ${count.toLocaleString()} ${pkg.unit} Approx.</span>`;
        } else {
            packagingDisplay = `<span class="card-packaging">${escapeHtml(batch.packaging)}</span>`;
        }
    } else if (batch.gallons) {
        packagingDisplay = `<span class="card-packaging">${Number(batch.gallons).toLocaleString()} gal</span>`;
    }

    // Only show action buttons for admin
    let actionsHtml = "";
    if (isAdmin) {
        const nextAction = STATUS_NEXT_ACTION[batch.status];
        const nextBtnClass = batch.status === "queued" ? "btn-start-mixing"
            : batch.status === "mixing" ? "btn-mixing-complete"
            : batch.status === "mixing_complete" ? "btn-pouring"
            : batch.status === "pouring" ? "btn-batch-complete"
            : "";
        actionsHtml = `
            <div class="card-actions">
                ${nextAction ? `<button class="btn btn-sm ${nextBtnClass}" data-action="advance" data-id="${batch.id}">${nextAction.label}</button>` : ""}
                <button class="btn btn-sm btn-delete" data-action="delete" data-id="${batch.id}">&times;</button>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="card-top">
            <span class="card-product">${escapeHtml(batch.product)}</span>
            <span class="card-status">${statusLabel}</span>
        </div>
        <div class="card-details">
            ${packagingDisplay}
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
    if (!btn || !isAdmin) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "advance") {
        advanceStatus(id);
    } else if (action === "delete") {
        deleteBatch(id);
    }
});

function advanceStatus(id) {
    const batch = batches.find((b) => b.id === id);
    if (!batch) return;

    const nextAction = STATUS_NEXT_ACTION[batch.status];
    if (!nextAction) return;

    // Push to undo stack
    undoStack.push({ id: batch.id, prevStatus: batch.status });
    if (undoStack.length > MAX_UNDO) undoStack.shift();

    batch.status = nextAction.next;
    if (nextAction.next === "mixing") batch.startedAt = Date.now();
    if (nextAction.next === "batch_complete") batch.completedAt = Date.now();
    batchesRef.child(id).update(batch);
    updateUndoBtn();
}

function updateStatus(id, newStatus) {
    const batch = batches.find((b) => b.id === id);
    if (batch) {
        undoStack.push({ id: batch.id, prevStatus: batch.status });
        if (undoStack.length > MAX_UNDO) undoStack.shift();

        batch.status = newStatus;
        if (newStatus === "mixing") batch.startedAt = Date.now();
        if (newStatus === "batch_complete") batch.completedAt = Date.now();
        batchesRef.child(id).update(batch);
        updateUndoBtn();
    }
}

function deleteBatch(id) {
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
    const notes = document.getElementById("batch-notes").value.trim();

    if (!product || !bowl) return;

    const laneBatches = batches.filter((b) => b.bowl === bowl);
    const maxOrder = laneBatches.reduce((max, b) => {
        const order = b.sortOrder != null ? b.sortOrder : b.createdAt;
        return Math.max(max, order);
    }, -1);

    const batch = {
        id: generateId(),
        product,
        bowl,
        packaging: packaging || null,
        notes: notes || null,
        status: "queued",
        sortOrder: maxOrder + 1,
        createdAt: Date.now(),
        startedAt: null,
        completedAt: null,
    };

    batchesRef.child(batch.id).set(batch);

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
