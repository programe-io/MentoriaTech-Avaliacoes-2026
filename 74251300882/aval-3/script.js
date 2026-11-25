
let pacientes = JSON.parse(
    localStorage.getItem("pacientesMedicos")
) || [];

function salvarDados() {
    localStorage.setItem(
        "pacientesMedicos",
        JSON.stringify(pacientes)
    );
}

document.getElementById("data").value =
    new Date().toISOString().split("T")[0];

document.getElementById("formPaciente")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const paciente = {
        id: Date.now(),

        nome: document.getElementById("nome").value.trim(),
        idade: document.getElementById("idade").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        sexo: document.getElementById("sexo").value,
        sangue: document.getElementById("sangue").value,

        sintomas: document.getElementById("sintomas").value,
        alergias: document.getElementById("alergias").value,
        medicamentos: document.getElementById("medicamentos").value,
        historico: document.getElementById("historico").value,

        data: document.getElementById("data").value,
        medico: document.getElementById("medico").value,
        observacoes: document.getElementById("observacoes").value
    };

    pacientes.push(paciente);

    salvarDados();
    mostrarPacientes();

    this.reset();

    document.getElementById("data").value =
        new Date().toISOString().split("T")[0];

    alert("Ficha médica cadastrada com sucesso!");
});

function mostrarPacientes() {

    const area = document.getElementById("listaPacientes");

    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    const filtrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(pesquisa) ||
        p.cpf.toLowerCase().includes(pesquisa)
    );

    if (filtrados.length === 0) {
        area.innerHTML = "<p>Nenhum paciente encontrado.</p>";
    } else {

        area.innerHTML = filtrados.map(p => `
            <div class="paciente">

                <h3>👤 ${escapar(p.nome)}</h3>

                <p><strong>Idade:</strong> ${escapar(p.idade)} anos</p>
                <p><strong>CPF:</strong> ${escapar(p.cpf || "Não informado")}</p>
                <p><strong>Telefone:</strong> ${escapar(p.telefone || "Não informado")}</p>
                <p><strong>Sexo:</strong> ${escapar(p.sexo || "Não informado")}</p>
                <p><strong>Tipo sanguíneo:</strong> ${escapar(p.sangue)}</p>

                <p><strong>Queixa:</strong> ${escapar(p.sintomas || "Não informado")}</p>
                <p><strong>Alergias:</strong> ${escapar(p.alergias || "Não informado")}</p>
                <p><strong>Medicamentos:</strong> ${escapar(p.medicamentos || "Não informado")}</p>
                <p><strong>Histórico:</strong> ${escapar(p.historico || "Não informado")}</p>
                <p><strong>Atendimento:</strong> ${escapar(p.data)}</p>
                <p><strong>Profissional:</strong> ${escapar(p.medico || "Não informado")}</p>
                <p><strong>Observações:</strong> ${escapar(p.observacoes || "Nenhuma")}</p>

                <button onclick="excluirPaciente(${p.id})">
                    Excluir ficha
                </button>

            </div>
        `).join("");
    }

    atualizarEstatisticas();
}

function excluirPaciente(id) {

    if (!confirm("Deseja realmente excluir esta ficha?")) {
        return;
    }

    pacientes = pacientes.filter(p => p.id !== id);

    salvarDados();
    mostrarPacientes();
}

function atualizarEstatisticas() {

    document.getElementById("total").textContent =
        pacientes.length;

    document.getElementById("fichas").textContent =
        pacientes.length;

    document.getElementById("atendimentos").textContent =
        pacientes.length;
}

function escapar(valor) {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

mostrarPacientes();
