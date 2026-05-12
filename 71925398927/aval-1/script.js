let senhaCorreta = "348090";
let diaNascimento = "01/01/2001";
let senha;
let tentativas = 0;
let tentativasMaximas = 3;

do {
    senha = prompt("Digite a senha:");

    if (senha === senhaCorreta) {
        alert("Ok, é você.");
        break;
    } else {
        tentativas++;

        if (tentativas < tentativasMaximas) {
            alert("Senha errada. Restam " + (tentativasMaximas - tentativas) + " tentativas.");
        } else {
            let resposta = prompt("Você errou demais. Quer recuperar sua senha? (sim/não)");

            if (resposta.toLowerCase() === "sim") {
                let recuperar = prompt("Digite o dia em que você nasceu:");

                if (recuperar === diaNascimento) {
                    senhaCorreta = prompt("Crie uma nova senha:");
                    alert("Senha redefinida!");
                    break;
                } else {
                    alert("Resposta incorreta.");
                }
            } else {
                alert("Até mais.");
            }
        }
    }

} while (tentativas < tentativasMaximas);