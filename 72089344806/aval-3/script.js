
const formulario = document.getElementById("ficha");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value;
            const nascimento = document.getElementById("nascimento").value;
                const idade = document.getElementById("idade").value;
                    const telefone = document.getElementById("telefone").value;
                        const endereco = document.getElementById("endereco").value;
                            const doenca = document.getElementById("doenca").value;
                                const alergia = document.getElementById("alergia").value;
                                    const medicamento = document.getElementById("medicamento").value;
                                        const queixa = document.getElementById("queixa").value;
                                            const observacoes = document.getElementById("observacoes").value;

                                                resultado.innerHTML = `
                                                        <h2>Ficha cadastrada!</h2>
                                                                <p>Paciente: ${escapar(nome)}</p>
                                                                        <p>Data de nascimento: ${escapar(nascimento)}</p>
                                                                                <p>Idade: ${escapar(idade)}</p>
                                                                                        <p>Telefone: ${escapar(telefone)}</p>
                                                                                                <p>Endereço: ${escapar(endereco)}</p>
                                                                                                        <p>Doença: ${escapar(doenca)}</p>
                                                                                                                <p>Alergia: ${escapar(alergia)}</p>
                                                                                                                        <p>Medicamentos: ${escapar(medicamento)}</p>
                                                                                                                                <p>Queixa: ${escapar(queixa)}</p>
                                                                                                                                        <p>Observações: ${escapar(observacoes)}</p>
                                                                                                                                            `;

                                                                                                                                                resultado.scrollIntoView({ behavior: "smooth" });
                                                                                                                                                });

                                                                                                                                                function escapar(valor) {
                                                                                                                                                    const elemento = document.createElement("span");
                                                                                                                                                        elemento.textContent = valor;
                                                                                                                                                            return elemento.innerHTML;
                                                                                                                                                            }
                                                                                                                                                            