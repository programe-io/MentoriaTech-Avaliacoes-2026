
function calcularEconomia() {

    const ganho = Number(
        document.getElementById("ganho").value
    );

    const gasto = Number(
        document.getElementById("gasto").value
    );

    const resultado = document.getElementById("resultado");

    if (
        document.getElementById("ganho").value === "" ||
        document.getElementById("gasto").value === "" ||
        ganho < 0 ||
        gasto < 0
    ) {
        resultado.textContent =
            "Digite valores válidos!";
        return;
    }

    const economia = ganho - gasto;

    if (economia > 0) {
        resultado.textContent =
            "Parabéns! Você conseguiu economizar R$ " +
            economia.toFixed(2).replace(".", ",");
    }

    else if (economia === 0) {
        resultado.textContent =
            "Você gastou todo o dinheiro recebido.";
    }

    else {
        resultado.textContent =
            "Atenção! Seus gastos foram maiores que seus ganhos.";
    }
}
