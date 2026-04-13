function iniciar() {
    const senhaCorreta = "2345";
    let tentativas = 0;
    let senha;

    do {
        senha = prompt("Digite a senha:");

        if (senha === senhaCorreta) {
            document.getElementById("mensagem").innerText = "Bem-vindo!";
            return;
        } else {
            tentativas++;
            let restantes = 3 - tentativas;

            if (restantes > 0) {
                alert("Senha incorreta! Tentativas restantes: " + restantes);
            }
        }

    } while (tentativas < 3);

    document.getElementById("mensagem").innerText = "Acesso bloqueado!";
}