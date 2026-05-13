// 1. Definição da taxa de câmbio (exemplo)
const taxaDolar = 5.50;

// 2. Função para realizar a conversão
function converter() {
    // Captura o elemento de entrada (input) pelo ID
    const campoValorDolar = document.getElementById('valorDolar');
    
    // Captura o elemento onde o resultado será exibido
    const displayResultado = document.getElementById('resultado');

    // Converte o valor digitado (string) para um número decimal
    const valorDolar = parseFloat(campoValorDolar.value);

    // Validação: verifica se o usuário digitou um número válido
    if (isNaN(valorDolar) || valorDolar <= 0) {
        displayResultado.textContent = "Por favor, digite um valor válido.";
        displayResultado.style.color = "red";
        return;
    }

    // Realiza o cálculo
    const valorReal = valorDolar * taxaDolar;

    // Exibe o resultado formatado como moeda brasileira (BRL)
    displayResultado.textContent = `Resultado: R$ ${valorReal.toFixed(2)}`;
    displayResultado.style.color = "green";
}

// 3. (Opcional) Log no console para depuração
console.log("Sistema de conversão carregado com sucesso!");