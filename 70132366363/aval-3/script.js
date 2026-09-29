// ==========================================
// TAREFAS CADASTRADAS
// ==========================================

let tarefas = [

    {
        codigo: "001",
        titulo: "Estudar JavaScript",
        prioridade: 1,
        concluida: false
    },

    {
        codigo: "002",
        titulo: "Fazer trabalho da escola",
        prioridade: 2,
        concluida: false
    },

    {
        codigo: "003",
        titulo: "Organizar material",
        prioridade: 3,
        concluida: true
    },

    {
        codigo: "004",
        titulo: "Criar página HTML",
        prioridade: 1,
        concluida: false
    },

    {
        codigo: "005",
        titulo: "Estudar CSS",
        prioridade: 2,
        concluida: false
    },

    {
        codigo: "006",
        titulo: "Entregar atividade",
        prioridade: 1,
        concluida: true
    },

    {
        codigo: "007",
        titulo: "Praticar programação",
        prioridade: 3,
        concluida: false
    }

];


// ==========================================
// CADASTRAR
// ==========================================

function cadastrar(event) {

    event.preventDefault();


    const codigo =
        document.getElementById("codigo")
        .value
        .trim();


    const titulo =
        document.getElementById("titulo")
        .value
        .trim();


    const prioridade =
        Number(
            document.getElementById("prioridade")
            .value
        );


    // Validar código

    if (codigo === "") {

        alert("Digite o código!");

        return;
    }


    // Validar título

    if (titulo.length < 5) {

        alert(
            "O título precisa ter no mínimo 5 caracteres!"
        );

        return;
    }


    // Validar prioridade

    if (
        prioridade < 1 ||
        prioridade > 3 ||
        !Number.isInteger(prioridade)
    ) {

        alert(
            "Escolha uma prioridade entre 1 e 3!"
        );

        return;
    }


    // Verificar código

    const existe =
        tarefas.some(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (existe) {

        alert(
            "Já existe uma tarefa com esse código!"
        );

        return;
    }


    // Criar tarefa

    tarefas.push({

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    });


    alert(
        "Tarefa cadastrada com sucesso!"
    );


    // Limpar formulário

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";


    mostrarTarefas();
}


// ==========================================
// MOSTRAR TAREFAS
// ==========================================

function mostrarTarefas() {

    const lista =
        document.getElementById("listaTarefas");

    lista.innerHTML = "";


    let concluidas = 0;


    tarefas.forEach(tarefa => {

        let prioridadeTexto;
        let prioridadeClasse;


        if (tarefa.prioridade === 1) {

            prioridadeTexto = "Alta";
            prioridadeClasse = "alta";

        } else if (tarefa.prioridade === 2) {

            prioridadeTexto = "Média";
            prioridadeClasse = "media";

        } else {

            prioridadeTexto = "Baixa";
            prioridadeClasse = "baixa";
        }


        let statusTexto;
        let statusClasse;


        if (tarefa.concluida) {

            statusTexto = "✓ Concluída";
            statusClasse = "concluida";

            concluidas++;

        } else {

            statusTexto = "⏳ Pendente";
            statusClasse = "pendente";
        }


        const card =
            document.createElement("div");


        card.className = "tarefa";


        card.innerHTML = `

            <div class="tarefa-info">

                <span class="codigo">
                    Código: ${tarefa.codigo}
                </span>

                <h3>
                    ${tarefa.titulo}
                </h3>

                <div class="status ${statusClasse}">
                    ${statusTexto}
                </div>

            </div>

            <span class="prioridade ${prioridadeClasse}">
                ${prioridadeTexto}
            </span>

        `;


        lista.appendChild(card);

    });


    // Atualizar resumo

    document.getElementById("total")
        .textContent = tarefas.length;


    document.getElementById("concluidas")
        .textContent = concluidas;


    document.getElementById("pendentes")
        .textContent =
            tarefas.length - concluidas;
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa() {

    const codigo =
        document.getElementById("codigoBusca")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa!"
        );

        return;
    }


    const tarefa =
        tarefas.find(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (!tarefa) {

        alert(
            "Tarefa não encontrada!"
        );

        return;
    }


    if (tarefa.concluida) {

        alert(
            "Essa tarefa já está concluída!"
        );

        return;
    }


    tarefa.concluida = true;


    alert(
        "Tarefa concluída com sucesso!"
    );


    document.getElementById("codigoBusca")
        .value = "";


    mostrarTarefas();
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade() {

    const codigo =
        document.getElementById("codigoBusca")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa!"
        );

        return;
    }


    const tarefa =
        tarefas.find(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (!tarefa) {

        alert(
            "Tarefa não encontrada!"
        );

        return;
    }


    const novaPrioridade =
        prompt(
            "Tarefa: " + tarefa.titulo +
            "\n\n" +
            "1 - Alta" +
            "\n2 - Média" +
            "\n3 - Baixa" +
            "\n\nDigite a nova prioridade:"
        );


    if (novaPrioridade === null) {
        return;
    }


    const prioridade =
        Number(novaPrioridade);


    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {

        alert(
            "A prioridade deve ser 1, 2 ou 3!"
        );

        return;
    }


    tarefa.prioridade = prioridade;


    alert(
        "Prioridade alterada com sucesso!"
    );


    document.getElementById("codigoBusca")
        .value = "";


    mostrarTarefas();
}


// ==========================================
// INICIAR
// ==========================================

mostrarTarefas();