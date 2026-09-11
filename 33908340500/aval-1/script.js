// Array que simula o banco de dados do estoque
let estoque = [];

// Elementos do DOM
const formCadastro = document.getElementById('form-cadastro');
const tabelaCorpo = document.querySelector('#tabela-estoque tbody');

// 1. Cadastrar um novo produto
formCadastro.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recarregar a página

    const codigo = document.getElementById('codigo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    // Validação se o código já existe
    const produtoExistente = estoque.find(p => p.codigo === codigo);
    if (produtoExistente) {
        alert('Já existe um produto cadastrado com este código!');
        return;
    \}

    // Criando o objeto do produto
    const novoProduto = {
        codigo,
        descricao,
        quantidade,
        valor
    \};

    // Adicionando ao array
    estoque.push(novoProduto);

    // Atualiza a listagem na tela e limpa o formulário
    listarProdutos();
    formCadastro.reset();
    alert('Produto cadastrado com sucesso!');
\});

// 2. Listar os produtos cadastrados
function listarProdutos() {
    // Limpa o corpo da tabela
    tabelaCorpo.innerHTML = '';

    if (estoque.length === 0) {
        tabelaCorpo.innerHTML = `
            <tr id="linha-vazia">
                <td colspan="5" style="text-align: center; color: #777;">Nenhum produto cadastrado.</td>
            </tr>
        `;
        return;
    \}

    // Preenche a tabela iterando sobre o array de estoque
    estoque.forEach(produto => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>\${produto.codigo\}</td>
            <td>\${produto.descricao\}</td>
            <td>\${produto.quantidade\}</td>
            <td>R\$ \${produto.valor.toFixed(2)\}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="alterarQuantidade('\${produto.codigo\}')">Alt. Qtd</button>
                <button class="btn btn-sm btn-primary" onclick="alterarValor('\${produto.codigo\}')">Alt. Valor</button>
            </td>
        `;

        tabelaCorpo.appendChild(linha);
    \});
\}

// 3. Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) return;

    const novaQtdStr = prompt(`Informe a nova quantidade para "\${produto.descricao\}":`, produto.quantidade);
    
    if (novaQtdStr !== null) {
        const novaQtd = parseInt(novaQtdStr);
        if (isNaN(novaQtd) || novaQtd < 0) {
            alert('Por favor, insira um número válido e maior ou igual a zero.');
            return;
        \}

        produto.quantidade = novaQtd;
        listarProdutos();
        alert('Quantidade atualizada com sucesso!');
    \}
\}

// 4. Alterar o valor de um produto
function alterarValor(codigo) {
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) return;

    const novoValorStr = prompt(`Informe o novo valor (R\$) para "\${produto.descricao\}":`, produto.valor);

    if (novoValorStr !== null) {
        const novoValor = parseFloat(novoValorStr.replace(',', '.')); // Substitui vírgula por ponto caso o usuário digite
        if (isNaN(novoValor) || novoValor <= 0) {
            alert('Por favor, insira um valor monetário válido.');
            return;
        \}

        produto.valor = novoValor;
        listarProdutos();
        alert('Valor atualizado com sucesso!');
    \}
\}$0