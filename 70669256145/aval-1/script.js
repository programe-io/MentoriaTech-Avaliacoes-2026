// Informações da usuária
const nome = "Pérola";
const curso = "Desenvolvimento de Sistemas";
const escola = "CETI Francisca Trindade";

// Selecionando elementos do HTML
const titulo = document.querySelector("h1");
const paragrafoCurso = document.querySelector("#curso");
const paragrafoEscola = document.querySelector("#escola");

// Inserindo conteúdo na página
titulo.textContent = `Olá, eu sou ${nome} 👋`;
paragrafoCurso.textContent = `Curso: ${curso}`;
paragrafoEscola.textContent = `Escola: ${escola}`;

// Mensagem ao carregar a página
window.onload = function() {
    alert(`Bem-vinda, ${nome}!`);
};