
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("tabela");
const mensagem = document.getElementById("mensagem");

let pacientes = [];
let contador = 1;

// Classificação do IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso adequado";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else if (imc < 35) {
        return "Obesidade grau I";
    } else if (imc < 40) {
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }
}

// Salvar dados no localStorage
function salvarDados() {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

// Mostrar pacientes na tabela
function render() {
    tabela.innerHTML = "";

    pacientes.forEach(function(paciente) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${paciente.codigo}</td>
            <td>${paciente.nome}</td>
            <td>${paciente.peso} kg</td>
            <td>${paciente.altura} m</td>
            <td>${paciente.imc.toLocaleString("pt-BR")}</td>
            <td>${paciente.classificacao}</td>
            <td>
                <button class="apagar"
                    onclick="apagarPaciente(${paciente.codigo})">
                    Apagar
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

// Cadastrar paciente
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (nome.length < 3) {
        mensagem.textContent = "Digite um nome válido.";
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        mensagem.textContent = "Digite um peso válido.";
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        mensagem.textContent = "Digite uma altura válida.";
        return;
    }

    const imc = peso / (altura * altura);

    const paciente = {
        codigo: contador++,
        nome: nome,
        peso: peso,
        altura: altura,
        imc: Number(imc.toFixed(2)),
        classificacao: classificarIMC(imc)
    };

    pacientes.push(paciente);

    salvarDados();
    render();

    formulario.reset();
    mensagem.textContent = "Paciente cadastrado com sucesso!";
});

// Apagar paciente
function apagarPaciente(codigo) {
    pacientes = pacientes.filter(function(paciente) {
        return paciente.codigo !== codigo;
    });

    salvarDados();
    render();

    mensagem.textContent = "Paciente apagado com sucesso!";
}

// Carregar dados salvos
function carregarDados() {
    try {
        const dados = localStorage.getItem("pacientes");

        pacientes = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(pacientes)) {
            pacientes = [];
        }

        contador = pacientes.reduce(function(maior, paciente) {
            return Math.max(maior, paciente.codigo);
        }, 0) + 1;

        render();

    } catch (erro) {
        pacientes = [];
        contador = 1;
        mensagem.textContent = "Erro ao carregar os dados.";
    }
}

carregarDados();
