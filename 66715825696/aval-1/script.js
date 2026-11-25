
// =================================
// GAMEZONE - JAVASCRIPT
// =================================

// PESQUISAR NOTÍCIAS E JOGOS
function pesquisar() {
    const texto = document
            .getElementById("search")
                    .value.toLowerCase();

                        const cards = document.querySelectorAll("#games .card");

                            cards.forEach(card => {
                                    const conteudo = card.innerText.toLowerCase();

                                            if (conteudo.includes(texto)) {
                                                        card.classList.remove("hidden");
                                                                } else {
                                                                            card.classList.add("hidden");
                                                                                    }
                                                                                        });
                                                                                        }

                                                                                        // LER NOTÍCIAS
                                                                                        function ler(titulo, texto) {
                                                                                            alert(titulo + "\n\n" + texto);
                                                                                            }

                                                                                            // MENSAGEM DE BOAS-VINDAS
                                                                                            window.addEventListener("load", function() {
                                                                                                console.log("🎮 GameZone carregado com sucesso!");
                                                                                                });

                                                                                                // BOTÃO VOLTAR AO TOPO
                                                                                                const botaoTopo = document.createElement("button");

                                                                                                botaoTopo.innerText = "⬆ Voltar ao topo";
                                                                                                botaoTopo.id = "botaoTopo";

                                                                                                botaoTopo.style.position = "fixed";
                                                                                                botaoTopo.style.bottom = "20px";
                                                                                                botaoTopo.style.right = "20px";
                                                                                                botaoTopo.style.padding = "12px";
                                                                                                botaoTopo.style.background = "#8b35ff";
                                                                                                botaoTopo.style.color = "white";
                                                                                                botaoTopo.style.border = "none";
                                                                                                botaoTopo.style.borderRadius = "8px";
                                                                                                botaoTopo.style.cursor = "pointer";
                                                                                                botaoTopo.style.display = "none";

                                                                                                document.body.appendChild(botaoTopo);

                                                                                                window.addEventListener("scroll", function() {
                                                                                                    if (window.scrollY > 300) {
                                                                                                            botaoTopo.style.display = "block";
                                                                                                                } else {
                                                                                                                        botaoTopo.style.display = "none";
                                                                                                                            }
                                                                                                                            });

                                                                                                                            botaoTopo.addEventListener("click", function() {
                                                                                                                                window.scrollTo({
                                                                                                                                        top: 0,
                                                                                                                                                behavior: "smooth"
                                                                                                                                                    });
                                                                                                                                                    });

                                                                                                                                                    // ANIMAÇÃO DOS CARDS
                                                                                                                                                    const cards = document.querySelectorAll(".card");

                                                                                                                                                    cards.forEach(card => {
                                                                                                                                                        card.addEventListener("mouseenter", function() {
                                                                                                                                                                card.style.transition = "0.3s";
                                                                                                                                                                    });
                                                                                                                                                                    });

                                                                                                                                                                    // ANO AUTOMÁTICO NO RODAPÉ
                                                                                                                                                                    const rodape = document.querySelector("footer");

                                                                                                                                                                    if (rodape) {
                                                                                                                                                                        rodape.innerHTML = rodape.innerHTML.replace(
                                                                                                                                                                                "2026",
                                                                                                                                                                                        new Date().getFullYear()
                                                                                                                                                                                            );
                                                                                                                                                                                            }

                                                                                                                                                                                            console.log("🚀 GameZone está funcionando!");
                                                                                                                                                                                            