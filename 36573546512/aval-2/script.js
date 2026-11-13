
// ===================================
// TASKPURPLE - GERENCIADOR DE TAREFAS
// ===================================


// CARREGAR TAREFAS SALVAS

let tarefas = JSON.parse(
    localStorage.getItem("taskpurple") || "[]"
);

let tarefaEditando = null;

let filtroAtual = "todas";


// ELEMENTOS DO HTML

const formulario = document.getElementById("formTarefa");

const campoTitulo = document.getElementById("titulo");

const campoPrioridade = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");

const pesquisa = document.getElementById("pesquisa");

const botaoSalvar = document.getElementById("botaoSalvar");

const botaoCancelar = document.getElementById("botaoCancelar");


// SALVAR NO NAVEGADOR

function salvarDados() {

    localStorage.setItem(
        "taskpurple",
        JSON.stringify(tarefas)
    );

}


// TRADUZIR PRIORIDADES

function nomePrioridade(prioridade) {

    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    return "Baixa";

}


// CADASTRAR OU EDITAR TAREFA

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = campoTitulo.value.trim();

    const prioridade = Number(campoPrioridade.value);


    // VALIDAR TÍTULO

    if (titulo.length < 5) {

        alert("O título deve ter no mínimo 5 caracteres!");

        campoTitulo.focus();

        return;

    }


    // VALIDAR PRIORIDADE

    if (![1, 2, 3].includes(prioridade)) {

        alert("A prioridade deve ser 1, 2 ou 3!");

        return;

    }


    // VERIFICAR SE ESTÁ EDITANDO

    if (tarefaEditando !== null) {

        const tarefa = tarefas.find(
            t => t.id === tarefaEditando
        );

        if (tarefa) {

            tarefa.titulo = titulo;

            tarefa.prioridade = prioridade;

        }

        alert("Tarefa atualizada com sucesso!");

    } else {

        // CRIAR NOVA TAREFA

        const novaTarefa = {

            id: Date.now().toString() +
                Math.random().toString(36).slice(2),

            titulo: titulo,

            prioridade: prioridade,

            concluida: false

        };

        tarefas.push(novaTarefa);

        alert("Tarefa cadastrada com sucesso!");

    }


    salvarDados();

    limparFormulario();

    atualizarLista();

});


// LIMPAR FORMULÁRIO

function limparFormulario() {

    formulario.reset();

    campoPrioridade.value = "2";

    tarefaEditando = null;

    document.getElementById("tituloFormulario").textContent =
        "＋ Nova tarefa";

    botaoSalvar.textContent =
        "＋ Cadastrar tarefa";

    botaoCancelar.hidden = true;

}


// CANCELAR EDIÇÃO

botaoCancelar.addEventListener("click", function() {

    limparFormulario();

});


// EDITAR TAREFA

function editarTarefa(id) {

    const tarefa = tarefas.find(
        t => t.id === id
    );

    if (!tarefa) return;

    campoTitulo.value = tarefa.titulo;

    campoPrioridade.value = tarefa.prioridade;

    tarefaEditando = id;

    document.getElementById("tituloFormulario").textContent =
        "✎ Editar tarefa";

    botaoSalvar.textContent =
        "Salvar alterações";

    botaoCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// CONCLUIR OU REABRIR TAREFA

function alternarConclusao(id) {

    const tarefa = tarefas.find(
        t => t.id === id
    );

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvarDados();

    atualizarLista();

}


// ALTERAR PRIORIDADE

function alterarPrioridade(id, novaPrioridade) {

    const tarefa = tarefas.find(
        t => t.id === id
    );

    if (!tarefa) return;

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {

        alert("Prioridade inválida!");

        atualizarLista();

        return;

    }

    tarefa.prioridade = prioridade;

    salvarDados();

    atualizarLista();

}


// EXCLUIR TAREFA

function excluirTarefa(id) {

    const confirmacao = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmacao) return;

    tarefas = tarefas.filter(
        tarefa => tarefa.id !== id
    );

    if (tarefaEditando === id) {
        limparFormulario();
    }

    salvarDados();

    atualizarLista();

    alert("Tarefa excluída com sucesso!");

}


// ATUALIZAR RESUMO

function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;


    document.getElementById("totalTarefas").textContent =
        total;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;

}


// CRIAR ELEMENTO DE BOTÃO

