const form = document.getElementById("formIMC");

form.addEventListener("submit", function(event){

    event.preventDefault();

        const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;
                const sexo = document.getElementById("sexo").value;
                    const peso = parseFloat(document.getElementById("peso").value);
                        const altura = parseFloat(document.getElementById("altura").value);

                            const imc = peso / (altura * altura);

                                let classificacao = "";

                                    if(imc < 18.5){
                                            classificacao = "Abaixo do peso";
                                                }
                                                    else if(imc < 25){
                                                            classificacao = "Peso normal";
                                                                }
                                                                    else if(imc < 30){
                                                                            classificacao = "Sobrepeso";
                                                                                }
                                                                                    else if(imc < 35){
                                                                                            classificacao = "Obesidade Grau I";
                                                                                                }
                                                                                                    else if(imc < 40){
                                                                                                            classificacao = "Obesidade Grau II";
                                                                                                                }
                                                                                                                    else{
                                                                                                                            classificacao = "Obesidade Grau III";
                                                                                                                                }

                                                                                                                                    const resultado = document.getElementById("resultado");

                                                                                                                                        resultado.style.display = "block";

                                                                                                                                            resultado.innerHTML = `
                                                                                                                                                    <h2>Resultado da Anamnese</h2>

                                                                                                                                                            <p><strong>Paciente:</strong> ${nome}</p>

                                                                                                                                                                    <p><strong>Idade:</strong> ${idade} anos</p>

                                                                                                                                                                            <p><strong>Sexo:</strong> ${sexo}</p>

                                                                                                                                                                                    <p><strong>Peso:</strong> ${peso} kg</p>

                                                                                                                                                                                            <p><strong>Altura:</strong> ${altura} m</p>

                                                                                                                                                                                                    <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

                                                                                                                                                                                                            <p><strong>Classificação:</strong> ${classificacao}</p>
                                                                                                                                                                                                                `;
                                                                                                                                                                                                                });