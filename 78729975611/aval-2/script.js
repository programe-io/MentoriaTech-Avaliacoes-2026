// ===== 1. RELÓGIO EM TEMPO REAL =====
function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    
    const relogioElemento = document.getElementById('relogio');
    if (relogioElemento) {
        relogioElemento.textContent = `${horas}:${minutos}:${segundos}`;
    }
}
// Atualiza a cada 1 segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// ===== 2. TROCA DE TEMA (CLARO / ESCURO) =====
function trocarTema() {
    const body = document.body;
    const temaAtual = body.classList.contains('tema-escuro') ? 'claro' : 'escuro';
    
    body.classList.toggle('tema-escuro');
    localStorage.setItem('tema', temaAtual); // Salva a preferência
    
    const botao = document.getElementById('botao-tema');
    if (botao) {
        botao.textContent = temaAtual === 'escuro' ? '☀️ Tema Claro' : '🌙 Tema Escuro';
    }
}

// Carrega o tema salvo ao abrir a página
window.addEventListener('load', () => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('tema-escuro');
        const botao = document.getElementById('botao-tema');
        if (botao) botao.textContent = '☀️ Tema Claro';
    }
});

// ===== 3. MOSTRAR/OCULTAR CONTEÚDO DOS PROJETOS =====
function alternarDetalhes(idProjeto) {
    const detalhes = document.getElementById(idProjeto);
    if (!detalhes) return;
    
    const estaVisivel = detalhes.style.display === 'block';
    detalhes.style.display = estaVisivel ? 'none' : 'block';
    
    // Animação suave
    if (!estaVisivel) {
        detalhes.style.opacity = '0';
        detalhes.style.transition = 'opacity 0.4s ease';
        setTimeout(() => detalhes.style.opacity = '1', 10);
    }
}

// ===== 4. FORMULÁRIO DE CONTATO COM VALIDAÇÃO COMPLETA =====
function enviarFormulario(event) {
    event.preventDefault(); // Impede recarregar a página
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    
    // Validações
    if (nome.length < 3) {
        alert('⚠️ Nome precisa ter pelo menos 3 caracteres!');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('⚠️ Digite um e-mail válido!');
        return;
    }
    
    if (mensagem.length < 10) {
        alert('⚠️ Mensagem muito curta (mínimo 10 caracteres)!');
        return;
    }
    
    // Simula envio
    mensagemSucesso.style.display = 'block';
    mensagemSucesso.innerHTML = `✅ Obrigada, ${nome}! Sua mensagem foi enviada com sucesso!`;
    
    // Salva mensagem no histórico
    salvarMensagem({ nome, email, mensagem, data: new Date().toLocaleString() });
    
    // Limpa o formulário após 3 segundos
    setTimeout(() => {
        document.getElementById('form-contato').reset();
        mensagemSucesso.style.display = 'none';
    }, 3000);
}

// ===== 5. ARMAZENAR E EXIBIR HISTÓRICO =====
function salvarMensagem(dados) {
    const historico = JSON.parse(localStorage.getItem('historicoMensagens')) || [];
    historico.push(dados);
    localStorage.setItem('historicoMensagens', JSON.stringify(historico));
    console.log('📬 Mensagens salvas:', historico);
}

function mostrarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historicoMensagens')) || [];
    const lista = document.getElementById('lista-historico');
    if (!lista) return;
    
    lista.innerHTML = '';
    
    if (historico.length === 0) {
        lista.innerHTML = '<li>Nenhuma mensagem enviada ainda.</li>';
        return;
    }
    
    historico.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.nome}</strong> (${item.data}):<br>${item.mensagem}`;
        lista.appendChild(li);
    });
}

// ===== EXECUÇÕES AO CARREGAR =====
window.addEventListener('load', () => {
    mostrarHistorico();
    console.log('🚀 Script carregado! Recursos ativos: Relógio, Tema, Formulário, Histórico');
});