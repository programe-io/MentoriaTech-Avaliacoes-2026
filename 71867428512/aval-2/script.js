
// Recuperar tarefas salvas
let tarefas = JSON.parse(
    localStorage.getItem("organiza_tarefas") || "[]"
);

let tarefaEmEdicao = null;

// Selecionar elementos
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoDescricao = document.getElementById("descricao");
const campoPrioridade = document.getElementById("prioridade");
const campoCategoria = document.getElementById("categoria");
const campoPrazo = document.getElementById("prazo");

const botaoSalvar = document.getElementById("salvar");
const botaoCancelar = document.getElementById("cancelar");

// Salvar no localStorage
function salvarDados() {
    localStorage.setItem(
        "organiza_tarefas",
        JSON.stringify(tarefas)
    );
}

// Adicionar ou editar tarefa
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();

    if (titulo.length < 2) {
        alert("Digite um título com pelo menos 2 caracteres.");
        return;
    }

    if (tarefaEmEdicao !== null) {
        const tarefa = tarefas.find(
            item => item.id === tarefaEmEdicao
        );

        if (!tarefa) return;

        tarefa.titulo = titulo;
        tarefa.descricao = campoDescricao.value.trim();
        tarefa.prioridade = campoPrioridade.value;
        tarefa.categoria = campoCategoria.value;
        tarefa.prazo = campoPrazo.value;

        tarefaEmEdicao = null;

        botaoSalvar.textContent = "Adicionar tarefa";
        botaoCancelar.hidden = true;

    } else {
        const novaTarefa = {
            id: Date.now().toString() + Math.random().toString(16).slice(2),
            titulo: titulo,
            descricao: campoDescricao.value.trim(),
            prioridade: campoPrioridade.value,
            categoria: campoCategoria.value,
            prazo: campoPrazo.value,
            concluida: false,
            criadaEm: Date.now()
        };

        tarefas.push(novaTarefa);
    }

    salvarDados();
    formulario.reset();
    mostrarTarefas();
});

// Preparar tarefa para edição
function editarTarefa(id) {
    const tarefa = tarefas.find(item => item.id === id);

    if (!tarefa) return;

    tarefaEmEdicao = id;

    campoTitulo.value = tarefa.titulo;
    campoDescricao.value = tarefa.descricao;
    campoPrioridade.value = tarefa.prioridade;
    campoCategoria.value = tarefa.categoria;
    campoPrazo.value = tarefa.prazo;

    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.hidden = false;

    campoTitulo.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cancelar edição
botaoCancelar.addEventListener("click", function() {
    tarefaEmEdicao = null;
    formulario.reset();

    botaoSalvar.textContent = "Adicionar tarefa";
    botaoCancelar.hidden = true;
});

// Concluir ou reabrir tarefa
function alterarStatus(id) {
    const tarefa = tarefas.find(item => item.id === id);

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvarDados();
    mostrarTarefas();
}

// Excluir tarefa
function excluirTarefa(id) {
    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(item => item.id !== id);

    if (tarefaEmEdicao === id) {
        tarefaEmEdicao = null;
        formulario.reset();
        botaoSalvar.textContent = "Adicionar tarefa";
        botaoCancelar.hidden = true;
    }

    salvarDados();
    mostrarTarefas();
}

// Criar cartão da tarefa
function criarCartao(tarefa) {
    const cartao = document.createElement("article");
    cartao.className = "tarefa";

    if (tarefa.concluida) {
        cartao.classList.add("concluida");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = tarefa.descricao || "Sem descrição.";

    const etiquetas = document.createElement("div");
    etiquetas.className = "etiquetas";

    const categoria = document.createElement("span");
    categoria.className = "etiqueta";
    categoria.textContent = tarefa.categoria;

    const prioridade = document.createElement("span");
    prioridade.className = "etiqueta";
    prioridade.textContent = "Prioridade: " + tarefa.prioridade;

    etiquetas.append(categoria, prioridade);

    const prazo = document.createElement("p");
    prazo.textContent = tarefa.prazo
        ? "Prazo: " + tarefa.prazo.split("-").reverse().join("/")
        : "Sem prazo definido.";

    const status = document.createElement("p");
    status.textContent = tarefa.concluida
        ? "Status: Concluída"
        : "Status: Pendente";

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const concluir = document.createElement("button");
    concluir.className = "btn-concluir";
    concluir.textContent = tarefa.concluida
        ? "Reabrir"
        : "Concluir";
    concluir.addEventListener("click", () => alterarStatus(tarefa.id));

    const editar = document.createElement("button");
    editar.className = "btn-editar";
    editar.textContent = "Editar";
    editar.addEventListener("click", () => editarTarefa(tarefa.id));

    const excluir = document.createElement("button");
    excluir.className = "btn-excluir";
    excluir.textContent = "Excluir";
    excluir.addEventListener("click", () => excluirTarefa(tarefa.id));

    acoes.append(concluir, editar, excluir);

    cartao.append(
        titulo,
        descricao,
        etiquetas,
        prazo,
        status,
        acoes
    );

    return cartao;
}

// Exibir tarefas com filtros
function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.replaceChildren();

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase()
        .trim();

    const filtroStatus = document.getElementById("filtroStatus").value;
    const filtroCategoria = document.getElementById("filtroCategoria").value;

    const filtradas = tarefas.filter(tarefa => {
        const combinaPesquisa =
            tarefa.titulo.toLowerCase().includes(pesquisa) ||
            tarefa.descricao.toLowerCase().includes(pesquisa);

        const combinaStatus =
            filtroStatus === "todas" ||
            (filtroStatus === "pendente" && !tarefa.concluida) ||
            (filtroStatus === "concluida" && tarefa.concluida);

        const combinaCategoria =
            filtroCategoria === "todas" ||
            tarefa.categoria === filtroCategoria;

        return combinaPesquisa && combinaStatus && combinaCategoria;
    });

    if (filtradas.length === 0) {
        const mensagem = document.createElement("div");
        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa encontrada.";
        lista.appendChild(mensagem);
    } else {
        filtradas.forEach(tarefa => {
            lista.appendChild(criarCartao(tarefa));
        });
    }

    atualizarPainel();
}

// Atualizar estatísticas
function atualizarPainel() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

// Eventos dos filtros
document.getElementById("pesquisa")
    .addEventListener("input", mostrarTarefas);

document.getElementById("filtroStatus")
    .addEventListener("change", mostrarTarefas);

document.getElementById("filtroCategoria")
    .addEventListener("change", mostrarTarefas);

// Iniciar o sistema
mostrarTarefas();
