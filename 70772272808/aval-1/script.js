// PROJETO CRUD E CONTROLE DE ESTOQUE

// Lista de produtos
let produtos = [];

// 1. Função para validar os dados
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
            throw new Error("Descrição deve ter no mínimo cinco caracteres");
                }

                    if (quantidade < 1) {
                            throw new Error("Quantidade deve ser maior que zero");
                                }

                                    if (valor < 0) {
                                            throw new Error("Valor deve ser maior ou igual a zero");
                                                }
                                                }

                                                // 2. Função para cadastrar produto
                                                function cadastrarProduto(descricao, quantidade, valor) {
                                                    validarProduto(descricao, quantidade, valor);

                                                        let novoProduto = {
                                                                codigo: produtos.length + 1,
                                                                        descricao: descricao,
                                                                                quantidade: quantidade,
                                                                                        valor: valor
                                                                                            };

                                                                                                produtos.push(novoProduto);

                                                                                                    console.log("Produto cadastrado com sucesso!");
                                                                                                    }

                                                                                                    // 3. Função para listar produtos
                                                                                                    function listarProdutos() {
                                                                                                        console.log("LISTA DE PRODUTOS:");
                                                                                                            console.log(produtos);
                                                                                                            }

                                                                                                            // 4. Função para atualizar o valor
                                                                                                            function atualizarValor(codigoProduto, novoValor) {
                                                                                                                if (novoValor < 0) {
                                                                                                                        throw new Error("Valor deve ser maior ou igual a zero");
                                                                                                                            }

                                                                                                                                const produto = produtos.find(
                                                                                                                                        (prod) => prod.codigo === codigoProduto
                                                                                                                                            );

                                                                                                                                                if (produto) {
                                                                                                                                                        produto.valor = novoValor;
                                                                                                                                                                console.log("Valor atualizado com sucesso!");
                                                                                                                                                                    } else {
                                                                                                                                                                            throw new Error("Produto não encontrado");
                                                                                                                                                                                }
                                                                                                                                                                                }

                                                                                                                                                                                // 5. Função para atualizar a quantidade
                                                                                                                                                                                function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                                                                                                                    if (novaQuantidade < 1) {
                                                                                                                                                                                            throw new Error("Quantidade deve ser maior que zero");
                                                                                                                                                                                                }

                                                                                                                                                                                                    const produto = produtos.find(
                                                                                                                                                                                                            (prod) => prod.codigo === codigoProduto
                                                                                                                                                                                                                );

                                                                                                                                                                                                                    if (produto) {
                                                                                                                                                                                                                            produto.quantidade =
                                                                                                                                                                                                                                        produto.quantidade + novaQuantidade;

                                                                                                                                                                                                                                                console.log("Quantidade atualizada com sucesso!");
                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                            throw new Error("Produto não encontrado");
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                // 6. TESTANDO O PROJETO

                                                                                                                                                                                                                                                                cadastrarProduto("Cadeira gamer", 12, 699);
                                                                                                                                                                                                                                                                cadastrarProduto("Mouse Logitech", 38, 99);

                                                                                                                                                                                                                                                                listarProdutos();

                                                                                                                                                                                                                                                                // Alterar valor do produto de código 2
                                                                                                                                                                                                                                                                atualizarValor(2, 97);

                                                                                                                                                                                                                                                                // Adicionar 3 unidades ao produto de código 1
                                                                                                                                                                                                                                                                atualizarQuantidade(1, 3);

                                                                                                                                                                                                                                                                // Mostrar produtos atualizados
                                                                                                                                                                                                                                                                listarProdutos();