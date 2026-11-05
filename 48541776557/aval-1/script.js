
const videos = document.querySelectorAll(".video-card");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".category");

let selectedCategory = "Todos";

// PESQUISAR E FILTRAR VÍDEOS
function filterVideos() {
    const searchText = searchInput.value.toLowerCase();

    videos.forEach(video => {
        const title = video.querySelector("h3").textContent.toLowerCase();
        const description = video.querySelector("p").textContent.toLowerCase();
        const category = video.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "Todos" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }
    });
}

// EVENTO DE PESQUISA
if (searchInput) {
    searchInput.addEventListener("input", filterVideos);
}

// FILTRAR POR CATEGORIA
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterVideos();
    });
});

// CURTIR VÍDEOS
document.querySelectorAll(".like-button").forEach(button => {
    button.addEventListener("click", () => {
        const liked = button.classList.toggle("liked");

        if (liked) {
            button.textContent = "❤️ Curtido";
        } else {
            button.textContent = "🤍 Curtir";
        }
    });
});

// MOSTRAR MAIS VÍDEOS
const loadMoreButton = document.getElementById("load-more");

if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
        const hiddenVideos = document.querySelectorAll(
            ".video-card.hidden"
        );

        hiddenVideos.forEach(video => {
            video.classList.remove("hidden");
        });

        loadMoreButton.style.display = "none";
    });
}

// ANO AUTOMÁTICO NO RODAPÉ
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
