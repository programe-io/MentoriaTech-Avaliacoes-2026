let produtos = [];
let proximoId = 1; 

// Funções lógicas de validação e controle
function validarProdutos(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        alert("Erro: Descrição deve ter no mínimo 5 caracteres");
        return false;
    } 
    if (quantidade < 1) {
        alert("Erro: A quantidade deve ser maior que zero");
        return false;
    }
    if (valor <= 0) {
        alert("Erro: Valor deve ser maior que zero!");
        return false;
    }
    return true;
}

function cadastrarProduto(descricao, quantidade, valor){
    if (!validarProdutos(descricao, quantidade, valor)) return false;

    let novoProduto = {
        "codigo": proximoId++, 
        "descricao": descricao, 
        "quantidade": quantidade, 
        "valor": valor
    };
    produtos.push(novoProduto);
    return true;
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor <= 0) {
        alert("Erro: Valor deve ser maior que zero");
        return false;
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (produto) {
        produto.valor = novoValor;
        return true;
    } else {
        alert("Produto não encontrado!");
        return false;
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        alert("Erro: A quantidade deve ser maior que zero");
        return false;
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (produto) {
        produto.quantidade += novaQuantidade;
        return true;
    } else {
        alert("Produto não encontrado!");
        return false;
    }
}

// Funções de integração com a Interface (UI)
function renderizarTabela() {
    const tbody = document.getElementById('lista-produtos-body');
    const msgVazia = document.getElementById('msg-vazia');
    tbody.innerHTML = '';

    if (produtos.length === 0) {
        msgVazia.style.display = 'block';
        return;
    }
    msgVazia.style.display = 'none';

    produtos.forEach(prod => {
        const tr = document.createElement('tr');
        const totalItem = (prod.quantidade * prod.valor).toFixed(2);
        
        tr.innerHTML = `
            <td><strong>#${prod.codigo}</strong></td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
            <td><strong>R$ ${totalItem}</strong></td>
        `;
        tbody.appendChild(tr);
    });
}

function uiCadastrar() {
    const desc = document.getElementById('desc').value;
    const qtd = parseInt(document.getElementById('qtd').value);
    const val = parseFloat(document.getElementById('val').value);

    if (cadastrarProduto(desc, qtd, val)) {
        document.getElementById('desc').value = '';
        document.getElementById('qtd').value = 1;
        document.getElementById('val').value = '';
        renderizarTabela();
    }
}

function uiAtualizar() {
    const codigo = parseInt(document.getElementById('altId').value);
    const novaQtd = document.getElementById('altQtd').value;
    const novoVal = document.getElementById('altVal').value;

    if (!codigo) {
        alert("Por favor, informe o código do produto.");
        return;
    }

    let alterou = false;

    if (novaQtd !== '') {
        if (atualizarQuantidade(codigo, parseInt(novaQtd))) alterou = true;
    }

    if (novoVal !== '') {
        if (atualizarValor(codigo, parseFloat(novoVal))) alterou = true;
    }

    if (alterou) {
        document.getElementById('altId').value = '';
        document.getElementById('altQtd').value = '';
        document.getElementById('altVal').value = '';
        renderizarTabela();
    }
}
