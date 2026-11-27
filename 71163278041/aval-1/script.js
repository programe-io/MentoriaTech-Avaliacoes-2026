// Mensagem de boas-vindas
alert("Bem-vindo ao meu site!");

// Função para o botão
function mostrarMensagem() {
    alert("Olá! Obrigado por visitar meu site!");
\}

// Mudar a cor do título
function mudarCor() {
    const titulo = document.querySelector("h1");

    titulo.style.color = "#ff00ff";
\}

// Mostrar a data atual
function mostrarData() {
    const data = new Date();

    alert("Hoje é: " + data.toLocaleDateString("pt-BR"));
\}$0