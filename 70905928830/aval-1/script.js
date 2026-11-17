
// ARRAY E CÓDIGO AUTOMÁTICO
let produtos = [];
let codigo = 1;


// 1 - CADASTRAR NOVO PRODUTO
async function cadastrarProduto() {

    let descricao = prompt("Digite a descrição do produto:");
        let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor:"));

                if (!descricao || quantidade < 0 || valor < 0) {
                        alert("Dados inválidos!");
                                return;
                                    }

                                        await Promise.resolve();

                                            let produto = {
                                                    codigo: codigo++,
                                                            descricao: descricao,
                                                                    quantidade: quantidade,
                                                                            valor: valor
                                                                                };

                                                                                    produtos.push(produto);

                                                                                        alert("Produto cadastrado com sucesso!");
                                                                                        }


                                                                                        // 2 - LISTAR PRODUTOS CADASTRADOS
                                                                                        function listarProdutos() {

                                                                                            if (produtos.length === 0) {
                                                                                                    alert("Nenhum produto cadastrado!");
                                                                                                            return;
                                                                                                                }

                                                                                                                    produtos.forEach(function(produto) {

                                                                                                                            alert(
                                                                                                                                        "Código: " + produto.codigo +
                                                                                                                                                    "\nDescrição: " + produto.descricao +
                                                                                                                                                                "\nQuantidade: " + produto.quantidade +
                                                                                                                                                                            "\nValor: R$ " + produto.valor.toFixed(2)
                                                                                                                                                                                    );

                                                                                                                                                                                        });
                                                                                                                                                                                        }


                                                                                                                                                                                        // 3 - ALTERAR VALOR DO PRODUTO
                                                                                                                                                                                        async function alterarValor() {

                                                                                                                                                                                            let codigoProduto = Number(prompt("Digite o código do produto:"));

                                                                                                                                                                                                let produto = produtos.find(function(p) {
                                                                                                                                                                                                        return p.codigo === codigoProduto;
                                                                                                                                                                                                            });

                                                                                                                                                                                                                if (produto) {

                                                                                                                                                                                                                        let novoValor = Number(prompt("Digite o novo valor:"));

                                                                                                                                                                                                                                if (novoValor < 0) {
                                                                                                                                                                                                                                            alert("Valor inválido!");
                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                        await Promise.resolve();

                                                                                                                                                                                                                                                                                produto.valor = novoValor;

                                                                                                                                                                                                                                                                                        alert("Valor alterado com sucesso!");

                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                    alert("Produto não encontrado!");
                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                        }


                                                                                                                                                                                                                                                                                                        // 4 - ALTERAR QUANTIDADE DO PRODUTO
                                                                                                                                                                                                                                                                                                        async function alterarQuantidade() {

                                                                                                                                                                                                                                                                                                            let codigoProduto = Number(prompt("Digite o código do produto:"));

                                                                                                                                                                                                                                                                                                                let produto = produtos.find(function(p) {
                                                                                                                                                                                                                                                                                                                        return p.codigo === codigoProduto;
                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                if (produto) {

                                                                                                                                                                                                                                                                                                                                        let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

                                                                                                                                                                                                                                                                                                                                                if (novaQuantidade < 0) {
                                                                                                                                                                                                                                                                                                                                                            alert("Quantidade inválida!");
                                                                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                        await Promise.resolve();

                                                                                                                                                                                                                                                                                                                                                                                                produto.quantidade = novaQuantidade;

                                                                                                                                                                                                                                                                                                                                                                                                        alert("Quantidade alterada com sucesso!");

                                                                                                                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                                                                                                                    alert("Produto não encontrado!");
                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                        