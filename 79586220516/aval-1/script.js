

// Executa o código quando a página termina de carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada e JavaScript funcionando!');
    
    // Chama funções ao carregar a página
    mostrarDataHoraAtual();
    configurarFormulario();
    configurarNavegacao();
    criarEfeitoRolagem();
\});

// ---------- 1. EXIBIR DATA E HORA ATUAL ----------
function mostrarDataHoraAtual() {
    // Cria elemento para mostrar a data, se não existir
    let elementoData = document.getElementById('data-atual');
    
    if (!elementoData) {
        elementoData = document.createElement('div');
        elementoData.id = 'data-atual';
        elementoData.style.padding = '1rem';
        elementoData.style.textAlign = 'center';
        elementoData.style.fontWeight = 'bold';
        document.querySelector('header').appendChild(elementoData);
    \}

    // Atualiza data e hora a cada segundo
    function atualizarHora() {
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        \});
        const horaFormatada = agora.toLocaleTimeString('pt-BR');
        elementoData.textContent = `\${dataFormatada\} — \${horaFormatada\}`;
    \}

    atualizarHora(); // Executa imediatamente
    setInterval(atualizarHora, 1000); // Atualiza a cada 1 segundo
\}

// ---------- 2. FORMULÁRIO DE CONTATO COM VALIDAÇÃO ----------
function configurarFormulario() {
    const formulario = document.getElementById('formulario');
    
    if (!formulario) return; // Sai se o formulário não existir

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Impede recarregamento da página

        // Captura os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação dos campos
        if (nome === '') {
            alert('Por favor, preencha o seu nome!');
            document.getElementById('nome').focus();
            return;
        \}

        if (email === '' || !email.includes('@') || !email.includes('.')) {
            alert('Por favor, insira um e-mail válido!');
            document.getElementById('email').focus();
            return;
        \}

        if (mensagem === '') {
            alert('Por favor, escreva uma mensagem!');
            document.getElementById('mensagem').focus();
            return;
        \}

        // Se tudo estiver correto
        const dadosFormulario = {
            nome: nome,
            email: email,
            mensagem: mensagem,
            dataEnvio: new Date().toLocaleString('pt-BR')
        \};

        console.log('Dados enviados:', dadosFormulario);
        alert(`Olá \${nome\}! 🎉\\nSua mensagem foi enviada com sucesso.\\n\\nE-mail: \${email\}\\nMensagem: \${mensagem\}`);
        
        formulario.reset(); // Limpa os campos
    \});
\}

// ---------- 3. NAVEGAÇÃO ATIVA NO MENU ----------
function configurarNavegacao() {
    const linksMenu = document.querySelectorAll('nav a');

    linksMenu.forEach(link => {
        // Marca link ativo ao clicar
        link.addEventListener('click', function() {
            linksMenu.forEach(item => item.classList.remove('ativo'));
            this.classList.add('ativo');
        \});

        // Efeito de passar o mouse
        link.addEventListener('mouseover', function() {
            this.style.opacity = '0.85';
        \});

        link.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        \});
    \});
\}

// ---------- 4. EFEITO DE ROLAGEM SUAVE E ANIMAÇÃO ----------
function criarEfeitoRolagem() {
    // Rolagem suave para links internos
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    linksInternos.forEach(link => {
        link.addEventListener('click', function(evento) {
            evento.preventDefault();
            const alvo = document.querySelector(this.getAttribute('href'));
            
            if (alvo) {
                alvo.scrollIntoView({
                    behavior: 'smooth', // Rolagem suave
                    block: 'start'
                \});
            \}
        \});
    \});

    // Animação ao rolar a página
    window.addEventListener('scroll', function() {
        const cabecalho = document.querySelector('header');
        if (window.scrollY > 50) {
            cabecalho.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            cabecalho.style.transition = 'all 0.3s ease';
        \} else {
            cabecalho.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        \}
    \});
\}

// ---------- 5. FUNÇÃO ADICIONAL: CALCULADORA SIMPLES ----------
function calculadoraSimples(num1, num2, operador) {
    num1 = Number(num1);
    num2 = Number(num2);

    if (isNaN(num1) || isNaN(num2)) {
        return 'Erro: Insira apenas números válidos!';
    \}

    switch (operador) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': 
            if (num2 === 0) return 'Erro: Divisão por zero não permitida!';
            return num1 / num2;
        default: return 'Erro: Operador inválido! Use +, -, * ou /';
    \}$0'