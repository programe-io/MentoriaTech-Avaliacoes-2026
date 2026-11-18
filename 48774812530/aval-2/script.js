// Mensagem de boas-vindas
window.addEventListener("load", function() {
    alert("Bem-vindo ao Blog do Maurício!");
    });

    // Efeito no título
    const titulo = document.querySelector("header h1");

    titulo.addEventListener("click", function() {
        titulo.textContent = "Blog do Maurício - Seja bem-vindo!";
        });

        // Efeito nos jogos
        const jogos = document.querySelectorAll("article");

        jogos.forEach(function(jogo) {
            jogo.addEventListener("click", function() {
                    alert("Você selecionou: " +
                            jogo.querySelector("h3").textContent);
                                });
                                });

                                // Botão para voltar ao início
                                const botao = document.createElement("button");

                                botao.textContent = "Voltar ao início";
                                botao.style.padding = "12px";
                                botao.style.margin = "20px";
                                botao.style.cursor = "pointer";

                                document.body.appendChild(botao);

                                botao.addEventListener("click", function() {
                                    window.scrollTo({
                                            top: 0,
                                                    behavior: "smooth"
                                                        });
                                                        });

                                                        // Mostrar data atual
                                                        const data = new Date();

                                                        console.log("Data atual: " +
                                                        data.toLocaleDateString("pt-BR"));