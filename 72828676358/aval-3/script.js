
function calcularIMC() {

    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    if (nome === "" || isNaN(peso) || isNaN(altura) ||
        peso <= 0 || altura <= 0) {

        resultado.innerHTML = "Preencha todos os campos corretamente!";
        return;
    }

    let imc = peso / (altura * altura);

    resultado.innerHTML = `
        <h3>Resultado do Paciente</h3>
        <p>Nome: ${nome}</p>
        <p>IMC calculado: ${imc.toFixed(2)}</p>
        <p>O cálculo foi realizado com sucesso!</p>
        <small>A interpretação do IMC depende da idade e de outros fatores.
        Para adolescentes, é necessário considerar a idade e o sexo
        nas curvas de crescimento.</small>
    `;
}
