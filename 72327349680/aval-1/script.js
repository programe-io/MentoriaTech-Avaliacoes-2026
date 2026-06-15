const btnCalcular = document.getElementById("btnCalcular");

btnCalcular.addEventListener("click", () => {
    const largura = parseFloat(document.getElementById("largura").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const resultado = document.getElementById("resultado");

    if (isNaN(largura) || isNaN(altura)) {
        resultado.textContent = "Informe os dois valores.";
        return;
    }

    const area = largura * altura;

    resultado.textContent = `Área = ${area}`;
});