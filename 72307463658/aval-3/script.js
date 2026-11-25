const formulario = document.getElementById("formAnamnese");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;
                const telefone = document.getElementById("telefone").value;
                    const nascimento = document.getElementById("nascimento").value;
                        const doenca = document.getElementById("doenca").value;
                            const alergia = document.getElementById("alergia").value;
                                const medicamento = document.getElementById("medicamento").value;
                                    const cirurgia = document.getElementById("cirurgia").value;
                                        const queixa = document.getElementById("queixa").value;
                                            const observacoes = document.getElementById("observacoes").value;

                                                document.getElementById("resultado").innerHTML = `
                                                        <h2>Ficha preenchida!</h2>
                                                                <p>Nome: ${nome}</p>
                                                                        <p>Idade: ${idade}</p>
                                                                                <p>Telefone: ${telefone}</p>
                                                                                        <p>Nascimento: ${nascimento}</p>
                                                                                                <p>Doença: ${doenca}</p>
                                                                                                        <p>Alergia: ${alergia}</p>
                                                                                                                <p>Medicamento: ${medicamento}</p>
                                                                                                                        <p>Cirurgia: ${cirurgia}</p>
                                                                                                                                <p>Queixa: ${queixa}</p>
                                                                                                                                        <p>Observações: ${observacoes}</p>
                                                                                                                                            `;
                                                                                                                                            });