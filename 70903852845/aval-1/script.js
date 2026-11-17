
const readline = require("readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
        output: process.stdout
        });

        let produtos = [];
        let proximoCodigo = 1;

        // Cadastrar produto
        async function cadastrarProduto() {
            let descricao = await rl.question("Descrição: ");
                let quantidade = Number(await rl.question("Quantidade: "));
                    let valor = Number(await rl.question("Valor: "));

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
                                                                        console.log("\n--- PRODUTOS CADASTRADOS ---");

                                                                            if (produtos.length === 0) {
                                                                                    console.log("Nenhum produto cadastrado.");
                                                                                            return;
                                                                                                }

                                                                                                    produtos.forEach(p => {
                                                                                                            console.log(
                                                                                                                        `Código: ${p.codigo} | Descrição: ${p.descricao} | Quantidade: ${p.quantidade} | Valor: R$ ${p.valor}`
                                                                                                                                );
                                                                                                                                    });
                                                                                                                                    }

                                                                                                                                    // Alterar valor
                                                                                                                                    async function alterarValor() {
                                                                                                                                        let codigo = Number(await rl.question("Digite o código: "));

                                                                                                                                            let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                if (produto) {
                                                                                                                                                        produto.valor = Number(await rl.question("Novo valor: "));
                                                                                                                                                                console.log("Valor atualizado!");
                                                                                                                                                                    } else {
                                                                                                                                                                            console.log("Produto não encontrado!");
                                                                                                                                                                                }
                                                                                                                                                                                }

                                                                                                                                                                                // Alterar quantidade
                                                                                                                                                                                async function alterarQuantidade() {
                                                                                                                                                                                    let codigo = Number(await rl.question("Digite o código: "));

                                                                                                                                                                                        let produto = produtos.find(p => p.codigo === codigo);

                                                                                                                                                                                            if (produto) {
                                                                                                                                                                                                    produto.quantidade = Number(await rl.question("Nova quantidade: "));
                                                                                                                                                                                                            console.log("Quantidade atualizada!");
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                        console.log("Produto não encontrado!");
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                            // Menu principal
                                                                                                                                                                                                                            async function menu() {
                                                                                                                                                                                                                                let opcao;

                                                                                                                                                                                                                                    do {
                                                                                                                                                                                                                                            console.log("\n===== SISTEMA DE ESTOQUE =====");
                                                                                                                                                                                                                                                    console.log("1 - Cadastrar produto");
                                                                                                                                                                                                                                                            console.log("2 - Listar produtos");
                                                                                                                                                                                                                                                                    console.log("3 - Alterar valor");
                                                                                                                                                                                                                                                                            console.log("4 - Alterar quantidade");
                                                                                                                                                                                                                                                                                    console.log("0 - Sair");

                                                                                                                                                                                                                                                                                            opcao = Number(await rl.question("Escolha uma opção: "));

                                                                                                                                                                                                                                                                                                    switch (opcao) {
                                                                                                                                                                                                                                                                                                                case 1:
                                                                                                                                                                                                                                                                                                                                await cadastrarProduto();
                                                                                                                                                                                                                                                                                                                                                break;

                                                                                                                                                                                                                                                                                                                                                            case 2:
                                                                                                                                                                                                                                                                                                                                                                            await listarProdutos();
                                                                                                                                                                                                                                                                                                                                                                                            break;

                                                                                                                                                                                                                                                                                                                                                                                                        case 3:
                                                                                                                                                                                                                                                                                                                                                                                                                        await alterarValor();
                                                                                                                                                                                                                                                                                                                                                                                                                                        break;

                                                                                                                                                                                                                                                                                                                                                                                                                                                    case 4:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    await alterarQuantidade();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    break;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                case 0:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log("Sistema encerrado!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                break;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            default:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log("Opção inválida!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } while (opcao !== 0);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            rl.close();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // Executar sistema
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            menu();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            