// Seleciona o container de estrelas
const starsContainer = document.querySelector(".stars");

// Quantidade de estrelas
const totalStars = 150;

for (let i = 0; i < totalStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Posição aleatória na tela
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";

    // Tamanho aleatório
    const size = Math.random() * 3;
    star.style.width = size + "px";
    star.style.height = size + "px";

    // Tempo de animação aleatório
    star.style.animationDuration = (Math.random() * 3 + 1) + "s";

    starsContainer.appendChild(star);
}