// =====================================
// ARRAY DE TAREFAS
// =====================================

let tarefas = [];



// =====================================
// CADASTRAR NOVA TAREFA
// =====================================

function cadastrarTarefa() {

    // Pegando os valores dos campos

    let codigo =
        document.getElementById(
            "codigo"
        ).value;

    let titulo =
        document.getElementById(
            "titulo"
        ).value;

    let prioridade =
        document.getElementById(
            "prioridade"
        ).value;



    // =================================
    // VALIDAÇÃO DO CÓDIGO
    // =================================

    if (codigo === "") {

        alert(
            "💜 Digite o código da tarefa!"
        );

        return;
    \}



    // =================================
    // VALIDAÇÃO DO TÍTULO
    // =================================

    if (titulo.length < 5) {

        alert(
            "🪻 O título deve ter no mínimo 5 caracteres!"
        );

        return;
    \}



    // =================================
    // VALIDAÇÃO DA PRIORIDADE
    // =================================

    if (
        prioridade === "" ||
        prioridade < 1 ||
        prioridade > 3
    ) {

        alert(
            "⭐ A prioridade deve ser entre 1 e 3!"
        );

        return;
    \}



    // =================================
    // VERIFICAR CÓDIGO REPETIDO
    // =================================

    let tarefaExistente =
        tarefas.find(
            function(tarefa) {

                return tarefa.codigo === codigo;

            \}
        );


    if (tarefaExistente) {

        alert(
            "🌸 Já existe uma tarefa com esse código!"
        );

        return;
    \}



    // =================================
    // CRIAR OBJETO TAREFA
    // =================================

    let tarefa = {

        codigo: codigo,

        titulo: titulo,

        prioridade:
            Number(prioridade),

        concluida: false

    \};



    // =================================
    // ADICIONAR AO ARRAY
    // =================================

    tarefas.push(tarefa);



    // =================================
    // LIMPAR CAMPOS
    // =================================

    document.getElementById(
        "codigo"
    ).value = "";

    document.getElementById(
        "titulo"
    ).value = "";

    document.getElementById(
        "prioridade"
    ).value = "";



    // =================================
    // ATUALIZAR LISTA
    // =================================

    listarTarefas();



    alert(
        "✨ Tarefa cadastrada com sucesso!"
    );

\}



// =====================================
// LISTAR TAREFAS
// =====================================

function listarTarefas() {

    let lista =
        document.getElementById(
            "listaTarefas"
        );

    let contador =
        document.getElementById(
            "contador"
        );



    // =================================
    // CONTADOR
    // =================================

    if (tarefas.length === 1) {

        contador.textContent =
            "1 tarefa";

    \} else {

        contador.textContent =
            tarefas.length +
            " tarefas";

    \}



    // =================================
    // LISTA VAZIA
    // =================================

    if (tarefas.length === 0) {

        lista.innerHTML = `

            <div class="vazio">

                <span>
                    🪻
                </span>

                <p>
                    Nenhuma tarefa cadastrada.
                </p>

                <small>
                    Adicione uma tarefa para começar!
                </small>

            </div>

        `;

        return;
    \}



    // =================================
    // LIMPAR LISTA
    // =================================

    lista.innerHTML = "";



    // =================================
    // PERCORRER TAREFAS
    // =================================

    for (
        let i = 0;
        i < tarefas.length;
        i++
    ) {

        let tarefa =
            tarefas[i];



        // =================================
        // TEXTO DA PRIORIDADE
        // =================================

        let textoPrioridade = "";

        let classePrioridade = "";



        if (tarefa.prioridade === 1) {

            textoPrioridade =
                "1 - Alta 🔥";

            classePrioridade =
                "prioridade-alta";

        \}

        else if (tarefa.prioridade === 2) {

            textoPrioridade =
                "2 - Média ⭐";

            classePrioridade =
                "prioridade-media";

        \}

        else {

            textoPrioridade =
                "3 - Baixa 🌱";

            classePrioridade =
                "prioridade-baixa";

        \}



        // =================================
        // STATUS
        // =================================

        let status = "";

        let classeConcluida = "";



        if (tarefa.concluida) {

            status =
                "Concluída ✅";

            classeConcluida =
                "concluida";

        \} else {

            status =
                "Pendente ⏳";

        \}



        // =================================
        // CRIAR CARD
        // =================================

        lista.innerHTML += `

            <div class="tarefa \${classeConcluida\}">

                <h3>
                    📝 \${tarefa.titulo\}
                </h3>

                <p>

                    <strong>
                        Código:
                    </strong>

                    \${tarefa.codigo\}

                </p>


                <p class="\${classePrioridade\}">

                    <strong>
                        Prioridade:
                    </strong>

                    \${textoPrioridade\}

                </p>


                <p>

                    <strong>
                        Status:
                    </strong>

                    \${status\}

                </p>

            </div>

        `;

    \}

\}



// =====================================
// MARCAR TAREFA COMO CONCLUÍDA
// =====================================

function concluirTarefa() {

    let codigo =
        document.getElementById(
            "codigoAlterar"
        ).value;



    // Procurar tarefa

    let tarefa =
        tarefas.find(
            function(tarefa) {

                return tarefa.codigo === codigo;

            \}
        );



    // =================================
    // VERIFICAR SE EXISTE
    // =================================

    if (!tarefa) {

        alert(
            "🌸 Tarefa não encontrada!"
        );

        return;
    \}



    // =================================
    // MARCAR COMO CONCLUÍDA
    // =================================

    tarefa.concluida = true;



    // Atualizar lista

    listarTarefas();



    // Limpar campo

    document.getElementById(
        "codigoAlterar"
    ).value = "";



    alert(
        "🎉 Tarefa marcada como concluída!"
    );

\}



// =====================================
// ALTERAR PRIORIDADE
// =====================================

function alterarPrioridade() {

    let codigo =
        document.getElementById(
            "codigoAlterar"
        ).value;


    let novaPrioridade =
        document.getElementById(
            "novaPrioridade"
        ).value;



    // =================================
    // VALIDAR PRIORIDADE
    // =================================

    if (
        novaPrioridade === "" ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {

        alert(
            "🪻 Escolha uma prioridade entre 1 e 3!"
        );

        return;
    \}



    // =================================
    // PROCURAR TAREFA
    // =================================

    let tarefa =
        tarefas.find(
            function(tarefa) {

                return tarefa.codigo === codigo;

            \}
        );



    // =================================
    // VERIFICAR SE EXISTE
    // =================================

    if (!tarefa) {

        alert(
            "🌸 Tarefa não encontrada!"
        );

        return;
    \}



    // =================================
    // ALTERAR PRIORIDADE
    // =================================

    tarefa.prioridade =
        Number(novaPrioridade);



    // =================================
    // ATUALIZAR LISTA
    // =================================

    listarTarefas();



    // =================================
    // LIMPAR CAMPOS
    // =================================

    document.getElementById(
        "codigoAlterar"
    ).value = "";

    document.getElementById(
        "novaPrioridade"
    ).value = "";



    alert(
        "⭐ Prioridade alterada com sucesso!"
    );

\}$0