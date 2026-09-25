// === CÓDIGO JAVASCRIPT PURO — SEM HTML, SEM CSS ===

// 1. Função de mensagem
function saudacao(nome) {
    return `Olá, \${nome\}! Seja muito bem-vindo(a)! 😊`;
\}

// 2. Função de soma
function somar(a, b) {
    return a + b;
\}

// 3. Função de subtração
function subtrair(a, b) {
    return a - b;
\}

// 4. Função de multiplicação
function multiplicar(a, b) {
    return a * b;
\}

// 5. Função de divisão
function dividir(a, b) {
    if (b === 0) {
        return "Erro: não é possível dividir por zero!";
    \}
    return a / b;
\}

// 6. Função que retorna a hora atual
function pegarHora() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    return `\${horas\}:\${minutos\}:\${segundos\}`;
\}

// 7. Função de contador
let contador = 0;
function aumentarContador() {
    contador++;
    return contador;
\}

function zerarContador() {
    contador = 0;
    return contador;
\}

// 8. Função para verificar se é par
function ehPar(numero) {
    return numero % 2 === 0;
\}

// 9. Função para sortear número
function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
\}

// === TESTES DAS FUNÇÕES ===
console.log("✅ Código carregado com sucesso!");
console.log(saudacao("Amigo"));
console.log("Soma 5 + 3 =", somar(5, 3));
console.log("Multiplica 4 × 6 =", multiplicar(4, 6));
console.log("Hora atual:", pegarHora());
console.log("Número é par?", ehPar(10));
console.log("Número sorteado (1 a 100):", sortearNumero(1, 100));
console.log("Contador:", aumentarContador());
console.log("Contador:", aumentarContador());
$0