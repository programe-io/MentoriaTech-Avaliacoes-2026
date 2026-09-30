function explorar() {

    alert("🌊 Bem-vindo ao mundo da Ariel!");

    document
        .getElementById("sobre")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function escolher(personagem) {

    alert(
        "🧜‍♀️ Você escolheu " +
        personagem +
        "!"
    );
}


function comecar() {

    let nome = prompt(
        "🌊 Qual é o seu nome?"
    );

    if (nome === null || nome.trim() === "") {

        alert(
            "Digite seu nome para começar!"
        );

        return;
    }

    alert(
        "✨ Olá, " +
        nome +
        "! Sua aventura no fundo do mar começou!"
    );
}
