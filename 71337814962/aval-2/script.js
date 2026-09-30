function entrarNoReino() {

    alert(
        "✨ Portal aberto! Bem-vindo ao mundo dos Descendentes."
    );

    document
        .getElementById("personagens")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function selecionar(personagem) {

    const mensagens = {

        Mal:
            "💜 Você escolheu Mal! A filha de Malévola está pronta para a aventura.",

        Evie:
            "💙 Você escolheu Evie! Inteligência e estilo fazem parte dessa aventura.",

        Jay:
            "❤️ Você escolheu Jay! Prepare-se para uma grande aventura.",

        Carlos:
            "💚 Você escolheu Carlos! Tecnologia e coragem serão seus aliados."
    };

    alert(mensagens[personagem]);
}


function iniciarAventura() {

    const nome = prompt(
        "✨ Qual é o seu nome?"
    );

    if (nome === null || nome.trim() === "") {

        alert(
            "Você precisa escolher um nome para começar!"
        );

        return;
    }

    alert(
        `Bem-vindo, ${nome}! 🌙\nSua aventura no reino começa agora!`
    );
}
