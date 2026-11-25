
function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value;

    let peso = parseFloat(document.getElementById("peso").value);

    let altura = parseFloat(document.getElementById("altura").value);

    let erro = document.getElementById("erro");
    let resultado = document.getElementById("resultado");
    let mensagem = document.getElementById("mensagem");

    // Limpar mensagens anteriores
    erro.innerHTML = "";
    resultado.style.display = "none";

    // Verificar se os campos foram preenchidos
    if (nome === "" || isNaN(peso) || isNaN(altura)) {
        erro.innerHTML = "Preencha todos os campos!";
        return;
    }

    // Verificar valores válidos
    if (peso <= 0 || altura <= 0) {
        erro.innerHTML = "Digite valores válidos para peso e altura!";
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o IMC (referência para adultos)
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
    mensagem.innerHTML = `
        <strong>Paciente:</strong> ${nome}<br>
        <strong>Peso:</strong> ${peso} kg<br>
        <strong>Altura:</strong> ${altura} m<br>
        <strong>IMC:</strong> ${imc.toFixed(2)}<br>
        <strong>Classificação:</strong> ${classificacao}
    `;

    resultado.style.display = "block";
}
