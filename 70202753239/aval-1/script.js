const senhaCorreta = "1307";
let tentativas = 3;

function validarSenha() {

    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (tentativas > 0) {

        if (senha === senhaCorreta) {

            mensagem.style.color = "green";
            mensagem.innerHTML = "Bem-vindo! Acesso permitido.";

        } else {

            tentativas--;

            if (tentativas > 0) {

                mensagem.style.color = "orange";
                mensagem.innerHTML =
                    "Senha incorreta! Restam " +
                    tentativas +
                    " tentativa(s).";

            } else {

                mensagem.style.color = "red";
                mensagem.innerHTML =
                    "Acesso bloqueado! Número máximo de tentativas atingido.";

                document.getElementById("senha").disabled = true;
            }
        }
    }
}