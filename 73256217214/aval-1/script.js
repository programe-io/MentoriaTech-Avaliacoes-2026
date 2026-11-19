// Base de dados em memória e contador automático para os códigos
let estoque = [];
let proximoCodigo = 1;

// Função auxiliar para simular o atraso assíncrono de um servidor/banco de dados
function simularOperacaoAssincrona(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Função auxiliar para gerar o código automaticamente
  function gerarCodigoAutomatico() {
    return proximoCodigo++;
    }

    // 1. Cadastrar um novo produto (assíncrona)
    async function cadastrarProduto() {
      const descricao = prompt("Digite a descrição do produto:");
        if (!descricao || descricao.trim() === "") {
            alert("Descrição inválida. Cadastro cancelado.");
                return;
                  }

                    const quantidade = parseInt(prompt("Digite a quantidade inicial:"), 10);
                      if (isNaN(quantidade) || quantidade < 0) {
                          alert("Quantidade inválida. Digite um número inteiro maior ou igual a zero.");
                              return;
                                }

                                  const valor = parseFloat(prompt("Digite o valor unitário (ex: 29.90):"));
                                    if (isNaN(valor) || valor < 0) {
                                        alert("Valor inválido. Digite um número válido.");
                                            return;
                                              }

                                                await simularOperacaoAssincrona();

                                                  const novoProduto = {
                                                      codigo: gerarCodigoAutomatico(),
                                                          descricao: descricao.trim(),
                                                              quantidade: quantidade,
                                                                  valor: valor
                                                                    };

                                                                      estoque.push(novoProduto);
                                                                        alert(
                                                                            `Produto cadastrado com sucesso!\n` +
                                                                                `Código gerado: ${novoProduto.codigo}\n` +
                                                                                    `Descrição: ${novoProduto.descricao}`
                                                                                      );
                                                                                      }

                                                                                      // 2. Listar os produtos cadastrados (assíncrona)
                                                                                      async function listarProdutos() {
                                                                                        await simularOperacaoAssincrona();

                                                                                          if (estoque.length === 0) {
                                                                                              alert("O estoque está vazio.");
                                                                                                  return;
                                                                                                    }

                                                                                                      let listaFormatada = "=== PRODUTOS EM ESTOQUE ===\n\n";

                                                                                                        for (let i = 0; i < estoque.length; i++) {
                                                                                                            const p = estoque[i];
                                                                                                                listaFormatada +=
                                                                                                                      `Código: ${p.codigo} | ` +
                                                                                                                            `Descrição: ${p.descricao} | ` +
                                                                                                                                  `Qtd: ${p.quantidade} | ` +
                                                                                                                                        `Valor: R$ ${p.valor.toFixed(2)}\n`;
                                                                                                                                          }

                                                                                                                                            alert(listaFormatada);
                                                                                                                                            }

                                                                                                                                            // Função auxiliar para buscar produto pelo código
                                                                                                                                            function buscarProdutoPorCodigo(codigo) {
                                                                                                                                              return estoque.find((produto) => produto.codigo === codigo);
                                                                                                                                              }

                                                                                                                                              // 3. Alterar o valor de um produto (assíncrona)
                                                                                                                                              async function alterarValorProduto() {
                                                                                                                                                if (estoque.length === 0) {
                                                                                                                                                    alert("Nenhum produto cadastrado.");
                                                                                                                                                        return;
                                                                                                                                                          }

                                                                                                                                                            const codigo = parseInt(prompt("Digite o código do produto para alterar o valor:"), 10);
                                                                                                                                                              const produto = buscarProdutoPorCodigo(codigo);

                                                                                                                                                                if (!produto) {
                                                                                                                                                                    alert("Produto não encontrado!");
                                                                                                                                                                        return;
                                                                                                                                                                          }

                                                                                                                                                                            const novoValor = parseFloat(
                                                                                                                                                                                prompt(`Produto: ${produto.descricao} (Valor atual: R$ ${produto.valor.toFixed(2)})\nDigite o novo valor:`)
                                                                                                                                                                                  );

                                                                                                                                                                                    if (isNaN(novoValor) || novoValor < 0) {
                                                                                                                                                                                        alert("Valor inválido.");
                                                                                                                                                                                            return;
                                                                                                                                                                                              }

                                                                                                                                                                                                await simularOperacaoAssincrona();

                                                                                                                                                                                                  produto.valor = novoValor;
                                                                                                                                                                                                    alert(`Valor de "${produto.descricao}" atualizado para R$ ${produto.valor.toFixed(2)}!`);
                                                                                                                                                                                                    }

                                                                                                                                                                                                    // 4. Alterar a quantidade de um produto (assíncrona)
                                                                                                                                                                                                    async function alterarQuantidade
                                                                                                                                                                                                    