
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
                const mensagem = document.getElementById("mensagem").value;

                    if (nome === "" || email === "" || mensagem === "") {
                            alert("Preencha todos os campos!");
                                } else {
                                        alert("Mensagem enviada com sucesso, " + nome + "!");

                                                formulario.reset();
                                                    }
                                                    });
                                                    