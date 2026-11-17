const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

// Banco de dados em memória e contador automático de código
let estoque = [];
let proximoCodigo = 1;

// Função auxiliar para simular o tempo de resposta de um banco de dados
function simularDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 1. Cadastrar um novo produto
  async function cadastrarProduto(rl) {
    console.log('\n--- CADASTRAR NOVO PRODUTO ---');
      const descricao = await rl.question('Descrição do produto: ');
        const quantidade = parseInt(await rl.question('Quantidade inicial: '), 10);
          const valor = parseFloat(await rl.question('Valor unitário (R$): '));

            if (!descricao || isNaN(quantidade) || isNaN(valor)) {
                console.log('Dados inválidos. Tente novamente.');
                    return;
                      }

                        console.log('Salvando no sistema...');
                          await simularDelay();

                            const novoProduto = {
                                codigo: proximoCodigo++,
                                    descricao: descricao,
                                        quantidade: quantidade,
                                            valor: valor
                                              };

                                                estoque.push(novoProduto);
                                                  console.log(`Produto "${descricao}" cadastrado com sucesso! Código gerado: ${novoProduto.codigo}`);
                                                  }

                                                  // 2. Listar os produtos cadastrados
                                                  async function listarProdutos() {
                                                    console.log('\n--- LISTA DE PRODUTOS EM ESTOQUE ---');
                                                      console.log('Buscando dados...');
                                                        await simularDelay();

                                                          if (estoque.length === 0) {
                                                              console.log('Nenhum produto cadastrado no momento.');
                                                                  return;
                                                                    }

                                                                      for (let i = 0; i < estoque.length; i++) {
                                                                          const p = estoque[i];
                                                                              console.log(
                                                                                    `Cód: ${p.codigo} | Descrição: ${p.descricao} | Qtd: ${p.quantidade} | Valor: R$ ${p.valor.toFixed(2)}`
                                                                                        );
                                                                                          }
                                                                                          }

                                                                                          // Função auxiliar para localizar um produto pelo código
                                                                                          function buscarPorCodigo(codigo) {
                                                                                            for (let i = 0; i < estoque.length; i++) {
                                                                                                if (estoque[i].codigo === codigo) {
                                                                                                      return estoque[i];
                                                                                                          }
                                                                                                            }
                                                                                                              return null;
                                                                                                              }

                                                                                                              // 3. Alterar o valor de um produto
                                                                                                              async function alterarValor(rl) {
                                                                                                                console.log('\n--- ALTERAR VALOR DO PRODUTO ---');
                                                                                                                  const codigo = parseInt(await rl.question('Digite o código do produto: '), 10);
                                                                                                                    const produto = buscarPorCodigo(codigo);

                                                                                                                      if (!produto) {
                                                                                                                          console.log('Produto não encontrado.');
                                                                                                                              return;
                                                                                                                                }

                                                                                                                                  console.log(`Produto atual: ${produto.descricao} (Valor atual: R$ ${produto.valor.toFixed(2)})`);
                                                                                                                                    const novoValor = parseFloat(await rl.question('Novo valor (R$): '));

                                                                                                                                      if (isNaN(novoValor) || novoValor < 0) {
                                                                                                                                          console.log('Valor inválido.');
                                                                                                                                              return;
                                                                                                                                                }

                                                                                                                                                  console.log('Atualizando valor...');
                                                                                                                                                    await simularDelay();

                                                                                                                                                      produto.valor = novoValor;
                                                                                                                                                        console.log('Valor atualizado com sucesso!');
                                                                                                                                                        }

                                                                                                                                                        // 4. Alterar a quantidade de um produto
                                                                                                                                                        async function alterarQuantidade(rl) {
                                                                                                                                                          console.log('\n--- ALTERAR QUANTIDADE DO PRODUTO ---');
                                                                                                                                                            const codigo = parseInt(await rl.question('Digite o código do produto: '), 10);
                                                                                                                                                              const produto = buscarPorCodigo(codigo);

                                                                                                                                                                if (!produto) {
                                                                                                                                                                    console.log('Produto não encontrado.');
                                                                                                                                                                        return;
                                                                                                                                                                          }

                                                                                                                                                                            console.log(`Produto atual: ${produto.descricao} (Quantidade atual: ${produto.quantidade})`);
                                                                                                                                                                              const novaQuantidade = parseInt(await rl.question('Nova quantidade: '), 10);

                                                                                                                                                                                if (isNaN(novaQuantidade) || novaQuantidade < 0) {
                                                                                                                                                                                    console.log('Quantidade inválida.');
                                                                                                                                                                                        return;
                                                                                                                                                                                          }

                                                                                                                                                                                            console.log('Atualizando estoque...');
                                                                                                                                                                                              await simularDelay();

                                                                                                                                                                                                produto.quantidade = novaQuantidade;
                                                                                                                                                                                                  console.log('Quantidade atualizada com sucesso!');
                                                                                                                                                                                                  }

                                                                                                                                                                                                  // Função principal que controla o menu
                                                                                                                                                                                                  async function iniciarSistema() {
                                                                                                                                                                                                    const rl = readline.createInterface({ input, output });
                                                                                                                                                                                                      let executando = true;

                                                                                                                                                                                                        while (executando) {
                                                                                                                                                                                                            console.log('\n==============================');
                                                                                                                                                                                                                console.log('      CONTROLE DE ESTOQUE     ');
                                                                                                                                                                                                                    console.log('==============================');
                                                                                                                                                                                                                        console.log('1. Cadastrar novo produto');
                                                                                                                                                                                                                            console.log('2. Listar produtos cadastrados');
                                                                                                                                                                                                                                console.log('3. Alterar valor de um produto');
                                                                                                                                                                                                                                    console.log('4. Alterar quantidade de um produto');
                                                                                                                                                                                                                                        console.log('5. Sair');

                                                                                                                                                                                                                                            const opcao = await rl.question('Escolha uma opção: ');

                                                                                                                                                                                                                                                switch (opcao) {
                                                                                                                                                                                                                                                      case '1':
                                                                                                                                                                                                                                                              await cadastrarProduto(rl);
                                                                                                                                                                                                                                                                      break;
                                                                                                                                                                                                                                                                            case '2':
                                                                                                                                                                                                                                                                                    await listarProdutos();
                                                                                                                                                                                                                                                                                            break;
                                                                                                                                                                                                                                                                                                  case '3':
                                                                                                                                                                                                                                                                                                          await alterarValor(rl);
                                                                                                                                                                                                                                                                                                                  break;
                                                                                                                                                                                                                                                                                                                        case '4':
                                                                                                                                                                                                                                                                                                                                await alterarQuantidade(rl);
                                                                                                                                                                                                                                                                                                                                        break;
                                                                                                                                                                                                                                                                                                                                              case '5':
                                                                                                                                                                                                                                                                                                                                                      executando = false;
                                                                                                                                                                                                                                                                                                                                                              console.log('Encerrando o sistema...');
                                                                                                                                                                                                                                                                                                                                                                      break;
                                                                                                                                                                                                                                                                                                                                                                            default:
                                                                                                                                                                                                                                                                                                                                                                                    console.log('Opção inválida. Escolha de 1 a 5.');
                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                                                                            rl.close();
                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                            iniciarSistema();
                                                                                                                                                                                                                                                                                                                                                                                            