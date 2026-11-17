
// MODO ESCURO

const darkMode = document.getElementById("darkMode");

darkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    darkMode.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
});


// PESQUISA DE NOTÍCIAS

const search = document.getElementById("search");
const newsCards = document.querySelectorAll(".news-card");
const noResults = document.getElementById("noResults");

function filterNews() {
    const searchText = search.value.toLowerCase();

    const selectedCategory =
        document.querySelector(".categories button.active")
        .dataset.category;

    let count = 0;

    newsCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = title.includes(searchText);

        const matchesCategory =
            selectedCategory === "Todas" ||
            selectedCategory === category;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            count++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = count !== 0;
}

search.addEventListener("input", filterNews);


// FILTRO DE CATEGORIAS

const categoryButtons =
    document.querySelectorAll(".categories button");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        filterNews();
    });
});


// LER NOTÍCIA

const readButtons = document.querySelectorAll(".read-btn");

readButtons.forEach(button => {
    button.addEventListener("click", () => {

        const news = button.nextElementSibling
            .nextElementSibling;

        news.classList.toggle("show");

        button.textContent = news.classList.contains("show")
            ? "Ler menos ↑"
            : "Ler notícia";
    });
});


// CURTIDAS

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {
    let liked = false;
    let likes = 0;

    button.addEventListener("click", () => {

        if (!liked) {
            likes++;
            button.style.background = "#ffb3b3";
            liked = true;
        } else {
            likes--;
            button.style.background = "#ffe5e5";
            liked = false;
        }

        button.querySelector("span").textContent = likes;
    });
});
