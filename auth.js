
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjWsMSAY4u9HyJMSZnWoL7QWvVMnLuEv4",
  authDomain: "comp2750-group.firebaseapp.com",
  projectId: "comp2750-group",
  storageBucket: "comp2750-group.firebasestorage.app",
  messagingSenderId: "764095591222",
  appId: "1:764095591222:web:a1f55daeafb7e56b26b997"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login logic
const loginForm = document.getElementById('login-form');
const errorMessageDiv = document.getElementById('error-message');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page refresh

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        errorMessageDiv.classList.add('d-none');

        // Firebase Sign In
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successfully signed in [cite: 18]
                console.log("Logged in:", userCredential.user.email);
                window.location.href = 'index.html'; // Redirect to Welcome page [cite: 18]
            })
            .catch((error) => {
                // Handle Errors gracefully [cite: 86]
                console.error("Login error:", error.message);
                errorMessageDiv.innerText = "Invalid student email or password.";
                errorMessageDiv.classList.remove('d-none'); // Show alert box
            });
    });
}

// Auth

onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname.split("/").pop();

    if (user) {
       
        if (currentPage === 'login.html' || currentPage === '') {
            window.location.href = 'index.html';
        }
    } else {
        // User is signed out. 
        
        if (currentPage !== 'login.html' && currentPage !== '') {
            window.location.href = 'login.html';
        }
    }
});

// Sign out

window.handleSignOut = function() {
    signOut(auth).then(() => {
        console.log("Signed out successfully.");
        window.location.href = 'login.html'; // Redirect back to login [cite: 26]
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
};

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

