/**
 * ==========================================================================
 * PROJETO: Conversor de Moedas Real-time
 * OBJETIVO: Capturar entrada do usuário, processar o câmbio e atualizar o DOM
 * ==========================================================================
 */

// 1. Mapeamento dos elementos do HTML através do DOM
const inputReais = document.getElementById('valor-brl');
const displayResultado = document.getElementById('resultado-usd');
const displayTaxa = document.getElementById('taxa-atual');

// 2. Extração dinâmica da taxa definida no próprio HTML (Facilita a manutenção)
// Convertemos o texto "5.10" em um número decimal flutuante (float)
const TAXA_CAMBIO = parseFloat(displayTaxa.innerText);

/**
 * Função responsável por processar o cálculo e atualizar a interface
 */
const calcularConversao = () => {
    // Captura o valor atual do input e limpa espaços vazios
    const valorTexto = inputReais.value.trim();
    const valorEmReais = parseFloat(valorTexto);

    // Validação: Verifica se o campo está vazio ou se não é um número válido
    if (!valorTexto || isNaN(valorEmReais)) {
        displayResultado.innerText = 'U$ 0,00';
        return;
    }

    // Validação de Segurança: Impede cálculos com valores negativos
    if (valorEmReais < 0) {
        displayResultado.innerText = 'Valor inválido';
        return;
    }

    // Regra de Negócio: Calcula a conversão de BRL para USD
    const valorEmDolar = valorEmReais / TAXA_CAMBIO;

    // Atualização do DOM: Formata o número final no padrão de moeda americano (USD)
    displayResultado.innerText = valorEmDolar.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
};

// 3. Monitoramento de Eventos (Event Listeners)
// O evento 'input' é disparado instantaneamente a cada tecla digitada ou apagada
inputReais.addEventListener('input', calcularConversao);