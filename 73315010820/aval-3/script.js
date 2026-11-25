
function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value;
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (nome.trim() === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        document.getElementById("resultado").innerHTML =
            "Preencha todos os campos corretamente!";

        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o IMC (adultos)
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } 
    else if (imc < 25) {
        classificacao = "Peso normal";
    } 
    else if (imc < 30) {
        classificacao = "Sobrepeso";
    } 
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
    } 
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
    } 
    else {
        classificacao = "Obesidade grau III";
    }

    // Exibir o resultado
    document.getElementById("resultado").innerHTML = `
        <h3>Resultado do Paciente</h3>
        Nome: ${nome}<br>
        Peso: ${peso} kg<br>
        Altura: ${altura} m<br>
        IMC: ${imc.toFixed(2)}<br>
        Classificação: ${classificacao}
    `;
}
