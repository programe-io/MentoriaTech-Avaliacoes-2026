
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const servico = document.getElementById("servico").value;

    alert(
        "Olá, " + nome + "!\n\n" +
        "Seu pedido de agendamento foi recebido!\n" +
        "Telefone: " + telefone + "\n" +
        "Serviço: " + servico
    );

    formulario.reset();
});
