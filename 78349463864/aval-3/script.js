
/* ===== ROBLOX UNIVERSE ===== */

// Botão para abrir o Roblox
function abrirRoblox() {
    window.open(
            "https://www.roblox.com/",
                    "_blank",
                            "noopener,noreferrer"
                                );
                                }

                                // Escolher um jogo
                                function escolherJogo(nome) {
                                    alert("🎮 Você escolheu " + nome + "! Boa diversão!");
                                    }

                                    // Efeito nos cartões de jogos
                                    const cartoes = document.querySelectorAll(".card");

                                    cartoes.forEach((cartao) => {
                                        cartao.addEventListener("mouseenter", () => {
                                                cartao.style.borderColor = "#e2231a";
                                                    });

                                                        cartao.addEventListener("mouseleave", () => {
                                                                cartao.style.borderColor = "#353641";
                                                                    });
                                                                    });

                                                                    // Atualizar o ano automaticamente
                                                                    const ano = document.getElementById("ano");

                                                                    if (ano) {
                                                                        ano.textContent = new Date().getFullYear();
                                                                        }

                                                                        // Mensagem no console
                                                                        console.log("🔥 Roblox Universe iniciado!");

                                                                        