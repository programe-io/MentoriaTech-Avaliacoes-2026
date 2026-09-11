// ==========================================
// ARRAY DE PRODUTOS
// ==========================================

let produtos = [];


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    const codigo =
        Number(document.getElementById("codigo").value);

    const descricao =
        document.getElementById("descricao").value.trim();

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);


    // Verificação dos campos

    if (
        codigo <= 0 ||
        descricao === "" ||
        quantidade < 0 ||
        valor < 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;
    \}


    // Verificar código duplicado

    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );


    if (produtoExistente) {

        alert(
            "Já existe um produto cadastrado com esse código!"
        );

        return;
    \}


    // Criar produto

    const produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    \};


    // Adicionar produto ao estoque

    produtos.push(produto);


    alert("Produto cadastrado com sucesso!");


    // Limpar formulário

    document.getElementById("codigo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";


    // Atualizar lista

    listarProdutos();
\}



// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    const tabela =
        document.getElementById("listaProdutos");


    // Limpar tabela

    tabela.innerHTML = "";


    // Verificar se não existem produtos

    if (produtos.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    \}


    // Percorrer produtos

    produtos.forEach((produto, index) => {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>
                \${produto.codigo\}
            </td>

            <td>
                \${produto.descricao\}
            </td>

            <td>
                \${produto.quantidade\}
            </td>

            <td>
                R\$ \${produto.valor.toFixed(2)\}
            </td>

            <td>

                <button
                    class="btn-valor"
                    onclick="alterarValor(\${index\})">

                    Alterar Valor

                </button>


                <button
                    class="btn-quantidade"
                    onclick="alterarQuantidade(\${index\})">

                    Alterar Quantidade

                </button>

            </td>
        `;


        tabela.appendChild(linha);

    \});
\}



// ==========================================
// ALTERAR VALOR
// ==========================================

function alterarValor(index) {

    const novoValor = Number(
        prompt(
            "Digite o novo valor:",
            produtos[index].valor
        )
    );


    // Verificar valor

    if (
        isNaN(novoValor) ||
        novoValor < 0
    ) {

        alert("Digite um valor válido!");

        return;
    \}


    // Alterar valor

    produtos[index].valor = novoValor;


    alert("Valor alterado com sucesso!");


    // Atualizar tabela

    listarProdutos();
\}



// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade(index) {

    const novaQuantidade = Number(
        prompt(
            "Digite a nova quantidade:",
            produtos[index].quantidade
        )
    );


    // Verificar quantidade

    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0
    ) {

        alert("Digite uma quantidade válida!");

        return;
    \}


    // Alterar quantidade

    produtos[index].quantidade = novaQuantidade;


    alert(
        "Quantidade alterada com sucesso!"
    );


    // Atualizar tabela

    listarProdutos();
\}



// ==========================================
// INICIALIZAR TABELA
// ==========================================

listarProdutos();$0