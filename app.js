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
    "Latex Department": { name: "Latex Department", capacity: null, group: "Latex Department" },
};

// Bowl move groups for platform/floor operators (restricted movement)
const BOWL_MOVE_GROUPS = {
    A: ["A", "B"],
    B: ["A", "B"],
    C: ["C", "D"],
    D: ["C", "D"],
    E: ["E", "F"],
    F: ["E", "F"],
    G: ["G", "H", "I"],
    H: ["G", "H", "I"],
    I: ["G", "H", "I"],
};

// Display order for the lanes
const BOWL_ORDER = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "The Hull", "Thors Hammer", "TTT", "Stubby", "Ol Iron Sides", "Latex Department"];

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
    "2 Gallon Pails":   { gallons: 2, unit: "Pails" },
    "4.5 Gallon Pails": { gallons: 4.5, unit: "Pails" },
    "5 Gallon Pails":   { gallons: 5, unit: "Pails" },
    "30 Gallon Kegs":   { gallons: 30, unit: "Kegs" },
    "55 Gallon Drums":  { gallons: 55, unit: "Drums" },
    "275 Gallon Totes": { gallons: 275, unit: "Totes" },
};

// Packaging types that always get a batch number immediately on creation.
// (Legacy — no longer used; all batches now get numbers only when 2nd in line.)
const IMMEDIATE_BATCH_NUM = ["Quart Bottles", "24 Oz. Jars", "1 Gallon Jugs", "1 Gallon Pails"];

// ── Product Catalog (name – item number) ────────────────────────────
let PRODUCT_CATALOG = [
    // MISCELLANEOUS PRODUCTS
    "NEUTRAL CONCENTRATE – C1360",
    "NEUTRAL CONCENTRATE WITH SAND – C1365",
    "BLACK ACRYLIC RESURFACER – C1300",
    "BLACK ACRYLIC RESURFACER WITH SAND – C1330",
    "NEUTRAL ACRYLIC RESURFACER – C1310",
    "NEUTRAL ACRYLIC RESURFACER WITH SAND – C1340",
    "ACRYLIC PATCH BINDER – C1480",
    "TOP TUFF – M1100",
    "PAVE GEL – M1105",
    "ACRYLIC ADHESION PROMOTER – C1650",
    "PETRO SEAL – M1120",
    "PREP SEAL – M1130",
    "ACRYLIC CRACK FILLER – M1002G",
    "LANE ONE – C1750P",
    "CUSHION 1 – C1450",
    "CUSHION 2 – C1460",
    "FLEXIBLE CONCENTRATE – C1455",
    "FLEXIBLE RESURFACER – C1320",
    "COLORPAVE READY-MIX – S2092P",
    "COLORPAVE CONCENTRATE – S2105",
    "COLORPAVE HD 500 – S2200P",
    "COLORPAVE HD CLEAR COAT – S2300P",
    "SPORTWAX – C1850P",
    "NEUTRAL SKATEMASTER – C1800",
    "SEALMASTER CONCRETE SEALER – M1300",
    "SEALMASTER CONCRETER PATCH – M1350G",
    "SEALMASTER CONCRETE CRACK SEALANT – M1355G",
    "DUST SUPPRESSANT/SOIL STABILIZER – S4000",
    // COLORPLUS
    "LIGHT GREEN COLORPLUS – C1372",
    "FOREST GREEN COLORPLUS – C1374",
    "DARK GREEN COLORPLUS – C1373",
    "ICE BLUE COLORPLUS – C1383",
    "LIGHT BLUE COLORPLUS – C1385",
    "BLUE COLORPLUS – C1384",
    "DOVE GRAY COLORPLUS – C1399",
    "GRAY COLORPLUS – C1380",
    "YELLOW COLORPLUS – C1390",
    "SANDSTONE COLORPLUS – C1389",
    "BEIGE COLORPLUS – C1378",
    "ORANGE COLORPLUS – C1379",
    "RED COLORPLUS – C1370",
    "BRITE RED COLORPLUS – C1392",
    "MAROON COLORPLUS – C1386",
    "TOURNAMENT PURPLE COLORPLUS – C1388",
    "BLACK DISPERSION COLORPLUS – C1660",
    "DARK BLUE COLORPLUS – C1131",
    "LT BLUE COLORPLUS – C1132",
    // BARN PAINTS / FARMPAINT PRODUCTS
    "FP300 BARN FARMPAINT – B3000",
    "WHITE BARN FARMPAINT – B2425",
    "RED BARN FARMPAINT – B2405",
    "GREEN BARN FARMPAINT – B2395",
    "BROWN BARN FARMPAINT – B2385",
    "GRAY BARN FARMPAINT – B2435",
    "10 YEAR BARN FARMPAINT – B1348",
    "7 YEAR BARN FARMPAINT – B1349",
    // STRIPING PAINTS
    "WHITE STRIPE – M1200P",
    "YELLOW STRIPE – M1210P",
    "FIRELANE RED – M1220P",
    "HANDICAP BLUE – M1230P",
    "FED WHITE – M1240P",
    "FED YELLOW – M1250P",
    "FAST DRY WHITE – M1270P",
    "FAST DRY YELLOW – M1280P",
    "THERMO WHITE – M1297P",
    "THERMO YELLOW – M1296P",
    "THERMO BLUE – M1298P",
    "THERMO RED – M1299P",
    "THERMO BLACK – M1294P",
    "VELOCITY WHITE – M1275P",
    "VELOCITY YELLOW – M1285P",
    "VELOCITY BLUE – M1278P",
    "TEXTURED TC LINE PAINT – C1620",
    "STRIPE RITE – C1610",
    "LINE BLOCKOUT – M1260P",
    "GAMETIME NEUTRAL – M1197P",
    "GAMETIME WHITE – M1195P",
    "GAMETIME YELLOW – M1196P",
    "BIKELANE GREEN – M2280P",
    "BIKELANE/BUS RED – M2285P",
    // PICKLEMASTER
    "PICKLEMASTER – C1298",
    "PICKLEMASTER RTU BASE – C1299P",
    // JETCOAT BARN PAINTS
    "JETCOAT BLACK (HALLOWEEN) – JC66765",
    "RED JETCOAT BARN PAINT – JC66405",
    "GRAY JETCOAT BARN PAINT – JC66435",
    "WHITE JETCOAT BARN PAINT – JC66425",
    "GREEN JETCOAT BARN PAINT – JC66395",
    // JETCOAT REFLECTIVES
    "7 YEAR FARM PRIDE – JC66491",
    "7 YEAR COOL KING – JC66201",
    // COLOR CONCENTRATES
    "LIGHT GREEN COLOR CONCENTRATE – C1050",
    "FOREST GREEN COLOR CONCENTRATE – C1030",
    "DARK GREEN COLOR CONCENTRATE – C1082",
    "BEIGE COLOR CONCENTRATE – C1000",
    "BLUE COLOR CONCENTRATE – C1010",
    "RED COLOR CONCENTRATE – C1070",
    "MAROON COLOR CONCENTRATE – C1060",
    "GRAY COLOR CONCENTRATE – C1040",
    // COLOR CONCENTRATE WITH SAND
    "LIGHT GREEN COLOR CONCENTRATE W/ SAND – C1150",
    "FOREST GREEN COLOR CONCENTRATE W/ SAND – C1130",
    "DARK GREEN COLOR CONCENTRATE W/ SAND – C1182",
    "BEIGE COLOR CONCENTRATE W/ SAND – C1100",
    "BLUE COLOR CONCENTRATE W/ SAND – C1110",
    "RED COLOR CONCENTRATE W/ SAND – C1170",
    "MAROON COLOR CONCENTRATE W/ SAND – C1160",
    "GRAY COLOR CONCENTRATE W/ SAND – C1140",
    // READY-MIX
    "SPORTMASTER NEUTRAL READY-MIX – C1285P",
    // COURTFLEX / PATCH / MAGIC
    "NEUTRAL COURTFLEX – C1560G",
    "GREEN COURTFLEX – C1540G",
    "RED COURTFLEX – C1550G",
    "NEUTRAL CRACK PATCH – C1520G",
    "GREEN CRACK PATCH – C1500G",
    "RED CRACK PATCH – C1510G",
    "BLUE CRACK PATCH – C1515G",
    "NEUTRAL CRACK MAGIC – C1590G",
    "GREEN CRACK MAGIC – C1570G",
    "RED CRACK MAGIC – C1580G",
    "CLEAR CRACK SEALANT – C1530G",
    "TRACKFLEX CRACK SEALANT – C1760G",
    // SEALBEST PRODUCTS
    "SEALBEST CONCRETE SEALER – H4100",
    "SEALBEST ULTRA GLOSS – H4111",
    "SEALBEST 10 YEAR – H3000",
    "SEALBEST 15 YEAR – H3275",
    "SEALBEST SHINGLE SAVER – H3600",
    "SEALBEST ROOF PATCH – H3200",
    "SEALBEST GRAYSHIELD – H3500",
    "SEALBEST DUCK COAT BASEMENT – H2981",
    "SEALBEST WHITE DUCK COAT – H3115",
    "SEALBEST BLACK DUCK COAT – H3125",
    "SEALBEST DUCK PATCH – H2986",
    "SEALBEST OIL SPOT PRIMER – H5900",
    "SEALBEST ROOF CLEANER – H3693",
    // TRACKMASTER PRO
    "PRO LOCK (4076) – C1742",
    "PRO TACK (5051) – C1744",
    "PRO TECT (TP257) – C1746",
    // GEMSEAL PRODUCTS
    "AQS3 – M1500",
    "BOOST PRO – M1505P",
    "GUARDFLEX – M1510P",
    "RAPID SET – M1515P",
    "ULTRA 3 – M1520",
    // PROSTRIPE
    "PROSTRIPE WHITE – M1600P",
    "PROSTRIPE YELLOW – M1605P",
    "PROSTRIPE BLUE – M1610P",
    "PROSTRIPE BLACK – M1615P",
    "PROSTRIPE RED – M1620P",
    "PROSTRIPE NO FADE – M1625P",
    // PROSTRIPE PLUS (VELOCITY)
    "PROSTRIPE PLUS WHITE – M1630P",
    "PROSTRIPE PLUS YELLOW – M1635P",
    "PROSTRIPE PLUS BLUE – M1640P",
    "PROSTRIPE PLUS BLACK – M1645P",
    "PROSTRIPE PLUS RED – M1650P",
    "PROSTRIPE PLUS GREEN – M1655P",
    "PROSTRIPE PLUS HIGH PERFORMANCE – M1660P",
    // PROSTRIPE FED
    "PROSTRIPE FED WHITE – M1665P",
    "PROSTRIPE FED YELLOW – M1666P",
    "PROSTRIPE FED BLACK – M1667P",
    "PROSTRIPE FED HANDICAP BLUE – M1668P",
    "PROSTRIPE FED RED – M1669P",
    // SURFACE 1
    "SURFACE 1 LIGHT GREEN – C1630P",
    "SURFACE 1 MEDIUM GREEN – C1631P",
    "SURFACE 1 DARK GREEN – C1632P",
    "SURFACE 1 RED – C1633P",
    "SURFACE 1 BLUE – C1634P",
    "SURFACE 1 GRAY – C1635P",
    // DR. SHIELDS
    "DR. SHIELDS – H3610",
    // SEALER ADDITIVES
    "LIQUID ROAD LATEX – R1165T",
    "PMB PLUS – R1154T",
    // MAINTENANCE INC.
    "FSA – M1170P",
    "FASS-DRI – M1178P",
    "TARGEL – M1107P",
    "FSA AE – M1172P",
    "BLACK POLY – M1234T",
    // SEALBEST SPECIAL ORDERS
    "SEALBEST NEUTRAL PATCH – 8600",
    "SEALBEST RED PATCH – H8601",
    "SEALBEST GREEN PATCH – H8602",
    "SEALBEST WHITE STRIPE – H7700",
    "SEALBEST YELLOW STRIPE – H7703",
    "SEALBEST FED WHITE – H7710",
    "SEALBEST FED YELLOW – H7713",
    "SEALBEST LINE BLOCKOUT – H7730",
    "SEALBEST TEXTURED T/C LINE PAINT – H8605",
    "SEALBEST HANDICAP BLUE – H7720",
    // RV COATINGS
    "RV 15 YEAR – H3137",
    "RV ROOF CLEANER – H3143",
    "RV ACTIVATOR – H3147",
    "RV ROOF PATCH – H3141",
    // TRACKMASTER PLUS
    "TRACKMASTER PLUS NEUTRAL – C1740",
    "TRACKMASTER PLUS RED – C1709",
    "TRACKMASTER PLUS BLACK – C1708",
];

// ── Firebase Reference ──────────────────────────────────────────────
const batchesRef = db.ref("batches");
const notesRef = db.ref("notes");
const customProductsRef = db.ref("meta/customProducts");
const latexTanksRef = db.ref("latexTanks");
const inventoryRef = db.ref("inventory");
const testInvRef = db.ref("testInventory");
const lockedAccountsRef = db.ref("meta/lockedAccounts");
const failedAttemptsRef = db.ref("meta/failedAttempts");
const loginAuditRef = db.ref("meta/loginAudit");

// ── Batch Number Helpers ─────────────────────────────────────────────

/** Parse "A0437" → 437. Returns NaN for invalid strings. */
function parseBatchNum(str) {
    if (!str) return NaN;
    return parseInt(str.slice(1), 10);
}

function getNextBatchNumber() {
    const usedNums = new Set(
        batches
            .map(b => parseBatchNum(b.batchNumber))
            .filter(n => !isNaN(n))
    );
    let next = 1;
    while (usedNums.has(next)) next++;
    return "A" + String(next).padStart(4, "0");
}

/** Format number 437 → "A0437". */
/**
 * Returns true if batchNumber is already used by any batch,
 * optionally excluding a specific batch ID (for edits).
 */
function isBatchNumberTaken(batchNumber, excludeId) {
    if (!batchNumber) return false;
    return batches.some(b =>
        b.batchNumber === batchNumber &&
        (!excludeId || b.id !== excludeId)
    );
}


/**
 * Build a new queued batch object with consistent field set.
 * @param {Object} fields - product, bowl, packaging, unitCount, notes, sortOrder
 */
function buildNewBatch(fields) {
    return {
        id: generateId(),
        batchNumber: null,
        product: fields.product,
        bowl: fields.bowl,
        packaging: fields.packaging || null,
        unitCount: fields.unitCount || null,
        notes: fields.notes || null,
        status: "queued",
        sortOrder: fields.sortOrder,
        createdAt: Date.now(),
        startedAt: null,
        mixingCompleteAt: null,
        pouringAt: null,
        completedAt: null,
        viscosity: null,
        initials: null,
        initials2: null,
        pouredBy: null,
    };
}

// ── Latex Tank Configuration ─────────────────────────────────────────
const LATEX_TANKS = [
    { id: "C1", name: "C#1", capacity: 6000, group: "C Tanks" },
    { id: "C2", name: "C#2", capacity: 6000, group: "C Tanks" },
    { id: "C3", name: "C#3", capacity: 6000, group: "C Tanks" },
    { id: "C4", name: "C#4", capacity: 6000, group: "C Tanks" },
    { id: "C5", name: "C#5", capacity: 6000, group: "C Tanks" },
    { id: "C6", name: "C#6", capacity: 6000, group: "C Tanks" },
    { id: "C7", name: "C#7", capacity: 6000, group: "C Tanks" },
    { id: "C8", name: "C#8", capacity: 6000, group: "C Tanks" },
    { id: "TRIPLE_T", name: "TRIPLE T", capacity: 6000, group: "C Tanks" },
    { id: "BR1", name: "BR#1", capacity: 6000, group: "BR Tanks" },
    { id: "BR2", name: "BR#2", capacity: 6000, group: "BR Tanks" },
    { id: "BR3", name: "BR#3", capacity: 6000, group: "BR Tanks" },
    { id: "BR4", name: "BR#4", capacity: 6000, group: "BR Tanks" },
    { id: "BR5", name: "BR#5", capacity: 6000, group: "BR Tanks" },
    { id: "BR6", name: "BR#6", capacity: 6000, group: "BR Tanks" },
    { id: "BR7", name: "BR#7", capacity: 6000, group: "BR Tanks" },
    { id: "BR8", name: "BR#8", capacity: 6000, group: "BR Tanks" },
    { id: "BR9", name: "BR#9", capacity: 6000, group: "BR Tanks" },
    { id: "BR10", name: "BR#10", capacity: 6000, group: "BR Tanks" },
    { id: "BR11", name: "BR#11", capacity: 6000, group: "BR Tanks" },
    { id: "BR12", name: "BR#12", capacity: 6000, group: "BR Tanks" },
    { id: "BR13", name: "BR#13", capacity: 6000, group: "BR Tanks" },
    { id: "BR14", name: "BR#14", capacity: 6000, group: "BR Tanks" },
    { id: "W1", name: "W#1", capacity: 10000, group: "W Tanks" },
    { id: "W2", name: "W#2", capacity: 10000, group: "W Tanks" },
    { id: "W3", name: "W#3", capacity: 10000, group: "W Tanks" },
    { id: "W4", name: "W#4", capacity: 10000, group: "W Tanks" },
    { id: "W5", name: "W#5", capacity: 10000, group: "W Tanks" },
    { id: "W6", name: "W#6", capacity: 10000, group: "W Tanks" },
    { id: "CB", name: "CB", capacity: 50, group: "Totes" },
    { id: "T1", name: "T1", capacity: 50, group: "Totes" },
    { id: "T2", name: "T2", capacity: 50, group: "Totes" },
    { id: "T3", name: "T3", capacity: 50, group: "Totes" },
    { id: "T4", name: "T4", capacity: 50, group: "Totes" },
    { id: "T5", name: "T5", capacity: 50, group: "Totes" },
    { id: "T6", name: "T6", capacity: 50, group: "Totes" },
];

let latexTankLevels = {}; // { tankId: gallons }
let inventoryData = {}; // { itemId: { inv, dateCounted, ... } }
let testInvData = {};
let testInvItems = [];

// Firebase listeners — started after auth, stopped on logout
let listenersActive = false;

function startFirebaseListeners() {
    if (listenersActive) return;
    listenersActive = true;

    customProductsRef.on("value", onCustomProducts);
    batchesRef.on("value", onBatches, onBatchesError);
    latexTanksRef.on("value", onLatexTanks);
    latexTanksRef.once("value", onLatexTanksSeed);
    notesRef.on("value", onNotes);
    inventoryRef.on("value", onInventoryData);
    inventoryRef.once("value", onInventorySeed);
    testInvRef.on("value", onTestInvData);
}

function stopFirebaseListeners() {
    if (!listenersActive) return;
    listenersActive = false;
    customProductsRef.off("value", onCustomProducts);
    batchesRef.off("value", onBatches);
    latexTanksRef.off("value", onLatexTanks);
    testInvRef.off("value", onTestInvData);
    notesRef.off("value", onNotes);
    inventoryRef.off("value", onInventoryData);
    // Remove error banner if present
    const errBanner = document.getElementById("firebase-error-banner");
    if (errBanner) errBanner.remove();
}

function onCustomProducts(snapshot) {
    const data = snapshot.val();
    if (data) {
        const customs = Object.values(data);
        customs.forEach((p) => {
            if (!PRODUCT_CATALOG.includes(p)) {
                PRODUCT_CATALOG.push(p);
            }
        });
    }
}

// ── State ───────────────────────────────────────────────────────────
let batches = [];
let undoStack = []; // stores { id, prevStatus } for admin undo
let operatorUndoStack = []; // separate undo stack for operator
const MAX_UNDO = 20;
let isOwner = false;
let isAdmin = false;
let isOperator = false;
let isViewer = false;
let currentRole = null; // "admin", "operator", "viewer", or null
let activeTab = "active"; // "active" or "completed"
const board = document.getElementById("board");
const undoBtn = document.getElementById("undo-btn");
const logoutBtn = document.getElementById("logout-btn");
const roleBadge = document.getElementById("role-badge");
const tabActive = document.getElementById("tab-active");
const tabLatex = document.getElementById("tab-latex");
const latexBoard = document.getElementById("latex-board");
const tabCompleted = document.getElementById("tab-completed");
const completedBoard = document.getElementById("completed-board");
const tabNotes = document.getElementById("tab-notes");
const notesBoard = document.getElementById("notes-board");
const tabInventory = document.getElementById("tab-inventory");
const inventoryBoard = document.getElementById("inventory-board");
const tabTestInv = document.getElementById("tab-test-inv");
const testInvBoard = document.getElementById("test-inv-board");

// Users allowed to see the Latex Department tab
const LATEX_TAB_USERS = [
    "tmahl@colordept.local",
    "kherrin@colordept.local",
    "matt@colordept.local",
    "ajolly@colordept.local",
    "cwood@colordept.local",
    "hhudak@colordept.local",
    "paul@colordept.local",
    "jeff@colordept.local",
];

// Users allowed to see and edit the Inventory tab
const INVENTORY_TAB_USERS = [
    "master@colordept.local",
    "hhudak@colordept.local",
    "paul@colordept.local",
    "ajolly@colordept.local",
];

const TEST_INV_USERS = [
    "master@colordept.local",
    "paul@colordept.local",
    "ajolly@colordept.local",
];
const loginScreen = document.getElementById("login-screen");
const appContainer = document.getElementById("app-container");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

// ── Authentication ──────────────────────────────────────────────────

function setRole(role) {
    currentRole = role;
    isOwner = role === "owner";
    isAdmin = role === "admin" || role === "owner";
    isOperator = role === "operator";
    isViewer = role === "viewer";
}

function isPlatformOrFloor() {
    const user = auth.currentUser;
    const email = user ? user.email : "";
    return email === "platform@colordept.local" || email === "floor@colordept.local";
}

function getAllowedMoveBowls(sourceBowl) {
    return BOWL_MOVE_GROUPS[sourceBowl] || [];
}

// ── Notes Users ─────────────────────────────────────────────────────
const NOTES_POST_USERS = ["master@colordept.local", "tmahl@colordept.local", "kherrin@colordept.local", "matt@colordept.local", "ajolly@colordept.local", "floor@colordept.local"];

function canPostNotes() {
    const user = auth.currentUser;
    return user && NOTES_POST_USERS.includes(user.email);
}

function updateAdminUI() {
    const adminElements = document.querySelectorAll(".admin-only");

    // Update role badge
    roleBadge.className = "role-badge";
    if (isOwner) {
        roleBadge.textContent = "Owner";
        roleBadge.classList.add("role-owner");
        adminElements.forEach((el) => el.classList.remove("hidden"));
        document.body.classList.add("admin-mode");
        document.body.classList.remove("operator-mode", "viewer-mode");
    } else if (isAdmin) {
        roleBadge.textContent = "Admin";
        roleBadge.classList.add("role-admin");
        adminElements.forEach((el) => el.classList.remove("hidden"));
        document.body.classList.add("admin-mode");
        document.body.classList.remove("operator-mode", "viewer-mode");
    } else if (isOperator) {
        roleBadge.textContent = "Operator";
        roleBadge.classList.add("role-operator");
        adminElements.forEach((el) => el.classList.add("hidden"));
        document.body.classList.add("operator-mode");
        document.body.classList.remove("admin-mode", "viewer-mode");
    } else if (isViewer) {
        roleBadge.textContent = "Viewer";
        roleBadge.classList.add("role-viewer");
        adminElements.forEach((el) => el.classList.add("hidden"));
        document.body.classList.add("viewer-mode");
        document.body.classList.remove("admin-mode", "operator-mode");
    }
    // Latex tab: visible to all logged-in users (except floor/platform)
    const user = auth.currentUser;
    const userEmail = user ? user.email : "";
    const isFloorOrPlatform = userEmail === "floor@colordept.local" || userEmail === "platform@colordept.local";
    tabLatex.classList.toggle("hidden", isFloorOrPlatform);

    // Notes tab: hide from platform only (floor can post notes)
    tabNotes.classList.toggle("hidden", userEmail === "platform@colordept.local");

    // Inventory tab: only visible to specific users
    tabInventory.classList.toggle("hidden", !INVENTORY_TAB_USERS.includes(userEmail));
    tabTestInv.classList.toggle("hidden", !TEST_INV_USERS.includes(userEmail));

    // Only TJ (tmahl) and Kevin (kherrin) can add notes
    const canPostNotes = NOTES_POST_USERS.includes(userEmail);
    const notesAddSection = document.getElementById("notes-add-section");
    if (notesAddSection) {
        notesAddSection.classList.toggle("hidden", !canPostNotes);
    }

    render();
}

// Login lockout after 3 failed attempts — permanent until admin unlocks
const MAX_ATTEMPTS = 3;
let localFailedAttempts = {}; // { email: count } — local tracker per session

// Convert email to a Firebase-safe key (no dots allowed in keys)
function emailToKey(email) {
    return email.replace(/\./g, ",");
}

