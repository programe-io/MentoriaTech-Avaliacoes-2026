let estoque = JSON.parse(localStorage.getItem('meu_estoque')) || [];

const form = document.getElementById('form-produto');
const tabela = document.getElementById('tabela-estoque');
const buscaInput = document.getElementById('busca');

function salvarDados() {
    localStorage.setItem('meu_estoque', JSON.stringify(estoque));
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarResumo() {
    const totalProdutos = estoque.length;
    const totalItens = estoque.reduce((acc, item) => acc + item.quantidade, 0);
    const valorTotal = estoque.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);

    document.getElementById('total-produtos').innerText = totalProdutos;
    document.getElementById('total-itens').innerText = totalItens;
    document.getElementById('valor-total').innerText = formatarMoeda(valorTotal);
}

function renderizarTabela(filtro = '') {
    tabela.innerHTML = '';

    const itensFiltrados = estoque.filter(item =>
        item.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        item.categoria.toLowerCase().includes(filtro.toLowerCase())
    );

    itensFiltrados.forEach((item) => {
        const indexReal = estoque.indexOf(item);
        const subtotal = item.quantidade * item.preco;
        const alertaEstoque = item.quantidade <= 5 ? 'low-stock' : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.categoria}</td>
            <td class="${alertaEstoque}">${item.quantidade}</td>
            <td>${formatarMoeda(item.preco)}</td>
            <td>${formatarMoeda(subtotal)}</td>
            <td>
                <button class="btn-action btn-plus" onclick="alterarQtd(${indexReal}, 1)">+1</button>
                <button class="btn-action btn-minus" onclick="alterarQtd(${indexReal}, -1)">-1</button>
                <button class="btn-action btn-delete" onclick="removerProduto(${indexReal})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });

    atualizarResumo();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    estoque.push({ nome, categoria, quantidade, preco });
    salvarDados();
    renderizarTabela(buscaInput.value);
    form.reset();
});

function alterarQtd(index, delta) {
    if (estoque[index].quantidade + delta >= 0) {
        estoque[index].quantidade += delta;
        salvarDados();
        renderizarTabela(buscaInput.value);
    }
}

function removerProduto(index) {
    if (confirm(`Deseja realmente excluir "${estoque[index].nome}"?`)) {
        estoque.splice(index, 1);
        salvarDados();
        renderizarTabela(buscaInput.value);
    }
}

buscaInput.addEventListener('input', (e) => {
    renderizarTabela(e.target.value);
});

// Inicializa a tabela ao carregar a página
renderizarTabela();