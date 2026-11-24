
function calcularIMC() {

    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    // Validar informações
    if (nome === "" || peso <= 0 || altura <= 0 ||
        document.getElementById("peso").value === "" ||
        document.getElementById("altura").value === "") {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular IMC
    let imc = peso / (altura * altura);

    // Exibir resultado
    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>IMC calculado:</strong> ${imc.toFixed(2)}</p>
        <p>O resultado é um indicador numérico e deve ser interpretado
        considerando a idade e outros fatores de saúde.</p>
    `;
}
