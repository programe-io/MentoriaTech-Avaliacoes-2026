
const form = document.getElementById("medicalForm");

let pacientes = JSON.parse(
    localStorage.getItem("royalPacientes") || "[]"
);

function salvarDados() {
    localStorage.setItem(
        "royalPacientes",
        JSON.stringify(pacientes)
    );
}

function atualizarPainel() {
    document.getElementById("total").textContent =
        pacientes.length;

    document.getElementById("consultas").textContent =
        pacientes.length;

    const lista = document.getElementById("patientList");

    if (pacientes.length === 0) {
        lista.innerHTML =
            '<p class="empty">Nenhum paciente cadastrado.</p>';
        return;
    }

    lista.innerHTML = "";

    pacientes.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "patient";

        const nome = document.createElement("strong");
        nome.textContent = p.nome;

        const detalhe = document.createElement("small");
        detalhe.textContent =
            "Tipo sanguíneo: " + p.sangue;

        const visualizar = document.createElement("button");
        visualizar.textContent = "Visualizar";
        visualizar.onclick = () => visualizarFicha(index);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "delete";
        excluir.onclick = () => excluirPaciente(index);

        div.append(nome, detalhe, document.createElement("br"),
            visualizar, excluir);

        lista.appendChild(div);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const paciente = {
        nome: document.getElementById("nome").value,
        nascimento: document.getElementById("nascimento").value,
        sexo: document.getElementById("sexo").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        sangue: document.getElementById("sangue").value,
        pressao: document.getElementById("pressao").value,
        altura: document.getElementById("altura").value,
        peso: document.getElementById("peso").value,
        alergias: document.getElementById("alergias").value,
        medicamentos: document.getElementById("medicamentos").value,
        historico: document.getElementById("historico").value,
        observacoes: document.getElementById("observacoes").value
    };

    pacientes.push(paciente);

    salvarDados();
    atualizarPainel();
    form.reset();

    alert("Ficha médica cadastrada com sucesso!");
});

function visualizarFicha(index) {
    const p = pacientes[index];

    const dados = `
FICHA MÉDICA - ROYAL CARE

Nome: ${p.nome}
Nascimento: ${p.nascimento}
Sexo: ${p.sexo}
CPF: ${p.cpf}
Telefone: ${p.telefone}
Endereço: ${p.endereco}

Tipo sanguíneo: ${p.sangue}
Pressão: ${p.pressao}
Altura: ${p.altura} cm
Peso: ${p.peso} kg

Alergias: ${p.alergias}
Medicamentos: ${p.medicamentos}
Histórico: ${p.historico}
Observações: ${p.observacoes}
    `;

    alert(dados);
}

function excluirPaciente(index) {
    if (confirm("Deseja excluir esta ficha?")) {
        pacientes.splice(index, 1);
        salvarDados();
        atualizarPainel();
    }
}

atualizarPainel();
