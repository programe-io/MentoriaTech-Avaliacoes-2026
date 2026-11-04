
const articles = [
    {
        title: "Como ter uma vida mais organizada",
        category: "DICAS",
        description: "Descubra maneiras simples de organizar sua rotina e aproveitar melhor seu tempo.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700"
    },
    {
        title: "A importância de aprender coisas novas",
        category: "EDUCAÇÃO",
        description: "Aprender diariamente pode transformar sua vida e abrir novas oportunidades.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700"
    },
    {
        title: "Encontre inspiração todos os dias",
        category: "INSPIRAÇÃO",
        description: "Pequenas atitudes podem fazer uma grande diferença na sua jornada.",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=700"
    }
];

const posts = document.getElementById("posts");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

// Mostrar artigos
function displayArticles(list) {
    posts.innerHTML = "";

    emptyMessage.hidden = list.length !== 0;

    list.forEach(article => {
        const card = document.createElement("article");
        card.className = "post";

        const img = document.createElement("img");
        img.src = article.image;
        img.alt = article.title;
        img.loading = "lazy";

        const content = document.createElement("div");
        content.className = "post-content";

        const category = document.createElement("small");
        category.textContent = article.category;

        const title = document.createElement("h3");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        content.append(category, title, description);
        card.append(img, content);
        posts.appendChild(card);
    });
}

displayArticles(articles);

// Pesquisa
searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();

    const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(search) ||
        article.category.toLowerCase().includes(search) ||
        article.description.toLowerCase().includes(search)
    );

    displayArticles(filtered);
});

// Modo escuro
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    themeBtn.textContent = dark ? "☀️" : "🌙";

    localStorage.setItem("darkMode", dark);
});

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Formulário de contato
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    formMessage.textContent =
        "Mensagem preenchida! Configure um serviço de envio para recebê-la.";

    contactForm.reset();
});
