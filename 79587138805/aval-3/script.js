// Gerar número secreto aleatório entre 1 e 100
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
const maxTentativas = 10;

console.log("=== JOGO DE ADIVINHAR O NÚMERO ===");
console.log("Tente adivinhar um número entre 1 e 100!");
console.log(`Você tem \${maxTentativas\} tentativas.`);

function verificarPalpite(palpite) {
    tentativas++;

    // Validar entrada
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        return "⚠️ Por favor, digite um número VÁLIDO entre 1 e 100!";
    \}

    // Verificar se acertou
    if (palpite === numeroSecreto) {
        return `🎉 PARABÉNS! Você acertou em \${tentativas\} tentativa(s)!`;
    \} else if (tentativas >= maxTentativas) {
        return `😢 Fim de jogo! O número era \${numeroSecreto\}.`;
    \} else if (palpite < numeroSecreto) {
        return `📈 O número é MAIOR que \${palpite\}. Tentativa \${tentativas\}/\${maxTentativas\}`;
    \} else {
        return `📉 O número é MENOR que \${palpite\}. Tentativa \${tentativas\}/\${maxTentativas\}`;
    \}
\}

// Função principal do jogo
function jogar() {
    while (tentativas < maxTentativas) {
        const entrada = prompt(`Tentativa \${tentativas + 1\}/\${maxTentativas\}\\nDigite um número entre 1 e 100:`);
        
        // Se usuário cancelar
        if (entrada === null) {
            alert("Jogo encerrado pelo usuário.");
            break;
        \}

        const palpite = parseInt(entrada);
        const resultado = verificarPalpite(palpite);
        
        alert(resultado);
        console.log(resultado);

        // Verificar se o jogo terminou
        if (palpite === numeroSecreto || tentativas >= maxTentativas) {
            break;
        \}
    \}

    // Perguntar se quer jogar novamente
    if (confirm("Quer jogar novamente?")) {
        location.reload(); // Reinicia a página/jogo
    \}
\}

// Iniciar o jogo quando carregar
jogar();$0