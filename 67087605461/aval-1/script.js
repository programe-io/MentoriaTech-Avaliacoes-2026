// Seletores do DOM
const form = document.getElementById('produtoForm');
const inputId = document.getElementById('produtoId');
const inputNome = document.getElementById('nome');
const inputQuantidade = document.getElementById('quantidade');
const inputPreco = document.getElementById('preco');
const btnSalvar = document.getElementById('btnSalvar');
const tabelaProdutos = document.getElementById('tabelaProdutos');
const totalProdutosEl = document.getElementById('totalProdutos');
const totalItensEl = document.getElementById('totalItens');

// Carregar produtos do localStorage ou iniciar array vazio
let produtos = JSON.parse(localStorage.getItem('estoque_produtos')) || [];

// Função para salvar no localStorage e atualizar a tela
function atualizarSistema() {
    localStorage.setItem('estoque_produtos', JSON.stringify(produtos));
    renderizarTabela();
    atualizarEstatisticas();
}

// Renderizar a tabela na tela
function renderizarTabela() {
    tabelaProdutos.innerHTML = '';

    if (produtos.length === 0) {
        tabelaProdutos.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #6b7280;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    produtos.forEach((produto, index) => {
        const valorTotal = produto.quantidade * produto.preco;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${Number(produto.preco).toFixed(2)}</td>
            <td>R$ ${valorTotal.toFixed(2)}</td>
            <td class="acoes">
                <button class="btn-edit" onclick="carregarEdicao(${index})">Editar</button>
                <button class="btn-danger" onclick="deletarProduto(${index})">Excluir</button>
            </td>
        `;
        tabelaProdutos.appendChild(tr);
    });
}

// Atualizar cards de estatísticas
function atualizarEstatisticas() {
    totalProdutosEl.textContent = produtos.length;
    const totalItens = produtos.reduce((acc, curr) => acc + Number(curr.quantidade), 0);
    totalItensEl.textContent = totalItens;
}

// CREATE / UPDATE (Manipular envio do formulário)
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = inputId.value;
    const nome = inputNome.value.trim();
    const quantidade = parseInt(inputQuantidade.value);
    const preco = parseFloat(inputPreco.value);

    if (id === '') {
        // Criar novo produto
        produtos.push({ nome, quantidade, preco });
    } else {
        // Atualizar produto existente
        produtos[id] = { nome, quantidade, preco };
        inputId.value = '';
        btnSalvar.textContent = 'Adicionar';
    }

    form.reset();
    atualizarSistema();
});

// READ - Preparar para Edição (Carregar dados no form)
function carregarEdicao(index) {
    const produto = produtos[index];
    inputId.value = index;
    inputNome.value = produto.nome;
    inputQuantidade.value = produto.quantidade;
    inputPreco.value = produto.preco;
    btnSalvar.textContent = 'Atualizar';
    inputNome.focus();
}

// DELETE - Excluir produto
function deletarProduto(index) {
    if (confirm(`Tem certeza que deseja excluir o produto "${produtos[index].nome}"?`)) {
        produtos.splice(index, 1);
        
        // Se estiver editando o item que foi excluído, limpa o form
        if(inputId.value == index) {
            form.reset();
            inputId.value = '';
            btnSalvar.textContent = 'Adicionar';
        }
        
        atualizarSistema();
    }
}

// Inicializar a aplicação ao carregar a página
atualizarSistema();