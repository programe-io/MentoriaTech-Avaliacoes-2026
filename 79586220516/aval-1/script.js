// 1. Função simples: mensagem de boas-vindas
function boasVindas(nome) {
    return `Olá, \${nome\}! Seja muito bem-vindo(a)! 🎉`;
\}

// 2. Alterar texto na página
function alterarTexto() {
    const elemento = document.getElementById('mensagem');
    elemento.textContent = 'Texto alterado com sucesso! ✅';
    elemento.style.color = '#2ecc71';
\}

// 3. Contador de cliques
let contador = 0;
function contarClique() {
    contador++;
    document.getElementById('contador').textContent = `Cliques: \${contador\}`;
\}

// 4. Calcular soma
function somarNumeros() {
    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        alert('Por favor, digite números válidos! ⚠️');
        return;
    \}
    
    const resultado = num1 + num2;
    document.getElementById('resultado').textContent = `Resultado: \${resultado\}`;
\}

// 5. Executar quando a página carregar
window.onload = function() {
    console.log('Página carregada! O JavaScript está funcionando! 🚀');
    console.log(boasVindas('Amigo'));
\};
Como usar junto com HTML
Salve o JavaScript como script.js e cole este código no arquivo .html:
html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Exemplo de JavaScript</title>
</head>
<body>
    <h1>Exemplos com JavaScript</h1>

    <!-- Área de mensagem -->
    <p id="mensagem">Clique no botão abaixo para me alterar!</p>
    <button onclick="alterarTexto()">Alterar Texto</button>

    <hr>

    <!-- Contador -->
    <p id="contador">Cliques: 0</p>
    <button onclick="contarClique()">Clique Aqui!</button>

    <hr>

    <!-- Calculadora simples -->
    <h3>Calculadora de Soma</h3>
    <input type="number" id="numero1" placeholder="Número 1">
    <input type="number" id="numero2" placeholder="Número 2">
    <button onclick="somarNumeros()">Somar</button>
    <p id="resultado"></p>

    <!-- Vinculando o JavaScript -->
    <script src="script.js"></script>
</body>
</html>$0