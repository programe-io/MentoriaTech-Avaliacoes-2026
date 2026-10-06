:::writing{variant="document" id="26491" title="Empreendendo com a Isabela — JavaScript"}

// Mensagem de boas-vindas
window.addEventListener("load", function () {
    console.log("Bem-vindo ao Empreendendo com a Isabela!");
});

// Formulário de contato
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const mensagem = document.querySelector("#mensagem").value;

    if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    alert("Obrigada pela mensagem, " + nome + "! 💗");

    formulario.reset();
});

// Efeito nos artigos
const artigos = document.querySelectorAll("article");

artigos.forEach(function (artigo) {
    artigo.addEventListener("click", function () {
        artigo.style.transform = "scale(1.03)";
        
        setTimeout(function () {
            artigo.style.transform = "scale(1)";
        }, 200);
    });
});

// Mensagem ao clicar nas dicas
const dicas = document.querySelectorAll("#dicas li");

dicas.forEach(function (dica) {
    dica.addEventListener("click", function () {
        alert("Essa é uma ótima dica para quem quer empreender! 🚀");
    });
});
:::

