// Função para enviar mensagem
function enviarMensagem() {

    // Pegar o nome digitado
    const nome = document.getElementById("nome").value;

    // Pegar o local do resultado
    const resultado = document.getElementById("resultado");

    // Verificar se o campo está vazio
    if (nome.trim() === "") {

        resultado.textContent = "Por favor, digite seu nome!";

    \} else {

        resultado.textContent = "Olá, " + nome + "! Seja bem-vindo ao meu site! 💙";

    \}
\}

// Mensagem no console
console.log("Meu site foi carregado com sucesso!");

// Efeito de boas-vindas
window.addEventListener("load", function() {

    console.log("Bem-vindo ao Meu Mundo Digital!");

\});$0