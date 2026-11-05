let produtos = [];

function cadastrarProduto() {
    let codigo = Number(prompt("Digite o código do produto:"));

        if (produtos.some(p => p.codigo === codigo)) {
                alert("Código já cadastrado!");
                        return;
                            }

                                let descricao = prompt("Digite a descrição do produto:");
                                    let quantidade = Number(prompt("Digite a quantidade:"));
                                        let valor = Number(prompt("Digite o valor do produto:"));

                                            produtos.push({
                                                    codigo: codigo,
                                                            descricao: descricao,
                                                                    quantidade: quantidade,
                                                                            valor: valor
                                                                                });

                                                                                    alert("Produto cadastrado com sucesso!");
                                                                                    }

                                                                                    function listarProdutos() {
                                                                                        if (produtos.length === 0) {
                                                                                                alert("Nenhum produto cadastrado.");
                                                                                                        return;
                                                                                                            }

                                                                                                                let lista = "";

                                                                                                                    produtos.forEach(p => {
                                                                                                                            lista += `Código: ${p.codigo}\n`;
                                                                                                                                    lista += `Descrição: ${p.descricao}\n`;
                                                                                                                                            lista += `Quantidade: ${p.quantidade}\n`;
                                                                                                                                                    lista += `Valor: R$ ${p.valor.toFixed(2)}\n\n`;
                                                                                                                                                        });

                                                                                                                                                            alert(lista);
                                                                                                                                                            }

                                                                                                                                                            function alterarValor() {
                                                                                                                                                                let codigo = Number(prompt("Digite o código do produto:"));

                                                                                                                                                                    let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                        if (produto) {
                                                                                                                                                                                produto.valor = Number(prompt("Digite o novo valor:"));
                                                                                                                                                                                        alert("Valor alterado com sucesso!");
                                                                                                                                                                                            } else {
                                                                                                                                                                                                    alert("Produto não encontrado!");
                                                                                                                                                                                                        }
                                                                                                                                                                                                        }

                                                                                                                                                                                                        function alterarQuantidade() {
                                                                                                                                                                                                            let codigo = Number(prompt("Digite o código do produto:"));

                                                                                                                                                                                                                let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                                                    if (produto) {
                                                                                                                                                                                                                            produto.quantidade = Number(prompt("Digite a nova quantidade:"));
                                                                                                                                                                                                                                    alert("Quantidade alterada com sucesso!");
                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                alert("Produto não encontrado!");
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                    let opcao;

                                                                                                                                                                                                                                                    do {
                                                                                                                                                                                                                                                        opcao = prompt(
                                                                                                                                                                                                                                                                "SISTEMA DE ESTOQUE\n\n" +
                                                                                                                                                                                                                                                                        "1 - Cadastrar produto\n" +
                                                                                                                                                                                                                                                                                "2 - Listar produtos\n" +
                                                                                                                                                                                                                                                                                        "3 - Alterar valor\n" +
                                                                                                                                                                                                                                                                                                "4 - Alterar quantidade\n" +
                                                                                                                                                                                                                                                                                                        "5 - Sair\n\n" +
                                                                                                                                                                                                                                                                                                                "Escolha uma opção:"
                                                                                                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                                                                                                        switch (opcao) {
                                                                                                                                                                                                                                                                                                                                case "1":
                                                                                                                                                                                                                                                                                                                                            cadastrarProduto();
                                                                                                                                                                                                                                                                                                                                                        break;

                                                                                                                                                                                                                                                                                                                                                                case "2":
                                                                                                                                                                                                                                                                                                                                                                            listarProdutos();
                                                                                                                                                                                                                                                                                                                                                                                        break;

                                                                                                                                                                                                                                                                                                                                                                                                case "3":
                                                                                                                                                                                                                                                                                                                                                                                                            alterarValor();
                                                                                                                                                                                                                                                                                                                                                                                                                        break;

                                                                                                                                                                                                                                                                                                                                                                                                                                case "4":
                                                                                                                                                                                                                                                                                                                                                                                                                                            alterarQuantidade();
                                                                                                                                                                                                                                                                                                                                                                                                                                                        break;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                case "5":
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            alert("Sistema encerrado.");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        break;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                default:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            alert("Opção inválida!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                } while (opcao !== "5");