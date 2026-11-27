// Função para mostrar mensagem
function mostrarMensagem() {
    alert("Olá! Seja bem-vindo ao meu site! 💙");
\}

// Função para mudar a cor do título
function mudarCor() {
    const titulo = document.querySelector("header h1");

    titulo.style.color = "#ff00ff";

    alert("A cor do título foi alterada!");
\}

// Função para mostrar a data
function mostrarData() {
    const data = new Date();

    const dataFormatada = data.toLocaleDateString("pt-BR");

    alert("A data de hoje é: " + dataFormatada);
\}

// Mensagem no console
console.log("Site carregado com sucesso!");

// Mensagem de boas-vindas no navegador
window.addEventListener("load", function() {
    console.log("Bem-vindo ao meu projeto!")$0