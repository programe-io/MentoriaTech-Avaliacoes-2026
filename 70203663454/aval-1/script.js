// Senha correta
const SENHA_CORRETA = "1015";
let tentativasRestantes = 3;

// Elementos do DOM
const senhaInput = document.getElementById('senha');
const btnEntrar = document.getElementById('btnEntrar');
const mensagemDiv = document.getElementById('mensagem');
const tentativasDiv = document.getElementById('tentativas');
const inputContainer = document.querySelector('.input-container');

// Função para limpar mensagem e input
function limparFormulario() {
    mensagemDiv.textContent = '';
    mensagemDiv.className = 'mensagem';
    senhaInput.value = '';
    senhaInput.focus();
}

// Função para mostrar mensagem
function mostrarMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
}

// Função para atualizar tentativas
function atualizarTentativas() {
    tentativasDiv.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

// Event listener para o botão
btnEntrar.addEventListener('click', validarSenha);

// Permitir Enter para validar
senhaInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        validarSenha();
    }
});

// Função principal de validação usando do/while
function validarSenha() {
    const senhaDigitada = senhaInput.value.trim();
    
    // Loop do/while para no máximo 3 tentativas
    do {
        // Validação da primeira tentativa (ou subsequentes)
        if (senhaDigitada === SENHA_CORRETA) {
            // Senha correta
            mostrarMensagem('✅ Acesso liberado! Bem-vindo ao Caixa Eletrônico!', 'sucesso');
            inputContainer.classList.add('oculto');
            tentativasDiv.classList.add('oculto');
            btnEntrar.disabled = true;
            break;
        } else {
            // Senha incorreta
            tentativasRestantes--;
            
            if (tentativasRestantes > 0) {
                mostrarMensagem(`❌ Senha incorreta! Tente novamente.`, 'erro');
                atualizarTentativas();
                limparFormulario();
            } else {
                // Tentativas esgotadas
                mostrarMensagem('🚫 ACESSO BLOQUEADO! Contate o administrador.', 'bloqueado');
                inputContainer.classList.add('oculto');
                tentativasDiv.classList.add('oculto');
                btnEntrar.disabled = true;
                senhaInput.disabled = true;
                break;
            }
        }
        
        // Sai do loop se tentativas acabaram ou senha correta
        if (tentativasRestantes === 0 || senhaDigitada === SENHA_CORRETA) {
            break;
        }
        
        // Aguarda nova entrada (simula próxima iteração do loop)
        return;
        
    } while (tentativasRestantes > 0);
}

// Foco inicial no input
senhaInput.focus();

// Inicializar tentativas
atualizarTentativas();