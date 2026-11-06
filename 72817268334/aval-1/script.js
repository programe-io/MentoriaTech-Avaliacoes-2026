let produtos = [];

function cadastrarProduto(codigo, descricao, quantidade, valor) {
    produtos.push({
            codigo,
                    descricao,
                            quantidade,
                                    valor
                                        });

                                            console.log("Produto cadastrado com sucesso!");
                                            }

                                            function listarProdutos() {
                                                console.log(produtos);
                                                }

                                                function alterarValor(codigo, novoValor) {
                                                    let produto = produtos.find(p => p.codigo === codigo);

                                                        if (produto) {
                                                                produto.valor = novoValor;
                                                                        console.log("Valor alterado!");
                                                                            } else {
                                                                                    console.log("Produto não encontrado!");
                                                                                        }
                                                                                        }

                                                                                        function alterarQuantidade(codigo, novaQuantidade) {
                                                                                            let produto = produtos.find(p => p.codigo === codigo);

                                                                                                if (produto) {
                                                                                                        produto.quantidade = novaQuantidade;
                                                                                                                console.log("Quantidade alterada!");
                                                                                                                    } else {
                                                                                                                            console.log("Produto não encontrado!");
                                                                                                                                }
                                                                                                                                }

                                                                                                                                // Testando o sistema
                                                                                                                                cadastrarProduto(1, "Caderno", 20, 15);
                                                                                                                                cadastrarProduto(2, "Caneta", 30, 3);

                                                                                                                                listarProdutos();

                                                                                                                                alterarValor(1, 18);
                                                                                                                                alterarQuantidade(2, 50);

                                                                                                                                listarProdutos();