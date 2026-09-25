<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas - JavaScript</title>
</head>
<body>
<script>
// === Código JavaScript: Lista de Tarefas ===

// Estilo da página
document.body.style.margin = '0';
document.body.style.padding = '2rem';
document.body.style.minHeight = '100vh';
document.body.style.background = '#f0f4f8';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';

// Caixa principal
const caixa = document.createElement('div');
caixa.style.background = 'white';
caixa.style.padding = '2.5rem';
caixa.style.borderRadius = '16px';
caixa.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
caixa.style.width = '100%';
caixa.style.maxWidth = '450px';

// Título<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora - Só JavaScript</title>
</head>
<body>
<script>
// === Cálculadora feita apenas com JavaScript ===

// Estilo da página
document.body.style.margin = '0';
document.body.style.padding = '2rem';
document.body.style.minHeight = '100vh';
document.body.style.background = 'linear-gradient(135deg, #232526, #414345)';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';

// Caixa da calculadora
const calc = document.createElement('div');
calc.style.background = '#2c2c2c';
calc.style.padding = '1.5rem';
calc.style.borderRadius = '16px';
calc.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
calc.style.width = '100%';
calc.style.maxWidth = '360px';

// Tela
const tela = document.createElement('div');
tela.style.background = '#e5e5e5';
tela.style.color = '#222';
tela.style.fontSize = '2rem';
tela.style.padding = '1rem';
tela.style.textAlign = 'right';
tela.style.borderRadius = '10px';
tela.style.marginBottom = '1rem';
tela.style.minHeight = '60px';
tela.style.wordWrap = 'break-word';
tela.textContent = '0';

let valorAtual = '0';
let valorAnterior = '';
let operacao = null;
let reiniciarTela = false;

// Atualizar tela
function atualizarTela() {
    tela.textContent = valorAtual;
\}

// Limpar tudo
function limpar() {
    valorAtual = '0';
    valorAnterior = '';
    operacao = null;
    reiniciarTela = false;
    atualizarTela();
\}

// Adicionar número
function adicionarNumero(num) {
    if (valorAtual === '0' || reiniciarTela) {
        valorAtual = num;
        reiniciarTela = false;
    \} else {
        valorAtual += num;
    \}
    atualizarTela();
\}

// Escolher operação
function definirOperacao(op) {
    if (operacao !== null && !reiniciarTela) calcular();
    valorAnterior = valorAtual;
    operacao = op;
    reiniciarTela = true;
\}

// Calcular resultado
function calcular() {
    if (operacao === null || reiniciarTela) return;
    
    const ant = parseFloat(valorAnterior);
    const atu = parseFloat(valorAtual);
    let resultado;

    switch (operacao) {
        case '+': resultado = ant + atu; break;
        case '-': resultado = ant - atu; break;
        case '×': resultado = ant * atu; break;
        case '÷': resultado = ant / atu; break;
    \}

    valorAtual = String(resultado);
    operacao = null;
    reiniciarTela = true;
    atualizarTela();
\}

// Criar botões
const botoes = [
    ['C', '', '÷', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.']
];

const estiloBotao = (corFundo, corTexto) => ({
    background: corFundo,
    color: corTexto,
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    padding: '1rem',
    transition: 'transform 0.15s'
\});

botoes.forEach(linha => {
    const divLinha = document.createElement('div');
    divLinha.style.display = 'grid';
    divLinha.style.gridTemplateColumns = linha.length === 2 ? '2fr 1fr' : 'repeat(4, 1fr)';
    divLinha.style.gap = '0.7rem';
    divLinha.style.marginTop = '0.7rem';

    linha.forEach(texto => {
        if (!texto) return;
        
        const btn = document.createElement('button');
        btn.textContent = texto;
        
        if (['+', '-', '×', '÷'].includes(texto)) {
            Object.assign(btn.style, estiloBotao('#ff9500', 'white'));
            btn.onclick = () => definirOperacao(texto);
        \} else if (texto === '=') {
            Object.assign(btn.style, estiloBotao('#007aff', 'white'));
            btn.style.gridRow = 'span 2';
            btn.onclick = calcular;
        \} else if (texto === 'C') {
            Object.assign(btn.style, estiloBotao='#a5a5a5', 'black'));
            btn.onclick = limpar;
        \} else {
            Object.assign(btn.style, estiloBotao='#3c3c3c', 'white'));
            btn.onclick = () => adicionarNumero(texto);
        \}

        btn.onmousedown = () => btn.style.transform = 'scale(0.95)';
        btn.onmouseup = () => btn.style.transform = 'scale(1)';
        divLinha.appendChild(btn);
    \});

    calc.appendChild(divLinha);
\});

