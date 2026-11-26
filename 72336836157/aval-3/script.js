
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("tabela");

let pacientes = [];
let contador = 1;

// Recuperar dados salvos
function carregarDados() {
    try {
        const dados = localStorage.getItem("pacientes");

        pacientes = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(pacientes)) {
            pacientes = [];
        }

        contador = pacientes.reduce(
            (maior, paciente) => Math.max(maior, paciente.id),
            0
        ) + 1;

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        pacientes = [];
        contador = 1;
    }

    render();
}

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso normal";
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

// Formatar números
function formatarNumero(numero) {
    return numero.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Criar linha da tabela
function criarLinha(paciente) {
    const linha = document.createElement("tr");

    const dados = [
        paciente.id,
        paciente.nome,
        paciente.idade,
        formatarNumero(paciente.peso),
        formatarNumero(paciente.altura),
        formatarNumero(paciente.imc),
        paciente.classificacao
    ];

    dados.forEach(valor => {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.appendChild(celula);
    });

    // Botão apagar
    const celulaAcao = document.createElement("td");
    const botao = document.createElement("button");

    botao.textContent = "Apagar";
    botao.classList.add("apagar");

    botao.addEventListener("click", function() {
        apagarPaciente(paciente.id);
    });

    celulaAcao.appendChild(botao);
    linha.appendChild(celulaAcao);

    return linha;
}

// Renderizar tabela
function render() {
    tabela.innerHTML = "";

    pacientes.forEach(paciente => {
        tabela.appendChild(criarLinha(paciente));
    });
}

// Ler formulário
function lerFormulario() {
    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (!nome) {
        alert("Informe o nome do paciente!");
        return null;
    }

    if (!Number.isInteger(idade) || idade <= 0) {
        alert("Informe uma idade válida!");
        return null;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Informe um peso válido!");
        return null;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Informe uma altura válida!");
        return null;
    }

    const imc = calcularIMC(peso, altura);

    return {
        id: contador++,
        nome,
        idade,
        peso,
        altura,
        imc,
        classificacao: classificarIMC(imc)
    };
}

// Salvar no localStorage
function salvarDados() {
    try {
        localStorage.setItem(
            "pacientes",
            JSON.stringify(pacientes)
        );
    } catch (erro) {
        alert("Não foi possível salvar os dados!");
        console.error(erro);
    }
}

// Apagar paciente
function apagarPaciente(id) {
    const confirmar = confirm(
        "Deseja realmente apagar este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pacientes = pacientes.filter(
        paciente => paciente.id !== id
    );

    salvarDados();
    render();
}

// Evento de envio do formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const paciente = lerFormulario();

    if (!paciente) {
        return;
    }

    pacientes.push(paciente);

    salvarDados();
    render();

    formulario.reset();
});

// Iniciar sistema
carregarDados();
