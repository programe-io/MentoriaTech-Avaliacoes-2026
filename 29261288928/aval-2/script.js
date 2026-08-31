let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    \}

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3 || !prioridade) {
        alert("A prioridade deve ser um valor entre 1 e 3!");
        return;
    \}

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    \};

    tarefas.push(tarefa);

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
\}


// Listar todas as tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    \}

    tarefas.forEach(function(tarefa, indice) {

        let status = tarefa.concluida ? "Concluída" : "Pendente";

        let classe = tarefa.concluida ? "tarefa concluida" : "tarefa";

        lista.innerHTML += `
            <div class="\${classe\}">
                <h3>\${tarefa.titulo\}</h3>

                <p><strong>Código:</strong> \${tarefa.codigo\}</p>

                <p>
                    <strong>Prioridade:</strong>
                    \${tarefa.prioridade\}
                </p>

                <p>
                    <strong>Status:</strong>
                    \${status\}
                </p>

                <div class="botoes">

                    <button 
                        class="btn-concluir"
                        onclick="concluirTarefa(\${indice\})">
                        \${tarefa.concluida ? "Desmarcar conclusão" : "Concluir"\}
                    </button>

                    <button 
                        class="btn-prioridade"
                        onclick="alterarPrioridade(\${indice\})">
                        Alterar prioridade
                    </button>

                </div>
            </div>
        `;
    \});
\}


// Marcar tarefa como concluída
function concluirTarefa(indice) {

    tarefas[indice].concluida = !tarefas[indice].concluida;

    listarTarefas();
\}


// Alterar prioridade
function alterarPrioridade(indice) {

    let novaPrioridade = prompt(
        "Digite a nova prioridade (1 = Alta, 2 = Média, 3 = Baixa):"
    );

    novaPrioridade = Number(novaPrioridade);

    if (novaPrioridade < 1 || novaPrioridade > 3 || !novaPrioridade) {
        alert("A prioridade deve ser um valor entre 1 e 3!");
        return;
    \}

    tarefas[indice].prioridade = novaPrioridade;

    listarTarefas();
\}


// Inicia a lista
listarTarefas();$0