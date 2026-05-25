// Botão "Saiba Mais"
document.querySelector(".btn").addEventListener("click", function() {
  alert("Sobrenatural é uma série que mistura terror, ação e drama. Prepare-se para mergulhar nesse universo!");
});

// Menu responsivo estilo hambúrguer
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});