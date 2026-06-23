document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;

        if (nome === "" || email === "") {
            alert("Por favor, preencha todos os campos!");
        } else {
            alert(`Obrigado, ${nome}! Seu formulário foi enviado com sucesso.`);
        }
    });
});