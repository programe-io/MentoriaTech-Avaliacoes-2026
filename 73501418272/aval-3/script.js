const form = document.getElementById("formAnamnese");
const listaFichas = document.getElementById("listaFichas");

let fichas = JSON.parse(localStorage.getItem("fichasAnamnese")) || [];

function salvarDados() {
    localStorage.setItem("fichasAnamnese", JSON.stringify(fichas));
}

function escapar(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const ficha = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        nascimento: document.getElementById("nascimento").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        profissao: document.getElementById("profissao").value,
        estadoCivil: document.getElementById("estadoCivil").value,
        doencas: document.getElementById("doencas").value,
        medicamentos: document.getElementById("medicamentos").value,
        alergias: document.getElementById("alergias").value,
        cirurgias: document.getElementById("cirurgias").value,
        atividade: document.getElementById("atividade").value,
        alimentacao: document.getElementById("alimentacao").value,
        sono: document.getElementById("sono").value,
        queixa: document.getElementById("queixa").value,
        observacoes: document.getElementById("observacoes").value
    };

    fichas.push(ficha);
    salvarDados();
    mostrarFichas();

    form.reset();
    alert("Ficha cadastrada com sucesso!");
});

function mostrarFichas() {
    listaFichas.innerHTML = "";

    fichas.forEach(ficha => {
        const div = document.createElement("div");
        div.className = "ficha";

        div.innerHTML = `
            <strong>${escapar(ficha.nome)}</strong>
            <p>Telefone: ${escapar(ficha.telefone || "Não informado")}</p>
            <p>Queixa: ${escapar(ficha.queixa || "Não informada")}</p>
            <button type="button" onclick="excluirFicha(${ficha.id})">
                Excluir ficha
            </button>
        `;

        listaFichas.appendChild(div);
    });

    if (fichas.length === 0) {
        listaFichas.innerHTML = "<p>Nenhuma ficha cadastrada.</p>";
    }
}

function excluirFicha(id) {
    if (confirm("Deseja realmente excluir esta ficha?")) {
        fichas = fichas.filter(ficha => ficha.id !== id);
        salvarDados();
        mostrarFichas();
    }
}

mostrarFichas();
