function calcularIMC() {

        const peso = Number(document.getElementById("peso").value);
            const altura = Number(document.getElementById("altura").value);

                const resultado = document.getElementById("resultado");

                    if (!peso || !altura || peso <= 0 || altura <= 0) {
                            resultado.innerHTML = "Preencha os campos corretamente!";
                                    return;
                                        }

                                            const imc = peso / (altura * altura);

                                                resultado.innerHTML = `
                                                        <h2>Seu IMC é ${imc.toFixed(2)}</h2>
                                                                <p>Resultado calculado com sucesso!</p>
                                                                    `;
                                                                    }
}