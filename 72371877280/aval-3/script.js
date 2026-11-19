
"use strict";

// ======================================
// 1. ELEMENTOS DO HTML
// ======================================

const form = document.getElementById("formAnamnese");

const pacienteId = document.getElementById("pacienteId");

const nome = document.getElementById("nome");
const nascimento = document.getElementById("nascimento");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");
const profissao = document.getElementById("profissao");
const estadoCivil = document.getElementById("estadoCivil");
const queixa = document.getElementById("queixa");
const historico = document.getElementById("historico");
const medicamentos = document.getElementById("medicamentos");
const alergias = document.getElementById("alergias");
const statusFicha = document.getElementById("status");

const listaPacientes = document.getElementById("listaPacientes");

const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");

const totalPacientes = document.getElementById("totalPacientes");
const totalConcluidas = document.getElementById("totalConcluidas");
const totalPendentes = document.getElementById("totalPendentes");

const mensagemVazia = document.getElementById("mensagemVazia");
const mensagem = document.getElementById("mensagem");

const tituloFormulario = document.getElementById("tituloFormulario");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");


// ======================================
// 2. CONFIGURAÇÃO DO LOCALSTORAGE
// ======================================

const CHAVE_STORAGE = "fichasAnamnese";

let pacientes = carregarPacientes();


// ======================================
// 3. CARREGAR OS DADOS
// ======================================

function carregarPacientes() {

    try {

        const dados = localStorage.getItem(CHAVE_STORAGE);

        if (!dados) {
            return [];
        }

        const resultado = JSON.parse(dados);

        if (!Array.isArray(resultado)) {
            return [];
        }

        return resultado.filter(paciente =>
            paciente &&
            typeof paciente.id === "string" &&
            typeof paciente.nome === "string" &&
            typeof paciente.nascimento === "string" &&
            typeof paciente.telefone === "string" &&
            typeof paciente.queixa === "string" &&
            ["Pendente", "Concluída"].includes(paciente.status)
        );

    } catch (erro) {

        console.error("Erro ao carregar dados:", erro);

        return [];

    }

}


// ======================================
// 4. SALVAR OS DADOS
// ======================================

function salvarDados() {

    try {

        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(pacientes)
        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar:", erro);

        mostrarMensagem(
            "Não foi possível salvar os dados. Verifique o armazenamento do navegador.",
            "erro"
        );

        return false;

    }

}


// ======================================
// 5. EXIBIR MENSAGENS
// ======================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = "mensagem " + tipo;

}


// ======================================
// 6. GERAR IDENTIFICADOR
// ======================================

function gerarId() {

    if (window.crypto && crypto.randomUUID) {

        return crypto.randomUUID();

    }

    return Date.now().toString(36) +
        Math.random().toString(36).slice(2);


// ======================================
// 7. CADASTRAR E EDITAR
// ======================================

}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    const dadosPaciente = {

        nome: nome.value.trim(),

        nascimento: nascimento.value,

        telefone: telefone.value.trim(),

        email: email.value.trim(),

        profissao: profissao.value.trim(),

        estadoCivil: estadoCivil.value,

        queixa: queixa.value.trim(),

        historico: historico.value.trim(),

        medicamentos: medicamentos.value.trim(),

        alergias: alergias.value.trim(),

        status: statusFicha.value

    };


    // VALIDAR CAMPOS OBRIGATÓRIOS

    if (
        !dadosPaciente.nome ||
        !dadosPaciente.nascimento ||
        !dadosPaciente.telefone ||
        !dadosPaciente.queixa
    ) {

        mostrarMensagem(
            "Preencha todos os campos obrigatórios.",
            "erro"
        );

        return;

    }


    // VALIDAR DATA

    const hoje = new Date().toISOString().slice(0, 10);

    if (
        dadosPaciente.nascimento > hoje ||
        !/^\d{4}-\d{2}-\d{2}$/.test(dadosPaciente.nascimento)
    ) {

        mostrarMensagem(
            "Informe uma data de nascimento válida.",
            "erro"
        );

        return;

    }


    // EDITAR PACIENTE

    if (pacienteId.value) {

        const indice = pacientes.findIndex(
            paciente => paciente.id === pacienteId.value
        );

        if (indice === -1) {

            mostrarMensagem(
                "Paciente não encontrado.",
                "erro"
            );

            return;

        }

        const pacienteAnterior = pacientes[indice];

        pacientes[indice] = {
            ...pacienteAnterior,
            ...dadosPaciente
        };

        if (!salvarDados()) {

            pacientes[indice] = pacienteAnterior;

            return;

        }

        mostrarMensagem(
            "Ficha atualizada com sucesso!",
            "sucesso"
        );

    } else {

        // NOVO CADASTRO

        const novoPaciente = {

            id: gerarId(),

            ...dadosPaciente,

            dataCadastro: new Date().toISOString()

        };

        pacientes.push(novoPaciente);

        if (!salvarDados()) {

            pacientes.pop();

            return;

        }

        mostrarMensagem(
            "Paciente cadastrado com sucesso!",
            "sucesso"
        );

    }

    atualizarSistema();

    limparFormulario();

});


