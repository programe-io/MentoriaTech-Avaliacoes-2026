
// SISTEMA DE FICHA DE ANAMNESE

let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

let proximoId = Number(localStorage.getItem("proximoIdPaciente")) || 1;

let editandoId = null;

// CAMPOS DO FORMULÁRIO
const campos = [
    "nome",
    "nascimento",
    "sexo",
    "telefone",
    "email",
    "endereco",
    "queixa",
    "tempoSintomas",
    "sintomas",
    "doenca",
    "historicoDoenca",
    "cirurgia",
    "historicoCirurgia",
    "alergia",
    "historicoAlergia",
    "medicamento",
    "historicoMedicamento",
    "peso",
    "altura",
    "pressao",
    "temperatura",
    "observacoes",
    "profissional"
];

// SALVAR DADOS
function salvarDados() {

    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );

    localStorage.setItem(
        "proximoIdPaciente",
        proximoId
    );

}

// FORMATAR DATA
function formatarData(data) {

    if (!data) return "Não informado";

    return new Date(data + "T00:00:00")
        .toLocaleDateString("pt-BR");

}

// FORMATAR NÚMEROS
function formatarNumero(valor, casas = 2) {

    return Number(valor).toFixed(casas);

}

// CALCULAR IMC
function calcularIMC(peso, altura) {

    if (!peso || !altura || peso <= 0 || altura <= 0) {
        return null;
    }

    return peso / (altura * altura);

}

// CLASSIFICAR IMC
function classificarIMC(imc) {

    if (imc === null) {
        return "Não calculado";
    }

    if (imc < 18.5) {
        return "Abaixo do peso";
    }

    if (imc < 25) {
        return "Faixa considerada adequada";
    }

    if (imc < 30) {
        return "Sobrepeso";
    }

    if (imc < 35) {
        return "Obesidade grau I";
    }

    if (imc < 40) {
        return "Obesidade grau II";
    }

    return "Obesidade grau III";

}

// ATUALIZAR PRÉVIA DO IMC
function atualizarIMC() {

    let peso = Number(document.getElementById("peso").value);

    let altura = Number(document.getElementById("altura").value);

    let resultado = document.getElementById("resultadoIMC");

    if (!peso && !altura) {
        resultado.textContent = "IMC: Não calculado";
        return;
    }

    if (
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        resultado.textContent = "IMC: Informe peso e altura válidos";
        return;
    }

    let imc = calcularIMC(peso, altura);

    resultado.textContent =
        "IMC: " + formatarNumero(imc) +
        " - " + classificarIMC(imc);

}

// MONITORAR PESO E ALTURA
document.getElementById("peso").addEventListener(
    "input",
    atualizarIMC
);

document.getElementById("altura").addEventListener(
    "input",
    atualizarIMC
);

// LER FORMULÁRIO
function lerFormulario() {

    let dados = {};

    campos.forEach(function(campo) {

        dados[campo] = document.getElementById(campo).value.trim();

    });

    return dados;

}

// VALIDAR DADOS
function validarDados(dados) {

    if (!dados.nome) {
        return "Informe o nome do paciente!";
    }

    if (!dados.nascimento) {
        return "Informe a data de nascimento!";
    }

    let nascimento = new Date(dados.nascimento + "T00:00:00");

    if (
        Number.isNaN(nascimento.getTime()) ||
        nascimento > new Date()
    ) {
        return "Informe uma data de nascimento válida!";
    }

    if (!dados.queixa) {
        return "Informe a queixa principal!";
    }

    if (dados.peso !== "") {

        let peso = Number(dados.peso);

        if (!Number.isFinite(peso) || peso <= 0) {
            return "Informe um peso válido!";
        }

    }

    if (dados.altura !== "") {

        let altura = Number(dados.altura);

        if (!Number.isFinite(altura) || altura <= 0) {
            return "Informe uma altura válida!";
        }

    }

    if (
        (dados.peso === "") !==
        (dados.altura === "")
    ) {
        return "Informe peso e altura juntos para calcular o IMC!";
    }

    if (dados.temperatura !== "") {

        let temperatura = Number(dados.temperatura);

        if (!Number.isFinite(temperatura) || temperatura <= 0) {
            return "Informe uma temperatura válida!";
        }

    }

    return "";

}

