
/* =========================================
   1. REFERÊNCIAS DO HTML
========================================= */

const formTarefa = document.getElementById("form-tarefa");

const inputTitulo = document.getElementById("titulo");

const inputPrioridade = document.getElementById("prioridade");

const tabelaTarefas = document.getElementById("tabela-tarefas");

const mensagemErro = document.getElementById("erro");

const tituloFormulario = document.getElementById("titulo-formulario");

const btnSalvar = document.getElementById("btn-salvar");

const inputPesquisa = document.getElementById("pesquisa");

const filtroStatus = document.getElementById("filtro-status");

const totalTarefas = document.getElementById("total-tarefas");

const totalPendentes = document.getElementById("total-pendentes");

const totalConcluidas = document.getElementById("total-concluidas");

const contadorListagem = document.getElementById("contador-listagem");

const CHAVE_TAREFAS = "gerenciador_tarefas";


/* =========================================
   2. VARIÁVEIS DO SISTEMA
========================================= */

let tarefas = [];

let codigo = 0;

let codigoEmEdicao = null;


/* =========================================
   3. GERAÇÃO AUTOMÁTICA DE CÓDIGO
========================================= */

function gerarCodigo() {

    codigo++;

    return codigo;

}


/* =========================================
   4. VALIDAÇÃO DOS DADOS
========================================= */

function validarDadosDaTarefa(titulo, prioridade) {

    titulo = titulo.trim();

    if (titulo.length < 5) {

        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );

    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {

        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );

    }

}


/* =========================================
   5. BUSCAR TAREFA PELO CÓDIGO
========================================= */

function buscarTarefa(codigoTarefa) {

    const tarefa = tarefas.find(function(item) {

        return item.codigo === codigoTarefa;

    });

    if (!tarefa) {

        throw new Error(
            "Tarefa não encontrada."
        );

    }

    return tarefa;

}


/* =========================================
   6. CADASTRAR TAREFA
========================================= */

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    const tarefa = {

        codigo: gerarCodigo(),

        titulo: titulo.trim(),

        prioridade: prioridade,

        status: true

    };

    tarefas.push(tarefa);

    return tarefa;

}


/* =========================================
   7. LISTAR TAREFAS
========================================= */

function listarTarefas() {

    return tarefas;

}


/* =========================================
   8. CONCLUIR TAREFA
========================================= */

function concluirTarefa(codigoTarefa) {

    const tarefa = buscarTarefa(codigoTarefa);

    if (!tarefa.status) {

        throw new Error(
            "Esta tarefa já foi concluída."
        );

    }

    tarefa.status = false;

}


/* =========================================
   9. ALTERAR PRIORIDADE
========================================= */

function alterarPrioridade(codigoTarefa, novaPrioridade) {

    const tarefa = buscarTarefa(codigoTarefa);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

}


/* =========================================
   10. EDITAR TÍTULO DA TAREFA
========================================= */

function editarTarefa(codigoTarefa, novoTitulo) {

    const tarefa = buscarTarefa(codigoTarefa);

    validarDadosDaTarefa(
        novoTitulo,
        tarefa.prioridade
    );

    tarefa.titulo = novoTitulo.trim();

}


/* =========================================
   11. EXCLUIR TAREFA
========================================= */

function excluirTarefa(codigoTarefa) {

    const tarefa = buscarTarefa(codigoTarefa);

    tarefas = tarefas.filter(function(item) {

        return item.codigo !== tarefa.codigo;

    });

}


/* =========================================
   12. MENSAGENS
========================================= */

function mostrarErro(mensagem) {

    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;

}


function limparErro() {

    mensagemErro.textContent = "";

    mensagemErro.hidden = true;

}


/* =========================================
   13. SALVAR NO LOCALSTORAGE
========================================= */

function salvarTarefas() {

    try {

        localStorage.setItem(
            CHAVE_TAREFAS,
            JSON.stringify(tarefas)
        );

        return true;

    } catch (erro) {

        console.error(erro);

        mostrarErro(
            "Não foi possível salvar as tarefas no navegador."
        );

        return false;

    }

}


/* =========================================
   14. CARREGAR TAREFAS
========================================= */

