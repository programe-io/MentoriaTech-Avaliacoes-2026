// =========================
// ALTERAR TEMA
// =========================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }

});


// =========================
// FORMULÁRIO
// =========================

const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    resultado.textContent =
        `Obrigado, ${nome}! Sua mensagem foi recebida.`;

    formulario.reset();

});
