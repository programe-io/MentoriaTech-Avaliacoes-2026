// BANCO DE VÍDEOS

const videos = document.querySelectorAll(".video-card");

const videoCount = document.getElementById("videoCount");


// CONTADOR

function updateCounter() {

    const visibleVideos = [...videos].filter(video => {
        return video.style.display !== "none";
    });

    videoCount.textContent =
        ${visibleVideos.length} vídeos encontrados;
}

updateCounter();


// FILTRAR CATEGORIAS

function filterCategory(category) {

    videos.forEach(video => {

        const videoCategory = video.dataset.category;

        if (category === "todos" || videoCategory === category) {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }

    });

    updateCounter();

    // Atualiza botões

    document.querySelectorAll(".category").forEach(button => {
        button.classList.remove("active");
    });

    event?.target?.classList.add("active");
}


// PESQUISA

function searchVideos() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    videos.forEach(video => {

        const title =
            video.querySelector("h3")
            .textContent
            .toLowerCase();

        const channel =
            video.querySelectorAll("p")[0]
            .textContent
            .toLowerCase();

        if (
            title.includes(search) ||
            channel.includes(search)
        ) {

            video.style.display = "block";

        } else {

            video.style.display = "none";

        }

    });

    updateCounter();
}


// PESQUISA COM ENTER

document
    .getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchVideos();
        }

    });


// PERFIL

function openProfile() {

    document
        .getElementById("profileModal")
        .classList.add("show");

}

function closeProfile() {

    document
        .getElementById("profileModal")
        .classList.remove("show");

}


// FECHAR MODAL CLICANDO FORA

document
    .getElementById("profileModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeProfile();
        }

    });


// NOTIFICAÇÃO

function showNotification() {

    alert("🔔 Você não possui novas notificações.");

}


// HISTÓRICO

function showHistory() {

    alert("🕘 Seu histórico está vazio.");

}


// FAVORITOS

function showFavorites() {

    alert("❤️ Você ainda não possui vídeos favoritos.");

}


// ROLAR ATÉ OS VÍDEOS

function scrollToVideos() {

    document
        .getElementById("videos")
        .scrollIntoView({
            behavior: "smooth"
        });

}