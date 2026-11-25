3. JavaScript — script.js

javascript

function toggleMenu() {
    document.getElementById("menu")
        .classList.toggle("active");
}

function calcularIMC() {

    const peso = Number(
        document.getElementById("peso").value
    );

    const altura = Number(
        document.getElementById("altura").value
    );

    const resultado =
        document.getElementById("resultado");

    if (
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0 ||
        altura > 3
    ) {
        resultado.innerHTML =
            "Por favor, informe valores válidos.";
        return;
    }

    const imc = peso / (altura * altura);

    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo da faixa de referência";
    } else if (imc < 25) {
        classificacao = "Faixa de referência";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else {
        classificacao = "Obesidade";
    }

    resultado.innerHTML = `
        Seu IMC é: ${imc.toFixed(2)}<br>
        Classificação: ${classificacao}
    `;
}

// Fechar menu ao clicar nos links
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu")
            .classList.remove("active");
    });
});

console.log("NutriLife carregado com sucesso!");
4. Resultado esperado
Healthy Food Landing Page UI — Restaurant Landing Page Design by Desizen Studio on Dribbble
 
Página inicial

Apresentação do projeto.
Meal prep pour sportifs : 60 minutes pour 3 jours (système premium)
 
Cardápio

Sugestões de refeições.
BMI Calculator by Dao Huynh on Dribbble
 
Calculadora

Cálculo automático do IMC.
Healthy eating and exercising concept.
 
Dicas

Informações sobre alimentação.
Observação: os cardápios são exemplos educativos, não prescrições nutricionais. O IMC também não determina sozinho o estado de saúde de uma pessoa.