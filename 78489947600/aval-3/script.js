// Lista com mensagens motivacionais de apoio
const mensagensPositivas = [
    "💛 Você é importante!",
        "✨ Deus está contigo!",
            "🤝 Não fique sozinha, procure ajuda!",
                "🌟 Sua vida tem um valor inestimável e você não está só!",
                    "💛 Falar é a melhor opção. Existe sempre alguém pronto para te ouvir!",
                        "🌱 Dias difíceis passam. Permita-se receber ajuda e cuidado."
                        ];

                        // Seleciona os elementos do HTML
                        const botao = document.getElementById("btnMensagem");
                        const caixaMensagem = document.getElementById("textoMensagem");

                        // Adiciona a ação de clique ao botão
                        botao.addEventListener("click", function() {
                            // Sorteia uma mensagem da lista
                                const indiceAleatorio = Math.floor(Math.random() * mensagensPositivas.length);
                                    
                                        // Insere a mensagem e exibe a caixa na tela
                                            caixaMensagem.innerText = mensagensPositivas[indiceAleatorio];
                                                caixaMensagem.style.display = "block";
                                                });
                                                