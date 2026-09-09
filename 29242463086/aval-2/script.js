// ============================================
// GERENCIADOR DE TAREFAS
// ============================================


// ============================================
// ELEMENTOS DO HTML
// ============================================

const formTarefa =
    document.getElementById("formTarefa");

const tituloInput =
    document.getElementById("titulo");

const descricaoInput =
    document.getElementById("descricao");

const prioridadeInput =
    document.getElementById("prioridade");

const dataInput =
    document.getElementById("data");

const listaTarefas =
    document.getElementById("listaTarefas");

const mensagemVazia =
    document.getElementById("mensagemVazia");

const pesquisaInput =
    document.getElementById("pesquisa");


// ============================================
// CARREGAR TAREFAS
// ============================================

let tarefas =
    JSON.parse(
        localStorage.getItem("gerenciadorTarefas")
    ) || [];


// Filtro atual

let filtroAtual = "todas";


// ============================================
// DADOS DE EXEMPLO
// ============================================

if (tarefas.length === 0) {

    tarefas = [

        {
            id: Date.now(),

            titulo: "Fazer trabalho da faculdade",

            descricao:
                "Finalizar o trabalho de programação.",

            prioridade: "Alta",

            data: "2026-09-15",

            concluida: false
        },


        {
            id: Date.now() + 1,

            titulo: "Estudar JavaScript",

            descricao:
                "Estudar funções e arrays.",

            prioridade: "Média",

            data: "2026-09-12",

            concluida: false
        },


        {
            id: Date.now() + 2,

            titulo: "Enviar relatório",

            descricao:
                "Enviar relatório para o professor.",

            prioridade: "Baixa",

            data: "2026-09-10",

            concluida: true
        }

    ];


    salvarTarefas();
}


// ============================================
// SALVAR TAREFAS
// ============================================

function salvarTarefas() {

    localStorage.setItem(
        "gerenciadorTarefas",
        JSON.stringify(tarefas)
    );

}


// ============================================
// FORMATAR DATA
// ============================================

function formatarData(data) {

    if (!data) {

        return "Sem prazo";

    }


    const partes =
        data.split("-");


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// ============================================
// CLASSE DA PRIORIDADE
// ============================================

function classePrioridade(prioridade) {

    if (prioridade === "Alta") {

        return "prioridade-alta";

    }


    if (prioridade === "Média") {

        return "prioridade-media";

    }


    return "prioridade-baixa";

}


// ============================================
// MOSTRAR TAREFAS
// ============================================

function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    // Texto da pesquisa

    const pesquisa =
        pesquisaInput.value
            .toLowerCase()
            .trim();


    // Filtrar tarefas

    let tarefasFiltradas =
        tarefas.filter(function(tarefa) {

            // Filtro de situação

            if (
                filtroAtual === "pendentes" &&
                tarefa.concluida
            ) {

                return false;

            }


            if (
                filtroAtual === "concluidas" &&
                !tarefa.concluida
            ) {

                return false;

            }


            // Filtro de pesquisa

            if (pesquisa !== "") {

                const titulo =
                    tarefa.titulo.toLowerCase();

                const descricao =
                    tarefa.descricao.toLowerCase();

                if (
                    !titulo.includes(pesquisa) &&
                    !descricao.includes(pesquisa)
                ) {

                    return false;

                }

            }


            return true;

        });


    // Verificar lista vazia

    if (tarefasFiltradas.length === 0) {

        mensagemVazia.style.display = "block";

        atualizarResumo();

        return;

    }


    mensagemVazia.style.display = "none";


    // Criar cada tarefa

    tarefasFiltradas.forEach(function(tarefa) {

        const elemento =
            document.createElement("div");


        elemento.classList.add("tarefa");


        if (tarefa.concluida) {

            elemento.classList.add("concluida");

        }


        elemento.innerHTML = `

            <div class="tarefa-conteudo">

                <div
                    class="checkbox ${
                        tarefa.concluida
                            ? "concluida"
                            : ""
                    }"
                    onclick="alternarTarefa(${tarefa.id})"
                >

                    ${
                        tarefa.concluida
                            ? "✓"
                            : ""
                    }

                </div>


                <div class="tarefa-info">

                    <h3>
                        ${tarefa.titulo}
                    </h3>


                    <p>
                        ${tarefa.descricao || "Sem descrição"}
                    </p>


                    <div class="meta">

                        <span
                            class="prioridade ${
                                classePrioridade(
                                    tarefa.prioridade
                                )
                            }"
                        >
                            ${tarefa.prioridade}
                        </span>


                        <span class="data">
                            📅 ${formatarData(tarefa.data)}
                        </span>

                    </div>

                </div>

            </div>


            <div class="acoes">

                <button
                    class="btn-acao btn-concluir"
                    onclick="alternarTarefa(${tarefa.id})"
                    title="Concluir tarefa"
                >
                    ${
                        tarefa.concluida
                            ? "↩"
                            : "✓"
                    }
                </button>


                <button
                    class="btn-acao btn-excluir"
                    onclick="excluirTarefa(${tarefa.id})"
                    title="Excluir tarefa"
                >
                    🗑
                </button>

            </div>

        `;


        listaTarefas.appendChild(elemento);

    });


    atualizarResumo();

}


