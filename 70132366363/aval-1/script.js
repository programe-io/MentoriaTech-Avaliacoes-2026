const senhaCorreta = "7402";
let tentativasRestantes = 3;

function validarSenha() {
    const input = document.getElementById("passwordInput");
    const msg = document.getElementById("msg");
    const triesDisplay = document.getElementById("tries-count");
    const senhaDigitada = input.value;

    // Se ainda houver tentativas
    if (tentativasRestantes > 0) {
        
        if (senhaDigitada === senhaCorreta) {
            // Sucesso
            msg.innerText = "BEM-VINDO! ACESSO LIBERADO.";
            msg.className = "success-text";
            bloquearInterface();
        } else {
            // Erro
            tentativasRestantes--;
            
            if (tentativasRestantes > 0) {
                msg.innerText = "SENHA INCORRETA!";
                msg.className = "error-text";
                triesDisplay.innerText = `Tentativas restantes: ${tentativasRestantes}`;
                input.value = "";
                input.focus();
            } else {
                // Esgotou as tentativas
                msg.innerText = "ACESSO BLOQUEADO!";
                msg.className = "error-text";
                triesDisplay.innerText = "PROCURE SUA AGÊNCIA.";
                bloquearInterface();
            }
        }
    }
}

function limpar() {
    const input = document.getElementById("passwordInput");
    if(!input.disabled) {
        input.value = "";
        input.focus();
    }
}

function bloquearInterface() {
    document.getElementById("passwordInput").disabled = true;
    document.querySelector(".btn-confirm").disabled = true;
    document.querySelector(".btn-clear").disabled = true;
}