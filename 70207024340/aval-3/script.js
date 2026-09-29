// ==========================================
// TAREFAS JÁ CADASTRADAS
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
        titulo: "Fazer atividade HTML",
        prioridade: 2,
        concluida: false
    },

    {
        codigo: "003",
        titulo: "Organizar documentos",
        prioridade: 3,
        concluida: true
    },

    {
        codigo: "004",
        titulo: "Criar projeto web",
        prioridade: 1,
        concluida: false
    },

    {
        codigo: "005",
        titulo: "Revisar conteúdo",
        prioridade: 2,
        concluida: false
    },

    {
        codigo: "006",
        titulo: "Estudar CSS",
        prioridade: 3,
        concluida: true
    },

    {
        codigo: "007",
        titulo: "Fazer exercício JavaScript",
        prioridade: 1,
        concluida: false
    },

    {
        codigo: "008",
        titulo: "Entregar projeto final",
        prioridade: 1,
        concluida: false
    }
];


// ==========================================
// CADASTRAR NOVA TAREFA
// ==========================================

function cadastrarTarefa() {

    const codigo = document.getElementById("codigo").value.trim();

    const titulo = document.getElementById("titulo").value.trim();

    const prioridade = Number(
        document.getElementById("prioridade").value
    );


    // Validar código

    if (codigo === "") {

        alert("Digite o código da tarefa!");

        return;
    }


    // Validar título

    if (titulo.length < 5) {

        alert(
            "O título deve ter no mínimo 5 caracteres!"
        );

        return;
    }


    // Validar prioridade

    if (
        prioridade < 1 ||
        prioridade > 3 ||
        isNaN(prioridade)
    ) {

        alert(
            "A prioridade deve ser 1, 2 ou 3!"
        );

        return;
    }


    // Verificar código duplicado

    const tarefaExiste = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );


    if (tarefaExiste) {

        alert(
            "Já existe uma tarefa com esse código!"
        );

        return;
    }


    // Criar nova tarefa

    const novaTarefa = {

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    // Adicionar tarefa

    tarefas.push(novaTarefa);


    alert(
        "Tarefa cadastrada com sucesso!"
    );


    // Limpar campos

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";


    // Atualizar tabela

    listarTarefas();
}


// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    const lista =
        document.getElementById("listaTarefas");

    lista.innerHTML = "";


    // Verificar se existem tarefas

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="4">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;

        return;
    }


    // Mostrar tarefas

    tarefas.forEach(tarefa => {

        let prioridadeTexto = "";
        let prioridadeClasse = "";


        // Definir prioridade

        if (tarefa.prioridade === 1) {

            prioridadeTexto = "1 - Alta";
            prioridadeClasse = "alta";

        } else if (tarefa.prioridade === 2) {

            prioridadeTexto = "2 - Média";
            prioridadeClasse = "media";

        } else {

            prioridadeTexto = "3 - Baixa";
            prioridadeClasse = "baixa";
        }


        // Definir status

        let statusTexto = "";
        let statusClasse = "";


        if (tarefa.concluida === true) {

            statusTexto = "✓ Concluída";
            statusClasse = "concluida";

        } else {

            statusTexto = "⏳ Pendente";
            statusClasse = "pendente";
        }


        // Criar linha

        const linha = document.createElement("tr");


        linha.innerHTML = `
            <td>${tarefa.codigo}</td>

            <td>${tarefa.titulo}</td>

            <td class="${prioridadeClasse}">
                ${prioridadeTexto}
            </td>

            <td class="${statusClasse}">
                ${statusTexto}
            </td>
        `;


        lista.appendChild(linha);

    });
}


// ==========================================
// MARCAR TAREFA COMO CONCLUÍDA
// ==========================================

function concluirTarefa() {

    const codigo = document
        .getElementById("codigoGerenciar")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa!"
        );

        return;
    }


    // Procurar tarefa

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );


    if (!tarefa) {

        alert(
            "Tarefa não encontrada!"
        );

        return;
    }


    // Verificar se já está concluída

    if (tarefa.concluida === true) {

        alert(
            "Essa tarefa já está concluída!"
        );

        return;
    }


    // Alterar status

    tarefa.concluida = true;


    alert(
        "Tarefa marcada como concluída!"
    );


    // Limpar campo

    document.getElementById("codigoGerenciar").value = "";


    // Atualizar tabela

    listarTarefas();
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade() {

    const codigo = document
        .getElementById("codigoGerenciar")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa!"
        );

        return;
    }


    // Procurar tarefa

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );


    if (!tarefa) {

        alert(
            "Tarefa não encontrada!"
        );

        return;
    }


    // Pedir nova prioridade

    const novaPrioridade = prompt(
        "Tarefa: " + tarefa.titulo +
        "\n\n" +
        "Digite a nova prioridade:" +
        "\n1 - Alta" +
        "\n2 - Média" +
        "\n3 - Baixa"
    );


    if (novaPrioridade === null) {

        return;
    }


    const prioridade = Number(novaPrioridade);


    // Validar prioridade

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {

        alert(
            "Digite somente 1, 2 ou 3!"
        );

        return;
    }


    // Alterar prioridade

    tarefa.prioridade = prioridade;


    alert(
        "Prioridade alterada com sucesso!"
    );


    // Limpar campo

    document.getElementById("codigoGerenciar").value = "";


    // Atualizar tabela

    listarTarefas();
}


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarTarefas();