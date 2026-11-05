vv// Mostrar mensagem ao clicar no botão
function mostrarMensagem() {
    alert("Olá! Bem-vindo ao meu site!");
}

// Alterar o título da página
function mudarTitulo() {
    document.getElementById("titulo").innerHTML = "Título alterado com sucesso!";
}

// Mostrar a data atual
function mostrarData() {
    alert("Hoje é: " + new Date().toLocaleDateString("pt-BR"));
}