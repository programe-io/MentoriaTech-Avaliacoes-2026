
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

// Receber e calcular os dados
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
            const peso = Number(document.getElementById("peso").value);
                const altura = Number(document.getElementById("altura").value);

                    // Verificar os campos
                        if (nome === "" || peso <= 0 || altura <= 0) {
                                resultado.className = "resultado erro";
                                        resultado.textContent = "Por favor, preencha os dados corretamente.";
                                                return;
                                                    }

                                                        // Calcular o IMC
                                                            const imc = peso / (altura * altura);

                                                                // Exibir o resultado
                                                                    resultado.className = "resultado mostrar sucesso";

                                                                        resultado.innerHTML = `
                                                                                <h2>✓ Cálculo concluído!</h2>

                                                                                        <p>Olá, <strong>${nome}</strong>!</p>

                                                                                                <div class="destaque">
                                                                                                            <p>Seu resultado calculado</p>

                                                                                                                        <span class="numero">${imc.toFixed(2)}</span>

                                                                                                                                    <p>Índice de Massa Corporal (IMC)</p>
                                                                                                                                            </div>

                                                                                                                                                    <p><strong>Peso informado:</strong> ${peso} kg</p>

                                                                                                                                                            <p><strong>Altura informada:</strong> ${altura} m</p>

                                                                                                                                                                    <p class="aviso">
                                                                                                                                                                                O IMC é uma medida de referência e não avalia sozinho
                                                                                                                                                                                            a saúde de uma pessoa. Em adolescentes, sua interpretação
                                                                                                                                                                                                        considera idade e desenvolvimento.
                                                                                                                                                                                                                </p>
                                                                                                                                                                                                                    `;
                                                                                                                                                                                                                    });

                                                                                                                                                                                                                    // Limpar o resultado ao limpar o formulário
                                                                                                                                                                                                                    formulario.addEventListener("reset", function() {
                                                                                                                                                                                                                        resultado.className = "resultado";
                                                                                                                                                                                                                            resultado.innerHTML = "";
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                            