
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    const resultado = document.getElementById("resultado");

    // Validar informações
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        resultado.style.display = "block";
        resultado.className = "resultado erro";
        resultado.innerHTML = "Preencha todos os campos corretamente.";
        return;
    }

    // Calcular IMC
    const imc = peso / (altura * altura);

    let classificacao;

    // Classificação do IMC para adultos
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } 
    else if (imc < 25) {
        classificacao = "Peso adequado";
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

    // Exibir resultado
    resultado.style.display = "block";
    resultado.className = "resultado";

    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <strong>Nome:</strong> ${nome}<br>
        <strong>Peso:</strong> ${peso} kg<br>
        <strong>Altura:</strong> ${altura} m<br>
        <strong>IMC:</strong> ${imc.toFixed(2)}<br>
        <strong>Classificação:</strong> ${classificacao}
    `;

});
