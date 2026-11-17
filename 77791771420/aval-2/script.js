
const formulario = document.getElementById("formulario");
const email = document.getElementById("email");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

        if (email.value.trim() === "") {
                mensagem.textContent = "Digite um e-mail válido!";
                        return;
                            }

                                mensagem.textContent =
                                        "Cadastro realizado com sucesso! 💗";

                                            formulario.reset();

                                            });
                                            