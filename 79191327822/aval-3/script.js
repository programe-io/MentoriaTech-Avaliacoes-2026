// ======================================
// CÓDIGO JAVASCRIPT PURO
// ======================================

// 1. Variáveis
let nome = "Amigo";
const PI = 3.14;

// 2. Função de saudação
function saudacao() {
    console.log("Olá, " + nome + "! 👋");
    alert("Olá, " + nome + "! Bem-vindo!");
\}

// 3. Função que calcula
function multiplicar(a, b) {
    return a * b;
\}

// 4. Mudar texto na página
function alterarTexto() {
    const elemento = document.getElementById("meuTexto");
    if (elemento) {
        elemento.textContent = "Texto alterado com sucesso! ✅";
        elemento.style.color = "blue";
    \}
\}

// 5. Lista e repetição
const frutas = ["Maçã", "Banana", "Laranja", "Uva"];
function listarFrutas() {
    console.log("Frutas:");
    for (let i = 0; i < frutas.length; i++) {
        console.log((i + 1) + " - " + frutas[i]);
    \}
\}

// 6. Objeto
const pessoa = {
    nome: "Carlos",
    idade: 28,
    falar: function() {
        return "Oi, eu sou o " + this.nome + " e tenho " + this.idade + " anos.";
    \}
\};

// --- Executar ---
saudacao();
console.log("7 × 3 =", multiplicar(7, 3));
listarFrutas();
console.log(pessoa.falar());
📝 Como usar no HTML
Cole isso no final do <body>:
html
Preview
<p id="meuTexto">Texto original aqui</p>
<button onclick="alterarTexto()">Clique para mudar</button>

<script>
// COLE O CÓDIGO JAVASCRIPT AQUI
</script>$0