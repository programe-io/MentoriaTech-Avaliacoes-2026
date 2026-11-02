
// ABRIR E FECHAR PESQUISA

function abrirPesquisa() {

    const pesquisa = document.getElementById("pesquisa");

        pesquisa.classList.toggle("ativa");

            if (pesquisa.classList.contains("ativa")) {

                    document.getElementById("campoPesquisa").focus();

                        }

                        }


                        // FILTRAR OS CARDS

                        function filtrarCards() {

                            const texto = document
                                    .getElementById("campoPesquisa")
                                            .value.toLowerCase();

                                                const cards = document.querySelectorAll(".card");

                                                    cards.forEach(card => {

                                                            const conteudo = card.innerText.toLowerCase();

                                                                    card.style.display =
                                                                                conteudo.includes(texto) ? "block" : "none";

                                                                                    });

                                                                                    }


                                                                                    // BOTÃO VOLTAR AO TOPO

                                                                                    window.addEventListener("scroll", function() {

                                                                                        const botao = document.getElementById("botaoTopo");

                                                                                            if (window.scrollY > 300) {

                                                                                                    botao.classList.add("visivel");

                                                                                                        } else {

                                                                                                                botao.classList.remove("visivel");

                                                                                                                    }

                                                                                                                    });


                                                                                                                    // ANIMAÇÃO DOS CARDS

                                                                                                                    const observador = new IntersectionObserver((entradas) => {

                                                                                                                        entradas.forEach(entrada => {

                                                                                                                                if (entrada.isIntersecting) {

                                                                                                                                            entrada.target.style.opacity = "1";

                                                                                                                                                        entrada.target.style.transform = "translateY(0)";

                                                                                                                                                                    observador.unobserve(entrada.target);

                                                                                                                                                                            }

                                                                                                                                                                                });

                                                                                                                                                                                }, { threshold: 0.15 });


                                                                                                                                                                                document.querySelectorAll(".card").forEach(card => {

                                                                                                                                                                                    card.style.opacity = "0";

                                                                                                                                                                                        card.style.transform = "translateY(30px)";

                                                                                                                                                                                            card.style.transition =
                                                                                                                                                                                                    "opacity .7s ease, transform .7s ease";

                                                                                                                                                                                                        observador.observe(card);

                                                                                                                                                                                                        });
                                                                                                                                                                                                        