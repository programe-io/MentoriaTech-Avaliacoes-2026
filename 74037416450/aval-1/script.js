// Isto é um comentário em JavaScript. O navegador não executa esta linha.

// Esta função será executada quando o usuário clicar no botão
function exibirMensagem() {
    // Captura o nome digitado pelo usuário (vamos criar esse campo no HTML)
    let nomeUsuario = document.getElementById("campoNome").value;

    // Se o usuário não digitar nada, exibe um aviso
    if (nomeUsuario === "") {
        alert("Por favor, digite o seu nome!");
    } else {
        // Altera o texto na página com uma mensagem personalizada
        document.getElementById("mensagemBoasVindas").innerText = "Seja muito bem-vindo, " + nomeUsuario + "! 👋";
    }
}