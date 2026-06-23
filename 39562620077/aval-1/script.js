// Aula 1.10 & 1.11: Introdução a Funções e Funções com parâmetros
function executarAnalise() {
    // Aula 1.02 & 1.03: Variáveis, Tipos de Dados e Entrada de Dados
    const inputElement = document.getElementById("inputNumero");
    const valorInserido = parseInt(inputElement.value);
    const resultadoDiv = document.getElementById("resultado");

    // Aula 1.04: Operadores Relacionais (Validação)
    if (isNaN(valorInserido) || valorInserido <= 0) {
        resultadoDiv.innerHTML = "Por favor, insira um número inteiro maior que zero.";
        return;
    }

    let textoResultado = "";

    // Aula 1.05: Estrutura de Seleção IF e ELSE / Operadores Lógicos (Fechando o seu bloco inicial)
    if (valorInserido % 2 === 0 && valorInserido > 10) {
        textoResultado += `• O número ${valorInserido} é PAR e maior que 10.\n`;
    } else if (valorInserido % 2 === 0) {
        textoResultado += `• O número ${valorInserido} é PAR.\n`;
    } else {
        textoResultado += `• O número ${valorInserido} é ÍMPAR.\n`;
    }

    // Aula 1.06: Estrutura Condicional Encadeada e Switch
    switch(valorInserido) {
        case 7:
            textoResultado += "• Curiosidade: Você escolheu o número da sorte (7).\n";
            break;
        case 10:
            textoResultado += "• Curiosidade: Você escolheu uma nota perfeita (10).\n";
            break;
        default:
            textoResultado += "• Análise padrão aplicada com sucesso.\n";
            break;
    }

    // Aula 1.12: Arrays (Guardando dados das repetições)
    let sequenciaFor = [];
    let sequenciaWhile = [];

    // Aula 1.07: Estrutura de Repetição FOR (Contagem regressiva até 0)
    for (let i = valorInserido; i >= 0; i--) {
        sequenciaFor.push(i);
    }
    textoResultado += `\n→ Contagem regressiva (FOR): ${sequenciaFor.join(', ')}\n`;

    // Aula 1.08: Estrutura de Repetição WHILE (Multiplicadores de 2 menores ou iguais ao número)
    let multiplicador = 1;
    while ((multiplicador * 2) <= valorInserido) {
        sequenciaWhile.push(multiplicador * 2);
        multiplicador++;
    }
    
    if(sequenciaWhile.length > 0) {
        textoResultado += `→ Múltiplos de 2 menores ou iguais (WHILE): ${sequenciaWhile.join(', ')}\n`;
    }

    // Exibe o resultado final completo na tela
    resultadoDiv.innerText = textoResultado;
}