// Montar na página
calc.insertBefore(tela, calc.firstChild);
document.body.appendChild(calc);
</script>
</body>
</html>
$0
const titulo = document.createElement('h1');
titulo.textContent = '📋 Minhas Tarefas';
titulo.style.textAlign = 'center';
titulo.style.color = '#2d3748';
titulo.style.marginTop = '0';

// Área de entrada
const entrada = document.createElement('input');
entrada.type = 'text';
entrada.placeholder = 'Digite uma nova tarefa...';
entrada.style.width = '100%';
entrada.style.padding = '0.9rem';
entrada.style.border = '2px solid #e2e8f0';
entrada.style.borderRadius = '8px';
entrada.style.fontSize = '1rem';
entrada.style.marginBottom = '1rem';
entrada.style.boxSizing = 'border-box';

// Botão Adicionar
const botaoAdicionar = document.createElement('button');
botaoAdicionar.textContent = '➕ Adicionar';
botaoAdicionar.style.width = '100%';
botaoAdicionar.style.padding = '0.9rem';
botaoAdicionar.style.background = '#3182ce';
botaoAdicionar.style.color = 'white';
botaoAdicionar.style.border = 'none';
botaoAdicionar.style.borderRadius = '8px';
botaoAdicionar.style.fontSize = '1rem';
botaoAdicionar.style.cursor = 'pointer';
botaoAdicionar.style.marginBottom = '1.5rem';

// Lista de tarefas
const lista = document.createElement('ul');
lista.style.listStyle = 'none';
lista.style.padding = '0';

let tarefas = [];

// Função: adicionar tarefa
function adicionarTarefa() {
    const texto = entrada.value.trim();
    if (texto === '') return;

    tarefas.push({ texto: texto, concluida: false \});
    entrada.value = '';
    renderizarLista();
\}

// Função: exibir lista
function renderizarLista() {
    lista.innerHTML = '';

    tarefas.forEach((tarefa, indice) => {
        const item = document.createElement('li');
        item.style.padding = '0.9rem';
        item.style.background = tarefa.concluida ? '#f0fff4' : '#f7fafc';
        item.style.marginBottom = '0.6rem';
        item.style.borderRadius = '8px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.borderLeft = '4px solid ' + (tarefa.concluida ? '#38a169' : '#3182ce');

        const span = document.createElement('span');
        span.textContent = tarefa.texto;
        span.style.textDecoration = tarefa.concluida ? 'line-through' : 'none';
        span.style.color = tarefa.concluida ? '#718096' : '#2d3748';
        span.style.cursor = 'pointer';
        span.onclick = () => {
            tarefas[indice].concluida = !tarefas[indice].concluida;
            renderizarLista();
        \};

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = '🗑️';
        btnExcluir.style.background = 'transparent';
        btnExcluir.style.border = 'none';
        btnExcluir.style.cursor = 'pointer';
        btnExcluir.style.fontSize = '1rem';
        btnExcluir.onclick = () => {
            tarefas.splice(indice, 1);
            renderizarLista();
        \};

        item.appendChild(span);
        item.appendChild(btnExcluir);
        lista.appendChild(item);
    \});
\}

// Eventos
botaoAdicionar.onclick = adicionarTarefa;
entrada.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
\});

// Montar na página
caixa.appendChild(titulo);
caixa.appendChild(entrada);
caixa.appendChild(botaoAdicionar);
caixa.appendChild(lista);
document.body.appendChild(caixa);
</script>
</body>
</html>$0