function calcularCaixas() {

    let quantCaixaExtra = 0;
    let quantCaixaGrande = 0;
    let quantCaixaMedia = 0;
    let quantCaixaPequena = 0;

    let quantProdutos = Number(
        document.getElementById('quantProdutos').value
    );

    /* Validação */
    if (quantProdutos <= 0 || isNaN(quantProdutos)) {

        document.getElementById('resultado').innerHTML =
            `
            <h3>Resultado</h3>
            <p>Digite uma quantidade válida!</p>
            `;

        return;
    }

    /* Processamento */
    while (quantProdutos > 0) {

        if (quantProdutos >= 50) {
            quantCaixaExtra++;
            quantProdutos -= 50;
        }

        else if (quantProdutos >= 20) {
            quantCaixaGrande++;
            quantProdutos -= 20;
        }

        else if (quantProdutos >= 5) {
            quantCaixaMedia++;
            quantProdutos -= 5;
        }

        else {
            quantCaixaPequena++;
            quantProdutos -= 1;
        }
    }

    /* Resultado */
    document.getElementById('resultado').innerHTML =
        `
        <h3>Resultado</h3>

        <p>${quantCaixaExtra} caixas extra-grande</p>

        <p>${quantCaixaGrande} caixas grande</p>

        <p>${quantCaixaMedia} caixas média</p>

        <p>${quantCaixaPequena} caixas pequena</p>
        `;
}