let senhaCorreta = "1234";
let tentativas = 3;

function verificar() {
  let senha = document.getElementById("senha").value;
    let msg = document.getElementById("msg");

      if (senha === senhaCorreta) {
          msg.innerText = "Bem-vindo!";
            } else {
                tentativas--;
                    msg.innerText = "Erro! Restam " + tentativas;

                        if (tentativas === 0) {
                              msg.innerText = "Acesso bloqueado!";
                                  }
                                    }
                                    }