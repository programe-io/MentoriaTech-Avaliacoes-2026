
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("tabelaIMC");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
            const peso = Number(document.getElementById("peso").value);
                const altura = Number(document.getElementById("altura").value);

                    // Validar os dados
                        if (nome.length === 0 || peso <= 0 || altura <= 0 ||
                                !Number.isFinite(peso) || !Number.isFinite(altura)) {
                                        alert("Preencha todos os campos corretamente!");
                                                return;
                                                    }

                                                        // Calcular o IMC
                                                            const imc = peso / (altura * altura);

                                                                let situacao;
                                                                    let classe;

                                                                        // Classificar o resultado
                                                                            if (imc < 18.5) {
                                                                                    situacao = "Abaixo do peso";
                                                                                            classe = "abaixo";
                                                                                                } else if (imc < 25) {
                                                                                                        situacao = "Normal";
                                                                                                                classe = "normal";
                                                                                                                    } else if (imc < 30) {
                                                                                                                            situacao = "Sobrepeso";
                                                                                                                                    classe = "sobrepeso";
                                                                                                                                        } else {
                                                                                                                                                situacao = "Obesidade";
                                                                                                                                                        classe = "obesidade";
                                                                                                                                                            }

                                                                                                                                                                // Criar uma linha na tabela
                                                                                                                                                                    const linha = document.createElement("tr");

                                                                                                                                                                        const dados = [
                                                                                                                                                                                nome,
                                                                                                                                                                                        peso.toFixed(1),
                                                                                                                                                                                                altura.toFixed(2),
                                                                                                                                                                                                        imc.toFixed(1),
                                                                                                                                                                                                                situacao
                                                                                                                                                                                                                    ];

                                                                                                                                                                                                                        dados.forEach(function(valor, indice) {
                                                                                                                                                                                                                                const celula = document.createElement("td");
                                                                                                                                                                                                                                        celula.textContent = valor;

                                                                                                                                                                                                                                                if (indice === 4) {
                                                                                                                                                                                                                                                            celula.classList.add(classe);
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                            linha.appendChild(celula);
                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                    tabela.appendChild(linha);

                                                                                                                                                                                                                                                                                        formulario.reset();
                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                        