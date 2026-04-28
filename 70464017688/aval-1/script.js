 let senhaCorreta = "1234";
let tentativas = 3;
let senha;
let autenticado = false;

do {
    senha = prompt(`Digite a senha (Tentativas restantes: \${tentativas\}):`);

    if (senha === senhaCorreta) {
        alert("Bem-vindo!");
        autenticado = true;
    \} else {
        tentativas--;
        if (tentativas > 0) {
            alert("Senha incorreta. Tente novamente.");
        \} else {
            alert("Acesso bloqueado!");
        \}
    \}
\} while (tentativas > 0 && !autenticado);$0