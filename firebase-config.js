// ── Firebase Configuration ──────────────────────────────────────────
// To set up Firebase:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" (or use an existing one)
// 3. Once created, click the web icon (</>) to add a web app
// 4. Copy the firebaseConfig object and paste it below
// 5. Go to "Build > Realtime Database" in the sidebar
// 6. Click "Create Database", choose a location, and start in TEST MODE
//
// Replace the placeholder values below with your real Firebase config:

const firebaseConfig = {
    apiKey: "AIzaSyCjvDDLjNR5_gBnOI5E4d5R6EMG1f-sgwU",
    authDomain: "color-dept-batches.firebaseapp.com",
    databaseURL: "https://color-dept-batches-default-rtdb.firebaseio.com",
    projectId: "color-dept-batches",
    storageBucket: "color-dept-batches.firebasestorage.app",
    messagingSenderId: "216718965064",
    appId: "1:216718965064:web:deafb9b68e6b56b4779b7d",
};

// ── Role Configuration ──────────────────────────────────────────────
// Roles are determined by the email used to log in.
// Create these accounts in Firebase Console → Authentication → Users:
//
// Owner (unrestricted access — full control over everything):
//   master@colordept.local
//
// Admin (full access — add, edit, delete, charts):
//   admin@colordept.local
//   tmahl@colordept.local    (TJ Mahl)
//   kherrin@colordept.local  (Kevin Herrin)
//   ajolly@colordept.local   (AJ Jolly)
//   jeff@colordept.local     (Jeff Gearheart)
//
// Operator (advance steps, enter viscosity/names):
//   floor@colordept.local
//   platform@colordept.local
//   cwood@colordept.local    (C Wood)
//
// Viewer (read-only with chart access):
//   dpanyard@colordept.local (Dave Panyard)
//   hhudak@colordept.local   (Haley Hudak)
//   lab@colordept.local
//   colby@colordept.local
//   pmirka@colordept.local  (P Mirka)
//   it@colordept.local      (IT)
//
// You can change these emails to whatever you like — just update the
// mapping below to match.
const ROLE_MAP = {
    "master@colordept.local": "owner",
    "admin@colordept.local": "admin",
    "tmahl@colordept.local": "admin",
    "kherrin@colordept.local": "admin",
    "matt@colordept.local": "admin",
    "floor@colordept.local": "operator",
    "platform@colordept.local": "operator",
    "cwood@colordept.local": "operator",
    "ajolly@colordept.local": "admin",
    "jeff@colordept.local": "admin",
    "dpanyard@colordept.local": "viewer",
    "hhudak@colordept.local": "viewer",
    "lab@colordept.local": "viewer",
    "colby@colordept.local": "viewer",
    "pmirka@colordept.local": "viewer",
    "it@colordept.local": "viewer",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
