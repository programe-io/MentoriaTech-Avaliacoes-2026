
let produtos = JSON.parse(
    localStorage.getItem("estoqueStockPro")
) || [];

let editando = null;

const form = document.getElementById("formProduto");

document.getElementById("dataAtual").textContent =
    new Date().toLocaleDateString("pt-BR");

function salvarDados() {
    localStorage.setItem(
        "estoqueStockPro",
        JSON.stringify(produtos)
    );
}

function cadastrarProduto(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);
    const minimo = Number(document.getElementById("minimo").value);

    if (!codigo || !nome || !categoria ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(preco) || preco < 0 ||
        !Number.isInteger(minimo) || minimo < 0) {

        alert("Verifique os dados informados.");
        return;
    }

    const codigoDuplicado = produtos.some((produto, indice) =>
        produto.codigo.toLowerCase() === codigo.toLowerCase()
        && indice !== editando
    );

    if (codigoDuplicado) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        codigo,
        nome,
        categoria,
        quantidade,
        preco,
        minimo
    };

    if (editando !== null) {
        produtos[editando] = produto;
        alert("Produto atualizado com sucesso!");
    } else {
        produtos.push(produto);
        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();
    limparFormulario();
    renderizar();
}

function limparFormulario() {

    form.reset();
    document.getElementById("minimo").value = 5;

    editando = null;

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar novo produto";

    document.getElementById("botaoSalvar").textContent =
        "Cadastrar produto";
}

function editarProduto(indice) {

    const produto = produtos[indice];

    document.getElementById("codigo").value = produto.codigo;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("minimo").value = produto.minimo;

    editando = indice;

    document.getElementById("tituloFormulario").textContent =
        "Editar produto";

    document.getElementById("botaoSalvar").textContent =
        "Salvar alterações";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function excluirProduto(indice) {

    if (confirm("Deseja realmente excluir este produto?")) {

        produtos.splice(indice, 1);

        salvarDados();
        limparFormulario();
        renderizar();

    }
}

function renderizar() {

    const lista = document.getElementById("listaProdutos");
    const busca = document.getElementById("busca").value.toLowerCase();

    lista.innerHTML = "";

    let unidades = 0;
    let valor = 0;
    let baixo = 0;

    produtos.forEach(produto => {
        unidades += produto.quantidade;
        valor += produto.quantidade * produto.preco;

        if (produto.quantidade <= produto.minimo) {
            baixo++;
        }
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        unidades;

    document.getElementById("estoqueBaixo").textContent =
        baixo;

    document.getElementById("valorEstoque").textContent =
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    const filtrados = produtos
        .map((produto, indice) => ({ produto, indice }))
        .filter(item =>
            item.produto.nome.toLowerCase().includes(busca) ||
            item.produto.codigo.toLowerCase().includes(busca)
        );

    if (filtrados.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
        return;
    }

    filtrados.forEach(({ produto, indice }) => {

        let status;
        let classe;

        if (produto.quantidade === 0) {
            status = "Esgotado";
            classe = "esgotado";
        } else if (produto.quantidade <= produto.minimo) {
            status = "Estoque baixo";
            classe = "baixo";
        } else {
            status = "Disponível";
            classe = "disponivel";
        }

        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.nome,
            produto.categoria,
            produto.quantidade,
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaStatus = document.createElement("td");
        const etiqueta = document.createElement("span");
        etiqueta.className = "status " + classe;
        etiqueta.textContent = status;
        celulaStatus.appendChild(etiqueta);
        linha.appendChild(celulaStatus);

        const celulaAcoes = document.createElement("td");
        const operacoes = document.createElement("div");
        operacoes.className = "operacoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "editar";
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarProduto(indice);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "excluir";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = () => excluirProduto(indice);

        operacoes.append(botaoEditar, botaoExcluir);
        celulaAcoes.appendChild(operacoes);
        linha.appendChild(celulaAcoes);

        lista.appendChild(linha);
    });
}

form.addEventListener("submit", cadastrarProduto);

renderizar();
