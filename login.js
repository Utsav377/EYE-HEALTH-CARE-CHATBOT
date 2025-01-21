import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6ijIj73UBmKgg1z1N8ATMhW4AWvkQqYM",
  authDomain: "healthcare-website-bd426.firebaseapp.com",
  projectId: "healthcare-website-bd426",
  storageBucket: "healthcare-website-bd426.appspot.com",
  messagingSenderId: "94785025080",
  appId: "1:94785025080:web:8887769cfdb4f541c6e2cd",
};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  const signup = document.getElementById("submitSignIn");
  const auth = getAuth();
  const db = getFirestore();

  signup.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("lemail").value;
    const password = document.getElementById("lpassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage("Login Successful", "signInMessage");
        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid);
        window.location.href = "home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          showMessage("Incorrect Email or Password", "signInMessage");
        } else {
          showMessage("Login Failed", "signInMessage");
        }
        console.error("Error signing in: ", error);
      });
  });
});
