
let carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({
            nome: nome,
                    preco: preco
                        });

                            atualizarCarrinho();

                                alert(nome + " foi adicionado ao carrinho!");
                                }

                                function atualizarCarrinho() {
                                    document.getElementById("quantidade").textContent =
                                            carrinho.length;

                                                let lista = document.getElementById("itens");
                                                    let total = 0;

                                                        lista.innerHTML = "";

                                                            carrinho.forEach((item, index) => {
                                                                    total += item.preco;

                                                                            lista.innerHTML += `
                                                                                        <p>
                                                                                                        ${item.nome} - R$ ${item.preco.toFixed(2)}
                                                                                                                        <button onclick="remover(${index})">❌</button>
                                                                                                                                    </p>
                                                                                                                                            `;
                                                                                                                                                });

                                                                                                                                                    document.getElementById("total").textContent =
                                                                                                                                                            "Total: R$ " + total.toFixed(2).replace(".", ",");
                                                                                                                                                            }

                                                                                                                                                            function remover(index) {
                                                                                                                                                                carrinho.splice(index, 1);
                                                                                                                                                                    atualizarCarrinho();
                                                                                                                                                                    }

                                                                                                                                                                    function mostrarCarrinho() {
                                                                                                                                                                        document.getElementById("modal").style.display = "flex";
                                                                                                                                                                            atualizarCarrinho();
                                                                                                                                                                            }

                                                                                                                                                                            function fecharCarrinho() {
                                                                                                                                                                                document.getElementById("modal").style.display = "none";
                                                                                                                                                                                }

                                                                                                                                                                                function finalizarPedido() {
                                                                                                                                                                                    if (carrinho.length === 0) {
                                                                                                                                                                                            alert("Seu carrinho está vazio!");
                                                                                                                                                                                                    return;
                                                                                                                                                                                                        }

                                                                                                                                                                                                            let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";

                                                                                                                                                                                                                carrinho.forEach(item => {
                                                                                                                                                                                                                        mensagem += item.nome + " - R$ " +
                                                                                                                                                                                                                                    item.preco.toFixed(2).replace(".", ",") + "\n";
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                            let total = carrinho.reduce((soma, item) =>
                                                                                                                                                                                                                                                    soma + item.preco, 0);

                                                                                                                                                                                                                                                        mensagem += "\nTotal: R$ " +
                                                                                                                                                                                                                                                                total.toFixed(2).replace(".", ",");

                                                                                                                                                                                                                                                                    alert(mensagem + "\n\nPedido demonstrativo realizado!");

                                                                                                                                                                                                                                                                        carrinho = [];
                                                                                                                                                                                                                                                                            atualizarCarrinho();
                                                                                                                                                                                                                                                                                fecharCarrinho();
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                