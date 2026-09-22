document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-produto');
    const nomeInput = document.getElementById('nome-produto');
    const qtdInput = document.getElementById('qtd-produto');
    const listaEstoque = document.getElementById('lista-estoque');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const quantidade = qtdInput.value;

        if (nome && quantidade) {
            adicionarAoEstoque(nome, quantidade);
            form.reset();
            nomeInput.focus();
        }
    });

    function adicionarAoEstoque(nome, quantidade) {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${nome}</td>
            <td><strong>${quantidade}</strong> u.</td>
            <td><button class="btn-remover">Excluir</button></td>
        `;

        // Evento para remover o produto da linha
        linha.querySelector('.btn-remover').addEventListener('click', () => {
            linha.remove();
        });

        listaEstoque.appendChild(linha);
    }
});
