// === Constantes ===
const SENHA_CORRETA = '2805';
const MAX_TENTATIVAS = 3;

// === Estado da aplicação ===
let senhaDigitada = '';
let tentativasRestantes = MAX_TENTATIVAS;

// === Referências do DOM ===
const pinDots = document.querySelectorAll('.dot');
const feedbackMsg = document.getElementById('feedback-msg');
const attemptDots = document.querySelectorAll('.attempt-dot');
const stateInput = document.getElementById('state-input');
const stateSuccess = document.getElementById('state-success');
const stateBlocked = document.getElementById('state-blocked');
const allKeys = document.querySelectorAll('.key');
const statusDot = document.querySelector('.status-dot');

/**
 * Atualiza a exibição dos pontos do PIN
 * conforme a senha vai sendo digitada
 */
function atualizarPinDots() {
  pinDots.forEach((dot, index) => {
    dot.classList.remove('filled', 'error');
    if (index < senhaDigitada.length) {
      dot.classList.add('filled');
    }
  });
}

/**
 * Marca visualmente uma tentativa como perdida
 */
function marcarTentativaPerdida() {
  const indice = MAX_TENTATIVAS - tentativasRestantes;
  attemptDots.forEach(dot => {
    const numAtt = parseInt(dot.dataset.att);
    if (numAtt <= indice) {
      dot.classList.remove('active');
      dot.classList.add('used');
    }
  });
}

/**
 * Exibe erro visual nos pontos do PIN
 */
function mostrarErroNosDots() {
  pinDots.forEach(dot => {
    dot.classList.remove('filled');
    dot.classList.add('error');
  });
}

/**
 * Troca o estado visível da tela
 * @param {string} estado - 'input' | 'success' | 'blocked'
 */
function trocarEstado(estado) {
  stateInput.classList.remove('active');
  stateSuccess.classList.remove('active');
  stateBlocked.classList.remove('active');

  if (estado === 'input') {
    stateInput.classList.add('active');
  } else if (estado === 'success') {
    stateSuccess.classList.add('active');
  } else if (estado === 'blocked') {
    stateBlocked.classList.add('active');
    statusDot.classList.add('danger');
  }
}

/**
 * Desabilita todos os botões do teclado
 */
function desabilitarTeclado() {
  allKeys.forEach(key => key.disabled = true);
}

/**
 * Processa a validação da senha usando do/while
 * O loop executa ao menos uma vez e continua
 * enquanto houver tentativas e a senha estiver errada
 */
function validarSenha() {
  let acessoPermitido = false;

  do {
    if (senhaDigitada === SENHA_CORRETA) {
      // Senha correta — sai do loop com sucesso
      acessoPermitido = true;
      break;
    } else {
      // Senha incorreta — decrementa tentativas
      tentativasRestantes--;
      marcarTentativaPerdida();
      mostrarErroNosDots();

      if (tentativasRestantes > 0) {
        // Ainda restam tentativas — informa o usuário
        feedbackMsg.textContent =
          'Senha incorreta. ' + tentativasRestantes +
          ' tentativa' + (tentativasRestantes > 1 ? 's' : '') +
          ' restante' + (tentativasRestantes > 1 ? 's' : '') + '.';

        // Limpa após a animação de erro para nova digitação
        setTimeout(function () {
          senhaDigitada = '';
          pinDots.forEach(function (dot) {
            dot.classList.remove('error');
          });
          atualizarPinDots();
        }, 600);
        return; // Volta a aguardar próxima digitação
      } else {
        // Tentativas esgotadas — encerra o loop
        feedbackMsg.textContent = '';
        break;
      }
    }
  } while (tentativasRestantes > 0 && !acessoPermitido);

  // Resultado após o encerramento do loop
  if (acessoPermitido) {
    trocarEstado('success');
    desabilitarTeclado();
  } else {
    trocarEstado('blocked');
    desabilitarTeclado();
  }
}

/**
 * Adiciona um dígito à senha digitada
 */
function adicionarDigito(digito) {
  if (senhaDigitada.length >= 4 || !stateInput.classList.contains('active')) {
    return;
  }

  senhaDigitada += digito;
  atualizarPinDots();

  // Ao completar 4 dígitos, valida automaticamente
  if (senhaDigitada.length === 4) {
    setTimeout(function () {
      validarSenha();
    }, 250);
  }
}

/**
 * Remove o último dígito digitado
 */
function apagarDigito() {
  if (senhaDigitada.length === 0 || !stateInput.classList.contains('active')) {
    return;
  }
  senhaDigitada = senhaDigitada.slice(0, -1);
  feedbackMsg.textContent = '';
  atualizarPinDots();
}

/**
 * Limpa toda a senha digitada
 */
function limparSenha() {
  if (!stateInput.classList.contains('active')) {
    return;
  }
  senhaDigitada = '';
  feedbackMsg.textContent = '';
  pinDots.forEach(function (dot) {
    dot.classList.remove('filled', 'error');
  });
}

// === Event Listeners ===

// Clique nos botões do teclado virtual
allKeys.forEach(function (key) {
  key.addEventListener('click', function () {
    var valor = key.dataset.key;
    if (key.disabled) return;

    if (valor === 'clear') {
      limparSenha();
    } else if (valor === 'backspace') {
      apagarDigito();
    } else {
      adicionarDigito(valor);
    }
  });
});

// Suporte a teclado físico
document.addEventListener('keydown', function (e) {
  if (allKeys[0].disabled) return;

  if (e.key >= '0' && e.key <= '9') {
    adicionarDigito(e.key);
    destacarBotao(e.key);
  } else if (e.key === 'Backspace') {
    apagarDigito();
    destacarBotao('backspace');
  } else if (e.key === 'Escape' || e.key === 'Delete') {
    limparSenha();
    destacarBotao('clear');
  }
});

/**
 * Efeito visual de pressão no botão virtual
 * ao digitar no teclado físico
 */
function destacarBotao(valor) {
  var btn = document.querySelector('.key[data-key="' + valor + '"]');
  if (btn && !btn.disabled) {
    btn.style.background = 'var(--key-active)';
    btn.style.transform = 'scale(0.95)';
    setTimeout(function () {
      btn.style.background = '';
      btn.style.transform = '';
    }, 120);
  }
}