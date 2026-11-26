
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

        const nome = document.getElementById("nome").value.trim();
            const peso = Number(document.getElementById("peso").value);
                const altura = Number(document.getElementById("altura").value);

                    const mensagem = document.getElementById("mensagem");
                        const resultado = document.getElementById("resultado");

                            if (nome === "" || peso <= 0 || altura <= 0 ||
                                    !Number.isFinite(peso) || !Number.isFinite(altura)) {
                                            mensagem.textContent = "Preencha todos os campos corretamente!";
                                                    resultado.hidden = true;
                                                            return;
                                                                }

                                                                    // Cálculo do IMC
                                                                        const imc = peso / (altura * altura);

                                                                            // Exibição dos resultados
                                                                                document.getElementById("nomeResultado").textContent =
                                                                                        "Paciente: " + nome;

                                                                                            document.getElementById("imcResultado").textContent =
                                                                                                    imc.toFixed(2).replace(".", ",");

                                                                                                        document.getElementById("interpretacao").textContent =
                                                                                                                "IMC calculado com sucesso! O resultado relaciona o peso à altura e serve como medida inicial de avaliação.";

                                                                                                                    resultado.hidden = false;
                                                                                                                        mensagem.textContent = "";
                                                                                                                        });
                                                                                                                        