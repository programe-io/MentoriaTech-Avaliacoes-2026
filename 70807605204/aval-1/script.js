// Mensagem no console
console.log("JavaScript iniciado!");

// Função para mostrar alerta
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Alterar texto de um elemento
function alterarTexto() {
    const titulo = document.getElementById("titulo");
    titulo.innerHTML = "Texto alterado com sucesso!";
}

// Mudar cor de fundo
function mudarCor() {
    document.body.style.backgroundColor = "#dff9fb";
}

// Exemplo de contador
let contador = 0;

function aumentarContador() {
    contador++;
    document.getElementById("contador").innerHTML = contador;
}

// Executa quando a página carregar
window.onload = function () {
    console.log("Página carregada com sucesso!");
};