const formularioEvento = document.getElementById("formularioEvento");
const formularioParticipante = document.getElementById("formularioParticipante");

const listaEventos = document.getElementById("listaEventos");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtro");
const seletor = document.getElementById("eventoSelecionado");

let eventos = [];

try {
    const dadosSalvos = JSON.parse(
        localStorage.getItem("eventizaEventos") || "[]"
    );

    if (Array.isArray(dadosSalvos)) {
        eventos = dadosSalvos.filter(evento =>
            evento &&
            Number.isFinite(evento.id) &&
            typeof evento.nome === "string" &&
            typeof evento.data === "string" &&
            typeof evento.local === "string" &&
            typeof evento.descricao === "string" &&
            Number.isInteger(evento.limite) &&
            evento.limite >= 1 &&
            Array.isArray(evento.participantes)
        );
    }
} catch (erro) {
    eventos = [];
}

let idEdicao = null;

function salvarDados() {
    localStorage.setItem(
        "eventizaEventos",
        JSON.stringify(eventos)
    );
}

function formatarData(data) {
    return data.split("-").reverse().join("/");
}

function atualizarSeletor() {
    const valorAtual = seletor.value;

    seletor.innerHTML =
        '<option value="">Selecione um evento</option>';

    eventos.forEach(evento => {
        const vagas = evento.limite - evento.participantes.length;

        const opcao = document.createElement("option");
        opcao.value = evento.id;
        opcao.textContent =
            `${evento.nome} - ${vagas} vaga(s)`;

        opcao.disabled = vagas <= 0;

        seletor.appendChild(opcao);
    });

    if (eventos.some(evento => evento.id === Number(valorAtual))) {
        seletor.value = valorAtual;
    }
}

formularioEvento.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeEvento").value.trim();
    const data = document.getElementById("dataEvento").value;
    const local = document.getElementById("localEvento").value.trim();
    const limite = Number(document.getElementById("limiteVagas").value);
    const descricao = document.getElementById("descricaoEvento").value.trim();

    if (
        !nome ||
        !data ||
        !local ||
        !descricao ||
        !Number.isInteger(limite) ||
        limite < 1
    ) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    if (idEdicao !== null) {
        const eventoAtual = eventos.find(
            item => item.id === idEdicao
        );

        if (!eventoAtual) {
            alert("Evento não encontrado.");
            return;
        }

        if (limite < eventoAtual.participantes.length) {
            alert("O limite não pode ser menor que o número de inscritos.");
            return;
        }

        eventoAtual.nome = nome;
        eventoAtual.data = data;
        eventoAtual.local = local;
        eventoAtual.limite = limite;
        eventoAtual.descricao = descricao;

        idEdicao = null;

    } else {
        eventos.push({
            id: Date.now() + Math.random(),
            nome,
            data,
            local,
            limite,
            descricao,
            participantes: []
        });
    }

    salvarDados();
    formularioEvento.reset();
    restaurarFormulario();
    atualizarSistema();
});

function editarEvento(id) {
    const evento = eventos.find(item => item.id === id);

    if (!evento) return;

    idEdicao = id;

    document.getElementById("nomeEvento").value = evento.nome;
    document.getElementById("dataEvento").value = evento.data;
    document.getElementById("localEvento").value = evento.local;
    document.getElementById("limiteVagas").value = evento.limite;
    document.getElementById("descricaoEvento").value = evento.descricao;

    document.getElementById("tituloFormulario").textContent =
        "Editar evento";

    document.getElementById("botaoSalvar").textContent =
        "Salvar alterações";

    document.getElementById("cancelarEdicao").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function restaurarFormulario() {
    document.getElementById("tituloFormulario").textContent =
        "Cadastrar evento";

    document.getElementById("botaoSalvar").textContent =
        "Cadastrar evento";

    document.getElementById("cancelarEdicao").hidden = true;
}

document.getElementById("cancelarEdicao").addEventListener(
    "click",
    function() {
        idEdicao = null;
        formularioEvento.reset();
        restaurarFormulario();
    }
);

function excluirEvento(id) {
    const confirmar = confirm(
        "Deseja excluir este evento e suas inscrições?"
    );

    if (!confirmar) return;

    eventos = eventos.filter(item => item.id !== id);

    if (idEdicao === id) {
        idEdicao = null;
        formularioEvento.reset();
        restaurarFormulario();
    }

    salvarDados();
    atualizarSistema();
}

formularioParticipante.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeParticipante").value.trim();
    const email = document.getElementById("emailParticipante")
        .value.trim();

    const eventoId = Number(seletor.value);

    const evento = eventos.find(item => item.id === eventoId);

    if (!evento || !nome || !email) {
        alert("Preencha os dados corretamente.");
        return;
    }

    if (evento.participantes.length >= evento.limite) {
        alert("Este evento não possui mais vagas disponíveis.");
        return;
    }

    const emailExiste = evento.participantes.some(
        participante =>
            participante.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExiste) {
        alert("Este e-mail já está inscrito neste evento.");
        return;
    }

    evento.participantes.push({
        nome,
        email
    });

    salvarDados();
    formularioParticipante.reset();
    atualizarSistema();

    alert("Participante inscrito com sucesso!");
});

