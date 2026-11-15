
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const favoriteBtn = document.getElementById("favoriteBtn");

// Abrir e fechar menu
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

// Sistema de favoritos
let favorito = localStorage.getItem("filmeFavorito") === "true";

function atualizarFavorito() {
    if (favorito) {
        favoriteBtn.innerHTML = "♥ Adicionado aos favoritos";
        favoriteBtn.classList.add("active");
    } else {
        favoriteBtn.innerHTML = "♡ Adicionar aos favoritos";
        favoriteBtn.classList.remove("active");
    }
}

atualizarFavorito();

favoriteBtn.addEventListener("click", () => {
    favorito = !favorito;

    localStorage.setItem("filmeFavorito", favorito);

    atualizarFavorito();

    if (favorito) {
        alert("Diário de uma Paixão foi adicionado aos seus favoritos! ❤️");
    } else {
        alert("Filme removido dos favoritos.");
    }
});
