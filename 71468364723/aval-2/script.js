// Mensagem de boas-vindas

window.onload = function(){

    setTimeout(function(){

            alert("🌸 Bem-vinda à Elegance! Descubra vestidos incríveis feitos para destacar sua beleza.");

                },800);

                };

                // Enviar mensagem

                function enviarMensagem(){

                    let mensagem = document.querySelector("textarea").value;

                        if(mensagem.trim() == ""){

                                alert("Por favor, escreva uma mensagem antes de enviar.");

                                    }else{

                                            alert("💖 Obrigado! Sua mensagem foi enviada com sucesso.");

                                                    document.querySelector("textarea").value = "";

                                                        }

                                                        }

                                                        // Efeito ao clicar nos botões dos vestidos

                                                        const botoes = document.querySelectorAll(".card button");

                                                        botoes.forEach(function(botao){

                                                            botao.addEventListener("click", function(){

                                                                    const vestido = botao.parentElement.querySelector("h3").innerText;

                                                                            alert("👗 Você escolheu: " + vestido);

                                                                                });

                                                                                });

                                                                                // Efeito ao passar o mouse nos cards

                                                                                const cards = document.querySelectorAll(".card");

                                                                                cards.forEach(function(card){

                                                                                    card.addEventListener("mouseenter", function(){

                                                                                            card.style.transform = "translateY(-10px) scale(1.03)";

                                                                                                });

                                                                                                    card.addEventListener("mouseleave", function(){

                                                                                                            card.style.transform = "translateY(0) scale(1)";

                                                                                                                });

                                                                                                                });

                                                                                                                // Mensagem ao clicar no título

                                                                                                                const titulo = document.querySelector("header h1");

                                                                                                                titulo.addEventListener("click", function(){

                                                                                                                    alert("✨ Elegance - Moda feminina feita para você!");

                                                                                                                    });

                                                                                                                    // Saudação de acordo com o horário

                                                                                                                    const hora = new Date().getHours();

                                                                                                                    if(hora < 12){

                                                                                                                        console.log("Bom dia!");

                                                                                                                        }else if(hora < 18){

                                                                                                                            console.log("Boa tarde!");

                                                                                                                            }else{

                                                                                                                                console.log("Boa noite!");

                                                                                                                                }