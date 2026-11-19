// "Banco de dados" em memória para simular o estoque
const estoque = [];
let ultimoCodigoNumerico = 0;

/**
 * Simula uma operação assíncrona de rede ou banco de dados.
  */
  function simularLatencia(ms = 300) {
    return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Gera um código de produto único de forma assíncrona.
      * Ex: PRD-001, PRD-002...
       */
       async function gerarCodigoProduto() {
         await simularLatencia(250);
           ultimoCodigoNumerico += 1;
             const codigoFormatado = String(ultimoCodigoNumerico).padStart(3, "0");
               return `PRD-${codigoFormatado}`;
               }

               /**
                * Cadastra um novo produto no estoque.
                 * @param {string} descricao
                  * @param {number} quantidade
                   * @param {number} valor
                    */
                    async function cadastrarProduto(descricao, quantidade, valor) {
                      if (!descricao || typeof descricao !== "string" || !descricao.trim()) {
                          throw new Error("A descrição do produto é obrigatória.");
                            }
                              if (typeof quantidade !== "number" || !Number.isInteger(quantidade) || quantidade < 0) {
                                  throw new Error("A quantidade deve ser um número inteiro maior ou igual a zero.");
                                    }
                                      if (typeof valor !== "number" || Number.isNaN(valor) || valor < 0) {
                                          throw new Error("O valor deve ser um número maior ou igual a zero.");
                                            }

                                              const codigo = await gerarCodigoProduto();
                                                await simularLatencia(200);

                                                  const novoProduto = {
                                                      codigo,
                                                          descricao: descricao.trim(),
                                                              quantidade,
                                                                  valor: Number(valor.toFixed(2)),
                                                                    };

                                                                      estoque.push(novoProduto);
                                                                        return novoProduto;
                                                                        }

                                                                        /**
                                                                         * Busca um produto pelo código de forma assíncrona.
                                                                          */
                                                                          async function buscarProdutoPorCodigo(codigo) {
                                                                            await simularLatencia(150);
                                                                              const codigoNormalizado = String(codigo).trim().toUpperCase();
                                                                                const produto = estoque.find((item) => item.codigo === codigoNormalizado);

                                                                                  if (!produto) {
                                                                                      throw new Error(`Produto com código "${codigoNormalizado}" não encontrado.`);
                                                                                        }
                                                                                          return produto;
                                                                                          }

                                                                                          /**
                                                                                           * Lista todos os produtos cadastrados no estoque.
                                                                                            */
                                                                                            async function listarProdutos() {
                                                                                              await simularLatencia(200);

                                                                                                if (estoque.length === 0) {
                                                                                                    console.log("\n📦 Estoque vazio. Nenhum produto cadastrado.");
                                                                                                        return [];
                                                                                                          }

                                                                                                            console.log("\n📦 === PRODUTOS CADASTRADOS ===");
                                                                                                              const tabelaFormatada = estoque.map((p) => ({
                                                                                                                  Código: p.codigo,
                                                                                                                      Descrição: p.descricao,
                                                                                                                          Quantidade: p.quantidade,
                                                                                                                              Valor: p.valor.toLocaleString("pt-BR", {
                                                                                                                                    style: "currency",
                                                                                                                                          currency: "BRL",
                                                                                                                                              }),
                                                                                                                                                  Total: (p.quantidade * p.valor).toLocaleString("pt-BR", {
                                                                                                                                                        style: "currency",
                                                                                                                                                              currency: "BRL",
                                                                                                                                                                  }),
                                                                                                                                                                    }));

                                                                                                                                                                      console.table(tabelaFormatada);
                                                                                                                                                                        return estoque;
                                                                                                                                                                        }

                                                                                                                                                                        /**
                                                                                                                                                                         * Altera o valor unitário de um produto existente.
                                                                                                                                                                          */
                                                                                                                                                                          async function alterarValorProduto(codigo, novoValor) {
                                                                                                                                                                            if (typeof novoValor !== "number" || Number.isNaN(novoValor) || novoValor < 0) {
                                                                                                                                                                                throw new Error("O novo valor deve ser um número maior ou igual a zero.");
                                                                                                                                                                                  }

                                                                                                                                                                                    const produto = await buscarProdutoPorCodigo(codigo);
                                                                                                                                                                                      await simularLatencia(200);

                                                                                                                                                                                        const valorAnterior = produto.valor;
                                                                                                                                                                                          produto.valor = Number(novoValor.toFixed(2));

                                                                                                                                                                                            console.log(
                                                                                                                                                                                                `💲 Valor de [${produto.codigo}] ${produto.descricao} alterado de R$ ${valorAnterior.toFixed(
                                                                                                                                                                                                      2
                                                                                                                                                                                                          )} para R$ ${produto.valor.toFixed(2)}.`
                                                                                                                                                                                                            );
                                                                                                                                                                                                              return produto;
                                                                                                                                                                                                              }

                                                                                                                                                                                                              /**
                                                                                                                                                                                                               * Altera a quantidade de um produto existente.
                                                                                                                                                                                                                * Pode definir um novo saldo absoluto ou somar/subtrair (ex: +5 ou -3).
                                                                                                                                                                                                                 */
                                                                                                                                                                                                                 async function alterarQuantidadeProduto(codigo, novaQuantidade) {
                                                                                                                                                                                                                   if (typeof novaQuantidade !== "number" || !Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
                                                                                                                                                                                                                       throw new Error("A nova quantidade deve ser um número inteiro maior ou igual a zero.");
                                                                                                                                                                                                                         }

                                                                                                                                                                                                                           const produto = await buscarProdutoPorCodigo(codigo);
                                                                                                                                                                                                                             await simularLatencia(200);

                                                                                                                                                                                                                               const quantidadeAnterior = produto.quantidade;
                                                                                                                                                                                                                                 produto.quantidade = novaQuantidade;

                                                                                                                                                                                                                                   console.log(
                                                                                                                                                                                                                                       `📊 Quantidade de [${produto.codigo}] ${produto.descricao} alterada de ${quantidadeAnterior} para ${produto.quantidade}.`
                                                                                                                                                                                                                                         );
                                                                                                                                                                                                                                           return produto;
                                                                                                                                                                                                                                           }

                                                                                                                                                                                                                                           // ==========================================
                                                                                                                                                                                                                                           // Demonstração de uso do sistema
                                                                                                                                                                                                                                           // ==========================================
                                                                                                                                                                                                                                           async function executarSimulacao() {
                                                                                                                                                                                                                                             try {
                                                                                                                                                                                                                                                 console.log("Iniciando sistema de estoque...");

                                                                                                                                                                                                                                                     const p1 = await cadastrarProduto("Teclado Mecânico ABNT2", 15, 249.9);
                                                                                                                                                                                                                                                         const p2 = await cadastrarProduto("Mouse Sem Fio 1600 DPI", 30, 89.5);
                                                                                                                                                                                                                                                             console.log(`✅ Cadastrados: ${p1.codigo} e ${p2.codigo}`);

                                                                                                                                                                                                                                                                 await listarProdutos();

                                                                                                                                                                                                                                                                     await alterarValorProduto("PRD-001", 219.9);
                                                                                                                                                                                                                                                                         await alterarQuantidadeProduto("PRD-002", 22);

                                                                                                                                                                                                                                                                             await listarProdutos();

                                                                                                                                                                                                                                                                                 // Exemplo de tratamento de erro (código inexistente)
                                                                                                                                                                                                                                                                                     await alterarValorProduto("PRD-999", 100);
                                                                                                                                                                                                                                                                                       } catch (erro) {
                                                                                                                                                                                                                                                                                           console.error(`❌ Erro na operação: ${erro.message}`);
                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                             }

                                                                                                                                                                                                                                                                                             executarSimulacao();
                                                                                                                                                                                                                                                                                             