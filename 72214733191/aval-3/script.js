// Exibe a data atual automaticamente no elemento com id="data-atual"
document.addEventListener("DOMContentLoaded", () => {
    const elData = document.getElementById("data-atual");
        if (elData) {
                const hoje = new Date();
                        elData.textContent = hoje.toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                                month: "long",
                                                            year: "numeric"
                                                                    });
                                                                        }
                                                                        });

                                                                        // Função para exibir mensagem ao clicar no botão
                                                                        function exibirMensagem() {
                                                                            alert("Trabalho visualizado com sucesso!");
                                                                            }