
function calcularIMC() {

    // Receber os dados do paciente

    const nome = document.getElementById("nome").value.trim();

    const peso = Number(document.getElementById("peso").value);

    const altura = Number(document.getElementById("altura").value);

    const resultado = document.getElementById("resultado");

    // Validar os campos

    if (
        nome === "" ||
        document.getElementById("peso").value === "" ||
        document.getElementById("altura").value === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;
    }

    // Calcular o IMC

    const imc = peso / (altura * altura);

    // Classificação do IMC

    let classificacao = "";

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

    } else if (imc < 25) {

        classificacao = "Peso normal";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";

    } else {

        classificacao = "Obesidade grau III";

    }

    // Exibir resultado

    resultado.style.display = "block";

    resultado.innerHTML = `

        <h3>Resultado do Paciente</h3>

        <p>
            <strong>Nome:</strong>
            ${escaparHTML(nome)}
        </p>

        <p>
            <strong>Peso:</strong>
            ${peso} kg
        </p>

        <p>
            <strong>Altura:</strong>
            ${altura} m
        </p>

        <p>
            <strong>IMC:</strong>
            ${imc.toFixed(2)}
        </p>

        <p>
            <strong>Classificação:</strong>
            ${classificacao}
        </p>

        <hr>

        <p>
            Resultado calculado com sucesso!
        </p>

        <p>
            Procure um profissional de saúde
            para uma avaliação completa.
        </p>

    `;

}

// Proteger a exibição do nome

function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, function (caractere) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[caractere];

    });

}

// Limpar os campos

function limparCampos() {

    document.getElementById("nome").value = "";

    document.getElementById("peso").value = "";

    document.getElementById("altura").value = "";

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    resultado.style.display = "none";

}
