// Exibe uma mensagem no console
console.log("JavaScript funcionando!");

// Função para mostrar alerta
function mostrarMensagem() {
    alert("Você clicou no botão!");
}

// Alterar texto de um elemento
function mudarTexto() {
    document.getElementById("texto").innerHTML =
        "O texto foi alterado com JavaScript!";
}

// Exemplo de contador
let contador = 0;

function aumentarContador() {
    contador++;
    document.getElementById("contador").innerHTML =
        "Contador: " + contador;
}