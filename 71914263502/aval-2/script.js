
// Recuperar tarefas do localStorage
function carregarTarefas() {
    try {
        const dados = JSON.parse(
            localStorage.getItem("tarefas")
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

let tarefas = carregarTarefas();

let geradorDeCodigo =
    Number(localStorage.getItem("geradorDeCodigo")) ||
    tarefas.reduce(
        (maior, tarefa) => Math.max(maior, Number(tarefa.codigo) || 0),
        0
    ) + 1;

let codigoEmEdicao = null;

// Elementos HTML
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("cancelar");

// Salvar os dados
function salvarDados() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    localStorage.setItem(
        "geradorDeCodigo",
        geradorDeCodigo
    );
}

// Validar os dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        alert("O título precisa ter no mínimo 5 caracteres.");
        return false;
    }

    const numeroPrioridade = Number(prioridade);

    if (
        !Number.isInteger(numeroPrioridade) ||
        numeroPrioridade < 1 ||
        numeroPrioridade > 3
    ) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return false;
    }

    return true;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    return tarefas.find(
        tarefa => tarefa.codigo === codigo
    );
}

// Cadastrar ou editar tarefa
function cadastrarTarefa(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (!validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    if (codigoEmEdicao !== null) {
        const tarefa = buscarTarefa(codigoEmEdicao);

        if (!tarefa) return;

        tarefa.titulo = titulo;
        tarefa.prioridade = prioridade;

        codigoEmEdicao = null;

        botaoSalvar.textContent = "Cadastrar tarefa";
        botaoCancelar.hidden = true;

    } else {
        const novaTarefa = {
            codigo: geradorDeCodigo++,
            titulo: titulo,
            prioridade: prioridade,
            status: true
        };

        tarefas.push(novaTarefa);
    }

    salvarDados();
    formulario.reset();
    listarTarefas();
}

// Concluir ou reabrir tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    tarefa.status = !tarefa.status;

    salvarDados();
    listarTarefas();
}

// Excluir tarefa
function excluirTarefa(codigo) {
    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== codigo
    );

    if (codigoEmEdicao === codigo) {
        cancelarEdicao();
    }

    salvarDados();
    listarTarefas();
}

// Preparar edição
function editarTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    codigoEmEdicao = codigo;

    campoTitulo.value = tarefa.titulo;
    campoPrioridade.value = tarefa.prioridade;

    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.hidden = false;

    campoTitulo.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cancelar edição
function cancelarEdicao() {
    codigoEmEdicao = null;

    formulario.reset();

    botaoSalvar.textContent = "Cadastrar tarefa";
    botaoCancelar.hidden = true;
}

// Filtrar tarefas
function filtrarTarefas() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase()
        .trim();

    const filtroStatus =
        document.getElementById("filtroStatus").value;

    const filtroPrioridade =
        document.getElementById("filtroPrioridade").value;

    return tarefas.filter(tarefa => {
        const combinaPesquisa =
            tarefa.titulo.toLowerCase().includes(pesquisa) ||
            String(tarefa.codigo).includes(pesquisa);

        const combinaStatus =
            filtroStatus === "todos" ||
            (filtroStatus === "pendente" && tarefa.status) ||
            (filtroStatus === "concluida" && !tarefa.status);

        const combinaPrioridade =
            filtroPrioridade === "todas" ||
            tarefa.prioridade === Number(filtroPrioridade);

        return (
            combinaPesquisa &&
            combinaStatus &&
            combinaPrioridade
        );
    });
}

// Mostrar tarefas na tela
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.replaceChildren();

    const tarefasFiltradas = filtrarTarefas();

    if (tarefasFiltradas.length === 0) {
        const mensagem = document.createElement("p");

        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa encontrada.";

        lista.appendChild(mensagem);
    }

    tarefasFiltradas.forEach(tarefa => {
        const item = document.createElement("article");

        item.className = "tarefa";

        if (!tarefa.status) {
            item.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");

        const nomesPrioridade = {
            1: "Baixa",
            2: "Média",
            3: "Alta"
        };

        prioridade.textContent =
            "Prioridade: " + nomesPrioridade[tarefa.prioridade];

        const status = document.createElement("p");

        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        const botoes = document.createElement("div");
        botoes.className = "acoes";

        const botaoStatus = document.createElement("button");

        botaoStatus.className = "btn-status";
        botaoStatus.textContent = tarefa.status
            ? "Concluir"
            : "Reabrir";

        botaoStatus.addEventListener("click", () => {
            concluirTarefa(tarefa.codigo);
        });

        const botaoEditar = document.createElement("button");

        botaoEditar.className = "btn-editar";
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", () => {
            editarTarefa(tarefa.codigo);
        });

        const botaoExcluir = document.createElement("button");

        botaoExcluir.className = "btn-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", () => {
            excluirTarefa(tarefa.codigo);
        });

        botoes.append(
            botaoStatus,
            botaoEditar,
            botaoExcluir
        );

        item.append(
            titulo,
            codigo,
            prioridade,
            status,
            botoes
        );

        lista.appendChild(item);
    });

    atualizarEstatisticas();
}

// Atualizar os números do painel
function atualizarEstatisticas() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => !tarefa.status
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

// Eventos
formulario.addEventListener("submit", cadastrarTarefa);

botaoCancelar.addEventListener("click", cancelarEdicao);

document.getElementById("pesquisa")
    .addEventListener("input", listarTarefas);

document.getElementById("filtroStatus")
    .addEventListener("change", listarTarefas);

document.getElementById("filtroPrioridade")
    .addEventListener("change", listarTarefas);

// Iniciar aplicação
listarTarefas();
