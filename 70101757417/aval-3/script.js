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
        titulo: "Fazer atividade de HTML",
        prioridade: 2,
        concluida: false
    },

    {
        codigo: "003",
        titulo: "Organizar materiais",
        prioridade: 3,
        concluida: true
    },

    {
        codigo: "004",
        titulo: "Criar projeto CSS",
        prioridade: 1,
        concluida: false
    },

    {
        codigo: "005",
        titulo: "Estudar programação",
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
        titulo: "Revisar conteúdo",
        prioridade: 3,
        concluida: false
    },

    {
        codigo: "008",
        titulo: "Apresentar projeto",
        prioridade: 1,
        concluida: false
    }

];


// ==========================================
// CADASTRAR
// ==========================================

function cadastrar() {

    let codigo =
        document.getElementById("codigo")
        .value
        .trim();

    let titulo =
        document.getElementById("titulo")
        .value
        .trim();

    let prioridade =
        Number(
            document.getElementById("prioridade")
            .value
        );


    // Validar código

    if (codigo === "") {

        alert("Informe o código da tarefa.");

        return;
    }


    // Validar título

    if (titulo.length < 5) {

        alert(
            "O título deve possuir pelo menos 5 caracteres."
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
            "A prioridade deve ser 1, 2 ou 3."
        );

        return;
    }


    // Verificar código repetido

    let codigoExiste =
        tarefas.some(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (codigoExiste) {

        alert(
            "Esse código já está cadastrado."
        );

        return;
    }


    // Cadastrar

    tarefas.push({

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    });


    alert(
        "Tarefa cadastrada com sucesso!"
    );


    // Limpar

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";


    mostrar();
}


// ==========================================
// MOSTRAR
// ==========================================

function mostrar() {

    const lista =
        document.getElementById("lista");

    lista.innerHTML = "";


    let concluidas = 0;


    tarefas.forEach(tarefa => {

        let prioridadeTexto;

        let prioridadeClasse;


        if (tarefa.prioridade === 1) {

            prioridadeTexto = "ALTA";

            prioridadeClasse = "alta";

        } else if (tarefa.prioridade === 2) {

            prioridadeTexto = "MÉDIA";

            prioridadeClasse = "media";

        } else {

            prioridadeTexto = "BAIXA";

            prioridadeClasse = "baixa";

        }


        let statusTexto;

        let statusClasse;


        if (tarefa.concluida) {

            statusTexto = "✓ Concluída";

            statusClasse = "concluida";

            concluidas++;

        } else {

            statusTexto = "○ Pendente";

            statusClasse = "pendente";
        }


        const card =
            document.createElement("div");

        card.className = "tarefa";


        card.innerHTML = `

            <div class="codigo-card">
                #${tarefa.codigo}
            </div>

            <div>

                <h3>
                    ${tarefa.titulo}
                </h3>

                <span class="status ${statusClasse}">
                    ${statusTexto}
                </span>

            </div>

            <div>

                <span class="prioridade ${prioridadeClasse}">
                    ${prioridadeTexto}
                </span>

            </div>

        `;


        lista.appendChild(card);

    });


    // Atualizar números

    document.getElementById("total")
        .textContent = tarefas.length;


    document.getElementById("concluidas")
        .textContent = concluidas;


    document.getElementById("pendentes")
        .textContent =
            tarefas.length - concluidas;
}


// ==========================================
// CONCLUIR
// ==========================================

function concluir() {

    let codigo =
        document.getElementById("codigoBusca")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa."
        );

        return;
    }


    let tarefa =
        tarefas.find(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (!tarefa) {

        alert(
            "Tarefa não encontrada."
        );

        return;
    }


    if (tarefa.concluida) {

        alert(
            "Essa tarefa já está concluída."
        );

        return;
    }


    tarefa.concluida = true;


    alert(
        "Tarefa marcada como concluída!"
    );


    document.getElementById("codigoBusca")
        .value = "";


    mostrar();
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade() {

    let codigo =
        document.getElementById("codigoBusca")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa."
        );

        return;
    }


    let tarefa =
        tarefas.find(
            tarefa =>
                tarefa.codigo === codigo
        );


    if (!tarefa) {

        alert(
            "Tarefa não encontrada."
        );

        return;
    }


    let novaPrioridade =
        prompt(
            "Tarefa: " +
            tarefa.titulo +
            "\n\n" +
            "1 = Alta" +
            "\n2 = Média" +
            "\n3 = Baixa" +
            "\n\nDigite a nova prioridade:"
        );


    if (novaPrioridade === null) {
        return;
    }


    let prioridade =
        Number(novaPrioridade);


    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {

        alert(
            "Digite somente 1, 2 ou 3."
        );

        return;
    }


    tarefa.prioridade = prioridade;


    alert(
        "Prioridade alterada com sucesso!"
    );


    document.getElementById("codigoBusca")
        .value = "";


    mostrar();
}


// ==========================================
// INICIAR
// ==========================================

mostrar();
