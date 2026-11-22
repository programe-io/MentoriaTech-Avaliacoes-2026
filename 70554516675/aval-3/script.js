const formulario = document.getElementById("atividadeForm");
const lista = document.getElementById("listaAtividades");

const filtro = document.getElementById("filtro");
const pesquisa = document.getElementById("pesquisa");

const botaoSalvar = document.getElementById("botaoSalvar");
const cancelarEdicao = document.getElementById("cancelarEdicao");

const mensagem = document.getElementById("mensagem");

let atividades = carregarAtividades();
let atividadeEmEdicao = null;

// Recuperar atividades salvas
function carregarAtividades() {
    try {
        const dados = JSON.parse(
            localStorage.getItem("studyFlowAtividades")
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

// Salvar atividades no navegador
function salvarDados() {
    localStorage.setItem(
        "studyFlowAtividades",
        JSON.stringify(atividades)
    );
}

// Cadastrar ou editar atividade
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const materia = document.getElementById("materia").value;
    const prazo = document.getElementById("prazo").value;
    const prioridade = document.getElementById("prioridade").value;

    if (!titulo || !materia || !prazo || !prioridade) {
        mensagem.textContent = "Preencha todos os campos corretamente.";
        return;
    }

    if (atividadeEmEdicao !== null) {
        const atividade = atividades.find(function(item) {
            return item.id === atividadeEmEdicao;
        });

        if (!atividade) return;

        atividade.titulo = titulo;
        atividade.materia = materia;
        atividade.prazo = prazo;
        atividade.prioridade = prioridade;

        mensagem.textContent = "Atividade atualizada com sucesso!";
    } else {
        atividades.push({
            id: Date.now(),
            titulo: titulo,
            materia: materia,
            prazo: prazo,
            prioridade: prioridade,
            concluida: false
        });

        mensagem.textContent = "Atividade cadastrada com sucesso!";
    }

    atividadeEmEdicao = null;
    formulario.reset();

    botaoSalvar.textContent = "Cadastrar atividade";
    cancelarEdicao.hidden = true;

    atualizarSistema();
});

// Preparar edição
function editarAtividade(id) {
    const atividade = atividades.find(function(item) {
        return item.id === id;
    });

    if (!atividade) return;

    atividadeEmEdicao = id;

    document.getElementById("titulo").value = atividade.titulo;
    document.getElementById("materia").value = atividade.materia;
    document.getElementById("prazo").value = atividade.prazo;
    document.getElementById("prioridade").value = atividade.prioridade;

    botaoSalvar.textContent = "Salvar alterações";
    cancelarEdicao.hidden = false;

    document.getElementById("titulo").focus();
}

// Cancelar edição
cancelarEdicao.addEventListener("click", function() {
    atividadeEmEdicao = null;
    formulario.reset();

    botaoSalvar.textContent = "Cadastrar atividade";
    cancelarEdicao.hidden = true;

    mensagem.textContent = "Edição cancelada.";
});

// Excluir atividade
function excluirAtividade(id) {
    const confirmar = confirm("Deseja excluir esta atividade?");

    if (!confirmar) return;

    atividades = atividades.filter(function(item) {
        return item.id !== id;
    });

    if (atividadeEmEdicao === id) {
        atividadeEmEdicao = null;
        formulario.reset();

        botaoSalvar.textContent = "Cadastrar atividade";
        cancelarEdicao.hidden = true;
    }

    mensagem.textContent = "Atividade excluída.";
    atualizarSistema();
}

// Marcar atividade como concluída ou pendente
function concluirAtividade(id) {
    const atividade = atividades.find(function(item) {
        return item.id === id;
    });

    if (!atividade) return;

    atividade.concluida = !atividade.concluida;

    mensagem.textContent = atividade.concluida
        ? "Atividade concluída!"
        : "Atividade voltou para pendente.";

    atualizarSistema();
}

// Mostrar atividades com pesquisa e filtro
function mostrarAtividades() {
    lista.replaceChildren();

    const termo = pesquisa.value.trim().toLowerCase();

    let filtradas = atividades.filter(function(item) {
        return item.titulo.toLowerCase().includes(termo);
    });

    if (filtro.value === "pendentes") {
        filtradas = filtradas.filter(function(item) {
            return !item.concluida;
        });
    }

    if (filtro.value === "concluidas") {
        filtradas = filtradas.filter(function(item) {
            return item.concluida;
        });
    }

    if (filtradas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma atividade encontrada.";
        lista.appendChild(aviso);
        return;
    }

    for (let i = 0; i < filtradas.length; i++) {
        const item = filtradas[i];

        const card = document.createElement("article");
        card.className = "atividade";

        if (item.concluida) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        const materia = document.createElement("p");
        materia.textContent = "Matéria: " + item.materia;

        const prazo = document.createElement("p");
        prazo.textContent = "Prazo: " +
            new Date(item.prazo + "T12:00:00").toLocaleDateString("pt-BR");

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + item.prioridade;

        const status = document.createElement("p");
        status.textContent = item.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const botoes = document.createElement("div");
        botoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.className = "concluir";
        concluir.textContent = item.concluida
            ? "Marcar como pendente"
            : "Concluir";

        concluir.addEventListener("click", function() {
            concluirAtividade(item.id);
        });

        const editar = document.createElement("button");
        editar.className = "editar";
        editar.textContent = "Editar";

        editar.addEventListener("click", function() {
            editarAtividade(item.id);
        });

        const excluir = document.createElement("button");
        excluir.className = "excluir";
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", function() {
            excluirAtividade(item.id);
        });

        botoes.append(concluir, editar, excluir);

        card.append(titulo, materia, prazo, prioridade, status, botoes);
        lista.appendChild(card);
    }
}

