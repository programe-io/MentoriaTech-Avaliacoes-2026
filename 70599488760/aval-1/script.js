/**
 * Prática 01 — Validação de Senha do Caixa Eletrônico
 * 
 * Utiliza do/while para solicitar a senha repetidamente.
 * Máximo de 3 tentativas. Senha correta: 2311.
 */

// --- Elementos do DOM ---
var terminalCard = document.getElementById('terminalCard');
var pinDisplay = document.getElementById('pinDisplay');
var pinDots = pinDisplay.querySelectorAll('.pin-dot');
var screenMessage = document.getElementById('screenMessage');
var attemptsBar = document.getElementById('attemptsBar');
var attemptDots = attemptsBar.querySelectorAll('.attempt-dot');
var attemptsText = document.getElementById('attemptsText');
var keypad = document.getElementById('keypad');
var confirmBtn = document.getElementById('confirmBtn');
var blockedOverlay = document.getElementById('blockedOverlay');
var successOverlay = document.getElementById('successOverlay');
var retryBlockedBtn = document.getElementById('retryBlockedBtn');
var retrySuccessBtn = document.getElementById('retrySuccessBtn');

// --- Constantes ---
var SENHA_CORRETA = '2311';
var MAX_TENTATIVAS = 3;
var TAMANHO_SENHA = 4;

// --- Estado da aplicação ---
var senhaDigitada = '';
var tentativasUsadas = 0;
var bloqueado = false;

// --- Funções auxiliares ---

/**
 * Atualiza a exibição visual dos pin dots
 * conforme os dígitos forem inseridos.
 */
function atualizarPinDots() {
    for (var i = 0; i < pinDots.length; i++) {
        pinDots[i].classList.remove('filled', 'error');
        if (i < senhaDigitada.length) {
            pinDots[i].classList.add('filled');
        }
    }
}

/**
 * Atualiza o indicador de tentativas restantes.
 */
function atualizarTentativas() {
    var restantes = MAX_TENTATIVAS - tentativasUsadas;

    for (var i = 0; i < attemptDots.length; i++) {
        if (i < tentativasUsadas) {
            attemptDots[i].classList.add('used');
        } else {
            attemptDots[i].classList.remove('used');
        }
    }

    attemptsText.textContent = restantes + ' tentativa' + (restantes !== 1 ? 's' : '');
}

/**
 * Define a mensagem exibida na tela do terminal.
 */
function setMensagem(texto, tipo) {
    screenMessage.textContent = texto;
    screenMessage.className = 'screen-message';
    if (tipo) {
        screenMessage.classList.add('msg-' + tipo);
    }
}

/**
 * Anima os pin dots como erro (shake + cor vermelha).
 */
function animarErro() {
    for (var i = 0; i < pinDots.length; i++) {
        pinDots[i].classList.remove('filled');
        pinDots[i].classList.add('error');
    }
    terminalCard.classList.add('state-error');

    // Remove os estados de erro após a animação
    setTimeout(function () {
        for (var i = 0; i < pinDots.length; i++) {
            pinDots[i].classList.remove('error');
        }
        terminalCard.classList.remove('state-error');
    }, 700);
}

/**
 * Desabilita ou habilita todos os botões do teclado.
 */
function setKeypadHabilitado(habilitado) {
    var botoes = keypad.querySelectorAll('.key');
    for (var i = 0; i < botoes.length; i++) {
        botoes[i].disabled = !habilitado;
    }
    confirmBtn.disabled = !habilitado;
}

/**
 * Limpa o campo de senha digitada.
 */
function limparSenha() {
    senhaDigitada = '';
    atualizarPinDots();
}

// --- Lógica principal com do/while ---

/**
 * Processa a tentativa de confirmação de senha.
 * Implementa a estrutura do/while:
 *   - O "do" executa a validação da senha digitada
 *   - O "while" verifica se ainda restam tentativas
 */
