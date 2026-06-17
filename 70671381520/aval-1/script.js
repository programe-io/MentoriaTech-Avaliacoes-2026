function adicionar() {
        const refeicao = document.getElementById("refeicao").value;
            const alimento = document.getElementById("alimento").value;

                if (alimento.trim() === "") {
                        alert("Digite um alimento!");
                                return;
                                    }

                                        const li = document.createElement("li");

                                            li.innerHTML = `
                                                    <span><strong>${refeicao}:</strong> ${alimento}</span>
                                                            <button class="excluir" onclick="remover(this)">X</button>
                                                                `;

                                                                    document.getElementById("lista").appendChild(li);
                                                                        document.getElementById("alimento").value = "";
                                                                        }

                                                                        function remover(botao) {
                                                                            botao.parentElement.remove();
                                                                            }
}