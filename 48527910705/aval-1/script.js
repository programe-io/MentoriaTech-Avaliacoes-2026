
function abrirMenu() {
  document.getElementById("menu").classList.toggle("active");
}

document.getElementById("ano").textContent =
  new Date().getFullYear();

// Animação dos cartões ao aparecerem na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("mostrar");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".card, .book-card").forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(35px)";
  card.style.transition = "all 0.8s ease";
  observer.observe(card);
});

// Revelar cartões
const style = document.createElement("style");
style.textContent = `
.mostrar {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
`;
document.head.appendChild(style);

