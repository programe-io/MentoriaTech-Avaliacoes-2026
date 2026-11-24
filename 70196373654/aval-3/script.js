const eventoForm = document.getElementById("eventoForm");
const inscricaoForm = document.getElementById("inscricaoForm");

const listaEventos = document.getElementById("listaEventos");
const listaParticipantes = document.getElementById("listaParticipantes");
const eventoEscolhido = document.getElementById("eventoEscolhido");
const mensagem = document.getElementById("mensagem");

const botaoEvento = document.getElementById("botaoEvento");
const cancelarEdicao = document.getElementById("cancelarEdicao");

let eventos = JSON.parse(localStorage.getItem("conectaEventos")) || [];
let participantes = JSON.parse(localStorage.getItem("conectaParticipantes")) || [];
let eventoEmEdicao = null;

function salvarDados() {
    localStorage.setItem("conectaEventos", JSON.stringify(eventos));
    localStorage.setItem("conectaParticipantes", JSON.stringify(participantes));
}

function contarInscritos(eventoId) {
    let total = 0;

    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i].eventoId === eventoId) {
            total++;
        }
    }

    return total;
}

function atualizarSistema() {
    salvarDados();
    mostrarEventos();
    mostrarParticipantes();
    atualizarResumo();
}

function atualizarResumo() {
    document.getElementById("totalEventos").textContent = eventos.length;
    document.getElementById("totalInscritos").textContent = participantes.length;

    const concluidos = eventos.filter(function(evento) {
        return evento.concluido;
    });

    document.getElementById("totalConcluidos").textContent = concluidos.length;
}

function atualizarOpcoes() {
    eventoEscolhido.replaceChildren();

    const inicial = document.createElement("option");
    inicial.value = "";
    inicial.textContent = "Selecione um evento";
    eventoEscolhido.appendChild(inicial);

    for (let i = 0; i < eventos.length; i++) {
        const evento = eventos[i];

        const vagasRestantes = evento.vagas - contarInscritos(evento.id);

        if (!evento.concluido && vagasRestantes > 0) {
            const opcao = document.createElement("option");
            opcao.value = evento.id;
            opcao.textContent = evento.nome + " (" + vagasRestantes + " vagas)";
            eventoEscolhido.appendChild(opcao);
        }
    }
}

eventoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeEvento").value.trim();
    const data = document.getElementById("dataEvento").value;
    const local = document.getElementById("localEvento").value.trim();
    const vagas = Number(document.getElementById("vagasEvento").value);

    if (!nome || !data || !local || !Number.isInteger(vagas) || vagas < 1) {
        alert("Preencha os campos corretamente.");
        return;
    }

    if (eventoEmEdicao !== null) {
        const evento = eventos.find(function(item) {
            return item.id === eventoEmEdicao;
        });

        if (!evento) return;

        if (vagas < contarInscritos(evento.id)) {
            alert("A quantidade de vagas não pode ser menor que as inscrições existentes.");
            return;
        }

        evento.nome = nome;
        evento.data = data;
        evento.local = local;
        evento.vagas = vagas;

        mensagem.textContent = "Evento atualizado com sucesso!";
    } else {
        eventos.push({
            id: Date.now(),
            nome: nome,
            data: data,
            local: local,
            vagas: vagas,
            concluido: false
        });

        mensagem.textContent = "Evento cadastrado com sucesso!";
    }

    cancelarEdicao.hidden = true;
    botaoEvento.textContent = "Cadastrar evento";
    eventoEmEdicao = null;
    eventoForm.reset();

    atualizarSistema();
});

function editarEvento(id) {
    const evento = eventos.find(function(item) {
        return item.id === id;
    });

    if (!evento) return;

    eventoEmEdicao = id;

    document.getElementById("nomeEvento").value = evento.nome;
    document.getElementById("dataEvento").value = evento.data;
    document.getElementById("localEvento").value = evento.local;
    document.getElementById("vagasEvento").value = evento.vagas;

    botaoEvento.textContent = "Salvar alterações";
    cancelarEdicao.hidden = false;

    document.getElementById("nomeEvento").focus();
}

cancelarEdicao.addEventListener("click", function() {
    eventoEmEdicao = null;
    eventoForm.reset();
    botaoEvento.textContent = "Cadastrar evento";
    cancelarEdicao.hidden = true;
    mensagem.textContent = "Edição cancelada.";
});

