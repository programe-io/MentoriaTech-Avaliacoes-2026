// ==========================================
// 1. FUNCIONALIDADE: MODALIDADE MODO ESCURO
// ==========================================
const botaoTema = document.getElementById('botao-tema');

botaoTema.addEventListener('click', () => {
    // Liga/desliga a classe "modo-escuro" no <body>
    document.body.classList.toggle('modo-escuro');
    
    // Altera o texto do botão dependendo do modo ativo
    if (document.body.classList.contains('modo-escuro')) {
        botaoTema.textContent = 'Alternar Modo Claro';
    } else {
        botaoTema.textContent = 'Alternar Modo Escuro';
    }
});

// ==========================================
// 2. FUNCIONALIDADE: CONTADOR DE CURTIDAS
// ==========================================
// Seleciona todos os botões de curtir da página
const botoesCurtir = document.querySelectorAll('.btn-curtir');

botoesCurtir.forEach((botao) => {
    let curtidas = 0;
    
    botao.addEventListener('click', () => {
        curtidas++;
        // Procura o elemento <span> dentro deste botão específico para atualizar o número
        const spanContador = botao.querySelector('.contador');
        spanContador.textContent = curtidas;
    });
});