function criarBotao(texto, classe, acao) {

    const botao = document.createElement("button");

    botao.type = "button";

    botao.textContent = texto;

    botao.className = classe;

    botao.addEventListener("click", acao);

    return botao;

}


// LISTAR TAREFAS

function atualizarLista() {

    listaTarefas.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();


    // FILTRAR TAREFAS

    const tarefasFiltradas = tarefas.filter(tarefa => {

        const correspondePesquisa =
            tarefa.titulo.toLowerCase().includes(termo);

        const correspondeFiltro =
            filtroAtual === "todas" ||
            (filtroAtual === "pendentes" && !tarefa.concluida) ||
            (filtroAtual === "concluidas" && tarefa.concluida);

        return correspondePesquisa && correspondeFiltro;

    });


    // ORDENAR POR PRIORIDADE

    tarefasFiltradas.sort((a, b) => {

        return a.prioridade - b.prioridade;

    });


    // MENSAGEM QUANDO NÃO HÁ TAREFAS

    document.getElementById("mensagemVazia").style.display =
        tarefasFiltradas.length === 0 ? "block" : "none";


    // EXIBIR CADA TAREFA

    tarefasFiltradas.forEach(tarefa => {

        const cartao = document.createElement("div");

        cartao.className = "tarefa";

        if (tarefa.concluida) {

            cartao.classList.add("concluida");

        }


        // TÍTULO

        const titulo = document.createElement("h3");

        titulo.textContent = tarefa.titulo;


        // INFORMAÇÕES

        const informacoes = document.createElement("div");

        informacoes.className = "info-tarefa";


        // PRIORIDADE

        const prioridade = document.createElement("span");

        prioridade.className = "prioridade";

        if (tarefa.prioridade === 1) {

            prioridade.classList.add("alta");

        } else if (tarefa.prioridade === 2) {

            prioridade.classList.add("media");

        } else {

            prioridade.classList.add("baixa");

        }

        prioridade.textContent =
            "Prioridade: " + nomePrioridade(tarefa.prioridade);


        // STATUS

        const status = document.createElement("span");

        status.className = "status";

        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";


        informacoes.appendChild(prioridade);

        informacoes.appendChild(status);


        // ÁREA DE AÇÕES

        const acoes = document.createElement("div");

        acoes.className = "acoes-tarefa";


        // BOTÃO CONCLUIR

        const botaoConcluir = criarBotao(
            tarefa.concluida ? "Reabrir" : "✓ Concluir",
            "concluir",
            () => alternarConclusao(tarefa.id)
        );


        // BOTÃO EDITAR

        const botaoEditar = criarBotao(
            "Editar título",
            "editar",
            () => editarTarefa(tarefa.id)
        );


        // BOTÃO EXCLUIR

        const botaoExcluir = criarBotao(
            "Excluir",
            "excluir",
            () => excluirTarefa(tarefa.id)
        );


        // SELETOR DE PRIORIDADE

        const seletor = document.createElement("select");

        seletor.setAttribute(
            "aria-label",
            "Alterar prioridade da tarefa"
        );

        const opcoes = [
            { valor: 1, texto: "1 - Alta" },
            { valor: 2, texto: "2 - Média" },
            { valor: 3, texto: "3 - Baixa" }
        ];

        opcoes.forEach(opcao => {

            const option = document.createElement("option");

            option.value = opcao.valor;

            option.textContent = opcao.texto;

            if (tarefa.prioridade === opcao.valor) {

                option.selected = true;

            }

            seletor.appendChild(option);

        });

        seletor.addEventListener("change", function() {

            alterarPrioridade(tarefa.id, this.value);

        });


        // ADICIONAR ELEMENTOS

        acoes.appendChild(botaoConcluir);

        acoes.appendChild(botaoEditar);

        acoes.appendChild(botaoExcluir);

        acoes.appendChild(seletor);


        cartao.appendChild(titulo);

        cartao.appendChild(informacoes);

        cartao.appendChild(acoes);


        listaTarefas.appendChild(cartao);

    });


    atualizarResumo();

}


// PESQUISA DE TAREFAS

pesquisa.addEventListener("input", function() {

    atualizarLista();

});


// FILTROS DE TAREFAS

document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        document.querySelectorAll(".filtro").forEach(item => {

            item.classList.remove("ativo");

        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;

        atualizarLista();

    });

});


// INICIALIZAR SISTEMA

atualizarLista();
