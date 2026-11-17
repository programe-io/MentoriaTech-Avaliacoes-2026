let produtos = [];

// ---------- VALIDAÇÕES ----------

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

                        // ---------- BUSCA ----------

                        function buscarProdutoPorCodigo(codigoProduto) {
                          return produtos.find((prod) => prod.codigo === codigoProduto);
                          }

                          // ---------- CADASTRAR ----------

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
                                                      console.log(novoProduto);
                                                      }

                                                      // ---------- LISTAR ----------

                                                      function listarProdutos() {
                                                        console.log("--- LISTA DE PRODUTOS ---");
                                                          console.log(produtos);
                                                          }

                                                          // ---------- ATUALIZAR VALOR ----------

                                                          function atualizarValor(codigoProduto, novoValor) {
                                                            if (novoValor < 0) {
                                                                throw new Error("Valor deve ser maior ou igual a zero");
                                                                  }

                                                                    const produto = buscarProdutoPorCodigo(codigoProduto);

                                                                      if (produto) {
                                                                          produto.valor = novoValor;
                                                                              console.log("Valor atualizado com sucesso!");
                                                                                  console.log(produto);
                                                                                    } else {
                                                                                        throw new Error("Produto não encontrado");
                                                                                          }
                                                                                          }

                                                                                          // ---------- ATUALIZAR QUANTIDADE ----------

                                                                                          function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                            if (novaQuantidade < 1) {
                                                                                                throw new Error("Quantidade deve ser maior que zero");
                                                                                                  }

                                                                                                    const produto = buscarProdutoPorCodigo(codigoProduto);

                                                                                                      if (produto) {
                                                                                                          produto.quantidade = produto.quantidade + novaQuantidade;
                                                                                                              console.log("Quantidade atualizada com sucesso!");
                                                                                                                  console.log(produto);
                                                                                                                    } else {
                                                                                                                        throw new Error("Produto não encontrado");
                                                                                                                          }
                                                                                                                          }

                                                                                                                          // ---------- TESTES ----------

                                                                                                                          try {
                                                                                                                            cadastrarProduto("Cadeira gamer", 12, 699);
                                                                                                                              cadastrarProduto("Mouse Logitech", 38, 99);
                                                                                                                                cadastrarProduto("Teclado mecânico", 20, 299);
                                                                                                                                } catch (erro) {
                                                                                                                                  console.log("Erro: " + erro.message);
                                                                                                                                  }

                                                                                                                                  listarProdutos();

                                                                                                                                  try {
                                                                                                                                    atualizarValor(2, 97);
                                                                                                                                    } catch (erro) {
                                                                                                                                      console.log("Erro: " + erro.message);
                                                                                                                                      }

                                                                                                                                      try {
                                                                                                                                        atualizarQuantidade(1, 3);
                                                                                                                                        } catch (erro) {
                                                                                                                                          console.log("Erro: " + erro.message);
                                                                                                                                          }

                                                                                                                                          listarProdutos();

                                                                                                                                        // Teste de erro - descrição curta
                                                          oi                                                                                try {
                                                                                                                                            cadastrarProduto("TV", 10, 1000);
                                                                                                                                            } catch (erro) {
                                                                                                                                              console.log("Erro: " + erro.message);
                                                                                                                                              }

                                                                                                                                              // Teste de erro - produto não encontrado
                                                                                                                                              try {
                                                                                                                                                atualizarValor(5, 97);
                                                                                                                                                } catch (erro) {
                                                                                                                                                  console.log("Erro: " + erro.message);
                                                                                                                                                  }