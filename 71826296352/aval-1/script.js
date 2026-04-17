// Mostra uma mensagem ao carregar a página
window.onload = function() {
    console.log("Página carregada com sucesso!");
};

// Função para mostrar alerta
function mostrarMensagem() {
    alert("Você clicou no botão!");
}

// Função para mudar texto de um elemento
function mudarTexto() {
    const titulo = document.getElementById("titulo");
    titulo.innerText = "Texto alterado com JavaScript!";
}

// Função para trocar cor de fundo
function mudarCor() {
    document.body.style.backgroundColor = "#dfe6e9";
}

// Função simples de contador
let contador = 0;

function incrementar() {
    contador++;
    document.getElementById("contador").innerText = contador;
}