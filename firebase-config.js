// ========================================
// Firebase Configuration
// ========================================
const firebaseConfig = {
    apiKey: "AIzaSyC2wK3FHeaaPakumMsSQUDq6o1h6K7g1E",
    authDomain: "kreeda-26.firebaseapp.com",
    projectId: "kreeda-26",
    storageBucket: "kreeda-26.firebasestorage.app",
    messagingSenderId: "171626967399",
    appId: "1:171626967399:web:678224ecb1c57cea853fc2"
};

// Initialize Firebase (Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
