let tarefas = [];
let geradorDeCodigo = 0;

const formulario = document.getElementById("formTarefa");
const mensagem = document.getElementById("mensagem");

// Validar dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres!");
    \}

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser entre 1 e 3!");
    \}
\}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorDeCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    \};

    tarefas.push(tarefa);

    return tarefa;
\}

// Listar tarefas
function listarTarefas() {
    return tarefas;
\}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    \}

    return tarefa;
\}

// Concluir tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já foi concluída!");
    \}

    tarefa.status = false;
\}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        Number(novaPrioridade)
    );

    tarefa.prioridade = Number(novaPrioridade);
\}

// Exibir tarefas na tela
function exibirTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    let tarefasCadastradas = listarTarefas();

    if (tarefasCadastradas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
    \}

    tarefasCadastradas.forEach(tarefa => {
        let card = document.createElement("div");

        card.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        let titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        let prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " +
            ["", "Alta", "Média", "Baixa"][tarefa.prioridade];

        let status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        let botoes = document.createElement("div");
        botoes.className = "botoes";

        // Botão concluir
        let botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.disabled = !tarefa.status;
        botaoConcluir.className = "btn-concluir";

        botaoConcluir.onclick = function() {
            try {
                concluirTarefa(tarefa.codigo);

                mensagem.textContent = "Tarefa concluída!";
                mensagem.className = "sucesso";

                exibirTarefas();

            \} catch (erro) {
                mostrarErro(erro);
            \}
        \};

        // Botão alterar prioridade
        let botaoAlterar = document.createElement("button");
        botaoAlterar.textContent = "Alterar prioridade";
        botaoAlterar.className = "btn-alterar";

        botaoAlterar.onclick = function() {
            let novaPrioridade = prompt(
                "Digite a nova prioridade (1, 2 ou 3):"
            );

            if (novaPrioridade === null) return;

            try {
                alterarPrioridade(
                    tarefa.codigo,
                    Number(novaPrioridade)
                );

                mensagem.textContent =
                    "Prioridade alterada com sucesso!";

                mensagem.className = "sucesso";

                exibirTarefas();

            \} catch (erro) {
                mostrarErro(erro);
            \}
        \};

        botoes.append(
            botaoConcluir,
            botaoAlterar
        );

        card.append(
            titulo,
            codigo,
            prioridade,
            status,
            botoes
        );$0