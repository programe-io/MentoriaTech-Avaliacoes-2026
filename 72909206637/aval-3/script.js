
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar informações
    if (nome === "" || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        resultado.innerHTML = "<h2>Erro!</h2><p>Informe dados válidos.</p>";
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificação para adultos
    let classificacao;
    let mensagem;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        mensagem = "O resultado está abaixo da faixa de referência para adultos.";
    } else if (imc < 25) {
        classificacao = "Peso adequado";
        mensagem = "O resultado está dentro da faixa de referência para adultos.";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        mensagem = "O resultado está acima da faixa de referência para adultos.";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        mensagem = "O resultado indica obesidade grau I na classificação adulta.";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        mensagem = "O resultado indica obesidade grau II na classificação adulta.";
    } else {
        classificacao = "Obesidade grau III";
        mensagem = "O resultado indica obesidade grau III na classificação adulta.";
    }

    // Exibir resultado
    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, "")}</p>

        <p><strong>Peso:</strong> ${peso} kg</p>

        <p><strong>Altura:</strong> ${altura} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p class="classificacao">${classificacao}</p>

        <p>${mensagem}</p>

        <small>
        Classificação de referência para adultos.
        O IMC não é um diagnóstico médico.
        </small>
    `;
});
