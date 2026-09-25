// 1. Tema claro / escuro — salva preferência
function alternarTema() {
    const corpo = document.body;
    corpo.classList.toggle('tema-escuro');
    
    const temaAtual = corpo.classList.contains('tema-escuro') ? 'escuro' : 'claro';
    localStorage.setItem('temaPreferido', temaAtual);
    
    const botao = document.getElementById('botao-tema');
    botao.textContent = temaAtual === 'escuro' ? '☀️ Tema Claro' : '🌙 Tema Escuro';
\}

// Carrega tema salvo ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('temaPreferido');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('tema-escuro');
        document.getElementById('botao-tema').textContent = '☀️ Tema Claro';
    \}
\});

// 2. Calculadora de IMC
function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    if (!peso || !altura || peso <= 0 || altura <= 0) {
        alert('Por favor, digite valores válidos! ⚠️');
        return;
    \}
    
    const imc = peso / (altura * altura);
    let classificacao = '';
    
    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 25) classificacao = 'Peso normal ✅';
    else if (imc < 30) classificacao = 'Sobrepeso';
    else if (imc < 35) classificacao = 'Obesidade Grau I';
    else if (imc < 40) classificacao = 'Obesidade Grau II';
    else classificacao = 'Obesidade Grau III';
    
    document.getElementById('resultado-imc').innerHTML = 
        `<strong>IMC:</strong> \${imc.toFixed(2)\}<br><strong>Classificação:</strong> \${classificacao\}`;
\}

// 3. Contador com animação
let contador = 0;
function atualizarContador(valor) {
    contador += valor;
    const el = document.getElementById('contador');
    el.textContent = contador;
    
    el.style.transform = 'scale(1.3)';
    setTimeout(() => el.style.transform = 'scale(1)', 150);
    
    if (contador > 0) el.style.color = '#10b981';
    else if (contador < 0) el.style.color = '#ef4444';
    else el.style.color = '#6b7280';
\}

// 4. Gerador de senha aleatória
function gerarSenha() {
    const comprimento = 10;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#\$%&*';
    let senha = '';
    
    for (let i = 0; i < comprimento; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    \}
    
    document.getElementById('senha-gerada').value = senha;
\}

// 5. Copiar senha
function copiarSenha() {
    const campo = document.getElementById('senha-gerada');
    if (!campo.value) return;
    
    navigator.clipboard.writeText(campo.value).then(() => {
        const aviso = document.getElementById('aviso-copia');
        aviso.textContent = '✅ Senha copiada!';
        setTimeout(() => aviso.textContent = '', 2000);
    \});
\}$0