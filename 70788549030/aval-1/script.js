// 4. Criação da lista de produtos
let produtos = [];

// 6, 7, 8, 9. Função para validar produto e suas regras
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

                                                // 10, 11, 12, 13. Função para cadastrar produto (com código automático e adição ao array)
                                                function cadastrarProduto(descricao, quantidade, valor) {
                                                    validarProduto(descricao, quantidade, valor);
                                                        
                                                            // Geração automática do código com base no tamanho do array + 1
                                                                let codigo = produtos.length + 1;

                                                                    let produto = {
                                                                            codigo: codigo,
                                                                                    descricao: descricao,
                                                                                            quantidade: quantidade,
                                                                                                    valor: valor
                                                                                                        };

                                                                                                            produtos.push(produto);
                                                                                                                console.log(`Produto "${descricao}" cadastrado com sucesso!`);
                                                                                                                }

                                                                                                                // 14. Função para listar produtos
                                                                                                                function listarProdutos() {
                                                                                                                    if (produtos.length === 0) {
                                                                                                                            console.log("O estoque está vazio.");
                                                                                                                                    return;
                                                                                                                                        }

                                                                                                                                            console.log("\n--- Lista de Produtos no Estoque ---");
                                                                                                                                                produtos.forEach(produto => {
                                                                                                                                                        console.log(`[Código: ${produto.codigo}] ${produto.descricao} | Qtd: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)}`);
                                                                                                                                                            });
                                                                                                                                                                console.log("------------------------------------\n");
                                                                                                                                                                }

                                                                                                                                                                // 16, 17, 18. Função para atualizar o valor do produto (com find e tratamento de erro)
                                                                                                                                                                function atualizarValor(codigoProduto, novoValor) {
                                                                                                                                                                    if (novoValor < 0) {
                                                                                                                                                                            throw new Error("O valor deve ser maior ou igual a zero");
                                                                                                                                                                                }

                                                                                                                                                                                    let produto = produtos.find(p => p.codigo === codigoProduto);

                                                                                                                                                                                        if (!produto) {
                                                                                                                                                                                                throw new Error("Produto não encontrado no estoque");
                                                                                                                                                                                                    }

                                                                                                                                                                                                        produto.valor = novoValor;
                                                                                                                                                                                                            console.log(`Valor do produto ${produto.descricao} atualizado para R$ ${novoValor.toFixed(2)}`);
                                                                                                                                                                                                            }

                                                                                                                                                                                                            // 19. Função para atualizar a quantidade do produto
                                                                                                                                                                                                            function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                                                                                                                                                if (novaQuantidade < 0) {
                                                                                                                                                                                                                        throw new Error("A quantidade não pode ser negativa");
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                let produto = produtos.find(p => p.codigo === codigoProduto);

                                                                                                                                                                                                                                    if (!produto) {
                                                                                                                                                                                                                                            throw new Error("Produto não encontrado no estoque");
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                    produto.quantidade = novaQuantidade;
                                                                                                                                                                                                                                                        console.log(`Quantidade do produto ${produto.descricao} atualizada para ${produto.quantidade}`);
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        // ==========================================
                                                                                                                                                                                                                                                        // 15. Testando o cadastro e a listagem
                                                                                                                                                                                                                                                        // ==========================================
                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                            // Cadastrando produtos válidos
                                                                                                                                                                                                                                                                cadastrarProduto("Caderno Universitário", 15, 22.50);
                                                                                                                                                                                                                                                                    cadastrarProduto("Caneta Azul", 50, 2.00);

                                                                                                                                                                                                                                                                        // Listando produtos cadastrados
                                                                                                                                                                                                                                                                            listarProdutos();

                                                                                                                                                                                                                                                                                // Atualizando valor e quantidade
                                                                                                                                                                                                                                                                                    atualizarValor(1, 25.00);
                                                                                                                                                                                                                                                                                        atualizarQuantidade(2, 60);

                                                                                                                                                                                                                                                                                            // Listando novamente para conferir as alterações
                                                                                                                                                                                                                                                                                                listarProdutos();

                                                                                                                                                                                                                                                                                                    // Testando validações de erro (descomente para testar)
                                                                                                                                                                                                                                                                                                        // cadastrarProduto("Lápis", 10, 1.50); // Erro: descrição menor que 5 caracteres
                                                                                                                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                                                                                                                            console.error("Erro capturado: " + erro.message);
                                                                                                                                                                                                                                                                                                            }