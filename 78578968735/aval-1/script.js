/* =========================
   BLOG SAÚDE & FITNESS JS
   ========================= */

/* MENU MOBILE (caso você adicione botão depois) */
function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

/* SCROLL SUAVE PARA LINKS DO MENU */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

/* MODO ESCURO */
const darkModeButton = document.createElement("button");
darkModeButton.innerText = "🌙 Modo Escuro";
darkModeButton.style.position = "fixed";
darkModeButton.style.bottom = "20px";
darkModeButton.style.right = "20px";
darkModeButton.style.padding = "10px 15px";
darkModeButton.style.border = "none";
darkModeButton.style.borderRadius = "8px";
darkModeButton.style.cursor = "pointer";
darkModeButton.style.background = "#27ae60";
darkModeButton.style.color = "white";
document.body.appendChild(darkModeButton);

darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

/* ESTILO DO MODO ESCURO */
const style = document.createElement("style");
style.innerHTML = `
  .dark-mode {
    background: #121212;
    color: #f1f1f1;
  }

  .dark-mode .post {
    background: #1e1e1e;
    color: #f1f1f1;
  }

  .dark-mode nav {
    background: #000;
  }

  .dark-mode footer {
    background: #000;
  }
`;
document.head.appendChild(style);

/* ANIMAÇÃO AO ROLAR (efeito simples) */
const posts = document.querySelectorAll(".post");

window.addEventListener("scroll", () => {
  posts.forEach(post => {
    const position = post.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      post.style.opacity = "1";
      post.style.transform = "translateY(0)";
      post.style.transition = "0.6s ease";
    } else {
      post.style.opacity = "0.7";
      post.style.transform = "translateY(20px)";
    }
  });
});