function excluirEvento(id) {
    const evento = eventos.find(function(item) {
        return item.id === id;
    });

    if (!evento) return;

    const confirmar = confirm("Deseja excluir o evento " + evento.nome + " e suas inscrições?");

    if (!confirmar) return;

    eventos = eventos.filter(function(item) {
        return item.id !== id;
    });

    participantes = participantes.filter(function(pessoa) {
        return pessoa.eventoId !== id;
    });

    if (eventoEmEdicao === id) {
        eventoEmEdicao = null;
        eventoForm.reset();
        botaoEvento.textContent = "Cadastrar evento";
        cancelarEdicao.hidden = true;
    }

    mensagem.textContent = "Evento excluído.";
    atualizarSistema();
}

function alternarConclusao(id) {
    const evento = eventos.find(function(item) {
        return item.id === id;
    });

    if (!evento) return;

    evento.concluido = !evento.concluido;
    atualizarSistema();
}

inscricaoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeAluno").value.trim();
    const turma = document.getElementById("turmaAluno").value.trim();
    const eventoId = Number(eventoEscolhido.value);

    const evento = eventos.find(function(item) {
        return item.id === eventoId;
    });

    if (!nome || !turma || !evento) {
        mensagem.textContent = "Preencha os dados e selecione um evento.";
        return;
    }

    if (evento.concluido) {
        mensagem.textContent = "Este evento já foi concluído.";
        return;
    }

    if (contarInscritos(eventoId) >= evento.vagas) {
        mensagem.textContent = "Não há vagas disponíveis.";
        return;
    }

    const duplicado = participantes.some(function(pessoa) {
        return pessoa.nome.toLowerCase() === nome.toLowerCase()
            && pessoa.turma.toLowerCase() === turma.toLowerCase()
            && pessoa.eventoId === eventoId;
    });

    if (duplicado) {
        mensagem.textContent = "Este estudante já está inscrito nesse evento.";
        return;
    }

    participantes.push({
        id: Date.now(),
        nome: nome,
        turma: turma,
        eventoId: eventoId
    });

    mensagem.textContent = "Inscrição realizada com sucesso!";
    inscricaoForm.reset();

    atualizarSistema();
});

function cancelarInscricao(id) {
    const confirmar = confirm("Deseja cancelar esta inscrição?");

    if (!confirmar) return;

    participantes = participantes.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    mensagem.textContent = "Inscrição cancelada.";
    atualizarSistema();
}

function mostrarEventos() {
    listaEventos.replaceChildren();

    if (eventos.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum evento cadastrado.";
        listaEventos.appendChild(aviso);
    }

    for (let i = 0; i < eventos.length; i++) {
        const evento = eventos[i];
        const inscritos = contarInscritos(evento.id);
        const vagasRestantes = evento.vagas - inscritos;

        const card = document.createElement("article");
        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;

        const data = document.createElement("p");
        data.textContent = "Data: " + evento.data;

        const local = document.createElement("p");
        local.textContent = "Local: " + evento.local;

        const vagas = document.createElement("p");
        vagas.textContent = "Inscritos: " + inscritos +
            " | Vagas restantes: " + vagasRestantes;

        const status = document.createElement("p");
        status.className = "status";
        status.textContent = evento.concluido ? "Concluído" : "Em andamento";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.addEventListener("click", function() {
            editarEvento(evento.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.addEventListener("click", function() {
            excluirEvento(evento.id);
        });

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = evento.concluido ? "Reabrir" : "Concluir";
        botaoConcluir.className = "concluir";
        botaoConcluir.addEventListener("click", function() {
            alternarConclusao(evento.id);
        });

        acoes.append(botaoEditar, botaoExcluir, botaoConcluir);
        card.append(titulo, data, local, vagas, status, acoes);
        listaEventos.appendChild(card);
    }

    atualizarOpcoes();
}

function mostrarParticipantes() {
    listaParticipantes.replaceChildren();

    if (participantes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum participante inscrito.";
        listaParticipantes.appendChild(aviso);
        return;
    }

    for (let i = 0; i < participantes.length; i++) {
        const pessoa = participantes[i];

        const evento = eventos.find(function(item) {
            return item.id === pessoa.eventoId;
        });

        const card = document.createElement("article");
        card.className = "card";

        const nome = document.createElement("h3");
        nome.textContent = pessoa.nome;

        const turma = document.createElement("p");
        turma.textContent = "Turma: " + pessoa.turma;

        const nomeEvento = document.createElement("p");
        nomeEvento.textContent = "Evento: " + (evento ? evento.nome : "Indisponível");

        const botaoCancelar = document.createElement("button");
        botaoCancelar.textContent = "Cancelar inscrição";
        botaoCancelar.className = "excluir";
        botaoCancelar.addEventListener("click", function() {
            cancelarInscricao(pessoa.id);
        });

        card.append(nome, turma, nomeEvento, botaoCancelar);
        listaParticipantes.appendChild(card);
    }
}

atualizarSistema();