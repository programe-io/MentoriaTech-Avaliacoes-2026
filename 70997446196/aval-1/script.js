
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sistema de Produtos</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <h1>📦 Sistema de Produtos</h1>

        <h2>Cadastrar produto</h2>

        <form id="formProduto">

            <input
                type="text"
                id="descricao"
                placeholder="Descrição do produto"
                minlength="5"
                required
            >

            <input
                type="number"
                id="quantidade"
                placeholder="Quantidade"
                min="1"
                step="1"
                required
            >

            <input
                type="number"
                id="valor"
                placeholder="Valor (R$)"
                min="0"
                step="0.01"
                required
            >

            <button type="submit">
                Cadastrar produto
            </button>

        </form>

        <p id="mensagem" class="mensagem" role="status"></p>

        <h2>Lista de produtos</h2>

        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody id="listaProdutos">
            </tbody>
        </table>

    </div>

    <script src="script.js"></script>

</body>
</html>
