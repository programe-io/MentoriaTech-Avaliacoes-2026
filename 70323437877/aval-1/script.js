// Lista global para armazenar os produtos do estoque
let produtos = [];

// Função responsável por validar os dados antes do cadastro
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

                        // Função para cadastrar um novo produto
                        function cadastrarProduto(descricao, quantidade, valor) {
                          // Valida as entradas
                            validarProduto(descricao, quantidade, valor);

                              // Cria o objeto produto com código gerado automaticamente
                                let novoProduto = {
                                    codigo: produtos.length + 1,
                                        descricao: descricao,
                                            quantidade: quantidade,
                                                valor: valor
                                                  };

                                                    // Adiciona o produto ao final do array
                                                      produtos.push(novoProduto);
                                                      }

                                                      // Função para exibir a lista completa de produtos
                                                      function listarProdutos() {
                                                        console.log(produtos);
                                                        }

                                                        // Função para alterar/substituir o valor de um produto
                                                        function atualizarValor(codigoProduto, novoValor) {
                                                          if (novoValor < 0) {
                                                              throw new Error("Valor deve ser maior ou igual a zero");
                                                                }

                                                                  // Busca o produto pelo código
                                                                    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

                                                                      if (produto) {
                                                                          produto.valor = novoValor;
                                                                            } else {
                                                                                throw new Error("Produto não encontrado");
                                                                                  }
                                                                                  }

                                                                                  // Função para somar uma nova quantidade ao estoque existente
                                                                                  function atualizarQuantidade(codigoProduto, novaQuantidade) {
                                                                                    if (novaQuantidade < 1) {
                                                                                        throw new Error("Quantidade deve ser maior que zero");
                                                                                          }

                                                                                            // Busca o produto pelo código
                                                                                              const produto = produtos.find((prod) => prod.codigo === codigoProduto);

                                                                                                if (produto) {
                                                                                                    produto.quantidade = produto.quantidade + novaQuantidade;
                                                                                                      } else {
                                                                                                          throw new Error("Produto não encontrado");
                                                                                                            }
                                                                                                            }

                                                                                                            // ==========================================
                                                                                                            // INTEGRAÇÃO COM A INTERFACE HTML (DOM)
                                                                                                            // ==========================================

                                                                                                            // Função para atualizar a tabela na tela sempre que houver mudanças
                                                                                                            function renderizarTabela() {
                                                                                                                const tbody = document.querySelector('#tabelaProdutos tbody');
                                                                                                                    tbody.innerHTML = ''; // Limpa a tabela antes de recriar

                                                                                                                        produtos.forEach(produto => {
                                                                                                                                const tr = document.createElement('tr');
                                                                                                                                        tr.innerHTML = `
                                                                                                                                                    <td>${produto.codigo}</td>
                                                                                                                                                                <td>${produto.descricao}</td>
                                                                                                                                                                            <td>${produto.quantidade}</td>
                                                                                                                                                                                        <td>R$ ${produto.valor.toFixed(2)}</td>
                                                                                                                                                                                                `;
                                                                                                                                                                                                        tbody.appendChild(tr);
                                                                                                                                                                                                            });
                                                                                                                                                                                                            }

                                                                                                                                                                                                            // Captura o envio do formulário de CADASTRO
                                                                                                                                                                                                            document.getElementById('formCadastro').addEventListener('submit', function(event) {
                                                                                                                                                                                                                event.preventDefault(); // Evita que a página recarregue
                                                                                                                                                                                                                    
                                                                                                                                                                                                                        const descricao = document.getElementById('descricao').value;
                                                                                                                                                                                                                            const quantidade = parseInt(document.getElementById('quantidade').value, 10);
                                                                                                                                                                                                                                const valor = parseFloat(document.getElementById('valor').value);

                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                            cadastrarProduto(descricao, quantidade, valor);
                                                                                                                                                                                                                                                    alert('Produto cadastrado com sucesso!');
                                                                                                                                                                                                                                                            this.reset(); // Limpa o formulário
                                                                                                                                                                                                                                                                    renderizarTabela(); // Atualiza a tabela na tela
                                                                                                                                                                                                                                                                        } catch (erro) {
                                                                                                                                                                                                                                                                                alert('Erro ao cadastrar: ' + erro.message);
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                    // Captura o envio do formulário de ATUALIZAÇÃO
                                                                                                                                                                                                                                                                                    document.getElementById('formAtualizar').addEventListener('submit', function(event) {
                                                                                                                                                                                                                                                                                        event.preventDefault();

                                                                                                                                                                                                                                                                                            const codigo = parseInt(document.getElementById('codigoAtualizar').value, 10);
                                                                                                                                                                                                                                                                                                const tipo = document.getElementById('tipoAtualizacao').value;
                                                                                                                                                                                                                                                                                                    const novoDado = parseFloat(document.getElementById('novoDado').value);

                                                                                                                                                                                                                                                                                                        try {
                                                                                                                                                                                                                                                                                                                if (tipo === 'valor') {
                                                                                                                                                                                                                                                                                                                            atualizarValor(codigo, novoDado);
                                                                                                                                                                                                                                                                                                                                        alert('Valor atualizado com sucesso!');
                                                                                                                                                                                                                                                                                                                                                } else if (tipo === 'quantidade') {
                                                                                                                                                                                                                                                                                                                                                            atualizarQuantidade(codigo, parseInt(novoDado, 10));
                                                                                                                                                                                                                                                                                                                                                                        alert('Quantidade adicionada com sucesso!');
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                        this.reset();
                                                                                                                                                                                                                                                                                                                                                                                                renderizarTabela();
                                                                                                                                                                                                                                                                                                                                                                                                    } catch (erro) {
                                                                                                                                                                                                                                                                                                                                                                                                            alert('Erro ao atualizar: ' + erro.message);
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                });