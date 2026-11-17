
let produtos = [];
let proximoCodigo = 1;

// Cadastrar produto
async function cadastrarProduto(descricao, quantidade, valor) {
    let produto = {
            codigo: proximoCodigo++,
                    descricao: descricao,
                            quantidade: quantidade,
                                    valor: valor
                                        };

                                            produtos.push(produto);

                                                console.log("Produto cadastrado com sucesso!");
                                                }

                                                // Listar produtos
                                                async function listarProdutos() {
                                                    console.log("=== LISTA DE PRODUTOS ===");

                                                        produtos.forEach(function(produto) {
                                                                console.log(
                                                                            "Código: " + produto.codigo +
                                                                                        " | Descrição: " + produto.descricao +
                                                                                                    " | Quantidade: " + produto.quantidade +
                                                                                                                " | Valor: R$ " + produto.valor
                                                                                                                        );
                                                                                                                            });
                                                                                                                            }

                                                                                                                            // Alterar valor do produto
                                                                                                                            async function alterarValor(codigo, novoValor) {
                                                                                                                                let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                    if (produto) {
                                                                                                                                            produto.valor = novoValor;
                                                                                                                                                    console.log("Valor alterado com sucesso!");
                                                                                                                                                        } else {
                                                                                                                                                                console.log("Produto não encontrado!");
                                                                                                                                                                    }
                                                                                                                                                                    }

                                                                                                                                                                    // Alterar quantidade do produto
                                                                                                                                                                    async function alterarQuantidade(codigo, novaQuantidade) {
                                                                                                                                                                        let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                            if (produto) {
                                                                                                                                                                                    produto.quantidade = novaQuantidade;
                                                                                                                                                                                            console.log("Quantidade alterada com sucesso!");
                                                                                                                                                                                                } else {
                                                                                                                                                                                                        console.log("Produto não encontrado!");
                                                                                                                                                                                                            }
                                                                                                                                                                                                            }

                                                                                                                                                                                                            // Menu principal
                                                                                                                                                                                                            async function menu() {
                                                                                                                                                                                                                await cadastrarProduto("Teclado", 10, 150);
                                                                                                                                                                                                                    await cadastrarProduto("Mouse", 20, 80);

                                                                                                                                                                                                                        await listarProdutos();

                                                                                                                                                                                                                            await alterarValor(1, 180);
                                                                                                                                                                                                                                await alterarQuantidade(2, 30);

                                                                                                                                                                                                                                    console.log("=== ESTOQUE ATUALIZADO ===");
                                                                                                                                                                                                                                        await listarProdutos();
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        menu();
                                                                                                                                                                                                                                        