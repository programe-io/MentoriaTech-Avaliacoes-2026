// Lista onde as tarefas serão armazenadas
let tarefas = [];

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
// CADASTRAR / ALTERAR TAREFA
// ==========================================

function salvarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const data = document.getElementById("data").value;
    const indice = document.getElementById("indice").value;

    // Validação
    if (!validarDados(titulo, descricao, data)) {
        return;
    }

    // Se tiver índice, significa que estamos alterando
    if (indice !== "") {

        tarefas[indice].titulo = titulo;
        tarefas[indice].descricao = descricao;
        tarefas[indice].data = data;

        alert("Tarefa alterada com sucesso!");

    } else {

        // Criando nova tarefa
        const novaTarefa = {
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

// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas(lista = tarefas) {

    const area = document.getElementById("listaTarefas");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = `
            <div class="vazio">
                Nenhuma tarefa encontrada.
            </div>
        `;
        return;
    }

    lista.forEach((tarefa) => {

        const indice = tarefas.indexOf(tarefa);

        const div = document.createElement("div");

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
                ${tarefa.concluida ? "Concluída ✅" : "Pendente ⏳"}
            </p>

            <div class="botoes">

                <button 
                    class="btn-concluir"
                    onclick="concluirTarefa(${indice})">
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button 
                    class="btn-alterar"
                    onclick="alterarTarefa(${indice})">
                    Alterar
                </button>

                <button 
                    class="btn-excluir"
                    onclick="excluirTarefa(${indice})">
                    Excluir
                </button>

            </div>
        `;

        area.appendChild(div);
    });
}

// ==========================================
// BUSCAR TAREFA
// ==========================================

function buscarTarefa() {

    const texto = document
        .getElementById("campoBusca")
        .value
        .toLowerCase();

    const resultado = tarefas.filter(tarefa =>

        tarefa.titulo.toLowerCase().includes(texto) ||

        tarefa.descricao.toLowerCase().includes(texto)
    );

    listarTarefas(resultado);
}

// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa(indice) {

    tarefas[indice].concluida = !tarefas[indice].concluida;

    listarTarefas();

    if (tarefas[indice].concluida) {
        alert("Tarefa concluída!");
    } else {
        alert("Tarefa reaberta!");
    }
}

// ==========================================
// ALTERAR TAREFA
// ==========================================

function alterarTarefa(indice) {

    const tarefa = tarefas[indice];

    document.getElementById("titulo").value = tarefa.titulo;

    document.getElementById("descricao").value = tarefa.descricao;

    document.getElementById("data").value = tarefa.data;

    document.getElementById("indice").value = indice;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==========================================
// EXCLUIR TAREFA
// ==========================================

function excluirTarefa(indice) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }

    tarefas.splice(indice, 1);

    listarTarefas();

    alert("Tarefa excluída!");
}

// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    document.getElementById("titulo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("data").value = "";

    document.getElementById("indice").value = "";
}

// ==========================================
// FORMATAR DATA
// ==========================================

function formatarData(data) {

    const partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// ==========================================
// INICIAR SISTEMA
// ==========================================

listarTarefas();