
const formulario = document.getElementById("ficha");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    alert("Ficha médica preenchida com sucesso! Agora você pode imprimir.");

});

document.getElementById("dataConsulta").value =
    new Date().toISOString().split("T")[0];
