let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");

/* ADICIONAR TAREFA */

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const tarefa = {

        id: Date.now(),

        titulo:
            document.getElementById("titulo").value,

        responsavel:
            document.getElementById("responsavel").value,

        data:
            document.getElementById("data").value,

        prioridade:
            document.getElementById("prioridade").value,

        status:
            document.getElementById("status").value
    };

    tarefas.push(tarefa);

    salvar();

    form.reset();

    mostrarTarefas();
});


/* SALVAR */

function salvar() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


/* MOSTRAR TAREFAS */

function mostrarTarefas() {

    lista.innerHTML = "";

    const termo =
        pesquisa.value.toLowerCase();

    const filtradas = tarefas.filter(tarefa =>

        tarefa.titulo
            .toLowerCase()
            .includes(termo)

        ||

        tarefa.responsavel
            .toLowerCase()
            .includes(termo)

    );

    filtradas.forEach(tarefa => {

        let classePrioridade =
            tarefa.prioridade
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        let classeStatus =
            tarefa.status
                .toLowerCase()
                .replace(" ", "-")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        const linha =
            document.createElement("tr");

        linha.innerHTML = `

            <td>
                <strong>
                    ${tarefa.titulo}
                </strong>
            </td>

            <td>
                ${tarefa.responsavel}
            </td>

            <td>
                ${formatarData(tarefa.data)}
            </td>

            <td>
                <span class="prioridade ${classePrioridade}">
                    ${tarefa.prioridade}
                </span>
            </td>

            <td>
                <span class="status ${classeStatus}">
                    ${tarefa.status}
                </span>
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="editar"
                        onclick="editar(${tarefa.id})">
                        ✏️
                    </button>

                    <button
                        class="excluir"
                        onclick="excluir(${tarefa.id})">
                        🗑️
                    </button>

                </div>

            </td>
        `;

        lista.appendChild(linha);

    });

    atualizarDashboard();
}


/* EDITAR */

function editar(id) {

    const tarefa =
        tarefas.find(t => t.id === id);

    if (!tarefa) return;

    const novoTitulo =
        prompt(
            "Nome da tarefa:",
            tarefa.titulo
        );

    if (novoTitulo === null) return;

    const novoResponsavel =
        prompt(
            "Responsável:",
            tarefa.responsavel
        );

    if (novoResponsavel === null) return;

    const novoStatus =
        prompt(
            "Status:\nPendente\nEm andamento\nConcluído",
            tarefa.status
        );

    if (novoStatus === null) return;

    tarefa.titulo = novoTitulo;
    tarefa.responsavel = novoResponsavel;
    tarefa.status = novoStatus;

    salvar();

    mostrarTarefas();
}


/* EXCLUIR */

function excluir(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta tarefa?"
        );

    if (!confirmar) return;

    tarefas =
        tarefas.filter(
            tarefa => tarefa.id !== id
        );

    salvar();

    mostrarTarefas();
}


/* DASHBOARD */

function atualizarDashboard() {

    document.getElementById(
        "totalTarefas"
    ).textContent = tarefas.length;

    document.getElementById(
        "pendentes"
    ).textContent =
        tarefas.filter(
            t => t.status === "Pendente"
        ).length;

    document.getElementById(
        "andamento"
    ).textContent =
        tarefas.filter(
            t => t.status === "Em andamento"
        ).length;

    document.getElementById(
        "concluidas"
    ).textContent =
        tarefas.filter(
            t => t.status === "Concluído"
        ).length;
}


/* DATA */

function formatarData(data) {

    if (!data) return "";

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


/* PESQUISA */

pesquisa.addEventListener(
    "input",
    mostrarTarefas
);


/* INICIAR */

mostrarTarefas();