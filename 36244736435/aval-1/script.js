// Espera o carregamento da página
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona elementos
    const botao = document.querySelector("button");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");

    // Criar mensagem dinâmica
    const mensagem = document.createElement("p");
    mensagem.style.marginTop = "15px";
    mensagem.style.fontWeight = "bold";

    document.querySelector("main").appendChild(mensagem);

    // Evento de clique no botão
    botao.addEventListener("click", function (event) {
        event.preventDefault(); // Evita recarregar a página

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();

        // Validação simples
        if (nome === "" || email === "") {
            mensagem.textContent = "⚠️ Preencha todos os campos!";
            mensagem.style.color = "red";
        } else if (!email.includes("@")) {
            mensagem.textContent = "⚠️ Email inválido!";
            mensagem.style.color = "orange";
        } else {
            mensagem.textContent = `✅ Obrigado, ${nome}! Formulário enviado com sucesso.`;
            mensagem.style.color = "green";

            // Limpar campos
            nomeInput.value = "";
            emailInput.value = "";
        }
    });

    // Interação extra: mudar cor do header ao clicar
    const header = document.querySelector("header");

    header.addEventListener("click", function () {
        header.style.backgroundColor =
            header.style.backgroundColor === "blue" ? "#333" : "blue";
    });

    // Interação extra: mostrar alerta ao clicar na imagem
    const imagem = document.querySelector("img");

    if (imagem) {
        imagem.addEventListener("click", function () {
            alert("Você clicou na imagem!");
        });
    }

});