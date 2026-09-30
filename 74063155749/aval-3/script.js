// Botão "Chamar a Patrulha"
function mostrarMensagem() {

    alert(
        "🐾 Patrulha Canina a caminho!\n\n" +
        "Nenhum trabalho é grande demais e nenhum filhote é pequeno demais!"
    );
}


// Lista de curiosidades
function mostrarCuriosidade() {

    const curiosidades = [

        "🐶 Chase é um dos principais membros da Patrulha Canina.",

        "🚒 Marshall trabalha como bombeiro e também ajuda em emergências médicas.",

        "🚁 Skye utiliza um helicóptero para realizar suas missões.",

        "♻️ Rocky é especialista em reciclagem e reutilização de materiais.",

        "🚜 Rubble trabalha com construção e possui máquinas especiais.",

        "🌊 Zuma é o especialista da equipe em missões na água.",

        "👦 Ryder é o líder e responsável por coordenar as missões.",

        "🏠 A equipe costuma receber missões para ajudar os moradores da Baía da Aventura."

    ];

    const numero =
        Math.floor(Math.random() * curiosidades.length);

    document.getElementById("textoCuriosidade").textContent =
        curiosidades[numero];
}