const formulario = document.getElementById("atividadeForm");
const lista = document.getElementById("listaAtividades");

let atividades = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const materia = document.getElementById("materia").value;
    const prazo = document.getElementById("prazo").value;
    const tipo = document.getElementById("tipo").value;

    if (!titulo || !materia || !prazo || !tipo) {
        alert("Preencha todos os campos.");
        return;
    }

    const novaAtividade = {
        titulo: titulo,
        materia: materia,
        prazo: prazo,
        tipo: tipo
    };

    atividades.push(novaAtividade);

    formulario.reset();
    atualizarSistema();
});

function mostrarAtividades() {
    lista.replaceChildren();

    if (atividades.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma atividade cadastrada.";
        lista.appendChild(aviso);
        return;
    }

    for (let i = 0; i < atividades.length; i++) {
        const item = atividades[i];

        const card = document.createElement("article");
        card.className = "atividade";

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        const materia = document.createElement("p");
        materia.textContent = "Matéria: " + item.materia;

        const prazo = document.createElement("p");
        prazo.textContent = "Prazo: " +
            new Date(item.prazo + "T12:00:00").toLocaleDateString("pt-BR");

        const tipo = document.createElement("p");
        tipo.textContent = "Tipo: " + item.tipo;

        card.append(titulo, materia, prazo, tipo);
        lista.appendChild(card);
    }
}

function atualizarSistema() {
    document.getElementById("totalAtividades").textContent =
        atividades.length;

    mostrarAtividades();
}

atualizarSistema();