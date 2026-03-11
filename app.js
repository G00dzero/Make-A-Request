import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔥 Replace with YOUR Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ===============================
// SONG REQUEST SUBMISSION
// ===============================

const form = document.getElementById("songForm");

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const song = document.getElementById("song").value;

    try {

      await addDoc(collection(db, "requests"), {
        name: name,
        song: song,
        time: new Date()
      });

      document.getElementById("status").innerText = "✅ Request sent!";

      form.reset();

    } catch (error) {

      console.error("Error adding request:", error);

    }

  });

}


// ===============================
// DJ DASHBOARD LIVE REQUEST LIST
// ===============================

const requestList = document.getElementById("requests");

if (requestList) {

  const requestsRef = collection(db, "requests");

  onSnapshot(requestsRef, (snapshot) => {

    requestList.innerHTML = "";

    snapshot.forEach((doc) => {

      const data = doc.data();

      const li = document.createElement("li");

      li.textContent = `${data.name} requested: ${data.song}`;

      requestList.appendChild(li);

    });

  });

}