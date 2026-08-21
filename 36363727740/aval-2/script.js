let tarefas =
    JSON.parse(localStorage.getItem("tarefas")) || [];


/* ==========================
   MODAL
========================== */

function abrirModal(id = null) {

    const modal =
        document.getElementById("modal");

    modal.classList.remove("escondido");


    if (id !== null) {

        const tarefa =
            tarefas.find(t => t.id === id);

        if (!tarefa) return;


        document.getElementById(
            "tituloModal"
        ).textContent = "Editar Tarefa";


        document.getElementById(
            "tarefaId"
        ).value = tarefa.id;


        document.getElementById(
            "titulo"
        ).value = tarefa.titulo;


        document.getElementById(
            "descricao"
        ).value = tarefa.descricao;


        document.getElementById(
            "prioridade"
        ).value = tarefa.prioridade;


        document.getElementById(
            "data"
        ).value = tarefa.data;

    } else {

        document.getElementById(
            "tituloModal"
        ).textContent = "Nova Tarefa";


        document.getElementById(
            "formTarefa"
        ).reset();


        document.getElementById(
            "tarefaId"
        ).value = "";
    }
}


function fecharModal() {

    document.getElementById(
        "modal"
    ).classList.add("escondido");
}


/* ==========================
   SALVAR TAREFA
========================== */

document
    .getElementById("formTarefa")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const id =
                document.getElementById(
                    "tarefaId"
                ).value;


            const titulo =
                document.getElementById(
                    "titulo"
                ).value.trim();


            const descricao =
                document.getElementById(
                    "descricao"
                ).value.trim();


            const prioridade =
                document.getElementById(
                    "prioridade"
                ).value;


            const data =
                document.getElementById(
                    "data"
                ).value;


            if (id) {

                const tarefa =
                    tarefas.find(
                        t => t.id == id
                    );


                tarefa.titulo = titulo;

                tarefa.descricao = descricao;

                tarefa.prioridade = prioridade;

                tarefa.data = data;

            } else {

                const novaTarefa = {

                    id: Date.now(),

                    titulo: titulo,

                    descricao: descricao,

                    prioridade: prioridade,

                    data: data,

                    concluida: false,

                    criadaEm:
                        new Date().toISOString()
                };


                tarefas.push(novaTarefa);
            }


            salvar();

            fecharModal();

            atualizar();
        }
    );


/* ==========================
   LISTAR TAREFAS
========================== */

