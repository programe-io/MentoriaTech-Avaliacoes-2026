
// MENU MOBILE

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    menuBtn.textContent =
        navLinks.classList.contains("show") ? "✕" : "☰";
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuBtn.textContent = "☰";
    });
});

// FILTRO POR CATEGORIA

const categoryButtons = document.querySelectorAll(".category");
const posts = document.querySelectorAll(".post-card");

let selectedCategory = "Todos";

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterPosts();
    });
});

// PESQUISA DE PUBLICAÇÕES

const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", filterPosts);

function filterPosts() {

    const searchText = searchInput.value.toLowerCase();
    let visiblePosts = 0;

    posts.forEach(post => {

        const category = post.dataset.category;
        const content = post.textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "Todos" ||
            category === selectedCategory;

        const matchesSearch =
            content.includes(searchText);

        if (matchesCategory && matchesSearch) {
            post.style.display = "block";
            visiblePosts++;
        } else {
            post.style.display = "none";
        }

    });

    noResults.hidden = visiblePosts !== 0;
}

// SISTEMA DE CURTIDAS

document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", () => {

        let count = Number(
            button.querySelector("span").textContent
        );

        const liked = button.dataset.liked === "true";

        if (liked) {
            count--;
            button.dataset.liked = "false";
            button.firstChild.textContent = "♡ ";
        } else {
            count++;
            button.dataset.liked = "true";
            button.firstChild.textContent = "♥ ";
        }

        button.querySelector("span").textContent = count;

    });

});
