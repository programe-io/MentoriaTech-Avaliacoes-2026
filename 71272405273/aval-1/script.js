// Vetor global para armazenar os produtos do estoque
let estoque = [];

// Função essencial para desenhar as linhas na tabela HTML
function renderizarTabela() {
    const tbody = document.getElementById("lista-produtos");
    if (!tbody) return;
    
    tbody.innerHTML = ""; // Limpa a tabela para não duplicar visualmente

    estoque.forEach(produto => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        `;

        tbody.appendChild(linha);
    });
}

// 1. Função acionada pelo botão "Cadastrar Novo"
function cadastrar() {
    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = document.getElementById("quantidade").value;
    const valor = document.getElementById("valor").value;

    // Validação de campos vazios
    if (!codigo || !descricao || !quantidade || !valor) {
        alert("⚠️ Por favor, preencha todos os campos para cadastrar!");
        return;
    }

    // Validação para evitar códigos duplicados
    const existe = estoque.find(p => p.codigo === codigo);
    if (existe) {
        alert("❌ Erro: Já existe um produto cadastrado com este código!");
        return;
    }

    // Adiciona o objeto estruturado ao array do estoque
    estoque.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    });

    renderizarTabela();
    limparCampos();
}

// 2. Função acionada pelo botão "Alterar Preço"
function atualizarPreco() {
    const codigo = document.getElementById("codigo").value.trim();
    const novoValor = document.getElementById("valor").value;

    if (!codigo || !novoValor) {
        alert("⚠️ Informe o 'Código do Produto' e o novo 'Valor (R$)' para atualizar!");
        return;
    }

    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) {
        alert("❌ Produto não localizado no estoque.");
        return;
    }

    produto.valor = parseFloat(novoValor);
    renderizarTabela();
    limparCampos();
}

// 3. Função acionada pelo botão "Alterar Qtd"
function atualizarQtd() {
    const codigo = document.getElementById("codigo").value.trim();
    const novaQtd = document.getElementById("quantidade").value;

    if (!codigo || !novaQtd) {
        alert("⚠️ Informe o 'Código do Produto' e a nova 'Quantidade' para atualizar!");
        return;
    }

    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) {
        alert("❌ Produto não localizado no estoque.");
        return;
    }

    produto.quantidade = parseInt(novaQtd);
    renderizarTabela();
    limparCampos();
}

// Função utilitária para limpar os inputs após as ações
function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}
