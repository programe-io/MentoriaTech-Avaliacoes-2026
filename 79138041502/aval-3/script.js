// Menu mobile

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("ativo");
});


// Botão "Saiba mais"

function mostrarMensagem() {
    alert("Bem-vindo! Você pode personalizar este site como quiser.");
}


// Formulário

function enviarMensagem() {

    const nome = document.getElementById("nome").value;

    if (nome.trim() === "") {
        alert("Digite seu nome antes de enviar.");
        return;
    }

    alert("Mensagem enviada com sucesso, " + nome + "!");

}