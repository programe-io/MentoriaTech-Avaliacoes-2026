
const formulario = document.getElementById("formulario");
const resposta = document.getElementById("resposta");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

        const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
                const mensagem = document.getElementById("mensagem").value;

                    if (nome.trim() === "" ||
                            email.trim() === "" ||
                                    mensagem.trim() === "") {

                                            resposta.textContent = "Preencha todos os campos!";
                                                    return;
                                                        }

                                                            resposta.textContent =
                                                                    "Obrigado, " + nome + "! Sua mensagem foi preenchida com sucesso.";

                                                                        formulario.reset();

                                                                        });
                                                                        