function carregarTarefas() {

    const dadosSalvos = localStorage.getItem(CHAVE_TAREFAS);

    if (!dadosSalvos) {

        return [];

    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (!Array.isArray(dados)) {

            return [];

        }

        return dados.filter(function(tarefa) {

            return (
                tarefa !== null &&
                typeof tarefa === "object" &&
                Number.isSafeInteger(tarefa.codigo) &&
                tarefa.codigo > 0 &&
                typeof tarefa.titulo === "string" &&
                tarefa.titulo.trim().length >= 5 &&
                Number.isInteger(tarefa.prioridade) &&
                tarefa.prioridade >= 1 &&
                tarefa.prioridade <= 3 &&
                typeof tarefa.status === "boolean"
            );

        });

    } catch (erro) {

        console.error("Erro ao carregar tarefas:", erro);

        return [];

    }

}


/* =========================================
   15. AJUSTAR CÓDIGO
========================================= */

function ajustarCodigo() {

    let maior = 0;

    tarefas.forEach(function(tarefa) {

        if (tarefa.codigo > maior) {

            maior = tarefa.codigo;

        }

    });

    codigo = maior;

}


/* =========================================
   16. FORMATAÇÃO DA PRIORIDADE
========================================= */

function obterPrioridade(prioridade) {

    if (prioridade === 1) {

        return {
            texto: "Alta",
            classe: "alta"
        };

    }

    if (prioridade === 2) {

        return {
            texto: "Média",
            classe: "media"
        };

    }

    return {
        texto: "Baixa",
        classe: "baixa"
    };

}


/* =========================================
   17. CRIAR CÉLULA
========================================= */

function criarCelula(conteudo) {

    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;

}


/* =========================================
   18. CRIAR LINHA DA TABELA
========================================= */

function criarLinha(tarefa) {

    const tr = document.createElement("tr");

    tr.dataset.codigo = tarefa.codigo;

    // Código

    tr.appendChild(
        criarCelula(tarefa.codigo)
    );

    // Título

    const tdTitulo = criarCelula(tarefa.titulo);

    if (!tarefa.status) {

        tdTitulo.style.textDecoration = "line-through";

        tdTitulo.style.color = "#94a3b8";

    }

    tr.appendChild(tdTitulo);

    // Prioridade

    const tdPrioridade = document.createElement("td");

    const seloPrioridade = document.createElement("span");

    const prioridade = obterPrioridade(tarefa.prioridade);

    seloPrioridade.classList.add(
        "selo",
        prioridade.classe
    );

    seloPrioridade.textContent = prioridade.texto;

    tdPrioridade.appendChild(seloPrioridade);

    tr.appendChild(tdPrioridade);

    // Status

    const tdStatus = document.createElement("td");

    const seloStatus = document.createElement("span");

    seloStatus.classList.add(
        "selo",
        tarefa.status ? "status-pendente" : "status-concluida"
    );

    seloStatus.textContent = tarefa.status
        ? "Em andamento"
        : "Concluída";

    tdStatus.appendChild(seloStatus);

    tr.appendChild(tdStatus);

    // Ações

    const tdAcoes = document.createElement("td");

    const divAcoes = document.createElement("div");

    divAcoes.classList.add("acoes");

    // Botão concluir

    if (tarefa.status) {

        const btnConcluir = document.createElement("button");

        btnConcluir.textContent = "Concluir";

        btnConcluir.classList.add(
            "btn-acao",
            "btn-concluir"
        );

        btnConcluir.dataset.acao = "concluir";

        divAcoes.appendChild(btnConcluir);

    }

    // Botão editar

    const btnEditar = document.createElement("button");

    btnEditar.textContent = "Editar";

    btnEditar.classList.add(
        "btn-acao",
        "btn-editar"
    );

    btnEditar.dataset.acao = "editar";

    divAcoes.appendChild(btnEditar);

    // Botão excluir

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.classList.add(
        "btn-acao",
        "btn-excluir"
    );

    btnExcluir.dataset.acao = "excluir";

    divAcoes.appendChild(btnExcluir);

    tdAcoes.appendChild(divAcoes);

    tr.appendChild(tdAcoes);

    return tr;

}


/* =========================================
   19. FILTRAR TAREFAS
========================================= */

function obterTarefasFiltradas() {

    const pesquisa = inputPesquisa.value
        .trim()
        .toLowerCase();

    const filtro = filtroStatus.value;

    return listarTarefas().filter(function(tarefa) {

        const correspondePesquisa = tarefa.titulo
            .toLowerCase()
            .includes(pesquisa);

        const correspondeStatus =
            filtro === "todas" ||
            (filtro === "pendentes" && tarefa.status) ||
            (filtro === "concluidas" && !tarefa.status);

        return correspondePesquisa && correspondeStatus;

    });

}


/* =========================================
   20. ATUALIZAR INDICADORES
========================================= */

