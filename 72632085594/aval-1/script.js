let produtos = [];

const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

        let codigo = Number(document.getElementById("codigo").value);
            let descricao = document.getElementById("descricao").value;
                let quantidade = Number(document.getElementById("quantidade").value);
                    let valor = Number(document.getElementById("valor").value);

                        if (produtos.some(p => p.codigo === codigo)) {
                                alert("Esse código já está cadastrado!");
                                        return;
                                            }

                                                if (quantidade < 0 || valor < 0 || !Number.isInteger(quantidade)) {
                                                        alert("Informe valores válidos!");
                                                                return;
                                                                    }

                                                                        let produto = {
                                                                                codigo,
                                                                                        descricao,
                                                                                                quantidade,
                                                                                                        valor
                                                                                                            };

                                                                                                                produtos.push(produto);

                                                                                                                    formulario.reset();

                                                                                                                        listarProdutos();
                                                                                                                        });

                                                                                                                        // Listar produtos
                                                                                                                        function listarProdutos() {
                                                                                                                            lista.innerHTML = "";

                                                                                                                                produtos.forEach((produto, index) => {
                                                                                                                                        lista.innerHTML += `
                                                                                                                                                    <tr>
                                                                                                                                                                    <td>${produto.codigo}</td>
                                                                                                                                                                                    <td>${produto.descricao}</td>
                                                                                                                                                                                                    <td>${produto.quantidade}</td>
                                                                                                                                                                                                                    <td>R$ ${produto.valor.toFixed(2)}</td>

                                                                                                                                                                                                                                    <td class="acoes">
                                                                                                                                                                                                                                                        <button onclick="alterarValor(${index})">
                                                                                                                                                                                                                                                                                Alterar Valor
                                                                                                                                                                                                                                                                                                    </button>

                                                                                                                                                                                                                                                                                                                        <button onclick="alterarQuantidade(${index})">
                                                                                                                                                                                                                                                                                                                                                Alterar Quantidade
                                                                                                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                                                                                                                    </td>
                                                                                                                                                                                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                                                                                                                                                                                                        `;
                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                            // Alterar valor
                                                                                                                                                                                                                                                                                                                                                                                                            function alterarValor(index) {
                                                                                                                                                                                                                                                                                                                                                                                                                let novoValor = prompt("Digite o novo valor:");

                                                                                                                                                                                                                                                                                                                                                                                                                    if (novoValor === null || novoValor.trim() === "") return;

                                                                                                                                                                                                                                                                                                                                                                                                                        novoValor = Number(novoValor.replace(",", "."));

                                                                                                                                                                                                                                                                                                                                                                                                                            if (!Number.isFinite(novoValor) || novoValor < 0) {
                                                                                                                                                                                                                                                                                                                                                                                                                                    alert("Valor inválido!");
                                                                                                                                                                                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                    produtos[index].valor = novoValor;

                                                                                                                                                                                                                                                                                                                                                                                                                                                        listarProdutos();
                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                        // Alterar quantidade
                                                                                                                                                                                                                                                                                                                                                                                                                                                        function alterarQuantidade(index) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                            let novaQuantidade = prompt("Digite a nova quantidade:");

                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (novaQuantidade === null || novaQuantidade.trim() === "") return;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    novaQuantidade = Number(novaQuantidade);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                alert("Quantidade inválida!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                produtos[index].quantidade = novaQuantidade;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    listarProdutos();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }