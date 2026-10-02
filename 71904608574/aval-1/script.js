let tarefas = [];
let proximoId = 1;

// VALIDAR DADOS
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

// CADASTRAR OU ALTERAR
function cadastrarOuAlterar() {

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const data = document.getElementById("data").value;
    const id = document.getElementById("idTarefa").value;

    if (!validarDados(titulo, descricao, data)) {
        return;
    }

    // ALTERAR
    if (id !== "") {

        const tarefa = tarefas.find(t => t.id == id);

        tarefa.titulo = titulo;
        tarefa.descricao = descricao;
        tarefa.data = data;

        alert("Tarefa alterada com sucesso!");

    } else {

        // CADASTRAR
        const novaTarefa = {
            id: proximoId++,
            titulo: titulo,
            descricao: descricao,
            data: data,
            concluida: false
        };

        tarefas.push(novaTarefa);

        alert("Tarefa cadastrada com sucesso!");
    }

    limparFormulario();
    listarTarefas();
}

// LISTAR TAREFAS
function listarTarefas(lista = tarefas) {

    const area = document.getElementById("listaTarefas");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
        return;
    }

    lista.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Descrição:</strong> ${tarefa.descricao}</p>

            <p><strong>Data:</strong> ${tarefa.data}</p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída ✅" : "Pendente ⏳"}
            </p>

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

        area.appendChild(div);
    });
}

// BUSCAR TAREFAS
function buscarTarefas() {

    const texto = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    const resultado = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(texto) ||
        tarefa.descricao.toLowerCase().includes(texto)
    );

    listarTarefas(resultado);
}

// CONCLUIR TAREFA
function concluirTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {

        tarefa.concluida = !tarefa.concluida;

        listarTarefas();
    }
}

// ALTERAR TAREFA
function alterarTarefa(id) {

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return;
    }

    document.getElementById("idTarefa").value = tarefa.id;
    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("descricao").value = tarefa.descricao;
    document.getElementById("data").value = tarefa.data;

    document.querySelector(".formulario button").textContent =
        "Salvar Alteração";
}

// EXCLUIR TAREFA
function excluirTarefa(id) {

    const confirmar = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    listarTarefas();
}

// LIMPAR FORMULÁRIO
function limparFormulario() {

    document.getElementById("idTarefa").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data").value = "";

    document.querySelector(".formulario button").textContent =
        "Cadastrar Tarefa";
}

// INICIAR SISTEMA
listarTarefas();