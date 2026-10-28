
let total = 12;

document.getElementById("like").onclick = () => {
  total++;
  document.getElementById("likes").textContent =
    `❤️ ${total} curtidas`;
};

function comentar() {
  const campo = document.getElementById("comment");
  if (!campo.value.trim()) return;

  document.getElementById("comments").innerHTML +=
    `<p>${campo.value.replace(/</g, "&lt;")}</p>`;

  campo.value = "";
}

lucide.createIcons();
