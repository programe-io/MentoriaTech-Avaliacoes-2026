// Array inicial de estoque
let estoque = [
    { id: 1, sku: "MOU-001", nome: "Mouse Sem Fio", quantidade: 12, preco: 89.90 },
    { id: 2, sku: "CAB-002", nome: "Cabo HDMI 2m", quantidade: 3, preco: 25.00 }
];

// Elementos do DOM
const form = document.getElementById('form-estoque');
const tabela = document.getElementById('tabela-itens');
const inputBusca = document.getElementById('input-busca');
const checkCritico = document.getElementById('check-critico');

// Formatar moeda
const formatarMoeda = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Adicionar produto
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const novoProduto = {
        id: Date.now(),
        sku: document.getElementById('prod-sku').value.toUpperCase(),
        nome: document.getElementById('prod-nome').value,
        quantidade: parseInt(document.getElementById('prod-qtd').value),
        preco: parseFloat(document.getElementById('prod-preco').value)
    };

    estoque.push(novoProduto);
    form.reset();
    renderizarTabela();
});

// Alterar quantidade (+1 / -1)
function alterarQtd(id, delta) {
    const item = estoque.find(p => p.id === id);
    if (item) {
        item.quantidade = Math.max(0, item.quantidade + delta);
        renderizarTabela();
    }
}

// Remover produto
function removerProduto(id) {
    estoque = estoque.filter(p => p.id !== id);
    renderizarTabela();
}

// Renderizar itens na tabela
function renderizarTabela() {
    tabela.innerHTML = '';

    const termoBusca = inputBusca.value.toLowerCase();
    const apenasCritico = checkCritico.checked;

    const itensFiltrados = estoque.filter(item => {
        const bateNome = item.nome.toLowerCase().includes(termoBusca) || item.sku.toLowerCase().includes(termoBusca);
        const ehCritico = item.quantidade <= 5;
        
        return apenasCritico ? (bateNome && ehCritico) : bateNome;
    });

    if (itensFiltrados.length === 0) {
        tabela.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#94a3b8;">Nenhum produto encontrado.</td></tr>`;
        return;
    }

    itensFiltrados.forEach(item => {
        const tr = document.createElement('tr');
        const statusClass = item.quantidade <= 5 ? 'badge-low' : 'badge-ok';
        const statusTexto = item.quantidade <= 5 ? 'Estoque Baixo' : 'Normal';

        tr.innerHTML = `
            <td><code>${item.sku}</code></td>
            <td><strong>${item.nome}</strong></td>
            <td>${item.quantidade} un.</td>
            <td>${formatarMoeda(item.preco)}</td>
            <td><span class="badge ${statusClass}">${statusTexto}</span></td>
            <td>
                <button class="btn-action btn-add" onclick="alterarQtd(${item.id}, 1)">+</button>
                <button class="btn-action btn-sub" onclick="alterarQtd(${item.id}, -1)">-</button>
            </td>
            <td>
                <button class="btn-action btn-del" onclick="removerProduto(${item.id})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}

// Eventos de Busca e Filtro
inputBusca.addEventListener('input', renderizarTabela);
checkCritico.addEventListener('change', renderizarTabela);

// Inicialização
renderizarTabela();