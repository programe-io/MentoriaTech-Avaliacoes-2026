let tarefas = [];

let proximoCodigo = 1;


// CADASTRAR TAREFA
function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validação do título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    \}

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser 1, 2 ou 3!");
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

    document.getElementById("titulo").value = "";

    listarTarefas();
\}


// LISTAR TAREFAS
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    \}

    tarefas.forEach(function(tarefa) {

        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            classePrioridade = "alta";
        \} 
        else if (tarefa.prioridade === 2) {
            classePrioridade = "media";
        \} 
        else {
            classePrioridade = "baixa";
        \}

        const classeConcluida = tarefa.concluida 
            ? "concluida" 
            : "";

        const textoPrioridade = 
            tarefa.prioridade === 1 ? "Alta" :
            tarefa.prioridade === 2 ? "Média" :
            "Baixa";

        lista.innerHTML += `
            <div class="tarefa \${classePrioridade\} \${classeConcluida\}">

                <h3>
                    #\${tarefa.codigo\} - \${tarefa.titulo\}
                </h3>

                <p>
                    Prioridade: \${textoPrioridade\}
                </p>

                <p>
                    Status: 
                    \${tarefa.concluida ? "Concluída ✅" : "Pendente ⏳"\}
                </p>

                <button 
                    class="concluir"
                    onclick="marcarConcluida(\${tarefa.codigo\})">
                    \${tarefa.concluida ? "Desmarcar" : "Concluir"\}
                </button>

                <button 
                    class="prioridade"
                    onclick="alterarPrioridade(\${tarefa.codigo\})">
                    Alterar prioridade
                </button>

            </div>
        `;
    \});
\}


// MARCAR COMO CONCLUÍDA
function marcarConcluida(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    \});

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    \}

    listarTarefas();
\}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    \});

    if (!tarefa) {
        return;
    \}

    let novaPrioridade = prompt(
        "Digite a nova prioridade:\\n1 - Alta\\n2 - Média\\n3 - Baixa"
    );

    novaPrioridade = Number(novaPrioridade);

    if (
        novaPrioridade < 1 ||
        novaPrioridade > 3 ||
        !Number.isInteger(novaPrioridade)
    ) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    \}

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
\}


// MOSTRAR LISTA INICIAL
listarTarefas();$0