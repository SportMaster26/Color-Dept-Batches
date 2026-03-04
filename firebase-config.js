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
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
