
let total = 0;
let quantidade = 0;

function adicionar(nome, preco) {
    const lista = document.getElementById("lista");

        const item = document.createElement("li");
            item.textContent = nome + " - R$ " + preco.toFixed(2).replace(".", ",");

                lista.appendChild(item);

                    total += preco;
                        quantidade++;

                            document.getElementById("total").textContent =
                                    total.toFixed(2).replace(".", ",");

                                        document.getElementById("quantidade").textContent = quantidade;

                                            alert(nome + " adicionado ao carrinho!");
                                            }

                                            function finalizarCompra() {
                                                if (quantidade === 0) {
                                                        alert("Seu carrinho está vazio!");
                                                                return;
                                                                    }

                                                                        alert(
                                                                                "Compra simulada com sucesso!\n" +
                                                                                        "Quantidade de itens: " + quantidade +
                                                                                                "\nTotal: R$ " + total.toFixed(2).replace(".", ",")
                                                                                                    );

                                                                                                        document.getElementById("lista").innerHTML = "";
                                                                                                            document.getElementById("total").textContent = "0,00";
                                                                                                                document.getElementById("quantidade").textContent = "0";

                                                                                                                    total = 0;
                                                                                                                        quantidade = 0;
                                                                                                                        }

                                                                                                                        function mostrarProdutos() {
                                                                                                                            document.getElementById("produtos").scrollIntoView({
                                                                                                                                    behavior: "smooth"
                                                                                                                                        });
                                                                                                                                        }
                                                                                                                                        