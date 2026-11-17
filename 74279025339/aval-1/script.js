// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("💗 Bem-vinda ao Mundo da Maquiagem! Descubra sua beleza!");
\});

// BOTÃO DE CONHECER MAIS
function conhecerMais() {
    alert("✨ A maquiagem é uma forma de expressar sua beleza e personalidade!");
\}

// EFEITO NOS PRODUTOS
const produtos = document.querySelectorAll(".card");

produtos.forEach(function(produto) {

    produto.addEventListener("click", function() {

        const nome = produto.querySelector("h3").textContent;

        alert("💄 Você selecionou: " + nome);

    \});

\});

// MENU DE NAVEGAÇÃO
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {

    link.addEventListener("click", function() {
        console.log("Você acessou: " + link.textContent);
    \});

\});

// BOTÃO DE MUDAR O TEMA
function mudarTema() {

    document.body.classList.toggle("tema-escuro");

\}

// BOTÃO DE SAUDAÇÃO
function saudacao() {

    let nome = prompt("Qual é o seu nome?");

    if (nome && nome.trim() !== "") {
        alert("Olá, " + nome + "! Seja bem-vinda ao nosso mundo da beleza! 💗");
    \} else {
        alert("Olá! Seja bem-vinda! 💕");
    \}

\}$0