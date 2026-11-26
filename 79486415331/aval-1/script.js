
const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

menuButton.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});


// MODO ESCURO

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const dark = document.body.classList.contains("dark-mode");

  themeButton.textContent = dark ? "☀️" : "🌙";

  localStorage.setItem("tema", dark ? "escuro" : "claro");
});

if (localStorage.getItem("tema") === "escuro") {
  document.body.classList.add("dark-mode");
  themeButton.textContent = "☀️";
}


// PESQUISA DE ARTIGOS

const searchInput = document.getElementById("searchInput");
const posts = document.querySelectorAll(".post");
const emptyMessage = document.getElementById("emptyMessage");

searchInput.addEventListener("input", () => {
  const search = searchInput.value.toLowerCase();
  let found = 0;

  posts.forEach(post => {
    const content = post.textContent.toLowerCase();
    const match = content.includes(search);

    post.style.display = match ? "" : "none";

    if (match) found++;
  });

  emptyMessage.hidden = found !== 0;
});


// SISTEMA DE CURTIDAS

document.querySelectorAll(".like-button").forEach(button => {
  let likes = 0;

  button.addEventListener("click", () => {
    likes++;
    button.querySelector("span").textContent = likes;
    button.firstChild.textContent = "♥ ";
  });
});


// BOTÃO VOLTAR AO TOPO

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {
  topButton.style.display =
    window.scrollY > 300 ? "block" : "none";
});

topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// ANO AUTOMÁTICO

document.getElementById("year").textContent =
  new Date().getFullYear();


// FORMULÁRIO DE CONTATO

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  formMessage.textContent =
    "Mensagem preenchida! Configure um serviço de envio para recebê-la.";

  contactForm.reset();
});


// ANIMAÇÃO DE ENTRADA

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".post").forEach(post => {
  post.style.opacity = "0";
  post.style.transform = "translateY(30px)";
  post.style.transition = "opacity 0.6s, transform 0.6s";

  observer.observe(post);
});