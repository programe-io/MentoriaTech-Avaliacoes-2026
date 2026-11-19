
const pesquisa = document.getElementById("pesquisa");
const artistas = document.querySelectorAll(".artista");

pesquisa.addEventListener("input", () => {
    artistas.forEach(artista => {
            artista.style.display =
                        artista.textContent.toLowerCase()
                                    .includes(pesquisa.value.toLowerCase())
                                                ? "block" : "none";
                                                    });
                                                    });
                                                    