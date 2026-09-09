// Array que vai armazenar as tarefas
let tarefas = [];


// =====================================
// CADASTRAR NOVA TAREFA
// =====================================

function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value;
    let prioridade = document.getElementById("prioridade").value;


    // VALIDAÇÃO DO TÍTULO

    if (titulo.length < 5) {

        alert("❌ O título deve ter no mínimo 5 caracteres.");

        return;
    \}


    // VALIDAÇÃO DA PRIORIDADE

    if (prioridade !== "1" &&
        prioridade !== "2" &&
        prioridade !== "3") {

        alert("❌ Escolha uma prioridade entre 1 e 3.");

        return;
    \}


    // CRIA A TAREFA

    let tarefa = {

        id: Date.now(),

        titulo: titulo,

        prioridade: Number(prioridade),

        concluida: false

    \};


    // ADICIONA A TAREFA

    tarefas.push(tarefa);


    // LIMPA OS CAMPOS

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";


    alert("✅ Tarefa cadastrada com sucesso!");


    // ATUALIZA A TELA

    mostrarTarefas();
\}



// =====================================
// MOSTRAR TAREFAS
// =====================================

function mostrarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";


    // SE NÃO EXISTIR TAREFA

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    \}


    // MOSTRA TODAS AS TAREFAS

    tarefas.forEach(function(tarefa) {

        let prioridadeTexto = "";
        let classePrioridade = "";


        if (tarefa.prioridade === 1) {

            prioridadeTexto = "🔴 Alta";
            classePrioridade = "alta";

        \} else if (tarefa.prioridade === 2) {

            prioridadeTexto = "🟠 Média";
            classePrioridade = "media";

        \} else {

            prioridadeTexto = "🟢 Baixa";
            classePrioridade = "baixa";

        \}


        let classeConcluida =
            tarefa.concluida ? "concluida" : "";


        lista.innerHTML += `

            <div class="tarefa \${classeConcluida\}">

                <h3>
                    \${tarefa.titulo\}
                </h3>

                <p>
                    <strong>Prioridade:</strong>

                    <span class="\${classePrioridade\}">
                        \${prioridadeTexto\}
                    </span>
                </p>

                <p>
                    <strong>Status:</strong>

                    \${tarefa.concluida
                        ? "✅ Concluída"
                        : "⏳ Pendente"
                    \}
                </p>

                <div class="botoes-tarefa">

                    <button
                        class="concluir"
                        onclick="concluirTarefa(\${tarefa.id\})">

                        \${tarefa.concluida
                            ? "↩️ Reabrir"
                            : "✅ Concluir"
                        \}

                    </button>

                    <button
                        class="editar"
                        onclick="alterarPrioridade(\${tarefa.id\})">

                        ✏️ Alterar prioridade

                    </button>

                </div>

            </div>

        `;

    \});
\}



// =====================================
// MARCAR TAREFA COMO CONCLUÍDA
// =====================================

function concluirTarefa(id) {

    let tarefa = tarefas.find(function(tarefa) {

        return tarefa.id === id;

    \});


    if (tarefa) {

        tarefa.concluida = !tarefa.concluida;

        mostrarTarefas();

    \}
\}



// =====================================
// ALTERAR PRIORIDADE
// =====================================

function alterarPrioridade(id) {

    let tarefa = tarefas.find(function(tarefa) {

        return tarefa.id === id;

    \});


    if (!tarefa) {

        return;
    \}


    let novaPrioridade = prompt(
        "Digite a nova prioridade:\\n\\n" +
        "1 - Alta\\n" +
        "2 - Média\\n" +
        "3 - Baixa"
    );


    if (novaPrioridade !== "1" &&
        novaPrioridade !== "2" &&
        novaPrioridade !== "3") {

        alert("❌ A prioridade deve ser 1, 2 ou 3.");

        return;
    \}


    tarefa.prioridade = Number(novaPrioridade);


    alert("✅ Prioridade alterada!");


    mostrarTarefas();
\}$0