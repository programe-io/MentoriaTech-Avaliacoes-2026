
// FUNÇÃO PARA CALCULAR O IMC

function calcularIMC() {

    // Receber os dados do paciente
        let nome = document.getElementById("nome").value.trim();

            let peso = Number(document.getElementById("peso").value);

                let altura = Number(document.getElementById("altura").value);

                    let resultado = document.getElementById("resultado");

                        // Validar os campos
                            if (
                                    nome === "" ||
                                            document.getElementById("peso").value === "" ||
                                                    document.getElementById("altura").value === ""
                                                        ) {
                                                                alert("Preencha todos os campos!");
                                                                        return;
                                                                            }

                                                                                if (
                                                                                        !Number.isFinite(peso) ||
                                                                                                !Number.isFinite(altura) ||
                                                                                                        peso <= 0 ||
                                                                                                                altura <= 0
                                                                                                                    ) {
                                                                                                                            alert("Digite um peso e uma altura válidos!");
                                                                                                                                    return;
                                                                                                                                        }

                                                                                                                                            // Calcular o IMC
                                                                                                                                                let imc = peso / (altura * altura);

                                                                                                                                                    // Classificar o IMC (adultos)
                                                                                                                                                        let classificacao = "";

                                                                                                                                                            if (imc < 18.5) {
                                                                                                                                                                    classificacao = "Abaixo do peso";
                                                                                                                                                                        }

                                                                                                                                                                            else if (imc < 25) {
                                                                                                                                                                                    classificacao = "Peso normal";
                                                                                                                                                                                        }

                                                                                                                                                                                            else if (imc < 30) {
                                                                                                                                                                                                    classificacao = "Sobrepeso";
                                                                                                                                                                                                        }

                                                                                                                                                                                                            else if (imc < 35) {
                                                                                                                                                                                                                    classificacao = "Obesidade grau I";
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                            else if (imc < 40) {
                                                                                                                                                                                                                                    classificacao = "Obesidade grau II";
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                            else {
                                                                                                                                                                                                                                                    classificacao = "Obesidade grau III";
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                            // Exibir o resultado
                                                                                                                                                                                                                                                                resultado.innerHTML = `
                                                                                                                                                                                                                                                                        <h2>Resultado do IMC</h2>

                                                                                                                                                                                                                                                                                <p><strong>Paciente:</strong> ${nome.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>

                                                                                                                                                                                                                                                                                        <p><strong>Peso:</strong> ${peso} kg</p>

                                                                                                                                                                                                                                                                                                <p><strong>Altura:</strong> ${altura} m</p>

                                                                                                                                                                                                                                                                                                        <h3>IMC: ${imc.toFixed(2)}</h3>

                                                                                                                                                                                                                                                                                                                <p class="classificacao">
                                                                                                                                                                                                                                                                                                                            Classificação: ${classificacao}
                                                                                                                                                                                                                                                                                                                                    </p>
                                                                                                                                                                                                                                                                                                                                        `;
                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                        // FUNÇÃO PARA LIMPAR OS CAMPOS

                                                                                                                                                                                                                                                                                                                                        function limparCampos() {

                                                                                                                                                                                                                                                                                                                                            document.getElementById("nome").value = "";

                                                                                                                                                                                                                                                                                                                                                document.getElementById("peso").value = "";

                                                                                                                                                                                                                                                                                                                                                    document.getElementById("altura").value = "";

                                                                                                                                                                                                                                                                                                                                                        document.getElementById("resultado").innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                <h2>Resultado do IMC</h2>
                                                                                                                                                                                                                                                                                                                                                                        <p>Preencha os dados para calcular seu IMC.</p>
                                                                                                                                                                                                                                                                                                                                                                            `;
                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                            