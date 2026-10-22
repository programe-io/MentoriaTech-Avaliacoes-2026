
function mostrarMensagem() {
    alert("Bem-vindo ao meu site!");
}

const botao = document.querySelector("button");

botao.addEventListener("click", function() {
    mostrarMensagem();
});
