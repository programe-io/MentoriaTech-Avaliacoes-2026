let botoes = document.querySelectorAll(".reacao");

botoes.forEach(function(botao) {
    let curtidas = 0;

        botao.addEventListener("click", function() {
                if (botao.classList.contains("curtido")) {
                            curtidas--;
                                        botao.classList.remove("curtido");
                                                } else {
                                                            curtidas++;
                                                                        botao.classList.add("curtido");
                                                                                }

                                                                                        botao.querySelector("span").textContent = curtidas;
                                                                                            });
                                                                                            });

                                                                                            let botaoDica = document.getElementById("dica");
                                                                                            let mensagem = document.getElementById("mensagem");

                                                                                            let dicas = [
                                                                                                "O azul-marinho combina muito bem com branco-gelo!",
                                                                                                    "Os acessórios podem transformar uma combinação simples.",
                                                                                                        "Misturar cores pode deixar seu visual mais interessante!",
                                                                                                            "O mais importante é escolher um estilo que represente você."
                                                                                                            ];

                                                                                                            let numero = 0;

                                                                                                            botaoDica.addEventListener("click", function() {
                                                                                                                mensagem.textContent = dicas[numero];

                                                                                                                    numero++;

                                                                                                                        if (numero >= dicas.length) {
                                                                                                                                numero = 0;
                                                                                                                                    }
                                                                                                                                    });