function atualizarIndicadores() {

    const pendentes = tarefas.filter(function(tarefa) {

        return tarefa.status;

    }).length;

    const concluidas = tarefas.filter(function(tarefa) {

        return !tarefa.status;

    }).length;

    totalTarefas.textContent = tarefas.length;

    totalPendentes.textContent = pendentes;

    totalConcluidas.textContent = concluidas;

}


/* =========================================
   21. RENDERIZAR TAREFAS
========================================= */

function render() {

    tabelaTarefas.innerHTML = "";

    const tarefasFiltradas = obterTarefasFiltradas();

    contadorListagem.textContent =
        `${tarefasFiltradas.length} tarefas`;

    atualizarIndicadores();

    if (tarefasFiltradas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 5;

        td.classList.add("vazio");

        td.textContent = tarefas.length === 0
            ? "Nenhuma tarefa cadastrada."
            : "Nenhuma tarefa encontrada.";

        tr.appendChild(td);

        tabelaTarefas.appendChild(tr);

        return;

    }

    tarefasFiltradas.forEach(function(tarefa) {

        const linha = criarLinha(tarefa);

        tabelaTarefas.appendChild(linha);

    });

}


/* =========================================
   22. LIMPAR FORMULÁRIO
========================================= */

function limparFormulario() {

    formTarefa.reset();

    codigoEmEdicao = null;

    tituloFormulario.textContent = "Cadastrar nova tarefa";

    btnSalvar.textContent = "Adicionar tarefa";

    limparErro();

}


/* =========================================
   23. EVENTO DE CADASTRO E EDIÇÃO
========================================= */

formTarefa.addEventListener("submit", function(evento) {

    evento.preventDefault();

    try {

        const titulo = inputTitulo.value.trim();

        const prioridade = Number(inputPrioridade.value);

        if (codigoEmEdicao === null) {

            cadastrarTarefa(titulo, prioridade);

        } else {

            editarTarefa(codigoEmEdicao, titulo);

            alterarPrioridade(codigoEmEdicao, prioridade);

        }

        if (!salvarTarefas()) {

            // Reverte a alteração se não conseguir persistir.
            tarefas = carregarTarefas();

            ajustarCodigo();

            render();

            return;

        }

        limparFormulario();

        render();

    } catch (erro) {

        mostrarErro(erro.message);

    }

});


/* =========================================
   24. EVENTOS DA TABELA
========================================= */

tabelaTarefas.addEventListener("click", function(evento) {

    const botao = evento.target.closest("button[data-acao]");

    if (!botao) {

        return;

    }

    const linha = botao.closest("tr");

    const codigoTarefa = Number(linha.dataset.codigo);

    const acao = botao.dataset.acao;

    try {

        if (acao === "concluir") {

            concluirTarefa(codigoTarefa);

        }

        else if (acao === "editar") {

            const tarefa = buscarTarefa(codigoTarefa);

            if (!tarefa.status) {

                throw new Error(
                    "Não é possível editar uma tarefa concluída."
                );

            }

            codigoEmEdicao = tarefa.codigo;

            inputTitulo.value = tarefa.titulo;

            inputPrioridade.value = tarefa.prioridade;

            tituloFormulario.textContent = "Editar tarefa";

            btnSalvar.textContent = "Salvar alterações";

            limparErro();

            inputTitulo.focus();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            return;

        }

        else if (acao === "excluir") {

            const confirmar = confirm(
                "Deseja realmente excluir esta tarefa?"
            );

            if (!confirmar) {

                return;

            }

            excluirTarefa(codigoTarefa);

        }

        if (!salvarTarefas()) {

            tarefas = carregarTarefas();

            ajustarCodigo();

        }

        render();

    } catch (erro) {

        mostrarErro(erro.message);

    }

});


/* =========================================
   25. EVENTO DE PESQUISA
========================================= */

inputPesquisa.addEventListener("input", function() {

    render();

});


/* =========================================
   26. EVENTO DE FILTRO
========================================= */

filtroStatus.addEventListener("change", function() {

    render();

});


/* =========================================
   27. EVENTO CANCELAR
========================================= */

formTarefa.addEventListener("reset", function() {

    codigoEmEdicao = null;

    tituloFormulario.textContent = "Cadastrar nova tarefa";

    btnSalvar.textContent = "Adicionar tarefa";

    limparErro();

});


/* =========================================
   28. INICIALIZAÇÃO DO SISTEMA
========================================= */

tarefas = carregarTarefas();

ajustarCodigo();

render();

