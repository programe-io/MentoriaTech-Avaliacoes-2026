function validarSenha() {
    const senhaCorreta = "1515";
    let tentativa;
    let tentativasRestantes = 3;

    do {
        tentativa = prompt("Digite sua senha:");

        if (tentativa === senhaCorreta) {
            document.getElementById("mensagem").textContent = "✅ Bem-vindo!";
            return;
        } else {
            tentativasRestantes--;
            
            if (tentativasRestantes > 0) {
                alert("❌ Senha incorreta! Tentativas restantes: " + tentativasRestantes);
            }
        }

    } while (tentativasRestantes > 0);

    document.getElementById("mensagem").textContent = "🚫 Acesso bloqueado!";
}