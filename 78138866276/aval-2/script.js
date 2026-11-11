
let numeroSecreto = Math.floor(Math.random() * 10) + 1;
let tentativas = 0;

function jogar() {
    let resposta = Number(
            prompt("Adivinhe o número de 1 até 10!")
                );

                    tentativas++;

                        if (resposta === numeroSecreto) {
                                alert("🎉 PARABÉNS! Você acertou!");
                                        alert("Tentativas: " + tentativas);

                                                numeroSecreto = Math.floor(Math.random() * 10) + 1;
                                                        tentativas = 0;

                                                            } else if (resposta < numeroSecreto) {
                                                                    alert("Tente um número maior! ⬆️");

                                                                        } else {
                                                                                alert("Tente um número menor! ⬇️");
                                                                                    }
                                                                                    }

                                                                                    jogar();
                                                                                    