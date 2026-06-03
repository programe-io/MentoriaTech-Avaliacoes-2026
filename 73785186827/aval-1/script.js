// Exibe uma mensagem ao clicar em um botão
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
\}

// Altera o texto de um elemento
function alterarTexto() {
    document.getElementById("texto").innerHTML =
        "O texto foi alterado com JavaScript!";
\}

// Mostra a hora atual
function mostrarHora() {
    const agora = new Date();
    document.getElementById("hora").innerHTML =
        agora.toLocaleTimeString();
\}

// Executa quando a página termina de carregar
window.onload = function() {
    console.log("Página carregada com sucesso!");
\};$0