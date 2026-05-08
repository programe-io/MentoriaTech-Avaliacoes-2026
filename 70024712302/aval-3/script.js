// Função para mostrar mensagem
function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

// Exemplo de mudança de texto
function mudarTexto() {
    document.getElementById("texto").innerHTML = "O texto foi alterado!";
}

// Exemplo de contador
let contador = 0;

function aumentarContador() {
    contador++;
    document.getElementById("contador").innerHTML = contador;
}