function listarTarefas() {

    const lista =
        document.getElementById(
            "listaTarefas"
        );


    const pesquisa =
        document.getElementById(
            "pesquisa"
        ).value.toLowerCase();


    const filtroStatus =
        document.getElementById(
            "filtroStatus"
        ).value;


    const filtroPrioridade =
        document.getElementById(
            "filtroPrioridade"
        ).value;


    let resultado =
        tarefas.filter(tarefa => {

            const correspondePesquisa =
                tarefa.titulo
                    .toLowerCase()
                    .includes(pesquisa) ||

                tarefa.descricao
                    .toLowerCase()
                    .includes(pesquisa);


            let correspondeStatus = true;


            if (
                filtroStatus ===
                "pendentes"
            ) {

                correspondeStatus =
                    !tarefa.concluida;
            }


            if (
                filtroStatus ===
                "concluidas"
            ) {

                correspondeStatus =
                    tarefa.concluida;
            }


            let correspondePrioridade =
                true;


            if (
                filtroPrioridade !==
                "todas"
            ) {

                correspondePrioridade =
                    tarefa.prioridade ===
                    filtroPrioridade;
            }


            return (
                correspondePesquisa &&
                correspondeStatus &&
                correspondePrioridade
            );
        });


    lista.innerHTML = "";


    if (resultado.length === 0) {

        lista.innerHTML = `
            <div class="vazio">

                <span>📋</span>

                <h3>Nenhuma tarefa encontrada</h3>

                <p>
                    Cadastre uma nova tarefa
                    para começar.
                </p>

            </div>
        `;

        return;
    }


    /* Mais recentes primeiro */

    resultado.sort(
        (a, b) => b.id - a.id
    );


    resultado.forEach(tarefa => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "tarefa" +
            (
                tarefa.concluida
                    ? " concluida"
                    : ""
            );


        const prioridadeTexto = {

            alta: "Alta",

            media: "Média",

            baixa: "Baixa"

        };


        let dataFormatada = "";


        if (tarefa.data) {

            const partes =
                tarefa.data.split("-");


            dataFormatada =
                `${partes[2]}/${partes[1]}/${partes[0]}`;
        }


        elemento.innerHTML = `

            <div class="tarefa-info">

                <input
                    type="checkbox"
                    class="check"
                    ${tarefa.concluida ? "checked" : ""}
                    onchange="alternarTarefa(${tarefa.id})"
                >

                <div>

                    <div
                        class="prioridade ${tarefa.prioridade}"
                    >
                        ${prioridadeTexto[tarefa.prioridade]}
                    </div>


                    <div class="tarefa-titulo">
                        ${escaparHTML(tarefa.titulo)}
                    </div>


                    ${
                        tarefa.descricao
                        ?
                        `
                        <div class="tarefa-descricao">
                            ${escaparHTML(tarefa.descricao)}
                        </div>
                        `
                        :
                        ""
                    }


                    ${
                        dataFormatada
                        ?
                        `
                        <div class="tarefa-data">
                            📅 ${dataFormatada}
                        </div>
                        `
                        :
                        ""
                    }

                </div>

            </div>


            <div class="acoes">

                <button
                    class="btn-edit"
                    onclick="abrirModal(${tarefa.id})"
                >
                    ✏️
                </button>


                <button
                    class="btn-delete"
                    onclick="excluirTarefa(${tarefa.id})"
                >
                    🗑️
                </button>

            </div>

        `;


        lista.appendChild(elemento);
    });
}


/* ==========================
   CONCLUIR TAREFA
========================== */

function alternarTarefa(id) {

    const tarefa =
        tarefas.find(
            t => t.id === id
        );


    if (!tarefa) return;


    tarefa.concluida =
        !tarefa.concluida;


    salvar();

    atualizar();
}


/* ==========================
   EXCLUIR
========================== */

function excluirTarefa(id) {

    const tarefa =
        tarefas.find(
            t => t.id === id
        );


    if (!tarefa) return;


    const confirmar =
        confirm(
            `Deseja excluir a tarefa "${tarefa.titulo}"?`
        );


    if (!confirmar) return;


    tarefas =
        tarefas.filter(
            t => t.id !== id
        );


    salvar();

    atualizar();
}


/* ==========================
   DASHBOARD
========================== */

function atualizarDashboard() {

    const total =
        tarefas.length;


    const pendentes =
        tarefas.filter(
            t => !t.concluida
        ).length;


    const concluidas =
        tarefas.filter(
            t => t.concluida
        ).length;


    const alta =
        tarefas.filter(
            t =>
                t.prioridade === "alta" &&
                !t.concluida
        ).length;


    document.getElementById(
        "totalTarefas"
    ).textContent = total;


    document.getElementById(
        "tarefasPendentes"
    ).textContent = pendentes;


    document.getElementById(
        "tarefasConcluidas"
    ).textContent = concluidas;


    document.getElementById(
        "tarefasAlta"
    ).textContent = alta;
}


/* ==========================
   LOCAL STORAGE
========================== */

function salvar() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


/* ==========================
   SEGURANÇA
========================== */

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


/* ==========================
   ATUALIZAR SISTEMA
========================== */

function atualizar() {

    listarTarefas();

    atualizarDashboard();
}


/* ==========================
   INICIALIZAÇÃO
========================== */

atualizar();
