const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const alturaCM = Number(document.getElementById("altura").value);

    // Validar informações
    if (!nome || peso <= 0 || alturaCM <= 0 ||
        !Number.isFinite(peso) ||
        !Number.isFinite(alturaCM)) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Converter altura de centímetros para metros
    const altura = alturaCM / 100;

    // Calcular IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let informacao = "";

    // Identificar a classificação do IMC
    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        informacao = "IMC abaixo da faixa de referência.";

    } else if (imc < 25) {

        classificacao = "Peso adequado";
        informacao = "IMC dentro da faixa de referência.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        informacao = "IMC acima da faixa de referência.";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";
        informacao = "Recomenda-se avaliação profissional.";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";
        informacao = "Procure acompanhamento profissional.";

    } else {

        classificacao = "Obesidade grau III";
        informacao = "É importante buscar acompanhamento profissional.";

    }

    // Exibir resultado
    document.getElementById("resultado").innerHTML = `

        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        })[c])}</p>

        <p><strong>Peso:</strong> ${peso} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p class="classificacao">
            ${classificacao}
        </p>

        <div class="informacao">
            ${informacao}
        </div>

    `;

});