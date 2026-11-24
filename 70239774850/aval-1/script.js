const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

let eventos = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = document.getElementById("data").value;
    const local = document.getElementById("local").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || !data || !local || !descricao) {
        alert("Preencha todos os campos.");
        return;
    }

    eventos.push({
        nome,
        data,
        local,
        descricao
    });

    mostrarEventos();
    formulario.reset();
});

function mostrarEventos() {
    lista.innerHTML = "";

    if (eventos.length === 0) {
        lista.textContent = "Nenhum evento cadastrado.";
        return;
    }

    eventos.forEach(function(evento) {
        const card = document.createElement("div");
        card.className = "evento";

        const titulo = document.createElement("h3");
        titulo.textContent = evento.nome;

        const data = document.createElement("p");
        data.textContent = "Data: " +
            evento.data.split("-").reverse().join("/");

        const local = document.createElement("p");
        local.textContent = "Local: " + evento.local;

        const descricao = document.createElement("p");
        descricao.textContent = evento.descricao;

        card.append(titulo, data, local, descricao);
        lista.appendChild(card);
    });
}

mostrarEventos();