const senhaCorreta = "2009";
let tentativasRestantes = 3;

function validarSenha() {
    const input = document.getElementById("campoSenha");
    const display = document.getElementById("mensagem");
    const senhaDigitada = input.value;

    // Se ainda houver tentativas e o acesso não foi concedido
    if (tentativasRestantes > 0) {
        if (senhaDigitada === senhaCorreta) {
            display.innerText = "Seja bem-vindo! Acesso liberado.";
            display.style.color = "green";
            input.disabled = true; // Desabilita o campo após sucesso
        } else {
            tentativasRestantes--;
            
            if (tentativasRestantes > 0) {
                display.innerText = `Senha incorreta! Restam ${tentativasRestantes} tentativas.`;
                display.style.color = "orange";
            } else {
                display.innerText = "ACESSO BLOQUEADO!";
                display.style.color = "red";
                input.disabled = true; // Bloqueia o campo
            }
        }
    }
    input.value = ""; // Limpa o campo após a tentativa
}