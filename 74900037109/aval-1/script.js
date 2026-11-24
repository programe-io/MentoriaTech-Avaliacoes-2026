let produtos = JSON.parse(localStorage.getItem('estoque_produtos')) || [];

const form = document.getElementById('produto-form');
const tabelaCorpo = document.getElementById('tabela-corpo');
const emptyState = document.getElementById('empty-state');

function salvarLocalStorage() {
    localStorage.setItem('estoque_produtos', JSON.stringify(produtos));
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('produto-id').value;
    const codigo = document.getElementById('codigo').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const minimo = parseInt(document.getElementById('minimo').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (id) {
        const index = produtos.findIndex(p => p.id === id);
        if (index !== -1) {
            produtos[index] = { id, codigo, nome, categoria, quantidade, minimo, preco };
        }
        cancelarEdicao();
    } else {
        produtos.push({
            id: Date.now().toString(),
            codigo,
            nome,
            categoria,
            quantidade,
            minimo,
            preco
        });
        form.reset();
        document.getElementById('quantidade').value = 1;
        document.getElementById('minimo').value = 5;
    }

    salvarLocalStorage();
    atualizarTudo();
});

function alterarQuantidade(id, delta) {
    const produto = produtos.find(p => p.id === id);
    if (produto && produto.quantidade + delta >= 0) {
        produto.quantidade += delta;
        salvarLocalStorage();
        atualizarTudo();
    }
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    document.getElementById('produto-id').value = produto.id;
    document.getElementById('codigo').value = produto.codigo;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('minimo').value = produto.minimo;
    document.getElementById('preco').value = produto.preco;

    document.getElementById('form-title').textContent = 'Editar Produto';
    document.getElementById('btn-submit').textContent = 'Atualizar';
    document.getElementById('btn-cancelar').hidden = false;
}

function cancelarEdicao() {
    form.reset();
    document.getElementById('produto-id').value = '';
    document.getElementById('quantidade').value = 1;
    document.getElementById('minimo').value = 5;
    document.getElementById('form-title').textContent = 'Cadastrar Produto';
    document.getElementById('btn-submit').textContent = 'Salvar';
    document.getElementById('btn-cancelar').hidden = true;
}

function excluirProduto(id) {
    if (confirm('Excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        salvarLocalStorage();
        atualizarTudo();
    }
}

function limparTudo() {
    if (confirm('Apagar todos os dados?')) {
        produtos = [];
        salvarLocalStorage();
        atualizarTudo();
    }
}

function atualizarEstatisticas() {
    document.getElementById('stat-produtos').textContent = produtos.length;
    document.getElementById('stat-itens').textContent = produtos.reduce((acc, p) => acc + p.quantidade, 0);
    document.getElementById('stat-valor').textContent = formatarMoeda(produtos.reduce((acc, p) => acc + (p.quantidade * p.preco), 0));
    document.getElementById('stat-alertas').textContent = produtos.filter(p => p.quantidade <= p.minimo).length;
}

function renderizarTabela() {
    const termo = document.getElementById('busca').value.toLowerCase();
    const filtroStatus = document.getElementById('filtro-status').value;

    const filtrados = produtos.filter(p => {
        const matchTexto = p.nome.toLowerCase().includes(termo) || p.codigo.toLowerCase().includes(termo) || p.categoria.toLowerCase().includes(termo);
        if (filtroStatus === 'ok') return matchTexto && p.quantidade > p.minimo;
        if (filtroStatus === 'baixo') return matchTexto && p.quantidade > 0 && p.quantidade <= p.minimo;
        if (filtroStatus === 'zerado') return matchTexto && p.quantidade === 0;
        return matchTexto;
    });

    tabelaCorpo.innerHTML = '';
    emptyState.hidden = filtrados.length > 0;

    filtrados.forEach(p => {
        let status = 'Normal';
        if (p.quantidade === 0) status = 'Sem Estoque';
        else if (p.quantidade <= p.minimo) status = 'Estoque Baixo';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.nome}</td>
            <td>${p.categoria}</td>
            <td>${p.quantidade}</td>
            <td>${p.minimo}</td>
            <td>${formatarMoeda(p.preco)}</td>
            <td>${formatarMoeda(p.quantidade * p.preco)}</td>
            <td>${status}</td>
            <td>
                <button type="button" onclick="alterarQuantidade('${p.id}', 1)">+</button>
                <button type="button" onclick="alterarQuantidade('${p.id}', -1)">-</button>
                <button type="button" onclick="editarProduto('${p.id}')">Editar</button>
                <button type="button" onclick="excluirProduto('${p.id}')">Excluir</button>
            </td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

function exportarCSV() {
    if (produtos.length === 0) return alert('Nenhum produto para exportar.');
    const cabecalho = ['Codigo', 'Produto', 'Categoria', 'Quantidade', 'Minimo', 'Preco', 'Total'];
    const linhas = produtos.map(p => [p.codigo, p.nome, p.categoria, p.quantidade, p.minimo, p.preco.toFixed(2), (p.quantidade * p.preco).toFixed(2)].join(';'));
    const csv = "data:text/csv;charset=utf-8,\uFEFF" + [cabecalho.join(';'), ...linhas].join('\n');
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "estoque.csv";
    link.click();
}

function atualizarTudo() {
    atualizarEstatisticas();
    renderizarTabela();
}

atualizarTudo();