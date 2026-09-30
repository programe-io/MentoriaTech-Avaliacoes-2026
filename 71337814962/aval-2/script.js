function mostrarMensagem() {

    alert(
        "🖤 Bem-vindo ao mundo de Descendentes!"
    );

    document
        .getElementById("personagens")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function escolher(personagem) {

    alert(
        "✨ Você escolheu " +
        personagem +
        "!"
    );
}
