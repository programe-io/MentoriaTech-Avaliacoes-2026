
function verificarSenha() {
    const senhaCorreta = "1234";
    let senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    do {
        if (senha === "") {
            mensagem.textContent = "Digite sua senha!";
            return;
        }

        if (senha !== senhaCorreta) {
            mensagem.textContent = "Senha incorreta! Tente novamente.";
            return;
        }

    } while (senha !== senhaCorreta);

    mensagem.textContent = "Acesso autorizado!";
}
