let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


// ================================
// VALIDAR DADOS DA TAREFA
// ================================
function validarDados(titulo, descricao, prioridade, data) {

    if (titulo.trim() === "") {
        return "O título da tarefa é obrigatório.";
    }

    if (titulo.length < 3) {
        return "O título deve ter pelo menos 3 caracteres.";
    }

    if (descricao.trim() === "") {
        return "A descrição da tarefa é obrigatória.";
    }

    if (prioridade === "") {
        return "Selecione uma prioridade.";
    }

    if (data === "") {
        return "Informe a data da tarefa.";
    }

    return "";
}


// ================================
// SALVAR TAREFA
// CADASTRAR OU ALTERAR
// ================================
function salvarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;
    const data = document.getElementById("data").value;
    const indice = document.getElementById("indiceTarefa").value;

    const erro = validarDados(
        titulo,
        descricao,
        prioridade,
        data
    );

    if (erro !== "") {
        mostrarMensagem(erro, "red");
        return;
    }

    const tarefa = {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        prioridade: prioridade,
        data: data,
        concluida: false
    };

    // ALTERAR
    if (indice !== "") {

        const indiceNumero = Number(indice);

        tarefa.concluida = tarefas[indiceNumero].concluida;

        tarefas[indiceNumero] = tarefa;

        mostrarMensagem(
            "Tarefa alterada com sucesso!",
            "green"
        );

    } 
    
    // CADASTRAR
    else {

        tarefas.push(tarefa);

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "green"
        );
    }

    salvarLocalStorage();
    limparFormulario();
    listarTarefas();
}


// ================================
// LISTAR TAREFAS
// ================================
function listarTarefas(lista = tarefas) {

    const listaTarefas =
        document.getElementById("listaTarefas");

    listaTarefas.innerHTML = "";

    if (lista.length === 0) {

        listaTarefas.innerHTML =
            "<p>Nenhuma tarefa encontrada.</p>";

        return;
    }

    lista.forEach((tarefa, indice) => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>
                ${tarefa.titulo}
            </h3>

            <p>
                <strong>Descrição:</strong>
                ${tarefa.descricao}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade}
            </p>

            <p>
                <strong>Data:</strong>
                ${formatarData(tarefa.data)}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                ${
                    !tarefa.concluida
                    ?
                    `<button 
                        class="btn-concluir"
                        onclick="concluirTarefa(${indice})">
                        Concluir
                    </button>`
                    :
                    ""
                }

                <button 
                    class="btn-alterar"
                    onclick="prepararAlteracao(${indice})">
                    Alterar
                </button>

                <button 
                    class="btn-excluir"
                    onclick="excluirTarefa(${indice})">
                    Excluir
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}


// ================================
// BUSCAR TAREFA
// ================================
function buscarTarefa() {

    const texto =
        document.getElementById("buscar")
        .value
        .toLowerCase();

    const resultado = tarefas.filter(tarefa => {

        return (
            tarefa.titulo
                .toLowerCase()
                .includes(texto)
            ||
            tarefa.descricao
                .toLowerCase()
                .includes(texto)
        );

    });

    listarTarefas(resultado);
}


// ================================
// CONCLUIR TAREFA
// ================================
function concluirTarefa(indice) {

    tarefas[indice].concluida = true;

    salvarLocalStorage();

    listarTarefas();

    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "green"
    );
}


// ================================
// PREPARAR ALTERAÇÃO
// ================================
function prepararAlteracao(indice) {

    const tarefa = tarefas[indice];

    document.getElementById("titulo").value =
        tarefa.titulo;

    document.getElementById("descricao").value =
        tarefa.descricao;

    document.getElementById("prioridade").value =
        tarefa.prioridade;

    document.getElementById("data").value =
        tarefa.data;

    document.getElementById("indiceTarefa").value =
        indice;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ================================
// EXCLUIR TAREFA
// ================================
function excluirTarefa(indice) {

    const confirmar =
        confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmar) {
        return;
    }

    tarefas.splice(indice, 1);

    salvarLocalStorage();

    listarTarefas();

    mostrarMensagem(
        "Tarefa excluída com sucesso!",
        "green"
    );
}


// ================================
// LIMPAR FORMULÁRIO
// ================================
function limparFormulario() {

    document.getElementById("titulo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("prioridade").value = "";

    document.getElementById("data").value = "";

    document.getElementById("indiceTarefa").value = "";
}


// ================================
// SALVAR NO LOCALSTORAGE
// ================================
function salvarLocalStorage() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


// ================================
// MENSAGEM
// ================================
function mostrarMensagem(texto, cor) {

    const mensagem =
        document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;

    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}


// ================================
// FORMATAR DATA
// ================================
function formatarData(data) {

    if (!data) {
        return "";
    }

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ================================
// INICIAR SISTEMA
// ================================
listarTarefas();