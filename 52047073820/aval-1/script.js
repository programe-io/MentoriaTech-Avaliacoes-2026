// Define uma função para sortear um número e dizer se é par ou ímpar
function verificarNumeroAleatorio() {
    // Gera um número inteiro aleatório entre 1 e 100
    const numeroSorteado = Math.floor(Math.random() * 100) + 1;
    
    console.log(`Número sorteado: \${numeroSorteado\}`);
    
    // Verifica se o número é par ou ímpar
    if (numeroSorteado % 2 === 0) {
        console.log("O número é PAR!");
    \} else {
        console.log("O número é ÍMPAR!");
    \}
\}

// Executa a função
verificarNumeroAleatorio();$0