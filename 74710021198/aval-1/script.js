// 1. Lista de produtos (array)
let produtos = [];

// 2. Validação dos dados do produto
function validarProduto(descricao, quantidade, valor) {
  if (typeof descricao !== "string" || descricao.trim().length < 5) {
      throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
        }

          if (typeof quantidade !== "number" || Number.isNaN(quantidade) || quantidade < 1) {
              throw new Error("Quantidade deve ser maior que zero");
                }

                  if (typeof valor !== "number" || Number.isNaN(valor) || valor < 0) {
                      throw new Error("Valor deve ser maior ou igual a zero");
                        }
                        }

                        // 3. Função auxiliar para buscar produto pelo código com find
                        function buscarProdutoPorCodigo(codigoProduto) {
                          return produtos.find((prod) => prod.codigo === codigoProduto);
                          }

                          // 4. Cadastro de produto com geração automática de código
                          function cadastrarProduto(descricao, quantidade, valor) {
                            validarProduto(descricao, quantidade, valor);

                              const novoProduto = {
                                  codigo: produtos.length + 1,
                                      descricao: descricao.trim(),
                                          quantidade: quantidade,
                                              valor: valor
                                                };

                                                  produtos.push(novoProduto);
                                                    return novoProduto;
                                                    }

                                                    // 5. Listagem dos produtos cadastrados
                                                    function listarProdutos() {
                                                      console.log(produtos);
                                                        return produtos;
                                                        }

                                                        // 6. Atualizar valor do produto (substitui o valor atual)
                                                        function atualizarValor(codigoProduto, novoValor) {
                                                          if (typeof novoValor !== "number" || Number.isNaN(novoValor) || novoValor < 0) {
                                                              throw new Error("Valor deve ser maior ou igual a zero");
                                                                }

                                                                  const produto = buscarProdutoPorCodigo(codigoProduto);

                                                                    if (produto) {
                                                                        produto.valor = novoValor;
                                                                            return produto;
                                                                              } else {
                                                                                  throw new Error("Produto não encontrado");
                                                                                    }
                                                                                    }

                                                                                    // 7. Atualizar quantidade do produto (soma à quantidade existente)
                                                                                    function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                      if (typeof novaQuantidade !== "number" || Number.isNaN(novaQuantidade) || novaQuantidade < 1) {
                                                                                          throw new Error("Quantidade deve ser maior que zero");
                                                                                            }

                                                                                              const produto = buscarProdutoPorCodigo(codigoProduto);

                                                                                                if (produto) {
                                                                                                    produto.quantidade = produto.quantidade + novaQuantidade;
                                                                                                        return produto;
                                                                                                          } else {
                                                                                                              throw new Error("Produto não encontrado");
                                                                                                                }
                                                                                                                }

                                                                                                                // --- Integração com a interface HTML ---
                                                                                                                const formCadastro = document.getElementById("form-cadastro");
                                                                                                                const inputDescricao = document.getElementById("descricao");
                                                                                                                const inputQuantidade = document.getElementById("quantidade");
                                                                                                                const inputValor = document.getElementById("valor");
                                                                                                                const inputCodigoProduto = document.getElementById("codigo-produto");
                                                                                                                const inputNovoValor = document.getElementById("novo-valor");
                                                                                                                const inputNovaQuantidade = document.getElementById("nova-quantidade");
                                                                                                                const btnAtualizarValor = document.getElementById("btn-atualizar-valor");
                                                                                                                const btnAtualizarQuantidade = document.getElementById("btn-atualizar-quantidade");
                                                                                                                const btnListar = document.getElementById("btn-listar");
                                                                                                                const listaProdutosEl = document.getElementById("lista-produtos");
                                                                                                                const mensagemEl = document.getElementById("mensagem");

                                                                                                                function mostrarMensagem(texto, tipo = "sucesso") {
                                                                                                                  mensagemEl.textContent = texto;
                                                                                                                    mensagemEl.className = `mensagem ${tipo}`;
                                                                                                                    }

                                                                                                                    function renderizarProdutos() {
                                                                                                                      const lista = listarProdutos();
                                                                                                                        listaProdutosEl.innerHTML = "";

                                                                                                                          if (lista.length === 0) {
                                                                                                                              listaProdutosEl.innerHTML = "<li>Nenhum produto cadastrado.</li>";
                                                                                                                                  return;
                                                                                                                                    }

                                                                                                                                      for (const item of lista) {
                                                                                                                                          const li = document.createElement("li");
                                                                                                                                              li.className = "produto-item";
                                                                                                                                                  li.innerHTML = `
                                                                                                                                                        <strong>#${item.codigo} - ${item.descricao}</strong>
                                                                                                                                                              <div class="produto-detalhes">
                                                                                                                                                                      Quantidade: ${item.quantidade} | Valor: R$ ${item.valor.toFixed(2)}
                                                                                                                                                                            </div>
                                                                                                                                                                                `;
                                                                                                                                                                                    listaProdutosEl.appendChild(li);
                                                                                                                                                                                      }
                                                                                                                                                                                      }

                                                                                                                                                                                      formCadastro.addEventListener("submit", (event) => {
                                                                                                                                                                                        event.preventDefault();
                                                                                                                                                                                          try {
                                                                                                                                                                                              const produto = cadastrarProduto(
                                                                                                                                                                                                    inputDescricao.value,
                                                                                                                                                                                                          Number(inputQuantidade.value),
                                                                                                                                                                                                                Number(inputValor.value)
                                                                                                                                                                                                                    );
                                                                                                                                                                                                                        mostrarMensagem(`Produto #${produto.codigo} cadastrado com sucesso!`, "sucesso");
                                                                                                                                                                                                                            formCadastro.reset();
                                                                                                                                                                                                                                renderizarProdutos();
                                                                                                                                                                                                                                  } catch (erro) {
                                                                                                                                                                                                                                      mostrarMensagem(erro.message, "erro");
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        btnAtualizarValor.addEventListener("click", () => {
                                                                                                                                                                                                                                          try {
                                                                                                                                                                                                                                              const codigo = Number(inputCodigoProduto.value);
                                                                                                                                                                                                                                                  const novoValor = Number(inputNovoValor.value);
                                                                                                                                                                                                                                                      const atualizado = atualizarValor(codigo, novoValor);
                                                                                                                                                                                                                                                          mostrarMensagem(
                                                                                                                                                                                                                                                                `Valor do produto #${atualizado.codigo} atualizado para R$ ${atualizado.valor.toFixed(2)}.`,
                                                                                                                                                                                                                                                                      "sucesso"
                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                              renderizarProdutos();
                                                                                                                                                                                                                                                                                } catch (erro) {
                                                                                                                                                                                                                                                                                    mostrarMensagem(erro.message, "erro");
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                      btnAtualizarQuantidade.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                            const codigo = Number(inputCodigoProduto.value);
                                                                                                                                                                                                                                                                                                const qtdAdicionar = Number(inputNovaQuantidade.value);
                                                                                                                                                                                                                                                                                                    const atualizado = atualizarQuantidade(codigo, qtdAdicionar);
                                                                                                                                                                                                                                                                                                        mostrarMensagem(
                                                                                                                                                                                                                                                                                                              `Quantidade do produto #${atualizado.codigo} atualizada para ${atualizado.quantidade} unidades.`,
                                                                                                                                                                                                                                                                                                                    "sucesso"
                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                            renderizarProdutos();
                                                                                                                                                                                                                                                                                                                              } catch (erro) {
                                                                                                                                                                                                                                                                                                                                  mostrarMensagem(erro.message, "erro");
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                    btnListar.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                                                                      renderizarProdutos();
                                                                                                                                                                                                                                                                                                                                        mostrarMensagem("Lista de produtos exibida (veja também no console).", "sucesso");
                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                        renderizarProdutos();
                                                                                                                                                                                                                                                                                                                                        