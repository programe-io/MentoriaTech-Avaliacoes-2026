// Seleciona a imagem
const foto = document.querySelector(".card img");

// Seleciona o título
const titulo = document.querySelector(".card h1");

// Evento de clique na imagem
foto.addEventListener("click", () => {
    foto.style.transform = "rotate(360deg) scale(1.1)";
    foto.style.transition = "0.8s";

    alert("Olá! Bem-vindo ao perfil de Kaio Dias Ferreira Camelo.");
});

// Efeito ao passar o mouse sobre o nome
titulo.addEventListener("mouseover", () => {
    titulo.style.color = "#00d4ff";
    titulo.style.transition = "0.3s";
});

// Volta à cor original quando o mouse sai
titulo.addEventListener("mouseout", () => {
    titulo.style.color = "#ffffff";
});