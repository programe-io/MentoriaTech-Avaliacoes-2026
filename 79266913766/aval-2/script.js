// Dados de exemplo (Simulação de um banco de dados de produtos)
const inventario = [
    { id: 1, nome: "Teclado Mecânico", categoria: "Periféricos", preco: 350.00, estoque: 15 },
        { id: 2, nome: "Mouse Gamer", categoria: "Periféricos", preco: 220.50, estoque: 8 },
            { id: 3, nome: "Monitor 24' IPS", categoria: "Monitores", preco: 899.90, estoque: 4 },
                { id: 4, nome: "Headset Bluetooth", categoria: "Áudio", preco: 180.00, estoque: 0 }, // Esgotado
                    { id: 5, nome: "Webcam Full HD", categoria: "Vídeo", preco: 299.00, estoque: 12 }
                    ];

                    // 1. Filtrar apenas os produtos que estão em estoque
                    const produtosDisponiveis = inventario.filter(produto => produto.estoque > 0);

                    // 2. Aplicar um cupom de desconto de 10% em todos os produtos disponíveis
                    const desconto = 0.10;
                    const produtosComDesconto = produtosDisponiveis.map(produto => {
                        return {
                                nome: produto.nome,
                                        precoOriginal: produto.preco,
                                                precoFinal: Number((produto.preco * (1 - desconto)).toFixed(2))
                                                    };
                                                    });

                                                    // 3. Calcular o valor total se um cliente comprasse uma unidade de cada produto com desconto
                                                    const valorTotalCarrinho = produtosComDesconto.reduce((acumulador, produto) => {
                                                        return acumulador + produto.precoFinal;
                                                        }, 0);

                                                        // ==========================================================================
                                                        // Exibindo os Resultados no Console
                                                        // ==========================================================================
                                                        console.log("--- PRODUTOS EM PROMOÇÃO (10% OFF) ---");
                                                        console.table(produtosComDesconto);

                                                        console.log(`\n🛒 Resumo da Compra:`);
                                                        console.log(`Quantidade de itens: ${produtosComDesconto.length}`);
                                                        console.log(`Valor Total do Carrinho: R$ ${valorTotalCarrinho.toFixed(2)}`);
                                                        