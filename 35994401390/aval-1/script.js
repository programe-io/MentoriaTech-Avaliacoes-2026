let itens = JSON.parse(localStorage.getItem('estoque_v2')) || [];
let editandoId = null;

const formEst = document.getElementById('form-estoque');
const gridProd = document.getElementById('grid-produtos');
const filtroEst = document.getElementById('filtro-estoque');
const apenasBaixoEl = document.getElementById('apenas-baixo');

function moeda(v) {
    return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function salvar() {
    localStorage.setItem('estoque_v2', JSON.stringify(itens));
    renderizar();
}

function renderizar() {
    const termo = filtroEst.value.trim().toLowerCase();
    const soBaixo = apenasBaixoEl.checked;

    let unidades = 0;
    let valorTotal = 0;
    let qtdBaixo = 0;

    itens.forEach(item => {
        unidades += item.qtd;
        valorTotal += item.qtd * item.preco;
        if (item.qtd <= item.minimo) qtdBaixo++;
    });

    document.getElementById('m-unidades').textContent = unidades;
    document.getElementById('m-valor').textContent = moeda(valorTotal);
    document.getElementById('m-baixo').textContent = qtdBaixo;

    const filtrados = itens.filter(item => {
        const matchTexto = item.nome.toLowerCase().includes(termo) ||
                           item.categoria.toLowerCase().includes(termo);
        const matchBaixo = !soBaixo || item.qtd <= item.minimo;
        return matchTexto && matchBaixo;
    });

    gridProd.innerHTML = '';

    if (filtrados.length === 0) {
        gridProd.innerHTML = '<p style="color:#94a3b8;">Nenhum item encontrado.</p>';
        return;
    }

    filtrados.forEach(item => {
        const estaBaixo = item.qtd <= item.minimo;
        const card = document.createElement('div');
        card.className = `card-prod ${estaBaixo ? 'baixo' : ''}`;

        card.innerHTML = `
            <div>
                <div class="card-topo">
                    <h3>${item.nome}</h3>
                    <span class="tag-cat">${item.categoria}</span>
                </div>
                <p style="margin-top:8px; color:#94a3b8; font-size:0.85rem;">
                    Unit.: ${moeda(item.preco)} | Mín.: ${item.minimo}
                </p>
                <p class="qtd-destaque" style="margin-top:8px;">
                    ${item.qtd} un. ${estaBaixo ? '• Baixo' : ''}
                </p>
                <p style="font-size:0.85rem; color:#cbd5e1;">
                    Total: ${moeda(item.qtd * item.preco)}
                </p>
            </div>
            <div class="card-acoes">
                <button class="btn-ajuste" onclick="mudarQtd(${item.id}, 1)">+1</button>
                <button class="btn-ajuste" onclick="mudarQtd(${item.id}, -1)">-1</button>
                <button class="btn-editar" onclick="prepararEdicao(${item.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirItem(${item.id})">Excluir</button>
            </div>
        `;
        gridProd.appendChild(card);
    });
}

formEst.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = {
        id: editandoId || Date.now(),
        nome: document.getElementById('prod-nome').value.trim(),
        categoria: document.getElementById('prod-cat').value.trim(),
        qtd: parseInt(document.getElementById('prod-qtd').value, 10),
        minimo: parseInt(document.getElementById('prod-min').value, 10),
        preco: parseFloat(document.getElementById('prod-preco').value)
    };

    if (editandoId) {
        itens = itens.map(i => i.id === editandoId ? dados : i);
        editandoId = null;
        document.getElementById('btn-submit').textContent = 'Salvar item';
    } else {
        itens.push(dados);
    }

    formEst.reset();
    document.getElementById('prod-min').value = 5;
    salvar();
});

function prepararEdicao(id) {
    const item = itens.find(i => i.id === id);
    if (!item) return;

    editandoId = id;
    document.getElementById('prod-nome').value = item.nome;
    document.getElementById('prod-cat').value = item.categoria;
    document.getElementById('prod-qtd').value = item.qtd;
    document.getElementById('prod-min').value = item.minimo;
    document.getElementById('prod-preco').value = item.preco;
    document.getElementById('btn-submit').textContent = 'Atualizar';
}

function mudarQtd(id, delta) {
    itens = itens.map(item => {
        if (item.id === id) {
            return { ...item, qtd: Math.max(0, item.qtd + delta) };
        }
        return item;
    });
    salvar();
}

function excluirItem(id) {
    itens = itens.filter(i => i.id !== id);
    if (editandoId === id) {
        editandoId = null;
        formEst.reset();
        document.getElementById('btn-submit').textContent = 'Salvar item';
    }
    salvar();
}

document.getElementById('btn-csv').addEventListener('click', () => {
    const linhas = ['ID;Produto;Categoria;Quantidade;Minimo;Preco;Subtotal'];
    itens.forEach(i => {
        linhas.push(`${i.id};"${i.nome}";"${i.categoria}";${i.qtd};${i.minimo};${i.preco};${(i.qtd * i.preco).toFixed(2)}`);
    });
    const blob = new Blob([linhas.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estoque.csv';
    a.click();
    URL.revokeObjectURL(url);
});

filtroEst.addEventListener('input', renderizar);
apenasBaixoEl.addEventListener('change', renderizar);

renderizar();