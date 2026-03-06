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
//   admin@colordept.local    → Full access (add, edit, delete, charts)
//   operator@colordept.local → Advance steps, enter viscosity/names
//   viewer@colordept.local   → Read-only with chart access
//
// You can change these emails to whatever you like — just update the
// mapping below to match.
const ROLE_MAP = {
    "admin@colordept.local": "admin",
    "operator@colordept.local": "operator",
    "viewer@colordept.local": "viewer",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
