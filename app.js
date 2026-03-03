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

// ── State ───────────────────────────────────────────────────────────
let batches = loadBatches();

function loadBatches() {
    try {
        const raw = localStorage.getItem("colorDeptBatches");
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveBatches() {
    localStorage.setItem("colorDeptBatches", JSON.stringify(batches));
}

// ── Rendering ───────────────────────────────────────────────────────
const board = document.getElementById("board");

function render() {
    board.innerHTML = "";

    for (const bowlKey of BOWL_ORDER) {
        const bowl = BOWLS[bowlKey];
        const lane = document.createElement("div");
        lane.className = "lane";

        // Lane header
        const header = document.createElement("div");
        header.className = "lane-header";
        header.innerHTML = `
            <span class="lane-name">${bowl.name}</span>
            <span class="lane-capacity">${bowl.capacity.toLocaleString()} gal</span>
        `;
        lane.appendChild(header);

        // Get batches for this bowl, ordered: mixing first, then queued, then completed
        const laneBatches = batches
            .filter((b) => b.bowl === bowlKey)
            .sort((a, b) => {
                const order = { mixing: 0, queued: 1, complete: 2 };
                if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
                return a.createdAt - b.createdAt;
            });

        if (laneBatches.length === 0) {
            const empty = document.createElement("div");
            empty.className = "batch-card empty";
            empty.textContent = "No batches";
            lane.appendChild(empty);
        }

        for (const batch of laneBatches) {
            lane.appendChild(createBatchCard(batch));
        }

        board.appendChild(lane);
    }
}

function createBatchCard(batch) {
    const card = document.createElement("div");
    card.className = `batch-card status-${batch.status}`;
    card.dataset.id = batch.id;

    const statusLabel = { queued: "QUEUED", mixing: "MIXING", complete: "COMPLETE" }[batch.status];

    card.innerHTML = `
        <div class="card-top">
            <span class="card-product">${escapeHtml(batch.product)}</span>
            <span class="card-status">${statusLabel}</span>
        </div>
        <div class="card-details">
            ${batch.gallons ? `<span class="card-gallons">${Number(batch.gallons).toLocaleString()} gal</span>` : ""}
            ${batch.notes ? `<span class="card-notes">${escapeHtml(batch.notes)}</span>` : ""}
        </div>
        <div class="card-actions">
            ${batch.status === "queued" ? `<button class="btn btn-sm btn-mixing" data-action="mixing" data-id="${batch.id}">Start Mixing</button>` : ""}
            ${batch.status === "mixing" ? `<button class="btn btn-sm btn-complete" data-action="complete" data-id="${batch.id}">Mark Complete</button>` : ""}
            <button class="btn btn-sm btn-delete" data-action="delete" data-id="${batch.id}">&times;</button>
        </div>
    `;

    return card;
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ── Actions ─────────────────────────────────────────────────────────
board.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

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
        saveBatches();
        render();
    }
}

function deleteBatch(id) {
    batches = batches.filter((b) => b.id !== id);
    saveBatches();
    render();
}

// ── Modal ───────────────────────────────────────────────────────────
const modalOverlay = document.getElementById("modal-overlay");
const batchForm = document.getElementById("batch-form");

document.getElementById("add-batch-btn").addEventListener("click", () => {
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

    const product = document.getElementById("product-name").value.trim();
    const bowl = document.getElementById("bowl-select").value;
    const gallons = document.getElementById("batch-gallons").value;
    const notes = document.getElementById("batch-notes").value.trim();

    if (!product || !bowl) return;

    const batch = {
        id: generateId(),
        product,
        bowl,
        gallons: gallons || null,
        notes: notes || null,
        status: "queued",
        createdAt: Date.now(),
        startedAt: null,
        completedAt: null,
    };

    batches.push(batch);
    saveBatches();
    render();

    batchForm.reset();
    modalOverlay.classList.add("hidden");
});

// Clear all completed batches
document.getElementById("clear-completed-btn").addEventListener("click", () => {
    batches = batches.filter((b) => b.status !== "complete");
    saveBatches();
    render();
});

// ── Helpers ─────────────────────────────────────────────────────────
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Init ────────────────────────────────────────────────────────────
render();
