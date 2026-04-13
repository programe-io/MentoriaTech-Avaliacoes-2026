function validarSenha() {
    let senhaCorreta = "1234";
    let tentativa;
    let tentativasRestantes = 3;
    let mensagem = document.getElementById("mensagem");

    do {
        tentativa = prompt("Digite sua senha:");

        if (tentativa === senhaCorreta) {
            mensagem.innerText = "Bem-vindo! Acesso permitido.";
            mensagem.className = "sucesso";
            return;
        } else {
            tentativasRestantes--;

            if (tentativasRestantes > 0) {
                alert("Senha incorreta! Tentativas restantes: " + tentativasRestantes);
            }
        }

    } while (tentativasRestantes > 0);

    mensagem.innerText = "Acesso bloqueado! Número máximo de tentativas excedido.";
    mensagem.className = "erro";
}