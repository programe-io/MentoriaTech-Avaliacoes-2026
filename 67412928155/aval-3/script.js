
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
            const peso = Number(document.getElementById("peso").value);
                const altura = Number(document.getElementById("altura").value);

                    if (nome === "" || peso <= 0 || altura <= 0) {
                            resultado.className = "resultado erro";
                                    resultado.textContent = "Preencha todos os campos com valores válidos.";
                                            return;
                                                }

                                                    const imc = peso / (altura * altura);

                                                        resultado.className = "resultado sucesso";
                                                            resultado.innerHTML = `
                                                                    <h3>Resultado do cálculo</h3>
                                                                            <p>Olá, ${nome}!</p>
                                                                                    <p>Seu IMC calculado é: <strong>${imc.toFixed(2)}</strong></p>
                                                                                            <p>O IMC é apenas uma medida de referência e não avalia sozinho a saúde.</p>
                                                                                                `;
                                                                                                });
                                                                                                