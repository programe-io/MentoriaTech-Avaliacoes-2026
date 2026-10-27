
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function listarProdutos() {
    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const linha = document.createElement("tr");

        [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            moeda(produto.valor)
        ].forEach(texto => {
            const celula = document.createElement("td");
            celula.textContent = texto;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");

        const alterarValor = document.createElement("button");
        alterarValor.textContent = "Alterar valor";
        alterarValor.onclick = () => {
            const novoValor = prompt(
                "Digite o novo valor:",
                produto.valor
            );

            if (novoValor === null || novoValor.trim() === "") return;

            const valor = Number(novoValor.replace(",", "."));

            if (!Number.isFinite(valor) || valor < 0) {
                alert("Digite um valor válido.");
                return;
            }

            produtos[indice].valor = valor;
            salvar();
            listarProdutos();
        };

        const alterarQuantidade = document.createElement("button");
        alterarQuantidade.textContent = "Alterar quantidade";
        alterarQuantidade.onclick = () => {
            const novaQuantidade = prompt(
                "Digite a nova quantidade:",
                produto.quantidade
            );

            if (novaQuantidade === null || novaQuantidade.trim() === "") return;

            const quantidade = Number(novaQuantidade);

            if (!Number.isInteger(quantidade) || quantidade < 0) {
                alert("Digite uma quantidade inteira válida.");
                return;
            }

            produtos[indice].quantidade = quantidade;
            salvar();
            listarProdutos();
        };

        acoes.appendChild(alterarValor);
        acoes.appendChild(alterarQuantidade);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidadeTexto = document.getElementById("quantidade").value;
    const valorTexto = document.getElementById("valor").value;

    const quantidade = Number(quantidadeTexto);
    const valor = Number(valorTexto);

    if (!codigo || !descricao) {
        mensagem.textContent = "Preencha todos os campos.";
        return;
    }

    if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
        mensagem.textContent = "Esse código já está cadastrado.";
        return;
    }

    if (quantidadeTexto === "" || !Number.isInteger(quantidade) || quantidade < 0) {
        mensagem.textContent = "Informe uma quantidade válida.";
        return;
    }

    if (valorTexto === "" || !Number.isFinite(valor) || valor < 0) {
        mensagem.textContent = "Informe um valor válido.";
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    salvar();
    listarProdutos();
    form.reset();

    mensagem.textContent = "Produto cadastrado com sucesso!";
});

listarProdutos();
