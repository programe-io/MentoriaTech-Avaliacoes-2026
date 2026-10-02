const formTarefa = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const dataInput = document.getElementById("data");
const buscarInput = document.getElementById("buscar");
const listaTarefas = document.getElementById("listaTarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


// ===============================
// CADASTRAR TAREFA
// ===============================

formTarefa.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = tituloInput.value.trim();
    const data = dataInput.value;

    // Validar título
    if (titulo === "") {
        alert("Digite o nome da tarefa.");
        return;
    }

    // Validar data
    if (!data) {
        alert("Informe a data da tarefa.");
        return;
    }

    const dataSelecionada = new Date(data + "T00:00:00");
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
        alert("A data da tarefa não pode ser anterior a hoje.");
        return;
    }

    // Criar tarefa
    const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        data: data,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    formTarefa.reset();

    mostrarTarefas();
});


// ===============================
// SALVAR NO LOCAL STORAGE
// ===============================

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


// ===============================
// MOSTRAR TAREFAS
// ===============================

function mostrarTarefas(filtro = "") {

    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter(function (tarefa) {

        return tarefa.titulo
            .toLowerCase()
            .includes(filtro.toLowerCase());

    });

    if (tarefasFiltradas.length === 0) {

        listaTarefas.innerHTML = `
            <p class="mensagem">
                Nenhuma tarefa encontrada.
            </p>
        `;

        return;
    }

    tarefasFiltradas.forEach(function (tarefa) {

        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <div class="info-tarefa">

                <h3>${tarefa.titulo}</h3>

                <p>
                    Data:
                    ${formatarData(tarefa.data)}
                </p>

                <p>
                    Status:
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </p>

            </div>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.id})">
                    ${tarefa.concluida ? "Desfazer" : "Concluir"}
                </button>

                <button
                    class="btn-alterar"
                    onclick="alterarTarefa(${tarefa.id})">
                    Alterar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.id})">
                    Excluir
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}


// ===============================
// BUSCAR TAREFAS
// ===============================

buscarInput.addEventListener("input", function () {

    const texto = buscarInput.value;

    mostrarTarefas(texto);

});


// ===============================
// CONCLUIR TAREFA
// ===============================

function concluirTarefa(id) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    salvarTarefas();

    mostrarTarefas(buscarInput.value);
}


// ===============================
// ALTERAR TAREFA
// ===============================

function alterarTarefa(id) {

    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === id;
    });

    if (!tarefa) {
        return;
    }

    const novoTitulo = prompt(
        "Digite o novo nome da tarefa:",
        tarefa.titulo
    );

    if (novoTitulo === null) {
        return;
    }

    if (novoTitulo.trim() === "") {
        alert("O nome da tarefa não pode ficar vazio.");
        return;
    }

    const novaData = prompt(
        "Digite a nova data no formato AAAA-MM-DD:",
        tarefa.data
    );

    if (novaData === null) {
        return;
    }

    if (!validarData(novaData)) {
        alert("Data inválida ou anterior a hoje.");
        return;
    }

    tarefa.titulo = novoTitulo.trim();
    tarefa.data = novaData;

    salvarTarefas();

    mostrarTarefas(buscarInput.value);
}


// ===============================
// EXCLUIR TAREFA
// ===============================

function excluirTarefa(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(function (tarefa) {
        return tarefa.id !== id;
    });

    salvarTarefas();

    mostrarTarefas(buscarInput.value);
}


// ===============================
// VALIDAR DATA
// ===============================

function validarData(data) {

    if (!data) {
        return false;
    }

    const dataSelecionada = new Date(data + "T00:00:00");

    if (isNaN(dataSelecionada.getTime())) {
        return false;
    }

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
        return false;
    }

    return true;
}


// ===============================
// FORMATAR DATA
// ===============================

function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ===============================
// CARREGAR TAREFAS
// ===============================

mostrarTarefas();