// Login form handler
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    loginError.classList.add("hidden");

    // Check if account is locked in Firebase
    lockedAccountsRef.child(emailToKey(email)).once("value", (snap) => {
        if (snap.val()) {
            loginError.textContent = "Account locked. Contact an admin to reset your password.";
            loginError.classList.remove("hidden");
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then((cred) => {
                // Clear failed attempts on success
                delete localFailedAttempts[email];
                failedAttemptsRef.child(emailToKey(email)).remove().catch(() => {});
                loginAuditRef.push({ email, event: "login_success", timestamp: Date.now() }).catch(() => {});
                const role = ROLE_MAP[cred.user.email] || "viewer";
                setRole(role);
                startFirebaseListeners();
                loginScreen.classList.add("hidden");
                appContainer.classList.remove("hidden");
                updateAdminUI();
            })
            .catch((err) => {
                // Track attempts locally (immediate) and in Firebase (persistent)
                localFailedAttempts[email] = (localFailedAttempts[email] || 0) + 1;
                const attempts = localFailedAttempts[email];

                // Try to persist to Firebase (best-effort, don't block UI)
                failedAttemptsRef.child(emailToKey(email)).transaction((count) => {
                    return (count || 0) + 1;
                }).catch(() => {});

                if (attempts >= MAX_ATTEMPTS) {
                    // Lock the account in Firebase
                    lockedAccountsRef.child(emailToKey(email)).set(true).catch(() => {});
                    failedAttemptsRef.child(emailToKey(email)).remove().catch(() => {});
                    loginAuditRef.push({ email, event: "account_locked", timestamp: Date.now() }).catch(() => {});
                    loginError.textContent = "Account locked. Contact an admin to reset your password.";
                } else {
                    loginAuditRef.push({ email, event: "login_failed", reason: err.code, attempt: attempts, timestamp: Date.now() }).catch(() => {});
                    const remaining = MAX_ATTEMPTS - attempts;
                    loginError.textContent = err.code === "auth/invalid-credential"
                        ? `Invalid email or password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
                        : err.code === "auth/too-many-requests"
                        ? "Account locked. Contact an admin to reset your password."
                        : `Login failed. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`;
                }
                loginError.classList.remove("hidden");
            });
    });
});

// Logout handler
logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
        setRole(null);
        isOwner = false;
        isAdmin = false;
        isOperator = false;
        isViewer = false;
        stopFirebaseListeners();
        appContainer.classList.add("hidden");
        loginScreen.classList.remove("hidden");
        loginForm.reset();
        loginError.classList.add("hidden");
        document.body.classList.remove("admin-mode", "operator-mode", "viewer-mode");
    });
});

// Check if already logged in (page refresh)
auth.onAuthStateChanged((user) => {
    if (user) {
        const role = ROLE_MAP[user.email] || "viewer";
        setRole(role);
        startFirebaseListeners();
        loginScreen.classList.add("hidden");
        appContainer.classList.remove("hidden");
        updateAdminUI();
    } else {
        stopFirebaseListeners();
        setRole(null);
        appContainer.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    }
});

// ── Tab Switching ───────────────────────────────────────────────────
function selectTab(tab) {
    activeTab = tab;
    tabActive.classList.toggle("tab-selected", tab === "active");
    tabLatex.classList.toggle("tab-selected", tab === "latex");
    tabCompleted.classList.toggle("tab-selected", tab === "completed");
    tabNotes.classList.toggle("tab-selected", tab === "notes");
    tabInventory.classList.toggle("tab-selected", tab === "inventory");
    tabTestInv.classList.toggle("tab-selected", tab === "test-inv");
    board.classList.toggle("hidden", tab !== "active");
    latexBoard.classList.toggle("hidden", tab !== "latex");
    completedBoard.classList.toggle("hidden", tab !== "completed");
    notesBoard.classList.toggle("hidden", tab !== "notes");
    inventoryBoard.classList.toggle("hidden", tab !== "inventory");
    testInvBoard.classList.toggle("hidden", tab !== "test-inv");
}

tabActive.addEventListener("click", () => {
    selectTab("active");
    updateCompletedCount();
});

tabLatex.addEventListener("click", () => {
    selectTab("latex");
    renderLatexBoard();
});

tabCompleted.addEventListener("click", () => {
    selectTab("completed");
    // Mark all current completed batches as seen for this user
    const currentUser = auth.currentUser;
    if (currentUser) {
        const count = batches.filter((b) => b.status === "batch_complete").length;
        localStorage.setItem("lastSeenCompleted_" + currentUser.uid, count);
    }
    const badge = document.getElementById("completed-count");
    badge.classList.add("hidden");
    renderCompleted();
});

tabNotes.addEventListener("click", () => {
    selectTab("notes");
    renderNotes();
});

tabInventory.addEventListener("click", () => {
    selectTab("inventory");
    renderInventoryBoard();
});

tabTestInv.addEventListener("click", () => {
    selectTab("test-inv");
    renderTestInvBoard();
});

function updateCompletedCount() {
    const count = batches.filter((b) => b.status === "batch_complete").length;
    const badge = document.getElementById("completed-count");
    const currentUser = auth.currentUser;
    const lastSeen = currentUser
        ? parseInt(localStorage.getItem("lastSeenCompleted_" + currentUser.uid) || "0", 10)
        : 0;
    const newCount = Math.max(0, count - lastSeen);
    badge.textContent = newCount;
    badge.classList.toggle("hidden", newCount === 0 || activeTab === "completed");
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
        const canUndo = (isAdmin || isOperator) && stack.length > 0;
        // Always show for admin/operator, just disable when nothing to undo
        undoBtn.classList.toggle("hidden", !isAdmin && !isOperator);
        undoBtn.disabled = !canUndo;
        undoBtn.style.opacity = canUndo ? "1" : "0.4";
    }
}

undoBtn.addEventListener("click", () => {
    const stack = getActiveUndoStack();
    if (isViewer || (!isAdmin && !isOperator) || stack.length === 0) return;
    const entry = stack.pop();
    if (entry.action === "delete" && entry.batchData) {
        // Restore a deleted batch
        batchesRef.child(entry.id).set(entry.batchData);
    } else {
        // Undo a status change
        const batch = batches.find((b) => b.id === entry.id);
        if (batch) {
            batch.status = entry.prevStatus;
            batchesRef.child(entry.id).update({ status: entry.prevStatus });
        }
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

// ── Real-Time Listener (named functions for start/stop) ─────────────
function onBatches(snapshot) {
    const data = snapshot.val();
    batches = data ? Object.values(data) : [];
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
    if (activeTab === "latex") renderLatexBoard();
    updateCompletedCount();
    if (activeTab === "completed") renderCompleted();
}

// Auto-assign batch numbers to the top 2 batches in each bowl lane.
// This is the ONLY place that assigns numbers (besides advanceStatus for queued→mixing).
// Only ONE assignment runs at a time per client. Uses Firebase transaction on the
// batch's batchNumber field so multiple clients don't double-assign.
let _autoAssignInFlight = false;
let _autoAssignStartedAt = 0;
function assignNumbersToTopBatches() {
    // Safety net: if the flag has been stuck for >10 seconds, force-reset it.
    // This catches edge cases where a Firebase callback is never invoked.
    if (_autoAssignInFlight && (Date.now() - _autoAssignStartedAt > 10000)) {
        console.warn("Auto-assign was stuck for >10s — force-resetting");
        _autoAssignInFlight = false;
    }
    if (_autoAssignInFlight) return;
    for (const bowlKey of BOWL_ORDER) {
        const laneBatches = batches
            .filter((b) => b.bowl === bowlKey && b.status !== "batch_complete")
            .sort((a, b) => {
                const orderA = a.sortOrder != null ? a.sortOrder : a.createdAt;
                const orderB = b.sortOrder != null ? b.sortOrder : b.createdAt;
                return orderA - orderB;
            });

        // Check top 2 batches in each lane
        for (let i = 0; i < Math.min(2, laneBatches.length); i++) {
            if (!laneBatches[i].batchNumber) {
                const batchId = laneBatches[i].id;
                _autoAssignInFlight = true;
                _autoAssignStartedAt = Date.now();
                assignBatchNumber((batchNumber) => {
                    // Use transaction so only ONE client can set the batch number.
                    // If another client already set it, recycle our number.
                    batchesRef.child(batchId).child("batchNumber").transaction(
                        (current) => {
                            if (current) return; // Already set by another client — abort
                            return batchNumber;
                        },
                        (error, committed) => {
                            _autoAssignInFlight = false;
                            if (!committed && !error) {
                                // Another client won the race — recycle our number
                                const num = parseInt(batchNumber.slice(1), 10);
                                if (!isNaN(num) && num >= MIN_BATCH_NUMBER) {
                                    recycledNumbersRef.push(num);
                                }
                            }
                            // Firebase on("value") will fire → onBatchesChanged →
                            // assignNumbersToTopBatches picks up the next batch
                        }
                    );
                }, () => {
                    // Error getting batch number — reset flag so we can try again
                    _autoAssignInFlight = false;
                    console.error("Failed to assign batch number, will retry on next Firebase update");
                });
                return; // Only one at a time per client
            }
        }
    }
}

function onBatchesError(error) {
    console.error("Firebase connection error:", error);
    if (!document.getElementById("firebase-error-banner")) {
        const errDiv = document.createElement("div");
        errDiv.id = "firebase-error-banner";
        errDiv.style.cssText = "background:#fee;color:#c00;padding:16px 24px;font-weight:600;text-align:center;border-bottom:2px solid #c00;";
        errDiv.textContent = "Firebase error: " + error.message + " — Check your database rules in the Firebase console.";
        document.body.prepend(errDiv);
    }
}

// Run migration after initial setup
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

        // Allow dropping if admin or platform/floor operator
        if (isAdmin || isPlatformOrFloor()) {
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

// ── Latex Department — Tank Level Tracker ─────────────────────────────

function getTankFillColor(pct, tank, gallons) {
    if (pct <= 0) return "#e0e0e0";
    // Custom red thresholds per tank group
    if (tank) {
        const g = tank.group;
        if ((g === "Color Tanks" || g === "BR Tanks") && gallons <= 1500) return "#ef4444";
        if (g === "W Tanks" && gallons <= 5000) return "#ef4444";
        if (g === "Totes") {
            if (gallons <= 10) return "#ef4444";
            if (gallons <= 20) return "#f59e0b";
            return "#22c55e";
        }
    }
    if (pct < 20) return "#ef4444";
    if (pct < 50) return "#f59e0b";
    return "#22c55e";
}

function createTankSVG(tank, gallons) {
    const capacity = tank.capacity;
    const pct = Math.min(100, Math.max(0, (gallons / capacity) * 100));
    const fillColor = getTankFillColor(pct, tank, gallons);

    if (tank.group === "Totes") {
        return createToteSVG(tank, gallons, pct, fillColor);
    }

    // Tank body: 80x120 viewBox, fill rises from bottom
    const fillHeight = (pct / 100) * 80; // max body height is 80 (y 20..100)
    const fillY = 100 - fillHeight;

    return `
    <svg viewBox="0 0 80 120" class="tank-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Tank body -->
        <rect x="10" y="20" width="60" height="80" rx="4" ry="4" fill="#d1d5db" stroke="#6b7280" stroke-width="2"/>
        <!-- Fill level (clipped to body) -->
        <clipPath id="clip-${tank.id}">
            <rect x="10" y="20" width="60" height="80" rx="4" ry="4"/>
        </clipPath>
        <rect x="10" y="${fillY}" width="60" height="${fillHeight}" fill="${fillColor}" clip-path="url(#clip-${tank.id})"/>
        <!-- Top dome / cap -->
        <path d="M10,24 Q10,10 40,8 Q70,10 70,24" fill="#9ca3af" stroke="#6b7280" stroke-width="2"/>
        <!-- Pipe on top -->
        <rect x="35" y="2" width="10" height="8" rx="2" fill="#9ca3af" stroke="#6b7280" stroke-width="1.5"/>
        <!-- Legs -->
        <rect x="14" y="100" width="6" height="14" rx="1" fill="#6b7280"/>
        <rect x="60" y="100" width="6" height="14" rx="1" fill="#6b7280"/>
        <!-- Level lines -->
        <line x1="12" y1="40" x2="18" y2="40" stroke="#6b7280" stroke-width="0.8" opacity="0.5"/>
        <line x1="12" y1="60" x2="18" y2="60" stroke="#6b7280" stroke-width="0.8" opacity="0.5"/>
        <line x1="12" y1="80" x2="18" y2="80" stroke="#6b7280" stroke-width="0.8" opacity="0.5"/>
    </svg>`;
}

function createToteSVG(tank, gallons, pct, fillColor) {
    // IBC tote: cube container in a metal cage on a pallet
    const bodyH = 60; // inner container height (y 14..74)
    const fillHeight = (pct / 100) * bodyH;
    const fillY = 74 - fillHeight;

    return `
    <svg viewBox="0 0 80 110" class="tank-svg" xmlns="http://www.w3.org/2000/svg">
        <!-- Pallet base -->
        <rect x="6" y="82" width="68" height="8" rx="2" fill="#a07040" stroke="#7a5530" stroke-width="1.5"/>
        <rect x="10" y="90" width="10" height="6" rx="1" fill="#8b6035"/>
        <rect x="35" y="90" width="10" height="6" rx="1" fill="#8b6035"/>
        <rect x="60" y="90" width="10" height="6" rx="1" fill="#8b6035"/>
        <!-- Metal cage frame -->
        <rect x="8" y="12" width="64" height="70" rx="2" ry="2" fill="none" stroke="#9ca3af" stroke-width="2"/>
        <!-- Cage cross bars -->
        <line x1="8" y1="36" x2="72" y2="36" stroke="#9ca3af" stroke-width="1" opacity="0.5"/>
        <line x1="8" y1="56" x2="72" y2="56" stroke="#9ca3af" stroke-width="1" opacity="0.5"/>
        <line x1="28" y1="12" x2="28" y2="82" stroke="#9ca3af" stroke-width="1" opacity="0.4"/>
        <line x1="52" y1="12" x2="52" y2="82" stroke="#9ca3af" stroke-width="1" opacity="0.4"/>
        <!-- Inner container (white plastic) -->
        <rect x="12" y="14" width="56" height="66" rx="1" ry="1" fill="#e8ecf0" stroke="#d0d5dd" stroke-width="1"/>
        <!-- Fill level -->
        <clipPath id="clip-${tank.id}">
            <rect x="12" y="14" width="56" height="66" rx="1" ry="1"/>
        </clipPath>
        <rect x="12" y="${fillY}" width="56" height="${fillHeight + 6}" fill="${fillColor}" opacity="0.85" clip-path="url(#clip-${tank.id})"/>
        <!-- Cap / valve on top -->
        <rect x="34" y="6" width="12" height="8" rx="3" fill="#9ca3af" stroke="#6b7280" stroke-width="1.5"/>
        <!-- Valve at bottom -->
        <rect x="60" y="72" width="14" height="6" rx="2" fill="#9ca3af" stroke="#6b7280" stroke-width="1"/>
    </svg>`;
}

const LATEX_EDIT_USERS = [
    "master@colordept.local",
    "cwood@colordept.local",
    "kherrin@colordept.local",
    "matt@colordept.local",
    "ajolly@colordept.local",
    "hhudak@colordept.local",
    "paul@colordept.local",
];

function canEditLatexTotals(email) {
    return LATEX_EDIT_USERS.includes(email);
}

function renderLatexBoard() {
    latexBoard.innerHTML = "";

    const groups = {};
    for (const tank of LATEX_TANKS) {
        if (!groups[tank.group]) groups[tank.group] = [];
        groups[tank.group].push(tank);
    }

    for (const [groupName, tanks] of Object.entries(groups)) {
        const section = document.createElement("div");
        section.className = "tank-group";

        const header = document.createElement("h3");
        header.className = "tank-group-header";
        header.textContent = groupName;
        section.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "tank-grid";

        for (const tank of tanks) {
            const raw = latexTankLevels[tank.id];
            // Support both old plain number and new {value, updatedAt} format
            const gallons = (raw && typeof raw === "object") ? (raw.value || 0) : (raw || 0);
            const updatedAt = (raw && typeof raw === "object") ? raw.updatedAt : null;
            const pct = Math.min(100, Math.max(0, (gallons / tank.capacity) * 100));
            const isTote = tank.group === "Totes";
            const unit = isTote ? "qty" : "gal";
            const dateStr = updatedAt ? new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

            const card = document.createElement("div");
            card.className = "tank-card";
            card.innerHTML = `
                <div class="tank-edit-date">${dateStr}</div>
                <div class="tank-visual">
                    ${createTankSVG(tank, gallons)}
                </div>
                <div class="tank-label">${escapeHtml(tank.name)}</div>
                <div class="tank-level-display">${gallons.toLocaleString()} <span class="tank-unit">${unit}</span></div>
                ${isTote ? "" : `<div class="tank-pct">${Math.round(pct)}%</div>`}
                ${isTote ? "" : `<div class="tank-capacity">${tank.capacity.toLocaleString()} gal max</div>`}
                <input type="number" class="tank-input hidden" min="0" max="${tank.capacity}" value="${gallons}" data-tank-id="${tank.id}">
            `;

            // Click to edit (only cwood, kherrin, ajolly, master)
            card.addEventListener("click", (e) => {
                if (e.target.classList.contains("tank-input")) return;
                const user = auth.currentUser;
                if (!user || !canEditLatexTotals(user.email)) return;

                const input = card.querySelector(".tank-input");
                input.classList.remove("hidden");
                input.focus();
                input.select();
            });

            const input = card.querySelector(".tank-input");
            if (input) {
                input.addEventListener("blur", () => saveTankLevel(input));
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        saveTankLevel(input);
                    }
                });
            }

            grid.appendChild(card);
        }

        section.appendChild(grid);
        latexBoard.appendChild(section);
    }
}

function saveTankLevel(input) {
    const user = auth.currentUser;
    if (!user || !canEditLatexTotals(user.email)) {
        input.classList.add("hidden");
        return;
    }
    const tankId = input.dataset.tankId;
    const tank = LATEX_TANKS.find(t => t.id === tankId);
    let val = parseInt(input.value) || 0;
    if (val < 0) val = 0;
    if (tank && val > tank.capacity) val = tank.capacity;
    input.classList.add("hidden");
    latexTanksRef.child(tankId).set({ value: val, updatedAt: new Date().toISOString() });
}

// Named listener functions for start/stop
function onLatexTanks(snapshot) {
    latexTankLevels = snapshot.val() || {};
    if (activeTab === "latex") renderLatexBoard();
}

function onLatexTanksSeed(snapshot) {
    if (snapshot.exists()) return;
    const seed = {
        C1: 4000, C2: 5500, C3: 4200, C4: 3100, C5: 5500, C6: 4700, C7: 2700, C8: 4500,
        TRIPLE_T: 4300,
        BR1: 5289, BR2: 0, BR3: 6055, BR4: 1458, BR5: 5548, BR6: 4155, BR7: 2800,
        BR8: 5000, BR9: 5400, BR10: 5000, BR11: 2200, BR12: 300, BR13: 5200, BR14: 0,
        W1: 6900, W2: 1500, W3: 6400, W4: 4300, W5: 7000, W6: 9000,
        CB: 1, T1: 6, T2: 15, T3: 16, T4: 29, T5: 13, T6: 9,
    };
    latexTanksRef.set(seed);
}

const INVENTORY_ITEMS = [
    { id: "R1100", name: "Rovace 661 - Totes", unit: "gal", reorderLevel: 0, maxQty: null, leadTime: "7 Days", notes: "6000 Gal TT", initialCount: 0, pkg: "gal", weight: 8.87, group: "Raw Materials" },
    { id: "R1010", name: "80M", unit: "lbs", reorderLevel: 50000, maxQty: null, leadTime: "2 weeks", notes: "40/50# bags per pallet", initialCount: 42.0, pkg: "skids", weight: 2000.0, group: "Raw Materials" },
    { id: "R1020", name: "7080 Bag", unit: "skid", reorderLevel: 0, maxQty: null, leadTime: "2 weeks", notes: "Covia", initialCount: 10.0, pkg: "skids", weight: 2800.0, group: "Raw Materials" },
    { id: "R1117", name: "Tamol 901", unit: "tote", reorderLevel: 1100, maxQty: null, leadTime: "2 weeks", notes: "", initialCount: 0.75, pkg: "totes", weight: 2205.0, group: "Raw Materials" },
    { id: "R1941", name: "Tamol 851", unit: "lbs", reorderLevel: 2601, maxQty: null, leadTime: "10 Days", notes: "2601/Tote", initialCount: 3.0, pkg: "totes", weight: 2601.0, group: "Raw Materials" },
    { id: "R1250", name: "Ammonium", unit: "lbs", reorderLevel: 2250, maxQty: 5000, leadTime: "7 Days", notes: "2250 LB Tote", initialCount: 1.0, pkg: "totes", weight: 2250.0, group: "Raw Materials" },
    { id: "R1270", name: "Troy", unit: "lbs", reorderLevel: 450, maxQty: null, leadTime: "15 Days", notes: "450 lbs per drum", initialCount: 2.0, pkg: "drums", weight: 450.0, group: "Raw Materials" },
    { id: "R1315", name: "Supersperse", unit: "lbs", reorderLevel: 4100, maxQty: null, leadTime: "10 Days", notes: "2,050 lbs per tote", initialCount: 6.0, pkg: "totes", weight: 2050.0, group: "Raw Materials" },
    { id: "R1985", name: "FoamMaster", unit: "lbs", reorderLevel: 8000, maxQty: null, leadTime: "30 Days", notes: "1,900 lbs per tote", initialCount: 6.0, pkg: "totes", weight: 1900.0, group: "Raw Materials" },
    { id: "R1391", name: "Bio", unit: "lbs", reorderLevel: 1760, maxQty: null, leadTime: "7 Days", notes: "440 lbs per drum", initialCount: 6.0, pkg: "drums", weight: 440.0, group: "Raw Materials" },
    { id: "R1395", name: "D7", unit: "lbs", reorderLevel: 6600, maxQty: null, leadTime: "10 days", notes: "2204#Totes-was R1340", initialCount: 5.0, pkg: "totes", weight: 2204.0, group: "Raw Materials" },
    { id: "R1398", name: "Rocima BT 2S TOTES-Replaced Proxel", unit: "lbs", reorderLevel: 2050, maxQty: null, leadTime: "10 Days", notes: "2204 lbs/tote 5Roc/3Prx", initialCount: 0, pkg: "totes", weight: 2204.0, group: "Raw Materials" },
    { id: "R1393", name: "Polyph", unit: "lbs", reorderLevel: 440, maxQty: null, leadTime: "1 Month", notes: "441 lbs per drum", initialCount: 2.0, pkg: "drums", weight: 440.0, group: "Raw Materials" },
    { id: "R1500", name: "20", unit: "lbs", reorderLevel: 10000, maxQty: null, leadTime: "10 Days", notes: "50/30# bags per plt", initialCount: 22.0, pkg: "skids", weight: 1500.0, group: "Raw Materials" },
    { id: "R1505", name: "14-30", unit: "lbs", reorderLevel: 20000, maxQty: null, leadTime: "15 Days", notes: "40/50lb Bags/Pallet", initialCount: 21.0, pkg: "Skids", weight: 2000.0, group: "Raw Materials" },
    { id: "R1870", name: "Foamt", unit: "lbs", reorderLevel: 0, maxQty: null, leadTime: "", notes: "440# per drum", initialCount: 5.0, pkg: "drums", weight: 440.0, group: "Raw Materials" },
    { id: "R8050", name: "V100", unit: "lbs", reorderLevel: 600, maxQty: null, leadTime: "7 Days", notes: "600 lbs per drum", initialCount: 5.0, pkg: "drums", weight: 600.0, group: "Raw Materials" },
    { id: "R1555", name: "Glo", unit: "lbs", reorderLevel: 2750, maxQty: null, leadTime: "7 Days", notes: "2500/Skid(50/50#Bags)", initialCount: 2.0, pkg: "skids", weight: 2500.0, group: "Raw Materials" },
    { id: "R9060", name: "Ben", unit: "jug", reorderLevel: 0, maxQty: null, leadTime: "", notes: "5 Gal Jug", initialCount: 2.0, pkg: "jug", weight: 1.0, group: "Raw Materials" },
    { id: "R2610", name: "Triton", unit: "lbs", reorderLevel: 4000, maxQty: null, leadTime: "30 Days", notes: "480 lbs per drum", initialCount: 2.25, pkg: "skids", weight: 1920.0, group: "Raw Materials" },
    { id: "R2620", name: "Methan", unit: "gal", reorderLevel: 220, maxQty: null, leadTime: "5 Days", notes: "55 gal per drum", initialCount: 4.0, pkg: "skids", weight: 220.0, group: "Raw Materials" },
    { id: "R5035", name: "EB", unit: "lbs", reorderLevel: 3200, maxQty: null, leadTime: "10 Days", notes: "415 lbs per drum", initialCount: 6.0, pkg: "skids", weight: 1660.0, group: "Raw Materials" },
    { id: "R6096", name: "Bermocoll EBS481FQ", unit: "lbs", reorderLevel: 15000, maxQty: null, leadTime: "60 Days", notes: "50/44# bags per pallet", initialCount: 0, pkg: "skids", weight: 2200.0, group: "Raw Materials" },
    { id: "R8020", name: "Dispex", unit: "lbs", reorderLevel: 6613, maxQty: null, leadTime: "120 Days", notes: "2204.6 # per tote", initialCount: 22.0, pkg: "totes", weight: 2204.6, group: "Raw Materials" },
    { id: "R8020_2", name: "Dispex CX 4230", unit: "lbs", reorderLevel: 1760, maxQty: null, leadTime: "100 Days", notes: "440 lbs per drum", initialCount: 0, pkg: "drums", weight: 440.0, group: "Raw Materials" },
    { id: "R8020_3", name: "Dispex CX 4230 Drums", unit: "lbs", reorderLevel: 0, maxQty: null, leadTime: "30 Days", notes: "", initialCount: 0, pkg: "drums", weight: 450.0, group: "Raw Materials" },
    { id: "R8022", name: "Coadis", unit: "tote", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 1.0, pkg: "totes", weight: 2205.0, group: "Raw Materials" },
    { id: "R8060", name: "Tomak", unit: "lbs", reorderLevel: 474, maxQty: null, leadTime: "7 Days", notes: "474 lbs/Drum", initialCount: 3.0, pkg: "drums", weight: 474.0, group: "Raw Materials" },
    { id: "R1240", name: "TKP", unit: "lbs", reorderLevel: 2750, maxQty: null, leadTime: "7 Days", notes: "2000/Skid(40/50#Bags)", initialCount: 1.0, pkg: "skids", weight: 2000.0, group: "Raw Materials" },
    { id: "R1723", name: "COLANYL BLUE-B2G 131 GemSeal", unit: "lbs", reorderLevel: 33, maxQty: null, leadTime: "7 Days", notes: "33 lbs Per pail/5Gal Pail", initialCount: 0, pkg: "Pails", weight: 33.0, group: "Raw Materials" },
    { id: "R1560", name: "IMSI", unit: "lbs", reorderLevel: 40000, maxQty: null, leadTime: "15 Days", notes: "50/50# bags per pallet", initialCount: 11.75, pkg: "skids", weight: 2500.0, group: "Pigments" },
    { id: "R1565", name: "Silica Flour 140", unit: "lbs", reorderLevel: 40000, maxQty: null, leadTime: "15 Days", notes: "60/50# bags per pallet", initialCount: 0, pkg: "skids", weight: 3000.0, group: "Pigments" },
    { id: "R1621", name: "Deqing Tongchem TIO2", unit: "lbs", reorderLevel: 0, maxQty: null, leadTime: "75 Days", notes: "40/55# bags per pallet", initialCount: 0, pkg: "skids", weight: 2200.0, group: "Pigments" },
    { id: "R1820", name: "Natr.", unit: "lbs", reorderLevel: 20000, maxQty: null, leadTime: "35 Days", notes: "40/55 lb Bags 32,000 T/L", initialCount: 12.0, pkg: "Skids", weight: 2204.0, group: "Pigments" },
    { id: "R1619", name: "Whte", unit: "lbs", reorderLevel: 40000, maxQty: null, leadTime: "2 months", notes: "40 -25KG bags per skid", initialCount: 33.0, pkg: "skids", weight: 2204.0, group: "Pigments" },
    { id: "R1695", name: "Red", unit: "lbs", reorderLevel: 18000, maxQty: null, leadTime: "3 months", notes: "38/55# (7NW)", initialCount: 25.0, pkg: "skids", weight: 2090.0, group: "Pigments" },
    { id: "R8071", name: "Cal", unit: "lbs", reorderLevel: 2000, maxQty: null, leadTime: "15 Days", notes: "44 lbs Per pail/5Gal Pail", initialCount: 4.0, pkg: "Pails", weight: 44.0, group: "Pigments" },
    { id: "R1721", name: "Pht B", unit: "lbs", reorderLevel: 2000, maxQty: null, leadTime: "15 Days", notes: "450 lbs per drum", initialCount: 5.5, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1730", name: "Chrom Green Oxide L359", unit: "lbs", reorderLevel: 40000, maxQty: null, leadTime: "75 Days", notes: "55/40# bags per pallet", initialCount: 0, pkg: "skids", weight: 2200.0, group: "Pigments" },
    { id: "R1722", name: "RS", unit: "lbs", reorderLevel: 450, maxQty: null, leadTime: "2 Weeks", notes: "450 lbs per drum", initialCount: 0.25, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1735", name: "Green", unit: "lbs", reorderLevel: 60000, maxQty: null, leadTime: "3 months", notes: "(19NW) 40/55 bags pallet", initialCount: 30.0, pkg: "skids", weight: 2204.0, group: "Pigments" },
    { id: "R1735_2", name: "Lansco L359", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 0, pkg: "each", weight: 1, group: "Pigments" },
    { id: "R1736", name: "SG359 Chrome Green Oxide", unit: "lbs", reorderLevel: 40000, maxQty: null, leadTime: "60 Days", notes: "25 KG Bags", initialCount: 0, pkg: "skids", weight: 2200.0, group: "Pigments" },
    { id: "R1737", name: "Bike", unit: "lbs", reorderLevel: 450, maxQty: null, leadTime: "5 Days", notes: "450 lbs/drum (plus 2-5-pails)", initialCount: 0.5, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1684", name: "Firelane", unit: "lbs", reorderLevel: 450, maxQty: null, leadTime: "5 Days", notes: "450 lbs per drum", initialCount: 0, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1675", name: "Orange Drums", unit: "lbs", reorderLevel: 225, maxQty: null, leadTime: "5 Days", notes: "450 lbs per drum", initialCount: 0.5, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1715", name: "Orange Bags", unit: "skid", reorderLevel: 1, maxQty: null, leadTime: "30 Days", notes: "", initialCount: 1.0, pkg: "skids", weight: 661.0, group: "Pigments" },
    { id: "R1733", name: "Green Barn Paint", unit: "lbs", reorderLevel: 450, maxQty: null, leadTime: "5 Days", notes: "450 lbs per drum", initialCount: 0.25, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1732", name: "Viloet", unit: "lbs", reorderLevel: 450, maxQty: null, leadTime: "5 Days", notes: "450 lbs per drum", initialCount: 0.5, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R8034", name: "Napth Red", unit: "lbs", reorderLevel: 450, maxQty: null, leadTime: "5 Days", notes: "450 lbs per drum", initialCount: 1.0, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1685", name: "DPP", unit: "lbs", reorderLevel: 900, maxQty: 3250, leadTime: "5 Days", notes: "450 lbs per drum", initialCount: 1.75, pkg: "skids", weight: 1800.0, group: "Pigments" },
    { id: "R1745", name: "Black", unit: "lbs", reorderLevel: 10000, maxQty: null, leadTime: "4 months", notes: "40/55# bags (0-NW)", initialCount: 11.0, pkg: "skids", weight: 2204.0, group: "Pigments" },
    { id: "R8004", name: "BISM", unit: "skids", reorderLevel: 0, maxQty: null, leadTime: "", notes: "25 KG Bags", initialCount: 1.0, pkg: "skids", weight: 750.0, group: "Pigments" },
    { id: "R8005", name: "YELLOW 3", unit: "lbs", reorderLevel: 881, maxQty: null, leadTime: "2 months", notes: "Trust Chem_New 10/2024", initialCount: 2.5, pkg: "skids", weight: 881.4, group: "Pigments" },
    { id: "R8001", name: "65", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "", notes: "Trust Chem_New 5/2026", initialCount: 0, pkg: "skids", weight: 1, group: "Pigments" },
    { id: "R8001_2", name: "65", unit: "lbs", reorderLevel: 12000, maxQty: null, leadTime: "4 months", notes: "20/44.09 # per pallet", initialCount: 6.5, pkg: "skids", weight: 881.14, group: "Pigments" },
    { id: "R1700", name: "YLO", unit: "lbs", reorderLevel: 2000, maxQty: null, leadTime: "14 Days", notes: "30/50# bags/pallet", initialCount: 1.0, pkg: "skids", weight: 1500.0, group: "Pigments" },
    { id: "R7095", name: "Yellow Bayf", unit: "lbs", reorderLevel: 2500, maxQty: null, leadTime: "14 Days", notes: "50/50# bags/pallet", initialCount: 0.5, pkg: "skids", weight: 2500.0, group: "Pigments" },
    { id: "R1750", name: "Maroon", unit: "lbs", reorderLevel: 2000, maxQty: null, leadTime: "15 Days", notes: "44/50lb Bags", initialCount: 2.0, pkg: "Skids", weight: 2200.0, group: "Pigments" },
    { id: "R9240", name: "PT 12", unit: "tons", reorderLevel: 30, maxQty: null, leadTime: "7 Days", notes: "60/50# bags per pallet", initialCount: 10.0, pkg: "skids", weight: 3000.0, group: "Pigments" },
    { id: "R7500", name: "OMYA", unit: "tons", reorderLevel: 25, maxQty: null, leadTime: "7 Days", notes: "55/50# Bags per pallet", initialCount: 14.0, pkg: "Skids", weight: 2750.0, group: "Pigments" },
    { id: "R6020", name: "Silica Flour", unit: "tons", reorderLevel: 8, maxQty: null, leadTime: "20 Days", notes: "56/50# bags/plt-21 ton/T/L", initialCount: 3.0, pkg: "skids", weight: 2800.0, group: "Pigments" },
    { id: "R1630", name: "Brown", unit: "lbs", reorderLevel: 2000, maxQty: null, leadTime: "10 Days", notes: "40/50lb Bags", initialCount: 1.0, pkg: "Skids", weight: 2000.0, group: "Pigments" },
    { id: "R2152", name: "1 gal balck", unit: "Each", reorderLevel: 9000, maxQty: null, leadTime: "45 Days", notes: "90/Box 10bx/Plt", initialCount: 20.0, pkg: "skids", weight: 900.0, group: "1 Gal Pails & Lids" },
    { id: "R2153", name: "1 gal gray", unit: "Each", reorderLevel: 8000, maxQty: null, leadTime: "45 Days", notes: "540/layer x 2 = 1080", initialCount: 30.0, pkg: "skids", weight: 1080.0, group: "1 Gal Pails & Lids" },
    { id: "R2154", name: "1 gal white", unit: "Each", reorderLevel: 8000, maxQty: null, leadTime: "45 Days", notes: "1 Gallon(900/PLT)", initialCount: 21.0, pkg: "skids", weight: 900.0, group: "1 Gal Pails & Lids" },
    { id: "R2210R", name: "1 gal lid", unit: "Each", reorderLevel: 6000, maxQty: null, leadTime: "45 Days", notes: "300/Bx 15 bx/skid = 4,500", initialCount: 7.0, pkg: "skids", weight: 4500.0, group: "1 Gal Pails & Lids" },
    { id: "R2211", name: "1 gal navy lid", unit: "Each", reorderLevel: 10000, maxQty: null, leadTime: "45 Days", notes: "270/bx 15 bx/skid=4,050", initialCount: 9.0, pkg: "skids", weight: 4050.0, group: "1 Gal Pails & Lids" },
    { id: "R2212", name: "1 gal light blue lid", unit: "Each", reorderLevel: 5000, maxQty: null, leadTime: "45 Days", notes: "270/bx 15 bx/skid=4,050", initialCount: 3.0, pkg: "skids", weight: 4050.0, group: "1 Gal Pails & Lids" },
    { id: "R2214", name: "1 gal white lid", unit: "Each", reorderLevel: 2000, maxQty: null, leadTime: "45 Days", notes: "270/bx 15 bx/skid=4,050", initialCount: 0.25, pkg: "skids", weight: 4050.0, group: "1 Gal Pails & Lids" },
    { id: "R2216", name: "One Gallon Green Lid", unit: "Each", reorderLevel: 2000, maxQty: null, leadTime: "45 Days", notes: "Berry Plastics", initialCount: 0, pkg: "skids", weight: 1800.0, group: "1 Gal Pails & Lids" },
    { id: "R2217", name: "1 gal Red Lid", unit: "Each", reorderLevel: 1000, maxQty: null, leadTime: "45 Days", notes: "270/bx 15 bx/skid=4,050", initialCount: 0.75, pkg: "skids", weight: 4050.0, group: "1 Gal Pails & Lids" },
    { id: "R2244", name: "10yr R Coat", unit: "Each", reorderLevel: 5000, maxQty: null, leadTime: "45 Days", notes: "1 Gal. Printed(1120/PLT)", initialCount: 12.0, pkg: "skids", weight: 1120.0, group: "1 Gal Pails & Lids" },
    { id: "R2245", name: "R patch pails", unit: "Each", reorderLevel: 3000, maxQty: null, leadTime: "45 Days", notes: "1 Gal. Printed(1120/PLT)", initialCount: 3.0, pkg: "skids", weight: 1120.0, group: "1 Gal Pails & Lids" },
    { id: "R2140", name: "5 Gal Gray", unit: "Each", reorderLevel: 2600, maxQty: null, leadTime: "10-14 Days", notes: "Century", initialCount: 26.0, pkg: "skids", weight: 336.0, group: "5 & 3.5 Gal Pails & Lids" },
    { id: "R2160", name: "5 Gal White", unit: "Each", reorderLevel: 6000, maxQty: null, leadTime: "15 Days", notes: "Century pails", initialCount: 25.0, pkg: "stacks", weight: 336.0, group: "5 & 3.5 Gal Pails & Lids" },
    { id: "R2200", name: "5 Gallon Black lid", unit: "Each", reorderLevel: 6000, maxQty: null, leadTime: "10-14 Days", notes: "Keep 20,000 lids on Color End.", initialCount: 1.0, pkg: "each", weight: 1440.0, group: "5 & 3.5 Gal Pails & Lids" },
    { id: "R2030", name: "Black Recon 55G Drums", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "30-45 DAYS", notes: "Mauser/531408/black/Paint dept", initialCount: 0, pkg: "each", weight: 1.0, group: "Misc Containers" },
    { id: "R2065", name: "Green Recon 55G Drums", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "30-45 DAYS", notes: "Mauser/w40795/green full/ /", initialCount: 324.0, pkg: "each", weight: 1.0, group: "Misc Containers" },
    { id: "R2120", name: "Blue KEGS", unit: "Each", reorderLevel: 600, maxQty: 600, leadTime: "14- DAYS", notes: "32.5 A.C. Gal Kegs//Mauser Drop TL #2/ 38081-LP", initialCount: 600.0, pkg: "each", weight: 1.0, group: "Misc Containers" },
    { id: "R2120_2", name: "Blue KEGS", unit: "Each", reorderLevel: 600, maxQty: 600, leadTime: "14- DAYS", notes: "Mauser/1 st drop trailer/ W00973", initialCount: 620.0, pkg: "each", weight: 1.0, group: "Misc Containers" },
    { id: "R2330", name: "Totes", unit: "Each", reorderLevel: 120, maxQty: 300, leadTime: "7 Days", notes: "Vendor-Fiber Drum Sales", initialCount: 259.0, pkg: "each", weight: 1.0, group: "Misc Containers" },
    { id: "R2474", name: "10oz. Jetcoat Wht Roof Patch Tube", unit: "Each", reorderLevel: 4608, maxQty: null, leadTime: "2 Weeks", notes: "4608 per Pallet", initialCount: 0, pkg: "each", weight: 1.0, group: "Misc Containers" },
    { id: "R2296", name: "Jar", unit: "Each", reorderLevel: 10000, maxQty: 40000, leadTime: "6 wks", notes: "205 Per Box / 12 box per skid", initialCount: 11.0, pkg: "skid", weight: 2460.0, group: "Misc Containers" },
    { id: "R2297", name: "jar lid", unit: "Each", reorderLevel: 10000, maxQty: 40000, leadTime: "4 wks", notes: "624 per box/ 20 box per skid", initialCount: 0.5, pkg: "each", weight: 12480.0, group: "Misc Containers" },
    { id: "R2295", name: "Pints Empty 28-410", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "", notes: "OBSOLETE? LM", initialCount: 8100.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2407", name: "48 x 36 paint use", unit: "Each", reorderLevel: 300, maxQty: null, leadTime: "7 Days", notes: "For traffic paints", initialCount: 720.0, pkg: "each", weight: 1, group: "Misc Items" },
    { id: "R2270", name: "Caps White", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "", notes: "Uses:Paint: Roof Cleane/ Sealer: Maint INC-56250 per pallet", initialCount: 111600.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2306", name: "Sprayer", unit: "Each", reorderLevel: 4000, maxQty: null, leadTime: "5 Months", notes: "135 per box", initialCount: 5280.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2490", name: "Pint Boxes 9-Pack", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "", notes: "OBSOLETE?", initialCount: 0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2305", name: "Bottle 32oz White F Style", unit: "Each", reorderLevel: 1500, maxQty: null, leadTime: "12 weeks", notes: "120 per box", initialCount: 11520.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2500", name: "12 Pack Quart Bottle Boxes", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 250.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2501", name: "6 Pack Quart Bottle Boxes", unit: "Each", reorderLevel: 1000, maxQty: null, leadTime: "14 days", notes: "", initialCount: 2250.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2502", name: "12 Pack Spray Roof Boxes", unit: "Each", reorderLevel: 150, maxQty: null, leadTime: "14 days", notes: "", initialCount: 100.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2503", name: "Box - 4 pk Quart Bottle's", unit: "Each", reorderLevel: 500, maxQty: null, leadTime: "14 days", notes: "", initialCount: 1296.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2507", name: "12 PACK MASTER BOX", unit: "Each", reorderLevel: 1000, maxQty: null, leadTime: "14 Days", notes: "RSC 14 5/8 X 11 X 5 9/16 GLUED ONE COLOR 32 ECTc", initialCount: 2500.0, pkg: "each", weight: 1, group: "Misc Items" },
    { id: "R2510", name: "4 Pack Gallon Pail Box", unit: "Each", reorderLevel: 1000, maxQty: null, leadTime: "14 days", notes: "", initialCount: 2672.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2515", name: "6 Pack Gallon Pail Boxes", unit: "Each", reorderLevel: 800, maxQty: null, leadTime: "14 days", notes: "1", initialCount: 3562.0, pkg: "each", weight: 1.0, group: "Misc Items" },
    { id: "R2144", name: "FSA 5 Gal Pail Litho", unit: "EACH", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 8.0, pkg: "skid", weight: 336.0, group: "Misc Items" },
    { id: "R2146", name: "FSA", unit: "EACH", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 0, pkg: "skid", weight: 336.0, group: "Misc Items" },
    { id: "R2147", name: "Fass Dri 2 Gal Pail", unit: "EACH", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 4.0, pkg: "skid", weight: 702.0, group: "Misc Items" },
    { id: "R2080", name: "Drum Tops", unit: "EACH", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 1.25, pkg: "skid", weight: 250.0, group: "Misc Items" },
    { id: "R2143", name: "Fass Dri", unit: "EACH", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 9.0, pkg: "skid", weight: 336.0, group: "Misc Items" },
    { id: "R2222", name: "2 Gallon Royal Blue Lid", unit: "EACH", reorderLevel: 0, maxQty: null, leadTime: "", notes: "", initialCount: 1.5, pkg: "skid", weight: 2340.0, group: "Misc Items" },
    { id: "R2393", name: "40x40 Pallets", unit: "Each", reorderLevel: 0, maxQty: null, leadTime: "", notes: "2 Gallon Fass Dri Pallets", initialCount: 52.0, pkg: "each", weight: 1, group: "Misc Items" }
];

// ── Inventory Tab: Raw Material & Packaging Tracker ──────────────────

const INVENTORY_EDIT_USERS = [
    "master@colordept.local",
    "hhudak@colordept.local",
    "paul@colordept.local",
    "ajolly@colordept.local",
];

function canEditInventory(email) {
    return INVENTORY_EDIT_USERS.includes(email);
}

function getInventoryStatus(qty, reorderLevel) {
    if (!reorderLevel || reorderLevel <= 0) return "none";
    if (qty < reorderLevel) return "red";
    if (qty < reorderLevel * 1.5) return "yellow";
    return "green";
}

let invUndoStack = [];
const MAX_INV_UNDO = 10;

function pushInvUndo(action, itemId, data) {
    invUndoStack.push({ action, itemId, data, ts: Date.now() });
    if (invUndoStack.length > MAX_INV_UNDO) invUndoStack.shift();
    updateInvUndoBtn();
}

function undoInventoryAction() {
    if (invUndoStack.length === 0) return;
    const entry = invUndoStack.pop();
    if (entry.action === "delete") {
        inventoryRef.child(entry.itemId).set(entry.data);
        // Re-add to in-memory array if it was removed
        if (!INVENTORY_ITEMS.find(i => i.id === entry.itemId) && entry.data._meta) {
            INVENTORY_ITEMS.push({ id: entry.itemId, ...entry.data._meta, initialCount: entry.data.inv || 0 });
        }
    } else if (entry.action === "edit") {
        inventoryRef.child(entry.itemId).set(entry.data);
    } else if (entry.action === "add") {
        inventoryRef.child(entry.itemId).remove();
        const idx = INVENTORY_ITEMS.findIndex(i => i.id === entry.itemId);
        if (idx !== -1) INVENTORY_ITEMS.splice(idx, 1);
    }
    updateInvUndoBtn();
}

function updateInvUndoBtn() {
    const btn = document.getElementById("inv-undo-btn");
    if (btn) btn.classList.toggle("hidden", invUndoStack.length === 0);
}

function renderInventoryBoard() {
    inventoryBoard.innerHTML = "";
    // Rebuild toolbar
    const toolbar = document.createElement("div");
    toolbar.className = "inv-toolbar";
    const undoBtn = document.createElement("button");
    undoBtn.id = "inv-undo-btn";
    undoBtn.className = "btn btn-undo btn-undo-inv" + (invUndoStack.length === 0 ? " hidden" : "");
    undoBtn.textContent = "Undo";
    undoBtn.title = "Undo last inventory action";
    undoBtn.addEventListener("click", undoInventoryAction);
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary btn-sm";
    addBtn.textContent = "+ Add Raw";
    addBtn.addEventListener("click", showAddInventoryModal);
    const exportBtn = document.createElement("button");
    exportBtn.className = "btn btn-primary btn-sm btn-export";
    exportBtn.textContent = "Export to Excel";
    exportBtn.addEventListener("click", exportInventoryToExcel);
    toolbar.appendChild(undoBtn);
    toolbar.appendChild(addBtn);
    toolbar.appendChild(exportBtn);
    inventoryBoard.appendChild(toolbar);
    const groups = {};
    for (const item of INVENTORY_ITEMS) {
        if (!groups[item.group]) groups[item.group] = [];
        groups[item.group].push(item);
    }
    for (const [groupName, items] of Object.entries(groups)) {
        const section = document.createElement("div");
        section.className = "inv-group";
        const header = document.createElement("h3");
        header.className = "inv-group-header";
        header.textContent = groupName;
        section.appendChild(header);
        const grid = document.createElement("div");
        grid.className = "inv-grid";
        for (const item of items) {
            const raw = inventoryData[item.id];
            const inv = (raw && typeof raw === "object") ? (raw.inv || 0) : (raw || 0);
            const userNotes = (raw && typeof raw === "object") ? (raw.userNotes || "") : "";
            const qty = inv * item.weight;
            const status = getInventoryStatus(qty, item.reorderLevel);
            const updatedAt = (raw && typeof raw === "object") ? raw.dateCounted : null;
            const dateStr = updatedAt ? new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
            const displayNotes = userNotes || item.notes;
            const card = document.createElement("div");
            card.className = "inv-card" + (status !== "none" ? " status-" + status : "");
            card.dataset.itemId = item.id;
            card.innerHTML = `
                <div class="inv-card-date">${dateStr}</div>
                <div class="inv-card-name">${escapeHtml(item.name)}</div>
                <div class="inv-card-code">${escapeHtml(item.id)}</div>
                <div class="inv-card-qty">${qty.toLocaleString()} <span class="inv-card-qty-unit">${escapeHtml(item.unit)}</span></div>
                <div class="inv-card-pkg">${inv} ${escapeHtml(item.pkg)}</div>
                ${displayNotes ? `<div class="inv-card-notes">${escapeHtml(displayNotes)}</div>` : ""}
            `;
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "inv-card-delete";
            deleteBtn.innerHTML = "&times;";
            deleteBtn.title = "Remove item";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (confirm(`Remove "${item.name}" from inventory?`)) {
                    deleteInventoryItem(item);
                }
            });
            card.appendChild(deleteBtn);
            card.addEventListener("click", () => showInventoryDetailModal(item));
            grid.appendChild(card);
        }
        section.appendChild(grid);
        inventoryBoard.appendChild(section);
    }
}

let currentInvItem = null;

let invScrollPos = 0;

function showInventoryDetailModal(item) {
    currentInvItem = item;
    invScrollPos = window.scrollY;
    const raw = inventoryData[item.id];
    const inv = (raw && typeof raw === "object") ? (raw.inv || 0) : (raw || 0);
    const userNotes = (raw && typeof raw === "object") ? (raw.userNotes || "") : "";
    const qty = inv * item.weight;
    const status = getInventoryStatus(qty, item.reorderLevel);
    const updatedAt = (raw && typeof raw === "object") ? raw.dateCounted : null;
    const dateStr = updatedAt ? new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Never";

    document.getElementById("inv-detail-title").textContent = item.name;
    document.getElementById("inv-detail-code").textContent = item.id;
    document.getElementById("inv-detail-notes").value = userNotes || item.notes || "";
    const userLeadTime = (raw && typeof raw === "object") ? (raw.userLeadTime || "") : "";
    document.getElementById("inv-detail-leadtime").value = userLeadTime || item.leadTime || "";
    document.getElementById("inv-detail-reorder").textContent = item.reorderLevel ? item.reorderLevel.toLocaleString() + " " + item.unit : "\u2014";
    const stockInput = document.getElementById("inv-detail-stock");
    stockInput.value = inv;
    document.getElementById("inv-detail-pkg-type").textContent = item.pkg;
    document.getElementById("inv-detail-qty").textContent = qty.toLocaleString() + " " + item.unit;
    const badge = document.getElementById("inv-detail-status");
    badge.className = "inv-status-badge" + (status !== "none" ? " status-" + status : "");
    badge.textContent = status === "red" ? "BELOW REORDER" : status === "yellow" ? "LOW STOCK" : status === "green" ? "IN STOCK" : "";
    document.getElementById("inv-detail-date").textContent = "Last counted: " + dateStr;

    stockInput.oninput = () => {
        const val = parseFloat(stockInput.value) || 0;
        const newQty = val * item.weight;
        const newStatus = getInventoryStatus(newQty, item.reorderLevel);
        document.getElementById("inv-detail-qty").textContent = newQty.toLocaleString() + " " + item.unit;
        badge.className = "inv-status-badge" + (newStatus !== "none" ? " status-" + newStatus : "");
        badge.textContent = newStatus === "red" ? "BELOW REORDER" : newStatus === "yellow" ? "LOW STOCK" : newStatus === "green" ? "IN STOCK" : "";
    };

    document.getElementById("inventory-detail-overlay").classList.remove("hidden");
}

function saveInventoryItem() {
    if (!currentInvItem) return;
    const user = auth.currentUser;
    if (!user || !canEditInventory(user.email)) {
        alert("You do not have permission to edit inventory.");
        return;
    }
    const val = parseFloat(document.getElementById("inv-detail-stock").value) || 0;
    const userNotes = document.getElementById("inv-detail-notes").value.trim();
    const userLeadTime = document.getElementById("inv-detail-leadtime").value.trim();
    const itemId = currentInvItem.id.replace(/[.#$/\[\]]/g, "_");
    const savedScrollPos = invScrollPos;
    // Save previous state for undo
    const prevRaw = inventoryData[itemId];
    const prevData = prevRaw && typeof prevRaw === "object" ? { ...prevRaw } : { inv: prevRaw || 0 };
    pushInvUndo("edit", itemId, prevData);
    inventoryRef.child(itemId).set({ inv: val, userNotes: userNotes, userLeadTime: userLeadTime, dateCounted: new Date().toISOString() })
        .then(() => {
            closeInventoryModal();
            requestAnimationFrame(() => window.scrollTo(0, savedScrollPos));
        })
        .catch((err) => alert("Save failed: " + err.message));
}

function closeInventoryModal() {
    document.getElementById("inventory-detail-overlay").classList.add("hidden");
    currentInvItem = null;
    requestAnimationFrame(() => window.scrollTo(0, invScrollPos));
}

document.getElementById("inv-detail-save").addEventListener("click", saveInventoryItem);
document.getElementById("inv-detail-cancel").addEventListener("click", closeInventoryModal);
document.getElementById("inventory-detail-overlay").addEventListener("click", (e) => {
    if (e.target.id === "inventory-detail-overlay") closeInventoryModal();
});

function deleteInventoryItem(item) {
    const user = auth.currentUser;
    if (!user || !canEditInventory(user.email)) return;
    // Save current data for undo
    const raw = inventoryData[item.id];
    const undoData = raw && typeof raw === "object" ? { ...raw } : { inv: raw || 0 };
    undoData._meta = { name: item.name, unit: item.unit, reorderLevel: item.reorderLevel, maxQty: item.maxQty, leadTime: item.leadTime, notes: item.notes, pkg: item.pkg, weight: item.weight, group: item.group };
    pushInvUndo("delete", item.id, undoData);
    inventoryRef.child(item.id).remove();
    // Remove from in-memory array
    const idx = INVENTORY_ITEMS.findIndex(i => i.id === item.id);
    if (idx !== -1) INVENTORY_ITEMS.splice(idx, 1);
}

function showAddInventoryModal() {
    document.getElementById("inv-add-overlay").classList.remove("hidden");
    document.getElementById("inv-add-name").value = "";
    document.getElementById("inv-add-code").value = "";
    document.getElementById("inv-add-unit").value = "Each";
    document.getElementById("inv-add-reorder").value = "";
    document.getElementById("inv-add-leadtime").value = "";
    document.getElementById("inv-add-notes").value = "";
    document.getElementById("inv-add-pkg").value = "each";
    document.getElementById("inv-add-weight").value = "1";
    document.getElementById("inv-add-stock").value = "0";
    document.getElementById("inv-add-group").value = "Raw Materials";
    document.getElementById("inv-add-name").focus();
}

function saveNewInventoryItem() {
    const name = document.getElementById("inv-add-name").value.trim();
    const code = document.getElementById("inv-add-code").value.trim();
    if (!name || !code) { alert("Name and Item Code are required."); return; }
    const user = auth.currentUser;
    if (!user || !canEditInventory(user.email)) { alert("No permission."); return; }
    const newItem = {
        id: code,
        name: name,
        unit: document.getElementById("inv-add-unit").value.trim() || "Each",
        reorderLevel: parseInt(document.getElementById("inv-add-reorder").value) || 0,
        leadTime: document.getElementById("inv-add-leadtime").value.trim(),
        notes: document.getElementById("inv-add-notes").value.trim(),
        pkg: document.getElementById("inv-add-pkg").value.trim() || "each",
        weight: parseFloat(document.getElementById("inv-add-weight").value) || 1,
        group: document.getElementById("inv-add-group").value,
    };
    const stock = parseFloat(document.getElementById("inv-add-stock").value) || 0;
    // Add to INVENTORY_ITEMS in memory
    INVENTORY_ITEMS.push(newItem);
    pushInvUndo("add", code, null);
    // Save to Firebase
    inventoryRef.child(code).set({ inv: stock, userNotes: newItem.notes, dateCounted: new Date().toISOString(),
        _meta: { name: newItem.name, unit: newItem.unit, reorderLevel: newItem.reorderLevel, leadTime: newItem.leadTime, pkg: newItem.pkg, weight: newItem.weight, group: newItem.group }
    }).then(() => {
        document.getElementById("inv-add-overlay").classList.add("hidden");
        renderInventoryBoard();
    }).catch((err) => alert("Save failed: " + err.message));
}

function exportInventoryToExcel() {
    if (typeof XLSX === "undefined") { alert("Export library not loaded."); return; }
    const rows = [];
    for (const item of INVENTORY_ITEMS) {
        const raw = inventoryData[item.id];
        const inv = (raw && typeof raw === "object") ? (raw.inv || 0) : (raw || 0);
        const userNotes = (raw && typeof raw === "object") ? (raw.userNotes || "") : "";
        const qty = inv * item.weight;
        const updatedAt = (raw && typeof raw === "object") ? raw.dateCounted : null;
        rows.push({
            "Item Code": item.id,
            "Product": item.name,
            "QTY": qty,
            "Unit": item.unit,
            "Re-order Level": item.reorderLevel || "",
            "Lead Time": item.leadTime,
            "Notes": userNotes || item.notes,
            "Inventory": inv,
            "Package": item.pkg,
            "Weight/Pkg": item.weight,
            "Group": item.group,
            "Last Counted": updatedAt ? new Date(updatedAt).toLocaleDateString() : "",
        });
    }
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, "Inventory_" + new Date().toISOString().slice(0, 10) + ".xlsx");
}

document.getElementById("inv-add-save").addEventListener("click", saveNewInventoryItem);
document.getElementById("inv-add-cancel").addEventListener("click", () => {
    document.getElementById("inv-add-overlay").classList.add("hidden");
});
document.getElementById("inv-add-overlay").addEventListener("click", (e) => {
    if (e.target.id === "inv-add-overlay") document.getElementById("inv-add-overlay").classList.add("hidden");
});

function onInventoryData(snapshot) {
    inventoryData = snapshot.val() || {};
    if (activeTab === "inventory") {
        const scrollY = window.scrollY;
        renderInventoryBoard();
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
    }
}

function onInventorySeed(snapshot) {
    if (snapshot.exists()) return;
    const seed = {};
    for (const item of INVENTORY_ITEMS) {
        seed[item.id] = { inv: item.initialCount || 0, dateCounted: new Date().toISOString() };
    }
    inventoryRef.set(seed);
}

// ── Test Inventory Tab (separate sandbox) ────────────────────────────

const TEST_INV_ITEMS_DEFAULT = [
    { id: "T0001", name: "Test Raw A", unit: "lbs", reorderLevel: 500, maxQty: null, leadTime: "7 Days", notes: "Sample test item", pkg: "drums", weight: 100, group: "Test Raw Materials" },
    { id: "T0002", name: "Test Raw B", unit: "lbs", reorderLevel: 200, maxQty: null, leadTime: "14 Days", notes: "Another test item", pkg: "totes", weight: 500, group: "Test Raw Materials" },
    { id: "T0003", name: "Test Pigment", unit: "lbs", reorderLevel: 1000, maxQty: null, leadTime: "30 Days", notes: "Test pigment", pkg: "skids", weight: 2000, group: "Test Pigments" },
    { id: "T0004", name: "Test Container", unit: "Each", reorderLevel: 50, maxQty: null, leadTime: "5 Days", notes: "Test container", pkg: "each", weight: 1, group: "Test Containers" },
];

let currentTestInvItem = null;
let testInvScrollPos = 0;

function onTestInvData(snapshot) {
    testInvData = snapshot.val() || {};
    // Rebuild testInvItems from Firebase _meta
    testInvItems = [...TEST_INV_ITEMS_DEFAULT];
    for (const [id, raw] of Object.entries(testInvData)) {
        if (raw && raw._meta && !testInvItems.find(i => i.id === id)) {
            testInvItems.push({ id, ...raw._meta, initialCount: raw.inv || 0 });
        }
    }
    if (activeTab === "test-inv") {
        const scrollY = window.scrollY;
        renderTestInvBoard();
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
    }
}

function renderTestInvBoard() {
    testInvBoard.innerHTML = "";
    // Toolbar
    const toolbar = document.createElement("div");
    toolbar.className = "inv-toolbar";
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary btn-sm";
    addBtn.textContent = "+ Add Raw";
    addBtn.addEventListener("click", showTestInvAddModal);
    const exportBtn = document.createElement("button");
    exportBtn.className = "btn btn-primary btn-sm btn-export";
    exportBtn.textContent = "Export to Excel";
    exportBtn.addEventListener("click", exportTestInvToExcel);
    toolbar.appendChild(addBtn);
    toolbar.appendChild(exportBtn);
    testInvBoard.appendChild(toolbar);

    const groups = {};
    for (const item of testInvItems) {
        if (!groups[item.group]) groups[item.group] = [];
        groups[item.group].push(item);
    }
    for (const [groupName, items] of Object.entries(groups)) {
        const section = document.createElement("div");
        section.className = "inv-group";
        const header = document.createElement("h3");
        header.className = "inv-group-header";
        header.textContent = groupName;
        section.appendChild(header);
        const grid = document.createElement("div");
        grid.className = "inv-grid";
        for (const item of items) {
            const raw = testInvData[item.id];
            const inv = (raw && typeof raw === "object") ? (raw.inv || 0) : (raw || 0);
            const userNotes = (raw && typeof raw === "object") ? (raw.userNotes || "") : "";
            const qty = inv * item.weight;
            const status = getInventoryStatus(qty, item.reorderLevel);
            const updatedAt = (raw && typeof raw === "object") ? raw.dateCounted : null;
            const dateStr = updatedAt ? new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";
            const displayNotes = userNotes || item.notes;
            const card = document.createElement("div");
            card.className = "inv-card" + (status !== "none" ? " status-" + status : "");
            card.innerHTML = `
                <div class="inv-card-date">${dateStr}</div>
                <div class="inv-card-name">${escapeHtml(item.name)}</div>
                <div class="inv-card-code">${escapeHtml(item.id)}</div>
                <div class="inv-card-qty">${qty.toLocaleString()} <span class="inv-card-qty-unit">${escapeHtml(item.unit)}</span></div>
                <div class="inv-card-pkg">${inv} ${escapeHtml(item.pkg)}</div>
                ${displayNotes ? `<div class="inv-card-notes">${escapeHtml(displayNotes)}</div>` : ""}
            `;
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "inv-card-delete";
            deleteBtn.innerHTML = "&times;";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (confirm(`Remove "${item.name}" from test inventory?`)) {
                    testInvRef.child(item.id).remove();
                    const idx = testInvItems.findIndex(i => i.id === item.id);
                    if (idx !== -1) testInvItems.splice(idx, 1);
                }
            });
            card.appendChild(deleteBtn);
            card.addEventListener("click", () => showTestInvDetailModal(item));
            grid.appendChild(card);
        }
        section.appendChild(grid);
        testInvBoard.appendChild(section);
    }
}

function showTestInvDetailModal(item) {
    currentTestInvItem = item;
    testInvScrollPos = window.scrollY;
    const raw = testInvData[item.id];
    const inv = (raw && typeof raw === "object") ? (raw.inv || 0) : (raw || 0);
    const userNotes = (raw && typeof raw === "object") ? (raw.userNotes || "") : "";
    const userLeadTime = (raw && typeof raw === "object") ? (raw.userLeadTime || "") : "";
    const qty = inv * item.weight;
    const status = getInventoryStatus(qty, item.reorderLevel);
    const updatedAt = (raw && typeof raw === "object") ? raw.dateCounted : null;
    const dateStr = updatedAt ? new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Never";

    document.getElementById("test-inv-detail-title").textContent = item.name;
    document.getElementById("test-inv-detail-code").textContent = item.id;
    document.getElementById("test-inv-detail-notes").value = userNotes || item.notes || "";
    document.getElementById("test-inv-detail-leadtime").value = userLeadTime || item.leadTime || "";
    document.getElementById("test-inv-detail-reorder").textContent = item.reorderLevel ? item.reorderLevel.toLocaleString() + " " + item.unit : "\u2014";
    document.getElementById("test-inv-detail-stock").value = inv;
    document.getElementById("test-inv-detail-pkg-type").textContent = item.pkg;
    document.getElementById("test-inv-detail-qty").textContent = qty.toLocaleString() + " " + item.unit;
    const badge = document.getElementById("test-inv-detail-status");
    badge.className = "inv-status-badge" + (status !== "none" ? " status-" + status : "");
    badge.textContent = status === "red" ? "BELOW REORDER" : status === "yellow" ? "LOW STOCK" : status === "green" ? "IN STOCK" : "";
    document.getElementById("test-inv-detail-date").textContent = "Last counted: " + dateStr;

    const stockInput = document.getElementById("test-inv-detail-stock");
    stockInput.oninput = () => {
        const val = parseFloat(stockInput.value) || 0;
        const newQty = val * item.weight;
        const newStatus = getInventoryStatus(newQty, item.reorderLevel);
        document.getElementById("test-inv-detail-qty").textContent = newQty.toLocaleString() + " " + item.unit;
        badge.className = "inv-status-badge" + (newStatus !== "none" ? " status-" + newStatus : "");
        badge.textContent = newStatus === "red" ? "BELOW REORDER" : newStatus === "yellow" ? "LOW STOCK" : newStatus === "green" ? "IN STOCK" : "";
    };

    document.getElementById("test-inv-detail-overlay").classList.remove("hidden");
}

function saveTestInvItem() {
    if (!currentTestInvItem) return;
    const val = parseFloat(document.getElementById("test-inv-detail-stock").value) || 0;
    const userNotes = document.getElementById("test-inv-detail-notes").value.trim();
    const userLeadTime = document.getElementById("test-inv-detail-leadtime").value.trim();
    const savedPos = testInvScrollPos;
    testInvRef.child(currentTestInvItem.id).set({ inv: val, userNotes, userLeadTime, dateCounted: new Date().toISOString() })
        .then(() => {
            document.getElementById("test-inv-detail-overlay").classList.add("hidden");
            currentTestInvItem = null;
            requestAnimationFrame(() => window.scrollTo(0, savedPos));
        })
        .catch((err) => alert("Save failed: " + err.message));
}

function showTestInvAddModal() {
    document.getElementById("test-inv-add-overlay").classList.remove("hidden");
    document.getElementById("test-inv-add-name").value = "";
    document.getElementById("test-inv-add-code").value = "";
    document.getElementById("test-inv-add-unit").value = "Each";
    document.getElementById("test-inv-add-reorder").value = "";
    document.getElementById("test-inv-add-leadtime").value = "";
    document.getElementById("test-inv-add-notes").value = "";
    document.getElementById("test-inv-add-pkg").value = "each";
    document.getElementById("test-inv-add-weight").value = "1";
    document.getElementById("test-inv-add-stock").value = "0";
    document.getElementById("test-inv-add-group").value = "Test Raw Materials";
    document.getElementById("test-inv-add-name").focus();
}

function saveNewTestInvItem() {
    const name = document.getElementById("test-inv-add-name").value.trim();
    const code = document.getElementById("test-inv-add-code").value.trim();
    if (!name || !code) { alert("Name and Item Code are required."); return; }
    const newItem = {
        id: code, name, unit: document.getElementById("test-inv-add-unit").value.trim() || "Each",
        reorderLevel: parseInt(document.getElementById("test-inv-add-reorder").value) || 0,
        leadTime: document.getElementById("test-inv-add-leadtime").value.trim(),
        notes: document.getElementById("test-inv-add-notes").value.trim(),
        pkg: document.getElementById("test-inv-add-pkg").value.trim() || "each",
        weight: parseFloat(document.getElementById("test-inv-add-weight").value) || 1,
        group: document.getElementById("test-inv-add-group").value,
    };
    const stock = parseFloat(document.getElementById("test-inv-add-stock").value) || 0;
    testInvItems.push(newItem);
    testInvRef.child(code).set({ inv: stock, userNotes: newItem.notes, dateCounted: new Date().toISOString(),
        _meta: { name: newItem.name, unit: newItem.unit, reorderLevel: newItem.reorderLevel, leadTime: newItem.leadTime, pkg: newItem.pkg, weight: newItem.weight, group: newItem.group }
    }).then(() => {
        document.getElementById("test-inv-add-overlay").classList.add("hidden");
        renderTestInvBoard();
    }).catch((err) => alert("Save failed: " + err.message));
}

function exportTestInvToExcel() {
    if (typeof XLSX === "undefined") { alert("Export library not loaded."); return; }
    const rows = [];
    for (const item of testInvItems) {
        const raw = testInvData[item.id];
        const inv = (raw && typeof raw === "object") ? (raw.inv || 0) : (raw || 0);
        const userNotes = (raw && typeof raw === "object") ? (raw.userNotes || "") : "";
        const qty = inv * item.weight;
        rows.push({ "Item Code": item.id, "Product": item.name, "QTY": qty, "Unit": item.unit, "Re-order Level": item.reorderLevel || "", "Lead Time": item.leadTime, "Notes": userNotes || item.notes, "Inventory": inv, "Package": item.pkg, "Weight/Pkg": item.weight, "Group": item.group });
    }
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Test Inventory");
    XLSX.writeFile(wb, "Test_Inventory_" + new Date().toISOString().slice(0, 10) + ".xlsx");
}

document.getElementById("test-inv-detail-save").addEventListener("click", saveTestInvItem);
document.getElementById("test-inv-detail-cancel").addEventListener("click", () => {
    document.getElementById("test-inv-detail-overlay").classList.add("hidden");
    currentTestInvItem = null;
    requestAnimationFrame(() => window.scrollTo(0, testInvScrollPos));
});
document.getElementById("test-inv-detail-overlay").addEventListener("click", (e) => {
    if (e.target.id === "test-inv-detail-overlay") {
        document.getElementById("test-inv-detail-overlay").classList.add("hidden");
        currentTestInvItem = null;
        requestAnimationFrame(() => window.scrollTo(0, testInvScrollPos));
    }
});
document.getElementById("test-inv-add-save").addEventListener("click", saveNewTestInvItem);
document.getElementById("test-inv-add-cancel").addEventListener("click", () => {
    document.getElementById("test-inv-add-overlay").classList.add("hidden");
});
document.getElementById("test-inv-add-overlay").addEventListener("click", (e) => {
    if (e.target.id === "test-inv-add-overlay") document.getElementById("test-inv-add-overlay").classList.add("hidden");
});

// ── Completed Tab: Table / Chart / Export ────────────────────────────
let completedView = "table"; // "table" or "chart"
let completedChart = null;

const viewTableBtn = document.getElementById("view-table-btn");
const viewChartBtn = document.getElementById("view-chart-btn");
const viewHistoryBtn = document.getElementById("view-history-btn");
const exportExcelBtn = document.getElementById("export-excel-btn");
const completedTableWrap = document.getElementById("completed-table-wrap");
const completedChartWrap = document.getElementById("completed-chart-wrap");
const productHistoryWrap = document.getElementById("product-history-wrap");

const viewProdRecordBtn = document.getElementById("view-production-record-btn");
const productionRecordWrap = document.getElementById("production-record-wrap");
let productionRecordChart = null;

// Daily production data from 2024, 2025, and 2026 PRODUCTION RECORD spreadsheets
const PRODUCTION_RECORD_DATA = [{"d":"2022-08-26","c":1,"g":4356},{"d":"2022-09-30","c":1,"g":1040},{"d":"2024-01-02","c":18,"g":15930},{"d":"2024-01-03","c":3,"g":2815},{"d":"2024-01-04","c":1,"g":575},{"d":"2024-01-05","c":2,"g":2240},{"d":"2024-01-08","c":3,"g":3360},{"d":"2024-01-09","c":10,"g":7360},{"d":"2024-01-10","c":17,"g":17415},{"d":"2024-01-11","c":13,"g":12235},{"d":"2024-01-12","c":7,"g":5500},{"d":"2024-01-15","c":11,"g":8560},{"d":"2024-01-16","c":14,"g":14110},{"d":"2024-01-17","c":12,"g":9705},{"d":"2024-01-18","c":4,"g":1535},{"d":"2024-01-20","c":1,"g":575},{"d":"2024-01-22","c":11,"g":7900},{"d":"2024-01-23","c":8,"g":6635},{"d":"2024-01-24","c":6,"g":5675},{"d":"2024-01-25","c":12,"g":11290},{"d":"2024-01-26","c":6,"g":6150},{"d":"2024-02-01","c":11,"g":7479},{"d":"2024-02-02","c":7,"g":6590},{"d":"2024-02-05","c":9,"g":5530},{"d":"2024-02-06","c":9,"g":11495},{"d":"2024-02-07","c":14,"g":15265},{"d":"2024-02-08","c":13,"g":15030},{"d":"2024-02-09","c":2,"g":3135},{"d":"2024-02-12","c":2,"g":1270},{"d":"2024-02-13","c":8,"g":12405},{"d":"2024-02-14","c":9,"g":14930},{"d":"2024-02-15","c":12,"g":10720},{"d":"2024-02-16","c":6,"g":4580},{"d":"2024-02-19","c":5,"g":4710},{"d":"2024-02-20","c":8,"g":6755},{"d":"2024-02-21","c":9,"g":6054},{"d":"2024-02-22","c":10,"g":6060},{"d":"2024-02-23","c":7,"g":5120},{"d":"2024-02-25","c":1,"g":230},{"d":"2024-02-26","c":8,"g":5930},{"d":"2024-02-27","c":15,"g":15238},{"d":"2024-02-28","c":16,"g":17258},{"d":"2024-02-29","c":12,"g":10025},{"d":"2024-03-01","c":5,"g":3800},{"d":"2024-03-04","c":7,"g":4570},{"d":"2024-03-05","c":11,"g":12015},{"d":"2024-03-06","c":9,"g":4845},{"d":"2024-03-07","c":10,"g":8100},{"d":"2024-03-08","c":4,"g":7240},{"d":"2024-03-11","c":11,"g":5837},{"d":"2024-03-12","c":12,"g":15296},{"d":"2024-03-13","c":12,"g":9386},{"d":"2024-03-14","c":13,"g":15335},{"d":"2024-03-15","c":5,"g":8145},{"d":"2024-03-18","c":9,"g":5305},{"d":"2024-03-19","c":14,"g":15775},{"d":"2024-03-20","c":8,"g":4829},{"d":"2024-03-21","c":12,"g":15589},{"d":"2024-03-22","c":8,"g":16165},{"d":"2024-03-25","c":10,"g":6675},{"d":"2024-03-26","c":17,"g":22255},{"d":"2024-03-27","c":16,"g":15020},{"d":"2024-03-28","c":10,"g":6310},{"d":"2024-03-29","c":4,"g":7636},{"d":"2024-04-01","c":14,"g":8725},{"d":"2024-04-02","c":20,"g":20215},{"d":"2024-04-03","c":20,"g":21155},{"d":"2024-04-04","c":14,"g":11445},{"d":"2024-04-05","c":6,"g":3595},{"d":"2024-04-08","c":6,"g":4940},{"d":"2024-04-09","c":24,"g":21013},{"d":"2024-04-10","c":21,"g":21890},{"d":"2024-04-11","c":22,"g":29476},{"d":"2024-04-12","c":7,"g":6270},{"d":"2024-04-15","c":13,"g":14710},{"d":"2024-04-16","c":21,"g":28886},{"d":"2024-04-17","c":16,"g":21486},{"d":"2024-04-18","c":21,"g":20384},{"d":"2024-04-19","c":8,"g":8415},{"d":"2024-04-22","c":17,"g":12789},{"d":"2024-04-23","c":23,"g":36100},{"d":"2024-04-24","c":13,"g":15200},{"d":"2024-04-25","c":16,"g":20846},{"d":"2024-04-26","c":5,"g":4608},{"d":"2024-04-28","c":5,"g":5280},{"d":"2024-04-29","c":18,"g":18270},{"d":"2024-04-30","c":16,"g":25620},{"d":"2024-05-01","c":15,"g":18582},{"d":"2024-05-02","c":16,"g":16414},{"d":"2024-05-03","c":7,"g":11031},{"d":"2024-05-04","c":2,"g":2035},{"d":"2024-05-05","c":6,"g":6720},{"d":"2024-05-06","c":14,"g":9530},{"d":"2024-05-07","c":19,"g":25326},{"d":"2024-05-08","c":14,"g":15495},{"d":"2024-05-09","c":13,"g":21275},{"d":"2024-05-10","c":7,"g":9891},{"d":"2024-05-11","c":7,"g":7600},{"d":"2024-05-12","c":6,"g":5470},{"d":"2024-05-13","c":14,"g":18155},{"d":"2024-05-14","c":13,"g":14515},{"d":"2024-05-15","c":10,"g":15145},{"d":"2024-05-16","c":21,"g":29936},{"d":"2024-05-17","c":8,"g":4775},{"d":"2024-05-18","c":4,"g":4160},{"d":"2024-05-19","c":1,"g":1040},{"d":"2024-05-20","c":9,"g":6405},{"d":"2024-05-21","c":19,"g":32111},{"d":"2024-05-22","c":15,"g":14095},{"d":"2024-05-23","c":14,"g":21965},{"d":"2024-05-24","c":8,"g":15070},{"d":"2024-05-25","c":3,"g":3235},{"d":"2024-05-26","c":1,"g":2700},{"d":"2024-05-27","c":7,"g":6839},{"d":"2024-05-28","c":18,"g":34412},{"d":"2024-05-29","c":17,"g":25625},{"d":"2024-05-30","c":9,"g":13390},{"d":"2024-05-31","c":6,"g":8706},{"d":"2024-06-01","c":5,"g":4220},{"d":"2024-06-02","c":3,"g":2793},{"d":"2024-06-03","c":14,"g":16259},{"d":"2024-06-04","c":16,"g":20765},{"d":"2024-06-05","c":16,"g":16046},{"d":"2024-06-06","c":14,"g":16541},{"d":"2024-06-07","c":12,"g":20156},{"d":"2024-06-08","c":4,"g":4480},{"d":"2024-06-09","c":4,"g":4480},{"d":"2024-06-10","c":5,"g":8810},{"d":"2024-06-11","c":16,"g":22475},{"d":"2024-06-12","c":18,"g":24352},{"d":"2024-06-13","c":7,"g":10945},{"d":"2024-06-14","c":9,"g":12726},{"d":"2024-06-15","c":4,"g":3820},{"d":"2024-06-16","c":4,"g":4480},{"d":"2024-06-17","c":9,"g":6585},{"d":"2024-06-18","c":19,"g":25815},{"d":"2024-06-19","c":16,"g":25666},{"d":"2024-06-20","c":16,"g":28460},{"d":"2024-06-21","c":8,"g":9415},{"d":"2024-06-22","c":6,"g":9900},{"d":"2024-06-23","c":3,"g":3360},{"d":"2024-06-24","c":14,"g":16985},{"d":"2024-06-25","c":20,"g":31255},{"d":"2024-06-26","c":17,"g":17760},{"d":"2024-06-27","c":16,"g":15950},{"d":"2024-06-28","c":12,"g":18151},{"d":"2024-06-29","c":4,"g":3125},{"d":"2024-06-30","c":6,"g":6720},{"d":"2024-07-01","c":12,"g":18745},{"d":"2024-07-02","c":18,"g":25021},{"d":"2024-07-03","c":18,"g":26100},{"d":"2024-07-05","c":8,"g":13791},{"d":"2024-07-06","c":2,"g":2035},{"d":"2024-07-07","c":1,"g":1120},{"d":"2024-07-08","c":9,"g":15030},{"d":"2024-07-09","c":18,"g":26955},{"d":"2024-07-10","c":14,"g":15225},{"d":"2024-07-11","c":17,"g":14459},{"d":"2024-07-12","c":11,"g":12575},{"d":"2024-07-13","c":6,"g":6280},{"d":"2024-07-15","c":10,"g":9145},{"d":"2024-07-16","c":18,"g":27226},{"d":"2024-07-17","c":19,"g":23475},{"d":"2024-07-18","c":11,"g":18066},{"d":"2024-07-19","c":7,"g":8550},{"d":"2024-07-20","c":3,"g":5710},{"d":"2024-07-22","c":13,"g":13060},{"d":"2024-07-23","c":16,"g":24100},{"d":"2024-07-24","c":15,"g":23660},{"d":"2024-07-25","c":14,"g":16001},{"d":"2024-07-26","c":7,"g":12356},{"d":"2024-07-27","c":1,"g":2560},{"d":"2024-07-29","c":8,"g":10920},{"d":"2024-07-30","c":24,"g":26451},{"d":"2024-07-31","c":18,"g":29741},{"d":"2024-08-01","c":12,"g":12375},{"d":"2024-08-02","c":6,"g":8385},{"d":"2024-08-03","c":1,"g":2920},{"d":"2024-08-05","c":17,"g":17115},{"d":"2024-08-06","c":16,"g":28216},{"d":"2024-08-07","c":10,"g":9180},{"d":"2024-08-08","c":18,"g":28261},{"d":"2024-08-09","c":4,"g":6170},{"d":"2024-08-10","c":2,"g":5480},{"d":"2024-08-12","c":16,"g":14596},{"d":"2024-08-13","c":17,"g":18645},{"d":"2024-08-14","c":18,"g":28140},{"d":"2024-08-15","c":13,"g":18582},{"d":"2024-08-16","c":4,"g":5110},{"d":"2024-08-17","c":2,"g":3540},{"d":"2024-08-19","c":12,"g":11830},{"d":"2024-08-20","c":19,"g":25761},{"d":"2024-08-21","c":16,"g":16305},{"d":"2024-08-22","c":14,"g":15665},{"d":"2024-08-23","c":7,"g":21226},{"d":"2024-08-24","c":2,"g":2240},{"d":"2024-08-26","c":16,"g":16125},{"d":"2024-08-27","c":17,"g":22705},{"d":"2024-08-28","c":17,"g":19541},{"d":"2024-08-29","c":12,"g":15773},{"d":"2024-08-30","c":6,"g":5310},{"d":"2024-08-31","c":2,"g":1350},{"d":"2024-09-02","c":1,"g":1120},{"d":"2024-09-03","c":21,"g":24890},{"d":"2024-09-04","c":14,"g":21450},{"d":"2024-09-05","c":17,"g":22095},{"d":"2024-09-06","c":5,"g":8670},{"d":"2024-09-07","c":2,"g":2080},{"d":"2024-09-09","c":14,"g":9735},{"d":"2024-09-10","c":21,"g":33876},{"d":"2024-09-11","c":12,"g":11270},{"d":"2024-09-12","c":16,"g":15376},{"d":"2024-09-13","c":7,"g":11020},{"d":"2024-09-16","c":12,"g":15375},{"d":"2024-09-17","c":18,"g":24171},{"d":"2024-09-18","c":19,"g":23917},{"d":"2024-09-19","c":13,"g":18165},{"d":"2024-09-20","c":7,"g":9826},{"d":"2024-09-23","c":8,"g":4430},{"d":"2024-09-24","c":18,"g":25960},{"d":"2024-09-25","c":17,"g":29851},{"d":"2024-09-26","c":16,"g":20527},{"d":"2024-09-27","c":1,"g":1040},{"d":"2024-09-30","c":5,"g":3785},{"d":"2024-10-01","c":18,"g":14103},{"d":"2024-10-02","c":15,"g":14545},{"d":"2024-10-03","c":9,"g":5305},{"d":"2024-10-04","c":2,"g":4931},{"d":"2024-10-07","c":7,"g":5268},{"d":"2024-10-08","c":14,"g":15501},{"d":"2024-10-09","c":6,"g":4395},{"d":"2024-10-10","c":17,"g":12175},{"d":"2024-10-11","c":3,"g":2655},{"d":"2024-10-14","c":5,"g":3070},{"d":"2024-10-15","c":11,"g":12120},{"d":"2024-10-16","c":8,"g":6811},{"d":"2024-10-17","c":2,"g":1270},{"d":"2024-10-18","c":5,"g":2650},{"d":"2024-10-19","c":1,"g":575},{"d":"2024-10-21","c":14,"g":10065},{"d":"2024-10-22","c":12,"g":10025},{"d":"2024-10-23","c":19,"g":15418},{"d":"2024-10-24","c":8,"g":8433},{"d":"2024-10-25","c":4,"g":2190},{"d":"2024-10-28","c":9,"g":8475},{"d":"2024-10-29","c":21,"g":23382},{"d":"2024-10-30","c":13,"g":12180},{"d":"2024-10-31","c":14,"g":12445},{"d":"2024-11-01","c":10,"g":8895},{"d":"2024-11-04","c":10,"g":8010},{"d":"2024-11-05","c":9,"g":6870},{"d":"2024-11-06","c":17,"g":11565},{"d":"2024-11-07","c":9,"g":8485},{"d":"2024-11-08","c":9,"g":8445},{"d":"2024-11-11","c":5,"g":4510},{"d":"2024-11-12","c":14,"g":7815},{"d":"2024-11-13","c":3,"g":1735},{"d":"2024-11-14","c":1,"g":285},{"d":"2024-11-15","c":3,"g":690},{"d":"2024-11-16","c":1,"g":1040},{"d":"2024-11-18","c":10,"g":7263},{"d":"2024-11-19","c":12,"g":17499},{"d":"2024-11-20","c":14,"g":18211},{"d":"2024-11-21","c":9,"g":14181},{"d":"2024-11-22","c":1,"g":230},{"d":"2024-11-25","c":4,"g":1265},{"d":"2024-11-26","c":2,"g":1150},{"d":"2024-12-02","c":10,"g":8619},{"d":"2024-12-03","c":6,"g":2070},{"d":"2024-12-04","c":4,"g":1265},{"d":"2024-12-05","c":8,"g":5745},{"d":"2024-12-06","c":3,"g":2390},{"d":"2024-12-09","c":3,"g":2270},{"d":"2024-12-10","c":9,"g":10726},{"d":"2024-12-11","c":4,"g":5190},{"d":"2024-12-12","c":4,"g":3230},{"d":"2024-12-13","c":3,"g":3280},{"d":"2024-12-16","c":4,"g":2875},{"d":"2024-12-17","c":9,"g":9230},{"d":"2024-12-18","c":7,"g":8670},{"d":"2024-12-19","c":9,"g":13415},{"d":"2024-12-20","c":1,"g":1100},{"d":"2024-12-23","c":4,"g":3935},{"d":"2024-12-26","c":1,"g":1040},{"d":"2024-12-27","c":6,"g":4890},{"d":"2024-12-30","c":1,"g":1040},{"d":"2024-12-31","c":2,"g":5000},{"d":"2025-01-02","c":8,"g":8625},{"d":"2025-01-03","c":2,"g":1615},{"d":"2025-01-06","c":5,"g":4630},{"d":"2025-01-07","c":11,"g":15096},{"d":"2025-01-08","c":4,"g":5981},{"d":"2025-01-09","c":3,"g":945},{"d":"2025-01-10","c":1,"g":315},{"d":"2025-01-13","c":2,"g":1040},{"d":"2025-01-14","c":2,"g":5840},{"d":"2025-01-15","c":5,"g":945},{"d":"2025-01-16","c":4,"g":2870},{"d":"2025-01-17","c":4,"g":1895},{"d":"2025-01-20","c":2,"g":2240},{"d":"2025-01-21","c":3,"g":1870},{"d":"2025-01-22","c":12,"g":13246},{"d":"2025-01-23","c":4,"g":1955},{"d":"2025-01-24","c":3,"g":5495},{"d":"2025-01-27","c":5,"g":4690},{"d":"2025-01-31","c":5,"g":4815},{"d":"2025-02-02","c":1,"g":575},{"d":"2025-02-03","c":8,"g":4350},{"d":"2025-02-04","c":15,"g":25760},{"d":"2025-02-05","c":9,"g":8675},{"d":"2025-02-06","c":7,"g":8246},{"d":"2025-02-07","c":5,"g":3155},{"d":"2025-02-10","c":2,"g":805},{"d":"2025-02-11","c":12,"g":11150},{"d":"2025-02-12","c":10,"g":4149},{"d":"2025-02-13","c":8,"g":10620},{"d":"2025-02-14","c":4,"g":4480},{"d":"2025-02-17","c":3,"g":2470},{"d":"2025-02-18","c":9,"g":5775},{"d":"2025-02-19","c":9,"g":8710},{"d":"2025-02-20","c":8,"g":7920},{"d":"2025-02-21","c":7,"g":8185},{"d":"2025-02-24","c":15,"g":15708},{"d":"2025-02-25","c":15,"g":26616},{"d":"2025-02-26","c":12,"g":12171},{"d":"2025-02-27","c":9,"g":10795},{"d":"2025-02-28","c":4,"g":5700},{"d":"2025-03-03","c":6,"g":17336},{"d":"2025-03-04","c":8,"g":9190},{"d":"2025-03-05","c":10,"g":11671},{"d":"2025-03-06","c":6,"g":7716},{"d":"2025-03-07","c":5,"g":3885},{"d":"2025-03-10","c":9,"g":8020},{"d":"2025-03-11","c":12,"g":9931},{"d":"2025-03-12","c":20,"g":21335},{"d":"2025-03-13","c":9,"g":6295},{"d":"2025-03-14","c":7,"g":8130},{"d":"2025-03-17","c":11,"g":6920},{"d":"2025-03-18","c":17,"g":14215},{"d":"2025-03-19","c":19,"g":24551},{"d":"2025-03-20","c":11,"g":10835},{"d":"2025-03-21","c":6,"g":5850},{"d":"2025-03-24","c":10,"g":6625},{"d":"2025-03-25","c":20,"g":19550},{"d":"2025-03-26","c":19,"g":27660},{"d":"2025-03-27","c":18,"g":20875},{"d":"2025-03-28","c":7,"g":8271},{"d":"2025-03-31","c":12,"g":10530},{"d":"2025-04-01","c":13,"g":12150},{"d":"2025-04-02","c":13,"g":12575},{"d":"2025-04-03","c":14,"g":19445},{"d":"2025-04-04","c":11,"g":12861},{"d":"2025-04-07","c":13,"g":11530},{"d":"2025-04-08","c":13,"g":17760},{"d":"2025-04-09","c":21,"g":29202},{"d":"2025-04-10","c":21,"g":24016},{"d":"2025-04-11","c":1,"g":1200},{"d":"2025-04-12","c":1,"g":2500},{"d":"2025-04-14","c":15,"g":21625},{"d":"2025-04-15","c":17,"g":23501},{"d":"2025-04-16","c":15,"g":17794},{"d":"2025-04-17","c":12,"g":10925},{"d":"2025-04-18","c":9,"g":19191},{"d":"2025-04-19","c":2,"g":2400},{"d":"2025-04-21","c":15,"g":9930},{"d":"2025-04-22","c":24,"g":35809},{"d":"2025-04-23","c":16,"g":16870},{"d":"2025-04-24","c":19,"g":24945},{"d":"2025-04-25","c":15,"g":14534},{"d":"2025-04-26","c":1,"g":1200},{"d":"2025-04-28","c":10,"g":8139},{"d":"2025-04-29","c":17,"g":12795},{"d":"2025-04-30","c":16,"g":18342},{"d":"2025-05-01","c":16,"g":19376},{"d":"2025-05-02","c":8,"g":11110},{"d":"2025-05-03","c":3,"g":1915},{"d":"2025-05-05","c":10,"g":16455},{"d":"2025-05-06","c":20,"g":21860},{"d":"2025-05-07","c":20,"g":25551},{"d":"2025-05-08","c":13,"g":15690},{"d":"2025-05-09","c":11,"g":12770},{"d":"2025-05-10","c":1,"g":3600},{"d":"2025-05-12","c":10,"g":7745},{"d":"2025-05-13","c":18,"g":28244},{"d":"2025-05-14","c":18,"g":25615},{"d":"2025-05-15","c":22,"g":29960},{"d":"2025-05-16","c":15,"g":18270},{"d":"2025-05-17","c":1,"g":1120},{"d":"2025-05-19","c":20,"g":23845},{"d":"2025-05-20","c":18,"g":24096},{"d":"2025-05-21","c":19,"g":29756},{"d":"2025-05-22","c":13,"g":21937},{"d":"2025-05-23","c":12,"g":18951},{"d":"2025-05-24","c":3,"g":8845},{"d":"2025-05-26","c":4,"g":5130},{"d":"2025-05-27","c":20,"g":31664},{"d":"2025-05-28","c":18,"g":20920},{"d":"2025-05-29","c":19,"g":20106},{"d":"2025-05-30","c":10,"g":7720},{"d":"2025-05-31","c":3,"g":6190},{"d":"2025-06-02","c":11,"g":12845},{"d":"2025-06-03","c":24,"g":34040},{"d":"2025-06-04","c":21,"g":27661},{"d":"2025-06-05","c":13,"g":15850},{"d":"2025-06-06","c":10,"g":7470},{"d":"2025-06-07","c":4,"g":3590},{"d":"2025-06-09","c":14,"g":20360},{"d":"2025-06-10","c":17,"g":24556},{"d":"2025-06-11","c":25,"g":38916},{"d":"2025-06-12","c":18,"g":29540},{"d":"2025-06-13","c":10,"g":12480},{"d":"2025-06-14","c":4,"g":9230},{"d":"2025-06-16","c":16,"g":14685},{"d":"2025-06-17","c":13,"g":15615},{"d":"2025-06-18","c":17,"g":20270},{"d":"2025-06-19","c":14,"g":16480},{"d":"2025-06-20","c":8,"g":15075},{"d":"2025-06-21","c":2,"g":2080},{"d":"2025-06-23","c":14,"g":7973},{"d":"2025-06-24","c":16,"g":29611},{"d":"2025-06-25","c":17,"g":27550},{"d":"2025-06-26","c":16,"g":19226},{"d":"2025-06-27","c":4,"g":7660},{"d":"2025-06-28","c":2,"g":550},{"d":"2025-06-30","c":16,"g":10795},{"d":"2025-07-01","c":15,"g":27751},{"d":"2025-07-02","c":17,"g":26475},{"d":"2025-07-03","c":14,"g":15805},{"d":"2025-07-05","c":2,"g":880},{"d":"2025-07-07","c":8,"g":6960},{"d":"2025-07-08","c":15,"g":25230},{"d":"2025-07-09","c":16,"g":37391},{"d":"2025-07-10","c":14,"g":16295},{"d":"2025-07-11","c":8,"g":9840},{"d":"2025-07-12","c":5,"g":9156},{"d":"2025-07-14","c":12,"g":11455},{"d":"2025-07-15","c":17,"g":21650},{"d":"2025-07-16","c":17,"g":19575},{"d":"2025-07-17","c":19,"g":26776},{"d":"2025-07-18","c":9,"g":10674},{"d":"2025-07-19","c":3,"g":3869},{"d":"2025-07-21","c":15,"g":24556},{"d":"2025-07-22","c":20,"g":34010},{"d":"2025-07-23","c":15,"g":22716},{"d":"2025-07-24","c":19,"g":34570},{"d":"2025-07-25","c":13,"g":20826},{"d":"2025-07-28","c":16,"g":18386},{"d":"2025-07-29","c":18,"g":23806},{"d":"2025-07-30","c":18,"g":26546},{"d":"2025-07-31","c":14,"g":14190},{"d":"2025-08-01","c":7,"g":9931},{"d":"2025-08-04","c":12,"g":6939},{"d":"2025-08-05","c":16,"g":26760},{"d":"2025-08-06","c":20,"g":27400},{"d":"2025-08-07","c":20,"g":27486},{"d":"2025-08-08","c":7,"g":5355},{"d":"2025-08-11","c":15,"g":26985},{"d":"2025-08-12","c":13,"g":19766},{"d":"2025-08-13","c":20,"g":37896},{"d":"2025-08-14","c":16,"g":22456},{"d":"2025-08-15","c":5,"g":6524},{"d":"2025-08-16","c":3,"g":5760},{"d":"2025-08-18","c":13,"g":14290},{"d":"2025-08-19","c":20,"g":34490},{"d":"2025-08-20","c":20,"g":30015},{"d":"2025-08-21","c":13,"g":21296},{"d":"2025-08-22","c":9,"g":11990},{"d":"2025-08-23","c":3,"g":4490},{"d":"2025-08-25","c":15,"g":17430},{"d":"2025-08-26","c":14,"g":14120},{"d":"2025-08-27","c":19,"g":23286},{"d":"2025-08-28","c":21,"g":30835},{"d":"2025-08-29","c":10,"g":9060},{"d":"2025-09-02","c":22,"g":25185},{"d":"2025-09-03","c":16,"g":16035},{"d":"2025-09-04","c":17,"g":17371},{"d":"2025-09-05","c":10,"g":10605},{"d":"2025-09-08","c":13,"g":12850},{"d":"2025-09-09","c":14,"g":13550},{"d":"2025-09-10","c":18,"g":20375},{"d":"2025-09-11","c":17,"g":19955},{"d":"2025-09-12","c":7,"g":7135},{"d":"2025-09-13","c":1,"g":1040},{"d":"2025-09-15","c":12,"g":7900},{"d":"2025-09-16","c":15,"g":13375},{"d":"2025-09-17","c":12,"g":13640},{"d":"2025-09-18","c":16,"g":15742},{"d":"2025-09-19","c":5,"g":4750},{"d":"2025-09-20","c":2,"g":460},{"d":"2025-09-22","c":19,"g":21420},{"d":"2025-09-23","c":19,"g":26475},{"d":"2025-09-24","c":13,"g":15965},{"d":"2025-09-25","c":11,"g":11575},{"d":"2025-09-26","c":5,"g":4165},{"d":"2025-09-29","c":9,"g":8080},{"d":"2025-09-30","c":16,"g":22156},{"d":"2025-10-01","c":17,"g":20955},{"d":"2025-10-02","c":19,"g":22140},{"d":"2025-10-03","c":8,"g":7414},{"d":"2025-10-04","c":1,"g":1040},{"d":"2025-10-06","c":14,"g":9595},{"d":"2025-10-07","c":22,"g":23666},{"d":"2025-10-08","c":16,"g":11395},{"d":"2025-10-09","c":16,"g":18119},{"d":"2025-10-10","c":3,"g":2550},{"d":"2025-10-13","c":10,"g":4570},{"d":"2025-10-14","c":17,"g":12128},{"d":"2025-10-15","c":8,"g":8701},{"d":"2025-10-16","c":17,"g":14190},{"d":"2025-10-17","c":7,"g":6650},{"d":"2025-10-20","c":8,"g":14850},{"d":"2025-10-21","c":13,"g":10490},{"d":"2025-10-22","c":11,"g":19597},{"d":"2025-10-23","c":15,"g":18486},{"d":"2025-10-24","c":9,"g":12170},{"d":"2025-10-27","c":6,"g":3305},{"d":"2025-10-28","c":18,"g":22456},{"d":"2025-10-29","c":9,"g":8510},{"d":"2025-10-30","c":10,"g":8675},{"d":"2025-10-31","c":5,"g":2695},{"d":"2025-11-03","c":5,"g":3540},{"d":"2025-11-04","c":10,"g":9940},{"d":"2025-11-05","c":9,"g":5655},{"d":"2025-11-06","c":8,"g":5460},{"d":"2025-11-07","c":8,"g":5340},{"d":"2025-11-10","c":8,"g":5140},{"d":"2025-11-11","c":9,"g":5655},{"d":"2025-11-12","c":8,"g":8916},{"d":"2025-11-13","c":6,"g":9740},{"d":"2025-11-14","c":3,"g":4816},{"d":"2025-11-17","c":10,"g":7640},{"d":"2025-11-18","c":3,"g":1500},{"d":"2025-11-20","c":3,"g":1480},{"d":"2025-11-21","c":1,"g":230},{"d":"2025-11-22","c":1,"g":1040},{"d":"2025-11-24","c":3,"g":1650},{"d":"2025-11-25","c":3,"g":1691},{"d":"2025-12-02","c":18,"g":19045},{"d":"2025-12-03","c":6,"g":3325},{"d":"2025-12-04","c":5,"g":3715},{"d":"2025-12-05","c":1,"g":180},{"d":"2025-12-07","c":1,"g":575},{"d":"2025-12-09","c":12,"g":9921},{"d":"2025-12-10","c":8,"g":5209},{"d":"2025-12-11","c":7,"g":10195},{"d":"2025-12-12","c":5,"g":8425},{"d":"2025-12-16","c":6,"g":6685},{"d":"2025-12-17","c":4,"g":2480},{"d":"2025-12-18","c":6,"g":6905},{"d":"2025-12-19","c":3,"g":2815},{"d":"2025-12-22","c":4,"g":2965},{"d":"2025-12-23","c":5,"g":9390},{"d":"2025-12-24","c":1,"g":230},{"d":"2025-12-29","c":5,"g":6969},{"d":"2025-12-30","c":7,"g":7135},{"d":"2026-01-05","c":3,"g":3959},{"d":"2026-01-06","c":15,"g":17055},{"d":"2026-01-07","c":6,"g":15550},{"d":"2026-01-08","c":7,"g":5860},{"d":"2026-01-09","c":2,"g":1615},{"d":"2026-01-12","c":5,"g":2060},{"d":"2026-01-13","c":5,"g":4510},{"d":"2026-01-14","c":6,"g":2740},{"d":"2026-01-15","c":5,"g":3430},{"d":"2026-01-16","c":3,"g":2655},{"d":"2026-01-19","c":1,"g":1040},{"d":"2026-01-20","c":6,"g":2940},{"d":"2026-01-21","c":10,"g":10780},{"d":"2026-01-22","c":5,"g":6613},{"d":"2026-01-23","c":7,"g":6380},{"d":"2026-01-25","c":1,"g":1040},{"d":"2026-01-27","c":6,"g":4829},{"d":"2026-02-02","c":2,"g":2230},{"d":"2026-02-03","c":11,"g":7265},{"d":"2026-02-04","c":5,"g":1824},{"d":"2026-02-05","c":2,"g":486},{"d":"2026-02-06","c":5,"g":8676},{"d":"2026-02-09","c":2,"g":1150},{"d":"2026-02-10","c":18,"g":14679},{"d":"2026-02-11","c":9,"g":18110},{"d":"2026-02-12","c":10,"g":7525},{"d":"2026-02-13","c":3,"g":1500},{"d":"2026-02-16","c":7,"g":4890},{"d":"2026-02-17","c":12,"g":8137},{"d":"2026-02-18","c":8,"g":8400},{"d":"2026-02-19","c":12,"g":11050},{"d":"2026-02-20","c":10,"g":8330},{"d":"2026-02-24","c":11,"g":11175},{"d":"2026-02-25","c":12,"g":15164},{"d":"2026-02-26","c":10,"g":7785},{"d":"2026-02-27","c":3,"g":1035},{"d":"2026-03-02","c":4,"g":4440},{"d":"2026-03-03","c":9,"g":11900},{"d":"2026-03-04","c":18,"g":19015},{"d":"2026-03-05","c":16,"g":13720},{"d":"2026-03-06","c":10,"g":7371},{"d":"2026-03-09","c":12,"g":17245},{"d":"2026-03-10","c":11,"g":12265},{"d":"2026-03-11","c":18,"g":26169},{"d":"2026-03-12","c":16,"g":15892},{"d":"2026-03-13","c":6,"g":4440},{"d":"2026-05-28","c":1,"g":575}];

const PRODUCTION_RECORD_USERS = [
    "master@colordept.local",
    "jeff@colordept.local",
    "ajolly@colordept.local",
];

function canSeeProductionRecord() {
    const user = auth.currentUser;
    return user && PRODUCTION_RECORD_USERS.includes(user.email);
}

function setCompletedView(view) {
    completedView = view;
    viewTableBtn.classList.toggle("view-btn-active", view === "table");
    viewChartBtn.classList.toggle("view-btn-active", view === "chart");
    viewHistoryBtn.classList.toggle("view-btn-active", view === "history");
    viewProdRecordBtn.classList.toggle("view-btn-active", view === "production-record");
    completedTableWrap.classList.toggle("hidden", view !== "table");
    completedChartWrap.classList.toggle("hidden", view !== "chart");
    productHistoryWrap.classList.toggle("hidden", view !== "history");
    productionRecordWrap.classList.toggle("hidden", view !== "production-record");
    if (view === "production-record") renderProductionRecordChart();
}

viewTableBtn.addEventListener("click", () => setCompletedView("table"));

viewChartBtn.addEventListener("click", () => {
    if (isOperator && !isAdmin) return;
    setCompletedView("chart");
});

viewHistoryBtn.addEventListener("click", () => {
    if (!canSeeProductHistory()) return;
    setCompletedView("history");
    populateHistoryProductList();
});

viewProdRecordBtn.addEventListener("click", () => {
    if (!canSeeProductionRecord()) return;
    setCompletedView("production-record");
});

exportExcelBtn.addEventListener("click", exportToExcel);

const prodRecordFrom = document.getElementById("prod-record-from");
const prodRecordTo = document.getElementById("prod-record-to");
const prodRecordSearchBtn = document.getElementById("prod-record-search-btn");

prodRecordSearchBtn.addEventListener("click", renderProductionRecordChart);

function renderProductionRecordChart() {
    if (productionRecordChart) { productionRecordChart.destroy(); productionRecordChart = null; }

    const from = prodRecordFrom.value;
    const to = prodRecordTo.value;

    let filtered = PRODUCTION_RECORD_DATA;
    if (from) filtered = filtered.filter((r) => r.d >= from);
    if (to) filtered = filtered.filter((r) => r.d <= to);

    const labels = filtered.map((r) => r.d);
    const batchCounts = filtered.map((r) => r.c);
    const gallons = filtered.map((r) => r.g);
    const totalBatches = batchCounts.reduce((s, v) => s + v, 0);
    const totalGallons = gallons.reduce((s, v) => s + v, 0);

    productionRecordChart = new Chart(document.getElementById("production-record-chart").getContext("2d"), {
        type: "line",
        data: {
            labels,
            datasets: [
                { label: "Batches", data: batchCounts, borderColor: "#D4952B", backgroundColor: "rgba(212,149,43,0.1)", fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2 },
                { label: "Gallons", data: gallons, borderColor: "#3498db", backgroundColor: "rgba(52,152,219,0.1)", fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2, yAxisID: "y1" },
            ],
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: `Production Record — ${totalBatches} Batches / ${totalGallons.toLocaleString()} Gallons`, font: { size: 14 } },
                legend: { labels: { boxWidth: 12, font: { size: 11 } } },
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 } }, title: { display: true, text: "Batches", font: { size: 11 } } },
                y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, ticks: { font: { size: 10 } }, title: { display: true, text: "Gallons", font: { size: 11 } } },
            },
        },
    });
}

function getCompletedRows() {
    return batches
        .filter((b) => b.status === "batch_complete")
        .sort((a, b) => {
            const numA = a.batchNumber ? parseBatchNum(a.batchNumber) : NaN;
            const numB = b.batchNumber ? parseBatchNum(b.batchNumber) : NaN;
            // Batches with numbers come first, sorted numerically
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            if (!isNaN(numA)) return -1;
            if (!isNaN(numB)) return 1;
            // Both without numbers — fall back to timestamp
            const tA = a.mixingCompleteAt || a.completedAt || a.pouringAt || a.startedAt || a.createdAt || 0;
            const tB = b.mixingCompleteAt || b.completedAt || b.pouringAt || b.startedAt || b.createdAt || 0;
            return tA - tB;
        })
        .map((batch) => {
            const bowlInfo = BOWLS[batch.bowl];
            const bowlName = bowlInfo ? bowlInfo.name : batch.bowl;
            const bowlCap = batch.capacityOverride != null ? batch.capacityOverride : (bowlInfo ? bowlInfo.capacity : null);
            const fmtTs = (ts) => ts ? new Date(ts).toLocaleString() : "—";
            return {
                batchNumber: batch.batchNumber || "",
                product: batch.product,
                bowl: bowlName,
                capacity: bowlCap ? Number(bowlCap).toLocaleString() + " gal" : "N/A",
                capacityNum: bowlCap || 0,
                capacityRaw: bowlCap,
                packaging: batch.packaging || "",
                unitCount: batch.unitCount || "",
                viscosity: batch.viscosity || "",
                initials: batch.initials || "",
                initials2: batch.initials2 || "",
                pouredBy: batch.pouredBy || "",
                notes: batch.notes || "",
                queuedAt: fmtTs(batch.createdAt),
                mixingStarted: fmtTs(batch.startedAt),
                mixingComplete: fmtTs(batch.mixingCompleteAt),
                pouringStarted: fmtTs(batch.pouringAt),
                batchComplete: fmtTs(batch.completedAt),
                completedAt: batch.completedAt || 0,
                mixingCompleteAt: batch.mixingCompleteAt || 0,
                id: batch.id,
            };
        });
}

const BATCH_NUM_EDIT_USERS = [
    "ajolly@colordept.local",
];

function canEditBatchNumber() {
    const user = auth.currentUser;
    return user && BATCH_NUM_EDIT_USERS.includes(user.email);
}

// Batch search state
const batchSearchInput = document.getElementById("batch-search-input");
let batchSearchTerm = "";
batchSearchInput.addEventListener("input", () => {
    batchSearchTerm = batchSearchInput.value.trim().toUpperCase();
    if (activeTab === "completed") renderCompleted();
});

const UNIT_COUNT_EDIT_USERS = [
    "master@colordept.local",
    "kherrin@colordept.local",
    "matt@colordept.local",
    "ajolly@colordept.local",
    "floor@colordept.local",
];

function canEditUnitCount() {
    const user = auth.currentUser;
    return user && UNIT_COUNT_EDIT_USERS.includes(user.email);
}

const COMPLETED_FIELD_EDIT_USERS = [
    "ajolly@colordept.local",
];

function canEditCompletedFields() {
    const user = auth.currentUser;
    return user && COMPLETED_FIELD_EDIT_USERS.includes(user.email);
}

const PRODUCT_HISTORY_USERS = [
    "ajolly@colordept.local",
    "jeff@colordept.local",
    "dpanyard@colordept.local",
    "hhudak@colordept.local",
    "paul@colordept.local",
];

function canSeeProductHistory() {
    const user = auth.currentUser;
    return user && PRODUCT_HISTORY_USERS.includes(user.email);
}

function renderCompleted() {
    const rows = getCompletedRows();
    const tbody = document.getElementById("completed-table-body");
    const toolbar = document.querySelector(".completed-toolbar");

    // Show/hide Product History button based on user
    viewHistoryBtn.classList.toggle("hidden", !canSeeProductHistory());
    // Show/hide Production Record button based on user
    viewProdRecordBtn.classList.toggle("hidden", !canSeeProductionRecord());

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
        setCompletedView("table");
    }

    // Filter rows by search term
    const filteredRows = batchSearchTerm
        ? rows.filter(r => r.batchNumber && r.batchNumber.toUpperCase().includes(batchSearchTerm))
        : rows;

    const canEditBatch = canEditBatchNumber() || isAdmin;
    const canAssignBatch = canEditBatch || isPlatformOrFloor();
    const editableCompleted = canEditCompletedFields();

    tbody.innerHTML = filteredRows.map((r, i) => {
        let batchNumContent;
        const batchClickable = r.batchNumber ? canEditBatch : canAssignBatch;
        if (r.batchNumber) {
            const batchNumHtml = escapeHtml(r.batchNumber);
            batchNumContent = batchSearchTerm
                ? batchNumHtml.replace(new RegExp(`(${batchSearchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi"), `<mark class="batch-search-highlight">$1</mark>`)
                : batchNumHtml;
        } else {
            batchNumContent = canAssignBatch ? `<span class="assign-batch-btn">Assign</span>` : "—";
        }
        const batchNumClass = `batch-num-cell${batchClickable ? ' editable-batch-num' : ''}`;
        const ecf = editableCompleted ? 'editable-completed-field' : '';
        return `<tr>
            <td>${i + 1}</td>
            <td class="${batchNumClass}" data-batch-id="${r.id}">${batchNumContent}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="product">${escapeHtml(r.product)}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="bowl">${escapeHtml(r.bowl)}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="capacity">${r.capacity}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="packaging">${escapeHtml(r.packaging)}</td>
            <td class="${canEditUnitCount() ? 'editable-unit-count' : ''}" data-batch-id="${r.id}" data-field="unitCount">${r.unitCount ? Number(r.unitCount).toLocaleString() : "—"}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="viscosity">${r.viscosity ? escapeHtml(r.viscosity) + " KU" : "—"}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="initials">${escapeHtml(r.initials) || "—"}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="initials2">${escapeHtml(r.initials2) || "—"}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="pouredBy">${escapeHtml(r.pouredBy) || "—"}</td>
            <td class="${ecf}" data-batch-id="${r.id}" data-field="notes">${escapeHtml(r.notes) || "—"}</td>
            <td class="completed-time-cell ${ecf}" data-batch-id="${r.id}" data-field="createdAt">${r.queuedAt}</td>
            <td class="completed-time-cell ${ecf}" data-batch-id="${r.id}" data-field="startedAt">${r.mixingStarted}</td>
            <td class="completed-time-cell ${ecf}" data-batch-id="${r.id}" data-field="mixingCompleteAt">${r.mixingComplete}</td>
            <td class="completed-time-cell ${ecf}" data-batch-id="${r.id}" data-field="pouringAt">${r.pouringStarted}</td>
            <td class="completed-time-cell ${ecf}" data-batch-id="${r.id}" data-field="completedAt">${r.batchComplete}${isAdmin ? ` <button class="btn btn-sm btn-delete" data-action="delete" data-id="${r.id}">&times;</button>` : ""}</td>
        </tr>`;
    }).join("");

    // Attach inline-edit handlers for batch number cells
    if (canAssignBatch) {
        tbody.querySelectorAll(".editable-batch-num").forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("input")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                // No number yet — auto-assign next in sequence (admin, ajolly, floor, platform)
                if (!batch.batchNumber) {
                    const nextNum = getNextBatchNumber();
                    batch.batchNumber = nextNum;
                    batchesRef.child(batchId).update({ batchNumber: nextNum });
                    td.innerHTML = escapeHtml(nextNum);
                    return;
                }

                // Already has a number — only admin/ajolly can edit
                if (!canEditBatch) return;

                const currentVal = batch.batchNumber;
                const input = document.createElement("input");
                input.type = "text";
                input.className = "tank-input";
                input.style.width = "80px";
                input.value = currentVal;
                td.textContent = "";
                td.appendChild(input);
                input.focus();
                input.select();

                const save = () => {
                    const val = input.value.trim().toUpperCase();
                    if (val && val !== currentVal) {
                        if (isBatchNumberTaken(val, batchId)) {
                            alert("Batch number \"" + val + "\" is already in use by another batch.");
                            input.focus();
                            return;
                        }
                    }
                    batch.batchNumber = val || null;
                    batchesRef.child(batchId).update({ batchNumber: batch.batchNumber });
                    td.innerHTML = batch.batchNumber ? escapeHtml(batch.batchNumber) : `<span class="assign-batch-btn">Assign</span>`;
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") { e.preventDefault(); save(); }
                    if (e.key === "Escape") { td.innerHTML = escapeHtml(currentVal); }
                });
            });
        });
    }

    // Attach inline-edit handlers for unit count cells
    if (canEditUnitCount()) {
        tbody.querySelectorAll(".editable-unit-count").forEach(td => {
            td.style.cursor = "pointer";
            td.addEventListener("click", () => {
                if (td.querySelector("input")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.unitCount || "";
                const input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.className = "tank-input";
                input.style.width = "80px";
                input.value = currentVal;
                td.textContent = "";
                td.appendChild(input);
                input.focus();
                input.select();

                const save = () => {
                    const val = input.value.trim();
                    batch.unitCount = val ? Number(val) : null;
                    batchesRef.child(batchId).update({ unitCount: batch.unitCount });
                    td.textContent = batch.unitCount ? Number(batch.unitCount).toLocaleString() : "—";
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") { e.preventDefault(); save(); }
                    if (e.key === "Escape") { td.textContent = currentVal ? Number(currentVal).toLocaleString() : "—"; }
                });
            });
        });
    }

    // Attach inline-edit handlers for bowl, packaging, capacity, viscosity, and date (ajolly)
    if (editableCompleted) {
        // Bowl editing (dropdown)
        tbody.querySelectorAll('.editable-completed-field[data-field="bowl"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("select")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.bowl || "";
                const select = document.createElement("select");
                select.className = "tank-input";
                select.style.width = "140px";
                BOWL_ORDER.forEach(key => {
                    const opt = document.createElement("option");
                    opt.value = key;
                    opt.textContent = BOWLS[key].name;
                    if (key === currentVal) opt.selected = true;
                    select.appendChild(opt);
                });
                td.textContent = "";
                td.appendChild(select);
                select.focus();

                const save = () => {
                    const val = select.value;
                    batch.bowl = val;
                    const newBowlInfo = BOWLS[val];
                    batchesRef.child(batchId).update({ bowl: val });
                    td.textContent = newBowlInfo ? newBowlInfo.name : val;
                    // Also update the capacity cell in the same row
                    const capTd = td.parentElement.querySelector('[data-field="capacity"]');
                    if (capTd && !capTd.querySelector("input")) {
                        const cap = batch.capacityOverride != null ? batch.capacityOverride : (newBowlInfo ? newBowlInfo.capacity : null);
                        capTd.textContent = cap ? Number(cap).toLocaleString() + " gal" : "N/A";
                    }
                };
                select.addEventListener("blur", save);
                select.addEventListener("change", save);
                select.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") {
                        const bowlInfo = BOWLS[currentVal];
                        td.textContent = bowlInfo ? bowlInfo.name : currentVal;
                    }
                });
            });
        });

        // Packaging editing (dropdown)
        tbody.querySelectorAll('.editable-completed-field[data-field="packaging"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("select")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.packaging || "";
                const select = document.createElement("select");
                select.className = "tank-input";
                select.style.width = "150px";
                Object.keys(PACKAGING).forEach(key => {
                    const opt = document.createElement("option");
                    opt.value = key;
                    opt.textContent = key;
                    if (key === currentVal) opt.selected = true;
                    select.appendChild(opt);
                });
                td.textContent = "";
                td.appendChild(select);
                select.focus();

                const save = () => {
                    const val = select.value;
                    batch.packaging = val;
                    batchesRef.child(batchId).update({ packaging: val });
                    td.textContent = val;
                };
                select.addEventListener("blur", save);
                select.addEventListener("change", save);
                select.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") { td.textContent = currentVal || "—"; }
                });
            });
        });

        // Capacity editing
        tbody.querySelectorAll('.editable-completed-field[data-field="capacity"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("input")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const bowlInfo = BOWLS[batch.bowl];
                const currentVal = batch.capacityOverride != null ? batch.capacityOverride : (bowlInfo ? bowlInfo.capacity : "");
                const input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.className = "tank-input";
                input.style.width = "90px";
                input.value = currentVal || "";
                td.textContent = "";
                td.appendChild(input);
                input.focus();
                input.select();

                const save = () => {
                    const val = input.value.trim();
                    const numVal = val ? Number(val) : null;
                    batch.capacityOverride = numVal;
                    batchesRef.child(batchId).update({ capacityOverride: numVal });
                    td.textContent = numVal ? Number(numVal).toLocaleString() + " gal" : "N/A";
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") { e.preventDefault(); save(); }
                    if (e.key === "Escape") { td.textContent = currentVal ? Number(currentVal).toLocaleString() + " gal" : "N/A"; }
                });
            });
        });

        // Viscosity editing
        tbody.querySelectorAll('.editable-completed-field[data-field="viscosity"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("input")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.viscosity || "";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "tank-input";
                input.style.width = "70px";
                input.value = currentVal;
                td.textContent = "";
                td.appendChild(input);
                input.focus();
                input.select();

                const save = () => {
                    const val = input.value.trim();
                    batch.viscosity = val || null;
                    batchesRef.child(batchId).update({ viscosity: batch.viscosity });
                    td.textContent = batch.viscosity ? escapeHtml(batch.viscosity) + " KU" : "—";
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") { e.preventDefault(); save(); }
                    if (e.key === "Escape") { td.textContent = currentVal ? escapeHtml(currentVal) + " KU" : "—"; }
                });
            });
        });

        // Datetime editing for all timestamp fields (completedAt, createdAt, startedAt, mixingCompleteAt, pouringAt)
        ["completedAt", "createdAt", "startedAt", "mixingCompleteAt", "pouringAt"].forEach(field => {
            tbody.querySelectorAll(`.editable-completed-field[data-field="${field}"]`).forEach(td => {
                td.addEventListener("click", (e) => {
                    if (e.target.closest("button")) return;
                    if (td.querySelector("input")) return;
                    const batchId = td.dataset.batchId;
                    const batch = batches.find(b => b.id === batchId);
                    if (!batch) return;

                    const currentTs = batch[field] || null;
                    const deleteBtn = td.querySelector(".btn-delete");
                    const input = document.createElement("input");
                    input.type = "datetime-local";
                    input.className = "tank-input";
                    input.style.width = "200px";
                    if (currentTs) {
                        const d = new Date(currentTs);
                        const pad = (n) => String(n).padStart(2, "0");
                        input.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                    }
                    td.textContent = "";
                    td.appendChild(input);
                    if (deleteBtn) td.appendChild(deleteBtn);
                    input.focus();

                    const save = () => {
                        const val = input.value;
                        const newTs = val ? new Date(val).getTime() : null;
                        batch[field] = newTs;
                        batchesRef.child(batchId).update({ [field]: newTs });
                        const display = newTs ? new Date(newTs).toLocaleString() : "—";
                        input.remove();
                        td.childNodes.forEach(n => { if (n.nodeType === 3) n.remove(); });
                        const textNode = document.createTextNode(display + " ");
                        td.insertBefore(textNode, td.firstChild);
                    };
                    input.addEventListener("blur", save);
                    input.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") { e.preventDefault(); save(); }
                        if (e.key === "Escape") {
                            const display = currentTs ? new Date(currentTs).toLocaleString() : "—";
                            input.remove();
                            td.childNodes.forEach(n => { if (n.nodeType === 3) n.remove(); });
                            const textNode = document.createTextNode(display + " ");
                            td.insertBefore(textNode, td.firstChild);
                        }
                    });
                });
            });
        });

        // Product name editing (text input)
        tbody.querySelectorAll('.editable-completed-field[data-field="product"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("input")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.product || "";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "tank-input";
                input.style.width = "200px";
                input.value = currentVal;
                td.textContent = "";
                td.appendChild(input);
                input.focus();
                input.select();

                const save = () => {
                    const val = input.value.trim();
                    if (val) {
                        batch.product = val;
                        batchesRef.child(batchId).update({ product: val });
                    }
                    td.textContent = batch.product ? escapeHtml(batch.product) : "—";
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") { e.preventDefault(); save(); }
                    if (e.key === "Escape") { td.textContent = currentVal ? escapeHtml(currentVal) : "—"; }
                });
            });
        });

        // Mixed By editing (dropdown)
        tbody.querySelectorAll('.editable-completed-field[data-field="initials"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("select")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.initials || "";
                const select = document.createElement("select");
                select.className = "tank-input";
                select.style.width = "150px";
                const names = ["", "Matt Huff", "Peyton Smith", "Brandon Jones", "Josh James", "Josh Wimer", "Elijah Baker", "Kevin Alexander", "Chris Wood", "Kevin Mackey"];
                names.forEach(name => {
                    const opt = document.createElement("option");
                    opt.value = name;
                    opt.textContent = name || "-- None --";
                    if (name === currentVal) opt.selected = true;
                    select.appendChild(opt);
                });
                td.textContent = "";
                td.appendChild(select);
                select.focus();

                const save = () => {
                    const val = select.value;
                    batch.initials = val || null;
                    batchesRef.child(batchId).update({ initials: batch.initials });
                    td.textContent = batch.initials ? escapeHtml(batch.initials) : "—";
                };
                select.addEventListener("blur", save);
                select.addEventListener("change", save);
                select.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") { td.textContent = currentVal ? escapeHtml(currentVal) : "—"; }
                });
            });
        });

        // Mixed By 2 editing (dropdown)
        tbody.querySelectorAll('.editable-completed-field[data-field="initials2"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("select")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.initials2 || "";
                const select = document.createElement("select");
                select.className = "tank-input";
                select.style.width = "150px";
                const names = ["", "Matt Huff", "Peyton Smith", "Brandon Jones", "Josh James", "Josh Wimer", "Elijah Baker", "Kevin Alexander", "Chris Wood", "Kevin Mackey"];
                names.forEach(name => {
                    const opt = document.createElement("option");
                    opt.value = name;
                    opt.textContent = name || "-- None --";
                    if (name === currentVal) opt.selected = true;
                    select.appendChild(opt);
                });
                td.textContent = "";
                td.appendChild(select);
                select.focus();

                const save = () => {
                    const val = select.value;
                    batch.initials2 = val || null;
                    batchesRef.child(batchId).update({ initials2: batch.initials2 });
                    td.textContent = batch.initials2 ? escapeHtml(batch.initials2) : "—";
                };
                select.addEventListener("blur", save);
                select.addEventListener("change", save);
                select.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") { td.textContent = currentVal ? escapeHtml(currentVal) : "—"; }
                });
            });
        });

        // Poured By editing (text input)
        tbody.querySelectorAll('.editable-completed-field[data-field="pouredBy"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("input")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.pouredBy || "";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "tank-input";
                input.style.width = "140px";
                input.value = currentVal;
                td.textContent = "";
                td.appendChild(input);
                input.focus();
                input.select();

                const save = () => {
                    const val = input.value.trim();
                    batch.pouredBy = val || null;
                    batchesRef.child(batchId).update({ pouredBy: batch.pouredBy });
                    td.textContent = batch.pouredBy ? escapeHtml(batch.pouredBy) : "—";
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") { e.preventDefault(); save(); }
                    if (e.key === "Escape") { td.textContent = currentVal ? escapeHtml(currentVal) : "—"; }
                });
            });
        });

        // Notes editing (text input)
        tbody.querySelectorAll('.editable-completed-field[data-field="notes"]').forEach(td => {
            td.addEventListener("click", () => {
                if (td.querySelector("input")) return;
                const batchId = td.dataset.batchId;
                const batch = batches.find(b => b.id === batchId);
                if (!batch) return;

                const currentVal = batch.notes || "";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "tank-input";
                input.style.width = "160px";
                input.value = currentVal;
                td.textContent = "";
                td.appendChild(input);
                input.focus();
                input.select();

                const save = () => {
                    const val = input.value.trim();
                    batch.notes = val || null;
                    batchesRef.child(batchId).update({ notes: batch.notes });
                    td.textContent = batch.notes ? escapeHtml(batch.notes) : "—";
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") { e.preventDefault(); save(); }
                    if (e.key === "Escape") { td.textContent = currentVal ? escapeHtml(currentVal) : "—"; }
                });
            });
        });
    }

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
let chartDateMode = "completedAt"; // "completedAt" or "mixingCompleteAt"

