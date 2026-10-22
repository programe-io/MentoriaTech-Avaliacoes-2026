
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");

  const aberto = nav.classList.contains("open");

  menuToggle.textContent = aberto ? "✕" : "☰";
  menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
