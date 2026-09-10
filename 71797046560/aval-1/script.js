```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Produtos</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">

        <h1>Cadastro de Produtos</h1>

        <section>
            <h2>Cadastrar Produto</h2>

            <label for="descricao">Descrição:</label>
            <input type="text" id="descricao" placeholder="Nome do produto">

            <label for="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" placeholder="Quantidade">

            <label for="valor">Valor:</label>
            <input type="number" id="valor" step="0.01" placeholder="Valor do produto">

            <button onclick="cadastrarProdutoHTML()">
                Cadastrar Produto
            </button>
        </section>


        <section>
            <h2>Produtos cadastrados</h2>

            <button onclick="listarProdutosHTML()">
                Listar Produtos
            </button>

            <div id="listaProdutos"></div>
        </section>


        <section>
            <h2>Atualizar Valor</h2>

            <label for="codigo">Código do produto:</label>
            <input type="number" id="codigo" placeholder="Código">

            <label for="novoValor">Novo valor:</label>
            <input type="number" id="novoValor" step="0.01" placeholder="Novo valor">

            <button onclick="atualizarValorHTML()">
                Atualizar Valor
            </button>
        </section>

    </div>

    <script src="script.js"></script>

</body>
</html>
```
