const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const mensagemVazia = document.getElementById("mensagemVazia");

// Recupera as tarefas salvas no navegador.
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Gera o próximo código automaticamente.
let proximoCodigo = tarefas.reduce(
    (maior, tarefa) => Math.max(maior, tarefa.codigo),
    0
) + 1;

// Salva as tarefas no localStorage.
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
\}

// Cadastra uma nova tarefa.
form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validação do título.
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        campoTitulo.focus();
        return;
    \}

    // Validação da prioridade.
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return;
    \}

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    \};

    tarefas.push(novaTarefa);
    proximoCodigo++;

    salvarTarefas();
    renderizarTarefas();

    form.reset();
    campoPrioridade.value = "2";
    campoTitulo.focus();
\});

// Retorna o nome da prioridade.
function nomePrioridade(prioridade) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    \};

    return nomes[prioridade];
\}

// Cria um elemento de texto com segurança.
function criarTexto(tag, texto) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    return elemento;
\}

// Lista todas as tarefas na tabela.
function renderizarTarefas() {
    listaTarefas.replaceChildren();

    contador.textContent = `Total de tarefas: \${tarefas.length\}`;
    mensagemVazia.hidden = tarefas.length > 0;

    tarefas.forEach(function (tarefa) {
        const linha = document.createElement("tr");

        // Código.
        linha.appendChild(criarTexto("td", tarefa.codigo));

        // Título.
        linha.appendChild(criarTexto("td", tarefa.titulo));

        // Prioridade editável.
        const celulaPrioridade = document.createElement("td");
        const seletor = document.createElement("select");

        seletor.className = "prioridade-select";
        seletor.setAttribute(
            "aria-label",
            `Prioridade da tarefa \${tarefa.codigo\}`
        );

        [1, 2, 3].forEach(function (numero) {
            const opcao = document.createElement("option");
            opcao.value = numero;
            opcao.textContent = `\${numero\} - \${nomePrioridade(numero)\}`;
            seletor.appendChild(opcao);
        \});

        seletor.value = tarefa.prioridade;
        seletor.disabled = tarefa.concluida;

        seletor.addEventListener("change", function () {
            alterarPrioridade(tarefa.codigo, Number(seletor.value));
        \});

        celulaPrioridade.appendChild(seletor);
        linha.appendChild(celulaPrioridade);

        // Status da tarefa.
        const celulaStatus = document.createElement("td");
        const status = criarTexto(
            "span",
            tarefa.concluida ? "Concluída" : "Pendente"
        );

        status.className = tarefa.concluida
            ? "status concluida"
            : "status pendente";

        celulaStatus.appendChild(status);
        linha.appendChild(celulaStatus);

        // Botão para concluir.
        const celulaAcoes = document.createElement("td");
        const botaoConcluir = criarTexto(
            "button",
            tarefa.concluida ? "Concluída" : "Concluir"
        );

        botaoConcluir.type = "button";
        botaoConcluir.className = "btn-concluir";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function () {
            concluirTarefa(tarefa.codigo);
        \});

        celulaAcoes.appendChild(botaoConcluir);
        linha.appendChild(celulaAcoes);

        listaTarefas.appendChild(linha);
    \});
\}

// Marca uma tarefa como concluída.
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function (item) {
        return item.codigo === codigo;
    \});

    if (!tarefa || tarefa.concluida) {
        return;
    \}

    tarefa.concluida = true;

    salvarTarefas();
    renderizarTarefas();
\}

// Altera a prioridade de uma tarefa.
function alterarPrioridade(codigo, novaPrioridade) {
    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        renderizarTarefas();
        return;
    \}

    const tarefa = tarefas.find(function (item) {
        return item.codigo === codigo;
    \});

    if (!tarefa || tarefa.concluida) {
        return;
    \}

    tarefa.prioridade = novaPrioridade;

    salvarTarefas();
    renderizarTarefas();
\}

// Exibe as tarefas ao abrir a página.
renderizarTarefas();$0