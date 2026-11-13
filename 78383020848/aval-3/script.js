
function agendar() {
    let nome = prompt("Qual é o seu nome?");

    if (nome && nome.trim() !== "") {
        alert(
            "Olá, " + nome +
            "! 💗 Obrigada pelo interesse. " +
            "Entre em contato para confirmar seu agendamento!"
        );
    } else {
        alert("Por favor, informe seu nome! 💕");
    }
}
