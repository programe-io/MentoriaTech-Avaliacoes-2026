
let sacola = [];

function adicionar(nome, preco) {
    const produtoExistente = sacola.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        sacola.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarSacola();

    alert(nome + ' foi adicionado à sua sacola!');
}

function atualizarSacola() {
    const quantidadeTotal = sacola.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById('quantidade').textContent =
        quantidadeTotal;
}

function mostrarSacola() {
    if (sacola.length === 0) {
        alert('Sua sacola está vazia. Escolha seu próximo passo!');
        return;
    }

    let mensagem = 'SUA SACOLA NEXSTEP\n\n';
    let subtotal = 0;

    sacola.forEach(produto => {
        const totalProduto =
            produto.preco * produto.quantidade;

        subtotal += totalProduto;

        mensagem +=
            produto.nome +
            ' x' + produto.quantidade +
            ' — ' + formatarPreco(totalProduto) +
            '\n';
    });

    mensagem += '\nSubtotal: ' + formatarPreco(subtotal);
    mensagem += '\n\nEsta é uma compra demonstrativa.';

    alert(mensagem);
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
