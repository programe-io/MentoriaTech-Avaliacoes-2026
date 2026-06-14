// Mensagem de boas-vindas
window.onload = function () {
    alert("🌸 Seja bem-vindo(a) ao Blog Estudantil da Lavinnya Macedo!");
    };

    // Mudar a cor de fundo
    function mudarCor() {
        const cores = [
                "#ffe4ef",
                        "#ffd6e8",
                                "#fff0f5",
                                        "#fce4ec",
                                                "#f8bbd0"
                                                    ];

                                                        const cor = cores[Math.floor(Math.random() * cores.length)];
                                                            document.body.style.backgroundColor = cor;
                                                            }

                                                            // Mostrar mensagem de incentivo
                                                            function mostrarMensagem() {
                                                                alert("💖 Nunca desista dos seus sonhos! Continue estudando e dando o seu melhor. 📚");
                                                                }

                                                                // Mostrar a data atual no rodapé
                                                                const data = new Date();
                                                                const rodape = document.querySelector("footer p");

                                                                if (rodape) {
                                                                    rodape.innerHTML += "<br>📅 " + data.toLocaleDateString("pt-BR");
                                                                    }