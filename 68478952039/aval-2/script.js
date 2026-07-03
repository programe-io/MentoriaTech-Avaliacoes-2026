// Classe que representa uma flor individual no catálogo
class Flor {
    constructor(id, nome, cor, preco, estoque) {
            this.id = id;
                    this.nome = nome;
                            this.cor = cor;
                                    this.preco = preco;
                                            this.estoque = estoque;
                                                }

                                                    obterResumo() {
                                                            return `${this.nome} (${this.cor}) - R$ ${this.preco.toFixed(2)} | Estoque: ${this.estoque} unid.`;
                                                                }
                                                                }

                                                                // Classe responsável pelo gerenciamento do estoque da floricultura
                                                                class Floricultura {
                                                                    constructor(nomeLoja) {
                                                                            this.nomeLoja = nomeLoja;
                                                                                    this.catalogo = [];
                                                                                        }

                                                                                            adicionarFlor(flor) {
                                                                                                    this.catalogo.push(flor);
                                                                                                            console.log(`Sucesso: ${flor.nome} adicionada ao catálogo!`);
                                                                                                                }

                                                                                                                    buscarPorCor(cor) {
                                                                                                                            console.log(`\n--- Flores na cor: ${cor} ---`);
                                                                                                                                    const filtradas = this.catalogo.filter(f => f.cor.toLowerCase() === cor.toLowerCase());
                                                                                                                                            if (filtradas.length === 0) console.log("Nenhuma flor encontrada nesta cor.");
                                                                                                                                                    else filtradas.forEach(f => console.log(f.obterResumo()));
                                                                                                                                                        }

                                                                                                                                                            venderFlor(id, quantidade) {
                                                                                                                                                                    const flor = this.catalogo.find(f => f.id === id);
                                                                                                                                                                            if (!flor) {
                                                                                                                                                                                        console.log(`Erro: Flor com ID ${id} não foi encontrada.`);
                                                                                                                                                                                                    return;
                                                                                                                                                                                                            }
                                                                                                                                                                                                                    if (flor.estoque >= quantidade) {
                                                                                                                                                                                                                                flor.estoque -= quantity; // Simula a baixa do produto
                                                                                                                                                                                                                                            const total = flor.preco * quantidade;
                                                                                                                                                                                                                                                        console.log(`\nVenda concluída! ${quantidade}x ${flor.nome}. Total: R$ ${total.toFixed(2)}`);
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                            console.log(`\nEstoque insuficiente para ${flor.nome}. Disponível: ${flor.estoque}`);
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                            exibirCatalogoCompleto() {
                                                                                                                                                                                                                                                                                                    console.log(`\n=== BEM-VINDO À ${this.nomeLoja.toUpperCase()} ===`);
                                                                                                                                                                                                                                                                                                            this.catalogo.forEach(flor => console.log(flor.obterResumo()));
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                // Execução e testes do sistema da floricultura
                                                                                                                                                                                                                                                                                                                const minhaFloricultura = new Floricultura("A Beleza do Amor");

                                                                                                                                                                                                                                                                                                                // Instanciando os objetos de flores
                                                                                                                                                                                                                                                                                                                const flor1 = new Flor(1, "Rosa Vermelha", "Vermelha", 8.50, 50);
                                                                                                                                                                                                                                                                                                                const flor2 = new Flor(2, "Orquídea Phalaenopsis", "Branca", 45.00, 12);
                                                                                                                                                                                                                                                                                                                const flor3 = new Flor(3, "Girassol", "Amarelo", 12.00, 25);
                                                                                                                                                                                                                                                                                                                const flor4 = new Flor(4, "Tulipa", "Vermelha", 15.00, 8);

                                                                                                                                                                                                                                                                                                                // Alimentando o estoque do sistema
                                                                                                                                                                                                                                                                                                                minhaFloricultura.adicionarFlor(flor1);
                                                                                                                                                                                                                                                                                                                minhaFloricultura.adicionarFlor(flor2);
                                                                                                                                                                                                                                                                                                                minhaFloricultura.adicionarFlor(flor3);
                                                                                                                                                                                                                                                                                                                minhaFloricultura.adicionarFlor(flor4);

                                                                                                                                                                                                                                                                                                                // Demonstração das funcionalidades no console
                                                                                                                                                                                                                                                                                                                minhaFloricultura.exibirCatalogoCompleto();
                                                                                                                                                                                                                                                                                                                minhaFloricultura.buscarPorCor("Vermelha");
                                                                                                                                                                                                                                                                                                                minhaFloricultura.venderFlor(1, 3); // Venda bem-sucedida
                                                                                                                                                                                                                                                                                                                minhaFloricultura.venderFlor(4, 10); // Tentativa com estoque insuficiente
                                                                                                                                                                                                                                                                                                                minhaFloricultura.exibirCatalogoCompleto(); // Catálogo atualizado
                                                                                                                                                                                                                                                                                                                