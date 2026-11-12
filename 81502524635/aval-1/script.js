
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    alert("Bem-vindo ao Blog Mundo Digital!");
    });

    // Pesquisa de artigos
    function pesquisarArtigos() {
        let pesquisa = document
                .getElementById("pesquisa")
                        .value.toLowerCase();

                            let artigos = document.querySelectorAll(".post");

                                artigos.forEach(function(artigo) {
                                        let texto = artigo.innerText.toLowerCase();

                                                if (texto.includes(pesquisa)) {
                                                            artigo.style.display = "block";
                                                                    } else {
                                                                                artigo.style.display = "none";
                                                                                        }
                                                                                            });
                                                                                            }

                                                                                            // Mensagem de contato
                                                                                            function mostrarMensagem() {
                                                                                                alert("Obrigado por visitar nosso Blog!");
                                                                                                }
                                                                                                