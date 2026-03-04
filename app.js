// ── Bowl Configuration ──────────────────────────────────────────────
const BOWLS = {
    A: { name: "Bowl A", capacity: 575, group: "575 gal" },
    B: { name: "Bowl B", capacity: 575, group: "575 gal" },
    E: { name: "Bowl E", capacity: 250, group: "250 gal" },
    F: { name: "Bowl F", capacity: 250, group: "250 gal" },
    C: { name: "Bowl C", capacity: 1010, group: "1,010 gal" },
    D: { name: "Bowl D", capacity: 1010, group: "1,010 gal" },
    G: { name: "Bowl G", capacity: 1010, group: "1,010 gal" },
    H: { name: "Bowl H", capacity: 1010, group: "1,010 gal" },
    I: { name: "Bowl I", capacity: 1010, group: "1,010 gal" },
    "Big Iron": { name: "Big Iron", capacity: 2000, group: "2,000 gal" },
    "Thors Hammer": { name: "Thor's Hammer", capacity: 2000, group: "2,000 gal" },
};

// Display order for the lanes
const BOWL_ORDER = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "Big Iron", "Thors Hammer"];

// ── Firebase Reference ──────────────────────────────────────────────
const batchesRef = db.ref("batches");

// ── State ───────────────────────────────────────────────────────────
let batches = [];
let isAdmin = sessionStorage.getItem("adminMode") === "true";

// ── Admin Mode ──────────────────────────────────────────────────────
const adminToggleBtn = document.getElementById("admin-toggle-btn");

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

// ── Real-Time Listener ──────────────────────────────────────────────
// This fires immediately with current data, then again on every change
// from ANY device/tab connected to this Firebase project.
batchesRef.on("value", (snapshot) => {
    const data = snapshot.val();
    batches = data ? Object.values(data) : [];
    render();
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
const board = document.getElementById("board");

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
            <span class="lane-capacity">${bowl.capacity.toLocaleString()} gal</span>
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

        // Get batches for this bowl, ordered by sortOrder then createdAt
        const laneBatches = batches
            .filter((b) => b.bowl === bowlKey)
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

    const statusLabel = { queued: "QUEUED", mixing: "MIXING", complete: "COMPLETE" }[batch.status];

    // Support both old "gallons" field and new "packaging" field
    const packagingDisplay = batch.packaging
        ? `<span class="card-packaging">${escapeHtml(batch.packaging)}</span>`
        : batch.gallons
            ? `<span class="card-packaging">${Number(batch.gallons).toLocaleString()} gal</span>`
            : "";

    // Only show action buttons for admin
    let actionsHtml = "";
    if (isAdmin) {
        actionsHtml = `
            <div class="card-actions">
                ${batch.status === "queued" ? `<button class="btn btn-sm btn-mixing" data-action="mixing" data-id="${batch.id}">Start Mixing</button>` : ""}
                ${batch.status === "mixing" ? `<button class="btn btn-sm btn-complete" data-action="complete" data-id="${batch.id}">Mark Complete</button>` : ""}
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
board.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn || !isAdmin) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "mixing") {
        updateStatus(id, "mixing");
    } else if (action === "complete") {
        updateStatus(id, "complete");
    } else if (action === "delete") {
        deleteBatch(id);
    }
});

function updateStatus(id, newStatus) {
    const batch = batches.find((b) => b.id === id);
    if (batch) {
        batch.status = newStatus;
        if (newStatus === "mixing") batch.startedAt = Date.now();
        if (newStatus === "complete") batch.completedAt = Date.now();
        batchesRef.child(id).update(batch);
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
    const completedBatches = batches.filter((b) => b.status === "complete");
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
