
// Recuperar tarefas armazenadas
let tarefas = JSON.parse(
    localStorage.getItem("taskflow_tarefas")
) || [];

let codigoEdicao = null;


// Elementos da página
const formulario = document.getElementById("formTarefa");
const campoNome = document.getElementById("nomeTarefa");
const campoPrioridade = document.getElementById("nivelPrioridade");
const campoCategoria = document.getElementById("categoria");
const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("cancelarEdicao");


// Salvar tarefas no navegador
function salvarDados() {

    localStorage.setItem(
        "taskflow_tarefas",
        JSON.stringify(tarefas)
    );

}


// Criar nova tarefa
function adicionarTarefa(evento) {

    evento.preventDefault();

    const nome = campoNome.value.trim();

    if (nome.length < 3) {
        alert("Digite pelo menos 3 caracteres.");
        return;
    }

    const prioridade = campoPrioridade.value;
    const categoria = campoCategoria.value;

    if (codigoEdicao !== null) {

        const tarefa = tarefas.find(
            item => item.id === codigoEdicao
        );

        if (!tarefa) return;

        tarefa.nome = nome;
        tarefa.prioridade = prioridade;
        tarefa.categoria = categoria;

        codigoEdicao = null;

        botaoSalvar.textContent = "+ Adicionar tarefa";
        botaoCancelar.hidden = true;

    } else {

        const novaTarefa = {

            id: crypto.randomUUID(),
            nome: nome,
            prioridade: prioridade,
            categoria: categoria,
            concluida: false,
            criadaEm: Date.now()

        };

        tarefas.push(novaTarefa);

    }

    salvarDados();

    formulario.reset();

    exibirTarefas();

}


// Preparar edição
function editarTarefa(id) {

    const tarefa = tarefas.find(
        item => item.id === id
    );

    if (!tarefa) return;

    codigoEdicao = id;

    campoNome.value = tarefa.nome;
    campoPrioridade.value = tarefa.prioridade;
    campoCategoria.value = tarefa.categoria;

    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.hidden = false;

    campoNome.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Cancelar edição
function cancelarEdicao() {

    codigoEdicao = null;

    formulario.reset();

    botaoSalvar.textContent = "+ Adicionar tarefa";
    botaoCancelar.hidden = true;

}


// Alterar situação
function alternarSituacao(id) {

    const tarefa = tarefas.find(
        item => item.id === id
    );

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvarDados();

    exibirTarefas();

}


// Excluir tarefa
function removerTarefa(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(
        item => item.id !== id
    );

    if (codigoEdicao === id) {
        cancelarEdicao();
    }

    salvarDados();

    exibirTarefas();

}


// Organizar tarefas
function organizarTarefas(lista) {

    const ordem = document.getElementById("ordem").value;

    const copia = [...lista];

    if (ordem === "recentes") {
        copia.sort((a, b) => b.criadaEm - a.criadaEm);
    }

    if (ordem === "antigas") {
        copia.sort((a, b) => a.criadaEm - b.criadaEm);
    }

    if (ordem === "alfabetica") {
        copia.sort((a, b) =>
            a.nome.localeCompare(b.nome, "pt-BR")
        );
    }

    if (ordem === "prioridade") {

        const pesos = {
            alta: 3,
            media: 2,
            baixa: 1
        };

        copia.sort((a, b) =>
            pesos[b.prioridade] - pesos[a.prioridade]
        );

    }

    return copia;

}


// Filtrar e exibir tarefas
function exibirTarefas() {

    const container = document.getElementById(
        "tarefasContainer"
    );

    container.innerHTML = "";

    const pesquisa = document.getElementById(
        "campoPesquisa"
    ).value.toLowerCase().trim();

    const situacao = document.getElementById(
        "situacao"
    ).value;


    let resultado = tarefas.filter(tarefa => {

        const nomeCorresponde =
            tarefa.nome.toLowerCase().includes(pesquisa);

        const situacaoCorresponde =
            situacao === "todas" ||
            (situacao === "pendente" && !tarefa.concluida) ||
            (situacao === "concluida" && tarefa.concluida);

        return nomeCorresponde && situacaoCorresponde;

    });


    resultado = organizarTarefas(resultado);


    document.getElementById("totalExibido").textContent =
        resultado.length +
        (resultado.length === 1 ? " tarefa" : " tarefas");


    if (resultado.length === 0) {

        container.innerHTML =
            '<div class="vazio">Nenhuma tarefa encontrada.</div>';

    }


    resultado.forEach(tarefa => {

        const item = document.createElement("article");

        item.className = "item-tarefa";

        if (tarefa.concluida) {
            item.classList.add("tarefa-finalizada");
        }


        // Informações
        const dados = document.createElement("div");

        dados.className = "dados-tarefa";

        const titulo = document.createElement("h3");

        titulo.textContent = tarefa.nome;

        const descricao = document.createElement("p");

        descricao.textContent =
            tarefa.concluida
                ? "Tarefa finalizada"
                : "Tarefa em andamento";


        // Etiquetas
        const etiquetas = document.createElement("div");

        etiquetas.className = "etiquetas";

        const categoria = document.createElement("span");

        categoria.className = "etiqueta";
        categoria.textContent = tarefa.categoria;

        const prioridade = document.createElement("span");

        prioridade.className =
            "etiqueta prioridade-" + tarefa.prioridade;

        const nomesPrioridade = {
            baixa: "Baixa prioridade",
            media: "Média prioridade",
            alta: "Alta prioridade"
        };

        prioridade.textContent =
            nomesPrioridade[tarefa.prioridade];

        etiquetas.append(categoria, prioridade);

        dados.append(titulo, descricao, etiquetas);


        // Botões
        const botoes = document.createElement("div");

        botoes.className = "botoes-tarefa";


        const concluir = document.createElement("button");

        concluir.className = "btn-status";

        concluir.textContent =
            tarefa.concluida ? "Reabrir" : "Concluir";

        concluir.onclick = () =>
            alternarSituacao(tarefa.id);


        const editar = document.createElement("button");

        editar.className = "btn-editar";

        editar.textContent = "Editar";

        editar.onclick = () =>
            editarTarefa(tarefa.id);


        const excluir = document.createElement("button");

        excluir.className = "btn-excluir";

        excluir.textContent = "Excluir";

        excluir.onclick = () =>
            removerTarefa(tarefa.id);


        botoes.append(concluir, editar, excluir);

        item.append(dados, botoes);

        container.appendChild(item);

    });


    atualizarResumo();

}


// Atualizar painel de estatísticas
function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    const porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);


    document.getElementById("quantidadeTotal").textContent =
        total;

    document.getElementById("quantidadePendentes").textContent =
        pendentes;

    document.getElementById("quantidadeConcluidas").textContent =
        concluidas;

    document.getElementById("porcentagem").textContent =
        porcentagem + "%";

    document.getElementById("barraPreenchida").style.width =
        porcentagem + "%";

}


// Eventos
formulario.addEventListener(
    "submit",
    adicionarTarefa
);

botaoCancelar.addEventListener(
    "click",
    cancelarEdicao
);

document.getElementById("campoPesquisa").addEventListener(
    "input",
    exibirTarefas
);

document.getElementById("situacao").addEventListener(
    "change",
    exibirTarefas
);

document.getElementById("ordem").addEventListener(
    "change",
    exibirTarefas
);


// Iniciar aplicação
exibirTarefas();
