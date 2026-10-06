// MENU MOBILE

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
});


// FECHAR MENU AO CLICAR

const links = document.querySelectorAll("#menu a");

links.forEach(function (link) {

    link.addEventListener("click", function () {
        menu.classList.remove("active");
    });

});


// FORMULÁRIO

const formulario = document.getElementById("formulario");
const resposta = document.getElementById("resposta");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    resposta.textContent =
        `Obrigada, ${nome}! Sua mensagem foi enviada 💖`;

    formulario.reset();

});


// BOTÕES "SAIBA MAIS"

function mostrarMensagem() {

    alert(
        "✨ Em breve teremos mais conteúdos sobre empreendedorismo!"
    );

}


// ANO AUTOMÁTICO

const ano = document.getElementById("ano");

ano.textContent = new Date().getFullYear();
