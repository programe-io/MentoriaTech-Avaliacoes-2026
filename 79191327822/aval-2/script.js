// ======================================
// CÓDIGO JAVASCRIPT PURO
// ======================================

// 1. Variáveis
let mensagem = "Olá! Eu sou o JavaScript 🟡";
const anoAtual = 2026;

// 2. Função simples
function dizerOla() {
    console.log(mensagem);
    alert(mensagem);
\}

// 3. Função com cálculo
function calcularSoma(num1, num2) {
    return num1 + num2;
\}

// 4. Manipular texto
function mudarTexto() {
    const elemento = document.getElementById("meuTexto");
    if (elemento) {
        elemento.textContent = "Texto mudou com JavaScript! ✅";
        elemento.style.color = "green";
    \}
\}

// 5. Trabalhar com lista
const nomes = ["Ana", "Bruno", "Carla", "Daniel"];
function mostrarNomes() {
    console.log("Lista de nomes:");
    for (let i = 0; i < nomes.length; i++) {
        console.log(`\${i + 1\}. \${nomes[i]\}`);
    \}
\}

// 6. Objeto
const carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2024,
    apresentar: function() {
        return `Carro: \${this.marca\} \${this.modelo\}, ano \${this.ano\}`;
    \}
\};

// --- Executar tudo ---
dizerOla();
console.log("Soma 8 + 5 =", calcularSoma(8, 5));
mostrarNomes();
console.log(carro.apresentar());$0