// ============================================
// ADICIONAR TAREFA
// ============================================

formTarefa.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const titulo =
            tituloInput.value.trim();

        const descricao =
            descricaoInput.value.trim();

        const prioridade =
            prioridadeInput.value;

        const data =
            dataInput.value;


        // ========================================
        // VALIDAÇÃO
        // ========================================

        if (titulo === "") {

            alert(
                "Digite o título da tarefa."
            );

            tituloInput.focus();

            return;

        }


        // ========================================
        // CRIAR TAREFA
        // ========================================

        const novaTarefa = {

            id: Date.now(),

            titulo: titulo,

            descricao: descricao,

            prioridade: prioridade,

            data: data,

            concluida: false

        };


        // Adicionar no início da lista

        tarefas.unshift(novaTarefa);


        // Salvar

        salvarTarefas();


        // Atualizar tela

        mostrarTarefas();


        // Limpar formulário

        formTarefa.reset();


        // Voltar prioridade para Média

        prioridadeInput.value = "Média";


        // Mensagem

        alert(
            "Tarefa adicionada com sucesso!"
        );

    }
);


// ============================================
// CONCLUIR / DESCONCLUIR TAREFA
// ============================================

function alternarTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.id === id
        );


    if (!tarefa) {

        return;

    }


    tarefa.concluida =
        !tarefa.concluida;


    salvarTarefas();


    mostrarTarefas();

}


// ============================================
// EXCLUIR TAREFA
// ============================================

function excluirTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.id === id
        );


    if (!tarefa) {

        return;

    }


    const confirmar =
        confirm(
            `Deseja excluir a tarefa "${tarefa.titulo}"?`
        );


    if (!confirmar) {

        return;

    }


    tarefas =
        tarefas.filter(
            tarefa => tarefa.id !== id
        );


    salvarTarefas();


    mostrarTarefas();

}


// ============================================
// PESQUISA
// ============================================

pesquisaInput.addEventListener(
    "input",
    function() {

        mostrarTarefas();

    }
);


// ============================================
// FILTROS
// ============================================

const botoesFiltro =
    document.querySelectorAll(".filtro");


botoesFiltro.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            // Remover ativo dos outros

            botoesFiltro.forEach(
                function(item) {

                    item.classList.remove(
                        "ativo"
                    );

                }
            );


            // Ativar botão clicado

            botao.classList.add("ativo");


            // Definir filtro

            filtroAtual =
                botao.dataset.filtro;


            // Atualizar lista

            mostrarTarefas();

        }
    );

});


// ============================================
// ATUALIZAR RESUMO
// ============================================

function atualizarResumo() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            tarefa => tarefa.concluida
        ).length;


    const pendentes =
        tarefas.filter(
            tarefa => !tarefa.concluida
        ).length;


    const alta =
        tarefas.filter(
            tarefa =>
                tarefa.prioridade === "Alta" &&
                !tarefa.concluida
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


// ============================================
// INICIAR SISTEMA
// ============================================

mostrarTarefas();
