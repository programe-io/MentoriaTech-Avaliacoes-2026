const formulario = document.getElementById("formAnamnese");
const botaoImprimir = document.getElementById("imprimir");

// Finalizar preenchimento
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    if (nome === "") {
        alert("Por favor, preencha o nome do paciente.");
        return;
    }

    alert("Ficha de anamnese preenchida com sucesso!");
});

// Imprimir ficha
botaoImprimir.addEventListener("click", function() {
    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    window.print();
});

// Limpar formulário
formulario.addEventListener("reset", function() {
    const confirmar = confirm(
        "Deseja realmente limpar todos os campos da ficha?"
    );

    if (!confirmar) {
        // Cancela o reset
        event.preventDefault();
    }
});