const modeBatchCompleteBtn = document.getElementById("mode-batch-complete");
const modeMixingCompleteBtn = document.getElementById("mode-mixing-complete");

modeBatchCompleteBtn.addEventListener("click", () => {
    chartDateMode = "completedAt";
    modeBatchCompleteBtn.className = "btn btn-sm btn-primary";
    modeMixingCompleteBtn.className = "btn btn-sm btn-secondary";
    renderCharts();
});
modeMixingCompleteBtn.addEventListener("click", () => {
    chartDateMode = "mixingCompleteAt";
    modeMixingCompleteBtn.className = "btn btn-sm btn-primary";
    modeBatchCompleteBtn.className = "btn btn-sm btn-secondary";
    renderCharts();
});

chartSearchBtn.addEventListener("click", renderCharts);

function getFilteredRows() {
    let rows;
    if (chartDateMode === "mixingCompleteAt") {
        rows = getMixingCompleteRows();
    } else {
        rows = getCompletedRows();
    }
    const tsField = chartDateMode;
    const from = chartDateFrom.value;
    const to = chartDateTo.value;
    const compounder = compounderSelect.value;

    if (from) {
        const [y, m, d] = from.split("-").map(Number);
        const fromTs = new Date(y, m - 1, d, 0, 0, 0, 0).getTime();
        rows = rows.filter((r) => r[tsField] >= fromTs);
    }
    if (to) {
        const [y, m, d] = to.split("-").map(Number);
        const toTs = new Date(y, m - 1, d, 23, 59, 59, 999).getTime();
        rows = rows.filter((r) => r[tsField] <= toTs);
    }
    if (compounder) {
        rows = rows.filter((r) => r.initials === compounder || r.initials2 === compounder);
    }
    return rows;
}

