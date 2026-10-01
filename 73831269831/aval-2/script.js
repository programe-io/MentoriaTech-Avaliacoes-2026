// Seleciona os elementos da tela
const btnConverter = document.getElementById('btnConverter');
const inputDolar = document.getElementById('valorDolar');
const divResultado = document.getElementById('resultado');

// Define uma taxa de câmbio fixa (exemplo: 1 Dólar = 5.50 Reais)
const taxaCambio = 5.50;

// Adiciona o evento de clique no botão
btnConverter.addEventListener('click', () => {
    const valorDolar = parseFloat(inputDolar.value);

    // Valida se o usuário digitou um número válido
    if (isNaN(valorDolar) || valorDolar <= 0) {
        divResultado.textContent = "⚠️ Por favor, insira um valor válido!";
        divResultado.style.color = "#c0392b";
        return;
    }

    // Realiza o cálculo da conversão
    const valorReal = valorDolar * taxaCambio;

    // Formata os valores como moeda corrente
    const formatadoDolar = valorDolar.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const formatadoReal = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Exibe o resultado na tela
    divResultado.innerHTML = `${formatadoDolar} equivale a <br><span style="color: #27ae60; font-size: 1.4rem;">${formatadoReal}</span>`;
});
