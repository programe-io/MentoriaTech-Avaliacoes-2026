// ===== FUNÇÕES BÁSICAS E EXEMPLOS =====

// 1. Mensagem de boas-vindas
function boasVindas(nome) {
    return `Olá, \${nome\}! Seja bem-vindo(a)! 🎉`;
\}

// 2. Cálculo simples
function somar(a, b) {
    return a + b;
\}

function multiplicar(a, b) {
    return a * b;
\}

// 3. Manipular elementos da página
function alterarTexto(id, novoTexto) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = novoTexto;
    \}
\}

// 4. Mostrar mensagem na tela
function mostrarAlerta(mensagem) {
    alert(mensagem);
\}

// 5. Contador dinâmico
let contador = 0;
function incrementar() {
    contador++;
    return contador;
\}

// ===== EXECUÇÃO DE EXEMPLOS =====
// Executa quando a página estiver carregada
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso! ✅');
    
    // Teste no console
    console.log(boasVindas('Amigo'));
    console.log(`Soma: 5 + 3 = \${somar(5, 3)\}`);
\});$0