// Atualizar estatísticas
function atualizarResumo() {
    const total = atividades.length;

    const concluidas = atividades.filter(function(item) {
        return item.concluida;
    }).length;

    const pendentes = total - concluidas;

    const percentual = total === 0
        ? 0
        : (concluidas / total) * 100;

    document.getElementById("totalTarefas").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("barraProgresso").style.width =
        percentual + "%";

    document.getElementById("percentual").textContent =
        percentual.toFixed(0) + "% concluído";
}

// Relatório de atividades por matéria
function mostrarRelatorio() {
    const relatorio = document.getElementById("relatorioMaterias");

    relatorio.replaceChildren();

    const materias = {};

    for (let i = 0; i < atividades.length; i++) {
        const item = atividades[i];

        if (!materias[item.materia]) {
            materias[item.materia] = {
                total: 0,
                concluidas: 0
            };
        }

        materias[item.materia].total++;

        if (item.concluida) {
            materias[item.materia].concluidas++;
        }
    }

    const nomes = Object.keys(materias);

    if (nomes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma atividade cadastrada.";
        relatorio.appendChild(aviso);
        return;
    }

    for (let i = 0; i < nomes.length; i++) {
        const nome = nomes[i];
        const dados = materias[nome];

        const percentual = (dados.concluidas / dados.total) * 100;

        const card = document.createElement("article");
        card.className = "materia-card";

        const titulo = document.createElement("h3");
        titulo.textContent = nome;

        const quantidade = document.createElement("p");
        quantidade.textContent =
            "Atividades: " + dados.total;

        const concluidas = document.createElement("p");
        concluidas.textContent =
            "Concluídas: " + dados.concluidas;

        const progresso = document.createElement("p");
        progresso.textContent =
            "Progresso: " + percentual.toFixed(0) + "%";

        card.append(titulo, quantidade, concluidas, progresso);
        relatorio.appendChild(card);
    }
}

// Atualizar toda a aplicação
function atualizarSistema() {
    salvarDados();
    atualizarResumo();
    mostrarAtividades();
    mostrarRelatorio();
}

// Atualizar pesquisa e filtros
pesquisa.addEventListener("input", mostrarAtividades);
filtro.addEventListener("change", mostrarAtividades);

// Iniciar aplicação
atualizarSistema();