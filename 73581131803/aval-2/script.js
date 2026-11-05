
// Carregar tarefas salvas
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];


// Gerador de códigos
let geradorDeCodigo =
    tarefas.reduce((maior, tarefa) =>
        Math.max(maior, tarefa.codigo), 0
    ) + 1;


// Salvar tarefas
function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}


// Cadastrar tarefa
function cadastrarTarefa() {

    const titulo = document
        .getElementById("titulo")
        .value.trim();

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (titulo.length < 5) {

        alert("O título deve ter no mínimo 5 caracteres.");
        return;

    }

    if (prioridade < 1 || prioridade > 3) {

        alert("Prioridade inválida.");
        return;

    }

    const novaTarefa = {

        codigo: geradorDeCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: false

    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    document.getElementById("titulo").value = "";

    listarTarefas();

}


// Buscar tarefa pelo código
function buscarTarefa(codigo) {

    return tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

}


// Concluir ou reabrir tarefa
function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    tarefa.status = !tarefa.status;

    salvarTarefas();

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

    salvarTarefas();

    listarTarefas();

}


// Editar tarefa
function alterarTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    const novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );

    if (novoTitulo === null) return;

    if (novoTitulo.trim().length < 5) {

        alert("O título deve ter no mínimo 5 caracteres.");
        return;

    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade (1, 2 ou 3):",
        tarefa.prioridade
    );

    if (novaPrioridade === null) return;

    const prioridade = Number(novaPrioridade);

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {

        alert("Prioridade inválida.");
        return;

    }

    tarefa.titulo = novoTitulo.trim();

    tarefa.prioridade = prioridade;

    salvarTarefas();

    listarTarefas();

}


// Listar e filtrar tarefas
function listarTarefas() {

    const lista = document.getElementById(
        "listaTarefas"
    );

    lista.innerHTML = "";

    const filtro = document.getElementById(
        "filtro"
    ).value;

    const pesquisa = document.getElementById(
        "pesquisa"
    ).value.toLowerCase().trim();

    const filtroPrioridade = document.getElementById(
        "filtroPrioridade"
    ).value;


    const tarefasFiltradas = tarefas.filter(tarefa => {

        const correspondeStatus =
            filtro === "todas" ||
            (filtro === "pendentes" && !tarefa.status) ||
            (filtro === "concluidas" && tarefa.status);

        const correspondeTitulo =
            tarefa.titulo.toLowerCase().includes(pesquisa);

        const correspondePrioridade =
            filtroPrioridade === "todas" ||
            tarefa.prioridade === Number(filtroPrioridade);

        return correspondeStatus &&
            correspondeTitulo &&
            correspondePrioridade;

    });


    if (tarefasFiltradas.length === 0) {

        lista.innerHTML =
            '<p class="mensagem">Nenhuma tarefa encontrada.</p>';

    }


    tarefasFiltradas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.className = "tarefa";


        const informacoes = document.createElement("div");

        informacoes.className = "informacoes";


        const titulo = document.createElement("strong");

        titulo.textContent = tarefa.titulo;

        if (tarefa.status) {

            titulo.classList.add("concluida");

        }


        const detalhes = document.createElement("div");

        const codigo = document.createElement("small");

        codigo.textContent = "Código: " + tarefa.codigo;


        const prioridade = document.createElement("span");

        prioridade.className = "prioridade";

        prioridade.textContent =
            " Prioridade: " + tarefa.prioridade;


        detalhes.append(codigo, prioridade);

        informacoes.append(titulo, detalhes);


        const acoes = document.createElement("div");

        acoes.className = "acoes";


        const botaoConcluir = document.createElement("button");

        botaoConcluir.className = "concluir";

        botaoConcluir.textContent =
            tarefa.status ? "Reabrir" : "Concluir";

        botaoConcluir.onclick = () =>
            concluirTarefa(tarefa.codigo);


        const botaoEditar = document.createElement("button");

        botaoEditar.className = "editar";

        botaoEditar.textContent = "Editar";

        botaoEditar.onclick = () =>
            alterarTarefa(tarefa.codigo);


        const botaoExcluir = document.createElement("button");

        botaoExcluir.className = "excluir";

        botaoExcluir.textContent = "Excluir";

        botaoExcluir.onclick = () =>
            excluirTarefa(tarefa.codigo);


        acoes.append(
            botaoConcluir,
            botaoEditar,
            botaoExcluir
        );

        elemento.append(informacoes, acoes);

        lista.appendChild(elemento);

    });


    atualizarEstatisticas();

}


// Atualizar estatísticas
function atualizarEstatisticas() {

    document.getElementById("total").textContent =
        tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(tarefa => !tarefa.status).length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(tarefa => tarefa.status).length;

}


// Inicializar aplicação
listarTarefas();
