
const formulario = document.getElementById("formulario");
const resultados = document.getElementById("resultados");
const modoBtn = document.getElementById("modoBtn");

// Cadastrar pessoa e calcular IMC
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
            const peso = Number(document.getElementById("peso").value);
                const altura = Number(document.getElementById("altura").value);

                    if (
                            !nome ||
                                    !Number.isFinite(peso) ||
                                            !Number.isFinite(altura) ||
                                                    peso <= 0 ||
                                                            altura <= 0
                                                                ) {
                                                                        alert("Informe nome, peso e altura válidos!");
                                                                                return;
                                                                                    }

                                                                                        const imc = peso / (altura * altura);

                                                                                            let status;
                                                                                                let classe;

                                                                                                    if (imc < 18.5) {
                                                                                                            status = "Abaixo do peso";
                                                                                                                    classe = "abaixo";
                                                                                                                        } else if (imc < 25) {
                                                                                                                                status = "Faixa de referência normal";
                                                                                                                                        classe = "normal";
                                                                                                                                            } else if (imc < 30) {
                                                                                                                                                    status = "Acima da faixa de referência";
                                                                                                                                                            classe = "acima";
                                                                                                                                                                } else {
                                                                                                                                                                        status = "Obesidade";
                                                                                                                                                                                classe = "obesidade";
                                                                                                                                                                                    }

                                                                                                                                                                                        // Criar uma nova linha
                                                                                                                                                                                            const linha = document.createElement("tr");

                                                                                                                                                                                                const dados = [
                                                                                                                                                                                                        nome,
                                                                                                                                                                                                                peso.toFixed(1) + " kg",
                                                                                                                                                                                                                        altura.toFixed(2) + " m",
                                                                                                                                                                                                                                imc.toFixed(2),
                                                                                                                                                                                                                                        status
                                                                                                                                                                                                                                            ];

                                                                                                                                                                                                                                                dados.forEach(function(texto, indice) {
                                                                                                                                                                                                                                                        const celula = document.createElement("td");
                                                                                                                                                                                                                                                                celula.textContent = texto;

                                                                                                                                                                                                                                                                        if (indice === 4) {
                                                                                                                                                                                                                                                                                    celula.classList.add("status");
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                    linha.appendChild(celula);
                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                            // classList.add(): adiciona a classe de cor
                                                                                                                                                                                                                                                                                                                linha.classList.add(classe);

                                                                                                                                                                                                                                                                                                                    resultados.appendChild(linha);

                                                                                                                                                                                                                                                                                                                        formulario.reset();
                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                        // classList.toggle(): alterna o modo escuro
                                                                                                                                                                                                                                                                                                                        modoBtn.addEventListener("click", function() {
                                                                                                                                                                                                                                                                                                                            document.body.classList.toggle("escuro");
                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                            // Exemplo de classList.remove():
                                                                                                                                                                                                                                                                                                                            // Remove a classe "normal" da primeira linha, se existir.
                                                                                                                                                                                                                                                                                                                            function removerCorNormal() {
                                                                                                                                                                                                                                                                                                                                const primeiraLinha = resultados.querySelector("tr");

                                                                                                                                                                                                                                                                                                                                    if (primeiraLinha) {
                                                                                                                                                                                                                                                                                                                                            primeiraLinha.classList.remove("normal");
                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                