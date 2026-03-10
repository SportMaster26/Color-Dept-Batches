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
    "4.5 Gallon Pails": { gallons: 4.5, unit: "Pails" },
    "5 Gallon Pails":   { gallons: 5, unit: "Pails" },
    "30 Gallon Kegs":   { gallons: 30, unit: "Kegs" },
    "55 Gallon Drums":  { gallons: 55, unit: "Drums" },
    "275 Gallon Totes": { gallons: 275, unit: "Totes" },
};

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
const batchCounterRef = db.ref("meta/batchCounter");
const recycledNumbersRef = db.ref("meta/recycledNumbers");
const notesRef = db.ref("notes");
const customProductsRef = db.ref("meta/customProducts");
const latexTanksRef = db.ref("latexTanks");

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
    { id: "CB", name: "CB", capacity: 275, group: "Totes" },
    { id: "T1", name: "T1", capacity: 275, group: "Totes" },
    { id: "T2", name: "T2", capacity: 275, group: "Totes" },
    { id: "T3", name: "T3", capacity: 275, group: "Totes" },
    { id: "T4", name: "T4", capacity: 275, group: "Totes" },
    { id: "T5", name: "T5", capacity: 275, group: "Totes" },
    { id: "T6", name: "T6", capacity: 275, group: "Totes" },
];

let latexTankLevels = {}; // { tankId: gallons }

// Load custom products from Firebase and merge into catalog
customProductsRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const customs = Object.values(data);
        customs.forEach((p) => {
            if (!PRODUCT_CATALOG.includes(p)) {
                PRODUCT_CATALOG.push(p);
            }
        });
    }
});

// ── State ───────────────────────────────────────────────────────────
let batches = [];
let undoStack = []; // stores { id, prevStatus } for admin undo
let operatorUndoStack = []; // separate undo stack for operator
const MAX_UNDO = 20;
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

// Users allowed to see the Latex Department tab
const LATEX_TAB_USERS = [
    "tmahl@colordept.local",
    "kherrin@colordept.local",
    "ajolly@colordept.local",
    "cwood@colordept.local",
    "hhudak@colordept.local",
    "jeff@colordept.local",
];
const loginScreen = document.getElementById("login-screen");
const appContainer = document.getElementById("app-container");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

// ── Authentication ──────────────────────────────────────────────────

function setRole(role) {
    currentRole = role;
    isAdmin = role === "admin";
    isOperator = role === "operator";
    isViewer = role === "viewer";
}

// ── Notes Users ─────────────────────────────────────────────────────
const NOTES_POST_USERS = ["tmahl@colordept.local", "kherrin@colordept.local", "ajolly@colordept.local"];

function canPostNotes() {
    const user = auth.currentUser;
    return user && NOTES_POST_USERS.includes(user.email);
}

function updateAdminUI() {
    const adminElements = document.querySelectorAll(".admin-only");

    // Update role badge
    roleBadge.className = "role-badge";
    if (isAdmin) {
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

    // Notes tab: hide from floor and platform operators
    tabNotes.classList.toggle("hidden", isFloorOrPlatform);

    // Only TJ (tmahl) and Kevin (kherrin) can add notes
    const canPostNotes = NOTES_POST_USERS.includes(userEmail);
    const notesAddSection = document.getElementById("notes-add-section");
    if (notesAddSection) {
        notesAddSection.classList.toggle("hidden", !canPostNotes);
    }

    render();
}

// Login form handler
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    loginError.classList.add("hidden");

    auth.signInWithEmailAndPassword(email, password)
        .then((cred) => {
            const role = ROLE_MAP[cred.user.email] || "viewer";
            setRole(role);
            loginScreen.classList.add("hidden");
            appContainer.classList.remove("hidden");
            updateAdminUI();
        })
        .catch((err) => {
            loginError.textContent = err.code === "auth/invalid-credential"
                ? "Invalid email or password."
                : err.code === "auth/user-not-found"
                ? "No account found with that email."
                : err.code === "auth/wrong-password"
                ? "Incorrect password."
                : err.code === "auth/too-many-requests"
                ? "Too many attempts. Try again later."
                : "Login failed. Please try again.";
            loginError.classList.remove("hidden");
        });
});

// Logout handler
logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
        setRole(null);
        isAdmin = false;
        isOperator = false;
        isViewer = false;
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
        loginScreen.classList.add("hidden");
        appContainer.classList.remove("hidden");
        updateAdminUI();
    } else {
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
    board.classList.toggle("hidden", tab !== "active");
    latexBoard.classList.toggle("hidden", tab !== "latex");
    completedBoard.classList.toggle("hidden", tab !== "completed");
    notesBoard.classList.toggle("hidden", tab !== "notes");
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
        undoBtn.classList.toggle("hidden", (!isAdmin && !isOperator) || stack.length === 0);
    }
}

