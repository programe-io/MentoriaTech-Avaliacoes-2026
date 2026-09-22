// =========================
// MODO ESCURO
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
// BOTÕES "LER MAIS"
// =========================

const botoesLerMais = document.querySelectorAll(".lerMais");

botoesLerMais.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const titulo = botao.getAttribute("data-titulo");

        alert(
            "Você selecionou o post: " +
            titulo +
            "\n\nEm breve, este post terá o conteúdo completo!"
        );

    });

});


// =========================
// FORMULÁRIO
// =========================

const formulario = document.getElementById("formulario");
const resposta = document.getElementById("resposta");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    resposta.textContent =
        "Obrigada pela mensagem, " +
        nome +
        "! 💜