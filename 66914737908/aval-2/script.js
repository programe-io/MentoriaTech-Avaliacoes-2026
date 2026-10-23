// Estado inicial dos produtos (carrega do LocalStorage ou usa dados de exemplo)
let produtos = JSON.parse(localStorage.getItem('produtos_estoque')) || [
    { id: 1, codigo: 'PRD001', nome: 'Camiseta Básica Algodão', categoria: 'Vestuário', precoCusto: 25.00, PrecoVenda: 59.90, estoque: 15 },
    { id: 2, codigo: 'PRD002', nome: 'Tênis Esportivo Runner', categoria: 'Calçados', precoCusto: 90.00, PrecoVenda: 199.90, estoque: 4 }
];

// Salvar no LocalStorage
function salvarStorage() {
    localStorage.setItem('produtos_estoque', JSON.stringify(produtos));
    atualizarDashboard();
}

// Inicializar aplicação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarDashboard();
});

// Atualizar Tabela e KPIs
function atualizarDashboard(lista = produtos) {
    const tbody = document.getElementById('tabelaProdutos');
    tbody.innerHTML = '';

    let totalItens = 0;
    let valorTotalEstoque = 0;
    let estoqueBaixoCount = 0;

    lista.forEach(p => {
        totalItens += Number(p.estoque);
        valorTotalEstoque += (Number(p.precoCusto) * Number(p.estoque));
        
        const isBaixo = Number(p.estoque) <= 5;
        if (isBaixo) estoqueBaixoCount++;

        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition border-b border-slate-100";
        tr.innerHTML = `
            <td class="py-3 px-4 font-medium text-slate-600">${p.codigo}</td>
            <td class="py-3 px-4 font-semibold text-slate-800">${p.nome}</td>
            <td class="py-3 px-4"><span class="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium">${p.categoria}</span></td>
            <td class="py-3 px-4 text-slate-600">R$ ${Number(p.precoCusto).toFixed(2)}</td>
            <td class="py-3 px-4 text-slate-600">R$ ${Number(p.PrecoVenda).toFixed(2)}</td>
            <td class="py-3 px-4">
                <span class="${isBaixo ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-600'} px-2 py-1 rounded-md text-xs font-bold inline-flex items-center space-x-1">
                    ${isBaixo ? '<i class="fa-solid fa-triangle-exclamation mr-1"></i>' : ''} ${p.estoque} un.
                </span>
            </td>
            <td class="py-3 px-4 text-center space-x-2">
                <button onclick="editarProduto(${p.id})" class="text-slate-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="excluirProduto(${p.id})" class="text-slate-400 hover:text-rose-600 transition" title="Excluir"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('kpiTotalProdutos').innerText = totalItens;
    document.getElementById('kpiValorEstoque').innerText = `R$ ${valorTotalEstoque.toFixed(2)}`;
    document.getElementById('kpiEstoqueBaixo').innerText = estoqueBaixoCount;
}

// Abrir e Fechar Modal de Produto
function abrirModalProduto() {
    document.getElementById('modalTitulo').innerText = "Cadastrar Novo Produto";
    document.getElementById('formProduto').reset();
    document.getElementById('produtoId').value = '';
    document.getElementById('modalProduto').classList.remove('hidden');
    document.getElementById('modalProduto').classList.add('flex');
}

function fecharModalProduto() {
    document.getElementById('modalProduto').classList.remove('flex');
    document.getElementById('modalProduto').classList.add('hidden');
}

// Salvar Produto (Criar ou Editar)
function salvarProduto(event) {
    event.preventDefault();
    const id = document.getElementById('produtoId').value;
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const precoCusto = parseFloat(document.getElementById('precoCusto').value);
    const PrecoVenda = parseFloat(document.getElementById('PrecoVenda').value);
    const estoque = parseInt(document.getElementById('estoque').value);

    if (id) {
        // Editando
        const p = produtos.find(item => item.id == id);
        p.codigo = codigo;
        p.nome = nome;
        p.categoria = categoria;
        p.precoCusto = precoCusto;
        p.PrecoVenda = PrecoVenda;
        p.estoque = estoque;
    } else {
        // Criando Novo
        const novo = {
            id: Date.now(),
            codigo,
            nome,
            categoria,
            precoCusto,
            PrecoVenda,
            estoque
        };
        produtos.push(novo);
    }

    salvarStorage();
    fecharModalProduto();
}

// Editar Produto
function editarProduto(id) {
    const p = produtos.find(item => item.id == id);
    if (!p) return;

    document.getElementById('modalTitulo').innerText = "Editar Produto";
    document.getElementById('produtoId').value = p.id;
    document.getElementById('codigo').value = p.codigo;
    document.getElementById('nome').value = p.nome;
    document.getElementById('categoria').value = p.categoria;
    document.getElementById('precoCusto').value = p.precoCusto;
    document.getElementById('PrecoVenda').value = p.PrecoVenda;
    document.getElementById('estoque').value = p.estoque;

    document.getElementById('modalProduto').classList.remove('hidden');
    document.getElementById('modalProduto').classList.add('flex');
}

// Excluir Produto
function excluirProduto(id) {
    if (confirm('Deseja realmente excluir este produto?')) {
        produtos = produtos.filter(p => p.id != id);
        salvarStorage();
    }
}

// Filtrar Tabela por Busca
function filtrarProdutos() {
    const termo = document.getElementById('inputBusca').value.toLowerCase();
    const filtrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.codigo.toLowerCase().includes(termo) || 
        p.categoria.toLowerCase().includes(termo)
    );
    atualizarDashboard(filtrados);
}

// Modais de Movimentação
function abrirModalMovimentacao() {
    const select = document.getElementById('movProdutoId');
    select.innerHTML = '';
    produtos.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.innerText = `${p.codigo} - ${p.nome} (Atual: ${p.estoque})`;
        select.appendChild(option);
    });
    document.getElementById('formMovimentacao').reset();
    document.getElementById('modalMovimentacao').classList.remove('hidden');
    document.getElementById('modalMovimentacao').classList.add('flex');
}

function fecharModalMovimentacao() {
    document.getElementById('modalMovimentacao').classList.remove('flex');
    document.getElementById('modalMovimentacao').classList.add('hidden');
}

function salvarMovimentacao(event) {
    event.preventDefault();
    const produtoId = document.getElementById('movProdutoId').value;
    const tipo = document.getElementById('movTipo').value;
    const quantidade = parseInt(document.getElementById('movQuantidade').value);

    const p = produtos.find(item => item.id == produtoId);
    if (!p) return;

    if (tipo === 'ENTRADA') {
        p.estoque += quantidade;
    } else {
        if (p.estoque < quantidade) {
            alert('Quantidade insuficiente em estoque para esta saída!');
            return;
        }
        p.estoque -= quantidade;
    }

    salvarStorage();
    fecharModalMovimentacao();
}

// Exportar para CSV
function exportarCSV() {
    let csv = 'Codigo,Nome,Categoria,Preco Custo,Preco Venda,Estoque\n';
    produtos.forEach(p => {
        csv += `"${p.codigo}","${p.nome}","${p.categoria}",${p.precoCusto},${p.PrecoVenda},${p.estoque}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'relatorio_estoque.csv';
    link.click();
}