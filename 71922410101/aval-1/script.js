const formulario = document.getElementById("tarefaForm");

const nomeTarefa = document.getElementById("nomeTarefa");

const dataTarefa = document.getElementById("dataTarefa");

const campoBusca = document.getElementById("campoBusca");

const lista = document.getElementById("tarefas");


let listaTarefas =
    JSON.parse(localStorage.getItem("minhasTarefas")) || [];


// ==================================
// CADASTRAR
// ==================================

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = nomeTarefa.value.trim();

    const data = dataTarefa.value;


    if (nome.length < 3) {

        alert("Digite uma tarefa com pelo menos 3 caracteres.");

        return;
    }


    if (data === "") {

        alert("Escolha uma data.");

        return;
    }


    if (!dataValida(data)) {

        alert("A data não pode ser anterior ao dia atual.");

        return;
    }


    const novaTarefa = {

        id: Date.now(),

        nome: nome,

        data: data,

        concluida: false

    };


    listaTarefas.push(novaTarefa);


    salvar();


    formulario.reset();


    mostrarTarefas();

});


// ==================================
// MOSTRAR TAREFAS
// ==================================

function mostrarTarefas() {

    const pesquisa = campoBusca.value
        .toLowerCase()
        .trim();


    lista.innerHTML = "";


    const resultado = listaTarefas.filter(function (tarefa) {

        return tarefa.nome
            .toLowerCase()
            .includes(pesquisa);

    });


    if (resultado.length === 0) {

        lista.innerHTML = `
            <div class="vazia">
                Nenhuma tarefa encontrada.
            </div>
        `;

        return;
    }


    resultado.forEach(function (tarefa) {

        const elemento = document.createElement("div");


        elemento.className = "tarefa";


        if (tarefa.concluida) {

            elemento.classList.add("concluida");

        }


        elemento.innerHTML = `

            <div class="titulo">
                ${tarefa.nome}
            </div>

            <div class="data">
                📅 ${formatarData(tarefa.data)}
            </div>

            <div class="status">
                Status:
                ${tarefa.concluida
                    ? "Concluída ✅"
                    : "Pendente ⏳"}
            </div>

            <div class="botoes">

                <button
                    class="concluir"
                    onclick="concluir(${tarefa.id})">

                    ${tarefa.concluida
                        ? "Desmarcar"
                        : "Concluir"}

                </button>


                <button
                    class="editar"
                    onclick="editar(${tarefa.id})">

                    Editar

                </button>


                <button
                    class="excluir"
                    onclick="excluir(${tarefa.id})">

                    Excluir

                </button>

            </div>
        `;


        lista.appendChild(elemento);

    });

}


// ==================================
// BUSCAR
// ==================================

campoBusca.addEventListener("input", function () {

    mostrarTarefas();

});


// ==================================
// CONCLUIR
// ==================================

function concluir(id) {

    const tarefa = listaTarefas.find(function (item) {

        return item.id === id;

    });


    if (!tarefa) {

        return;

    }


    tarefa.concluida = !tarefa.concluida;


    salvar();

    mostrarTarefas();

}


// ==================================
// EDITAR
// ==================================

function editar(id) {

    const tarefa = listaTarefas.find(function (item) {

        return item.id === id;

    });


    if (!tarefa) {

        return;

    }


    const novoNome = prompt(
        "Digite o novo nome da tarefa:",
        tarefa.nome
    );


    if (novoNome === null) {

        return;

    }


    if (novoNome.trim().length < 3) {

        alert("O nome deve possuir pelo menos 3 caracteres.");

        return;

    }


    const novaData = prompt(
        "Digite a nova data (AAAA-MM-DD):",
        tarefa.data
    );


    if (novaData === null) {

        return;

    }


    if (!dataValida(novaData)) {

        alert("Data inválida ou anterior ao dia atual.");

        return;

    }


    tarefa.nome = novoNome.trim();

    tarefa.data = novaData;


    salvar();

    mostrarTarefas();

}


// ==================================
// EXCLUIR
// ==================================

function excluir(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );


    if (!confirmar) {

        return;

    }


    listaTarefas = listaTarefas.filter(function (tarefa) {

        return tarefa.id !== id;

    });


    salvar();

    mostrarTarefas();

}


// ==================================
// VALIDAR DATA
// ==================================

function dataValida(data) {

    const selecionada =
        new Date(data + "T00:00:00");


    if (isNaN(selecionada.getTime())) {

        return false;

    }


    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);


    return selecionada >= hoje;

}


// ==================================
// FORMATAR DATA
// ==================================

function formatarData(data) {

    const partes = data.split("-");


    return (
        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]
    );

}


// ==================================
// SALVAR
// ==================================

function salvar() {

    localStorage.setItem(
        "minhasTarefas",
        JSON.stringify(listaTarefas)
    );

}


// ==================================
// INICIAR SISTEMA
// ==================================

mostrarTarefas();