function getMixingCompleteRows() {
    const validStatuses = ["mixing_complete", "pouring", "batch_complete"];
    return batches
        .filter((b) => validStatuses.includes(b.status) && b.mixingCompleteAt)
        .sort((a, b) => {
            const tA = a.mixingCompleteAt || 0;
            const tB = b.mixingCompleteAt || 0;
            return tA - tB;
        })
        .map((batch) => {
            const bowlInfo = BOWLS[batch.bowl];
            const bowlName = bowlInfo ? bowlInfo.name : batch.bowl;
            const bowlCap = batch.capacityOverride != null ? batch.capacityOverride : (bowlInfo ? bowlInfo.capacity : null);
            return {
                batchNumber: batch.batchNumber || "",
                product: batch.product,
                bowl: bowlName,
                capacity: bowlCap ? Number(bowlCap).toLocaleString() + " gal" : "N/A",
                capacityNum: bowlCap || 0,
                packaging: batch.packaging || "",
                unitCount: batch.unitCount || "",
                viscosity: batch.viscosity || "",
                initials: batch.initials || "",
                initials2: batch.initials2 || "",
                pouredBy: batch.pouredBy || "",
                notes: batch.notes || "",
                completedAt: batch.completedAt || 0,
                mixingCompleteAt: batch.mixingCompleteAt || 0,
                id: batch.id,
            };
        });
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

    // Group by day using selected date mode
    const tsField = chartDateMode;
    const modeLabel = chartDateMode === "mixingCompleteAt" ? "Mixing Completed" : "Batch Complete";
    const dayMap = {};
    for (const r of rows) {
        const ts = r[tsField];
        if (!ts) continue;
        const day = new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (!dayMap[day]) dayMap[day] = { count: 0, gallons: 0 };
        dayMap[day].count++;
        dayMap[day].gallons += r.capacityNum;
    }
    const dayLabels = Object.keys(dayMap);
    const dayCounts = dayLabels.map((d) => dayMap[d].count);
    const dayGallons = dayLabels.map((d) => dayMap[d].gallons);

    const dailyTitle = selectedCompounder
        ? `Daily (${modeLabel}) — ${selectedCompounder}`
        : `Daily (${modeLabel}) — All Compounders`;

    dailyChart = new Chart(document.getElementById("daily-chart").getContext("2d"), {
        type: "bar",
        data: {
            labels: dayLabels,
            datasets: [
                { label: "Batches", data: dayCounts, backgroundColor: "rgba(212,149,43,0.7)", borderColor: "#D4952B", borderWidth: 1 },
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
    const bowlSortKey = (name) => {
        // Map "Bowl A" -> "A", etc. to match BOWL_ORDER; keep named bowls as-is
        const short = name.startsWith("Bowl ") ? name.slice(5) : name;
        const idx = BOWL_ORDER.indexOf(short);
        return idx >= 0 ? idx : BOWL_ORDER.length;
    };
    const bowlLabels = Object.keys(bowlMap).sort((a, b) => bowlSortKey(a) - bowlSortKey(b));
    const bowlCounts = bowlLabels.map((l) => bowlMap[l].count);
    const bowlGallons = bowlLabels.map((l) => bowlMap[l].gallons * bowlMap[l].count);

    const bowlTitle = selectedCompounder
        ? `By Bowl (${modeLabel}) — ${selectedCompounder}`
        : `By Bowl (${modeLabel}) — All Compounders`;

    completedChart = new Chart(document.getElementById("completed-chart").getContext("2d"), {
        type: "bar",
        data: {
            labels: bowlLabels,
            datasets: [
                { label: "Batches", data: bowlCounts, backgroundColor: "rgba(212,149,43,0.7)", borderColor: "#D4952B", borderWidth: 1 },
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

    // Timeline line chart — daily batches/gallons per day
    const sortedDays = Object.keys(dayMap).slice().sort((a, b) => {
        return new Date(a + " 2026").getTime() - new Date(b + " 2026").getTime();
    });
    const dailyBatchData = sortedDays.map((d) => dayMap[d].count);
    const dailyGallonData = sortedDays.map((d) => dayMap[d].gallons);

    const timelineTitle = selectedCompounder
        ? `Production Flow (${modeLabel}) — ${selectedCompounder}`
        : `Production Flow (${modeLabel}) — All`;

    timelineChart = new Chart(document.getElementById("timeline-chart").getContext("2d"), {
        type: "line",
        data: {
            labels: sortedDays,
            datasets: [
                { label: "Batches", data: dailyBatchData, borderColor: "#D4952B", backgroundColor: "rgba(212,149,43,0.1)", fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2 },
                { label: "Gallons", data: dailyGallonData, borderColor: "#3498db", backgroundColor: "rgba(52,152,219,0.1)", fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2, yAxisID: "y1" },
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
    let allRows = chartDateMode === "mixingCompleteAt" ? getMixingCompleteRows() : getCompletedRows();
    const from = chartDateFrom.value;
    const to = chartDateTo.value;
    if (from) {
        const [fy, fm, fd] = from.split("-").map(Number);
        const fromTs = new Date(fy, fm - 1, fd, 0, 0, 0, 0).getTime();
        allRows = allRows.filter((r) => r[tsField] >= fromTs);
    }
    if (to) {
        const [ty, tm, td] = to.split("-").map(Number);
        const toTs = new Date(ty, tm - 1, td, 23, 59, 59, 999).getTime();
        allRows = allRows.filter((r) => r[tsField] <= toTs);
    }

    const compMap = {};
    for (const r of allRows) {
        const name = r.initials || "Unknown";
        if (!compMap[name]) compMap[name] = { batches: 0, gallons: 0 };
        compMap[name].batches++;
        compMap[name].gallons += r.capacityNum;
        // Credit 2nd mixer too
        if (r.initials2 && r.initials2 !== r.initials) {
            if (!compMap[r.initials2]) compMap[r.initials2] = { batches: 0, gallons: 0 };
            compMap[r.initials2].batches++;
            compMap[r.initials2].gallons += r.capacityNum;
        }
    }

    const compNames = Object.keys(compMap).sort((a, b) => compMap[b].batches - compMap[a].batches);
    const compBatches = compNames.map((n) => compMap[n].batches);
    const compGallons = compNames.map((n) => compMap[n].gallons);

    // Highlight selected compounder
    const compColors = compNames.map((n) => n === selectedCompounder ? "rgba(0,101,161,0.8)" : "rgba(212,149,43,0.7)");
    const compGalColors = compNames.map((n) => n === selectedCompounder ? "rgba(0,101,161,0.4)" : "rgba(52,152,219,0.5)");

    comparisonChart = new Chart(document.getElementById("comparison-chart").getContext("2d"), {
        type: "bar",
        data: {
            labels: compNames,
            datasets: [
                { label: "Batches", data: compBatches, backgroundColor: compColors, borderWidth: 0, xAxisID: "x" },
                { label: "Gallons", data: compGallons, backgroundColor: compGalColors, borderWidth: 0, xAxisID: "x1" },
            ],
        },
        options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: "Compounder Comparison", font: { size: 13 } }, legend: { labels: { boxWidth: 12, font: { size: 11 } } } },
            scales: {
                x: { position: "bottom", beginAtZero: true, ticks: { font: { size: 10 } }, title: { display: true, text: "Batches", font: { size: 11 } } },
                x1: { position: "top", beginAtZero: true, ticks: { font: { size: 10 } }, title: { display: true, text: "Gallons", font: { size: 11 } }, grid: { drawOnChartArea: false } },
                y: { ticks: { font: { size: 10 } } },
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
        "Mixed By 2": r.initials2 || "N/A",
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

// ── Product History ──────────────────────────────────────────────────
function populateHistoryProductList() {
    const select = document.getElementById("history-product-select");
    const products = [...new Set(
        batches
            .filter((b) => b.status === "batch_complete")
            .map((b) => b.product)
    )].sort((a, b) => a.localeCompare(b));

    const current = select.value;
    select.innerHTML = '<option value="">-- Select a product --</option>';
    products.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        select.appendChild(opt);
    });
    if (current && products.includes(current)) {
        select.value = current;
    }
}

document.getElementById("history-product-select").addEventListener("change", function () {
    const product = this.value;
    const resultsDiv = document.getElementById("history-results");
    const placeholder = document.getElementById("history-placeholder");

    if (!product) {
        resultsDiv.classList.add("hidden");
        placeholder.classList.remove("hidden");
        return;
    }

    placeholder.classList.add("hidden");
    resultsDiv.classList.remove("hidden");

    const rows = getCompletedRows().filter((r) => r.product === product);
    const summary = document.getElementById("history-summary");
    const tbody = document.getElementById("history-table-body");

    // Summary stats
    const totalBatches = rows.length;
    const lastMade = rows.length > 0
        ? new Date(Math.max(...rows.map((r) => r.completedAt))).toLocaleDateString()
        : "—";
    const firstMade = rows.length > 0
        ? new Date(Math.min(...rows.filter((r) => r.completedAt > 0).map((r) => r.completedAt))).toLocaleDateString()
        : "—";

    summary.innerHTML = `
        <div class="history-stat">
            <div class="history-stat-label">Times Made</div>
            <div class="history-stat-value">${totalBatches}</div>
        </div>
        <div class="history-stat">
            <div class="history-stat-label">First Made</div>
            <div class="history-stat-value">${firstMade}</div>
        </div>
        <div class="history-stat">
            <div class="history-stat-label">Last Made</div>
            <div class="history-stat-value">${lastMade}</div>
        </div>
    `;

    // Table rows sorted newest first
    rows.sort((a, b) => b.completedAt - a.completedAt);
    tbody.innerHTML = rows.map((r) => `
        <tr>
            <td>${r.batchNumber}</td>
            <td>${r.bowl}</td>
            <td>${r.packaging}</td>
            <td>${r.unitCount}</td>
            <td>${r.viscosity}</td>
            <td>${r.initials}</td>
            <td>${r.initials2 || "—"}</td>
            <td>${r.pouredBy}</td>
            <td>${r.notes}</td>
            <td class="completed-time-cell">${r.queuedAt}</td>
            <td class="completed-time-cell">${r.mixingStarted}</td>
            <td class="completed-time-cell">${r.mixingComplete}</td>
            <td class="completed-time-cell">${r.pouringStarted}</td>
            <td class="completed-time-cell">${r.batchComplete}</td>
        </tr>
    `).join("");
});

function createBatchCard(batch) {
    const card = document.createElement("div");
    card.className = `batch-card status-${batch.status}`;
    card.dataset.id = batch.id;

    // Make draggable if admin, or platform/floor with allowed bowl group
    if (isAdmin || (isPlatformOrFloor() && BOWL_MOVE_GROUPS[batch.bowl])) {
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
        const moveBtn = isTouchDevice ? `<button class="btn btn-sm btn-move" data-action="move" data-id="${batch.id}">Move</button>` : "";
        actionsHtml = `
            <div class="card-actions">
                ${moveBtn}
                ${nextAction ? `<button class="btn btn-sm ${nextBtnClass}" data-action="advance" data-id="${batch.id}">${nextAction.label}</button>` : ""}
                <button class="btn btn-sm btn-duplicate" data-action="duplicate" data-id="${batch.id}" title="Duplicate batch">&#x2398;</button>
                <button class="btn btn-sm btn-edit" data-action="edit" data-id="${batch.id}">Edit</button>
                <button class="btn btn-sm btn-delete" data-action="delete" data-id="${batch.id}">&times;</button>
            </div>
        `;
    } else if (isOperator) {
        const canMove = isPlatformOrFloor() && BOWL_MOVE_GROUPS[batch.bowl];
        const moveBtn = canMove && isTouchDevice
            ? `<button class="btn btn-sm btn-move" data-action="move" data-id="${batch.id}">Move</button>`
            : "";
        actionsHtml = `
            <div class="card-actions">
                ${moveBtn}
                ${nextAction ? `<button class="btn btn-sm ${nextBtnClass}" data-action="advance" data-id="${batch.id}">${nextAction.label}</button>` : ""}
            </div>
        `;
    }

    let extraInfo = "";
    if (batch.viscosity) extraInfo += `<span class="card-viscosity">Viscosity: ${escapeHtml(batch.viscosity)} KU</span>`;
    if (batch.initials) {
        let mixedLabel = escapeHtml(batch.initials);
        if (batch.initials2) mixedLabel += ` & ${escapeHtml(batch.initials2)}`;
        extraInfo += `<span class="card-initials">Mixed: ${mixedLabel}</span>`;
    }
    if (batch.pouredBy) extraInfo += `<span class="card-poured-by">Poured: ${escapeHtml(batch.pouredBy)}</span>`;

    // Clickable batch number banner at top of card (admin can type to set/edit)
    const batchNumText = batch.batchNumber ? escapeHtml(batch.batchNumber) : "Assign Batch Number";
    const batchNumClass = batch.batchNumber ? "card-batch-banner has-number" : "card-batch-banner no-number";

    card.innerHTML = `
        <div class="${batchNumClass}" data-batch-id="${batch.id}">${batchNumText}</div>
        <div class="card-top">
            <span class="card-product">${escapeHtml(batch.product)}</span>
            <span class="card-status">${statusLabel}</span>
        </div>
        <div class="card-details">
            ${packagingDisplay}
            ${extraInfo}
            ${batch.notes ? `<span class="card-notes">${escapeHtml(batch.notes)}</span>` : (isPlatformOrFloor() ? `<span class="card-notes card-notes-empty">Add Notes</span>` : "")}
        </div>
        ${actionsHtml}
    `;

    // Let floor/platform tap notes to edit
    if (isAdmin || isPlatformOrFloor()) {
        const notesSpan = card.querySelector(".card-notes");
        if (notesSpan) {
            notesSpan.style.cursor = "pointer";
            notesSpan.addEventListener("click", (e) => {
                e.stopPropagation();
                if (notesSpan.querySelector("input")) return;
                const currentVal = batch.notes || "";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "batch-notes-input";
                input.value = currentVal;
                input.placeholder = "Enter notes...";
                notesSpan.textContent = "";
                notesSpan.appendChild(input);
                input.focus();
                const save = () => {
                    const val = input.value.trim();
                    batch.notes = val || null;
                    batchesRef.child(batch.id).update({ notes: batch.notes });
                    render();
                };
                input.addEventListener("blur", save);
                input.addEventListener("keydown", (ev) => {
                    if (ev.key === "Enter") { ev.preventDefault(); input.blur(); }
                    if (ev.key === "Escape") { render(); }
                });
            });
        }
    }

    // Click banner to assign/edit batch number
    const canAssignBatchCard = isAdmin || canEditBatchNumber() || isPlatformOrFloor();
    const canEditBatchCard = isAdmin || canEditBatchNumber();
    if (canAssignBatchCard) {
        const banner = card.querySelector(".card-batch-banner");
        // Prevent draggable card from stealing taps on the banner (mobile)
        banner.draggable = false;
        banner.addEventListener("dragstart", (e) => { e.preventDefault(); e.stopPropagation(); });
        banner.addEventListener("click", (e) => {
            e.stopPropagation();

            // No number yet — auto-assign next in sequence (admin, ajolly, floor, platform)
            if (!batch.batchNumber) {
                const nextNum = getNextBatchNumber();
                batch.batchNumber = nextNum;
                batchesRef.child(batch.id).update({ batchNumber: nextNum });
                banner.textContent = nextNum;
                banner.className = "card-batch-banner has-number";
                return;
            }

            // Already has a number — only admin/ajolly can edit
            if (!canEditBatchCard) return;

            if (banner.querySelector("input")) return;
            const currentVal = batch.batchNumber;
            const input = document.createElement("input");
            input.type = "text";
            input.className = "batch-num-input";
            input.value = currentVal;
            banner.textContent = "";
            banner.appendChild(input);
            input.focus();
            input.select();

            const save = () => {
                const val = input.value.trim().toUpperCase();
                if (val && val !== currentVal && isBatchNumberTaken(val, batch.id)) {
                    alert("Batch number \"" + val + "\" is already in use.");
                    input.focus();
                    return;
                }
                batch.batchNumber = val || null;
                batchesRef.child(batch.id).update({ batchNumber: batch.batchNumber });
            };
            input.addEventListener("blur", save);
            input.addEventListener("keydown", (ev) => {
                if (ev.key === "Enter") { ev.preventDefault(); input.blur(); }
                if (ev.key === "Escape") { render(); }
            });
        });
    }

    return card;
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ── Drag & Drop Handlers ────────────────────────────────────────────
function handleDragStart(e) {
    if (!isAdmin && !isPlatformOrFloor()) return;
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
    if (!isAdmin && !isPlatformOrFloor()) return;
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
    if (!isAdmin && !isPlatformOrFloor()) return;
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
    if (!isAdmin && !isPlatformOrFloor()) return;
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove("drag-over");
    dropZone.querySelectorAll(".drop-indicator").forEach((el) => el.remove());

    if (!draggedId) return;

    const targetBowl = dropZone.dataset.bowl;
    const batch = batches.find((b) => b.id === draggedId);
    if (!batch) return;

    // Enforce bowl pairing for platform/floor
    if (!isAdmin) {
        const allowed = getAllowedMoveBowls(batch.bowl);
        if (!allowed.includes(targetBowl)) return;
    }

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

// ── Touch Move Button ───────────────────────────────────────────────
const isWindows = /Windows/i.test(navigator.userAgent);
const isTouchDevice = navigator.maxTouchPoints > 0 && !isWindows;

function openMoveModal(batchId) {
    const batch = batches.find((b) => b.id === batchId);
    if (!batch) return;

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    const modal = document.createElement("div");
    modal.className = "modal move-modal";

    overlay.appendChild(modal);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);

    showBowlPicker(modal, overlay, batch);
}

function showBowlPicker(modal, overlay, batch) {
    modal.innerHTML = `<h2>Move ${escapeHtml(batch.batchNumber || "")} ${escapeHtml(batch.product)}</h2>
        <p style="color:#666;margin-bottom:10px;">Select a bowl</p>`;

    const list = document.createElement("div");
    list.className = "move-list";

    const allowedBowls = isPlatformOrFloor() ? getAllowedMoveBowls(batch.bowl) : null;

    for (const bowlKey of BOWL_ORDER) {
        if (allowedBowls && !allowedBowls.includes(bowlKey)) continue;
        const bowl = BOWLS[bowlKey];
        const btn = document.createElement("button");
        btn.className = "btn move-option";
        if (bowlKey === batch.bowl) btn.classList.add("move-option-current");
        btn.textContent = bowl.name + (bowlKey === batch.bowl ? " (current)" : "");
        btn.addEventListener("click", () => {
            showPositionPicker(modal, overlay, batch, bowlKey);
        });
        list.appendChild(btn);
    }

    modal.appendChild(list);

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "btn btn-secondary";
    cancelBtn.style.marginTop = "12px";
    cancelBtn.style.width = "100%";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => overlay.remove());
    modal.appendChild(cancelBtn);
}

function showPositionPicker(modal, overlay, batch, targetBowl) {
    const bowlName = BOWLS[targetBowl] ? BOWLS[targetBowl].name : targetBowl;
    const laneBatches = batches
        .filter((b) => b.bowl === targetBowl && b.status !== "batch_complete" && b.id !== batch.id)
        .sort((a, b) => {
            const orderA = a.sortOrder != null ? a.sortOrder : a.createdAt;
            const orderB = b.sortOrder != null ? b.sortOrder : b.createdAt;
            return orderA - orderB;
        });

    modal.innerHTML = `<h2>Move to ${escapeHtml(bowlName)}</h2>
        <p style="color:#666;margin-bottom:10px;">Select position</p>`;

    const list = document.createElement("div");
    list.className = "move-list";

    // "Move to top" option
    const topBtn = document.createElement("button");
    topBtn.className = "btn move-option";
    topBtn.textContent = laneBatches.length === 0 ? "Place here" : "Move to Top";
    topBtn.addEventListener("click", () => {
        batch.bowl = targetBowl;
        applyMove(batch, laneBatches, 0);
        overlay.remove();
    });
    list.appendChild(topBtn);

    // Options: "Move after [batch]"
    laneBatches.forEach((lb, i) => {
        const btn = document.createElement("button");
        btn.className = "btn move-option";
        btn.textContent = `After ${lb.batchNumber || ""} ${lb.product}`;
        btn.addEventListener("click", () => {
            batch.bowl = targetBowl;
            applyMove(batch, laneBatches, i + 1);
            overlay.remove();
        });
        list.appendChild(btn);
    });

    modal.appendChild(list);

    const backBtn = document.createElement("button");
    backBtn.className = "btn btn-secondary";
    backBtn.style.marginTop = "12px";
    backBtn.style.width = "100%";
    backBtn.textContent = "Back to Bowls";
    backBtn.addEventListener("click", () => {
        showBowlPicker(modal, overlay, batch);
    });
    modal.appendChild(backBtn);
}

function applyMove(batch, laneBatches, insertIndex) {
    laneBatches.splice(insertIndex, 0, batch);
    laneBatches.forEach((b, i) => {
        b.sortOrder = i;
    });
    saveBatches();
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
    } else if (action === "move" && (isAdmin || isPlatformOrFloor())) {
        openMoveModal(id);
    } else if (action === "edit" && isAdmin) {
        openEditModal(id);
    } else if (action === "duplicate" && isAdmin) {
        duplicateBatch(id);
    } else if (action === "delete" && isAdmin) {
        deleteBatch(id);
    }
});

function duplicateBatch(id) {
    const batch = batches.find((b) => b.id === id);
    if (!batch) return;

    const laneBatches = batches.filter((b) => b.bowl === batch.bowl);
    const maxOrder = laneBatches.reduce((max, b) => {
        const order = b.sortOrder != null ? b.sortOrder : b.createdAt;
        return Math.max(max, order);
    }, -1);

    function createDuplicate(batchNumber) {
        const newBatch = {
            id: generateId(),
            batchNumber: batchNumber || null,
            product: batch.product,
            bowl: batch.bowl,
            packaging: batch.packaging || null,
            unitCount: batch.unitCount || null,
            notes: batch.notes || null,
            status: "queued",
            sortOrder: maxOrder + 1,
            createdAt: Date.now(),
            startedAt: null,
            mixingCompleteAt: null,
            pouringAt: null,
            completedAt: null,
            viscosity: null,
            initials: null,
            initials2: null,
            pouredBy: null,
        };
        batchesRef.child(newBatch.id).set(newBatch);
    }

    // Always create without a number — assignNumbersToTopBatches() will
    // assign one when the Firebase listener fires (prevents race conditions
    // where both this function and assignNumbersToTopBatches try to assign).
    createDuplicate(null);
}

// Reusable helper: assign a batch number (recycled first, then counter).
// Uses Firebase transaction on counter for atomic increment across multiple clients.
// onError is called if assignment fails — callers MUST handle it to reset state.
function assignBatchNumber(callback, onError) {
    if (!onError) onError = function () { alert("Failed to generate batch number. Please try again."); };

    // Build set of all batch numbers currently in use
    const usedNumbers = new Set();
    for (const b of batches) {
        if (b.batchNumber) {
            const n = parseInt(b.batchNumber.slice(1), 10);
            if (!isNaN(n)) usedNumbers.add(n);
        }
    }

    recycledNumbersRef.once("value", (snap) => {
        const recycled = snap.val();
        const validEntries = recycled ? Object.entries(recycled).filter(([, val]) => val >= MIN_BATCH_NUMBER && !usedNumbers.has(val)) : [];
        // Remove any recycled entries that conflict with existing batches
        if (recycled) {
            for (const [key, val] of Object.entries(recycled)) {
                if (val < MIN_BATCH_NUMBER || usedNumbers.has(val)) {
                    recycledNumbersRef.child(key).remove();
                }
            }
        }
        if (validEntries.length > 0) {
            let minKey = validEntries[0][0], minNum = validEntries[0][1];
            for (const [key, val] of validEntries) {
                if (val < minNum) { minKey = key; minNum = val; }
            }
            recycledNumbersRef.child(minKey).remove();
            callback("A" + String(minNum).padStart(4, "0"));
        } else {
            // Find the highest batch number currently in use
            let maxUsed = 0;
            for (const num of usedNumbers) {
                if (num > maxUsed) maxUsed = num;
            }
            const floor = Math.max(maxUsed + 1, MIN_BATCH_NUMBER);
            // Atomic transaction: if counter drifted past actual usage, snap it back
            batchCounterRef.transaction((current) => {
                const cur = current || 0;
                if (cur >= floor) {
                    return cur + 1;
                }
                return floor;
            }, (error, committed, snapshot) => {
                if (error || !committed) { onError(); return; }
                callback("A" + String(snapshot.val()).padStart(4, "0"));
            });
        }
    }, (error) => {
        // Firebase read for recycled numbers failed — call onError so caller can reset
        console.error("Failed to read recycled numbers:", error);
        onError();
    });
}


function advanceStatus(id) {
    const batch = batches.find((b) => b.id === id);
    if (!batch) return;

    const nextAction = STATUS_NEXT_ACTION[batch.status];
    if (!nextAction) return;

    // If advancing from queued → mixing and batch has no number yet, assign one first
    if (batch.status === "queued" && !batch.batchNumber) {
        assignBatchNumber((batchNumber) => {
            // Use transaction so only one client sets the number; recycle if we lose the race
            batchesRef.child(batch.id).child("batchNumber").transaction(
                (current) => {
                    if (current) return; // Already set by another client — abort
                    return batchNumber;
                },
                (error, committed) => {
                    if (!committed && !error) {
                        const num = parseInt(batchNumber.slice(1), 10);
                        if (!isNaN(num) && num >= MIN_BATCH_NUMBER) {
                            recycledNumbersRef.push(num);
                        }
                    }
                    if (committed || error) {
                        batch.batchNumber = batchNumber;
                    }
                    applyStatusAdvance(batch, nextAction.next);
                }
            );
        });
        return;
    }

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
    document.getElementById("initials2-input").value = "";
    mixingCompleteOverlay.classList.remove("hidden");
}

// ── Number Pad for Viscosity ─────────────────────────────────────────
document.getElementById("viscosity-numpad").addEventListener("click", (e) => {
    const btn = e.target.closest(".numpad-btn");
    if (!btn) return;
    const input = document.getElementById("viscosity-input");
    const val = btn.dataset.val;
    if (val === "del") {
        input.value = input.value.slice(0, -1);
    } else {
        input.value += val;
    }
});

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
    batch.initials2 = document.getElementById("initials2-input").value || null;

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
}

// ── On-Screen Keyboard for Poured By ─────────────────────────────────
document.getElementById("poured-by-keyboard").addEventListener("click", (e) => {
    const btn = e.target.closest(".kb-btn");
    if (!btn) return;
    const input = document.getElementById("poured-by-input");
    const val = btn.dataset.val;
    if (val === "del") {
        input.value = input.value.slice(0, -1);
    } else if (val === "clear") {
        input.value = "";
    } else {
        input.value += val;
    }
});

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

// ── Edit Modal Product Type Autocomplete ─────────────────────────────
const editProductTypeInput = document.getElementById("edit-product-type");
const editProductTypeList = document.getElementById("edit-product-type-list");
let editActiveIndex = -1;

function renderEditAutocomplete(filter) {
    editProductTypeList.innerHTML = "";
    editActiveIndex = -1;
    if (!filter) { editProductTypeList.classList.add("hidden"); return; }
    const lower = filter.toLowerCase();
    const matches = PRODUCT_CATALOG.filter(p => p.toLowerCase().includes(lower));
    if (matches.length === 0) { editProductTypeList.classList.add("hidden"); return; }
    matches.forEach((item) => {
        const div = document.createElement("div");
        div.className = "autocomplete-item";
        const parts = item.split(" – ");
        div.innerHTML = `${parts[0]} <span class="item-number">– ${parts[1]}</span>`;
        div.addEventListener("mousedown", (e) => {
            e.preventDefault();
            editProductTypeInput.value = item;
            editProductTypeList.classList.add("hidden");
        });
        editProductTypeList.appendChild(div);
    });
    editProductTypeList.classList.remove("hidden");
}

editProductTypeInput.addEventListener("input", () => renderEditAutocomplete(editProductTypeInput.value.trim()));

editProductTypeInput.addEventListener("keydown", (e) => {
    const items = editProductTypeList.querySelectorAll(".autocomplete-item");
    if (!items.length) return;
    if (e.key === "ArrowDown") {
        e.preventDefault();
        editActiveIndex = Math.min(editActiveIndex + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle("active", i === editActiveIndex));
        items[editActiveIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        editActiveIndex = Math.max(editActiveIndex - 1, 0);
        items.forEach((el, i) => el.classList.toggle("active", i === editActiveIndex));
        items[editActiveIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
        e.preventDefault();
        if (editActiveIndex >= 0) {
            const matches = PRODUCT_CATALOG.filter(p => p.toLowerCase().includes(editProductTypeInput.value.trim().toLowerCase()));
            editProductTypeInput.value = matches[editActiveIndex];
            editProductTypeList.classList.add("hidden");
        }
    } else if (e.key === "Escape") {
        editProductTypeList.classList.add("hidden");
    }
});

editProductTypeInput.addEventListener("blur", () => editProductTypeList.classList.add("hidden"));

function openEditModal(id) {
    const batch = batches.find((b) => b.id === id);
    if (!batch) return;

    document.getElementById("edit-batch-id").value = batch.id;
    document.getElementById("edit-batch-number").textContent = batch.batchNumber || "";
    document.getElementById("edit-product-type").value = batch.product || "";
    document.getElementById("edit-packaging").value = batch.packaging || "";
    document.getElementById("edit-unit-count").value = batch.unitCount || "";
    document.getElementById("edit-viscosity").value = batch.viscosity || "";
    document.getElementById("edit-initials").value = batch.initials || "";
    document.getElementById("edit-initials2").value = batch.initials2 || "";
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

    batch.product = document.getElementById("edit-product-type").value.trim();
    batch.packaging = document.getElementById("edit-packaging").value || null;
    const uc = document.getElementById("edit-unit-count").value.trim();
    batch.unitCount = uc ? Number(uc) : null;
    batch.viscosity = document.getElementById("edit-viscosity").value.trim() || null;
    batch.initials = document.getElementById("edit-initials").value || null;
    batch.initials2 = document.getElementById("edit-initials2").value || null;
    batch.pouredBy = document.getElementById("edit-poured-by").value.trim() || null;
    batch.notes = document.getElementById("edit-notes").value.trim() || null;

    // Save custom product if not already in catalog
    if (batch.product && !PRODUCT_CATALOG.includes(batch.product)) {
        PRODUCT_CATALOG.push(batch.product);
        customProductsRef.push(batch.product);
    }

    batchesRef.child(id).update(batch);
    editOverlay.classList.add("hidden");
});

function deleteBatch(id) {
    const batch = batches.find((b) => b.id === id);
    if (batch) {
        const batchCopy = Object.assign({}, batch);
        delete batchCopy.id;
        const stack = getActiveUndoStack();
        stack.push({ id: id, action: "delete", batchData: batchCopy });
        if (stack.length > MAX_UNDO) stack.shift();
        updateUndoBtn();
    }
    batchesRef.child(id).remove();
}

// ── Modal ───────────────────────────────────────────────────────────
const modalOverlay = document.getElementById("modal-overlay");
const batchForm = document.getElementById("batch-form");

document.getElementById("add-batch-btn").addEventListener("click", () => {
    if (!isAdmin) return;
    modalOverlay.classList.remove("hidden");
    document.getElementById("product-type-input").focus();
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

// ── Product Type Autocomplete ────────────────────────────────────────
const productTypeInput = document.getElementById("product-type-input");
const productTypeList = document.getElementById("product-type-list");
let activeAutocompleteIndex = -1;

function renderAutocompleteList(filter) {
    productTypeList.innerHTML = "";
    activeAutocompleteIndex = -1;
    if (!filter) {
        productTypeList.classList.add("hidden");
        return;
    }
    const lower = filter.toLowerCase();
    const matches = PRODUCT_CATALOG.filter(p => p.toLowerCase().includes(lower));
    if (matches.length === 0) {
        productTypeList.classList.add("hidden");
        return;
    }
    matches.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "autocomplete-item";
        const parts = item.split(" – ");
        div.innerHTML = `${parts[0]} <span class="item-number">– ${parts[1]}</span>`;
        div.addEventListener("mousedown", (e) => {
            e.preventDefault();
            productTypeInput.value = item;
            productTypeList.classList.add("hidden");
        });
        productTypeList.appendChild(div);
    });
    productTypeList.classList.remove("hidden");
}

productTypeInput.addEventListener("input", () => {
    renderAutocompleteList(productTypeInput.value.trim());
});

productTypeInput.addEventListener("keydown", (e) => {
    const items = productTypeList.querySelectorAll(".autocomplete-item");
    if (!items.length) return;
    if (e.key === "ArrowDown") {
        e.preventDefault();
        activeAutocompleteIndex = Math.min(activeAutocompleteIndex + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle("active", i === activeAutocompleteIndex));
        items[activeAutocompleteIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeAutocompleteIndex = Math.max(activeAutocompleteIndex - 1, 0);
        items.forEach((el, i) => el.classList.toggle("active", i === activeAutocompleteIndex));
        items[activeAutocompleteIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeAutocompleteIndex >= 0 && items[activeAutocompleteIndex]) {
            productTypeInput.value = PRODUCT_CATALOG.filter(p => p.toLowerCase().includes(productTypeInput.value.trim().toLowerCase()))[activeAutocompleteIndex];
            productTypeList.classList.add("hidden");
        }
    } else if (e.key === "Escape") {
        productTypeList.classList.add("hidden");
    }
});

productTypeInput.addEventListener("blur", () => {
    productTypeList.classList.add("hidden");
});

batchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const product = document.getElementById("product-type-input").value.trim();
    const bowl = document.getElementById("bowl-select").value;
    const packaging = document.getElementById("batch-packaging").value;
    const unitCountVal = document.getElementById("batch-unit-count").value.trim();
    const notes = document.getElementById("batch-notes").value.trim();

    if (!product || !bowl || !packaging) return;

    const laneBatches = batches.filter((b) => b.bowl === bowl && b.status !== "batch_complete");
    const allLaneBatches = batches.filter((b) => b.bowl === bowl);
    const maxOrder = allLaneBatches.reduce((max, b) => {
        const order = b.sortOrder != null ? b.sortOrder : b.createdAt;
        return Math.max(max, order);
    }, -1);

    // Batch number is assigned manually (not auto-assigned).
    const batch = buildNewBatch({
        product,
        bowl,
        packaging,
        unitCount: unitCountVal ? Number(unitCountVal) : null,
        notes: notes || null,
        sortOrder: maxOrder + 1,
    });
    batchesRef.child(batch.id).set(batch);

    // Save custom product if not already in catalog
    if (product && !PRODUCT_CATALOG.includes(product)) {
        PRODUCT_CATALOG.push(product);
        customProductsRef.push(product);
    }

    batchForm.reset();
    modalOverlay.classList.add("hidden");
});


// ── Notes ───────────────────────────────────────────────────────────
let siteNotes = [];

function onNotes(snap) {
    const data = snap.val() || {};
    siteNotes = Object.values(data).sort((a, b) => b.createdAt - a.createdAt);
    if (activeTab === "notes") renderNotes();
}

function formatNoteDate(dateStr) {
    // If it looks like a date (YYYY-MM-DD), format it nicely
    const d = new Date(dateStr + "T00:00:00");
    if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
    }
    return escapeHtml(dateStr);
}

function renderNotes() {
    const list = document.getElementById("notes-list");
    if (siteNotes.length === 0) {
        list.innerHTML = `<p class="notes-empty">No notes yet.</p>`;
        return;
    }
    const user = auth.currentUser;
    const userEmail = user ? user.email : "";
    list.innerHTML = siteNotes.map((note) => {
        const date = new Date(note.createdAt);
        const timestamp = date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
        return `
            <div class="note-card">
                <div class="note-card-header">
                    <span class="note-subject">${formatNoteDate(note.subject)}</span>
                </div>
                ${note.body ? `<div class="note-body">${escapeHtml(note.body)}</div>` : ""}
                <div class="note-meta">
                    <span class="note-author">${escapeHtml(note.author)}</span> &middot; ${timestamp}
                </div>
            </div>
        `;
    }).join("");
}

const notesForm = document.getElementById("notes-form");
// Default the date picker to today
const noteSubjectInput = document.getElementById("note-subject");
noteSubjectInput.valueAsDate = new Date();

notesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!canPostNotes()) return;

    const subject = document.getElementById("note-subject").value.trim();
    const body = document.getElementById("note-body").value.trim();
    if (!subject) return;

    const user = auth.currentUser;
    const emailParts = user.email.split("@")[0];
    // Derive display name from email prefix
    const authorName = user.displayName || emailParts;

    const noteId = generateId();
    notesRef.child(noteId).set({
        id: noteId,
        subject,
        body: body || null,
        author: authorName,
        authorEmail: user.email,
        createdAt: Date.now(),
    });

    notesForm.reset();
});

// ── 2026 Production Report Import (temporary — remove after use) ────
const IMPORT_DATA_2026 = [
{bn:"A0001",d:"2026-01-06",p:"DUCK COAT",g:230,pk:"DRUMS"},
{bn:"A0002",d:"2026-01-05",p:"FP 300",g:2500,pk:"DRUMS"},
{bn:"A0003",d:"2026-01-05",p:"LT GRN SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0004",d:"2026-01-05",p:"ULTRA 3",g:1209,pk:"TOTES"},
{bn:"A0005",d:"2026-01-06",p:"ACR RES W/S",g:900,pk:"DRUMS"},
{bn:"A0006",d:"2026-01-06",p:"APB",g:150,pk:"KEGS"},
{bn:"A0007",d:"2026-01-06",p:"FP 300",g:2500,pk:"DRUMS"},
{bn:"A0008",d:"2026-01-06",p:"NEU CONC W/S",g:1040,pk:"KEGS"},
{bn:"A0009",d:"2026-01-06",p:"FASS DRI",g:575,pk:"GALLONS"},
{bn:"A0010",d:"2026-01-06",p:"RTU BASE",g:1120,pk:"PAILS"},
{bn:"A0011",d:"2026-01-06",p:"NEU CONC",g:2920,pk:"DRUMS"},
{bn:"A0012",d:"2026-01-06",p:"BLUE SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0013",d:"2026-01-06",p:"ACR ADH PROMO",g:575,pk:"DRUMS"},
{bn:"A0014",d:"2026-01-06",p:"NEU CONC",g:2920,pk:"KEGS"},
{bn:"A0015",d:"2026-01-06",p:"EQUICLEAR",g:5,pk:"PAILS"},
{bn:"A0016",d:"2026-01-06",p:"NEU READY MIX",g:1120,pk:"PAILS"},
{bn:"A0017",d:"2026-01-06",p:"BLUE SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0018",d:"2026-01-06",p:"FP 300",g:2500,pk:"DRUMS"},
{bn:"A0019",d:"2026-01-07",p:"PROLOCK",g:7875,pk:"TOTES"},
{bn:"A0020",d:"2026-01-07",p:"TOP TUFF",g:1200,pk:"PAILS"},
{bn:"A0021",d:"2026-01-07",p:"FP 300",g:2500,pk:"DRUMS"},
{bn:"A0022",d:"2025-01-07",p:"ACR RES W/S",g:900,pk:"DRUMS"},
{bn:"A0023",d:"2026-01-07",p:"VELOCITY YELLOW",g:575,pk:"PAILS"},
{bn:"A0024",d:"2026-01-07",p:"FP 300",g:2500,pk:"PAILS"},
{bn:"A0025",d:"2026-01-07",p:"ACR RES W/S",g:900,pk:"DRUMS"},
{bn:"A0026",d:"2026-01-08",p:"PBK DK BLUE",g:575,pk:"PAILS"},
{bn:"A0027",d:"2026-01-08",p:"NEU CONC",g:230,pk:"PAILS"},
{bn:"A0028",d:"2026-01-08",p:"THERMO RED",g:230,pk:"PAILS"},
{bn:"A0029",d:"2026-01-08",p:"FLEX CONC",g:2900,pk:"DRUMS"},
{bn:"A0030",d:"2026-01-08",p:"ACR RES",g:575,pk:"PAILS"},
{bn:"A0031",d:"2026-01-08",p:"ACR RES",g:1120,pk:"KEGS"},
{bn:"A0032",d:"2026-01-08",p:"THERMO BLUE",g:230,pk:"PAILS"},
{bn:"A0033",d:"2026-01-09",p:"ACR RES",g:575,pk:"KEGS"},
{bn:"A0034",d:"2026-01-09",p:"CUSHION 2",g:1040,pk:"DRUMS"},
{bn:"A0035",d:"2026-01-12",p:"MED GRN SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0036",d:"2026-01-12",p:"PAVE GEL",g:1120,pk:"PAILS"},
{bn:"A0037",d:"2026-01-12",p:"PRO STRIPE PLUS BLUE",g:230,pk:"PAILS"},
{bn:"A0038",d:"2026-01-12",p:"PRO STRIPE PLUS BLUE",g:230,pk:"PAILS"},
{bn:"A0039",d:"2026-01-13",p:"THERMO WHITE",g:1120,pk:"PAILS"},
{bn:"A0040",d:"2026-01-13",p:"PRO STRIPE PLUS YELLOW",g:575,pk:"PAILS"},
{bn:"A0041",d:"2026-01-13",p:"PRO STRIPE PLUS WHITE",g:1120,pk:"PAILS"},
{bn:"A0042",d:"2026-01-13",p:"PRO STRIPE PLUS WHITE",g:1120,pk:"PAILS"},
{bn:"A0043",d:"2026-01-13",p:"PRO STRIPE PLUS YELLOW",g:575,pk:"PAILS"},
{bn:"A0044",d:"2026-01-14",p:"BROWN B/F",g:230,pk:"DRUMS"},
{bn:"A0045",d:"2026-01-14",p:"PRO STRIPE PLUS BLACK",g:230,pk:"PAILS"},
{bn:"A0046",d:"2026-01-14",p:"FIRELANE RED",g:575,pk:"PAILS"},
{bn:"A0047",d:"2026-01-15",p:"ACR RES W/S",g:900,pk:"PAILS"},
{bn:"A0048",d:"2026-01-15",p:"TEXT T/C",g:1040,pk:"GALLONS"},
{bn:"A0049",d:"2026-01-14",p:"FST GRN FLEX",g:580,pk:"KEGS"},
{bn:"A0050",d:"2026-01-14",p:"ACR RES W/S",g:900,pk:"PAILS"},
{bn:"A0051",d:"2026-01-14",p:"BLUE FLEX",g:225,pk:"KEGS"},
{bn:"A0052",d:"2026-01-15",p:"CUSHION 2",g:1040,pk:"KEGS"},
{bn:"A0053",d:"2026-01-15",p:"BLUE FLEX",g:225,pk:"KEGS"},
{bn:"A0054",d:"2026-01-15",p:"BLUE FLEX",g:225,pk:"KEGS"},
{bn:"A0055",d:"2026-01-16",p:"LT GRN COLORPLUS",g:1040,pk:"GALLONS"},
{bn:"A0056",d:"2026-01-16",p:"LT GRN COLORPLUS",g:1040,pk:"GALLONS"},
{bn:"A0057",d:"2026-01-16",p:"FLEX RES",g:575,pk:"KEGS"},
{bn:"A0058",d:"2026-01-19",p:"LT GRN COLORPLUS",g:1040,pk:"GALLONS"},
{bn:"A0059",d:"2026-01-20",p:"FASS DRI",g:575,pk:"PAILS"},
{bn:"A0060",d:"2026-01-20",p:"FASS DRI",g:1040,pk:"PAILS"},
{bn:"A0061",d:"2026-01-20",p:"GRAY SURFACE ONE",g:250,pk:"DRUMS"},
{bn:"A0062",d:"2026-01-20",p:"FASS DRI",g:575,pk:"PAILS"},
{bn:"A0063",d:"2026-01-20",p:"GRAY SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0064",d:"2026-01-20",p:"MED GRN SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0065",d:"2026-01-21",p:"FP 300",g:2500,pk:"PAILS"},
{bn:"A0066",d:"2026-01-21",p:"BLUE CONC",g:230,pk:"KEGS"},
{bn:"A0067",d:"2026-01-21",p:"FASS DRI",g:575,pk:"PAILS"},
{bn:"A0068",d:"2026-01-21",p:"FP 300",g:2500,pk:"PAILS"},
{bn:"A0069",d:"2026-01-21",p:"BLUE SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0070",d:"2026-01-21",p:"RED B/F",g:575,pk:"DRUMS"},
{bn:"A0071",d:"2026-01-21",p:"BLUE SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0072",d:"2026-01-21",p:"FP 300",g:2500,pk:"PAILS"},
{bn:"A0073",d:"2026-01-21",p:"DUST SUPRESSANT",g:280,pk:"DRUMS"},
{bn:"A0074",d:"2026-01-21",p:"FLEX RES",g:1120,pk:"DRUMS"},
{bn:"A0075",d:"2026-01-22",p:"CLEAR CRACK SEALANT",g:223,pk:"DRUMS"},
{bn:"A0076",d:"2026-01-22",p:"LIQUID ROAD LATEX",g:3575,pk:"TOTES"},
{bn:"A0077",d:"2026-01-22",p:"NEU CONC",g:1120,pk:"KEGS"},
{bn:"A0078",d:"2026-01-22",p:"NEU CONC",g:575,pk:"KEGS"},
{bn:"A0079",d:"2026-01-22",p:"ULTRA GLOSS",g:1120,pk:"PAILS"},
{bn:"A0080",d:"2026-01-23",p:"TOP TUFF",g:1200,pk:"PAILS"},
{bn:"A0081",d:"2026-01-23",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0082",d:"2026-01-23",p:"LIQUID FENCE",g:230,pk:"PAILS"},
{bn:"A0083",d:"2026-01-23",p:"TOP TUFF",g:1200,pk:"PAILS"},
{bn:"A0084",d:"2026-01-23",p:"FED WHITE",g:230,pk:"PAILS"},
{bn:"A0085",d:"2026-01-23",p:"TOP TUFF",g:1200,pk:"PAILS"},
{bn:"A0086",d:"2026-01-25",p:"NEU TRACKMASTER",g:1040,pk:"DRUMS"},
{bn:"A0087",d:"2026-01-23",p:"TOP TUFF",g:1200,pk:"PAILS"},
{bn:"A0088",d:"2026-01-27",p:"WHITE DUCK COAT",g:575,pk:"PAILS"},
{bn:"A0089",d:"2026-01-27",p:"ULTRA 3",g:1209,pk:"TOTES"},
{bn:"A0090",d:"2026-01-27",p:"WHITE STRIPE",g:230,pk:"PAILS"},
{bn:"A0091",d:"2026-01-27",p:"WHITE DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0092",d:"2026-01-27",p:"BLACK DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0093",d:"2026-01-27",p:"BLACK DUCK COAT",g:575,pk:"PAILS"},
{bn:"A0094",d:"2026-02-02",p:"APB",g:2000,pk:"DRUMS/PAILS"},
{bn:"A0095",d:"2026-02-02",p:"BLUE CONC",g:230,pk:"KEGS"},
{bn:"A0096",d:"2026-02-03",p:"NEU READY MIX",g:1120,pk:"PAILS"},
{bn:"A0097",d:"2026-02-03",p:"NEU READY MIX",g:1120,pk:"PAILS"},
{bn:"A0098",d:"2026-02-03",p:"FASS DRI",g:575,pk:"PAILS"},
{bn:"A0099",d:"2026-02-03",p:"RED SURFACE ONE",g:250,pk:"PAILS"},
{bn:"A0100",d:"2026-02-03",p:"TOP TUFF",g:1200,pk:"PAILS"},
{bn:"A0101",d:"2025-02-03",p:"NEU READY MIX",g:1120,pk:"PAILS"},
{bn:"A0102",d:"2026-02-03",p:"NEU READY MIX",g:1120,pk:"PAILS"},
{bn:"A0103",d:"2026-02-03",p:"WHITE B/F",g:230,pk:"PAILS"},
{bn:"A0104",d:"2026-02-03",p:"RTU BASE",g:575,pk:"PAILS"},
{bn:"A0105",d:"2026-02-03",p:"NATROSOL SOLUTION",g:250,pk:"TOTES"},
{bn:"A0106",d:"2026-02-03",p:"NATROSOL SOLUTION",g:250,pk:"TOTES"},
{bn:"A0107",d:"2026-02-03",p:"RTU BASE",g:575,pk:"PAILS"},
{bn:"A0108",d:"2026-02-04",p:"OIL SPOT PRIMER",g:256,pk:"QUARTS"},
{bn:"A0109",d:"2026-02-04",p:"ROOF CLEANER",g:541,pk:"QUARTS"},
{bn:"A0110",d:"2026-02-04",p:"ROOF CLEANER",g:541,pk:"QUARTS"},
{bn:"A0111",d:"2026-02-04",p:"OIL SPOT PRIMER",g:256,pk:"QUARTS"},
{bn:"A0112",d:"2026-02-04",p:"FST GRN CONC",g:230,pk:"KEGS"},
{bn:"A0113",d:"2026-02-10",p:"ROOF CLEANER",g:522,pk:"GALLONS"},
{bn:"A0114",d:"2026-02-05",p:"FST GRN CONC",g:230,pk:"KEGS"},
{bn:"A0115",d:"2026-02-05",p:"OIL SPOT PRIMER",g:256,pk:"QUARTS"},
{bn:"A0116",d:"2026-02-06",p:"ACR ADH PROMO",g:1120,pk:"PAILS"},
{bn:"A0117",d:"2026-02-06",p:"TOP TUFF",g:4356,pk:"TOTES"},
{bn:"A0118",d:"2026-02-06",p:"RTU BASE",g:1120,pk:"PAILS"},
{bn:"A0119",d:"2026-02-06",p:"CUSHION 1",g:1040,pk:"DRUMS"},
{bn:"A0120",d:"2026-02-06",p:"CUSHION 2",g:1040,pk:"DRUMS"},
{bn:"A0121",d:"2026-02-09",p:"GRAY SHIELD",g:575,pk:"PAILS"},
{bn:"A0122",d:"2026-02-09",p:"GRAY SHIELD",g:575,pk:"PAILS"},
{bn:"A0123",d:"2026-02-10",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0124",d:"2026-02-10",p:"ROOF CLEANER",g:542,pk:"GALLONS"},
{bn:"A0125",d:"2026-02-10",p:"GRAY SHIELD",g:1120,pk:"PAILS"},
{bn:"A0126",d:"2026-02-10",p:"GRAY SHIELD",g:230,pk:"PAILS"},
{bn:"A0127",d:"2026-02-10",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0128",d:"2026-02-10",p:"15 YEAR",g:575,pk:"PAILS"},
{bn:"A0129",d:"2026-02-10",p:"GRAY SHIELD",g:1120,pk:"PAILS"},
{bn:"A0130",d:"2026-02-10",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0131",d:"2026-02-10",p:"NEU TRACKMASTER",g:230,pk:"DRUMS"},
{bn:"A0132",d:"2026-02-10",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0133",d:"2026-02-10",p:"BLACK DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0134",d:"2026-02-10",p:"15 YEAR",g:575,pk:"PAILS"},
{bn:"A0135",d:"2026-02-10",p:"WHITE DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0136",d:"2026-02-10",p:"BLACK DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0137",d:"2026-02-10",p:"NEU TRACKMASTER",g:230,pk:"DRUMS"},
{bn:"A0138",d:"2026-02-10",p:"15 YEAR",g:575,pk:"PAILS"},
{bn:"A0139",d:"2026-02-10",p:"WHITE DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0140",d:"2026-02-11",p:"ROOF PATCH",g:1040,pk:"GALLONS"},
{bn:"A0141",d:"2026-02-11",p:"FP 300",g:2920,pk:"DRUMS"},
{bn:"A0142",d:"2026-02-11",p:"SHINGLE SAVER",g:230,pk:"GALLONS"},
{bn:"A0143",d:"2026-02-11",p:"NEU CONC",g:2920,pk:"KEGS"},
{bn:"A0144",d:"2026-02-11",p:"NEU CONC",g:1120,pk:"DRUMS"},
{bn:"A0145",d:"2026-02-11",p:"NEU CONC",g:1120,pk:"DRUMS"},
{bn:"A0146",d:"2026-02-11",p:"FP 300",g:2920,pk:"PAILS"},
{bn:"A0147",d:"2026-02-11",p:"NEU CONC",g:2920,pk:"DRUMS"},
{bn:"A0148",d:"2026-02-11",p:"FP 300",g:2920,pk:"PAILS"},
{bn:"A0149",d:"2026-02-12",p:"SHINGLE SAVER",g:230,pk:"GALLONS"},
{bn:"A0150",d:"2026-02-12",p:"ACR RES",g:1120,pk:"KEGS"},
{bn:"A0151",d:"2026-01-12",p:"ACR RES",g:230,pk:"KEGS"},
{bn:"A0152",d:"2026-02-12",p:"15 YEAR",g:575,pk:"PAILS"},
{bn:"A0153",d:"2026-02-12",p:"FST GRN COLORPLUS",g:1040,pk:"GALLONS"},
{bn:"A0154",d:"2026-02-12",p:"ACR RES",g:230,pk:"KEGS"},
{bn:"A0155",d:"2026-02-12",p:"FST GRN CONC",g:575,pk:"KEGS"},
{bn:"A0156",d:"2026-02-12",p:"BLUE CONC",g:575,pk:"KEGS"},
{bn:"A0157",d:"2026-02-12",p:"NEU CONC",g:2920,pk:"DRUMS"},
{bn:"A0158",d:"2026-02-12",p:"ORANGE COLORPLUS",g:30,pk:"JARS"},
{bn:"A0159",d:"2026-02-12",p:"ACR RES",g:230,pk:"KEGS"},
{bn:"A0160",d:"2026-02-13",p:"FST GRN COLORPLUS",g:1040,pk:"GALLONS"},
{bn:"A0161",d:"2026-02-13",p:"BLUE CONC",g:230,pk:"KEGS"},
{bn:"A0162",d:"2026-02-13",p:"LT GRN CONC",g:230,pk:"KEGS"},
{bn:"A0163",d:"2026-02-16",p:"FST GRN COLORPLUS",g:1040,pk:"GALLONS"},
{bn:"A0164",d:"2026-02-17",p:"RED SURFACE ONE TINT",g:30,pk:"JARS"},
{bn:"A0165",d:"2026-02-17",p:"BLUE SURFACE ONE TINT",g:30,pk:"JARS"},
{bn:"A0166",d:"2026-02-17",p:"LT GRN SURFACE ONE TINT",g:30,pk:"JARS"},
{bn:"A0167",d:"2026-02-16",p:"NEU CONC W/S",g:575,pk:"KEGS"},
{bn:"A0168",d:"2026-02-16",p:"ACR RES",g:1120,pk:"KEGS"},
{bn:"A0169",d:"2026-02-16",p:"NEU CONC W/S",g:575,pk:"KEGS"},
{bn:"A0170",d:"2026-02-16",p:"ULTRA GLOSS",g:1120,pk:"PAILS"},
{bn:"A0171",d:"2026-02-16",p:"BLUE CONC",g:230,pk:"KEGS"},
{bn:"A0172",d:"2026-02-16",p:"BLUE CONC",g:230,pk:"KEGS"},
{bn:"A0173",d:"2026-02-17",p:"ACR RES SURFACE ONE",g:1085,pk:"PAILS"},
{bn:"A0174",d:"2026-02-17",p:"ROOF CLEANER",g:541,pk:"GALLONS"},
{bn:"A0175",d:"2026-02-17",p:"ULTRA GLOSS",g:1120,pk:"PAILS"},
{bn:"A0176",d:"2026-02-17",p:"DUST SUPPRESSANT",g:280,pk:"TOTES"},
{bn:"A0177",d:"2026-02-18",p:"DK GRN SURFACE ONE TINT",g:30,pk:"JARS"},
{bn:"A0178",d:"2026-02-18",p:"LT BLUE SURFACE ONE TINT",g:30,pk:"JARS"},
{bn:"A0179",d:"2026-02-17",p:"ROOF CLEANER",g:541,pk:"GALLONS"},
{bn:"A0180",d:"2026-02-18",p:"GRAY SURFACE ONE TINT",g:30,pk:"JARS"},
{bn:"A0181",d:"2026-02-17",p:"SURFACE ONE COATING BASE",g:1120,pk:"PAILS"},
{bn:"A0182",d:"2026-02-17",p:"NEU CONC",g:1120,pk:"DRUMS"},
{bn:"A0183",d:"2026-02-17",p:"ULTRA GLOSS",g:1120,pk:"GALLONS"},
{bn:"A0184",d:"2026-02-17",p:"NEU CONC",g:1120,pk:"DRUMS"},
{bn:"A0185",d:"2026-02-18",p:"PAVE GEL",g:1120,pk:"TOTES"},
{bn:"A0186",d:"2026-02-18",p:"15 YEAR",g:230,pk:"DRUMS"},
{bn:"A0187",d:"2026-02-18",p:"NEU ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0188",d:"2026-02-18",p:"NEU CONC",g:2920,pk:"DRUMS"},
{bn:"A0189",d:"2026-02-18",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0190",d:"2026-02-19",p:"FED WHITE",g:575,pk:"PAILS"},
{bn:"A0191",d:"2026-02-19",p:"VELOCITY WHITE",g:1120,pk:"PAILS"},
{bn:"A0192",d:"2026-02-19",p:"THRMO YELLOW",g:1120,pk:"PAILS"},
{bn:"A0193",d:"2026-02-19",p:"WHITE STRIPE",g:575,pk:"PAILS"},
{bn:"A0194",d:"2026-02-19",p:"FED YELLOW",g:575,pk:"PAILS"},
{bn:"A0195",d:"2026-02-19",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0196",d:"2026-02-19",p:"THERMO WHITE",g:1120,pk:"PAILS"},
{bn:"A0197",d:"2026-02-19",p:"VELOCITY YELLOW",g:1120,pk:"PAILS"},
{bn:"A0198",d:"2026-02-19",p:"NEU ACR RES W/S",g:525,pk:"PAILS"},
{bn:"A0199",d:"2026-02-19",p:"NEU CONC W/S",g:1040,pk:"KEGS"},
{bn:"A0200",d:"2026-02-19",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0201",d:"2026-02-19",p:"NEU CONC W/S",g:1040,pk:"DRUMS"},
{bn:"A0202",d:"2026-02-20",p:"GRN B/F",g:230,pk:"PAILS"},
{bn:"A0203",d:"2026-02-20",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0204",d:"2026-02-20",p:"NEU CONC W/S",g:575,pk:"PAILS"},
{bn:"A0205",d:"2026-02-20",p:"WHITE DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0206",d:"2026-02-20",p:"10 YEAR",g:1120,pk:"GALLONS"},
{bn:"A0207",d:"2026-02-20",p:"NEU CONC W/S",g:575,pk:"PAILS"},
{bn:"A0208",d:"2026-02-20",p:"GRN B/F",g:230,pk:"PAILS"},
{bn:"A0209",d:"2026-02-20",p:"10 YEAR",g:1120,pk:"GALLONS"},
{bn:"A0210",d:"2026-02-20",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0211",d:"2026-02-20",p:"CONCRETE SEALER",g:1120,pk:"GALLONS"},
{bn:"A0212",d:"2026-02-24",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0213",d:"2026-02-24",p:"BLACK DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0214",d:"2026-02-24",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0215",d:"2026-02-24",p:"NEU CRACK PATCH",g:315,pk:"GALLONS"},
{bn:"A0216",d:"2026-02-24",p:"BLACK DUCK COAT",g:1120,pk:"PAILS"},
{bn:"A0217",d:"2026-02-24",p:"ORANGE COLORPLUS",g:165,pk:"JARS"},
{bn:"A0218",d:"2026-02-24",p:"DUCK COAT",g:1040,pk:"PAILS"},
{bn:"A0219",d:"2026-02-24",p:"NEU READY MIX",g:1120,pk:"PAILS"},
{bn:"A0220",d:"2026-02-24",p:"NEU CRACK PATCH",g:315,pk:"GALLONS"},
{bn:"A0221",d:"2026-02-24",p:"APB",g:2700,pk:"PAILS"},
{bn:"A0222",d:"2026-02-24",p:"DUCK COAT",g:1040,pk:"PAILS"},
{bn:"A0223",d:"2026-02-25",p:"ULTRA 3",g:1099,pk:"TOTES"},
{bn:"A0224",d:"2026-02-25",p:"FP 300",g:2920,pk:"PAILS"},
{bn:"A0225",d:"2026-02-25",p:"NEU CONC W/S",g:1040,pk:"DRUMS"},
{bn:"A0226",d:"2026-02-25",p:"TOP TUFF",g:1200,pk:"PAILS"},
{bn:"A0227",d:"2026-02-25",p:"NEU CRACK PATCH",g:315,pk:"GALLONS"},
{bn:"A0228",d:"2026-02-25",p:"PREP SEAL",g:1120,pk:"PAILS"},
{bn:"A0229",d:"2026-02-25",p:"RTU BASE",g:575,pk:"PAILS"},
{bn:"A0230",d:"2026-02-25",p:"APB",g:1320,pk:"DRUMS"},
{bn:"A0231",d:"2026-02-25",p:"NEU CONC W/S",g:1040,pk:"KEGS"},
{bn:"A0232",d:"2026-02-25",p:"TEXT T/C",g:1040,pk:"GALLONS"},
{bn:"A0233",d:"2026-02-25",p:"NEU ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0234",d:"2026-02-25",p:"VELOCITY BLUE",g:575,pk:"PAILS"},
{bn:"A0235",d:"2026-02-26",p:"VELOCITY WHITE",g:1120,pk:"PAILS"},
{bn:"A0236",d:"2026-02-26",p:"VELOCITY YELLOW",g:1120,pk:"PAILS"},
{bn:"A0237",d:"2026-02-26",p:"THERMO WHITE",g:575,pk:"PAILS"},
{bn:"A0238",d:"2026-02-26",p:"15 YEAR",g:230,pk:"DRUMS"},
{bn:"A0239",d:"2026-02-26",p:"PROSTRIPE PLUS WHITE",g:1120,pk:"PAILS"},
{bn:"A0240",d:"2026-02-26",p:"PRO STRIPE PLUS YELLOW",g:1120,pk:"PAILS"},
{bn:"A0241",d:"2026-02-26",p:"THERMO WHITE",g:575,pk:"PAILS"},
{bn:"A0242",d:"2026-02-26",p:"10 YEAR",g:1120,pk:"GALLONS"},
{bn:"A0243",d:"2026-02-26",p:"BLACK DUCK COAT",g:230,pk:"DRUMS"},
{bn:"A0244",d:"2026-02-26",p:"THRMO YELLOW",g:575,pk:"PAILS"},
{bn:"A0245",d:"2026-02-27",p:"PRO STRIPE PLUS BLUE",g:230,pk:"PAILS"},
{bn:"A0246",d:"2026-02-27",p:"THRMO YELLOW",g:575,pk:"PAILS"},
{bn:"A0247",d:"2026-02-27",p:"PRO STRIPE PLUS BLUE",g:230,pk:"PAILS"},
{bn:"A0248",d:"2026-03-02",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0249",d:"2026-03-02",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0250",d:"2026-03-02",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0251",d:"2026-03-02",p:"LT BLUE COLORPLUS",g:1080,pk:"GALLONS"},
{bn:"A0252",d:"2026-03-03",p:"LT BLUE COLORPLUS",g:1080,pk:"GALLONS"},
{bn:"A0253",d:"2026-03-03",p:"NEU CONC",g:2920,pk:"TOTES"},
{bn:"A0254",d:"2026-03-03",p:"PMB PLUS",g:1120,pk:"TOTES"},
{bn:"A0255",d:"2026-03-03",p:"FSA",g:1120,pk:"PAILS"},
{bn:"A0256",d:"2026-03-03",p:"FP 300",g:2920,pk:"DRUMS"},
{bn:"A0257",d:"2026-03-03",p:"FSA",g:1120,pk:"PAILS"},
{bn:"A0258",d:"2026-03-03",p:"PROSTRIPE PLUS WHITE",g:1120,pk:"PAILS"},
{bn:"A0259",d:"2026-03-03",p:"NATROSOL SOLUTION",g:250,pk:"TOTES"},
{bn:"A0260",d:"2026-03-03",p:"NATROSOL SOLUTION",g:250,pk:"TOTES"},
{bn:"A0261",d:"2026-03-04",p:"PRO STRIPE PLUS WHITE",g:1120,pk:"PAILS"},
{bn:"A0262",d:"2026-03-04",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0263",d:"2026-03-04",p:"COLORPAVE CONC",g:2920,pk:"DRUMS"},
{bn:"A0264",d:"2026-03-04",p:"NATROSOL SOLUTION",g:250,pk:"TOTES"},
{bn:"A0265",d:"2026-03-04",p:"LT BLUE COLORPLUS",g:1080,pk:"GALLONS"},
{bn:"A0266",d:"2026-03-04",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0267",d:"2026-03-04",p:"ACR RES W/S",g:900,pk:"PAILS"},
{bn:"A0268",d:"2026-03-04",p:"FED WHITE",g:575,pk:"PAILS"},
{bn:"A0269",d:"2026-03-04",p:"NATROSOL SOLUTION",g:250,pk:"TOTES"},
{bn:"A0270",d:"2026-03-04",p:"ACR RES W/S",g:900,pk:"PAILS"},
{bn:"A0271",d:"2026-03-04",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0272",d:"2026-03-04",p:"FED WHITE",g:575,pk:"PAILS"},
{bn:"A0273",d:"2026-03-04",p:"FASS DRI",g:230,pk:"PAILS"},
{bn:"A0274",d:"2026-03-04",p:"ACR RES",g:1120,pk:"DRUMS"},
{bn:"A0275",d:"2026-03-04",p:"FASS DRI",g:575,pk:"PAILS"},
{bn:"A0276",d:"2026-03-05",p:"ACR RES",g:1120,pk:"PAILS"},
{bn:"A0277",d:"2026-03-05",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0278",d:"2026-03-05",p:"FASS DRI",g:230,pk:"PAILS"},
{bn:"A0279",d:"2026-03-05",p:"CONCRETE SEALER",g:1120,pk:"PAILS"},
{bn:"A0280",d:"2026-03-05",p:"5 YEAR",g:575,pk:"PAILS"},
{bn:"A0281",d:"2026-03-05",p:"HD 500",g:1040,pk:"PAILS"},
{bn:"A0282",d:"2026-03-05",p:"RED B/F",g:1120,pk:"PAILS"},
{bn:"A0283",d:"2026-03-05",p:"FASS DRI",g:230,pk:"PAILS"},
{bn:"A0284",d:"2026-03-05",p:"10 YEAR",g:230,pk:"DRUMS"},
{bn:"A0285",d:"2026-03-05",p:"PENSOL",g:10,pk:"PAILS"},
{bn:"A0286",d:"2026-03-05",p:"NEU CONC W/S",g:1040,pk:"DRUMS"},
{bn:"A0287",d:"2026-03-05",p:"WHITE B/F",g:1120,pk:"PAILS"},
{bn:"A0288",d:"2026-03-05",p:"PAVE GEL",g:1120,pk:"TOTES"},
{bn:"A0289",d:"2026-03-04",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0290",d:"2026-03-04",p:"ORANGE POLY",g:1120,pk:"TOTES"},
{bn:"A0291",d:"2026-03-05",p:"FLEX CONC",g:575,pk:"KEGS"},
{bn:"A0292",d:"2026-03-05",p:"CUSHION 2",g:1040,pk:"DRUMS"},
{bn:"A0293",d:"2026-03-05",p:"PROSTRIPE PLUS YELLOW",g:230,pk:"PAILS"},
{bn:"A0294",d:"2026-03-06",p:"PROSTRIPE PLUS BLACK",g:575,pk:"PAILS"},
{bn:"A0295",d:"2026-03-06",p:"PROSTRIPE PLUS YELLOW",g:1120,pk:"PAILS"},
{bn:"A0296",d:"2026-03-06",p:"PROSTRIPE PLUS WHITE",g:1120,pk:"PAILS"},
{bn:"A0297",d:"2026-03-06",p:"ULTRA 3",g:1099,pk:"TOTES"},
{bn:"A0298",d:"2026-03-06",p:"GRN COURTFLEX",g:575,pk:"GALLONS"},
{bn:"A0299",d:"2026-03-06",p:"CUSHION 1",g:1040,pk:"DRUMS"},
{bn:"A0300",d:"2026-03-06",p:"FASS DRI",g:575,pk:"PAILS"},
{bn:"A0301",d:"2026-03-06",p:"BLACK DISP",g:550,pk:"PAILS"},
{bn:"A0302",d:"2026-03-06",p:"APB",g:550,pk:"TOTES"},
{bn:"A0303",d:"2026-03-06",p:"PROSTRIPE RED",g:167,pk:"PAILS"},
{bn:"A0304",d:"2026-03-04",p:"PAVE GEL",g:1120,pk:"TOTES"},
{bn:"A0305",d:"2026-03-09",p:"FST GRN READY MIX",g:250,pk:"PAILS"},
{bn:"A0306",d:"2026-03-09",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0307",d:"2026-03-09",p:"NEU CONC W/S",g:1040,pk:"DRUMS"},
{bn:"A0308",d:"2026-03-09",p:"APB",g:4560,pk:"PAILS"},
{bn:"A0309",d:"2026-03-09",p:"BLUE READY MIX",g:250,pk:"PAILS"},
{bn:"A0310",d:"2026-03-09",p:"HANDICAP BLUE",g:575,pk:"PAILS"},
{bn:"A0311",d:"2026-03-09",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0312",d:"2026-03-09",p:"ACR RES",g:1120,pk:"DRUMS"},
{bn:"A0313",d:"2026-03-09",p:"ACR RES",g:1120,pk:"DRUMS"},
{bn:"A0314",d:"2026-03-09",p:"ACR RES",g:1120,pk:"DRUMS"},
{bn:"A0315",d:"2026-03-09",p:"ACR RES",g:1120,pk:"DRUMS"},
{bn:"A0316",d:"2026-03-09",p:"MED GRN PICKLE PLAY",g:250,pk:"PAILS"},
{bn:"A0317",d:"2026-03-10",p:"COLORPAVE READY MIX",g:1040,pk:"PAILS"},
{bn:"A0318",d:"2026-03-10",p:"DK GRN COLORPLUS",g:1040,pk:"GALLONS"},
{bn:"A0319",d:"2026-03-10",p:"LT GRN CONC",g:230,pk:"DRUMS"},
{bn:"A0320",d:"2026-03-10",p:"FASS DRI",g:1040,pk:"PAILS"},
{bn:"A0321",d:"2026-03-10",p:"BEIGE COLORPLLUS",g:230,pk:"GALLONS"},
{bn:"A0322",d:"2026-03-10",p:"ACR CRACK FILLER",g:575,pk:"GALLONS"},
{bn:"A0323",d:"2026-03-10",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0324",d:"2026-03-10",p:"FASS DRI",g:575,pk:"PAILS"},
{bn:"A0325",d:"2026-03-10",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0326",d:"2026-03-10",p:"GRAY B/F",g:575,pk:"PAILS"},
{bn:"A0327",d:"2026-03-10",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0328",d:"2026-03-11",p:"LIQUID RD",g:9000,pk:"TOTES"},
{bn:"A0329",d:"2026-03-11",p:"7 YEAR",g:575,pk:"PAILS"},
{bn:"A0330",d:"2026-03-11",p:"VELOCITY WHITE",g:1120,pk:"PAILS"},
{bn:"A0331",d:"2026-03-11",p:"PROSTRIPE PLUS RED",g:230,pk:"PAILS"},
{bn:"A0332",d:"2026-03-11",p:"VELOCITY WHITE",g:1120,pk:"PAILS"},
{bn:"A0333",d:"2026-03-11",p:"10 YEAR",g:1120,pk:"PAILS"},
{bn:"A0334",d:"2026-03-11",p:"BLACK DISP",g:55,pk:"PAILS"},
{bn:"A0335",d:"2026-03-11",p:"15 YEAR",g:1120,pk:"PAILS"},
{bn:"A0336",d:"2026-03-11",p:"ROOF PATCH",g:1040,pk:"GALLONS"},
{bn:"A0337",d:"2026-03-11",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0338",d:"2026-03-11",p:"ULTRA 3",g:1099,pk:"TOTES"},
{bn:"A0339",d:"2026-03-11",p:"PROSTRIPE PLUS BLUE",g:230,pk:"PAILS"},
{bn:"A0340",d:"2026-03-11",p:"FP 300",g:2920,pk:"PAILS"},
{bn:"A0341",d:"2026-03-11",p:"RTU BASE",g:1120,pk:"PAILS"},
{bn:"A0342",d:"2026-03-11",p:"RED B/F",g:575,pk:"DRUMS"},
{bn:"A0343",d:"2026-03-11",p:"PMB PLUS",g:1120,pk:"TOTES"},
{bn:"A0344",d:"2026-03-11",p:"CONCRETE SEALER",g:230,pk:"PAILS"},
{bn:"A0345",d:"2026-03-11",p:"BLUE SURFACE ONE",g:575,pk:"PAILS"},
{bn:"A0346",d:"2026-03-12",p:"PAVE GEL",g:1120,pk:"PAILS"},
{bn:"A0347",d:"2026-03-12",p:"SURFACE ONE COATING BASE",g:1120,pk:"PAILS"},
{bn:"A0348",d:"2026-03-12",p:"DUST SUPPRESSANT",g:280,pk:"TOTES"},
{bn:"A0349",d:"2026-03-12",p:"ULTRA GLOSS",g:230,pk:"PAILS"},
{bn:"A0350",d:"2026-03-12",p:"ACR RES",g:2920,pk:"DRUMS"},
{bn:"A0351",d:"2026-03-12",p:"JETCOAT WHITE",g:230,pk:"PAILS"},
{bn:"A0352",d:"2026-03-12",p:"RAPID SET",g:1101,pk:"PAILS"},
{bn:"A0353",d:"2026-03-12",p:"NEU READYMIX",g:1120,pk:"PAILS"},
{bn:"A0354",d:"2026-03-12",p:"ACR RES W/S",g:900,pk:"DRUMS"},
{bn:"A0355",d:"2026-03-12",p:"GURADFLEX",g:1120,pk:"PAILS"},
{bn:"A0356",d:"2026-03-12",p:"5 YEAR",g:230,pk:"PAILS"},
{bn:"A0357",d:"2026-03-12",p:"PICKLEMASTER",g:575,pk:"KEGS"},
{bn:"A0358",d:"2026-03-12",p:"FLEXABLE MEMBRANE ADH",g:730,pk:"PAILS"},
{bn:"A0359",d:"2026-03-12",p:"CUSHION 1",g:1040,pk:"DRUMS"},
{bn:"A0360",d:"2026-03-12",p:"OIL SPOT PRIMER",g:256,pk:"QUARTS"},
{bn:"A0361",d:"2026-03-13",p:"FASS DRI",g:1040,pk:"PAILS"},
{bn:"A0362",d:"2026-03-12",p:"FP 300",g:2920,pk:"PAILS"},
{bn:"A0363",d:"2026-03-13",p:"ROOF PATCH",g:230,pk:"GALLONS"},
{bn:"A0364",d:"2026-03-13",p:"FASS DRI",g:1040,pk:"PAILS"},
{bn:"A0365",d:"2026-03-13",p:"NEU CONC W/S",g:575,pk:"PAILS"},
{bn:"A0366",d:"2026-03-13",p:"NEU ACR RES W/S",g:900,pk:"PAILS"},
{bn:"A0367",d:"2026-03-13",p:"FASS DRI",g:575,pk:"GALLONS"},
{bn:"A0368",d:"2026-03-13",p:"THERMO WHITE",g:1120,pk:"PAILS"},
];

const IMPORT_MATCH_DATES = ["2026-03-10","2026-03-11","2026-03-12","2026-03-13"];

function importProductionData() {
    const user = auth.currentUser;
    if (!user || user.email !== "master@colordept.local") {
        alert("Only master@ can run this import.");
        return;
    }

    const completed = batches.filter(b => b.status === "batch_complete");
    // Check ALL batches (including queued/active) for existing batch numbers
    const allBatchNums = new Set(batches.map(b => b.batchNumber).filter(Boolean));
    // Track which active/queued batches have numbers that conflict with the import
    const activeBatchesWithConflict = batches.filter(b => b.status !== "batch_complete" && b.batchNumber && IMPORT_DATA_2026.some(r => r.bn === b.batchNumber));

    // Check if import was already run
    const alreadyImported = IMPORT_DATA_2026.filter(row => allBatchNums.has(row.bn));
    if (alreadyImported.length > 350) {
        alert("It looks like the import was already run (" + alreadyImported.length + " of " + IMPORT_DATA_2026.length + " batch numbers already exist). Aborting to prevent duplicates.");
        return;
    }

    // Clear batch numbers from active/queued batches that conflict with import data
    if (activeBatchesWithConflict.length > 0) {
        if (!confirm(activeBatchesWithConflict.length + " active/queued batch(es) have batch numbers that conflict with the import data (e.g. " + activeBatchesWithConflict.slice(0,3).map(b => b.batchNumber).join(", ") + ").\n\nTheir batch numbers will be cleared so the import can assign them correctly.\n\nProceed?")) {
            return;
        }
    }

    if (!confirm("This will import " + IMPORT_DATA_2026.length + " batches from the 2026 Production Report into Completed.\n\nFor March 10-13, it will try to match existing completed batches by product name + date and update their batch numbers.\n\nFor all other entries, new completed batch records will be created.\n\nProceed?")) {
        return;
    }

    const matchedIds = new Set();
    let matchCount = 0;
    let createCount = 0;
    const updates = {};

    for (const row of IMPORT_DATA_2026) {
        const rowDate = row.d;
        const rowProduct = row.p.trim().toUpperCase();

        // Skip if this batch number already exists in a completed batch (not an active one we're about to clear)
        const isInCompleted = completed.some(b => b.batchNumber === row.bn);
        if (isInCompleted) continue;

        // Try to match for Mar 10-13
        let matched = false;
        if (IMPORT_MATCH_DATES.includes(rowDate)) {
            const rowDateObj = new Date(rowDate + "T12:00:00");
            const dayStart = new Date(rowDateObj.getFullYear(), rowDateObj.getMonth(), rowDateObj.getDate()).getTime();
            const dayEnd = dayStart + 86400000;

            for (const eb of completed) {
                if (matchedIds.has(eb.id)) continue;

                const ebProduct = (eb.product || "").trim().toUpperCase();
                const ebDate = eb.completedAt || eb.createdAt;

                if (ebProduct === rowProduct && ebDate >= dayStart && ebDate < dayEnd) {
                    updates["batches/" + eb.id + "/batchNumber"] = row.bn;
                    matchedIds.add(eb.id);
                    matchCount++;
                    matched = true;
                    break;
                }
            }
        }

        if (!matched) {
            const ts = new Date(rowDate + "T12:00:00").getTime();
            const id = generateId();
            updates["batches/" + id] = {
                id: id,
                batchNumber: row.bn,
                product: row.p,
                bowl: null,
                packaging: row.pk,
                unitCount: null,
                notes: null,
                status: "batch_complete",
                sortOrder: ts,
                createdAt: ts,
                startedAt: null,
                mixingCompleteAt: null,
                pouringAt: null,
                completedAt: ts,
                viscosity: null,
                initials: null,
                initials2: null,
                pouredBy: null,
            };
            createCount++;
        }
    }

    // Clear batch numbers from active/queued batches that conflict
    for (const ab of activeBatchesWithConflict) {
        updates["batches/" + ab.id + "/batchNumber"] = null;
    }

    db.ref().update(updates).then(() => {
        alert("Import complete!\n\nMatched & updated: " + matchCount + "\nNewly created: " + createCount + "\nActive batch numbers cleared: " + activeBatchesWithConflict.length);
    }).catch(err => {
        alert("Import failed: " + err.message);
        console.error("Import error:", err);
    });
}

// Show add-completed button for ajolly@ only
const addCompletedBtn = document.getElementById("add-completed-btn");
if (addCompletedBtn) {
    auth.onAuthStateChanged(user => {
        if (user && user.email === "ajolly@colordept.local") {
            addCompletedBtn.classList.remove("hidden");
        }
    });
}


// ── Add Completed Batch (AJOLLY only) ────────────────────────────────
if (addCompletedBtn) {
    const acOverlay = document.getElementById("add-completed-overlay");
    const acForm = document.getElementById("add-completed-form");
    const acProductInput = document.getElementById("ac-product");
    const acProductList = document.getElementById("ac-product-list");
    let acAutocompleteIndex = -1;

    addCompletedBtn.addEventListener("click", () => {
        if (!canEditCompletedFields()) return;
        acOverlay.classList.remove("hidden");
        // Default completed date to now
        const now = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        document.getElementById("ac-completed-date").value =
            `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
        acProductInput.focus();
    });

    document.getElementById("ac-cancel-btn").addEventListener("click", () => {
        acOverlay.classList.add("hidden");
        acForm.reset();
    });

    acOverlay.addEventListener("click", (e) => {
        if (e.target === acOverlay) {
            acOverlay.classList.add("hidden");
            acForm.reset();
        }
    });

    // Autocomplete for product field
    function renderAcAutocomplete(filter) {
        acProductList.innerHTML = "";
        acAutocompleteIndex = -1;
        if (!filter) { acProductList.classList.add("hidden"); return; }
        const lower = filter.toLowerCase();
        const matches = PRODUCT_CATALOG.filter(p => p.toLowerCase().includes(lower));
        if (matches.length === 0) { acProductList.classList.add("hidden"); return; }
        matches.forEach((item) => {
            const div = document.createElement("div");
            div.className = "autocomplete-item";
            const parts = item.split(" – ");
            div.innerHTML = `${parts[0]} <span class="item-number">– ${parts[1]}</span>`;
            div.addEventListener("mousedown", (e) => {
                e.preventDefault();
                acProductInput.value = item;
                acProductList.classList.add("hidden");
            });
            acProductList.appendChild(div);
        });
        acProductList.classList.remove("hidden");
    }

    acProductInput.addEventListener("input", () => renderAcAutocomplete(acProductInput.value.trim()));
    acProductInput.addEventListener("keydown", (e) => {
        const items = acProductList.querySelectorAll(".autocomplete-item");
        if (!items.length) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            acAutocompleteIndex = Math.min(acAutocompleteIndex + 1, items.length - 1);
            items.forEach((el, i) => el.classList.toggle("active", i === acAutocompleteIndex));
            items[acAutocompleteIndex].scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            acAutocompleteIndex = Math.max(acAutocompleteIndex - 1, 0);
            items.forEach((el, i) => el.classList.toggle("active", i === acAutocompleteIndex));
            items[acAutocompleteIndex].scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (acAutocompleteIndex >= 0 && items[acAutocompleteIndex]) {
                acProductInput.value = PRODUCT_CATALOG.filter(p => p.toLowerCase().includes(acProductInput.value.trim().toLowerCase()))[acAutocompleteIndex];
                acProductList.classList.add("hidden");
            }
        } else if (e.key === "Escape") {
            acProductList.classList.add("hidden");
        }
    });
    acProductInput.addEventListener("blur", () => acProductList.classList.add("hidden"));

    acForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!canEditCompletedFields()) return;

        const product = acProductInput.value.trim();
        const bowl = document.getElementById("ac-bowl").value;
        const packaging = document.getElementById("ac-packaging").value;
        if (!product || !bowl) return;

        const batchNumber = document.getElementById("ac-batch-number").value.trim() || null;
        const unitCountVal = document.getElementById("ac-unit-count").value.trim();
        const viscosity = document.getElementById("ac-viscosity").value.trim() || null;
        const initials = document.getElementById("ac-initials").value || null;
        const initials2 = document.getElementById("ac-initials2").value || null;
        const pouredBy = document.getElementById("ac-poured-by").value.trim() || null;
        const notes = document.getElementById("ac-notes").value.trim() || null;
        const completedDateVal = document.getElementById("ac-completed-date").value;
        const completedAt = completedDateVal ? new Date(completedDateVal).getTime() : Date.now();

        // Check for duplicate batch number
        if (isBatchNumberTaken(batchNumber)) {
            alert("Batch number \"" + batchNumber + "\" is already in use.");
            return;
        }

        const batch = {
            id: generateId(),
            batchNumber: batchNumber,
            product,
            bowl,
            packaging: packaging || null,
            unitCount: unitCountVal ? Number(unitCountVal) : null,
            notes,
            status: "batch_complete",
            sortOrder: 0,
            createdAt: completedAt,
            startedAt: completedAt,
            mixingCompleteAt: completedAt,
            pouringAt: completedAt,
            completedAt: completedAt,
            viscosity,
            initials,
            initials2: initials2 || null,
            pouredBy,
            capacityOverride: null,
        };

        batchesRef.child(batch.id).set(batch);

        // Save custom product if new
        if (product && !PRODUCT_CATALOG.includes(product)) {
            PRODUCT_CATALOG.push(product);
            customProductsRef.push(product);
        }

        acForm.reset();
        acOverlay.classList.add("hidden");
    });
}

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
