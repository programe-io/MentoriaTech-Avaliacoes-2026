
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let geradorDeCodigo = Number(localStorage.getItem("geradorDeCodigo")) || 0;

let filtroAtual = "todas";

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    localStorage.setItem("geradorDeCodigo", geradorDeCodigo);
}

// Validar os dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return false;
    }

    if (![1, 2, 3].includes(Number(prioridade))) {
        alert("Prioridade inválida!");
        return false;
    }

    return true;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    if (!validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    geradorDeCodigo++;

    let tarefa = {
        codigo: geradorDeCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: false
    };

    tarefas.push(tarefa);

    salvarTarefas();
    atualizarTela();
}

// Buscar tarefa
function buscarTarefa(codigo) {
    return tarefas.find(
        tarefa => tarefa.codigo === Number(codigo)
    );
}

// Alterar prioridade
function alterarPrioridade(codigo, prioridade) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    if (!validarDadosDaTarefa(tarefa.titulo, prioridade)) {
        return;
    }

    tarefa.prioridade = Number(prioridade);

    salvarTarefas();
    atualizarTela();
}

// Alterar título
function alterarTitulo(codigo, novoTitulo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    if (!validarDadosDaTarefa(novoTitulo, tarefa.prioridade)) {
        return;
    }

    tarefa.titulo = novoTitulo.trim();

    salvarTarefas();
    atualizarTela();
}

// Concluir ou reabrir tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    tarefa.status = !tarefa.status;

    salvarTarefas();
    atualizarTela();
}

// Excluir tarefa
function excluirTarefa(codigo) {
    let confirmacao = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmacao) return;

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== Number(codigo)
    );

    salvarTarefas();
    atualizarTela();
}

// Pesquisar tarefas
function pesquisarTarefa(palavra) {
    return tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(
            palavra.toLowerCase()
        )
    );
}

// Filtrar tarefas
function filtrarTarefas() {
    let palavra = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    let resultado = pesquisarTarefa(palavra);

    if (filtroAtual === "pendentes") {
        resultado = resultado.filter(
            tarefa => !tarefa.status
        );
    }

    if (filtroAtual === "concluidas") {
        resultado = resultado.filter(
            tarefa => tarefa.status
        );
    }

    return resultado;
}

// Atualizar estatísticas
function atualizarEstatisticas() {
    let total = tarefas.length;

    let concluidas = tarefas.filter(
        tarefa => tarefa.status
    ).length;

    let pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;
}

// Exibir tarefas na tela
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    let resultado = filtrarTarefas();

    if (resultado.length === 0) {
        let mensagem = document.createElement("p");

        mensagem.className = "mensagem-vazia";
        mensagem.textContent = "Nenhuma tarefa encontrada.";

        lista.appendChild(mensagem);
        return;
    }

    resultado.forEach(tarefa => {

        let elemento = document.createElement("div");

        elemento.className = tarefa.status
            ? "tarefa concluida"
            : "tarefa";

        let informacoes = document.createElement("div");
        informacoes.className = "tarefa-info";

        let titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        let codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        let status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Concluída"
            : "Status: Pendente";

        let prioridade = document.createElement("span");

        prioridade.className = "prioridade";

        if (tarefa.prioridade === 1) {
            prioridade.textContent = "Alta";
            prioridade.classList.add("alta");
        } else if (tarefa.prioridade === 2) {
            prioridade.textContent = "Média";
            prioridade.classList.add("media");
        } else {
            prioridade.textContent = "Baixa";
            prioridade.classList.add("baixa");
        }

        informacoes.appendChild(titulo);
        informacoes.appendChild(codigo);
        informacoes.appendChild(status);
        informacoes.appendChild(prioridade);

        // Criar botões
        let acoes = document.createElement("div");
        acoes.className = "acoes";

        let btnConcluir = document.createElement("button");

        btnConcluir.className = "btn-concluir";
        btnConcluir.textContent = tarefa.status
            ? "Reabrir"
            : "Concluir";

        btnConcluir.addEventListener("click", () => {
            concluirTarefa(tarefa.codigo);
        });

        let btnEditar = document.createElement("button");

        btnEditar.className = "btn-editar";
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", () => {

            let novoTitulo = prompt(
                "Digite o novo título:",
                tarefa.titulo
            );

            if (novoTitulo === null) return;

            let novaPrioridade = prompt(
                "Digite a prioridade (1-Alta, 2-Média, 3-Baixa):",
                tarefa.prioridade
            );

            if (novaPrioridade === null) return;

            if (!["1", "2", "3"].includes(novaPrioridade)) {
                alert("Prioridade inválida!");
                return;
            }

            if (alterarTitulo(tarefa.codigo, novoTitulo)) {
                alterarPrioridade(tarefa.codigo, novaPrioridade);
            }

        });

        let btnExcluir = document.createElement("button");

        btnExcluir.className = "btn-excluir";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", () => {
            excluirTarefa(tarefa.codigo);
        });

        acoes.appendChild(btnConcluir);
        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);

        elemento.appendChild(informacoes);
        elemento.appendChild(acoes);

        lista.appendChild(elemento);

    });
}

// Atualizar toda a página
function atualizarTela() {
    atualizarEstatisticas();
    listarTarefas();
}

// Evento do formulário
document
    .getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let titulo = document.getElementById("titulo").value;
        let prioridade = document.getElementById("prioridade").value;

        cadastrarTarefa(titulo, prioridade);

        this.reset();
    });

// Evento de pesquisa
document
    .getElementById("pesquisa")
    .addEventListener("input", listarTarefas);

// Eventos dos filtros
document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;

        listarTarefas();
    });

});

// Inicializar sistema
atualizarTela();
