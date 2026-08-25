// BOTÃO DE TEMA

const modoBtn = document.getElementById("modoBtn");

modoBtn.addEventListener("click", function () {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        modoBtn.textContent = "☀️";
    } else {
        modoBtn.textContent = "🌙";
    }

});


// BOTÃO LER MAIS

const lerBtn = document.getElementById("lerBtn");

lerBtn.addEventListener("click", function () {

    alert(
        "Bem-vindo ao TechNews! Aqui você encontra conteúdos sobre tecnologia."
    );

});


// FORMULÁRIO

const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    mensagem.textContent =
        `Obrigado pela inscrição, ${nome}!`;

    formulario.reset();

});
