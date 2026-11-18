
let total = 0;
let quantidade = 0;

function adicionar(nome, preco) {
    let lista = document.getElementById("lista");

        let item = document.createElement("li");

            item.textContent = nome + " - R$ " +
                    preco.toFixed(2).replace(".", ",");

                        lista.appendChild(item);

                            total += preco;
                                quantidade++;

                                    atualizarCarrinho();

                                        alert(nome + " foi adicionado ao carrinho!");
                                        }

                                        function atualizarCarrinho() {
                                            document.getElementById("quantidade").textContent =
                                                    quantidade;

                                                        document.getElementById("total").textContent =
                                                                total.toFixed(2).replace(".", ",");
                                                                }

                                                                function finalizarCompra() {
                                                                    if (quantidade === 0) {
                                                                            alert("Seu carrinho está vazio!");
                                                                                    return;
                                                                                        }

                                                                                            alert(
                                                                                                    "TOUCHDOWN STORE!\n\n" +
                                                                                                            "Compra simulada com sucesso!\n" +
                                                                                                                    "Produtos: " + quantidade +
                                                                                                                            "\nValor total: R$ " +
                                                                                                                                    total.toFixed(2).replace(".", ",")
                                                                                                                                        );

                                                                                                                                            document.getElementById("lista").innerHTML = "";

                                                                                                                                                total = 0;
                                                                                                                                                    quantidade = 0;

                                                                                                                                                        atualizarCarrinho();
                                                                                                                                                        }

                                                                                                                                                        function verProdutos() {
                                                                                                                                                            document.getElementById("produtos").scrollIntoView({
                                                                                                                                                                    behavior: "smooth"
                                                                                                                                                                        });
                                                                                                                                                                        }
                                                                                                                                                                        