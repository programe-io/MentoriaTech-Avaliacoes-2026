
function toggleMenu() {
    const menu = document.getElementById("navLinks");
    menu.classList.toggle("active");
}

// Fecha o menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("active");
    });
});

// Calculadora de IMC
function calcularIMC() {
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const resultado = document.getElementById("resultado");

    if (!peso || !altura || peso <= 0 || altura <= 0) {
        resultado.innerHTML = "⚠️ Informe valores válidos!";
        return;
    }

    if (peso > 500 || altura > 3) {
        resultado.innerHTML = "⚠️ Confira os valores informados.";
        return;
    }

    const imc = peso / (altura * altura);

    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Faixa de peso considerada adequada";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
    } else {
        classificacao = "Obesidade grau III";
    }

    resultado.innerHTML = `
        <strong>Seu IMC: ${imc.toFixed(1)}</strong><br>
        Classificação: ${classificacao}
        <br><small>O IMC é apenas um indicador inicial e não substitui uma avaliação nutricional.</small>
    `;
}
