
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (!nome || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {
        alert("Por favor, informe dados válidos!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let mensagem = "";

    // Classificação do IMC para adultos
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        mensagem = "Seu peso está abaixo do recomendado.";
    } 
    else if (imc < 25) {
        classificacao = "Peso normal";
        mensagem = "Seu peso está dentro da faixa considerada adequada.";
    } 
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        mensagem = "Seu peso está acima da faixa considerada adequada.";
    } 
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        mensagem = "Procure orientação de um profissional de saúde.";
    } 
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        mensagem = "É importante buscar acompanhamento profissional.";
    } 
    else {
        classificacao = "Obesidade grau III";
        mensagem = "Recomenda-se acompanhamento de um profissional de saúde.";
    }

    // Exibir o resultado
    resultado.style.display = "block";

    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        })[c])}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p class="classificacao">${classificacao}</p>

        <p>${mensagem}</p>
    `;

});