function excluirParticipante(eventoId, email) {
    const evento = eventos.find(item => item.id === eventoId);

    if (!evento) return;

    const confirmar = confirm(
        "Deseja remover esta inscrição?"
    );

    if (!confirmar) return;

    evento.participantes = evento.participantes.filter(
        participante =>
            participante.email.toLowerCase() !== email.toLowerCase()
    );

    salvarDados();
    atualizarSistema();
}

function atualizarResumo() {
    const totalEventos = eventos.length;

    const totalParticipantes = eventos.reduce(
        (total, evento) =>
            total + evento.participantes.length,
        0
    );

    const totalVagas = eventos.reduce(
        (total, evento) => total + evento.limite,
        0
    );

    const vagasRestantes = Math.max(
        0,
        totalVagas - totalParticipantes
    );

    document.getElementById("totalEventos").textContent =
        totalEventos;

    document.getElementById("totalParticipantes").textContent =
        totalParticipantes;

    document.getElementById("totalVagas").textContent =
        vagasRestantes;

    document.getElementById("relatorioEventos").textContent =
        totalEventos;

    document.getElementById("relatorioParticipantes").textContent =
        totalParticipantes;

    document.getElementById("relatorioVagas").textContent =
        totalVagas;

    document.getElementById("relatorioPreenchidas").textContent =
        totalParticipantes;

    document.getElementById("relatorioRestantes").textContent =
        vagasRestantes;
}

function mostrarEventos() {
    listaEventos.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();
    const tipoFiltro = filtro.value;

    const filtrados = eventos.filter(evento => {
        const correspondeNome =
            evento.nome.toLowerCase().includes(termo);

        const vagas =
            evento.limite - evento.participantes.length;

        const correspondeFiltro =
            tipoFiltro === "Todos" ||
            (tipoFiltro === "Com vagas" && vagas > 0) ||
            (tipoFiltro === "Lotados" && vagas === 0);

        return correspondeNome && correspondeFiltro;
    });

    if (filtrados.length === 0) {
        listaEventos.textContent = "Nenhum evento encontrado.";
        return;
    }

    filtrados.forEach(evento => {
        const vagas =
            evento.limite - evento.participantes.length;

        const porcentagem =
            (evento.participantes.length / evento.limite) * 100;

        const card = document.createElement("div");
        card.className = "evento";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;

        const data = document.createElement("p");
        data.textContent = "Data: " + formatarData(evento.data);

        const local = document.createElement("p");
        local.textContent = "Local: " + evento.local;

        const descricao = document.createElement("p");
        descricao.textContent = "Descrição: " + evento.descricao;

        const status = document.createElement("span");
        status.className = vagas === 0
            ? "status lotado"
            : "status";

        status.textContent = vagas === 0
            ? "Evento lotado"
            : "Inscrições abertas";

        const informacaoVagas = document.createElement("p");
        informacaoVagas.textContent =
            `Vagas: ${evento.participantes.length} de ${evento.limite} preenchidas. Restam ${vagas}.`;

        const barra = document.createElement("div");
        barra.className = "barra";

        const progresso = document.createElement("div");
        progresso.className = "progresso";
        progresso.style.width = porcentagem + "%";

        barra.appendChild(progresso);

        const areaParticipantes = document.createElement("div");
        areaParticipantes.className = "participantes";

        const tituloParticipantes = document.createElement("h4");
        tituloParticipantes.textContent =
            "Participantes inscritos";

        areaParticipantes.appendChild(tituloParticipantes);

        if (evento.participantes.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhum participante inscrito.";
            areaParticipantes.appendChild(mensagem);
        }

        evento.participantes.forEach(participante => {
            const linha = document.createElement("div");
            linha.className = "participante";

            const informacao = document.createElement("span");
            informacao.textContent =
                `${participante.nome} - ${participante.email}`;

            const remover = document.createElement("button");
            remover.textContent = "Remover inscrição";

            remover.addEventListener("click", function() {
                excluirParticipante(evento.id, participante.email);
            });

            linha.append(informacao, remover);
            areaParticipantes.appendChild(linha);
        });

        const acoes = document.createElement("div");
        acoes.className = "acoes-evento";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar evento";
        botaoEditar.className = "editar";

        botaoEditar.addEventListener("click", function() {
            editarEvento(evento.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir evento";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirEvento(evento.id);
        });

        acoes.append(botaoEditar, botaoExcluir);

        card.append(
            titulo,
            data,
            local,
            descricao,
            status,
            informacaoVagas,
            barra,
            areaParticipantes,
            acoes
        );

        listaEventos.appendChild(card);
    });
}

function atualizarSistema() {
    atualizarResumo();
    atualizarSeletor();
    mostrarEventos();
}

pesquisa.addEventListener("input", mostrarEventos);
filtro.addEventListener("change", mostrarEventos);

atualizarSistema();