// CADASTRAR OU ATUALIZAR PACIENTE
document.getElementById("formAnamnese").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        let dados = lerFormulario();

        let erro = validarDados(dados);

        if (erro !== "") {
            alert(erro);
            return;
        }

        let peso = dados.peso === ""
            ? null
            : Number(dados.peso);

        let altura = dados.altura === ""
            ? null
            : Number(dados.altura);

        let imc = calcularIMC(peso, altura);

        if (editandoId !== null) {

            let paciente = pacientes.find(
                p => p.id === editandoId
            );

            if (!paciente) {
                alert("Paciente não encontrado!");
                return;
            }

            paciente.dados = dados;
            paciente.imc = imc;
            paciente.classificacao = classificarIMC(imc);

            alert("Ficha atualizada com sucesso!");

            editandoId = null;

            document.getElementById("btnSalvar").textContent =
                "Cadastrar Paciente";

        } else {

            let paciente = {

                id: proximoId++,

                dados: dados,

                imc: imc,

                classificacao: classificarIMC(imc),

                dataCadastro: new Date().toLocaleDateString("pt-BR")

            };

            pacientes.push(paciente);

            alert("Paciente cadastrado com sucesso!");

        }

        salvarDados();

        document.getElementById("formAnamnese").reset();

        atualizarIMC();

        listarPacientes();

        atualizarRelatorio();

    }
);

// LISTAR PACIENTES
function listarPacientes(lista = pacientes) {

    let tabela = document.getElementById("listaPacientes");

    tabela.innerHTML = "";

    if (lista.length === 0) {

        let linha = document.createElement("tr");

        let celula = document.createElement("td");

        celula.colSpan = 6;

        celula.textContent = "Nenhum paciente cadastrado.";

        linha.appendChild(celula);

        tabela.appendChild(linha);

        return;

    }

    lista.forEach(function(paciente) {

        let linha = document.createElement("tr");

        function criarCelula(valor) {

            let celula = document.createElement("td");

            celula.textContent = valor;

            return celula;

        }

        let dados = paciente.dados;

        linha.appendChild(criarCelula(paciente.id));

        linha.appendChild(criarCelula(dados.nome));

        linha.appendChild(criarCelula(
            formatarData(dados.nascimento)
        ));

        linha.appendChild(criarCelula(
            dados.telefone || "Não informado"
        ));

        linha.appendChild(criarCelula(
            paciente.imc === null
                ? "Não calculado"
                : formatarNumero(paciente.imc)
        ));

        let acoes = document.createElement("td");

        // BOTÃO VISUALIZAR
        let visualizar = document.createElement("button");

        visualizar.textContent = "Ver Ficha";

        visualizar.onclick = function() {
            visualizarPaciente(paciente.id);
        };

        // BOTÃO EDITAR
        let editar = document.createElement("button");

        editar.textContent = "Editar";

        editar.onclick = function() {
            editarPaciente(paciente.id);
        };

        // BOTÃO EXCLUIR
        let excluir = document.createElement("button");

        excluir.textContent = "Excluir";

        excluir.onclick = function() {
            excluirPaciente(paciente.id);
        };

        acoes.appendChild(visualizar);

        acoes.appendChild(editar);

        acoes.appendChild(excluir);

        linha.appendChild(acoes);

        tabela.appendChild(linha);

    });

}

