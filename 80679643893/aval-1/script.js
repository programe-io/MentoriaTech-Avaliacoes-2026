// ===== 1 — Saudação ao clicar no botão =====
const botaoSaudacao = document.getElementById('btnSaudacao');
const mensagemSaudacao = document.getElementById('mensagem-saudacao');

botaoSaudacao.addEventListener('click', function() {
    const horaAtual = new Date().getHours();
    let saudacao;

    if (horaAtual < 12) {
        saudacao = 'Bom dia! Que seu dia seja abençoado! ☀️';
    } else if (horaAtual < 18) {
        saudacao = 'Boa tarde! Continue brilhando! 🌤️';
    } else {
        saudacao = 'Boa noite! Descanse e sonhe alto! 🌙';
    }

    mensagemSaudacao.textContent = saudacao;
});

// ===== 2 — Menu responsivo para celular =====
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// ===== 3 — Envio do formulário de mensagem =====
const formMensagem = document.getElementById('form-mensagem');
const respostaForm = document.getElementById('resposta-form');

formMensagem.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que a página recarregue

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;

    respostaForm.innerHTML = `<strong>Olá, ${nome}!</strong> Obrigada pela sua mensagem! ✨<br>"${mensagem}"`;
    respostaForm.classList.add('resposta-visivel');

    // Limpar formulário após envio
    formMensagem.reset();

    // Esconder mensagem após 8 segundos
    setTimeout(function() {
        respostaForm.classList.remove('resposta-visivel');
    }, 8000);
});

// ===== 4 — Animação suave ao rolar a página =====
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', function(e) {
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) {
            window.scrollTo({
                top: alvo.offsetTop - 60,
                behavior: 'smooth'
            });
            // Fechar menu mobile ao clicar
            navLinks.classList.remove('active');
        }
    });
});

// ===== 5 — Mensagem no console =====
console.log('🎉 Site carregado com sucesso! Bem-vindo ao meu projeto!');
// ===== 1 — Saudação ao clicar no botão =====
const botaoSaudacao = document.getElementById('btnSaudacao');
const mensagemSaudacao = document.getElementById('mensagem-saudacao');

botaoSaudacao.addEventListener('click', function() {
    const horaAtual = new Date().getHours();
    let saudacao;

    if (horaAtual < 12) {
        saudacao = 'Bom dia! Que seu dia seja abençoado! ☀️';
    } else if (horaAtual < 18) {
        saudacao = 'Boa tarde! Continue brilhando! 🌤️';
    } else {
        saudacao = 'Boa noite! Descanse e sonhe alto! 🌙';
    }

    mensagemSaudacao.textContent = saudacao;
});

// ===== 2 — Menu responsivo para celular =====
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// ===== 3 — Envio do formulário de mensagem =====
const formMensagem = document.getElementById('form-mensagem');
const respostaForm = document.getElementById('resposta-form');

formMensagem.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que a página recarregue

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;

    respostaForm.innerHTML = `<strong>Olá, ${nome}!</strong> Obrigada pela sua mensagem! ✨<br>"${mensagem}"`;
    respostaForm.classList.add('resposta-visivel');

    // Limpar formulário após envio
    formMensagem.reset();

    // Esconder mensagem após 8 segundos
    setTimeout(function() {
        respostaForm.classList.remove('resposta-visivel');
    }, 8000);
});

// ===== 4 — Animação suave ao rolar a página =====
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.addEventListener('click', function(e) {
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) {
            window.scrollTo({
                top: alvo.offsetTop - 60,
                behavior: 'smooth'
            });
            // Fechar menu mobile ao clicar
            navLinks.classList.remove('active');
        }
    });
});

// ===== 5 — Mensagem no console =====
console.log('🎉 Site carregado com sucesso! Bem-vindo ao meu projeto!');
