// 4. Criação da lista de produtos (Array)
let produtos = [];

// 6. Função para validar produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
            throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
                }
                    if (quantidade < 1) {
                            throw new Error("Quantidade deve ser maior que zero");
                                }
                                    if (valor < 0) {
                                            throw new Error("Valor deve ser maior ou igual a zero");
                                                }
                                                }

                                                // 10. Função para cadastrar produto
                                                function cadastrarProduto(descricao, quantidade, valor) {
                                                    // Valida os dados antes de prosseguir
                                                        validarProduto(descricao, quantidade, valor);

                                                            // 11 e 12. Criação do objeto produto e geração automática do código
                                                                let novoProduto = {
                                                                        codigo: produtos.length + 1,
                                                                                descricao: descricao,
                                                                                        quantidade: quantidade,
                                                                                                valor: valor
                                                                                                    };

                                                                                                        // 13. Adição de produtos ao array
                                                                                                            produtos.push(novoProduto);
                                                                                                            }

                                                                                                            // 14. Função para listar produtos
                                                                                                            function listarProdutos() {
                                                                                                                console.log(produtos);
                                                                                                                }

                                                                                                                // 16 & 17 & 18. Função para atualizar o valor do produto
                                                                                                                function atualizarValor(codigoProduto, novoValor) {
                                                                                                                    if (novoValor < 0) {
                                                                                                                            throw new Error("Valor deve ser maior ou igual a zero");
                                                                                                                                }

                                                                                                                                    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

                                                                                                                                        if (produto) {
                                                                                                                                                produto.valor = novoValor;
                                                                                                                                                    } else {
                                                                                                                                                            throw new Error("Produto não encontrado");
                                                                                                                                                                }
                                                                                                                                                                }

                                                                                                                                                                // 19 & 20. Função para atualizar (somar) a quantidade do produto
                                                                                                                                                                function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                                                                                                    if (novaQuantidade < 1) {
                                                                                                                                                                            throw new Error("Quantidade deve ser maior que zero");
                                                                                                                                                                                }

                                                                                                                                                                                    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

                                                                                                                                                                                        if (produto) {
                                                                                                                                                                                                produto.quantidade = produto.quantidade + novaQuantidade;
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                            throw new Error("Produto não encontrado");
                                                                                                                                                                                                                }
                                                                                                                                                                                                                }

                                                                                                                                                                                                                // ==========================================
                                                                                                                                                                                                                // 15. Testando o sistema (Exemplos de uso)
                                                                                                                                                                                                                // ==========================================
                                                                                                                                                                                                                try {
                                                                                                                                                                                                                    console.log("--- Cadastrando produtos ---");
                                                                                                                                                                                                                        cadastrarProduto("Cadeira gamer", 12, 699);
                                                                                                                                                                                                                            cadastrarProduto("Mouse Logitech", 38, 99);
                                                                                                                                                                                                                                listarProdutos();

                                                                                                                                                                                                                                    console.log("\n--- Atualizando valor do produto 1 ---");
                                                                                                                                                                                                                                        atualizarValor(1, 649);
                                                                                                                                                                                                                                            listarProdutos();

                                                                                                                                                                                                                                                console.log("\n--- Adicionando estoque ao produto 2 (+5 unidades) ---");
                                                                                                                                                                                                                                                    atualizarQuantidade(2, 5);
                                                                                                                                                                                                                                                        listarProdutos();

                                                                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                                                                            console.error("Erro capturado: " + erro.message);
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            