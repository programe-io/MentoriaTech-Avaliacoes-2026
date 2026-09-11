document.addEventListener("DOMContentLoaded", function () {

    // Botão da seção inicial
    const botao = document.getElementById("botao");

    botao.addEventListener("click", function () {
        alert("Bem-vindo ao meu site! 🚀");
    });


    // Formulário de contato
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const mensagem = document.getElementById("mensagem").value;

        if (nome === "" || email === "" || mensagem === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        alert(
            "Mensagem enviada com sucesso! 🎉\n\n" +
            "Nome: " + nome + "\n" +
            "E-mail: " + email
        );

        formulario.reset();
    });


    // Efeito nos cards
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {

        card.addEventListener("click", function () {
            const titulo = card.querySelector("h3").textContent;

            alert("Você selecionou: " + titulo);
        });

    });

});
