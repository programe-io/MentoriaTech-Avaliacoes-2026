let carrinho = [];
let total = 0;

function toggleCarrinho() {
    const sidebar = document.getElementById('carrinho-sidebar');
        sidebar.classList.toggle('active');
        }

        function adicionarAoCarrinho(nome, preco) {
            carrinho.push({ nome, preco });
                atualizarCarrinho();

                    const sidebar = document.getElementById('carrinho-sidebar');
                        if (!sidebar.classList.contains('active')) {
                                sidebar.classList.add('active');
                                    }
                                    }

                                    function atualizarCarrinho() {
                                        document.getElementById('cart-count').innerText = carrinho.length;

                                            const listaItens = document.getElementById('cart-items');
                                                listaItens.innerHTML = '';

                                                    total = 0;

                                                        carrinho.forEach(item => {
                                                                const li = document.createElement('li');
                                                                        li.innerHTML = `<span>${item.nome}</span> <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>`;
                                                                                listaItens.appendChild(li);
                                                                                        total += item.preco;
                                                                                            });

                                                                                                document.getElementById('cart-total-price').innerText =
                                                                                                        total.toFixed(2).replace('.', ',');
                                                                                                        }

                                                                                                        function finalizarCompra(event) {
                                                                                                            event.preventDefault();

                                                                                                                if (carrinho.length === 0) {
                                                                                                                        alert("Seu carrinho está vazio! Adicione um perfume antes de finalizar.");
                                                                                                                                return;
                                                                                                                                    }

                                                                                                                                        const nomeCliente = document.getElementById('nome').value;
                                                                                                                                            const formaPagamento = document.getElementById('payment-method').value;

                                                                                                                                                alert(
                                                                                                                                                        `Obrigado pela compra, ${nomeCliente}!\nPedido processado com sucesso via ${formaPagamento.toUpperCase()}.\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`
                                                                                                                                                            );

                                                                                                                                                                carrinho = [];
                                                                                                                                                                    atualizarCarrinho();
                                                                                                                                                                        toggleCarrinho();
                                                                                                                                                                            document.getElementById('checkout-form').reset();
                                                                                                                                                                            }