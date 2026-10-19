// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  
  // -------------------------------------------------------------
  // 1. Funcionalidade de Curtir nos Posts
  // -------------------------------------------------------------
  const likeButtons = document.querySelectorAll(".btn-like");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const countSpan = button.querySelector(".like-count");
      let currentLikes = parseInt(countSpan.textContent);

      // Verifica se o botão já foi curtido
      if (!button.classList.contains("liked")) {
        currentLikes++;
        button.classList.add("liked");
        button.style.backgroundColor = "#ffe4e6";
        button.style.color = "#e11d48";
      } else {
        currentLikes--;
        button.classList.remove("liked");
        button.style.backgroundColor = "";
        button.style.color = "";
      }

      countSpan.textContent = currentLikes;
    });
  });

  // -------------------------------------------------------------
  // 2. Alternador de Modo Escuro / Claro (Dark Mode)
  // -------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Troca o texto e o ícone do botão
    if (document.body.classList.contains("dark-mode")) {
      themeToggleBtn.textContent = "☀️ Modo Claro";
    } else {
      themeToggleBtn.textContent = "🌙 Modo Escuro";
    }
  });

  // -------------------------------------------------------------
  // 3. Menu Mobile (Hamburguer)
  // -------------------------------------------------------------
  const menuToggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});