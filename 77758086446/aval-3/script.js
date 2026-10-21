
/* Função para alternar o Dark Mode */
function alternarTema() {
    document.body.classList.toggle("dark-mode");

        const botao = document.querySelector("button");

            if (document.body.classList.contains("dark-mode")) {
                    botao.textContent = "Ativar modo claro";
                        } else {
                                botao.textContent = "Ativar Dark Mode";
                                    }
                                    }

                                    /* Função para mostrar ou ocultar um elemento */
                                    function alternarVisibilidade() {
                                        const elemento = document.getElementById("texto");

                                            if (elemento.style.display === "none") {
                                                    elemento.style.display = "block";
                                                        } else {
                                                                elemento.style.display = "none";
                                                                    }
                                                                    }

                                                                    /* Mensagem de boas-vindas */
                                                                    window.addEventListener("load", function() {
                                                                        console.log("Bem-vindo ao site de Display, Visibilidade e Dark Mode!");
                                                                        });