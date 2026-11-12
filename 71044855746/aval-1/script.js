
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Sistema de Estoque</title>
</head>
<body>

    <h1>Sistema de Estoque</h1>

    <h2>Cadastrar Produto</h2>

    <input type="number" id="codigo" placeholder="Código">
    <input type="text" id="descricao" placeholder="Descrição">
    <input type="number" id="quantidade" placeholder="Quantidade">
    <input type="number" id="valor" placeholder="Valor">

    <button onclick="cadastrar()">Cadastrar Produto</button>

    <h2>Alterar Produto</h2>

    <input type="number" id="codigoAlterar" placeholder="Código do produto">
    <input type="number" id="novoValor" placeholder="Novo valor">
    <button onclick="alterarValor()">Alterar Valor</button>

    <input type="number" id="novaQuantidade" placeholder="Nova quantidade">
    <button onclick="alterarQuantidade()">Alterar Quantidade</button>

    <h2>Produtos Cadastrados</h2>

    <button onclick="listar()">Listar Produtos</button>

    <div id="lista"></div>

    <script>
        let produtos = [];

        function cadastrar() {
            let codigo = Number(document.getElementById("codigo").value);
            let descricao = document.getElementById("descricao").value;
            let quantidade = Number(document.getElementById("quantidade").value);
            let valor = Number(document.getElementById("valor").value);

            if (!codigo || descricao.trim() === "" || quantidade < 0 || valor < 0) {
                alert("Preencha todos os campos corretamente!");
                return;
            }

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

            document.getElementById("codigo").value = "";
            document.getElementById("descricao").value = "";
            document.getElementById("quantidade").value = "";
            document.getElementById("valor").value = "";

            listar();
        }

        function listar() {
            let resultado = "";

            if (produtos.length === 0) {
                resultado = "Nenhum produto cadastrado.";
            }

            produtos.forEach(p => {
                resultado += `
                    <p>
                    Código: ${p.codigo}<br>
                    Descrição: ${p.descricao}<br>
                    Quantidade: ${p.quantidade}<br>
                    Valor: R$ ${p.valor.toFixed(2)}
                    </p>
                    <hr>
                `;
            });

            document.getElementById("lista").innerHTML = resultado;
        }

        function alterarValor() {
            let codigo = Number(document.getElementById("codigoAlterar").value);
            let novoValor = Number(document.getElementById("novoValor").value);

            let produto = produtos.find(p => p.codigo === codigo);

            if (!produto) {
                alert("Produto não encontrado!");
                return;
            }

            if (novoValor < 0 || document.getElementById("novoValor").value === "") {
                alert("Digite um valor válido!");
                return;
            }

            produto.valor = novoValor;

            alert("Valor alterado com sucesso!");
            listar();
        }

        function alterarQuantidade() {
            let codigo = Number(document.getElementById("codigoAlterar").value);
            let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

            let produto = produtos.find(p => p.codigo === codigo);

            if (!produto) {
                alert("Produto não encontrado!");
                return;
            }

            if (novaQuantidade < 0 || document.getElementById("novaQuantidade").value === "") {
                alert("Digite uma quantidade válida!");
                return;
            }

            produto.quantidade = novaQuantidade;

            alert("Quantidade alterada com sucesso!");
            listar();
        }
    </script>

</body>
</html>
