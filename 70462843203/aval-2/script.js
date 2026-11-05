
// Recuperar tarefas armazenadas
let tarefas = JSON.parse(localStorage.getItem("taskflow")) || [];

let idEdicao = null;

// Salvar no LocalStorage
function armazenar() {
    localStorage.setItem("taskflow", JSON.stringify(tarefas));
}

// Cadastrar ou editar tarefa
function salvarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const data = document.getElementById("data").value;

    if (!titulo) {
        alert("Informe o título da tarefa!");
        return;
    }

    if (idEdicao !== null) {
        tarefas = tarefas.map(tarefa => {
            if (tarefa.id === idEdicao) {
                return {
                    ...tarefa,
                    titulo,
                    descricao,
                    prioridade,
                    data
                };
            }

            return tarefa;
        });

        idEdicao = null;
        document.getElementById("btnSalvar").textContent = "Adicionar tarefa";

    } else {
        const novaTarefa = {
            id: Date.now(),
            titulo,
            descricao,
            prioridade,
            data,
            status: "Pendente"
        };

        tarefas.push(novaTarefa);
    }

    armazenar();
    limparFormulario();
    atualizarTela();
}

// Limpar formulário
function limparFormulario() {
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("prioridade").value = "Baixa";
    document.getElementById("data").value = "";
}

// Excluir tarefa
function excluirTarefa(id) {
    if (!confirm("Deseja realmente excluir esta tarefa?")) {
        return;
    }

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    armazenar();
    atualizarTela();
}

// Editar tarefa
function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("descricao").value = tarefa.descricao;
    document.getElementById("prioridade").value = tarefa.prioridade;
    document.getElementById("data").value = tarefa.data || "";

    idEdicao = id;

    document.getElementById("btnSalvar").textContent = "Salvar alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Alterar status
function alterarStatus(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.status = tarefa.status === "Pendente"
                ? "Concluída"
                : "Pendente";
        }

        return tarefa;
    });

    armazenar();
    atualizarTela();
}

// Aplicar filtros e pesquisa
function obterTarefasFiltradas() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const status = document.getElementById("filtroStatus").value;
    const prioridade = document.getElementById("filtroPrioridade").value;

    return tarefas.filter(tarefa => {
        const correspondeBusca =
            tarefa.titulo.toLowerCase().includes(busca) ||
            tarefa.descricao.toLowerCase().includes(busca);

        const correspondeStatus =
            status === "Todas" || tarefa.status === status;

        const correspondePrioridade =
            prioridade === "Todas" || tarefa.prioridade === prioridade;

        return correspondeBusca && correspondeStatus && correspondePrioridade;
    });
}

// Criar cartão de tarefa
function criarCartao(tarefa) {
    const cartao = document.createElement("article");
    cartao.className = "tarefa";

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = tarefa.descricao || "Sem descrição.";

    const info = document.createElement("div");
    info.className = "info";

    const prioridade = document.createElement("span");
    prioridade.textContent = "Prioridade: " + tarefa.prioridade;

    const status = document.createElement("span");
    status.textContent = "Status: " + tarefa.status;

    const data = document.createElement("span");
    data.textContent = tarefa.data
        ? "Prazo: " + tarefa.data
        : "Sem prazo";

    info.append(prioridade, status, data);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnStatus = document.createElement("button");
    btnStatus.className = "concluir";
    btnStatus.textContent = tarefa.status === "Pendente"
        ? "Concluir"
        : "Reabrir";

    btnStatus.onclick = () => alterarStatus(tarefa.id);

    const btnEditar = document.createElement("button");
    btnEditar.className = "editar";
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarTarefa(tarefa.id);

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "excluir";
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => excluirTarefa(tarefa.id);

    acoes.append(btnStatus, btnEditar, btnExcluir);

    cartao.append(titulo, descricao, info, acoes);

    return cartao;
}

// Atualizar lista e indicadores
function atualizarTela() {
    const lista = document.getElementById("listaTarefas");
    const mensagem = document.getElementById("mensagemVazia");

    lista.innerHTML = "";

    const filtradas = obterTarefasFiltradas();

    filtradas.forEach(tarefa => {
        lista.appendChild(criarCartao(tarefa));
    });

    mensagem.style.display = filtradas.length === 0 ? "block" : "none";

    document.getElementById("total").textContent = tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => t.status === "Pendente").length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => t.status === "Concluída").length;
}

// Eventos dos filtros
document.getElementById("busca")
    .addEventListener("input", atualizarTela);

document.getElementById("filtroStatus")
    .addEventListener("change", atualizarTela);

document.getElementById("filtroPrioridade")
    .addEventListener("change", atualizarTela);

// Inicializar aplicação
atualizarTela();
