// 1. Relógio dinâmico
function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    
    document.getElementById('relogio').textContent = `\${horas\}:\${minutos\}:\${segundos\}`;
\}
setInterval(atualizarRelogio, 1000);
atualizarRelogio(); // Executa imediatamente

// 2. Alterar cor de fundo
function mudarCorFundo() {
    const corAleatoria = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = corAleatoria;
    document.getElementById('cor-atual').textContent = `Cor atual: \${corAleatoria\}`;
\}

// 3. Lista de tarefas
function adicionarTarefa() {
    const entrada = document.getElementById('entrada-tarefa');
    const texto = entrada.value.trim();
    
    if (!texto) {
        alert('Digite uma tarefa! 📝');
        return;
    \}
    
    const lista = document.getElementById('lista-tarefas');
    const item = document.createElement('li');
    item.textContent = texto;
    
    // Botão de remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '❌';
    botaoRemover.style.marginLeft = '10px';
    botaoRemover.onclick = () => item.remove();
    
    item.appendChild(botaoRemover);
    lista.appendChild(item);
    entrada.value = '';
\}

// 4. Conversor de Celsius para Fahrenheit
function converterTemperatura() {
    const celsius = parseFloat(document.getElementById('celsius').value);
    
    if (isNaN(celsius)) {
        document.getElementById('resultado-temp').textContent = 'Digite um número válido!';
        return;
    \}
    
    const fahrenheit = (celsius * 9/5) + 32;
    document.getElementById('resultado-temp').textContent = 
        `\${celsius\}°C = \${fahrenheit.toFixed(1)\}°F`;
\}

// 5. Mensagem personalizada ao carregar
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ JavaScript carregado com sucesso!');
    const saudacao = document.createElement('p');
    saudacao.textContent = 'Bem-vindo! Explore as funções abaixo 👇';
    saudacao.style.color = '#2563eb';
    saudacao.style.fontWeight = 'bold';
    document.body.prepend(saudacao);
\});
Arquivo HTML para usar com este JavaScript
html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mais JavaScript</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            transition: background-color 0.3s ease;
        \}
        h1 {
            color: #1e40af;
            text-align: center;
        \}
        .caixa {
            background: white;
            padding: 1.5rem;
            margin: 1rem 0;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        \}
        button {
            padding: 0.7rem 1.2rem;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin: 0.3rem;
        \}
        button:hover {
            background: #1d4ed8;
        \}
        input {
            padding: 0.7rem;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            width: 250px;
            margin-right: 0.5rem;
        \}
        ul {
            list-style: none;
            padding: 0;
            margin-top: 1rem;
        \}
        li {
            padding: 0.5rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        \}
        #relogio {
            font-size: 2rem;
            font-weight: bold;
            color: #7c3aed;
            text-align: center;
        \}
    </style>
</head>
<body>

    <h1>⚡ Mais JavaScript</h1>

    <!-- Relógio -->
    <div class="caixa">
        <h3>🕐 Relógio em Tempo Real</h3>
        <p id="relogio">--:--:--</p>
    </div>

    <!-- Mudar Cor -->
    <div class="caixa">
        <h3>🎨 Mudar Cor de Fundo</h3>
        <button onclick="mudarCorFundo()">Clique para mudar a cor!</button>
        <p id="cor-atual"></p>
    </div>

    <!-- Lista de Tarefas -->
    <div class="caixa">
        <h3>📋 Lista de Tarefas</h3>
        <input type="text" id="entrada-tarefa" placeholder="Digite uma tarefa...">
        <button onclick="adicionarTarefa()">Adicionar</button>
        <ul id="lista-tarefas"></ul>
    </div>

    <!-- Conversor de Temperatura -->
    <div class="caixa">
        <h3>🌡️ Conversor de Temperatura</h3>
        <input type="number" id="celsius" placeholder="Graus Celsius">
        <button onclick="converterTemperatura()">Converter</button>
        <p id="resultado-temp" style="margin-top: 1rem; font-weight: bold;"></p>
    </div>

    <script src="script-extra.js"></script>
</body>
</html>$0