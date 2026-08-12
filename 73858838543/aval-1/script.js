


let produtos = [];
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
      throw new Error("Descricao deve ter no mínimo 5 caracteres");
        }
          if (quantidade < 1) {
              throw new Error("Quantidade deve ser maior que zero");
                }
                  if (valor < 0) {
                      throw new Error("Valor deve maior igual a zero");
                        }
                        }

                        function cadastrarProduto(descricao, quantidade, valor) {
                          validarProduto(descricao, quantidade, produto);
                            let novoProduto = {
                                codigo: produto.length + 1,
                                    descricao: descricao,
                                        quantidade: quantidade,
                                            valor: valor,
                                              };
                                                produtos.push(novoProduto);
                                                }

                                                function listarProdutos() {
                                                  console.log(produtos);
                                                  }

                                                  function atualizarValor(codigoProduto, novoValor) {
                                                    if (novoValor < 0) {
                                                        throw new Error("Valor deve ser maior que zero");
                                                          }
                                                            const produto = produtos.find((prod) => prod.codigo === codigo);
                                                              if (produto) {
                                                                  produto.valor = novoValor;
                                                                    } else {
                                                                        throw new Error("Produto não encontrado");
                                                                          }
                                                                          }

                                                                          function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                            if (novaQuantidade < 1) {
                                                                                throw new Error("Valor deve ser maior que zero");
                                                                                  }
                                                                                    const produto = produtos.find((prod) => prod.codigo === codigo);
                                                                                      if (produto) {
                                                                                          produto.quantidade += novoValor;
                                                                                            } else {
                                                                                                throw new Error("Produto não encontrado");
                                                                                                  }
                                                                                                  }
                                                                                                  ```# Código - Projeto 1º Trimestre

                                                                                                  ```jsx
                                                                                                  let produtos = [];
                                                                                                  function validarProduto(descricao, quantidade, valor) {
                                                                                                    if (descricao.length < 5) {
                                                                                                        throw new Error("Descricao deve ter no mínimo 5 caracteres");
                                                                                                          }
                                                                                                            if (quantidade < 1) {
                                                                                                                throw new Error("Quantidade deve ser maior que zero");
                                                                                                                  }
                                                                                                                    if (valor < 0) {
                                                                                                                        throw new Error("Valor deve maior igual a zero");
                                                                                                                          }
                                                                                                                          }

                                                                                                                          function cadastrarProduto(descricao, quantidade, valor) {
                                                                                                                            validarProduto(descricao, quantidade, produto);
                                                                                                                              let novoProduto = {
                                                                                                                                  codigo: produto.length + 1,
                                                                                                                                      descricao: descricao,
                                                                                                                                          quantidade: quantidade,
                                                                                                                                              valor: valor,
                                                                                                                                                };
                                                                                                                                                  produtos.push(novoProduto);
                                                                                                                                                  }

                                                                                                                                                  function listarProdutos() {
                                                                                                                                                    console.log(produtos);
                                                                                                                                                    }

                                                                                                                                                    function atualizarValor(codigoProduto, novoValor) {
                                                                                                                                                      if (novoValor < 0) {
                                                                                                                                                          throw new Error("Valor deve ser maior que zero");
                                                                                                                                                            }
                                                                                                                                                              const produto = produtos.find((prod) => prod.codigo === codigo);
                                                                                                                                                                if (produto) {
                                                                                                                                                                    produto.valor = novoValor;
                                                                                                                                                                      } else {
                                                                                                                                                                          throw new Error("Produto não encontrado");
                                                                                                                                                                            }
                                                                                                                                                                            }

                                                                                                                                                                            function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                                                                                                              if (novaQuantidade < 1) {
                                                                                                                                                                                  throw new Error("Valor deve ser maior que zero");
                                                                                                                                                                                    }
                                                                                                                                                                                      const produto = produtos.find((prod) => prod.codigo === codigo);
                                                                                                                                                                                        if (produto) {
                                                                                                                                                                                            produto.quantidade += novoValor;
                                                                                                                                                                                              } else {
                                                                                                                                                                                                  throw new Error("Produto não encontrado");
                                                                                                                                                                                                    }
                                                                                                                                                                                                    }
                                                                                                                                                                                                    ```