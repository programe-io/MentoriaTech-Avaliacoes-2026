const senhaCorreta = "1209";
let tentativasRestantes = 3;

function validarSenha() {
    const input = document.getElementById("senhaInput");
    const status = document.getElementById("status");
    const senhaDigitada = input.value;

    // Lógica principal
    if (tentativasRestantes > 0) {
        if (senhaDigitada === senhaCorreta) {
            status.innerHTML = "✅ Boas-vindas! Acesso liberado.";
            status.style.color = "green";
            bloquearEntrada();
        } else {
            tentativasRestantes--;
            if (tentativasRestantes === 0) {
                status.innerHTML = "❌ Acesso bloqueado! Tentativas esgotadas.";
                status.style.color = "red";
                bloquearEntrada();
            } else {
                status.innerHTML = `Senha incorreta! Restam ${tentativasRestantes} tentativas.`;
                status.style.color = "orange";
            }
        }
    }
    input.value = ""; // Limpa o campo
}

function bloquearEntrada() {
    document.getElementById("senhaInput").disabled = true;
    document.querySelector("button").disabled = true;
}