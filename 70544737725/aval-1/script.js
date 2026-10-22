// Array que armazenará os produtos do estoque
let estoque = [];
let proximoId = 1;

// Seleção de elementos do HTML
const form = document.getElementById('form-produto');
const tabela = document.getElementById('tabela-estoque');

// Evento de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    // Captura os valores digitados pelo usuário
    const nome = document.getElementById('nome').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    // Cria o objeto do novo produto
    const novoProduto = {
        id: proximoId++,
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };

    // Adiciona o produto ao array do estoque
    estoque.push(novoProduto);

    // Atualiza a tabela na tela e limpa o formulário
    atualizarTabela();
    form.reset();
});

// Função para renderizar a tabela atualizada
function atualizarTabela() {
    tabela.innerHTML = ''; // Limpa as linhas atuais da tabela

    estoque.forEach(produto => {
        const totalItem = produto.quantidade * produto.preco;

        // Cria uma nova linha no HTML
        const linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td>#${produto.id}</td>
            <td><strong>${produto.nome}</strong></td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td><strong>R$ ${totalItem.toFixed(2)}</strong></td>
            <td>
                <button class="btn-deletar" onclick="removerProduto(${produto.id})">Excluir</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

// Função para remover um produto do estoque
function removerProduto(id) {
    // Filtra o array removendo o item que possui o ID selecionado
    estoque = estoque.filter(produto => produto.id !== id);
    atualizarTabela();
}
