let curtidas = 0;

document.getElementById("btnCurtir").addEventListener("click", function() {
  curtidas++;
    document.getElementById("contador").textContent = curtidas;
    });

    document.getElementById("btnTema").addEventListener("click", function() {
      document.body.classList.toggle("escuro");
        if (document.body.classList.contains("escuro")) {
            this.textContent = "☀️ Modo Claro";
              } else {
                  this.textContent = "🌙 Modo Escuro";
                    }
                    });

                    document.getElementById("btnEnviar").addEventListener("click", function() {
                      let nome = document.getElementById("nome").value;
                        let msg = document.getElementById("mensagem");
                          if (nome === "") {
                              msg.textContent = "⚠️ Por favor, digite seu nome primeiro!";
                                  msg.style.color = "red";
                                    } else {
                                        msg.textContent = "✅ Obrigado, " + nome + "! Seu formulário foi enviado com sucesso!";
                                            msg.style.color = "green";
                                              }
                                              });