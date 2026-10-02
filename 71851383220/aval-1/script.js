// ==========================================
// LISTA DE TAREFAS
// ==========================================

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


// ==========================================
// SALVAR NO LOCALSTORAGE
// ==========================================

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}


// ==========================================
// VALIDAR DADOS
// ==========================================

function validarDados(titulo, descricao, data) {

    if (titulo.trim() === "") {

        alert("Digite o título da tarefa!");

        return false;
    }

    if (descricao.trim() === "") {

        alert("Digite a descrição da tarefa!");

        return false;
    }

    if (data === "") {

        alert("Informe a data da tarefa!");

        return false;
    }

    return true;
}


// ==========================================
// CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa() {

    let titulo =
        document.getElementById("titulo").value;

    let descricao =
        document.getElementById("descricao").value;

    let data =
        document.getElementById("data").value;


    // Validar
    if (!validarDados(titulo, descricao, data)) {

        return;
    }


    // Criar tarefa
    let tarefa = {

        id: Date.now(),

        titulo: titulo,

        descricao: descricao,

        data: data,

        concluida: false

    };


    // Adicionar tarefa
    tarefas.push(tarefa);


    // Salvar
    salvarTarefas();


    alert("Tarefa cadastrada com sucesso!");


    // Limpar formulário
    document.getElementById("titulo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("data").value = "";


    listarTarefas();

}


// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas(lista = tarefas) {

    let resultado =
        document.getElementById("resultado");


    resultado.innerHTML = "";


    if (lista.length === 0) {

        resultado.innerHTML =
            "<p>Nenhuma tarefa encontrada.</p>";

        atualizarEstatisticas();

        return;
    }


    lista.forEach(function(tarefa) {

        let div =
            document.createElement("div");


        div.classList.add("tarefa");


        if (tarefa.concluida) {

            div.classList.add("concluida");

        }


        div.innerHTML = `

            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Descrição:</strong>
                ${tarefa.descricao}
            </p>

            <p>
                <strong>Data:</strong>
                ${formatarData(tarefa.data)}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida
                    ? "✅ Concluída"
                    : "⏳ Pendente"}
            </p>

            <div class="botoes">

                ${
                    tarefa.concluida

                    ?

                    `<button
                        class="btn-desfazer"
                        onclick="desfazerTarefa(${tarefa.id})">

                        ↩️ Desfazer

                    </button>`

                    :

                    `<button
                        class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.id})">

                        ✅ Concluir

                    </button>`
                }


                <button
                    class="btn-alterar"
                    onclick="alterarTarefa(${tarefa.id})">

                    ✏️ Alterar

                </button>


                <button
                    class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.id})">

                    🗑️ Excluir

                </button>

            </div>
        `;


        resultado.appendChild(div);

    });


    atualizarEstatisticas();

}


// ==========================================
// FORMATAR DATA
// ==========================================

function formatarData(data) {

    let partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// ==========================================
// BUSCAR TAREFA
// ==========================================

function buscarTarefa() {

    let busca =
        document.getElementById("busca")
        .value
        .toLowerCase()
        .trim();


    let resultado =
        tarefas.filter(function(tarefa) {

            return (

                tarefa.titulo
                    .toLowerCase()
                    .includes(busca)

                ||

                tarefa.descricao
                    .toLowerCase()
                    .includes(busca)

            );

        });


    listarTarefas(resultado);

}


// ==========================================
// FILTRAR TAREFAS
// ==========================================

function filtrarTarefas() {

    let filtro =
        document.getElementById("filtroStatus").value;


    if (filtro === "todas") {

        listarTarefas();

        return;
    }


    if (filtro === "pendentes") {

        let pendentes =
            tarefas.filter(function(tarefa) {

                return !tarefa.concluida;

            });


        listarTarefas(pendentes);

        return;
    }


    if (filtro === "concluidas") {

        let concluidas =
            tarefas.filter(function(tarefa) {

                return tarefa.concluida;

            });


        listarTarefas(concluidas);

    }

}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa(id) {

    let tarefa =
        tarefas.find(function(tarefa) {

            return tarefa.id === id;

        });


    if (!tarefa) {

        alert("Tarefa não encontrada!");

        return;
    }


    tarefa.concluida = true;


    salvarTarefas();


    alert("Tarefa concluída!");


    listarTarefas();

}


// ==========================================
// DESFAZER TAREFA
// ==========================================

function desfazerTarefa(id) {

    let tarefa =
        tarefas.find(function(tarefa) {

            return tarefa.id === id;

        });


    if (!tarefa) {

        alert("Tarefa não encontrada!");

        return;
    }


    tarefa.concluida = false;


    salvarTarefas();


    listarTarefas();

}


// ==========================================
// ALTERAR TAREFA
// ==========================================

function alterarTarefa(id) {

    let tarefa =
        tarefas.find(function(tarefa) {

            return tarefa.id === id;

        });


    if (!tarefa) {

        alert("Tarefa não encontrada!");

        return;
    }


    let novoTitulo =
        prompt(
            "Digite o novo título:",
            tarefa.titulo
        );


    if (novoTitulo === null) {

        return;
    }


    let novaDescricao =
        prompt(
            "Digite a nova descrição:",
            tarefa.descricao
        );


    if (novaDescricao === null) {

        return;
    }


    let novaData =
        prompt(
            "Digite a nova data (AAAA-MM-DD):",
            tarefa.data
        );


    if (novaData === null) {

        return;
    }


    if (
        !validarDados(
            novoTitulo,
            novaDescricao,
            novaData
        )
    ) {

        return;
    }


    tarefa.titulo = novoTitulo;

    tarefa.descricao = novaDescricao;

    tarefa.data = novaData;


    salvarTarefas();


    alert("Tarefa alterada com sucesso!");


    listarTarefas();

}


// ==========================================
// EXCLUIR TAREFA
// ==========================================

function excluirTarefa(id) {

    let confirmar =
        confirm(
            "Tem certeza que deseja excluir esta tarefa?"
        );


    if (!confirmar) {

        return;
    }


    tarefas =
        tarefas.filter(function(tarefa) {

            return tarefa.id !== id;

        });


    salvarTarefas();


    alert("Tarefa excluída!");


    listarTarefas();

}


// ==========================================
// LIMPAR TODAS AS TAREFAS
// ==========================================

function limparTodas() {

    if (tarefas.length === 0) {

        alert("Não existem tarefas para excluir.");

        return;
    }


    let confirmar =
        confirm(
            "ATENÇÃO!\n\nDeseja realmente excluir TODAS as tarefas?"
        );


    if (!confirmar) {

        return;
    }


    tarefas = [];


    salvarTarefas();


    listarTarefas();


    alert("Todas as tarefas foram excluídas!");

}


// ==========================================
// ORDENAR POR DATA
// ==========================================

function ordenarPorData() {

    tarefas.sort(function(a, b) {

        return new Date(a.data) - new Date(b.data);

    });


    salvarTarefas();


    listarTarefas();

}


// ==========================================
// ATUALIZAR ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    let total = tarefas.length;


    let concluidas =
        tarefas.filter(function(tarefa) {

            return tarefa.concluida;

        }).length;


    let pendentes =
        tarefas.filter(function(tarefa) {

            return !tarefa.concluida;

        }).length;


    document.getElementById("total").textContent =
        total;


    document.getElementById("concluidas").textContent =
        concluidas;


    document.getElementById("pendentes").textContent =
        pendentes;

}


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarTarefas();