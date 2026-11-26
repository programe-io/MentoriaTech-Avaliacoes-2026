/ SISTEMA DE GERENCIAMENTO DE ESTOQUE

// Recupera os produtos salvos no navegador
let produtos = JSON.parse(
    localStorage.getItem("estoqueProdutos")
) || [];

let codigoEdicao = null;

// Seleciona os elementos do HTML
const formulario = document.querySelector("#formulario");
const lista = document.querySelector("#listaProdutos");
const mensagem = document.querySelector("#mensagem");

// Salva os produtos no navegador
function salvarDados() {
    localStorage.setItem(
        "estoqueProdutos",
        JSON.stringify(produtos)
    );
\}

// Formata valores em reais
function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    \});
\}

// Atualiza os indicadores do estoque
function atualizarResumo() {
    const unidades = produtos.reduce(
        (soma, produto) => soma + produto.quantidade, 0
    );

    const baixos = produtos.filter(
        produto => produto.quantidade < 5
    ).length;

    const valor = produtos.reduce(
        (soma, produto) =>
            soma + produto.quantidade * produto.valor, 0
    );

    document.querySelector("#totalProdutos").textContent =
        produtos.length;

    document.querySelector("#totalUnidades").textContent =
        unidades;

    document.querySelector("#estoqueBaixo").textContent =
        baixos;

    document.querySelector("#valorEstoque").textContent =
        formatarDinheiro(valor);
\}

// Exibe os produtos na tabela
function renderizarProdutos(filtro = "") {
    lista.innerHTML = "";

    const encontrados = produtos.filter(produto =>
        produto.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    encontrados.forEach(produto => {
        const linha = document.createElement("tr");

        const situacao = produto.quantidade < 5
            ? "Estoque baixo"
            : "Normal";

        const classe = produto.quantidade < 5
            ? "baixo"
            : "normal";

        const criarCelula = (conteudo, classeExtra = "") => {
            const celula = document.createElement("td");
            celula.textContent = conteudo;
            if (classeExtra) celula.className = classeExtra;
            return celula;
        \};

        linha.appendChild(criarCelula(produto.codigo));
        linha.appendChild(criarCelula(produto.descricao));
        linha.appendChild(criarCelula(produto.quantidade));
        linha.appendChild(criarCelula(formatarDinheiro(produto.valor)));
        linha.appendChild(criarCelula(
            formatarDinheiro(produto.quantidade * produto.valor)
        ));
        linha.appendChild(criarCelula(situacao, classe));

        const acoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "editar";
        botaoEditar.addEventListener("click", () => {
            editarProduto(produto.codigo);
        \});

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.addEventListener("click", () => {
            excluirProduto(produto.codigo);
        \});

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoExcluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    \});

    atualizarResumo();
\}

// Cadastra ou atualiza produtos
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.querySelector("#codigo").value.trim();
    const descricao = document.querySelector("#descricao").value.trim();
    const quantidade = Number(
        document.querySelector("#quantidade").value
    );
    const valor = Number(
        document.querySelector("#valor").value
    );

    if (
        !codigo ||
        !descricao ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(valor) ||
        quantidade < 0 ||
        valor < 0
    ) {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha os campos corretamente!";
        return;
    \}

    if (codigoEdicao === null) {
        const existe = produtos.find(
            produto =>
                produto.codigo.toLowerCase() === codigo.toLowerCase()
        );

        if (existe) {
            mensagem.style.color = "red";
            mensagem.textContent = "Código já cadastrado!";
            return;
        \}

        produtos.push({
            codigo,
            descricao,
            quantidade,
            valor
        \});

        mensagem.style.color = "green";
        mensagem.textContent = "Produto cadastrado com sucesso!";
    \} else {
        const produto = produtos.find(
            item => item.codigo === codigoEdicao
        );

        const codigoExiste = produtos.some(
            item =>
                item.codigo.toLowerCase() === codigo.toLowerCase() &&
                item.codigo !== codigoEdicao
        );

        if (codigoExiste) {
            mensagem.style.color = "red";
            mensagem.textContent = "Código já utilizado por outro produto!";
            return;
        \}

        produto.codigo = codigo;
        produto.descricao = descricao;
        produto.quantidade = quantidade;
        produto.valor = valor;

        mensagem.style.color = "green";
        mensagem.textContent = "Produto atualizado com sucesso!";
    \}

    salvarDados();
    formulario.reset();
    cancelarEdicao();

    renderizarProdutos(
        document.querySelector("#pesquisa").value
    );
\});

// Carrega os dados para edição
function editarProduto(codigo) {
    const produto = produtos.find(
        item => item.codigo === codigo
    );

    if (!produto) return;

    codigoEdicao = codigo;

    document.querySelector("#codigo").value = produto.codigo;
    document.querySelector("#descricao").value = produto.descricao;
    document.querySelector("#quantidade").value = produto.quantidade;
    document.querySelector("#valor").value = produto.valor;

    document.querySelector("#tituloFormulario").textContent =
        "Editar produto";

    document.querySelector("#botaoSalvar").textContent =
        "Salvar alterações";

    document.querySelector("#cancelarEdicao").style.display =
        "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    \});
\}

// Cancela a edição
function cancelarEdicao() {
    codigoEdicao = null;
    formulario.reset();

    document.querySelector("#tituloFormulario").textContent =
        "Cadastrar produto";

    document.querySelector("#botaoSalvar").textContent =
        "Cadastrar produto";

    document.querySelector("#cancelarEdicao").style.display =
        "none";
\}

// Evento do botão cancelar
document.querySelector("#cancelarEdicao").addEventListener(
    "click",
    cancelarEdicao
);

// Exclui um produto
function excluirProduto(codigo) {
    if (!confirm("Deseja realmente excluir este produto?")) {
        return;
    \}

    produtos = produtos.filter(
        produto => produto.codigo !== codigo
    );

    salvarDados();

    renderizarProdutos(
        document.querySelector("#pesquisa").value
    );

    mensagem.style.color = "green";
    mensagem.textContent = "Produto excluído com sucesso!";
\}

// Pesquisa produtos pelo código ou descrição
document.querySelector("#pesquisa").addEventListener(
    "input",
    function() {
        renderizarProdutos(this.value);
    \}
);

// Inicializa o sistema
renderizarProdutos();$0