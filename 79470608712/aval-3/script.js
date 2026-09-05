function mostrarMensagem() {
        const mensagem = document.createElement("p");
            
                mensagem.textContent = "Você clicou no botão! Seja bem-vindo ao nosso projeto!";
                    
                        mensagem.style.fontSize = "18px";
                            mensagem.style.marginTop = "15px";
                                mensagem.style.fontWeight = "bold";
                                    
                                        document.querySelector("#inicio").appendChild(mensagem);
                                        }

                                        const links = document.querySelectorAll("nav a");

                                        links.forEach(function(link) {
                                            link.addEventListener("click", function() {
                                                    console.log("Você acessou: " + link.textContent);
                                                        });
                                                        });

                                                        console.log("JavaScript funcionando corretamente!");
}