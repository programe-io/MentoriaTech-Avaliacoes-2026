
function adicionar(nome, preco) {
    const valor = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const resposta = confirm(
        "Produto: " + nome +
        "\nPreço: " + valor +
        "\n\nDeseja continuar?"
    );

    if (resposta) {
        alert(
            "Você selecionou " + nome +
            "!\nValor: " + valor +
            "\n\nEntre em contato com a loja para concluir a compra."
        );
    }
}
