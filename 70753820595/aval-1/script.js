const senhaCorreta = "5749";
let tentativasRestantes = 3;

function validarSenha() {
    const input = document.getElementById("senha");
    const mensagem = document.getElementById("mensagem");
    const tentativa = input.value;

    // Se já bloqueou
    if (tentativasRestantes <= 0) {
        mensagem.textContent = "Acesso bloqueado!";
        mensagem.className = "mensagem erro";
        return;
    }

    // Verifica senha
    if (tentativa === senhaCorreta) {
        mensagem.textContent = "Bem-vindo! Acesso permitido.";
        mensagem.className = "mensagem sucesso";
    } else {
        tentativasRestantes--;

        if (tentativasRestantes > 0) {
            mensagem.textContent = "Senha incorreta! Tentativas restantes: " + tentativasRestantes;
            mensagem.className = "mensagem erro";
        } else {
            mensagem.textContent = "Acesso bloqueado! Você esgotou as 3 tentativas.";
            mensagem.className = "mensagem erro";
        }
    }

    // Limpa campo
    input.value = "";
    input.focus();
}