function processarConfirmacao() {
    // Se já estiver bloqueado ou a senha estiver incompleta, ignora
    if (bloqueado) return;
    if (senhaDigitada.length !== TAMANHO_SENHA) {
        setMensagem('Digite os 4 dígitos antes de confirmar', 'warning');
        return;
    }

    // === INÍCIO DO DO/WHILE ===
    do {
        tentativasUsadas++;
        atualizarTentativas();

        if (senhaDigitada === SENHA_CORRETA) {
            // Senha correta — exibir boas-vindas e sair do loop
            setMensagem('Senha correta!', 'success');
            terminalCard.classList.add('state-success');
            setKeypadHabilitado(false);

            setTimeout(function () {
                successOverlay.classList.add('visible');
            }, 500);
            return; // Sai da função (equivalente a sair do do/while)
        } else {
            // Senha incorreta
            var restantes = MAX_TENTATIVAS - tentativasUsadas;
            animarErro();

            if (restantes > 0) {
                // Ainda há tentativas — informar e continuar o loop
                setMensagem(
                    'Senha incorreta. ' + restantes + ' tentativa' + (restantes !== 1 ? 's' : '') + ' restante' + (restantes !== 1 ? 's' : ''),
                    'error'
                );
                limparSenha();
            }
        }

    // Condição do while: continua enquanto não bloqueou E ainda há tentativas E senha ainda está errada
    } while (!bloqueado && tentativasUsadas < MAX_TENTATIVAS);

    // Verificação pós-loop: se esgotou as tentativas
    if (tentativasUsadas >= MAX_TENTATIVAS) {
        bloqueado = true;
        setMensagem('Acesso bloqueado', 'error');
        setKeypadHabilitado(false);

        setTimeout(function () {
            blockedOverlay.classList.add('visible');
        }, 800);
    }
    // === FIM DO DO/WHILE ===
}

// --- Event Listeners ---

// Clique nos botões do teclado numérico
keypad.addEventListener('click', function (event) {
    var botao = event.target.closest('.key');
    if (!botao || botao.disabled || bloqueado) return;

    var valor = botao.getAttribute('data-key');

    if (valor === 'clear') {
        // Limpar último dígito
        if (senhaDigitada.length > 0) {
            senhaDigitada = senhaDigitada.slice(0, -1);
            atualizarPinDots();
            setMensagem('Insira os 4 dígitos da sua senha', '');
        }
    } else if (valor !== 'empty' && senhaDigitada.length < TAMANHO_SENHA) {
        // Adicionar dígito
        senhaDigitada += valor;
        atualizarPinDots();

        if (senhaDigitada.length === TAMANHO_SENHA) {
            setMensagem('Pressione CONFIRMAR para validar', '');
        } else {
            setMensagem('Insira os 4 dígitos da sua senha', '');
        }
    }
});

// Clique no botão confirmar
confirmBtn.addEventListener('click', function () {
    processarConfirmacao();
});

// Suporte a teclado físico
document.addEventListener('keydown', function (event) {
    if (bloqueado) return;

    if (event.key >= '0' && event.key <= '9') {
        if (senhaDigitada.length < TAMANHO_SENHA) {
            senhaDigitada += event.key;
            atualizarPinDots();
            if (senhaDigitada.length === TAMANHO_SENHA) {
                setMensagem('Pressione CONFIRMAR para validar', '');
            }
        }
    } else if (event.key === 'Backspace') {
        if (senhaDigitada.length > 0) {
            senhaDigitada = senhaDigitada.slice(0, -1);
            atualizarPinDots();
            setMensagem('Insira os 4 dígitos da sua senha', '');
        }
    } else if (event.key === 'Enter') {
        processarConfirmacao();
    }
});

// Botão de tentar novamente (overlay bloqueado)
retryBlockedBtn.addEventListener('click', function () {
    senhaDigitada = '';
    tentativasUsadas = 0;
    bloqueado = false;
    limparSenha();
    atualizarTentativas();
    setMensagem('Insira os 4 dígitos da sua senha', '');
    setKeypadHabilitado(true);
    blockedOverlay.classList.remove('visible');
});

// Botão de voltar ao início (overlay sucesso)
retrySuccessBtn.addEventListener('click', function () {
    senhaDigitada = '';
    tentativasUsadas = 0;
    bloqueado = false;
    limparSenha();
    atualizarTentativas();
    setMensagem('Insira os 4 dígitos da sua senha', '');
    setKeypadHabilitado(true);
    successOverlay.classList.remove('visible');
    terminalCard.classList.remove('state-success');
});