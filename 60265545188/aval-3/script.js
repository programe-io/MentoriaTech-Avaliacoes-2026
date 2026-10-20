// 2 - Lista (Array) de Produtos
let produtos = [];

// 5 - Função de Validação
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
      throw new Error("Descricao deve ter no mínimo cinco caracteres");
        }
          if (quantidade < 1) {
              throw new Error("Quantidade deve ser maior que zero");
                }
                  if (valor < 0) {
                      throw new Error("Valor deve maior igual a zero");
                        }
                        }

                        // 17 - Cadastrar Produto
                        function cadastrarProduto(descricao, quantidade, valor) {
                          validarProduto(descricao, quantidade, valor);
                            
                              let novoProduto = {
                                  "codigo": produtos.length + 1,
                                      "descricao": descricao,
                                          "quantidade": quantidade,
                                              "valor": valor
                                                };
                                                  
                                                    produtos.push(novoProduto);
                                                    }

                                                    // 28 - Listar Produtos
                                                    function listarProdutos() {
                                                      console.log(produtos);
                                                      }

                                                      // 32 - Atualizar Valor
                                                      function atualizarValor(codigoProduto, novoValor) {
                                                        if (novoValor < 0) {
                                                            throw new Error("Valor deve maior igual a zero");
                                                              }

                                                                const produto = produtos.find(prod => prod.codigo === codigoProduto);
                                                                  
                                                                    if (produto) {
                                                                        produto.valor = novoValor;
                                                                          } else {
                                                                              throw new Error("Produto não encontrado");
                                                                                }
                                                                                }

                                                                                // 45 - Atualizar Quantidade (Corrigido)
                                                                                function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                  if (novaQuantidade < 1) {
                                                                                      throw new Error("Quantidade deve ser maior que zero");
                                                                                        }

                                                                                          const produto = produtos.find(prod => prod.codigo === codigoProduto);
                                                                                            
                                                                                              if (produto) {
                                                                                                  // Linha 51 corrigida: substitui o valor antigo em vez de somar com +=
                                                                                                      produto.quantidade = novaQuantidade; 
                                                                                                        } else {
                                                                                                            throw new Error("Produto não encontrado");
                                                                                                              }
                                                                                                              }

                                                                                                              // -------------------------------------------------------------
                                                                                                              // Execução dos Testes (Linhas 62-70)
                                                                                                              // -------------------------------------------------------------
                                                                                                              listarProdutos(); // []

                                                                                                              cadastrarProduto("Cadeira Gamer", 12, 699.00);
                                                                                                              cadastrarProduto("Mouse Logi", 38, 99.00);

                                                                                                              listarProdutos(); // Exibe os dois produtos cadastrados

                                                                                                              atualizarValor(2, 97.00); // Atualiza o preço do Mouse Logi

                                                                                                              listarProdutos(); // Exibe a lista com o preço do mouse atualizado

                                                                                                              atualizarQuantidade(1, 3); // Altera a quantidade da Cadeira Gamer para exatamente 3

                                                                                                              listarProdutos(); // Exibe a lista final com a quantidade corrigida