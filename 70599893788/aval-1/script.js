
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Estoque</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f0f2f5;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 3px 10px #ccc;
        }

        h1, h2 {
            text-align: center;
            color: #174ea6;
        }

        input, button {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            margin: 6px 0;
            border-radius: 6px;
            font-size: 16px;
        }

        input {
            border: 1px solid #bbb;
        }

        button {
            background: #174ea6;
            color: white;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background: #103875;
        }

        .produto {
            background: #f7f9fc;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 12px;
            margin-top: 10px;
        }

        .produto button {
            background: #16834a;
        }

        .produto .excluir {
            background: #c62828;
        }

        #mensagem {
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>

<body>
<div class="container">
    <h1>📦 Sistema de Estoque</h1>

    <h2>Cadastrar Produto</h2>

    <input type="text" id="codigo" placeholder="Código do produto">
    <input type="text" id="descricao" placeholder="Descrição do produto">
    <input type="number" id="quantidade" placeholder="Quantidade" min="0">
    <input type="number" id="valor" placeholder="Valor (R$)" min="0" step="0.01">

    <button onclick="cadastrarProduto()">Cadastrar Produto</button>

    <p id="mensagem"></p>

    <h2>Produtos Cadastrados</h2>
    <div id="lista"></div>
</div>

<script>
    let produtos = [];

    function cadastrarProduto() {
        const codigo = document.getElementById("codigo").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const quantidadeTexto = document.getElementById("quantidade").value;
        const valorTexto = document.getElementById("valor").value;

        if (!codigo || !descricao ||
            quantidadeTexto === "" || valorTexto === "") {
            alert("Preencha todos os campos!");
            return;
        }

        const quantidade = Number(quantidadeTexto);
        const valor = Number(valorTexto);

        if (!Number.isFinite(quantidade) ||
            !Number.isInteger(quantidade) || quantidade < 0 ||
            !Number.isFinite(valor) || valor < 0) {
            alert("Informe uma quantidade inteira e valores válidos.");
            return;
        }

        if (produtos.some(p => p.codigo === codigo)) {
            alert("Já existe um produto com esse código!");
            return;
        }

        produtos.push({
            codigo: codigo,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        });

        document.getElementById("codigo").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

        document.getElementById("mensagem").textContent =
            "Produto cadastrado com sucesso!";

        listarProdutos();
    }

    function listarProdutos() {
        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        if (produtos.length === 0) {
            lista.textContent = "Nenhum produto cadastrado.";
            return;
        }

        produtos.forEach((produto, indice) => {
            const div = document.createElement("div");
            div.className = "produto";

            const titulo = document.createElement("h3");
            titulo.textContent = produto.descricao;

            const detalhes = document.createElement("p");
            detalhes.textContent =
                `Código: ${produto.codigo} | ` +
                `Quantidade: ${produto.quantidade} | ` +
                `Valor: ${produto.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}`;

            const botaoValor = document.createElement("button");
            botaoValor.textContent = "Alterar Valor";
            botaoValor.onclick = () => alterarValor(indice);

            const botaoQuantidade = document.createElement("button");
            botaoQuantidade.textContent = "Alterar Quantidade";
            botaoQuantidade.onclick = () => alterarQuantidade(indice);

            div.append(titulo, detalhes, botaoValor, botaoQuantidade);
            lista.appendChild(div);
        });
    }

    function alterarValor(indice) {
        const novoValor = prompt("Digite o novo valor do produto:");

        if (novoValor === null || novoValor.trim() === "") return;

        const valor = Number(novoValor.replace(",", "."));

        if (!Number.isFinite(valor) || valor < 0) {
            alert("Digite um valor válido!");
            return;
        }

        produtos[indice].valor = valor;
        listarProdutos();
        alert("Valor alterado com sucesso!");
    }

    function alterarQuantidade(indice) {
        const novaQuantidade = prompt("Digite a nova quantidade:");

        if (novaQuantidade === null || novaQuantidade.trim() === "") return;

        const quantidade = Number(novaQuantidade);

        if (!Number.isInteger(quantidade) || quantidade < 0) {
            alert("Digite uma quantidade inteira válida!");
            return;
        }

        produtos[indice].quantidade = quantidade;
        listarProdutos();
        alert("Quantidade alterada com sucesso!");
    }

    listarProdutos();
</script>
</body>
</html>
