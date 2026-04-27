function validarSenha() {
    const campoSenha = document.getElementById("senhaInput");
    const msgElemento = document.getElementById("message");
    const tentativasElemento = document.getElementById("tries-left");
    const botao = document.getElementById("btnConfirmar");

    const senhaDigitada = campoSenha.value;

    if (senhaDigitada === senhaCorreta) {
        msgElemento.innerHTML = "✅ Bem-vindo!<br>Acesso liberado.";
        msgElemento.style.color = "#2ecc71";
        finalizarSistema(botao, campoSenha);
    } else {
        tentativasRestantes--;
        
        if (tentativasRestantes > 0) {
            msgElemento.innerText = "Senha Incorreta! Tente novamente.";
            msgElemento.style.color = "#e74c3c";
            tentativasElemento.innerText = `Tentativas restantes: ${tentativasRestantes}`;
            campoSenha.value = ""; // Limpa o campo para nova tentativa
            campoSenha.focus();
        } else {
            msgElemento.innerText = "❌ ACESSO BLOQUEADO!";
            msgElemento.style.color = "#c0392b";
            tentativasElemento.innerText = "Procure sua agência.";
            finalizarSistema(botao, campoSenha);
        }
    }
}

function finalizarSistema(btn, input) {
    btn.disabled = true;
    input.disabled = true;
}