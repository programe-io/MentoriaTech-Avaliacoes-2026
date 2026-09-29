<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const p = docSnap.data();

    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <div class="username">${p.name}</div>
      <p>${p.text}</p>
      ${p.image ? `<img src="${p.image}" width="200">` : ""}
      <div class="like">❤️ ${p.likes}</div>
    `;

    div.querySelector(".like").onclick = () => {
      updateDoc(doc(db, "posts", docSnap.id), {
        likes: p.likes + 1
      });
    };

    container.appendChild(div);
  });
});

window.postComment = async function () {
  const name = document.getElementById("name").value || "Anônimo";
  const text = document.getElementById("comment").value;
  const file = document.getElementById("imageUpload").files[0];

  if (!text && !file) return;

  if (file) {
    const reader = new FileReader();
    reader.onload = async function (e) {
      await addDoc(collection(db, "posts"), {
        name,
        text,
        image: e.target.result,
        likes: 0,
        createdAt: Date.now()
      });
    };
    reader.readAsDataURL(file);
  } else {
    await addDoc(collection(db, "posts"), {
      name,
      text,
      image: null,
      likes: 0,
      createdAt: Date.now()
    });
  }
};
</script>