undoBtn.addEventListener("click", () => {
    const stack = getActiveUndoStack();
    if (isViewer || (!isAdmin && !isOperator) || stack.length === 0) return;
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

    // One-time reset: renumber ALL batches starting from A0001
    const allSorted = [...batches].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    const needsRenumber = allSorted.some((b, i) => b.batchNumber !== "A" + String(i + 1).padStart(4, "0"));
    if (allSorted.length > 0 && needsRenumber) {
        const updates = {};
        allSorted.forEach((batch, i) => {
            const batchNumber = "A" + String(i + 1).padStart(4, "0");
            batch.batchNumber = batchNumber;
            updates[batch.id + "/batchNumber"] = batchNumber;
        });
        batchCounterRef.set(allSorted.length);
        recycledNumbersRef.remove();
        batchesRef.update(updates);
    } else if (allSorted.length === 0) {
        batchCounterRef.set(0);
        recycledNumbersRef.remove();
    }
    render();
    if (activeTab === "latex") renderLatexBoard();
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

            // Click to edit (admins & latex tab users)
            card.addEventListener("click", (e) => {
                if (e.target.classList.contains("tank-input")) return;
                const user = auth.currentUser;
                if (!user) return;

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
    const tankId = input.dataset.tankId;
    const tank = LATEX_TANKS.find(t => t.id === tankId);
    let val = parseInt(input.value) || 0;
    if (val < 0) val = 0;
    if (tank && val > tank.capacity) val = tank.capacity;
    input.classList.add("hidden");
    latexTanksRef.child(tankId).set({ value: val, updatedAt: new Date().toISOString() });
}

// Listen for tank level changes from Firebase
latexTanksRef.on("value", (snapshot) => {
    latexTankLevels = snapshot.val() || {};
    if (activeTab === "latex") renderLatexBoard();
});

// Seed initial tank levels if none exist yet (one-time)
latexTanksRef.once("value", (snapshot) => {
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

function setCompletedView(view) {
    completedView = view;
    viewTableBtn.classList.toggle("view-btn-active", view === "table");
    viewChartBtn.classList.toggle("view-btn-active", view === "chart");
    viewHistoryBtn.classList.toggle("view-btn-active", view === "history");
    completedTableWrap.classList.toggle("hidden", view !== "table");
    completedChartWrap.classList.toggle("hidden", view !== "chart");
    productHistoryWrap.classList.toggle("hidden", view !== "history");
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

exportExcelBtn.addEventListener("click", exportToExcel);

function getCompletedRows() {
    return batches
        .filter((b) => b.status === "batch_complete")
        .sort((a, b) => {
            const numA = a.batchNumber ? parseInt(a.batchNumber.slice(1)) : Infinity;
            const numB = b.batchNumber ? parseInt(b.batchNumber.slice(1)) : Infinity;
            return numA - numB;
        })
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
                initials2: batch.initials2 || "",
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

const PRODUCT_HISTORY_USERS = [
    "ajolly@colordept.local",
    "jeff@colordept.local",
    "dpanyard@colordept.local",
    "hhudak@colordept.local",
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
            <td>${escapeHtml(r.initials2) || "—"}</td>
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
        rows = rows.filter((r) => r.initials === compounder || r.initials2 === compounder);
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
                { label: "Cumulative Batches", data: cumBatchData, borderColor: "#D4952B", backgroundColor: "rgba(212,149,43,0.1)", fill: true, tension: 0.3, pointRadius: 3, borderWidth: 2 },
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
        // Operators can only advance status (click through steps)
        actionsHtml = nextAction ? `
            <div class="card-actions">
                <button class="btn btn-sm ${nextBtnClass}" data-action="advance" data-id="${batch.id}">${nextAction.label}</button>
            </div>
        ` : "";
    }

    let extraInfo = "";
    if (batch.viscosity) extraInfo += `<span class="card-viscosity">Viscosity: ${escapeHtml(batch.viscosity)} KU</span>`;
    if (batch.initials) {
        let mixedLabel = escapeHtml(batch.initials);
        if (batch.initials2) mixedLabel += ` & ${escapeHtml(batch.initials2)}`;
        extraInfo += `<span class="card-initials">Mixed: ${mixedLabel}</span>`;
    }
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

// ── Touch Move Button ───────────────────────────────────────────────
const isTouchDevice = /iPad|iPhone|iPod|Android|webOS|BlackBerry|SM-|Galaxy/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || ("ontouchstart" in window && navigator.maxTouchPoints > 0 && window.matchMedia("(max-width: 1366px)").matches);

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

    for (const bowlKey of BOWL_ORDER) {
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
    } else if (action === "move" && isAdmin) {
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

    function createDuplicateWithNumber(num) {
        const batchNumber = "A" + String(num).padStart(4, "0");
        const newBatch = {
            id: generateId(),
            batchNumber,
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

    recycledNumbersRef.once("value", (snap) => {
        const recycled = snap.val();
        if (recycled) {
            const entries = Object.entries(recycled);
            let minKey = entries[0][0];
            let minNum = entries[0][1];
            for (const [key, val] of entries) {
                if (val < minNum) { minKey = key; minNum = val; }
            }
            recycledNumbersRef.child(minKey).remove();
            createDuplicateWithNumber(minNum);
        } else {
            batchCounterRef.transaction((current) => {
                return (current || 0) + 1;
            }, (error, committed, snapshot) => {
                if (error || !committed) {
                    alert("Failed to generate batch number. Please try again.");
                    return;
                }
                createDuplicateWithNumber(snapshot.val());
            });
        }
    });
}

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

notesRef.on("value", (snap) => {
    const data = snap.val() || {};
    siteNotes = Object.values(data).sort((a, b) => b.createdAt - a.createdAt);
    if (activeTab === "notes") renderNotes();
});

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
