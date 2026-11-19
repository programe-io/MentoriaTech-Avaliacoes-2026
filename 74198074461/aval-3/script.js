
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

// Evento para calcular o IMC
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar informações
    if (nome.length < 2) {
        alert("Digite um nome válido!");
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Digite um peso válido!");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Digite uma altura válida!");
        return;
    }

    // Calcular IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao;
    let classe;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        classe = "baixo";
    }
    else if (imc < 25) {
        classificacao = "Peso normal";
        classe = "normal";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        classe = "sobrepeso";
    }
    else {
        classificacao = "Obesidade";
        classe = "obesidade";
    }

    // Exibir resultado
    resultado.innerHTML = `
        <h2>Resultado da Avaliação</h2>

        <div class="dados">
            <strong>Paciente:</strong> ${escaparHTML(nome)} <br>
            <strong>Peso:</strong> ${peso} kg <br>
            <strong>Altura:</strong> ${altura} m
        </div>

        <div class="imc">
            <h3>Seu IMC é</h3>
            <p>${imc.toFixed(2)}</p>
        </div>

        <div class="classificacao ${classe}">
            Classificação: ${classificacao}
        </div>

        <p>
            O resultado representa uma avaliação baseada
            no Índice de Massa Corporal (IMC).
        </p>
    `;

});

// Evitar interpretar o nome digitado como HTML
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, function(caractere) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[caractere];
    });
}

// Limpar resultado ao limpar o formulário
formulario.addEventListener("reset", function() {

    resultado.innerHTML = `
        <h2>Resultado da Avaliação</h2>
        <p class="mensagem">
            Preencha os dados do paciente para calcular o IMC.
        </p>
    `;

});
