let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let proximoCodigo =
    Number(localStorage.getItem("proximoCodigo")) || 1;


// Salvar os dados
function salvarDados() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    localStorage.setItem(
        "proximoCodigo",
        proximoCodigo
    );
}


// Cadastrar tarefa
function cadastrar() {

    const campoTitulo =
        document.getElementById("titulo");

    const titulo =
        campoTitulo.value.trim();

    const prioridade =
        Number(
            document.getElementById("prioridade").value
        );


    // Verificar tamanho do título
    if (titulo.length < 5) {

        alert(
            "O título deve ter no mínimo 5 caracteres."
        );

        campoTitulo.focus();

        return;
    }


    // Verificar prioridade
    if (prioridade < 1 || prioridade > 3) {

        alert(
            "A prioridade deve ser entre 1 e 3."
        );

        return;
    }


    // Criar tarefa
    const tarefa = {

        codigo: proximoCodigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false
    };


    tarefas.push(tarefa);

    proximoCodigo++;


    salvarDados();


    campoTitulo.value = "";

    document.getElementById("prioridade").value = "1";


    listarTarefas();
}


// Listar tarefas
function listarTarefas() {

    const lista =
        document.getElementById("lista");

    const busca =
        document
            .getElementById("busca")
            .value
            .toLowerCase()
            .trim();

    const filtro =
        document.getElementById("filtro").value;


    lista.innerHTML = "";


    // Filtrar tarefas
    const resultado =
        tarefas.filter(function(tarefa) {

            const encontrou =
                tarefa.titulo
                    .toLowerCase()
                    .includes(busca);


            if (!encontrou) {
                return false;
            }


            if (
                filtro === "pendentes"
                && tarefa.concluida
            ) {
                return false;
            }


            if (
                filtro === "concluidas"
                && !tarefa.concluida
            ) {
                return false;
            }


            return true;
        });


    // Nenhuma tarefa encontrada
    if (resultado.length === 0) {

        lista.innerHTML =
            '<div class="vazio">' +
            'Nenhuma tarefa encontrada.' +
            '</div>';

        atualizarResumo();

        return;
    }


    // Mostrar cada tarefa
    resultado.forEach(function(tarefa) {

        let nomePrioridade;
        let classePrioridade;


        if (tarefa.prioridade === 1) {

            nomePrioridade = "Alta";
            classePrioridade = "alta";

        } else if (tarefa.prioridade === 2) {

            nomePrioridade = "Média";
            classePrioridade = "media";

        } else {

            nomePrioridade = "Baixa";
            classePrioridade = "baixa";
        }


        const div =
            document.createElement("div");


        div.className = "tarefa";


        if (tarefa.concluida) {

            div.classList.add("concluida");
        }


        div.innerHTML = `

            <div class="informacoes">

                <div class="codigo">
                    Código: ${tarefa.codigo}
                </div>

                <h3>
                    ${tarefa.titulo}
                </h3>

                <span class="prioridade ${classePrioridade}">
                    Prioridade: ${nomePrioridade}
                </span>

                <div class="status">
                    ${
                        tarefa.concluida
                        ? "✅ Tarefa concluída"
                        : "⏳ Tarefa pendente"
                    }
                </div>

            </div>


            <div class="acoes">

                ${
                    !tarefa.concluida
                    ?
                    `<button
                        class="concluir"
                        onclick="concluir(${tarefa.codigo})">
                        ✔ Concluir
                    </button>`
                    :
                    ""
                }


                <button
                    class="alterar"
                    onclick="alterar(${tarefa.codigo})">

                    🔄 Alterar prioridade

                </button>


                <button
                    class="excluir"
                    onclick="excluir(${tarefa.codigo})">

                    🗑 Excluir

                </button>

            </div>
        `;


        lista.appendChild(div);
    });


    atualizarResumo();
}


// Marcar como concluída
function concluir(codigo) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.codigo === codigo
        );


    if (!tarefa) {
        return;
    }


    tarefa.concluida = true;


    salvarDados();

    listarTarefas();
}


// Alterar prioridade
function alterar(codigo) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.codigo === codigo
        );


    if (!tarefa) {
        return;
    }


    const nova =
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );


    if (nova === null) {
        return;
    }


    const valor = Number(nova);


    if (
        !Number.isInteger(valor) ||
        valor < 1 ||
        valor > 3
    ) {

        alert(
            "Digite apenas 1, 2 ou 3."
        );

        return;
    }


    tarefa.prioridade = valor;


    salvarDados();

    listarTarefas();
}


// Excluir tarefa
function excluir(codigo) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.codigo === codigo
        );


    if (!tarefa) {
        return;
    }


    const confirmar =
        confirm(
            "Deseja excluir a tarefa \"" +
            tarefa.titulo +
            "\"?"
        );


    if (!confirmar) {
        return;
    }


    tarefas =
        tarefas.filter(
            tarefa => tarefa.codigo !== codigo
        );


    salvarDados();

    listarTarefas();
}


// Atualizar números do resumo
function atualizarResumo() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            tarefa => tarefa.concluida
        ).length;


    const pendentes =
        total - concluidas;


    document.getElementById("total")
        .textContent = total;


    document.getElementById("pendentes")
        .textContent = pendentes;


    document.getElementById("concluidas")
        .textContent = concluidas;
}


// Pesquisa
document
    .getElementById("busca")
    .addEventListener(
        "input",
        listarTarefas
    );


// Filtro
document
    .getElementById("filtro")
    .addEventListener(
        "change",
        listarTarefas
    );


// Mostrar tarefas ao abrir o site
listarTarefas();