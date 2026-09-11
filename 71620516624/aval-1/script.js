document.addEventListener('DOMContentLoaded', carregarEstoque);

const form = document.getElementById('produtoForm');
const tabelaBody = document.querySelector('#tabelaEstoque tbody');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = parseFloat(document.getElementById('preco').value).toFixed(2);

    const produto = { nome, quantidade, preco };
    
    salvarNoLocalStorage(produto);
    carregarEstoque();
    form.reset();
});

function salvarNoLocalStorage(produto) {
    let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    estoque.push(produto);
    localStorage.setItem('estoque', JSON.stringify(estoque));
}

function carregarEstoque() {
    tabelaBody.innerHTML = '';
    let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

    estoque.forEach((produto, index) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.preco}</td>
            <td><button class="btn-danger" onclick="deletarProduto(${index})">Excluir</button></td>
        `;

        tabelaBody.appendChild(linha);
    });
}

function deletarProduto(index) {
    let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    estoque.splice(index, 1);
    localStorage.setItem('estoque', JSON.stringify(estoque));
    carregarEstoque();
}