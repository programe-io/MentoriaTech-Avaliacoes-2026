
document.addEventListener("DOMContentLoaded", function() {

    let produtos = [];

    const formulario = document.getElementById("formProduto");
    const tabela = document.getElementById("listaProdutos");

    // CADASTRAR PRODUTO
    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        let codigo = Number(document.getElementById("codigo").value);
        let descricao = document.getElementById("descricao").value.trim();
        let quantidade = Number(document.getElementById("quantidade").value);
        let valor = Number(document.getElementById("valor").value);

        if (!codigo || !descricao || quantidade < 0 || valor < 0) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        if (produtos.some(p => p.codigo === codigo)) {
            alert("Este código já está cadastrado!");
            return;
        }

        let produto = {
            codigo: codigo,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(produto);

        alert("Produto cadastrado com sucesso!");

        formulario.reset();

        listarProdutos();
    });


    // LISTAR PRODUTOS
    function listarProdutos() {

        tabela.innerHTML = "";

        produtos.forEach(function(produto) {

            let linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            `;

            let colunaAcoes = document.createElement("td");

            let botaoValor = document.createElement("button");
            botaoValor.textContent = "Alterar Valor";

            botaoValor.onclick = function() {
                alterarValor(produto.codigo);
            };

            let botaoQuantidade = document.createElement("button");
            botaoQuantidade.textContent = "Alterar Quantidade";

            botaoQuantidade.onclick = function() {
                alterarQuantidade(produto.codigo);
            };

            colunaAcoes.appendChild(botaoValor);
            colunaAcoes.appendChild(botaoQuantidade);

            linha.appendChild(colunaAcoes);

            tabela.appendChild(linha);

        });
    }


    // ALTERAR VALOR
    function alterarValor(codigo) {

        let produto = produtos.find(p => p.codigo === codigo);

        let novoValor = prompt("Digite o novo valor:");

        if (novoValor === null || novoValor.trim() === "") return;

        let valor = Number(novoValor.replace(",", "."));

        if (!Number.isFinite(valor) || valor < 0) {
            alert("Valor inválido!");
            return;
        }

        produto.valor = valor;

        listarProdutos();

        alert("Valor atualizado!");
    }


    // ALTERAR QUANTIDADE
    function alterarQuantidade(codigo) {

        let produto = produtos.find(p => p.codigo === codigo);

        let novaQuantidade = prompt("Digite a nova quantidade:");

        if (novaQuantidade === null || novaQuantidade.trim() === "") return;

        let quantidade = Number(novaQuantidade);

        if (!Number.isInteger(quantidade) || quantidade < 0) {
            alert("Quantidade inválida!");
            return;
        }

        produto.quantidade = quantidade;

        listarProdutos();

        alert("Quantidade atualizada!");
    }

});
