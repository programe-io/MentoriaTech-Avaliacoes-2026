V```javascript
// SISTEMA DA ACADEMIA CROSS-FIT

// Selecionar um plano
const botoes = document.querySelectorAll(".escolher-plano");
const campoPlano = document.getElementById("plano");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        campoPlano.value = botao.dataset.plano;

        document.getElementById("contato").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Cadastro de alunos
const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const plano = campoPlano.value;

    if (nome === "" || email === "" ||
        telefone === "" || plano === "") {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    mensagem.textContent =
        "Parabéns, " + nome +
        "! Seu cadastro de demonstração foi realizado. " +
        "Plano escolhido: " + plano + ".";

    formulario.reset();
});

// Mensagem no console
console.log("Bem-vindo ao sistema CROSS-FIT!");
```