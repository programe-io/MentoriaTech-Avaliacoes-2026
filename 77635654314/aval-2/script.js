// ==============================
// CHATWAVE - JAVASCRIPT
// ==============================


// ==============================
// PESQUISA
// ==============================

const campoBusca = document.createElement("input");

campoBusca.type = "text";
campoBusca.placeholder = "🔍 Pesquisar conversas...";
campoBusca.style.display = "none";

document.querySelector("header").appendChild(campoBusca);

campoBusca.addEventListener("input", function () {

    const pesquisa = this.value.toLowerCase();
        const conversas = document.querySelectorAll("article");

            conversas.forEach(function (conversa) {

                    const texto = conversa.textContent.toLowerCase();

                            if (texto.includes(pesquisa)) {
                                        conversa.style.display = "block";
                                                } else {
                                                            conversa.style.display = "none";
                                                                    }

                                                                        });
                                                                        });


                                                                        // ==============================
                                                                        // BOTÃO DE BUSCA
                                                                        // ==============================

                                                                        const botoesHeader = document.querySelectorAll("header button");

                                                                        botoesHeader[0].addEventListener("click", function () {

                                                                            if (campoBusca.style.display === "none") {

                                                                                    campoBusca.style.display = "block";
                                                                                            campoBusca.focus();

                                                                                                } else {

                                                                                                        campoBusca.style.display = "none";
                                                                                                                campoBusca.value = "";

                                                                                                                        document.querySelectorAll("article").forEach(function (item) {
                                                                                                                                    item.style.display = "block";
                                                                                                                                            });
                                                                                                                                                }
                                                                                                                                                });


                                                                                                                                                // ==============================
                                                                                                                                                // ABRIR CONVERSAS
                                                                                                                                                // ==============================

                                                                                                                                                const botoesConversa = document.querySelectorAll("article button");

                                                                                                                                                botoesConversa.forEach(function (botao) {

                                                                                                                                                    botao.addEventListener("click", function () {

                                                                                                                                                            const conversa = this.closest("article");
                                                                                                                                                                    const nome = conversa.querySelector("h3").textContent;

                                                                                                                                                                            alert(
                                                                                                                                                                                        "💬 Abrindo conversa com " +
                                                                                                                                                                                                    nome +
                                                                                                                                                                                                                "...\