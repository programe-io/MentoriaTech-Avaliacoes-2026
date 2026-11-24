let eventos = [];
let proximoId = 1;

const formularioEvento = document.getElementById("formularioEvento");
const formularioParticipante = document.getElementById("formularioParticipante");
const listaEventos = document.getElementById("listaEventos");
const pesquisa = document.getElementById("pesquisa");
const seletor = document.getElementById("eventoSelecionado");

formularioEvento.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeEvento").value.trim();
    const data = document.getElementById("dataEvento").value;
    const local = document.getElementById("localEvento").value.trim();

    if (!nome || !data || !local) {
        alert("Preencha todos os campos.");
        return;
    }

    eventos.push({
        id: proximoId++,
        nome,
        data,
        local,
        participantes: []
    });

    formularioEvento.reset();
    atualizarSistema();
});

formularioParticipante.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeParticipante").value.trim();
    const email = document.getElementById("emailParticipante").value.trim();
    const eventoId = Number(seletor.value);

    const evento = eventos.find(item => item.id === eventoId);

    if (!evento || !nome || !email) {
        alert("Preencha os dados corretamente.");
        return;
    }

    const emailExiste = evento.participantes.some(
        participante => participante.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExiste) {
        alert("Este e-mail já está inscrito neste evento.");
        return;
    }

    evento.participantes.push({ nome, email });

    formularioParticipante.reset();
    atualizarSistema();

    alert("Inscrição realizada com sucesso!");
});

function atualizarSeletor() {
    const valorAtual = seletor.value;

    seletor.innerHTML = '<option value="">Selecione um evento</option>';

    eventos.forEach(evento => {
        const opcao = document.createElement("option");
        opcao.value = evento.id;
        opcao.textContent = evento.nome;
        seletor.appendChild(opcao);
    });

    if (eventos.some(evento => evento.id === Number(valorAtual))) {
        seletor.value = valorAtual;
    }
}

function mostrarEventos() {
    listaEventos.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();

    const filtrados = eventos.filter(evento =>
        evento.nome.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        listaEventos.textContent = "Nenhum evento encontrado.";
        return;
    }

    filtrados.forEach(evento => {
        const card = document.createElement("div");
        card.className = "evento";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;

        const data = document.createElement("p");
        data.textContent = "Data: " +
            evento.data.split("-").reverse().join("/");

        const local = document.createElement("p");
        local.textContent = "Local: " + evento.local;

        const inscritos = document.createElement("p");
        inscritos.className = "inscritos";
        inscritos.textContent =
            "Participantes inscritos: " + evento.participantes.length;

        const botao = document.createElement("button");
        botao.textContent = "Excluir evento";
        botao.className = "excluir";

        botao.addEventListener("click", function() {
            excluirEvento(evento.id);
        });

        card.append(titulo, data, local, inscritos, botao);
        listaEventos.appendChild(card);
    });
}

function excluirEvento(id) {
    const confirmar = confirm("Deseja excluir este evento?");

    if (!confirmar) return;

    eventos = eventos.filter(evento => evento.id !== id);
    atualizarSistema();
}

function atualizarSistema() {
    atualizarSeletor();
    mostrarEventos();
}

pesquisa.addEventListener("input", mostrarEventos);

atualizarSistema();