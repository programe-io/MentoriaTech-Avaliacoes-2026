
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;

                const resultado = document.getElementById("resultado");

                    resultado.innerHTML =
                            "Ficha preenchida com sucesso!<br>" +
                                    "Nome: " + nome + "<br>" +
                                            "Idade: " + idade + " anos.";

                                                formulario.reset();
                                                });
                                                