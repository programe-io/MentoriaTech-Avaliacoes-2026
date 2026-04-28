const senhaCorreta = "7810";
let tentativasRestantes = 3;

function validarSenha() {
    const input = document.getElementById("senha");
    const mensagem = document.getElementById("mensagem");
    const tentativa = input.value;

    // Verifica se já está bloqueado
    if (tentativasRestantes <= 0) {
        mensagem.textContent = "Acesso bloqueado!";
        mensagem.className = "erro";
        return;
    }

    // Validação da senha
    if (tentativa === senhaCorreta) {
        mensagem.textContent = "Bem-vindo! Acesso permitido.";
        mensagem.className = "sucesso";
    } else {
        tentativasRestantes--;

        if (tentativasRestantes > 0) {
            mensagem.textContent = "Senha incorreta! Tentativas restantes: " + tentativasRestantes;
            mensagem.className = "erro";
        } else {
            mensagem.textContent = "Acesso bloqueado! Você esgotou as 3 tentativas.";
            mensagem.className = "erro";
        }
    }

    // Limpa o campo
    input.value = "";
    input.focus();
}