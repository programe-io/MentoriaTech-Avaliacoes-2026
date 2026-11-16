
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function cadastrarProduto(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    salvarDados();
    mostrarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
}

function mostrarProdutos(filtro = "") {
    lista.innerHTML = "";

    const encontrados = produtos.filter(p =>
        p.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        p.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    encontrados.forEach(produto => {
        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        valores.forEach(valor => {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const acoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "editar";
        botaoEditar.onclick = () => editarProduto(produto.codigo);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => excluirProduto(produto.codigo);

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoExcluir);

        linha.appendChild(acoes);
        lista.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalQuantidade").textContent =
        produtos.reduce((total, p) => total + p.quantidade, 0);
}

function editarProduto(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt(
        "Digite o novo valor do produto:",
        produto.valor
    );

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produto.valor = valor;
    produto.quantidade = quantidade;

    salvarDados();
    mostrarProdutos();

    alert("Produto atualizado com sucesso!");
}

function excluirProduto(codigo) {
    const confirmar = confirm("Deseja excluir este produto?");

    if (!confirmar) return;

    produtos = produtos.filter(p => p.codigo !== codigo);

    salvarDados();
    mostrarProdutos();

    alert("Produto excluído!");
}

document.getElementById("pesquisa").addEventListener("input", function() {
    mostrarProdutos(this.value);
});

formulario.addEventListener("submit", cadastrarProduto);

mostrarProdutos();
