
// Função para expandir e recolher os artigos
function lerMais(botao) {

    const artigo = botao.closest(".post");
    const textoExtra = artigo.querySelector(".texto-extra");

    if (textoExtra.hidden) {

        textoExtra.hidden = false;
        botao.textContent = "Ler menos";

    } else {

        textoExtra.hidden = true;
        botao.textContent = "Ler mais";

    }

}

// Capturar envio do formulário
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent =
        "Obrigado! O e-mail " + email +
        " foi registrado nesta demonstração.";

    mensagem.style.color = "green";

    formulario.reset();

});

// Mensagem no console
console.log("Meu Blog foi carregado com sucesso!");