// VISUALIZAR FICHA COMPLETA
function visualizarPaciente(id) {

    let paciente = pacientes.find(p => p.id === id);

    if (!paciente) {
        alert("Paciente não encontrado!");
        return;
    }

    let d = paciente.dados;

    let mensagem = `
===== FICHA DE ANAMNESE =====

ID: ${paciente.id}

DADOS PESSOAIS

Nome: ${d.nome}
Nascimento: ${formatarData(d.nascimento)}
Sexo: ${d.sexo}
Telefone: ${d.telefone || "Não informado"}
E-mail: ${d.email || "Não informado"}
Endereço: ${d.endereco || "Não informado"}

QUEIXA PRINCIPAL

${d.queixa}

Tempo dos sintomas: ${d.tempoSintomas || "Não informado"}

Sintomas:
${d.sintomas || "Não informado"}

HISTÓRICO DE SAÚDE

Possui doença: ${d.doenca}
Histórico: ${d.historicoDoenca || "Não informado"}

Cirurgia: ${d.cirurgia}
Histórico: ${d.historicoCirurgia || "Não informado"}

Alergia: ${d.alergia}
Histórico: ${d.historicoAlergia || "Não informado"}

Medicamentos: ${d.medicamento}
Histórico: ${d.historicoMedicamento || "Não informado"}

AVALIAÇÃO FÍSICA

Peso: ${d.peso || "Não informado"} kg
Altura: ${d.altura || "Não informado"} m
Pressão: ${d.pressao || "Não informado"}
Temperatura: ${d.temperatura || "Não informada"} °C

IMC: ${paciente.imc === null
    ? "Não calculado"
    : formatarNumero(paciente.imc)}

Classificação: ${paciente.classificacao}

OBSERVAÇÕES

${d.observacoes || "Nenhuma observação"}

Profissional: ${d.profissional || "Não informado"}

Data do cadastro: ${paciente.dataCadastro}
`;

    alert(mensagem);

}

// EDITAR PACIENTE
function editarPaciente(id) {

    let paciente = pacientes.find(p => p.id === id);

    if (!paciente) {
        alert("Paciente não encontrado!");
        return;
    }

    campos.forEach(function(campo) {

        document.getElementById(campo).value =
            paciente.dados[campo] || "";

    });

    editandoId = id;

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    atualizarIMC();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// EXCLUIR PACIENTE
function excluirPaciente(id) {

    let confirmar = confirm(
        "Deseja realmente excluir esta ficha?"
    );

    if (!confirmar) return;

    pacientes = pacientes.filter(p => p.id !== id);

    if (editandoId === id) {

        editandoId = null;

        document.getElementById("formAnamnese").reset();

        document.getElementById("btnSalvar").textContent =
            "Cadastrar Paciente";

        atualizarIMC();

    }

    salvarDados();

    listarPacientes();

    atualizarRelatorio();

    alert("Ficha excluída com sucesso!");

}

// PESQUISAR PACIENTE
function pesquisarPaciente() {

    let pesquisa = document.getElementById("pesquisa")
        .value.trim().toLowerCase();

    let resultado = pacientes.filter(function(paciente) {

        return paciente.dados.nome
            .toLowerCase()
            .includes(pesquisa);

    });

    listarPacientes(resultado);

}

// ATUALIZAR RELATÓRIO
function atualizarRelatorio() {

    let total = pacientes.length;

    let alergias = pacientes.filter(function(paciente) {

        return paciente.dados.alergia === "Sim";

    }).length;

    let medicamentos = pacientes.filter(function(paciente) {

        return paciente.dados.medicamento === "Sim";

    }).length;

    document.getElementById("totalPacientes").textContent =
        "Total de pacientes: " + total;

    document.getElementById("totalComAlergia").textContent =
        "Pacientes com alergia: " + alergias;

    document.getElementById("totalMedicamentos").textContent =
        "Pacientes que utilizam medicamentos: " + medicamentos;

}

// LIMPAR FORMULÁRIO
document.getElementById("formAnamnese").addEventListener(
    "reset",
    function() {

        editandoId = null;

        document.getElementById("btnSalvar").textContent =
            "Cadastrar Paciente";

        setTimeout(atualizarIMC, 0);

    }
);

// INICIALIZAR SISTEMA
listarPacientes();

atualizarRelatorio();

atualizarIMC();

