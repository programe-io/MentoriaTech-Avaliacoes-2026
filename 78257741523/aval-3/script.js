
let heroi = "";
let vida = 100;
let vidaInimigo = 100;
let pontos = 0;
let terminou = false;

function escolherHeroi(nome) {
    heroi = nome;
        document.getElementById("heroi").textContent =
                "🦸 Seu herói: " + nome;

                    document.getElementById("atacar").disabled = false;
                        document.getElementById("mensagem").textContent =
                                nome + ", prepare-se para a batalha!";
                                }

                                function atacar() {
                                    if (!heroi || terminou) return;

                                        let dano = Math.floor(Math.random() * 21) + 10;
                                            vidaInimigo -= dano;

                                                if (vidaInimigo < 0) vidaInimigo = 0;

                                                    if (vidaInimigo === 0) {
                                                            pontos += 100;
                                                                    terminou = true;
                                                                            document.getElementById("mensagem").textContent =
                                                                                        "🏆 Você venceu! +100 pontos!";
                                                                                            } else {
                                                                                                    let danoInimigo = Math.floor(Math.random() * 16) + 5;
                                                                                                            vida -= danoInimigo;

                                                                                                                    if (vida < 0) vida = 0;

                                                                                                                            if (vida === 0) {
                                                                                                                                        terminou = true;
                                                                                                                                                    document.getElementById("mensagem").textContent =
                                                                                                                                                                    "💥 Você perdeu! Tente novamente!";
                                                                                                                                                                            } else {
                                                                                                                                                                                        document.getElementById("mensagem").textContent =
                                                                                                                                                                                                        "⚡ Você causou " + dano +
                                                                                                                                                                                                                        " de dano e recebeu " + danoInimigo + "!";
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                        atualizarTela();
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        function atualizarTela() {
                                                                                                                                                                                                                                            document.getElementById("vida").textContent =
                                                                                                                                                                                                                                                    "❤️ Sua vida: " + vida;

                                                                                                                                                                                                                                                        document.getElementById("inimigo").textContent =
                                                                                                                                                                                                                                                                "👹 Vida do inimigo: " + vidaInimigo;

                                                                                                                                                                                                                                                                    document.getElementById("pontos").textContent =
                                                                                                                                                                                                                                                                            "⭐ Pontuação: " + pontos;

                                                                                                                                                                                                                                                                                document.getElementById("atacar").disabled = terminou;
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                function reiniciar() {
                                                                                                                                                                                                                                                                                    heroi = "";
                                                                                                                                                                                                                                                                                        vida = 100;
                                                                                                                                                                                                                                                                                            vidaInimigo = 100;
                                                                                                                                                                                                                                                                                                pontos = 0;
                                                                                                                                                                                                                                                                                                    terminou = false;

                                                                                                                                                                                                                                                                                                        document.getElementById("heroi").textContent =
                                                                                                                                                                                                                                                                                                                "Escolha seu herói!";

                                                                                                                                                                                                                                                                                                                    document.getElementById("mensagem").textContent =
                                                                                                                                                                                                                                                                                                                            "A aventura está esperando!";

                                                                                                                                                                                                                                                                                                                                document.getElementById("atacar").disabled = true;

                                                                                                                                                                                                                                                                                                                                    atualizarTela();
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                    