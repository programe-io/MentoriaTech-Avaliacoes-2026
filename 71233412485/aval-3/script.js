// ===============================
// JS COMPLETO PARA UM SITE EXEMPLO
// ===============================

// 1. FUNÇÃO PARA EXIBIR MENSAGEM
function mostrarMensagem() {
    const mensagemEl = document.getElementById('mensagem');
    mensagemEl.innerText = "Você clicou no botão!";
    mensagemEl.style.color = 'green';
}

// 2. TROCAR COR DE FUNDO
function mudarFundo(cor) {
    document.body.style.backgroundColor = cor;
}

// 3. VALIDAR FORMULÁRIO SIMPLES
function validarFormulario(event) {
    event.preventDefault(); // Evita envio automático
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const resultadoEl = document.getElementById('resultado');

    if(nome === '' || email === '') {
        resultadoEl.innerText = 'Por favor, preencha todos os campos!';
        resultadoEl.style.color = 'red';
    } else {
        resultadoEl.innerText = `Obrigado, ${nome}! Entraremos em contato pelo email ${email}.`;
        resultadoEl.style.color = 'green';
        document.getElementById('formContato').reset(); // Limpa o formulário
    }
}

// 4. CRIAR ELEMENTOS DINAMICAMENTE
function adicionarCard(titulo, conteudo) {
    const container = document.getElementById('cardsContainer');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${titulo}</h3><p>${conteudo}</p>`;
    container.appendChild(card);
}

// 5. ADICIONAR EVENTOS AUTOMATICAMENTE
document.addEventListener('DOMContentLoaded', () => {
    // Botão de mensagem
    const botaoMensagem = document.getElementById('btnMensagem');
    if(botaoMensagem) {
        botaoMensagem.addEventListener('click', mostrarMensagem);
    }

    // Botão de mudar fundo
    const btnFundo = document.getElementById('btnFundo');
    if(btnFundo) {
        btnFundo.addEventListener('click', () => mudarFundo('#e0f7fa'));
    }

    // Formulário
    const formContato = document.getElementById('formContato');
    if(formContato) {
        formContato.addEventListener('submit', validarFormulario);
    }

    // Adicionar cards dinamicamente
    adicionarCard('Card Dinâmico 1', 'Este card foi criado pelo JavaScript.');
    adicionarCard('Card Dinâmico 2', 'Você pode adicionar quantos quiser!');
});

// 6. FUNÇÃO EXTRA: RELÓGIO AO VIVO
function atualizarRelogio() {
    const relogioEl = document.getElementById('relogio');
    if(relogioEl) {
        const agora = new Date();
        relogioEl.innerText = agora.toLocaleTimeString();
        setTimeout(atualizarRelogio, 1000);
    }
}
document.addEventListener('DOMContentLoaded', atualizarRelogio);