function filtrar(categoria) {

        const videos = document.querySelectorAll(".video");

            videos.forEach(video => {

                    if (categoria === "todos") {
                                video.style.display = "block";
                                        }

                                                else if (video.dataset.category === categoria) {
                                                            video.style.display = "block";
                                                                    }

                                                                            else {
                                                                                        video.style.display = "none";
                                                                                                }
                                                                                                    });
                                                                                                    }


                                                                                                    function pesquisar() {

                                                                                                        const texto =
                                                                                                                document
                                                                                                                        .getElementById("searchInput")
                                                                                                                                .value
                                                                                                                                        .toLowerCase();

                                                                                                                                            const videos =
                                                                                                                                                    document.querySelectorAll(".video");

                                                                                                                                                        videos.forEach(video => {

                                                                                                                                                                const titulo =
                                                                                                                                                                            video.querySelector("h3")
                                                                                                                                                                                        .textContent
                                                                                                                                                                                                    .toLowerCase();

                                                                                                                                                                                                            if (titulo.includes(texto)) {
                                                                                                                                                                                                                        video.style.display = "block";
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                            video.style.display = "none";
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                        }


                                                                                                                                                                                                                                                        /* Pesquisa apertando ENTER */

                                                                                                                                                                                                                                                        document
                                                                                                                                                                                                                                                        .getElementById("searchInput")
                                                                                                                                                                                                                                                        .addEventListener("keypress", function(event) {

                                                                                                                                                                                                                                                            if (event.key === "Enter") {
                                                                                                                                                                                                                                                                    pesquisar();
                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                        });
}