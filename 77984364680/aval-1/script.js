
const pesquisa = document.getElementById("pesquisa");
const noticias = document.querySelectorAll(".card");

pesquisa.addEventListener("input", function () {
    const texto = pesquisa.value.toLowerCase();

        noticias.forEach(function (noticia) {
                const conteudo = noticia.innerText.toLowerCase();

                        if (conteudo.includes(texto)) {
                                    noticia.style.display = "block";
                                            } else {
                                                        noticia.style.display = "none";
                                                                }
                                                                    });
                                                                    });
                                                                    