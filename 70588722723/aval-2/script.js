let tarefas = [];
let proximoCodigo = 1;

// Validar dados
function validarDados(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título precisa ter 5 caracteres.");
    \}

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Prioridade inválida.");
    \}
\}

// Cadastrar tarefa
function cadastrarTarefa() {
    try {
        let titulo = document.getElementById("titulo").value;
        let prioridade = Number(
            document.getElementById("prioridade").value
        );

        validarDados(titulo, prioridade);

        let tarefa = {
            codigo: proximoCodigo++,
            titulo: titulo.trim(),
            prioridade: prioridade,
            status: true
        \};

        tarefas.push(tarefa);

        document.getElementById("titulo").value = "";

        listarTarefas();

    \} catch (erro) {
        alert(erro.message);
    \}
\}

// Listar tarefas
function listarTarefas() {
    let lista = document.getElementById("tarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        let div = document.createElement("div");

        div.className = "tarefa";

        if (!tarefa.status) {
            div.classList.add("concluida");
        \}

        div.innerHTML = `
            <h3>\${tarefa.titulo\}</h3>
            <p>Código: \${tarefa.codigo\}</p>
            <p>Prioridade: \${tarefa.prioridade\}</p>
            <p>Status: \${tarefa.status ? "Em andamento" : "Concluída"\}</p>

            <button onclick="concluirTarefa(\${tarefa.codigo\})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(\${tarefa.codigo\})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(div);
    \});
\}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    \}

    return tarefa;
\}

// Concluir tarefa
function concluirTarefa(codigo) {
    try {
        let tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {
            throw new Error("A tarefa já foi concluída!");
        \}

        tarefa.status = false;

        listarTarefas();

    \} catch (erro) {
        alert(erro.message);
    \}
\}

// Alterar prioridade
function alterarPrioridade(codigo) {
    try {
        let tarefa = buscarTarefa(codigo);

        let novaPrioridade = Number(
            prompt("Digite a nova prioridade (1, 2 ou 3):")
        );

        validarDados(tarefa.titulo, novaPrioridade);

        tarefa.prioridade = novaPrioridade;

        listarTarefas();

    \} catch (erro) {
        alert(erro.message);
    \}
\}$0