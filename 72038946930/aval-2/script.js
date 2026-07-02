// Mensagem de boas-vindas

window.onload = function () {

    setTimeout(function () {

            alert("⚽ Bem-vindo ao Portal da Copa do Mundo FIFA 2026!");

                }, 800);

                };

                // Enviar comentário

                function enviarComentario() {

                    let comentario = document.querySelector("textarea").value;

                        if (comentario.trim() === "") {

                                alert("Por favor, escreva um comentário.");

                                    } else {

                                            alert("Obrigado pelo seu comentário!");

                                                    document.querySelector("textarea").value = "";

                                                        }

                                                        }

                                                        // Contagem regressiva para a final da Copa 2026

                                                        const dataFinal = new Date("July 19, 2026 16:00:00").getTime();

                                                        function atualizarContador() {

                                                            const agora = new Date().getTime();

                                                                const distancia = dataFinal - agora;

                                                                    if (distancia <= 0) {

                                                                            document.getElementById("contador").innerHTML =
                                                                                    "🏆 A Final da Copa do Mundo começou!";

                                                                                            clearInterval(intervalo);

                                                                                                    return;

                                                                                                        }

                                                                                                            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));

                                                                                                                const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                                                                                                                    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));

                                                                                                                        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

                                                                                                                            document.getElementById("contador").innerHTML =
                                                                                                                                    dias + " dias " +
                                                                                                                                            horas + "h " +
                                                                                                                                                    minutos + "min " +
                                                                                                                                                            segundos + "s";

                                                                                                                                                            }

                                                                                                                                                            const intervalo = setInterval(atualizarContador, 1000);

                                                                                                                                                            atualizarContador();

                                                                                                                                                            // Efeito ao passar o mouse nos links do menu

                                                                                                                                                            const links = document.querySelectorAll("nav a");

                                                                                                                                                            links.forEach(function(link){

                                                                                                                                                                link.addEventListener("mouseover", function(){

                                                                                                                                                                        link.style.color = "gold";

                                                                                                                                                                            });

                                                                                                                                                                                link.addEventListener("mouseout", function(){

                                                                                                                                                                                        link.style.color = "white";

                                                                                                                                                                                            });

                                                                                                                                                                                            });

                                                                                                                                                                                            // Efeito ao clicar nos cards

                                                                                                                                                                                            const cards = document.querySelectorAll(".card");

                                                                                                                                                                                            cards.forEach(function(card){

                                                                                                                                                                                                card.addEventListener("click", function(){

                                                                                                                                                                                                        card.style.transform = "scale(1.05)";

                                                                                                                                                                                                                setTimeout(function(){

                                                                                                                                                                                                                            card.style.transform = "scale(1)";

                                                                                                                                                                                                                                    }, 200);

                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        });