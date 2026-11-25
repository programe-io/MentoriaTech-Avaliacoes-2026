
let pacientes = [];

try {
    pacientes = JSON.parse(
        localStorage.getItem("pacientes") || "[]"
    );

    if (!Array.isArray(pacientes)) {
        pacientes = [];
    }
} catch (erro) {
    pacientes = [];
}

const form = document.getElementById("formPaciente");

function salvarDados() {
    try {
        localStorage.setItem(
            "pacientes",
            JSON.stringify(pacientes)
        );
        return true;
    } catch (erro) {
        alert("Erro ao salvar os dados no navegador.");
        return false;
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value;

    if (!nome || idade === "") {
        alert("Preencha o nome e a idade do paciente!");
        return;
    }

    const indice = document.getElementById("indice").value;

    const paciente = {
        nome: nome,
        idade: idade,
        sexo: document.getElementById("sexo").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        sangue: document.getElementById("sangue").value,
        alergias: document.getElementById("alergias").value,
        historico: document.getElementById("historico").value,
        diagnostico: document.getElementById("diagnostico").value,
        observacoes: document.getElementById("observacoes").value
    };

    if (indice === "") {
        pacientes.push(paciente);
    } else {
        pacientes[Number(indice)] = paciente;
    }

    if (!salvarDados()) return;

    mostrarPacientes();
    limparFormulario();

    alert(
        indice === ""
        ? "Paciente cadastrado com sucesso!"
        : "Paciente atualizado com sucesso!"
    );
});

function mostrarPacientes() {
    const lista = document.getElementById("listaPacientes");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    document.getElementById("total").textContent =
        pacientes.length;

    const filtrados = pacientes
        .map((p, i) => ({ p, i }))
        .filter(item =>
            item.p.nome.toLowerCase().includes(pesquisa)
        );

    if (filtrados.length === 0) {
        lista.textContent = "Nenhum paciente encontrado.";
        return;
    }

    filtrados.forEach(({ p, i }) => {
        const card = document.createElement("div");
        card.className = "paciente";

        const titulo = document.createElement("h3");
        titulo.textContent = "👤 " + p.nome;
        card.appendChild(titulo);

        Object.entries({
            "Idade": p.idade,
            "Sexo": p.sexo,
            "CPF": p.cpf,
            "Telefone": p.telefone,
            "Tipo sanguíneo": p.sangue,
            "Alergias": p.alergias,
            "Histórico": p.historico,
            "Diagnóstico": p.diagnostico,
            "Observações": p.observacoes
        }).forEach(([campo, valor]) => {
            const paragrafo = document.createElement("p");
            paragrafo.textContent =
                campo + ": " + (valor || "Não informado");
            card.appendChild(paragrafo);
        });

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.type = "button";
        editar.onclick = () => editarPaciente(i);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.type = "button";
        excluir.onclick = () => excluirPaciente(i);

        acoes.append(editar, excluir);
        card.appendChild(acoes);
        lista.appendChild(card);
    });
}

function editarPaciente(i) {
    const p = pacientes[i];

    Object.keys(p).forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) elemento.value = p[campo];
    });

    document.getElementById("indice").value = i;

    document.getElementById("tituloFormulario").textContent =
        "Editar Paciente";

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function excluirPaciente(i) {
    if (confirm("Deseja excluir este paciente?")) {
        pacientes.splice(i, 1);
        salvarDados();
        mostrarPacientes();
    }
}

function limparFormulario() {
    form.reset();

    document.getElementById("indice").value = "";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Paciente";

    document.getElementById("btnSalvar").textContent =
        "Cadastrar Paciente";
}

document.getElementById("pesquisa").addEventListener(
    "input",
    mostrarPacientes
);

mostrarPacientes();
