
const seguir = document.getElementById("seguir");
const seguidores = document.getElementById("seguidores");

let seguindo = false;
let quantidade = 1200;

seguir.addEventListener("click", () => {
    seguindo = !seguindo;

        if (seguindo) {
                seguir.textContent = "Seguindo ✓";
                        seguir.style.background =
                                    "linear-gradient(90deg, #24243e, #41416b)";
                                            quantidade++;
                                                } else {
                                                        seguir.textContent = "Seguir";
                                                                seguir.style.background =
                                                                            "linear-gradient(90deg, #a02cff, #ed39b6)";
                                                                                    quantidade--;
                                                                                        }

                                                                                            seguidores.textContent =
                                                                                                    (quantidade / 1000).toFixed(1) + "k";
                                                                                                    });

                                                                                                    // Curtidas
                                                                                                    document.querySelectorAll(".curtir").forEach(botao => {
                                                                                                        botao.addEventListener("click", () => {
                                                                                                                const numero = botao.querySelector("span");
                                                                                                                        let curtidas = Number(numero.textContent);

                                                                                                                                if (botao.classList.contains("ativo")) {
                                                                                                                                            curtidas--;
                                                                                                                                                        botao.classList.remove("ativo");
                                                                                                                                                                    botao.firstChild.textContent = "♡ ";
                                                                                                                                                                            } else {
                                                                                                                                                                                        curtidas++;
                                                                                                                                                                                                    botao.classList.add("ativo");
                                                                                                                                                                                                                botao.firstChild.textContent = "♥ ";
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                numero.textContent = curtidas;
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                    // Mensagem
                                                                                                                                                                                                                                    document.getElementById("mensagem")
                                                                                                                                                                                                                                    .addEventListener("click", () => {
                                                                                                                                                                                                                                        alert("Você está visitando o perfil de João Pedro! ✨");
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        