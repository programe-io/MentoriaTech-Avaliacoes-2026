// =====================================
// BOTÃO "COMEÇAR"
// =====================================

const botaoMensagem =
    document.getElementById("botaoMensagem");

const mensagem =
    document.getElementById("mensagem");


botaoMensagem.addEventListener("click", function () {

    mensagem.textContent =
        "💰 Organizar o dinheiro é um passo importante para alcançar seus objetivos!";

});


// =====================================
// CALCULADORA FINANCEIRA
// =====================================

const botaoCalcular =
    document.getElementById("botaoCalcular");

const resultado =
    document.getElementById("resultado");


botaoCalcular.addEventListener("click", function () {

    const renda =
        Number(
            document.getElementById("renda").value
        );

    const gastos =
        Number(
            document.getElementById("gastos").value
        );


    // Verifica se os valores foram preenchidos

    if (renda <= 0 || gastos < 0) {

        resultado.textContent =
            "Digite valores válidos.";

        return;
    }


    // Calcula o dinheiro restante

    const saldo =
        renda - gastos;


    // Mostra o resultado

    if (saldo > 0) {

        resultado.textContent =
            "💰 Você terá R$ " +
            saldo.toFixed(2).replace(".", ",") +
            " disponíveis após os gastos.";

    } else if (saldo === 0) {

        resultado.textContent =
            "⚠️ Sua renda foi totalmente utilizada pelos gastos.";

    } else {

        resultado.textContent =
            "⚠️ Seus gastos ultrapassaram sua renda em R$ " +
            Math.abs(saldo)
                .toFixed(2)
                .replace(".", ",") +
            ".";

    }

});