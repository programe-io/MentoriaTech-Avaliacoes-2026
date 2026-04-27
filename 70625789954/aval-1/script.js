// Senha correta (pode alterar se quiser)
const SENHA_CORRETA = "1234";

let tentativas = 3;

function validarSenha() {
    const input = document.getElementById('senhaInput');
    const mensagem = document.getElementById('mensagem');
    const tentativasRestantes = document.getElementById('tentativasRestantes');
    
    const senhaDigitada = input.value.trim();

    // Verifica se o usuário digitou algo
    if (senhaDigitada === "") {
        mostrarMensagem("Por favor, digite a senha!", "erro");
        return;
    }

    // Verifica se a senha está correta
    if (senhaDigitada === SENHA_CORRETA) {
        mostrarMensagem("✅ Senha correta! Bem-vindo ao seu caixa eletrônico.", "sucesso");
        bloquearInterface(true);
        
        // Simula carregamento e redirecionamento
        setTimeout(() => {
            alert("Bem-vindo! Acesso liberado.");
            // Aqui você poderia redirecionar para outra "tela" do caixa
        }, 1500);
        
    } else {
        tentativas--;
        tentativasRestantes.textContent = tentativas;

        if (tentativas > 0) {
            mostrarMensagem(`Senha incorreta! Você tem ${tentativas} tentativa(s) restante(s).`, "erro");
            input.value = ""; // limpa o campo
            input.focus();
        } else {
            mostrarMensagem("❌ Você esgotou todas as tentativas. Cartão bloqueado!", "erro");
            bloquearInterface(false);
        }
    }
}

// Função para mostrar mensagens com cor
function mostrarMensagem(texto, tipo) {
    const mensagemEl = document.getElementById('mensagem');
    mensagemEl.textContent = texto;
    mensagemEl.className = tipo; // aplica classe sucesso ou erro
}

// Bloqueia ou libera a interface
function bloquearInterface(sucesso) {
    const input = document.getElementById('senhaInput');
    const botao = document.querySelector('button');
    
    input.disabled = true;
    botao.disabled = true;
    
    if (!sucesso) {
        botao.textContent = "ACESSO BLOQUEADO";
        botao.style.background = "#991b1b";
    }
}

// Permite pressionar ENTER para confirmar
document.getElementById('senhaInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        validarSenha();
    }
});