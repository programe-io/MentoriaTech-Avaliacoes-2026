Claro! ⚽ Se você quis dizer **JavaScript**, aqui está um código para deixar o site de futebol interativo. Salve como **`script.js`** e coloque antes de `</body>` no HTML:

```javascript id="7m2q4k"
// ===== SITE DE FUTEBOL - JAVASCRIPT =====

// Mensagem de boas-vindas
window.addEventListener("load", function () {
    console.log("⚽ FutebolBR carregado com sucesso!");
    });


    // ===== BOTÃO DE NOTÍCIAS =====

    const botaoNoticias = document.querySelector(".btn");

    if (botaoNoticias) {
        botaoNoticias.addEventListener("click", function () {
                alert("⚽ Confira as últimas notícias do mundo do futebol!");
                    });
                    }


                    // ===== EFEITO NOS CARDS =====

                    const cards = document.querySelectorAll(".card");

                    cards.forEach(function (card) {

                        card.addEventListener("mouseenter", function () {
                                card.style.transform = "translateY(-8px)";
                                    });

                                        card.addEventListener("mouseleave", function () {
                                                card.style.transform = "translateY(0)";
                                                    });

                                                    });


                                                    // ===== MENU ATIVO =====

                                                    const links = document.querySelectorAll("nav a");

                                                    links.forEach(function (link) {

                                                        link.addEventListener("click", function () {

                                                                links.forEach(function (item) {
                                                                            item.classList.remove("ativo");
                                                                                    });

                                                                                            link.classList.add("ativo");

                                                                                                });

                                                                                                });


                                                                                                // ===== DATA ATUAL =====

                                                                                                const data = new Date();

                                                                                                console.log(
                                                                                                    "Data de acesso:",
                                                                                                        data.toLocaleDateString("pt-BR")
                                                                                                        );


                                                                                                        // ===== BOTÃO PARA VOLTAR AO TOPO =====

                                                                                                        const voltarTopo = document.createElement("button");

                                                                                                        voltarTopo.innerHTML = "↑";
                                                                                                        voltarTopo.title = "Voltar ao topo";

                                                                                                        voltarTopo.style.position = "fixed";
                                                                                                        voltarTopo.style.bottom = "25px";
                                                                                                        voltarTopo.style.right = "25px";
                                                                                                        voltarTopo.style.width = "45px";
                                                                                                        voltarTopo.style.height = "45px";
                                                                                                        voltarTopo.style.border = "none";
                                                                                                        voltarTopo.style.borderRadius = "50%";
                                                                                                        voltarTopo.style.background = "#00d66b";
                                                                                                        voltarTopo.style.color = "#071018";
                                                                                                        voltarTopo.style.fontSize = "22px";
                                                                                                        voltarTopo.style.fontWeight = "bold";
                                                                                                        voltarTopo.style.cursor = "pointer";
                                                                                                        voltarTopo.style.display = "none";
                                                                                                        voltarTopo.style.zIndex = "999";

                                                                                                        document.body.appendChild(voltarTopo);


                                                                                                        // Mostrar botão ao rolar a página

                                                                                                        window.addEventListener("scroll", function () {

                                                                                                            if (window.scrollY > 300) {
                                                                                                                    voltarTopo.style.display = "block";
                                                                                                                        } else {
                                                                                                                                voltarTopo.style.display = "none";
                                                                                                                                    }

                                                                                                                                    });


                                                                                                                                    // Voltar ao topo

                                                                                                                                    voltarTopo.addEventListener("click", function () {

                                                                                                                                        window.scrollTo({
                                                                                                                                                top: 0,
                                                                                                                                                        behavior: "smooth"
                                                                                                                                                            });

                                                                                                                                                            });
                                                                                                                                                            ```

                                                                                                                                                            No seu **`index.html`**, adicione:

                                                                                                                                                            ```html
                                                                                                                                                            <script src="script.js"></script>
                                                                                                                                                            ```

                                                                                                                                                            Agora você terá:

                                                                                                                                                            * ⚽ Interação nos cards
                                                                                                                                                            * 📰 Botão de notícias
                                                                                                                                                            * 📱 Menu funcionando
                                                                                                                                                            * ↑ Botão para voltar ao topo
                                                                                                                                                            * 📅 Data registrada no console
                                                                                                                                                            * ✨ Efeitos ao passar o mouse nos elementos
                                                                                                                                                            