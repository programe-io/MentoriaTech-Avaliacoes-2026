// ------------------------------
// CÓDIGO JAVASCRIPT PURO
// ------------------------------

// 1. Variáveis e tipos
let nome = "Usuário";
const idade = 25;
let estaAtivo = true;

// 2. Função simples
function saudacao() {
    console.log("Olá, " + nome + "! Bem-vindo ao JavaScript.");
\}

// 3. Função com parâmetro e retorno
function somar(a, b) {
    return a + b;
\}

// 4. Manipulação de texto
function exibirMensagem(mensagem) {
    console.log(mensagem);
    // Mostra também na página se rodar no navegador
    if (document) {
        const p = document.createElement("p");
        p.textContent = mensagem;
        document.body.appendChild(p);
    \}
\}

// 5. Array e loop
const frutas = ["Maçã", "Banana", "Laranja", "Uva"];
function listarFrutas() {
    for (let i = 0; i < frutas.length; i++) {
        console.log((i + 1) + "º: " + frutas[i]);
    \}
\}

// 6. Objeto
const pessoa = {
    nome: "Maria",
    idade: 30,
    apresentar: function() {
        return "Meu nome é " + this.nome + " e tenho " + this.idade + " anos.";
    \}
\};

// 7. Execuções
saudacao();

let resultado = somar(10, 5);
exibirMensagem("Resultado da soma: " + resultado);

exibirMensagem("Lista de frutas:");
listarFrutas();

exibirMensagem(pessoa.apresentar());$0