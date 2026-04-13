let tentativasRestantes = 3;
const senhaCorreta = "2860";

function validarAcesso() {
    const input = document.getElementById('passwordInput');
    const feedback = document.getElementById('feedback');
    const senhaDigitada = input.value;

    // Lógica principal usando o conceito de do/while para validação
    // Nota: Em um sistema real com interface, o "loop" é controlado 
    // pelo estado das variáveis a cada clique do usuário.
    
    if (tentativasRestantes > 0) {
        if (senhaDigitada === senhaCorreta) {
            feedback.innerHTML = "✅ Acesso concedido. Bem-vindo!";
            feedback.className = "message success";
            bloquearInterface(true);
        } else {
            tentativasRestantes--;
            
            if (tentativasRestantes > 0) {
                feedback.innerHTML = `❌ Senha incorreta! <br> Você tem mais ${tentativasRestantes} tentativa(s).`;
                feedback.className = "message error";
            } else {
                feedback.innerHTML = "🚨 ACESSO BLOQUEADO! <br> Limite de tentativas excedido.";
                feedback.className = "message error";
                bloquearInterface(true);
            }
        }
    }
    input.value = ""; // Limpa o campo após a tentativa
}

function bloquearInterface(encerrar) {
    if (encerrar) {
        document.getElementById('passwordInput').disabled = true;
        document.querySelector('button').disabled = true;
    }
}