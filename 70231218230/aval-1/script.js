// Botão "Explorar Jogos"

function explorarJogos() {

    document
        .getElementById("jogos")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Botões dos jogos

function jogar(nomeDoJogo) {

    alert(
        "🎮 Você escolheu: " +
        nomeDoJogo +
        "\n\nEm breve esse jogo estará disponível!"
    );

}


// Cadastro de e-mail

function inscrever() {

    const email =
        document.getElementById("email").value;

    const mensagem =
        document.getElementById("mensagem");


    if (email === "") {

        mensagem.textContent =
            "⚠️ Digite seu e-mail!";

        return;
    }


    if (!email.includes("@")) {

        mensagem.textContent =
            "⚠️ Digite um e-mail válido!";

        return;
    }


    mensagem.textContent =
        "💗 Cadastro realizado com sucesso!";


    document.getElementById("email").value = "";

}