
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 || altura <= 0 || altura > 3) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // CÁLCULO DO IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let resolucao = "";

    // CLASSIFICAÇÃO E RESOLUÇÃO
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        resolucao = "Procure orientação profissional para avaliar sua alimentação e saúde.";
    }
    else if (imc < 25) {
        classificacao = "Peso normal";
        resolucao = "Seu IMC está dentro da faixa considerada adequada para adultos. Continue mantendo hábitos saudáveis!";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        resolucao = "É recomendado procurar orientação nutricional e manter uma rotina de atividades físicas.";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        resolucao = "Procure acompanhamento de um profissional de saúde para avaliar sua condição e receber orientações.";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        resolucao = "É importante buscar acompanhamento médico e nutricional para uma avaliação individualizada.";
    }
    else {
        classificacao = "Obesidade grau III";
        resolucao = "Procure acompanhamento médico para uma avaliação completa e orientação adequada.";
    }

    // EXIBIR RESULTADO
    const resultado = document.getElementById("resultado");

    const nomeSeguro = nome.replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);

    resultado.style.display = "block";

    resultado.innerHTML = `
        <h2>🍓 Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nomeSeguro}</p>
        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>
        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <h2>Seu IMC é: ${imc.toFixed(2)}</h2>

        <p class="classificacao">
            Classificação: ${classificacao}
        </p>

        <hr>

        <h3>🍓 Resolução do IMC</h3>

        <p>${resolucao}</p>

        <p><strong>Fórmula utilizada:</strong></p>
        <p>IMC = Peso ÷ (Altura × Altura)</p>

        <p>
            ${peso} ÷ (${altura} × ${altura})
            = ${imc.toFixed(2)}
        </p>
    `;

    criarMorangos();
});

// ANIMAÇÃO DOS MORANGOS
function criarMorangos() {

    for (let i = 0; i < 8; i++) {

        const morango = document.createElement("div");

        morango.innerHTML = "🍓";
        morango.style.position = "fixed";
        morango.style.left = Math.random() * 90 + "vw";
        morango.style.bottom = "-50px";
        morango.style.fontSize = "30px";
        morango.style.zIndex = "999";
        morango.style.pointerEvents = "none";

        document.body.appendChild(morango);

        morango.animate([
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: "translateY(-100vh) rotate(360deg)", opacity: 0 }
        ], {
            duration: 2500,
            easing: "ease-out"
        });

        setTimeout(() => morango.remove(), 2500);
    }
}
