const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Verificar os valores informados
    if (peso <= 0 || altura <= 0) {
        alert("Informe valores válidos para peso e altura!");
        return;
    \}

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    \} else if (imc < 25) {
        classificacao = "Peso normal";
    \} else if (imc < 30) {
        classificacao = "Sobrepeso";
    \} else if (imc < 35) {
        classificacao = "Obesidade grau I";
    \} else if (imc < 40) {
        classificacao = "Obesidade grau II";
    \} else {
        classificacao = "Obesidade grau III";
    \}

    // Exibir o resultado
    document.getElementById("resultado").innerHTML = `
        <h3>Resultado do Paciente</h3>
        <p>Nome: \${nome.replace(/[&<>"']/g, "")\}</p>
        <p>Peso: \${peso.toFixed(1)\} kg</p>
        <p>Altura: \${altura.toFixed(2)\} m</p>
        <p>Seu IMC é: \${imc.toFixed(2)\}</p>
        <p>Classificação: \${classificacao\}</p>
    `;
\});$0