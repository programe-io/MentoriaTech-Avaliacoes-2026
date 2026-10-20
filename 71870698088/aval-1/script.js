// 3 e 4. Inicializa o estoque pegando do navegador ou cria uma lista de teste
let estoque = JSON.parse(localStorage.getItem('meu_estoque')) || [
    { id: 1001, descricao: "Mouse Gamer", quantidade: 15, valor: 89.90 },
    { id: 1002, descricao: "Monitor 24' IPS", quantidade: 5, valor: 749.00 }
];
let proximoId = estoque.length > 0 ? Math.max(...estoque.map(p => p.id)) + 1 : 1001;

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

// Função auxiliar para salvar no navegador (Melhoria do item 21)
function salvarNoLocalStorage() {
    localStorage.setItem('meu_estoque', JSON.stringify(estoque));
}

// 6, 7, 8, 9. Validações sem frescura
function validarProduto(desc, qtd, val) {
    let valido = true;
    document.getElementById('err-desc').style.display = desc.trim() === "" ? 'block' : 'none';
    document.getElementById('err-qtd').style.display = (qtd === "" || parseInt(qtd) < 0) ? 'block' : 'none';
    document.getElementById('err-val').style.display = (val === "" || parseFloat(val) <= 0) ? 'block' : 'none';
    
    if(desc.trim() === "" || qtd === "" || parseInt(qtd) < 0 || val === "" || parseFloat(val) <= 0) {
        valido = false;
    }
    return valido;
}

// 10, 11, 13. Cadastro e Atualização de Dados
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const idField = document.getElementById('product-id').value;
    const desc = document.getElementById('desc').value;
    const qtd = document.getElementById('qtd').value;
    const val = document.getElementById('val').value;

    if (!validarProduto(desc, qtd, val)) return;

    if (idField === "") {
        // Novo Produto
        estoque.push({
            id: proximoId++,
            descricao: desc,
            quantidade: parseInt(qtd),
            valor: parseFloat(val)
        });
    } else {
        // 16, 19, 20. Diferença entre alterar valor e SOMAR quantidade
        const produto = estoque.find(p => p.id === parseInt(idField));
        if (produto) {
            produto.descricao = desc;
            produto.valor = parseFloat(val); // O valor a gente altera/sobrescreve
            
            // Pergunta se quer somar ou apenas substituir a quantidade
            const desejaSomar = confirm(`Deseja SOMAR ${qtd} unidades ao estoque atual (${produto.quantidade})?\nSe clicar em Cancelar, o estoque será alterado estritamente para ${qtd}.`);
            
            if (desejaSomar) {
                produto.quantidade += parseInt(qtd); // Soma ao estoque atual
            } else {
                produto.quantidade = parseInt(qtd);  // Sobrescreve o estoque antigo
            }
        }
        resetarFormulario();
    }

    salvarNoLocalStorage();
    form.reset();
    listarProdutos(estoque);
});

// 14. Listagem Dinâmica
function listarProdutos(lista) {
    productList.innerHTML = "";

    if (lista.length === 0) {
        productList.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#7f8c8d;">Nenhum produto encontrado.</td></tr>`;
        return;
    }

    lista.forEach(produto => {
        const total = (produto.quantidade * produto.valor).toFixed(2);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${produto.id}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>R$ ${total}</td>
            <td class="actions-cell">
                <button class="btn" onclick="prepararEdicao(${produto.id})">Editar/Somar</button>
                <button class="btn btn-danger" onclick="removerProduto(${produto.id})">Excluir</button>
            </td>
        `;
        productList.appendChild(tr);
    });
}

// 17 e 18. Busca ágil com Tratamento de Erro
function buscarProduto() {
    const termo = document.getElementById('search-input').value.trim().toLowerCase();
    if (termo === "") {
        listarProdutos(estoque);
        return;
    }

    const filtrados = estoque.filter(p => 
        p.id.toString() === termo || p.descricao.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        alert("⚠️ ERRO: Produto não localizado no inventário!");
        listarProdutos([]);
    } else {
        listarProdutos(filtrados);
    }
}

function limparBusca() {
    document.getElementById('search-input').value = "";
    listarProdutos(estoque);
}

function prepararEdicao(id) {
    const produto = estoque.find(p => p.id === id);
    if (!produto) return;

    document.getElementById('product-id').value = produto.id;
    document.getElementById('desc').value = produto.descricao;
    document.getElementById('qtd').value = produto.quantidade;
    document.getElementById('val').value = produto.valor;

    document.getElementById('form-title').innerText = `Atualizar / Somar Estoque do Produto #${produto.id}`;
    document.getElementById('btn-save').innerText = "Salvar / Atualizar";
    document.getElementById('btn-cancel').style.display = "inline-block";
}

function resetarFormulario() {
    document.getElementById('product-id').value = "";
    document.getElementById('form-title').innerText = "Cadastrar Novo Produto";
    document.getElementById('btn-save').innerText = "Salvar Produto";
    document.getElementById('btn-cancel').style.display = "none";
    form.reset();
}

document.getElementById('btn-cancel').addEventListener('click', resetarFormulario);

function removerProduto(id) {
    if (confirm("Quer mesmo deletar esse item?")) {
        estoque = estoque.filter(p => p.id !== id);
        salvarNoLocalStorage();
        listarProdutos(estoque);
    }
}

// Executa a primeira renderização ao abrir a tela
listarProdutos(estoque);
