// Mostra uma mensagem ao carregar a página
window.onload = function() {
    console.log("Página carregada com sucesso!");
};

// Função que muda o texto de um elemento
function mudarTexto() {
    const texto = document.getElementById("mensagem");
    texto.innerHTML = "O texto foi alterado!";
}

// Função que muda a cor de fundo
function mudarCor() {
    document.body.style.backgroundColor = "#dff6ff";
}

// Função que mostra a hora atual
function mostrarHora() {
    const agora = new Date();
    alert("Hora atual: " + agora.toLocaleTimeString());
}