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
    }

];


// ==========================================
// ADICIONAR TAREFA
// ==========================================

function adicionarTarefa() {

    let codigo =
        document.getElementById("codigo").value.trim();

    let titulo =
        document.getElementById("titulo").value.trim();

    let prioridade =
        Number(document.getElementById("prioridade").value);


    // Código

    if (codigo === "") {

        alert("Digite o código!");

        return;
    }


    // Título mínimo de 5 caracteres

    if (titulo.length < 5) {

        alert(
            "O título precisa ter no mínimo 5 caracteres!"
        );

        return;
    }


    // Prioridade

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


    // Código duplicado

    let existe = tarefas.some(
        tarefa => tarefa.codigo === codigo
    );


    if (existe) {

        alert(
            "Esse código já está cadastrado!"
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
        "Tarefa cadastrada!"
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

    let area =
        document.getElementById("tarefas");

    area.innerHTML = "";


    // Contador

    document.getElementById("contador").textContent =
        tarefas.length +
        (tarefas.length === 1
            ? " tarefa"
            : " tarefas");


    // Nenhuma tarefa

    if (tarefas.length === 0) {

        area.innerHTML =
            "<p>Nenhuma tarefa cadastrada.</p>";

        return;
    }


    // Criar cards

    tarefas.forEach(tarefa => {

        let prioridade;
        let classePrioridade;


        if (tarefa.prioridade === 1) {

            prioridade = "🔴 Alta";

            classePrioridade = "alta";

        } else if (tarefa.prioridade === 2) {

            prioridade = "🟡 Média";

            classePrioridade = "media";

        } else {

            prioridade = "🟢 Baixa";

            classePrioridade = "baixa";
        }


        let status;

        let classeStatus;


        if (tarefa.concluida) {

            status = "✓ Tarefa concluída";

            classeStatus = "concluida";

        } else {

            status = "⏳ Tarefa pendente";

            classeStatus = "pendente";
        }


        let card =
            document.createElement("div");

        card.className = "tarefa";


        card.innerHTML = `

            <div>

                <span class="codigo">
                    Código: ${tarefa.codigo}
                </span>

                <h3>
                    ${tarefa.titulo}
                </h3>

                <div class="status ${classeStatus}">
                    ${status}
                </div>

            </div>

            <div>

                <span class="prioridade ${classePrioridade}">
                    ${prioridade}
                </span>

            </div>

        `;


        area.appendChild(card);

    });
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluir() {

    let codigo =
        document.getElementById("codigoTarefa")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa!"
        );

        return;
    }


    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
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


    document.getElementById("codigoTarefa").value = "";


    mostrarTarefas();
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function mudarPrioridade() {

    let codigo =
        document.getElementById("codigoTarefa")
        .value
        .trim();


    if (codigo === "") {

        alert(
            "Digite o código da tarefa!"
        );

        return;
    }


    let tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );


    if (!tarefa) {

        alert(
            "Tarefa não encontrada!"
        );

        return;
    }


    let novaPrioridade = prompt(
        "Tarefa: " + tarefa.titulo +
        "\n\n" +
        "Escolha a nova prioridade:" +
        "\n1 - Alta" +
        "\n2 - Média" +
        "\n3 - Baixa"
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
            "Digite somente 1, 2 ou 3!"
        );

        return;
    }


    tarefa.prioridade = prioridade;


    alert(
        "Prioridade alterada!"
    );


    document.getElementById("codigoTarefa").value = "";


    mostrarTarefas();
}


// ==========================================
// INICIAR
// ==========================================

mostrarTarefas();