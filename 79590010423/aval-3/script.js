
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value;
            const servico = document.getElementById("servico").value;
                const data = document.getElementById("data").value;

                    const dataEscolhida = new Date(data + "T12:00:00");
                        const hoje = new Date();
                            hoje.setHours(0, 0, 0, 0);

                                if (dataEscolhida < hoje) {
                                        document.getElementById("mensagem").textContent =
                                                    "Escolha uma data de hoje em diante!";
                                                            return;
                                                                }

                                                                    document.getElementById("mensagem").textContent =
                                                                            "Obrigada, " + nome + "! Seu pedido de agendamento para " +
                                                                                    servico + " foi registrado para " +
                                                                                            dataEscolhida.toLocaleDateString("pt-BR") + ".";

                                                                                                formulario.reset();
                                                                                                });
                                                                                                