
document.getElementById("formulario")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value;

    const email =
        document.getElementById("email").value;

    const telefone =
        document.getElementById("telefone").value;

    const moto =
        document.getElementById("moto").value;

    const mensagem =
        document.getElementById("mensagem").value;

    // SUBSTITUA PELO NÚMERO DA LOJA
    const numero = "5500000000000";

    const texto =
        "Olá! Quero informações sobre motos.%0A" +
        "Nome: " + encodeURIComponent(nome) + "%0A" +
        "Email: " + encodeURIComponent(email) + "%0A" +
        "Telefone: " + encodeURIComponent(telefone) + "%0A" +
        "Moto: " + encodeURIComponent(moto) + "%0A" +
        "Mensagem: " + encodeURIComponent(mensagem);

    const link =
        "https://wa.me/" + numero + "?text=" + texto;

    window.open(link, "_blank");

});
