// Estilo geral da página
document.body.style.backgroundColor = "#f0f0f0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.textAlign = "center";

// Título (h1)
const titulo = document.querySelector("h1");
titulo.style.color = "blue";
titulo.style.fontSize = "40px";

// Parágrafo (p)
const paragrafo = document.querySelector("p");
paragrafo.style.color = "#333";
paragrafo.style.fontSize = "18px";

// Botão
const botao = document.querySelector("button");
botao.style.backgroundColor = "green";
botao.style.color = "white";
botao.style.border = "none";
botao.style.padding = "10px 20px";
botao.style.fontSize = "16px";
botao.style.borderRadius = "8px";
botao.style.cursor = "pointer";

// Efeito hover
botao.addEventListener("mouseover", () => {
    botao.style.backgroundColor = "darkgreen";
});

botao.addEventListener("mouseout", () => {
    botao.style.backgroundColor = "green";
});