
const form = document.getElementById("formAnamnese");
const lista = document.getElementById("listaPacientes");

let pacientes = JSON.parse(
    localStorage.getItem("pacientesAnamnese") || "[]"
);

function salvarDados() {
    localStorage.setItem(
        "pacientesAnamnese",
        JSON.stringify(pacientes)
    );
}

function renderizarPacientes() {
    lista.innerHTML = "";

    if (pacientes.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhum paciente cadastrado.</p>';
        return;
    }

    pacientes.forEach((paciente, index) => {
        const item = document.createElement("div");
        item.className = "paciente";

        const informacoes = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = paciente.nome;

        const telefone = document.createElement("p");
        telefone.textContent = "Telefone: " + paciente.telefone;

        const data = document.createElement("p");
        data.textContent = "Cadastro: " + paciente.dataCadastro;

        informacoes.append(nome, telefone, data);

        const excluir = document.createElement("button");
        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", () => {
            const confirmar = confirm(
                "Deseja realmente excluir este cadastro?"
            );

            if (confirmar) {
                pacientes.splice(index, 1);
                salvarDados();
                renderizarPacientes();
            }
        });

        item.append(informacoes, excluir);
        lista.appendChild(item);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const paciente = {
        id: crypto.randomUUID(),
        nome: document.getElementById("nome").value.trim(),
        nascimento: document.getElementById("nascimento").value,
        cpf: document.getElementById("cpf").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        email: document.getElementById("email").value.trim(),
        profissao: document.getElementById("profissao").value.trim(),

        doencas: document.getElementById("doencas").value,
        medicamentos: document.getElementById("medicamentos").value,
        alergias: document.getElementById("alergias").value,
        cirurgias: document.getElementById("cirurgias").value,

        historicoFamiliar:
            document.getElementById("historicoFamiliar").value,

        atividade: document.getElementById("atividade").value,
        tabagismo: document.getElementById("tabagismo").value,
        alcool: document.getElementById("alcool").value,
        sono: document.getElementById("sono").value,

        queixa: document.getElementById("queixa").value,
        tempoSintomas:
            document.getElementById("tempoSintomas").value,

        observacoes:
            document.getElementById("observacoes").value,

        dataCadastro: new Date().toLocaleDateString("pt-BR")
    };

    pacientes.push(paciente);

    salvarDados();
    renderizarPacientes();

    alert("Anamnese cadastrada com sucesso!");

    form.reset();
});

renderizarPacientes();
