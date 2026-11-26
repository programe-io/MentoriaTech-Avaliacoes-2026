// Carrega os produtos salvos no navegador ou inicia um array vazio
let produtos = JSON.parse(localStorage.getItem('estoque_produtos')) || [];

const form = document.getElementById('form-produto');
const tabela = document.getElementById('tabela-produtos');
const inputBusca = document.getElementById('busca');
const totalItensEl = document.getElementById('total-itens');
const valorTotalEl = document.getElementById('valor-total');

// Salva no localStorage e atualiza a tela
function salvarERenderizar() {
    localStorage.setItem('estoque_produtos', JSON.stringify(produtos));
    renderizarTabela(inputBusca.value);
}

// Formata valores para Real (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderiza os itens na tabela e atualiza os totais
function renderizarTabela(filtro = '') {
    tabela.innerHTML = '';
    let totalItens = 0;
    let valorTotal = 0;

    const termo = filtro.toLowerCase();

    const produtosFiltrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.categoria.toLowerCase().includes(termo)
    );

    produtosFiltrados.forEach(produto => {
        const subtotal = produto.quantidade * produto.preco;
        totalItens += produto.quantidade;
        valorTotal += subtotal;

        const tr = document.createElement('tr');
        
        // Destaca em vermelho se tiver menos de 5 unidades
        const classeAlerta = produto.quantidade < 5 ? 'estoque-baixo' : '';

        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td class="${classeAlerta}">${produto.quantidade} ${produto.quantidade < 5 ? '⚠️' : ''}</td>
            <td>${formatarMoeda(produto.preco)}</td>
            <td>${formatarMoeda(subtotal)}</td>
            <td class="acoes">
                <button class="btn-qtd" onclick="alterarQuantidade(${produto.id}, 1)" title="Adicionar 1">+</button>
                <button class="btn-qtd" onclick="alterarQuantidade(${produto.id}, -1)" title="Remover 1">-</button>
                <button class="btn-del" onclick="removerProduto(${produto.id})" title="Excluir produto">🗑️</button>
            </td>
        `;
        tabela.appendChild(tr);
    });

    totalItensEl.textContent = totalItens;
    valorTotalEl.textContent = formatarMoeda(valorTotal);
}

// Adiciona um novo produto
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    const novoProduto = {
        id: Date.now(), // Gera um ID único baseado no tempo atual
        nome,
        categoria,
        quantidade,
        preco
    };

    produtos.push(novoProduto);
    form.reset();
    salvarERenderizar();
});

// Aumenta ou diminui a quantidade em estoque
function alterarQuantidade(id, delta) {
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos[index].quantidade += delta;
        
        // Se zerar, pergunta se deseja excluir o item
        if (produtos[index].quantidade <= 0) {
            if (confirm(`A quantidade de "${produtos[index].nome}" chegou a zero. Deseja excluir o item?`)) {
                produtos.splice(index, 1);
            } else {
                produtos[index].quantidade = 0;
            }
        }
        salvarERenderizar();
    }
}

// Remove um produto da lista
function removerProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        salvarERenderizar();
    }
}

// Filtra a lista enquanto o usuário digita
inputBusca.addEventListener('input', (e) => {
    renderizarTabela(e.target.value);
});

// Inicializa a tabela ao abrir a página
renderizarTabela();