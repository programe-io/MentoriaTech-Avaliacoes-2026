const formulario = document.getElementById("eventoForm");
const listaEventos = document.getElementById("listaEventos");

let eventos = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;
    const local = document.getElementById("local").value.trim();
    const vagas = Number(document.getElementById("vagas").value);

    if (!nome || !data || !horario || !local || vagas < 1) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const novoEvento = {
        nome: nome,
        data: data,
        horario: horario,
        local: local,
        vagas: vagas
    };

    eventos.push(novoEvento);

    mostrarEventos();
    formulario.reset();
});

function mostrarEventos() {
    listaEventos.replaceChildren();

    if (eventos.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum evento cadastrado.";
        listaEventos.appendChild(mensagem);
        return;
    }

    for (let i = 0; i < eventos.length; i++) {
        const evento = eventos[i];

        const card = document.createElement("article");
        card.className = "evento";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;

        const data = document.createElement("p");
        data.textContent = "Data: " + evento.data;

        const horario = document.createElement("p");
        horario.textContent = "Horário: " + evento.horario;

        const local = document.createElement("p");
        local.textContent = "Local: " + evento.local;

        const vagas = document.createElement("p");
        vagas.textContent = "Vagas disponíveis: " + evento.vagas;

        card.append(titulo, data, horario, local, vagas);
        listaEventos.appendChild(card);
    }
}