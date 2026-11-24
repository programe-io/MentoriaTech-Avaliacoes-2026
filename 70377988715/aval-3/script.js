
const formulario = document.getElementById("imcForm");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    const resultado = document.getElementById("resultado");

    if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultado.innerHTML = "Preencha todos os campos corretamente!";
        return;
    }

    const imc = peso / (altura * altura);

    resultado.innerHTML = `
        <h2>Resultado do cálculo</h2>
        <p>Nome: ${nome}</p>
        <p>IMC: ${imc.toFixed(2)}</p>
    `;
});
