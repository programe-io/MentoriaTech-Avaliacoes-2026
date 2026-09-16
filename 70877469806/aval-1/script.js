// Array para armazenar os produtos em memória
const estoque = [];

// Elementos do DOM
const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');

// 1. Função para Cadastrar um produto
formProduto.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    const codigo = document.getElementById('codigo').value;
    const descricao = document.getElementById('descricao').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor = document.getElementById('valor').value;

    // Validação de código duplicado
    const existe = estoque.find(p => p.codigo === codigo);
    if (existe) {
        alert(`❌ Erro: O código ${codigo} já está cadastrado.`);
        return;
    }

    // Adiciona o novo produto ao array
    estoque.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    });

    // Limpa os campos do formulário
    formProduto.reset();

    // Atualiza a tabela na tela
    listarProdutos();
});

// 2. Função para Listar os produtos na tabela
function listarProdutos() {
    // Limpa a tabela antes de renderizar para não duplicar dados
    listaProdutos.innerHTML = '';

    if (estoque.length === 0) {
        listaProdutos.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    estoque.forEach(p => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><strong>${p.codigo}</strong></td>
            <td>${p.descricao}</td>
            <td>${p.quantidade} un</td>
            <td>R$ ${p.valor.toFixed(2)}</td>
            <td>
                <button class="btn-edit" onclick="alterarValor('${p.codigo}')">💰 Alterar Preço</button>
                <button class="btn-edit" onclick="alterarQuantidade('${p.codigo}')">🔢 Alterar Qtd</button>
            </td>
        `;

        listaProdutos.appendChild(tr);
    });
}

// 3. Função para Alterar o valor de um produto
function alterarValor(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (produto) {
        const novoValor = prompt(`Digite o novo VALOR para o produto "${produto.descricao}":`, produto.valor);
        
        if (novoValor !== null && novoValor.trim() !== "" && !isNaN(novoValor)) {
            produto.valor = parseFloat(novoValor);
            listarProdutos(); // Recarrega a tabela com o dado novo
        } else if (novoValor !== null) {
            alert("❌ Por favor, digite um valor numérico válido.");
        }
    }
}

// 4. Função para Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (produto) {
        const novaQtd = prompt(`Digite a nova QUANTIDADE para o produto "${produto.descricao}":`, produto.quantidade);
        
        if (novaQtd !== null && novaQtd.trim() !== "" && !isNaN(novaQtd)) {
            produto.quantidade = parseInt(novaQtd);
            listarProdutos(); // Recarrega a tabela com o dado novo
        } else if (novaQtd !== null) {
            alert("❌ Por favor, digite uma quantidade válida.");
        }
    }
}

// Inicializa a tabela vazia ao carregar a página
listarProdutos();
