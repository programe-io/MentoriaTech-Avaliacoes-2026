let quantidade = 0;
let total = 0;
let carrinho = [];

function comprar(nome, preco) {
    quantidade++;
        total += preco;

            carrinho.push({
                    nome: nome,
                            preco: preco
                                });

                                    atualizarCarrinho();

                                        alert(nome + " adicionado ao carrinho!");
                                        }

                                        function atualizarCarrinho() {
                                            document.getElementById("quantidade").textContent = quantidade;

                                                document.getElementById("total").textContent =
                                                        total.toFixed(2);

                                                            let lista = document.getElementById("itens");

                                                                lista.innerHTML = "";

                                                                    carrinho.forEach(function(produto, indice) {
                                                                            lista.innerHTML += `
                                                                                        <p>
                                                                                                        ${produto.nome} - R$ ${produto.preco.toFixed(2)}
                                                                                                                        <button onclick="remover(${indice})">Remover</button>
                                                                                                                                    </p>
                                                                                                                                            `;
                                                                                                                                                });
                                                                                                                                                }

                                                                                                                                                function remover(indice) {
                                                                                                                                                    total -= carrinho[indice].preco;
                                                                                                                                                        quantidade--;

                                                                                                                                                            carrinho.splice(indice, 1);

                                                                                                                                                                atualizarCarrinho();
                                                                                                                                                                }

                                                                                                                                                                function finalizarCompra() {
                                                                                                                                                                    if (carrinho.length === 0) {
                                                                                                                                                                            alert("Seu carrinho está vazio!");
                                                                                                                                                                                    return;
                                                                                                                                                                                        }

                                                                                                                                                                                            alert(
                                                                                                                                                                                                    "Compra simulada com sucesso! Total: R$ " +
                                                                                                                                                                                                            total.toFixed(2)
                                                                                                                                                                                                                );

                                                                                                                                                                                                                    carrinho = [];
                                                                                                                                                                                                                        quantidade = 0;
                                                                                                                                                                                                                            total = 0;

                                                                                                                                                                                                                                atualizarCarrinho();

                                                                                                                                                                                                                                    document.getElementById("itens").textContent =
                                                                                                                                                                                                                                            "Nenhum produto adicionado.";
                                                                                                                                                                                                                                            }