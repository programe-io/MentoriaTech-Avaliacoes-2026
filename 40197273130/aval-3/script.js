
let pacientes = [];
let codigoAtual = 1;

// CADASTRAR PACIENTE
function cadastrarPaciente() {
    let nome = prompt("Digite o nome do paciente:");

    if (nome === null || nome.trim().length < 2) {
        alert("Nome inválido!");
        return;
    }

    nome = nome.trim();

    // Receber peso
    let peso = prompt("Digite o peso em kg:");

    if (peso === null) return;

    peso = parseFloat(peso.replace(",", "."));

    if (isNaN(peso) || peso <= 0) {
        alert("Peso inválido!");
        return;
    }

    // Receber altura
    let altura = prompt("Digite a altura em metros (exemplo: 1.65):");

    if (altura === null) return;

    altura = parseFloat(altura.replace(",", "."));

    if (isNaN(altura) || altura <= 0) {
        alert("Altura inválida!");
        return;
    }

    // CALCULAR IMC
    let imc = peso / Math.pow(altura, 2);

    // Verificar resultado
    if (!Number.isFinite(imc) || imc <= 0) {
        alert("Erro ao calcular o IMC!");
        return;
    }

    // Criar paciente
    let paciente = {
        codigo: codigoAtual,
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc
    };

    pacientes.push(paciente);
    codigoAtual++;

    alert(
        "PACIENTE CADASTRADO!\n\n" +
        "Nome: " + nome +
        "\nPeso: " + peso + " kg" +
        "\nAltura: " + altura + " m" +
        "\nIMC: " + imc.toFixed(2)
    );
}

// LISTAR PACIENTES
function listarPacientes() {
    if (pacientes.length === 0) {
        alert("Nenhum paciente cadastrado!");
        return;
    }

    let lista = "===== PACIENTES =====\n\n";

    pacientes.forEach(function(p) {
        lista +=
            "Código: " + p.codigo +
            "\nNome: " + p.nome +
            "\nPeso: " + p.peso + " kg" +
            "\nAltura: " + p.altura + " m" +
            "\nIMC: " + p.imc.toFixed(2) +
            "\n-------------------\n";
    });

    alert(lista);
}

// CONSULTAR PACIENTE
function consultarPaciente() {
    let codigo = Number(prompt("Digite o código do paciente:"));

    let paciente = pacientes.find(function(p) {
        return p.codigo === codigo;
    });

    if (!paciente) {
        alert("Paciente não encontrado!");
        return;
    }

    alert(
        "RESULTADO DO PACIENTE\n\n" +
        "Nome: " + paciente.nome +
        "\nPeso: " + paciente.peso + " kg" +
        "\nAltura: " + paciente.altura + " m" +
        "\nIMC: " + paciente.imc.toFixed(2)
    );
}

// MENU PRINCIPAL
function menu() {
    let opcao;

    do {
        opcao = prompt(
            "===== CONTROLE DE IMC =====\n\n" +
            "1 - Cadastrar paciente\n" +
            "2 - Listar pacientes\n" +
            "3 - Consultar paciente\n" +
            "0 - Sair\n\n" +
            "Escolha uma opção:"
        );

        switch (opcao) {
            case "1":
                cadastrarPaciente();
                break;

            case "2":
                listarPacientes();
                break;

            case "3":
                consultarPaciente();
                break;

            case "0":
                alert("Sistema encerrado!");
                break;

            default:
                if (opcao !== null) {
                    alert("Opção inválida!");
                }
        }

    } while (opcao !== "0" && opcao !== null);
}

// TESTE DO CÁLCULO
function testarCalculo() {
    let resultado = 60 / Math.pow(1.65, 2);

    alert("Teste do IMC:\n60 kg e 1,65 m\nResultado: " + resultado.toFixed(2));
}

// INICIAR
menu();
