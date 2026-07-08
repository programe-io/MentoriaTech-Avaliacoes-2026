function verificarCategoria() {
        // 1. Pega o valor digitado no campo de texto HTML
            let idade Input = document.getElementById("idade").value;
                let resultado = document.getElementById("resultado");

                    // 2. Validação: Se o campo estiver vazio, avisa o usuário e para a execução
                        if (idadeInput === "") {
                                resultado.innerText = "Por favor, digite uma idade.";
                                        return;
                                            }

                                                // 3. Transforma o texto digitado em um número inteiro
                                                    let idade = parseInt(idadeInput);

                                                        // 4. Estrutura Condicional (O equivalente ao If, Elif e Else do Python)
                                                            if (idade < 11) {
                                                                    resultado.innerText = "Categoria: Infantil 👶";
                                                                        } else if (idade <= 17) {
                                                                                resultado.innerText = "Categoria: Juvenil 👦👧";
                                                                                    } else {
                                                                                            resultado.innerText = "Categoria: Adulto 👨‍💼";
                                                                                                }
                                                                                                }
}