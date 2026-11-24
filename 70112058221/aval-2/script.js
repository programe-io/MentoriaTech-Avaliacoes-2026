const eventoForm = document.getElementById("eventoForm");
const inscricaoForm = document.getElementById("inscricaoForm");

const listaEventos = document.getElementById("listaEventos");
const listaParticipantes = document.getElementById("listaParticipantes");
const eventoEscolhido = document.getElementById("eventoEscolhido");
const mensagem = document.getElementById("mensagem");

let eventos = [];
let participantes = [];

function atualizarEventos() {
    listaEventos.replaceChildren();
    eventoEscolhido.replaceChildren();

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione um evento";
    eventoEscolhido.appendChild(opcaoInicial);

    for (let i = 0; i < eventos.length; i++) {
        const evento = eventos[i];

        const card = document.createElement("div");
        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;

        const vagas = document.createElement("p");
        vagas.textContent = "Vagas disponíveis: " +
            (evento.vagas - contarInscritos(evento.id));

        card.append(titulo, vagas);
        listaEventos.appendChild(card);

        if (evento.vagas > contarInscritos(evento.id)) {
            const opcao = document.createElement("option");
            opcao.value = evento.id;
            opcao.textContent = evento.nome;
            eventoEscolhido.appendChild(opcao);
        }
    }
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

eventoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeEvento").value.trim();
    const vagas = Number(document.getElementById("vagasEvento").value);

    if (nome === "" || vagas < 1) {
        alert("Informe um nome e uma quantidade válida de vagas.");
        return;
    }

    const novoEvento = {
        id: Date.now(),
        nome: nome,
        vagas: vagas
    };

    eventos.push(novoEvento);
    atualizarEventos();
    eventoForm.reset();
});

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

    if (contarInscritos(eventoId) >= evento.vagas) {
        mensagem.textContent = "Este evento está lotado!";
        return;
    }

    const inscricao = {
        nome: nome,
        turma: turma,
        eventoId: eventoId
    };

    participantes.push(inscricao);

    mensagem.textContent = "Inscrição realizada com sucesso!";
    inscricaoForm.reset();

    atualizarEventos();
    mostrarParticipantes();
});

function mostrarParticipantes() {
    listaParticipantes.replaceChildren();

    if (participantes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Ainda não existem participantes inscritos.";
        listaParticipantes.appendChild(aviso);
        return;
    }

    for (let i = 0; i < participantes.length; i++) {
        const pessoa = participantes[i];

        const evento = eventos.find(function(item) {
            return item.id === pessoa.eventoId;
        });

        const card = document.createElement("div");
        card.className = "card";

        const nome = document.createElement("h3");
        nome.textContent = pessoa.nome;

        const turma = document.createElement("p");
        turma.textContent = "Turma: " + pessoa.turma;

        const nomeEvento = document.createElement("p");
        nomeEvento.textContent = "Evento: " + (evento ? evento.nome : "Indisponível");

        card.append(nome, turma, nomeEvento);
        listaParticipantes.appendChild(card);
    }
}