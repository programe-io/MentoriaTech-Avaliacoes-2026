function iniciar() {
    const senhaCorreta = "0406";
    let tentativas = 0;
    let senha;

    do {
        senha = prompt("Digite sua senha:");
        tentativas++;

        if (senha === senhaCorreta) {
            document.getElementById("mensagem").innerText = "Bem-vindo!";
            return;
        } else {
            let restantes = 3 - tentativas;
            if (restantes > 0) {
                alert("Senha incorreta! Você ainda tem " + restantes + " tentativa(s).");
            }
        }

    } while (senha !== senhaCorreta && tentativas < 3);

    document.getElementById("mensagem").innerText = "Acesso bloqueado! Número máximo de tentativas atingido.";
}