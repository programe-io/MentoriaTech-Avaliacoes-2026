// Botão "Saiba mais"

const botaoSaibaMais = document.getElementById("botaoSaibaMais");

botaoSaibaMais.addEventListener("click", function () {

    document.getElementById("sobre").scrollIntoView({
        behavior: "smooth"
    });

});


// Botões dos posts

const botoesPosts = document.querySelectorAll(".btnPost");

botoesPosts.forEach(function (botao) {

    botao.addEventListener("click", function () {

        alert("Em breve este post estará disponível!");

    });

});


// Formulário de contato

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagemForm = document.getElementById("mensagemForm");

    mensagemForm.textContent =
        "Obrigado, " + nome + "! Sua mensagem foi enviada com sucesso.";

    mensagemForm.style.color = "#16a34a";

    formulario.reset();

});
