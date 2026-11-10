
// CALCULADORA DE LUCRO RURAL

function calcularLucro() {

    // Receber valores dos campos
    const producao = Number(
        document.getElementById("producao").value
    );

    const preco = Number(
        document.getElementById("preco").value
    );

    const custos = Number(
        document.getElementById("custos").value
    );

    const resultado = document.getElementById("resultado");

    // Validar informações
    if (
        producao <= 0 ||
        preco <= 0 ||
        custos < 0 ||
        !Number.isFinite(producao + preco + custos)
    ) {
        resultado.innerHTML =
            "⚠️ Preencha os campos corretamente!";
        return;
    }

    // Realizar cálculos
    const receita = producao * preco;
    const lucro = receita - custos;

    // Mostrar resultado
    resultado.innerHTML = `
        <p>💰 Receita: R$ ${receita.toFixed(2)}</p>
        <p>💵 Custos: R$ ${custos.toFixed(2)}</p>
        <p>🌱 Lucro: R$ ${lucro.toFixed(2)}</p>
    `;

    // Mostrar situação financeira
    if (lucro > 0) {
        resultado.innerHTML +=
            "<p>✅ Seu negócio teve lucro!</p>";
    } 
    else if (lucro === 0) {
        resultado.innerHTML +=
            "<p>⚖️ Seu negócio ficou no ponto de equilíbrio.</p>";
    } 
    else {
        resultado.innerHTML +=
            "<p>⚠️ Seu negócio teve prejuízo.</p>";
    }
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao AgroFácil!");
});