// ======================================
// 8. RENDERIZAR PACIENTES
// ======================================

function renderizarPacientes() {

    listaPacientes.innerHTML = "";

    const termo = pesquisa.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const filtro = filtroStatus.value;


    // APLICAR PESQUISA E FILTROS

    const pacientesFiltrados = pacientes.filter(paciente => {

        const correspondeNome = paciente.nome
            .toLocaleLowerCase("pt-BR")
            .includes(termo);

        const correspondeStatus =
            filtro === "Todos" ||
            paciente.status === filtro;

        return correspondeNome && correspondeStatus;

    });


    // MENSAGEM QUANDO NÃO EXISTIREM RESULTADOS

    mensagemVazia.hidden = pacientesFiltrados.length > 0;

    if (pacientesFiltrados.length === 0) {

        mensagemVazia.textContent =
            pacientes.length === 0
                ? "Nenhum paciente cadastrado."
                : "Nenhum paciente encontrado.";

    }


    // CRIAR LINHAS DA TABELA

    pacientesFiltrados.forEach(paciente => {

        const linha = document.createElement("tr");


        // NOME

        const tdNome = document.createElement("td");

        tdNome.textContent = paciente.nome;

        linha.appendChild(tdNome);


        // TELEFONE

        const tdTelefone = document.createElement("td");

        tdTelefone.textContent = paciente.telefone;

        linha.appendChild(tdTelefone);


        // DATA DE NASCIMENTO

        const tdNascimento = document.createElement("td");

        const data = new Date(
            paciente.nascimento + "T00:00:00"
        );

        tdNascimento.textContent =
            data.toLocaleDateString("pt-BR");

        linha.appendChild(tdNascimento);


        // STATUS

        const tdStatus = document.createElement("td");

        const span = document.createElement("span");

        span.className = "status " +
            (
                paciente.status === "Concluída"
                    ? "concluida"
                    : "pendente"
            );

        span.textContent = paciente.status;

        tdStatus.appendChild(span);

        linha.appendChild(tdStatus);


        // AÇÕES

        const tdAcoes = document.createElement("td");

        tdAcoes.className = "acoes";


        // BOTÃO EDITAR

        const btnEditar = document.createElement("button");

        btnEditar.type = "button";

        btnEditar.textContent = "Editar";

        btnEditar.className = "btn-editar";

        btnEditar.addEventListener("click", function() {

            editarPaciente(paciente.id);

        });


        // BOTÃO EXCLUIR

        const btnExcluir = document.createElement("button");

        btnExcluir.type = "button";

        btnExcluir.textContent = "Excluir";

        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", function() {

            excluirPaciente(paciente.id);

        });


        tdAcoes.appendChild(btnEditar);

        tdAcoes.appendChild(btnExcluir);

        linha.appendChild(tdAcoes);


        // ADICIONAR LINHA NA TABELA

        listaPacientes.appendChild(linha);

    });

}


