
const formulario = document.getElementById("formAnamnese");
const listaPacientes = document.getElementById("listaPacientes");
const pesquisa = document.getElementById("pesquisa");

let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const paciente = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        nascimento: document.getElementById("nascimento").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        sexo: document.getElementById("sexo").value,
        profissao: document.getElementById("profissao").value,
        doencas: document.getElementById("doencas").value,
        medicamentos: document.getElementById("medicamentos").value,
        alergias: document.getElementById("alergias").value,
        cirurgias: document.getElementById("cirurgias").value,
        peso: document.getElementById("peso").value,
        altura: document.getElementById("altura").value,
        pressao: document.getElementById("pressao").value,
        temperatura: document.getElementById("temperatura").value,
        queixa: document.getElementById("queixa").value,
        sintomas: document.getElementById("sintomas").value,
        observacoes: document.getElementById("observacoes").value
    };

    pacientes.push(paciente);

    salvarDados();
    formulario.reset();
    mostrarPacientes();

    alert("Anamnese cadastrada com sucesso!");
});

function salvarDados() {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

function mostrarPacientes(filtro = "") {
    listaPacientes.replaceChildren();

    const encontrados = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    if (encontrados.length === 0) {
        listaPacientes.textContent = "Nenhum paciente encontrado.";
        return;
    }

    encontrados.forEach(paciente => {
        const card = document.createElement("article");
        card.className = "paciente";

        const titulo = document.createElement("h3");
        titulo.textContent = paciente.nome;

        const campos = [
            ["Nascimento", paciente.nascimento],
            ["Telefone", paciente.telefone],
            ["CPF", paciente.cpf],
            ["Sexo", paciente.sexo],
            ["Profissão", paciente.profissao],
            ["Doenças", paciente.doencas],
            ["Medicamentos", paciente.medicamentos],
            ["Alergias", paciente.alergias],
            ["Cirurgias", paciente.cirurgias],
            ["Peso", paciente.peso ? paciente.peso + " kg" : ""],
            ["Altura", paciente.altura ? paciente.altura + " cm" : ""],
            ["Pressão arterial", paciente.pressao],
            ["Temperatura", paciente.temperatura],
            ["Queixa principal", paciente.queixa],
            ["Sintomas", paciente.sintomas],
            ["Observações", paciente.observacoes]
        ];

        card.appendChild(titulo);

        campos.forEach(([nome, valor]) => {
            if (!valor) return;

            const paragrafo = document.createElement("p");
            paragrafo.textContent = nome + ": " + valor;
            card.appendChild(paragrafo);
        });

        const botao = document.createElement("button");
        botao.textContent = "Excluir cadastro";
        botao.className = "excluir";

        botao.addEventListener("click", function() {
            if (confirm("Deseja excluir este cadastro?")) {
                pacientes = pacientes.filter(p => p.id !== paciente.id);
                salvarDados();
                mostrarPacientes(pesquisa.value);
            }
        });

        card.appendChild(botao);
        listaPacientes.appendChild(card);
    });
}

pesquisa.addEventListener("input", function() {
    mostrarPacientes(pesquisa.value);
});

mostrarPacientes();
