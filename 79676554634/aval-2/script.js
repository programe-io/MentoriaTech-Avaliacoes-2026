function pesquisar() {
        const campo = document.getElementById("campoPesquisa");
            const resultado = document.getElementById("resultado");

                const pesquisa = campo.value.trim();

                    if (pesquisa === "") {
                            alert("Digite algo para pesquisar!");
                                    return;
                                        }

                                            resultado.innerHTML = `
                                                    <h2>Resultado da pesquisa</h2>
                                                            <div class="card">
                                                                        <h3>🔎 ${pesquisa}</h3>
                                                                                    <p>
                                                                                                    Você pesquisou por "${pesquisa}".
                                                                                                                    Este é um exemplo de resultado.
                                                                                                                                </p>
                                                                                                                                        </div>
                                                                                                                                            `;
                                                                                                                                            }
}