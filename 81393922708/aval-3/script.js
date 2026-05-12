const titulo = document.querySelector("h1");
const imagem = document.querySelector("img");
const paragrafo = document.querySelector("p");

titulo.addEventListener("click", () => {
    titulo.innerText = "Título Alterado com JavaScript";
});

imagem.addEventListener("mouseover", () => {
    imagem.style.transform = "scale(1.1)";
    imagem.style.transition = "0.3s";
});

imagem.addEventListener("mouseout", () => {
    imagem.style.transform = "scale(1)";
});

paragrafo.addEventListener("click", () => {
    paragrafo.style.color = "blue";
});