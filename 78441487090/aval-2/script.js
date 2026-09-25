let total = 0;

function adicionar(preco) {
    total += preco;

        document.getElementById("total").innerText =
                total.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2
                                    });
                                    }