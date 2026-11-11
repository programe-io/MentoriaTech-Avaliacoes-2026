
const menu = document.getElementById("menu");

menu.addEventListener("click", function() {
    alert("Bem-vinda ao Instagram da Lavínnya! 💜");
    });

    // Interação dos destaques
    const destaques = document.querySelectorAll(".item");

    destaques.forEach(function(item) {

        item.addEventListener("click", function() {

                const nome = item.querySelector("span").textContent;

                        alert("Você selecionou: " + nome + " 💜");

                            });

                            });

                            // Curtidas nas publicações
                            const publicacoes = document.querySelectorAll(".publicacoes img");

                            publicacoes.forEach(function(foto) {

                                foto.addEventListener("click", function() {

                                        foto.classList.toggle("curtida");

                                            });

                                            });
                                            