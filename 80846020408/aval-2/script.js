// SITE DA ELIZABETH LIONES 🌸

// 1. Mensagem de boas-vindas
window.addEventListener("load", function () {
    console.log("Bem-vindo ao mundo da Elizabeth Liones!");

        const mensagem = document.querySelector("#boas-vindas");

            if (mensagem) {
                    mensagem.textContent =
                                "🌸 Bem-vindo ao mundo mágico da Elizabeth Liones! 🌸";
                                    }
                                    });

                                    // 2. Botão para voltar ao topo
                                    const botaoTopo = document.querySelector("#voltar-topo");

                                    if (botaoTopo) {
                                        botaoTopo.addEventListener("click", function () {
                                                window.scrollTo({
                                                            top: 0,
                                                                        behavior: "smooth"
                                                                                });
                                                                                    });
                                                                                    }

                                                                                    // 3. Efeito nas imagens da galeria
                                                                                    const imagens = document.querySelectorAll(".galeria img");

                                                                                    imagens.forEach(function (imagem) {
                                                                                        imagem.addEventListener("click", function () {
                                                                                                imagem.classList.toggle("imagem-selecionada");
                                                                                                    });
                                                                                                    });

                                                                                                    // 4. Botão para mostrar curiosidades
                                                                                                    const botaoCuriosidades =
                                                                                                        document.querySelector("#botao-curiosidades");

                                                                                                        const curiosidades =
                                                                                                            document.querySelector("#curiosidades");

                                                                                                            if (botaoCuriosidades && curiosidades) {
                                                                                                                botaoCuriosidades.addEventListener("click", function () {
                                                                                                                        const estaOculto =
                                                                                                                                    curiosidades.style.display === "none";

                                                                                                                                            curiosidades.style.display =
                                                                                                                                                        estaOculto ? "block" : "none";

                                                                                                                                                                botaoCuriosidades.textContent =
                                                                                                                                                                            estaOculto
                                                                                                                                                                                            ? "Esconder curiosidades"
                                                                                                                                                                                                            : "Mostrar curiosidades";
                                                                                                                                                                                                                });
                                                                                                                                                                                                                }

                                                                                                                                                                                                                // 5. Botão para mudar o tema
                                                                                                                                                                                                                const botaoTema = document.querySelector("#mudar-tema");

                                                                                                                                                                                                                if (botaoTema) {
                                                                                                                                                                                                                    botaoTema.addEventListener("click", function () {
                                                                                                                                                                                                                            document.body.classList.toggle("tema-rosa");

                                                                                                                                                                                                                                    botaoTema.textContent =
                                                                                                                                                                                                                                                document.body.classList.contains("tema-rosa")
                                                                                                                                                                                                                                                                ? "Voltar ao tema original"
                                                                                                                                                                                                                                                                                : "Ativar tema rosa";
                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                    // 6. Mensagem especial
                                                                                                                                                                                                                                                                                    const botaoMensagem =
                                                                                                                                                                                                                                                                                        document.querySelector("#mensagem-especial");

                                                                                                                                                                                                                                                                                        if (botaoMensagem) {
                                                                                                                                                                                                                                                                                            botaoMensagem.addEventListener("click", function () {
                                                                                                                                                                                                                                                                                                    alert(
                                                                                                                                                                                                                                                                                                                "💗 Elizabeth Liones é gentil, corajosa " +
                                                                                                                                                                                                                                                                                                                            "e está sempre disposta a ajudar quem precisa! 🌸"
                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                        }