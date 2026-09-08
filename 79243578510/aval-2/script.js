/* ==============================
   CINEVERSE - JAVASCRIPT
============================== */


/* ==============================
   TEMA ESCURO / CLARO
============================== */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

});


/* ==============================
   FAVORITOS
============================== */

let favorites = 0;

function toggleFavorite(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {

        button.textContent = "♥";
        favorites++;

    } else {

        button.textContent = "♡";
        favorites--;

    }

    document.getElementById("favoriteCount").textContent = favorites;
}


/* ==============================
   PESQUISA
============================== */

function searchMovies() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const cards = document.querySelectorAll(".movie-card");

    if (input === "") {

        cards.forEach(card => {
            card.style.display = "block";
        });

        return;
    }

    cards.forEach(card => {

        const name = card
            .getAttribute("data-name")
            .toLowerCase();

        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}


/* ==============================
   PESQUISA COM ENTER
============================== */

document
    .getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchMovies();
        }

    });


/* ==============================
   MODAL DE INFORMAÇÕES
============================== */

function showDetails(movieName) {

    const modal = document.getElementById("modal");

    const title = document.getElementById("modalTitle");

    const text = document.getElementById("modalText");

    title.textContent = movieName;

    text.textContent =
        "Esta é uma produção fictícia do universo CineVerse. " +
        "Aqui você poderá encontrar informações sobre história, " +
        "elenco, gênero, avaliação e disponibilidade.";

    modal.classList.add("show");
}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");

}


/* ==============================
   BOTÃO ASSISTIR
============================== */

function playMovie() {

    alert(
        "🎬 O player do CineVerse será aberto aqui!\n\n" +
        "Este projeto é uma demonstração de interface."
    );

}


/* ==============================
   FECHAR MODAL CLICANDO FORA
============================== */

document
    .getElementById("modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeModal();
        }

    });


/* ==============================
   BOTÃO DE PERFIL
============================== */

document
    .getElementById("profileButton")
    .addEventListener("click", function() {

        document
            .getElementById("perfil")
            .scrollIntoView({
                behavior: "smooth"
            });

    });