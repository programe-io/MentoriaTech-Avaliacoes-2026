const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");
const jogos = document.querySelectorAll(".jogo");

function filtrarJogos() {
    const texto = pesquisa.value.toLowerCase();
        const tipo = categoria.value;

            jogos.forEach(jogo => {
                    const nome = jogo.querySelector("h3").textContent.toLowerCase();
                            const categoriaJogo = jogo.dataset.categoria;

                                    const nomeCorreto = nome.includes(texto);
                                            const categoriaCorreta =
                                                        tipo === "todos" || categoriaJogo === tipo;

                                                                if (nomeCorreto && categoriaCorreta) {
                                                                            jogo.style.display = "block";
                                                                                    } else {
                                                                                                jogo.style.display = "none";
                                                                                                        }
                                                                                                            });
                                                                                                            }

                                                                                                            pesquisa.addEventListener("input", filtrarJogos);
                                                                                                            categoria.addEventListener("change", filtrarJogos);

                                                                                                            function verJogo(nome) {
                                                                                                                alert("Você selecionou o jogo: " + nome);
                                                                                                                }