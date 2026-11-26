
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

        // Receber os dados do paciente
            const nome = document.getElementById("nome").value.trim();
                const peso = Number(document.getElementById("peso").value);
                    const altura = Number(document.getElementById("altura").value);

                        // Validar os dados
                            if (nome === "" || peso <= 0 || altura <= 0) {
                                    resultado.className = "resultado erro";
                                            resultado.innerHTML = "Preencha todos os campos corretamente.";
                                                    return;
                                                        }

                                                            // Calcular o IMC
                                                                const imc = peso / (altura * altura);

                                                                    // Criar mensagem de referência ilustrativa para adultos
                                                                        let mensagem = "";
                                                                            let classe = "";

                                                                                if (imc < 18.5) {
                                                                                        mensagem = "O valor calculado está abaixo da faixa de referência adulta.";
                                                                                                classe = "baixo";

                                                                                                    } else if (imc < 25) {
                                                                                                            mensagem = "O valor calculado está dentro de uma faixa de referência adulta.";

                                                                                                                    classe = "referencia";

                                                                                                                        } else {
                                                                                                                                mensagem = "O valor calculado está acima da faixa de referência adulta.";
                                                                                                                                        classe = "alto";
                                                                                                                                            }

                                                                                                                                                // Exibir resultado
                                                                                                                                                    resultado.className = "resultado " + classe;

                                                                                                                                                        resultado.innerHTML = `
                                                                                                                                                                <h2>Resultado do cálculo</h2>

                                                                                                                                                                        <p><strong>Nome:</strong> ${nome}</p>

                                                                                                                                                                                <p><strong>Peso:</strong> ${peso} kg</p>

                                                                                                                                                                                        <p><strong>Altura:</strong> ${altura} m</p>

                                                                                                                                                                                                <p><strong>IMC calculado:</strong> ${imc.toFixed(2)}</p>

                                                                                                                                                                                                        <p>${mensagem}</p>

                                                                                                                                                                                                                <p class="aviso">
                                                                                                                                                                                                                            Esta classificação é apenas ilustrativa para adultos.
                                                                                                                                                                                                                                        Em adolescentes, o IMC precisa ser interpretado
                                                                                                                                                                                                                                                    considerando idade e desenvolvimento.
                                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                                `;
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                