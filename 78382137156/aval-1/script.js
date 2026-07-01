// Botões de detalhes

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

            const texto = botao.nextElementSibling;

                    if(texto.style.display === "block"){

                                texto.style.display="none";
                                            botao.innerText="Ver detalhes";

                                                    }else{

                                                                texto.style.display="block";
                                                                            botao.innerText="Ocultar";

                                                                                    }

                                                                                        });

                                                                                        });

                                                                                        // Botão principal

                                                                                        document.getElementById("saibaMais").addEventListener("click", () => {

                                                                                            alert("Os ventiladores ajudam a melhorar a circulação do ar, proporcionando conforto térmico e baixo consumo de energia. Explore nossos artigos para descobrir o modelo ideal para você!");

                                                                                            });