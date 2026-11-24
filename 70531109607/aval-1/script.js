const alunoForm = document.getElementById("alunoForm");

const nomeInput = document.getElementById("nome");
const matriculaInput = document.getElementById("matricula");
const turmaInput = document.getElementById("turma");

const nota1Input = document.getElementById("nota1");
const nota2Input = document.getElementById("nota2");
const nota3Input = document.getElementById("nota3");

const totalAulasInput = document.getElementById("totalAulas");
const faltasInput = document.getElementById("faltas");

const alunoIdInput = document.getElementById("alunoId");

const listaAlunos = document.getElementById("listaAlunos");
const pesquisaInput = document.getElementById("pesquisa");
const filtroTurma = document.getElementById("filtroTurma");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

const tituloFormulario = document.getElementById("tituloFormulario");
const mensagemVazia = document.getElementById("mensagemVazia");

const notificacao = document.getElementById("notificacao");

let alunos = [];

const CHAVE_STORAGE = "classup_alunos";

// CARREGAR DADOS SALVOS

function carregarAlunos() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);

        alunos = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(alunos)) {
            alunos = [];
        }
    } catch (erro) {
        alunos = [];
        mostrarNotificacao("Não foi possível carregar os dados.");
    }

    atualizarSistema();
}

// SALVAR DADOS

function salvarDados() {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(alunos));
    } catch (erro) {
        mostrarNotificacao("Erro ao salvar os dados.");
    }
}

// PROTEGER TEXTO EXIBIDO NA TABELA

function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return caracteres[caractere];
    });
}

// CALCULAR MÉDIA

function calcularMedia(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}

// CALCULAR FREQUÊNCIA

function calcularFrequencia(totalAulas, faltas) {
    return ((totalAulas - faltas) / totalAulas) * 100;
}

// DEFINIR SITUAÇÃO DO ALUNO

function definirSituacao(media, frequencia) {
    if (frequencia < 75) {
        return "Reprovado";
    }

    if (media >= 7) {
        return "Aprovado";
    }

    if (media >= 5) {
        return "Recuperação";
    }

    return "Reprovado";
}

// CLASSE VISUAL DA SITUAÇÃO

function classeSituacao(situacao) {
    if (situacao === "Aprovado") {
        return "aprovado";
    }

    if (situacao === "Recuperação") {
        return "recuperacao";
    }

    return "reprovado";
}

// MOSTRAR NOTIFICAÇÃO

let temporizadorNotificacao;

function mostrarNotificacao(mensagem) {
    notificacao.textContent = mensagem;
    notificacao.classList.add("mostrar");

    clearTimeout(temporizadorNotificacao);

    temporizadorNotificacao = setTimeout(() => {
        notificacao.classList.remove("mostrar");
    }, 3000);
}

// CADASTRAR OU EDITAR ALUNO

alunoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const matricula = matriculaInput.value.trim();
    const turma = turmaInput.value;

    const nota1 = Number(nota1Input.value);
    const nota2 = Number(nota2Input.value);
    const nota3 = Number(nota3Input.value);

    const totalAulas = Number(totalAulasInput.value);
    const faltas = Number(faltasInput.value);

    const idAtual = alunoIdInput.value;

    // VALIDAR CAMPOS

    if (!nome || !matricula || !turma) {
        mostrarNotificacao("Preencha todos os campos.");
        return;
    }

    const valoresValidos = [
        nota1,
        nota2,
        nota3,
        totalAulas,
        faltas
    ].every(Number.isFinite);

    if (!valoresValidos) {
        mostrarNotificacao("Informe valores numéricos válidos.");
        return;
    }

    if (
        nota1 < 0 || nota1 > 10 ||
        nota2 < 0 || nota2 > 10 ||
        nota3 < 0 || nota3 > 10
    ) {
        mostrarNotificacao("As notas devem estar entre 0 e 10.");
        return;
    }

    if (
        !Number.isInteger(totalAulas) ||
        !Number.isInteger(faltas) ||
        totalAulas < 1 ||
        faltas < 0 ||
        faltas > totalAulas
    ) {
        mostrarNotificacao("Confira o total de aulas e as faltas.");
        return;
    }

    // VERIFICAR MATRÍCULA DUPLICADA

    const matriculaExiste = alunos.some(aluno => {
        return (
            aluno.matricula.toLowerCase() === matricula.toLowerCase() &&
            aluno.id !== idAtual
        );
    });

    if (matriculaExiste) {
        mostrarNotificacao("Essa matrícula já está cadastrada.");
        return;
    }

    const media = calcularMedia(nota1, nota2, nota3);
    const frequencia = calcularFrequencia(totalAulas, faltas);
    const situacao = definirSituacao(media, frequencia);

    const aluno = {
        id: idAtual || (
            window.crypto && crypto.randomUUID
                ? crypto.randomUUID()
                : String(Date.now())
        ),
        nome,
        matricula,
        turma,
        nota1,
        nota2,
        nota3,
        media,
        totalAulas,
        faltas,
        frequencia,
        situacao
    };

    if (idAtual) {
        const indice = alunos.findIndex(item => item.id === idAtual);

        if (indice !== -1) {
            alunos[indice] = aluno;
            mostrarNotificacao("Aluno atualizado com sucesso!");
        }
    } else {
        alunos.push(aluno);
        mostrarNotificacao("Aluno cadastrado com sucesso!");
    }

    salvarDados();
    atualizarSistema();
    limparFormulario();
});

