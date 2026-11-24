// Carrega os produtos salvos no navegador ou inicia com uma lista vazia
let produtos = JSON.parse(localStorage.getItem('estoque_produtos')) || [];

// Elementos do DOM
const form = document.getElementById('form-produto');
const tabela = document.getElementById('tabela-produtos');
const inputBusca = document.getElementById('busca');

// Formata valores para Real (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Salva no LocalStorage e atualiza a tela
function salvarERenderizar() {
    localStorage.setItem('estoque_produtos', JSON.stringify(produtos));
    renderizarTabela(inputBusca.value);
    atualizarDashboard();
}

// Atualiza os cards superiores
function atualizarDashboard() {
    const totalProdutos = produtos.length;
    const totalUnidades = produtos.reduce((acc, p) => acc + p.quantidade, 0);
    const valorTotal = produtos.reduce((acc, p) => acc + (p.quantidade * p.preco), 0);
    const estoqueBaixo = produtos.filter(p => p.quantidade < 5).length;

    document.getElementById('total-produtos').innerText = totalProdutos;
    document.getElementById('total-unidades').innerText = totalUnidades;
    document.getElementById('valor-total').innerText = formatarMoeda(valorTotal);
    document.getElementById('estoque-baixo').innerText = estoqueBaixo;
}

// Renderiza a tabela na tela (com suporte a filtro de busca)
function renderizarTabela(filtro = '') {
    tabela.innerHTML = '';

    const termo = filtro.toLowerCase();
    const produtosFiltrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) ||
        p.codigo.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
    );

    if (produtosFiltrados.length === 0) {
        tabela.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#64748b;">Nenhum produto encontrado.</td></tr>`;
        return;
    }

    produtosFiltrados.forEach((produto) => {
        // Encontra o índice real no array original para evitar bugs durante a busca
        const indexReal = produtos.findIndex(p => p.id === produto.id);
        const subtotal = produto.quantidade * produto.preco;
        const classeQtd = produto.quantidade < 5 ? 'qtd-baixa' : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${produto.codigo}</strong></td>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td><span class="${classeQtd}">${produto.quantidade} un.</span></td>
            <td>${formatarMoeda(produto.preco)}</td>
            <td><strong>${formatarMoeda(subtotal)}</strong></td>
            <td class="acoes">
                <button class="btn-acao btn-mais" onclick="alterarQuantidade(${indexReal}, 1)" title="Entrada (+1)">+</button>
                <button class="btn-acao btn-menos" onclick="alterarQuantidade(${indexReal}, -1)" title="Saída (-1)">-</button>
                <button class="btn-acao btn-excluir" onclick="removerProduto(${indexReal})" title="Excluir">🗑️</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}

// Evento de cadastro de novo produto
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const codigo = document.getElementById('codigo').value.trim().toUpperCase();
    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    // Verifica se o código já existe
    const existe = produtos.some(p => p.codigo === codigo);
    if (existe) {
        alert('Já existe um produto cadastrado com este código!');
        return;
    }

    const novoProduto = {
        id: Date.now(),
        codigo,
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
function alterarQuantidade(index, delta) {
    if (produtos[index].quantidade + delta < 0) {
        alert('A quantidade em estoque não pode ser negativa!');
        return;
    }
    produtos[index].quantidade += delta;
    salvarERenderizar();
}

// Remove um produto
function removerProduto(index) {
    const confirmar = confirm(`Deseja realmente excluir "${produtos[index].nome}" do estoque?`);
    if (confirmar) {
        produtos.splice(index, 1);
        salvarERenderizar();
    }
}

// Filtro de pesquisa em tempo real
inputBusca.addEventListener('input', (e) => {
    renderizarTabela(e.target.value);
});

// Inicializa o sistema ao abrir a página
salvarERenderizar();