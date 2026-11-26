
/* JAVASCRIPT - SABORES DA KESELLY */

// MENU DE NAVEGAÇÃO
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function(event) {
            const secao = document.querySelector(
                        this.getAttribute("href")
                                );

                                        if (secao) {
                                                    event.preventDefault();

                                                                secao.scrollIntoView({
                                                                                behavior: "smooth"
                                                                                            });
                                                                                                    }
                                                                                                        });
                                                                                                        });


                                                                                                        // MENSAGEM DE BOAS-VINDAS
                                                                                                        const titulo = document.querySelector(".logo h1");

                                                                                                        titulo.addEventListener("click", function() {
                                                                                                            alert("Bem-vindo ao Sabores da Keselly! 🍰");
                                                                                                            });


                                                                                                            // INTERAÇÃO COM A GALERIA
                                                                                                            const imagens = document.querySelectorAll(".galeria img");

                                                                                                            imagens.forEach(imagem => {
                                                                                                                imagem.addEventListener("click", function() {
                                                                                                                        alert("Que delícia! Confira nossas receitas!");
                                                                                                                            });
                                                                                                                            });


                                                                                                                            // CONTAR AS RECEITAS
                                                                                                                            const receitas = document.querySelectorAll(".postagens article");

                                                                                                                            console.log("Quantidade de receitas: " + receitas.length);


                                                                                                                            // MENSAGEM DE CARREGAMENTO
                                                                                                                            console.log("Sabores da Keselly carregado com sucesso!");
                                                                                                                            