
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtro");

let editando = null;

// Salvar tarefas no navegador
function salvarDados() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}

// Atualizar indicadores e lista
function atualizarSistema() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("concluidas").textContent =
        concluidas;

    document.getElementById("pendentes").textContent =
        pendentes;

    lista.innerHTML = "";

    let termo = pesquisa.value.toLowerCase();

    let status = filtro.value;

    let resultado = tarefas.filter(tarefa => {

        const combinaPesquisa =
            tarefa.titulo.toLowerCase().includes(termo);

        const combinaFiltro =
            status === "Todas" ||
            (status === "Pendentes" && !tarefa.concluida) ||
            (status === "Concluídas" && tarefa.concluida);

        return combinaPesquisa && combinaFiltro;

    });

    if (resultado.length === 0) {

        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa encontrada.</p>';

        return;

    }

    resultado.forEach(tarefa => {

        const index = tarefas.indexOf(tarefa);

        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (tarefa.concluida) {
            elemento.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent =
            tarefa.descricao || "Sem descrição";

        const data = document.createElement("p");
        data.textContent = "📅 Prazo: " + tarefa.data;

        const prioridade = document.createElement("span");

        prioridade.className = "prioridade " +
            tarefa.prioridade.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade;

        const situacao = document.createElement("p");

        situacao.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");

        concluir.className = "btn-concluir";

        concluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        concluir.onclick = () => concluirTarefa(index);

        const editar = document.createElement("button");

        editar.className = "btn-editar";
        editar.textContent = "Editar";

        editar.onclick = () => editarTarefa(index);

        const excluir = document.createElement("button");

        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";

        excluir.onclick = () => excluirTarefa(index);

        acoes.append(concluir, editar, excluir);

        elemento.append(
            titulo,
            descricao,
            data,
            prioridade,
            situacao,
            acoes
        );

        lista.appendChild(elemento);

    });

}

// Cadastrar ou atualizar tarefa
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo")
        .value.trim();

    const descricao = document.getElementById("descricao")
        .value.trim();

    const data = document.getElementById("data").value;

    const prioridade =
        document.getElementById("prioridade").value;

    if (!titulo || !data) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    if (editando !== null) {

        tarefas[editando] = {
            ...tarefas[editando],
            titulo,
            descricao,
            data,
            prioridade
        };

        editando = null;

    } else {

        tarefas.push({
            titulo,
            descricao,
            data,
            prioridade,
            concluida: false
        });

    }

    salvarDados();

    atualizarSistema();

    form.reset();

});

// Concluir ou reabrir tarefa
function concluirTarefa(index) {

    tarefas[index].concluida =
        !tarefas[index].concluida;

    salvarDados();

    atualizarSistema();

}

// Editar tarefa
function editarTarefa(index) {

    const tarefa = tarefas[index];

    document.getElementById("titulo").value =
        tarefa.titulo;

    document.getElementById("descricao").value =
        tarefa.descricao;

    document.getElementById("data").value =
        tarefa.data;

    document.getElementById("prioridade").value =
        tarefa.prioridade;

    editando = index;

    document.getElementById("titulo").focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// Excluir tarefa
function excluirTarefa(index) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (confirmar) {

        tarefas.splice(index, 1);

        salvarDados();

        atualizarSistema();

    }

}

// Pesquisa em tempo real
pesquisa.addEventListener(
    "input",
    atualizarSistema
);

// Filtro de tarefas
filtro.addEventListener(
    "change",
    atualizarSistema
);

// Inicializar sistema
atualizarSistema();
