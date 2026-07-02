// Mensagem ao carregar a página
window.onload = function () {
    alert("Bem-vindo à página!");
};

// Seleciona o título do artigo
const titulo = document.querySelector("article h2");

// Altera o título ao clicar
titulo.addEventListener("click", function () {
    titulo.textContent = "Título alterado com JavaScript!";
});

// Seleciona a imagem
const imagem = document.querySelector("img");

// Troca a imagem quando o mouse passa sobre ela
imagem.addEventListener("mouseover", function () {
    imagem.src = "https://picsum.photos/800/401";
});

// Volta para a imagem original quando o mouse sai
imagem.addEventListener("mouseout", function () {
    imagem.src = "https://picsum.photos/800/400";
});

// Exibe a data e a hora no rodapé
const rodape = document.querySelector("footer p");
const data = new Date();

rodape.textContent +=
    " | Data: " + data.toLocaleDateString() +
    " - Hora: " + data.toLocaleTimeString();