
let pacientes = JSON.parse(
    localStorage.getItem("pacientes")
) || [];

const formulario = document.getElementById("formAnamnese");
const lista = document.getElementById("listaPacientes");

// Salvar dados
function salvarDados() {
    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );
}

// Cadastrar paciente
function cadastrarPaciente(event) {
    event.preventDefault();

    const paciente = {
        id: Date.now(),

        nome: document.getElementById("nome").value,
        nascimento: document.getElementById("nascimento").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,

        doencas: document.getElementById("doencas").value,
        medicamentos: document.getElementById("medicamentos").value,
        alergias: document.getElementById("alergias").value,
        cirurgias: document.getElementById("cirurgias").value,

        familia: document.getElementById("familia").value,

        atividade: document.getElementById("atividade").value,
        alimentacao: document.getElementById("alimentacao").value,
        sono: document.getElementById("sono").value,

        queixa: document.getElementById("queixa").value,
        observacoes: document.getElementById("observacoes").value
    };

    pacientes.push(paciente);

    salvarDados();
    mostrarPacientes();

    formulario.reset();

    alert("Ficha cadastrada com sucesso!");
}

// Mostrar pacientes
function mostrarPacientes() {
    lista.innerHTML = "";

    pacientes.forEach(paciente => {
        const div = document.createElement("div");
        div.className = "paciente";

        const nome = document.createElement("h3");
        nome.textContent = paciente.nome;

        const telefone = document.createElement("p");
        telefone.textContent = "Telefone: " + paciente.telefone;

        const queixa = document.createElement("p");
        queixa.textContent = "Queixa: " + paciente.queixa;

        const botao = document.createElement("button");
        botao.textContent = "Excluir ficha";

        botao.addEventListener("click", () => {
            excluirPaciente(paciente.id);
        });

        div.append(nome, telefone, queixa, botao);
        lista.appendChild(div);
    });
}

// Excluir paciente
function excluirPaciente(id) {
    if (confirm("Deseja excluir esta ficha?")) {
        pacientes = pacientes.filter(
            paciente => paciente.id !== id
        );

        salvarDados();
        mostrarPacientes();
    }
}

// Eventos
formulario.addEventListener(
    "submit",
    cadastrarPaciente
);

// Carregar fichas salvas
mostrarPacientes();
