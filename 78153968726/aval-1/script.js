document.addEventListener("DOMContentLoaded", () => {
        const botao = document.getElementById("botao");
            const mensagem = document.getElementById("mensagem");

                if (botao && mensagem) {
                        botao.addEventListener("click", () => {
                                    mensagem.innerHTML = `
                                                    <h2>💙 Uma mensagem especial 💙</h2>
                                                                    <p>
                                                                                        Janaina, você é uma pessoa especial.
                                                                                                            Que seu dia seja cheio de alegria,
                                                                                                                                paz, felicidade e momentos incríveis!
                                                                                                                                                </p>
                                                                                                                                                            `;

                                                                                                                                                                        botao.textContent = "Mensagem aberta 💙";
                                                                                                                                                                                    botao.disabled = true;
                                                                                                                                                                                            });
                                                                                                                                                                                                }

                                                                                                                                                                                                    // Animação de corações
                                                                                                                                                                                                        function criarCoracao() {
                                                                                                                                                                                                                const coracao = document.createElement("span");

                                                                                                                                                                                                                        coracao.textContent = "💙";
                                                                                                                                                                                                                                coracao.classList.add("coracao");

                                                                                                                                                                                                                                        coracao.style.left = Math.random() * 100 + "vw";
                                                                                                                                                                                                                                                coracao.style.animationDuration = (3 + Math.random() * 3) + "s";

                                                                                                                                                                                                                                                        document.body.appendChild(coracao);

                                                                                                                                                                                                                                                                setTimeout(() => {
                                                                                                                                                                                                                                                                            coracao.remove();
                                                                                                                                                                                                                                                                                    }, 6000);
                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                            setInterval(criarCoracao, 700);
                                                                                                                                                                                                                                                                                            });
})