// ======================================
// 9. ATUALIZAR CONTADORES
// ======================================

function atualizarContadores() {

    const concluidas = pacientes.filter(
        paciente => paciente.status === "Concluída"
    ).length;

    const pendentes = pacientes.filter(
        paciente => paciente.status === "Pendente"
    ).length;


    totalPacientes.textContent = pacientes.length;

    totalConcluidas.textContent = concluidas;

    totalPendentes.textContent = pendentes;

}


// ======================================
// 10. EDITAR PACIENTE
// ======================================

function editarPaciente(id) {

    const paciente = pacientes.find(
        item => item.id === id
    );

    if (!paciente) {

        mostrarMensagem(
            "Paciente não encontrado.",
            "erro"
        );

        return;

    }


    // PREENCHER FORMULÁRIO

    pacienteId.value = paciente.id;

    nome.value = paciente.nome;

    nascimento.value = paciente.nascimento;

    telefone.value = paciente.telefone;

    email.value = paciente.email || "";

    profissao.value = paciente.profissao || "";

    estadoCivil.value = paciente.estadoCivil || "";

    queixa.value = paciente.queixa;

    historico.value = paciente.historico || "";

    medicamentos.value = paciente.medicamentos || "";

    alergias.value = paciente.alergias || "";

    statusFicha.value = paciente.status;


    // ALTERAR TÍTULO E BOTÕES

    tituloFormulario.textContent = "Editar ficha do paciente";

    btnSalvar.textContent = "Atualizar ficha";

    btnCancelar.hidden = false;

    mostrarMensagem(
        "Editando ficha do paciente.",
        "sucesso"
    );


    // VOLTAR AO FORMULÁRIO

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ======================================
// 11. EXCLUIR PACIENTE
// ======================================

function excluirPaciente(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta ficha?"
    );

    if (!confirmar) {
        return;
    }


    const indice = pacientes.findIndex(
        paciente => paciente.id === id
    );

    if (indice === -1) {
        return;
    }


    // GUARDAR PARA RECUPERAR SE FALHAR

    const pacienteExcluido = pacientes[indice];


    pacientes.splice(indice, 1);


    if (!salvarDados()) {

        pacientes.splice(indice, 0, pacienteExcluido);

        return;

    }


    // LIMPAR FORMULÁRIO SE ESTIVER EDITANDO

    if (pacienteId.value === id) {

        limparFormulario();

    }


    atualizarSistema();

    mostrarMensagem(
        "Ficha excluída com sucesso!",
        "sucesso"
    );

}


// ======================================
// 12. LIMPAR FORMULÁRIO
// ======================================

function limparFormulario() {

    form.reset();

    pacienteId.value = "";

    tituloFormulario.textContent = "Cadastrar paciente";

    btnSalvar.textContent = "Salvar ficha";

    btnCancelar.hidden = true;

}


// ======================================
// 13. CANCELAR EDIÇÃO
// ======================================

btnCancelar.addEventListener("click", function() {

    limparFormulario();

    mostrarMensagem(
        "Edição cancelada.",
        "sucesso"
    );

});


// ======================================
// 14. PESQUISAR PACIENTES
// ======================================

pesquisa.addEventListener("input", function() {

    renderizarPacientes();

});


// ======================================
// 15. FILTRAR POR SITUAÇÃO
// ======================================

filtroStatus.addEventListener("change", function() {

    renderizarPacientes();

});


// ======================================
// 16. ATUALIZAR SISTEMA
// ======================================

function atualizarSistema() {

    atualizarContadores();

    renderizarPacientes();

}


// ======================================
// 17. INICIALIZAR A APLICAÇÃO
// ======================================

atualizarSistema();
