
const formulario = document.getElementById("form");
const lista = document.getElementById("ocorrencias");

let ocorrencias = JSON.parse(
    localStorage.getItem("ocorrencias")
) || [];

function salvar() {
    localStorage.setItem(
        "ocorrencias",
        JSON.stringify(ocorrencias)
    );
}

function atualizarResumo() {
    document.getElementById("total").textContent =
        ocorrencias.length;

    document.getElementById("concluidas").textContent =
        ocorrencias.filter(o => o.concluida).length;
}

function renderizar() {
    lista.innerHTML = "";

    ocorrencias.forEach(ocorrencia => {
        const div = document.createElement("div");
        div.className = "ocorrencia";

        div.innerHTML = `
            <h3>${ocorrencia.titulo}</h3>
            <p><strong>Tipo:</strong> ${ocorrencia.tipo}</p>
            <p>${ocorrencia.descricao}</p>
            <p class="status">
                ${ocorrencia.concluida ? "Concluída" : "Pendente"}
            </p>

            <button onclick="alternar(${ocorrencia.id})">
                ${ocorrencia.concluida ? "Reabrir" : "Concluir"}
            </button>

            <button onclick="excluir(${ocorrencia.id})">
                Excluir
            </button>
        `;

        lista.appendChild(div);
    });

    atualizarResumo();
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value.trim();

    if (!titulo || !tipo || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const novaOcorrencia = {
        id: Date.now(),
        titulo,
        tipo,
        descricao,
        concluida: false
    };

    ocorrencias.push(novaOcorrencia);

    salvar();
    renderizar();

    formulario.reset();

    alert("Ocorrência registrada com sucesso!");
});

function alternar(id) {
    ocorrencias = ocorrencias.map(o => {
        if (o.id === id) {
            o.concluida = !o.concluida;
        }
        return o;
    });

    salvar();
    renderizar();
}

function excluir(id) {
    if (confirm("Deseja excluir esta ocorrência?")) {
        ocorrencias = ocorrencias.filter(o => o.id !== id);

        salvar();
        renderizar();
    }
}

renderizar();
