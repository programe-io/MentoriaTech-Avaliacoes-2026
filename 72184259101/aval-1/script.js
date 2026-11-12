
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Sistema de Estoque</title>
</head>
<body>

    <h1>Sistema de Estoque</h1>

    <h2>Cadastrar Produto</h2>

    Código: <input type="number" id="codigo"><br><br>
    Descrição: <input type="text" id="descricao"><br><br>
    Quantidade: <input type="number" id="quantidade"><br><br>
    Valor: <input type="number" id="valor" step="0.01"><br><br>

    <button onclick="cadastrar()">Cadastrar Produto</button>

    <h2>Alterar Produto</h2>

    Código do produto: <input type="number" id="codigoAlterar"><br><br>
    Novo valor: <input type="number" id="novoValor" step="0.01"><br><br>

    <button onclick="alterarValor()">Alterar Valor</button>

    Nova quantidade: <input type="number" id="novaQuantidade"><br><br>

    <button onclick="alterarQuantidade()">Alterar Quantidade</button>

    <h2>Produtos Cadastrados</h2>

    <button onclick="listar()">Listar Produtos</button>

    <ul id="lista"></ul>

    <script>
        let produtos = [];

        function cadastrar() {
            let codigo = Number(document.getElementById("codigo").value);
            let descricao = document.getElementById("descricao").value;
            let quantidade = Number(document.getElementById("quantidade").value);
            let valor = Number(document.getElementById("valor").value);

            if (produtos.some(p => p.codigo === codigo)) {
                alert("Esse código já está cadastrado!");
                return;
            }

            produtos.push({
                codigo: codigo,
                descricao: descricao,
                quantidade: quantidade,
                valor: valor
            });

            alert("Produto cadastrado com sucesso!");
            listar();
        }

        function listar() {
            let lista = document.getElementById("lista");
            lista.innerHTML = "";

            produtos.forEach(p => {
                let item = document.createElement("li");
                item.textContent =
                    "Código: " + p.codigo +
                    " | Descrição: " + p.descricao +
                    " | Quantidade: " + p.quantidade +
                    " | Valor: R$ " + p.valor.toFixed(2);

                lista.appendChild(item);
            });
        }

        function alterarValor() {
            let codigo = Number(document.getElementById("codigoAlterar").value);
            let produto = produtos.find(p => p.codigo === codigo);

            if (produto) {
                produto.valor = Number(document.getElementById("novoValor").value);
                alert("Valor alterado com sucesso!");
                listar();
            } else {
                alert("Produto não encontrado!");
            }
        }

        function alterarQuantidade() {
            let codigo = Number(document.getElementById("codigoAlterar").value);
            let produto = produtos.find(p => p.codigo === codigo);

            if (produto) {
                produto.quantidade = Number(document.getElementById("novaQuantidade").value);
                alert("Quantidade alterada com sucesso!");
                listar();
            } else {
                alert("Produto não encontrado!");
            }
        }
    </script>

</body>
</html>
