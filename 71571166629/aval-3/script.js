
const formulario = document.getElementById("anamneseForm");

const botaoImprimir = document.getElementById("imprimir");

botaoImprimir.addEventListener("click", function() {

    if (!formulario.reportValidity()) {
        return;
    }

    window.print();

});

formulario.addEventListener("reset", function() {

    alert("Formulário limpo!");

});
