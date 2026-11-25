
let pacientes = JSON.parse(
    localStorage.getItem("pacientes")
) || [];

const form = document.getElementById("formFicha");

function salvarDados() {
    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const paciente = {
        id: Date.now(),
        nome: document.getElementById("nome").value.trim(),
        nascimento: document.getElementById("nascimento").value,
        sangue: document.getElementById("sangue").value,
        telefone: document.getElementById("telefone").value,
        alergias: document.getElementById("alergias").value,
        medicamentos: document.getElementById("medicamentos").value,
        historico: document.getElementById("historico").value,
        observacoes: document.getElementById("observacoes").value
    };

    if (!paciente.nome) {
        alert("Informe o nome do paciente!");
        return;
    }

    pacientes.push(paciente);

    salvarDados();
    mostrarPacientes();
    form.reset();

    alert("Ficha médica cadastrada com sucesso!");
});

function mostrarPacientes() {
    const lista = document.getElementById("listaPacientes");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    const filtrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(pesquisa)
    );

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.textContent = "Nenhum paciente encontrado.";
    }

    filtrados.forEach(p => {
        const div = document.createElement("div");
        div.className = "paciente";

        const titulo = document.createElement("h3");
        titulo.textContent = "👤 " + p.nome;

        const nascimento = document.createElement("p");
        nascimento.textContent = "Nascimento: " +
            (p.nascimento || "Não informado");

        const sangue = document.createElement("p");
        sangue.textContent = "Tipo sanguíneo: " +
            (p.sangue || "Não informado");

        const telefone = document.createElement("p");
        telefone.textContent = "Telefone: " +
            (p.telefone || "Não informado");

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const ver = document.createElement("button");
        ver.className = "visualizar";
        ver.textContent = "Ver ficha";
        ver.onclick = () => verFicha(p.id);

        const excluir = document.createElement("button");
        excluir.className = "excluir";
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirPaciente(p.id);

        acoes.append(ver, excluir);
        div.append(titulo, nascimento, sangue, telefone, acoes);
        lista.appendChild(div);
    });

    document.getElementById("total").textContent =
        pacientes.length;

    document.getElementById("consultas").textContent =
        pacientes.length;
}

function verFicha(id) {
    const p = pacientes.find(p => p.id === id);

    if (!p) return;

    const dados = [
        "FICHA MÉDICA",
        "Nome: " + p.nome,
        "Nascimento: " + (p.nascimento || "Não informado"),
        "Tipo sanguíneo: " + (p.sangue || "Não informado"),
        "Telefone: " + (p.telefone || "Não informado"),
        "Alergias: " + (p.alergias || "Não informado"),
        "Medicamentos: " + (p.medicamentos || "Não informado"),
        "Histórico: " + (p.historico || "Não informado"),
        "Observações: " + (p.observacoes || "Não informado")
    ].join("\n\n");

    alert(dados);
}

function excluirPaciente(id) {
    if (!confirm("Deseja realmente excluir esta ficha?")) {
        return;
    }

    pacientes = pacientes.filter(p => p.id !== id);

    salvarDados();
    mostrarPacientes();
}

document.getElementById("pesquisa")
    .addEventListener("input", mostrarPacientes);

mostrarPacientes();
