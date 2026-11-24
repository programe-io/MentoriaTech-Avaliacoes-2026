
// PROJETO FICHA DE ANAMNESE - JAVASCRIPT

let pacientes = [];

// Cadastrar paciente
function cadastrarPaciente(nome, idade, telefone) {
    let paciente = {
        id: pacientes.length + 1,
        nome: nome,
        idade: idade,
        telefone: telefone,
        historico: "",
        alergias: "",
        medicamentos: "",
        observacoes: ""
    };

    pacientes.push(paciente);

    console.log("Paciente cadastrado com sucesso!");
}

// Registrar informações de saúde
function preencherAnamnese(id, historico, alergias, medicamentos, observacoes) {
    let paciente = pacientes.find(p => p.id === id);

    if (paciente) {
        paciente.historico = historico;
        paciente.alergias = alergias;
        paciente.medicamentos = medicamentos;
        paciente.observacoes = observacoes;

        console.log("Ficha de anamnese preenchida!");
    } else {
        console.log("Paciente não encontrado!");
    }
}

// Listar pacientes
function listarPacientes() {
    console.log("=== PACIENTES CADASTRADOS ===");

    pacientes.forEach(paciente => {
        console.log(
            `ID: ${paciente.id} |
            Nome: ${paciente.nome} |
            Idade: ${paciente.idade} |
            Telefone: ${paciente.telefone}`
        );
    });
}

// Consultar ficha
function consultarFicha(id) {
    let paciente = pacientes.find(p => p.id === id);

    if (paciente) {
        console.log("=== FICHA DE ANAMNESE ===");
        console.log(paciente);
    } else {
        console.log("Ficha não encontrada!");
    }
}

// Excluir paciente
function excluirPaciente(id) {
    let quantidadeAnterior = pacientes.length;

    pacientes = pacientes.filter(p => p.id !== id);

    if (pacientes.length < quantidadeAnterior) {
        console.log("Ficha excluída com sucesso!");
    } else {
        console.log("Paciente não encontrado!");
    }
}

// EXEMPLOS DE USO

cadastrarPaciente("Maria Silva", 25, "99999-0000");

preencherAnamnese(
    1,
    "Sem histórico informado",
    "Nenhuma alergia informada",
    "Nenhum medicamento informado",
    "Paciente em avaliação"
);

listarPacientes();

consultarFicha(1);

// excluirPaciente(1);

