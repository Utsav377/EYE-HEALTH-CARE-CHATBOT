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
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 2000);
}

const signup = document.getElementById("submitSignUp");
const auth = getAuth();
const db = getFirestore();

signup.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("uname").value;
  const cPassword = document.getElementById("confirmPassword").value;

  if (password !== cPassword) {
    showMessage("Passwords do not match!", "signUpMessage");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        username: username,
      };
      showMessage("Account Created Successfully", "signUpMessage");
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          showMessage("Error saving user data!", "signUpMessage");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showMessage("User with email already exists!", "signUpMessage");
      } else {
        showMessage("Unable to create user!", "signUpMessage");
      }
      console.error("Error creating user: ", error);
    });
});
