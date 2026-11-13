
let posicao = 0;
let segundos = 0;
let intervalo;
let cronometro;
let correndo = false;

function iniciarCorrida() {
    if (correndo) return;

        correndo = true;
            document.getElementById("mensagem").innerText =
                    "🏁 Corrida em andamento!";

                        intervalo = setInterval(() => {
                                posicao += 5;

                                        document.getElementById("carro").style.left =
                                                    posicao + "px";

                                                            if (posicao >= 600) {
                                                                        finalizarCorrida();
                                                                                }
                                                                                    }, 100);

                                                                                        cronometro = setInterval(() => {
                                                                                                segundos++;
                                                                                                        document.getElementById("tempo").innerText =
                                                                                                                    "Tempo: " + segundos + " segundos";
                                                                                                                        }, 1000);
                                                                                                                        }

                                                                                                                        function finalizarCorrida() {
                                                                                                                            clearInterval(intervalo);
                                                                                                                                clearInterval(cronometro);

                                                                                                                                    correndo = false;

                                                                                                                                        document.getElementById("mensagem").innerText =
                                                                                                                                                "🏆 Parabéns! Você venceu a corrida!";
                                                                                                                                                }

                                                                                                                                                function reiniciarCorrida() {
                                                                                                                                                    clearInterval(intervalo);
                                                                                                                                                        clearInterval(cronometro);

                                                                                                                                                            posicao = 0;
                                                                                                                                                                segundos = 0;
                                                                                                                                                                    correndo = false;

                                                                                                                                                                        document.getElementById("carro").style.left = "0px";
                                                                                                                                                                            document.getElementById("tempo").innerText =
                                                                                                                                                                                    "Tempo: 0 segundos";

                                                                                                                                                                                        document.getElementById("mensagem").innerText =
                                                                                                                                                                                                "Clique para começar!";
                                                                                                                                                                                                }
                                                                                                                                                                                                