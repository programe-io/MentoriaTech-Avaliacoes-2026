const form = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    if (peso <= 0 || altura <= 0) {
        resultado.innerHTML = "Informe valores válidos.";
        return;
    }

    const imc = peso / (altura * altura);

    resultado.innerHTML = `
        <h3>Resultado</h3>
        <p>Paciente: ${nome}</p>
        <p>IMC calculado: ${imc.toFixed(2)}</p>
        <p>O IMC é um indicador geral e deve ser 
        interpretado considerando idade e outros fatores.</p>
    `;
});