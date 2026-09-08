function mostrarMensagem() {
        alert("🎀 Escolha um dos jogos abaixo e divirta-se! 💗");
        }


        // 🧠 QUIZ
        function quiz() {

            let resposta = prompt(
                    "🧠 QUIZ PINK PLAY\n\n" +
                            "Qual planeta é conhecido como Planeta Vermelho?\n\n" +
                                    "A) Terra\n" +
                                            "B) Marte\n" +
                                                    "C) Júpiter"
                                                        );

                                                            if (resposta && resposta.toUpperCase() === "B") {
                                                                    alert("🎉 Acertou! Marte é o Planeta Vermelho!");
                                                                        } else {
                                                                                alert("😊 Quase! A resposta correta é Marte.");
                                                                                    }
                                                                                    }


                                                                                    // 🍀 NÚMERO SECRETO
                                                                                    function numeroSecreto() {

                                                                                        const numero = Math.floor(Math.random() * 10) + 1;

                                                                                            let tentativa = prompt(
                                                                                                    "🍀 Adivinhe o número secreto!\n\n" +
                                                                                                            "Escolhi um número entre 1 e 10."
                                                                                                                );

                                                                                                                    if (Number(tentativa) === numero) {
                                                                                                                            alert("🎉 Você acertou!");
                                                                                                                                } else {
                                                                                                                                        alert(
                                                                                                                                                    "💗 Não foi dessa vez!\n" +
                                                                                                                                                                "O número era " + numero + "."
                                                                                                                                                                        );
                                                                                                                                                                            }
                                                                                                                                                                            }


                                                                                                                                                                            // ✊ PEDRA, PAPEL E TESOURA
                                                                                                                                                                            function ppt() {

                                                                                                                                                                                const escolhas = ["pedra", "papel", "tesoura"];

                                                                                                                                                                                    let jogador = prompt(
                                                                                                                                                                                            "✊ PEDRA, PAPEL E TESOURA\n\n" +
                                                                                                                                                                                                    "Digite:\n" +
                                                                                                                                                                                                            "pedra\n" +
                                                                                                                                                                                                                    "papel\n" +
                                                                                                                                                                                                                            "tesoura"
                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                    if (!jogador) return;

                                                                                                                                                                                                                                        jogador = jogador.toLowerCase();

                                                                                                                                                                                                                                            if (!escolhas.includes(jogador)) {
                                                                                                                                                                                                                                                    alert("⚠️ Escolha inválida!");
                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                    const computador =
                                                                                                                                                                                                                                                                            escolhas[Math.floor(Math.random() * escolhas.length)];

                                                                                                                                                                                                                                                                                let resultado = "";

                                                                                                                                                                                                                                                                                    if (jogador === computador) {
                                                                                                                                                                                                                                                                                            resultado = "🤝 Empate!";
                                                                                                                                                                                                                                                                                                } else if (
                                                                                                                                                                                                                                                                                                        (jogador === "pedra" && computador === "tesoura") ||
                                                                                                                                                                                                                                                                                                                (jogador === "papel" && computador === "pedra") ||
                                                                                                                                                                                                                                                                                                                        (jogador === "tesoura" && computador === "papel")
                                                                                                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                                                                                                    resultado = "🎉 Você venceu!";
                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                resultado = "💻 O computador venceu!";
                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                        alert(
                                                                                                                                                                                                                                                                                                                                                                "Você: " + jogador +
                                                                                                                                                                                                                                                                                                                                                                        "\nComputador: " + computador +
                                                                                                                                                                                                                                                                                                                                                                                "\n\n" + resultado
                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                    }


                                                                                                                                                                                                                                                                                                                                                                                    // 💖 JOGO DA SORTE
                                                                                                                                                                                                                                                                                                                                                                                    function sorte() {

                                                                                                                                                                                                                                                                                                                                                                                        const mensagens = [
                                                                                                                                                                                                                                                                                                                                                                                                "✨ Hoje pode ser um ótimo dia para aprender algo novo!",
                                                                                                                                                                                                                                                                                                                                                                                                        "🌸 Continue acreditando nos seus sonhos!",
                                                                                                                                                                                                                                                                                                                                                                                                                "🎀 Uma surpresa agradável pode aparecer em breve!",
                                                                                                                                                                                                                                                                                                                                                                                                                        "💖 Você consegue conquistar coisas incríveis!",
                                                                                                                                                                                                                                                                                                                                                                                                                                "🌟 Nunca pare de tentar!"
                                                                                                                                                                                                                                                                                                                                                                                                                                    ];

                                                                                                                                                                                                                                                                                                                                                                                                                                        const mensagem =
                                                                                                                                                                                                                                                                                                                                                                                                                                                mensagens[Math.floor(Math.random() * mensagens.length)];

                                                                                                                                                                                                                                                                                                                                                                                                                                                    alert("💌 Sua mensagem:\n\n" + mensagem);
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
}