// LISTAR ALUNOS

function listarAlunos() {
    const termo = pesquisaInput.value.trim().toLowerCase();
    const turmaSelecionada = filtroTurma.value;

    const alunosFiltrados = alunos.filter(aluno => {
        const correspondePesquisa =
            aluno.nome.toLowerCase().includes(termo) ||
            aluno.matricula.toLowerCase().includes(termo);

        const correspondeTurma =
            !turmaSelecionada || aluno.turma === turmaSelecionada;

        return correspondePesquisa && correspondeTurma;
    });

    listaAlunos.innerHTML = "";

    mensagemVazia.hidden = alunosFiltrados.length > 0;

    if (alunosFiltrados.length === 0) {
        return;
    }

    alunosFiltrados.forEach(aluno => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td><strong>${escaparHTML(aluno.nome)}</strong></td>

            <td>${escaparHTML(aluno.matricula)}</td>

            <td>${escaparHTML(aluno.turma)}</td>

            <td>${aluno.media.toFixed(2).replace(".", ",")}</td>

            <td>${aluno.faltas}</td>

            <td>${aluno.frequencia.toFixed(1).replace(".", ",")}%</td>

            <td>
                <span class="status ${classeSituacao(aluno.situacao)}">
                    ${aluno.situacao}
                </span>
            </td>

            <td>
                <button
                    class="btn-editar"
                    data-acao="editar"
                    data-id="${escaparHTML(aluno.id)}"
                >
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    data-acao="excluir"
                    data-id="${escaparHTML(aluno.id)}"
                >
                    Excluir
                </button>
            </td>
        `;

        listaAlunos.appendChild(linha);
    });
}

// EDITAR OU EXCLUIR ALUNO

listaAlunos.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const id = botao.dataset.id;
    const acao = botao.dataset.acao;

    if (acao === "editar") {
        editarAluno(id);
    }

    if (acao === "excluir") {
        excluirAluno(id);
    }
});

// EDITAR ALUNO

function editarAluno(id) {
    const aluno = alunos.find(item => item.id === id);

    if (!aluno) {
        mostrarNotificacao("Aluno não encontrado.");
        return;
    }

    alunoIdInput.value = aluno.id;

    nomeInput.value = aluno.nome;
    matriculaInput.value = aluno.matricula;
    turmaInput.value = aluno.turma;

    nota1Input.value = aluno.nota1;
    nota2Input.value = aluno.nota2;
    nota3Input.value = aluno.nota3;

    totalAulasInput.value = aluno.totalAulas;
    faltasInput.value = aluno.faltas;

    tituloFormulario.textContent = "Editar aluno";
    btnSalvar.textContent = "Atualizar aluno";
    btnCancelar.hidden = false;

    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
}

// EXCLUIR ALUNO

function excluirAluno(id) {
    const aluno = alunos.find(item => item.id === id);

    if (!aluno) {
        mostrarNotificacao("Aluno não encontrado.");
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir o aluno ${aluno.nome}?`
    );

    if (!confirmar) {
        return;
    }

    alunos = alunos.filter(item => item.id !== id);

    salvarDados();
    atualizarSistema();

    mostrarNotificacao("Aluno excluído com sucesso!");

    if (alunoIdInput.value === id) {
        limparFormulario();
    }
}

// LIMPAR FORMULÁRIO

function limparFormulario() {
    alunoForm.reset();

    alunoIdInput.value = "";
    totalAulasInput.value = 100;
    faltasInput.value = 0;

    tituloFormulario.textContent = "Cadastrar aluno";
    btnSalvar.textContent = "Salvar aluno";
    btnCancelar.hidden = true;
}

// CANCELAR EDIÇÃO

btnCancelar.addEventListener("click", function() {
    limparFormulario();
    mostrarNotificacao("Edição cancelada.");
});

// ATUALIZAR INDICADORES

function atualizarIndicadores() {
    const total = alunos.length;

    const aprovados = alunos.filter(
        aluno => aluno.situacao === "Aprovado"
    ).length;

    const recuperacao = alunos.filter(
        aluno => aluno.situacao === "Recuperação"
    ).length;

    const reprovados = alunos.filter(
        aluno => aluno.situacao === "Reprovado"
    ).length;

    const mediaGeral = total > 0
        ? alunos.reduce((soma, aluno) => soma + aluno.media, 0) / total
        : 0;

    document.getElementById("totalAlunos").textContent = total;

    document.getElementById("totalAprovados").textContent = aprovados;

    document.getElementById("totalRecuperacao").textContent = recuperacao;

    document.getElementById("totalReprovados").textContent = reprovados;
}

// ATUALIZAR SISTEMA

function atualizarSistema() {
    atualizarIndicadores();
    listarAlunos();
}

// PESQUISAR ALUNOS

pesquisaInput.addEventListener("input", listarAlunos);

// FILTRAR TURMAS

filtroTurma.addEventListener("change", listarAlunos);

// INICIAR SISTEMA

carregarAlunos();