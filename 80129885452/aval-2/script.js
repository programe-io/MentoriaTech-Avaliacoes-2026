document.addEventListener("DOMContentLoaded", function(){

        alert("Bem-vindo ao site IA dos Cachorros!");

            const titulo = document.querySelector("h1");

                titulo.addEventListener("click", function(){
                        titulo.textContent = "🐶 IA dos Cachorros 🐶";
                            });

                                const aside = document.querySelector("aside");

                                    aside.addEventListener("click", function(){
                                            alert("Você abriu uma curiosidade sobre IA e cachorros!");
                                                });

                                                    const imagem = document.querySelector("article img");

                                                        imagem.addEventListener("click", function(){
                                                                alert("Este cachorro está sendo monitorado por IA!");
                                                                    });

                                                                    });
})