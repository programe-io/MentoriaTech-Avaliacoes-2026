
// Seleciona os elementos do menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Abrir e fechar o menu
menuBtn.addEventListener("click", function() {

  const aberto = navLinks.classList.toggle("active");

  if (aberto) {
    menuBtn.textContent = "✕";
  } else {
    menuBtn.textContent = "☰";
  }

  menuBtn.setAttribute("aria-expanded", aberto);

});

// Fechar menu ao clicar em um link
const links = navLinks.querySelectorAll("a");

links.forEach(function(link) {

  link.addEventListener("click", function() {

    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");

  });

});
