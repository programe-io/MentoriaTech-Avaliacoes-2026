let senhaCorreta = "0406";
let tentativasRestantes = 3;

function validarSenha() {
    let tentativa = document.getElementById("senha").value;
    let mensagem = document.getElementById("mensagem");

    if (tentativasRestantes <= 0) {
        mensagem.textContent = "Acesso bloqueado!";
        return;
    }

    if (tentativa === senhaCorreta) {
        mensagem.textContent = "Bem-vindo! Acesso permitido.";
    } else {
        tentativasRestantes--;

        if (tentativasRestantes > 0) {
            mensagem.textContent = "Senha incorreta! Tentativas restantes: " + tentativasRestantes;
        } else {
            mensagem.textContent = "Acesso bloqueado! Número máximo de tentativas atingido.";
        }
    }
}