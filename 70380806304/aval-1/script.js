
// ======================================
// EDUCONTROL - SISTEMA DE GESTÃO ESCOLAR
// ======================================

// Elementos do HTML
const formulario = document.getElementById('form-aluno');
const listaAlunos = document.getElementById('lista-alunos');
const pesquisa = document.getElementById('pesquisa');
const notificacao = document.getElementById('notificacao');

// Campos do formulário
const campoId = document.getElementById('aluno-id');
const campoNome = document.getElementById('nome');
const campoMatricula = document.getElementById('matricula');
const campoTurma = document.getElementById('turma');
const campoNota1 = document.getElementById('nota1');
const campoNota2 = document.getElementById('nota2');
const campoFrequencia = document.getElementById('frequencia');

// Botões e títulos
const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar = document.getElementById('cancelar-edicao');
const tituloFormulario = document.getElementById('titulo-formulario');

// Indicadores
const totalAlunos = document.getElementById('total-alunos');
const totalAprovados = document.getElementById('total-aprovados');
const mediaGeral = document.getElementById('media-geral');
const mensagemVazia = document.getElementById('mensagem-vazia');

// ======================================
// BANCO DE DADOS LOCAL
// ======================================

// Carregar alunos salvos no navegador
function carregarAlunos() {
    try {
        const dados = JSON.parse(
            localStorage.getItem('educontrolAlunos')
        );

        if (!Array.isArray(dados)) {
            return [];
        }

        return dados.filter(aluno =>
            aluno &&
            typeof aluno.id === 'string' &&
            typeof aluno.nome === 'string' &&
            typeof aluno.matricula === 'string' &&
            typeof aluno.turma === 'string' &&
            Number.isFinite(aluno.nota1) &&
            Number.isFinite(aluno.nota2) &&
            Number.isFinite(aluno.frequencia)
        );

    } catch (erro) {
        return [];
    }
}

// Lista principal de alunos
let alunos = carregarAlunos();

// Salvar alunos no navegador
function salvarAlunos() {
    try {
        localStorage.setItem(
            'educontrolAlunos',
            JSON.stringify(alunos)
        );

        return true;

    } catch (erro) {
        mostrarNotificacao(
            'Não foi possível salvar os dados no navegador.'
        );

        return false;
    }
}

// ======================================
// CÁLCULO DAS MÉDIAS
// ======================================

// Calcular média de um aluno
function calcularMedia(aluno) {
    return (aluno.nota1 + aluno.nota2) / 2;
}

// Determinar situação do aluno
function verificarSituacao(aluno) {
    const media = calcularMedia(aluno);

    if (aluno.frequencia < 75) {
        return 'Reprovado';
    }

    if (media >= 7) {
        return 'Aprovado';
    }

    if (media >= 5) {
        return 'Recuperação';
    }

    return 'Reprovado';
}

// ======================================
// NOTIFICAÇÕES
// ======================================

let temporizadorNotificacao;

function mostrarNotificacao(texto) {
    notificacao.textContent = texto;
    notificacao.classList.add('visivel');

    clearTimeout(temporizadorNotificacao);

    temporizadorNotificacao = setTimeout(() => {
        notificacao.classList.remove('visivel');
    }, 2500);
}

// ======================================
// PROTEÇÃO DE TEXTO
// ======================================

// Impedir que nomes e outros dados inseridos
// sejam interpretados como código HTML.
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => {
        const entidades = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return entidades[caractere];
    });
}

// ======================================
// CADASTRAR ALUNO
// ======================================

formulario.addEventListener('submit', evento => {
    evento.preventDefault();

    const id = campoId.value;

    const nome = campoNome.value.trim();
    const matricula = campoMatricula.value.trim();
    const turma = campoTurma.value.trim();

    const nota1 = Number(campoNota1.value);
    const nota2 = Number(campoNota2.value);
    const frequencia = Number(campoFrequencia.value);

    // Verificar campos obrigatórios
    if (!nome || !matricula || !turma) {
        mostrarNotificacao('Preencha todos os campos.');
        return;
    }

    // Validar notas
    if (
        !Number.isFinite(nota1) ||
        !Number.isFinite(nota2) ||
        nota1 < 0 || nota1 > 10 ||
        nota2 < 0 || nota2 > 10
    ) {
        mostrarNotificacao('As notas devem estar entre 0 e 10.');
        return;
    }

    // Validar frequência
    if (
        !Number.isFinite(frequencia) ||
        frequencia < 0 ||
        frequencia > 100
    ) {
        mostrarNotificacao('A frequência deve estar entre 0 e 100%.');
        return;
    }

    // Verificar matrícula duplicada
    const matriculaExiste = alunos.some(aluno =>
        aluno.matricula.toLowerCase() === matricula.toLowerCase() &&
        aluno.id !== id
    );

    if (matriculaExiste) {
        mostrarNotificacao('Esta matrícula já está cadastrada.');
        return;
    }

    // Criar objeto do aluno
    const dadosAluno = {
        id: id || String(Date.now()) + Math.random().toString(16).slice(2),
        nome,
        matricula,
        turma,
        nota1,
        nota2,
        frequencia
    };

    let mensagem;

    // Se existir ID, atualizar aluno
    if (id) {
        alunos = alunos.map(aluno =>
            aluno.id === id ? dadosAluno : aluno
        );

        mensagem = 'Aluno atualizado com sucesso!';

    } else {
        // Caso contrário, cadastrar novo aluno
        alunos.push(dadosAluno);

        mensagem = 'Aluno cadastrado com sucesso!';
    }

    // Salvar alterações
    if (!salvarAlunos()) {
        alunos = carregarAlunos();
        return;
    }

    // Limpar formulário e atualizar tela
    limparFormulario();
    atualizarSistema();

    mostrarNotificacao(mensagem);
});

// ======================================
// LISTAR ALUNOS
// ======================================

function renderizarAlunos() {
    const termo = pesquisa.value
        .trim()
        .toLocaleLowerCase('pt-BR');

    // Filtrar alunos pela pesquisa
    const alunosFiltrados = alunos.filter(aluno =>
        aluno.nome.toLocaleLowerCase('pt-BR').includes(termo) ||
        aluno.matricula.toLowerCase().includes(termo) ||
        aluno.turma.toLocaleLowerCase('pt-BR').includes(termo)
    );

    // Mostrar mensagem quando não houver alunos
    mensagemVazia.hidden = alunosFiltrados.length > 0;

    if (alunosFiltrados.length === 0) {
        listaAlunos.innerHTML = '';
        return;
    }

    // Criar linhas da tabela
    listaAlunos.innerHTML = alunosFiltrados.map(aluno => {
        const media = calcularMedia(aluno);
        const situacao = verificarSituacao(aluno);

        let classeSituacao = 'reprovado';

        if (situacao === 'Aprovado') {
            classeSituacao = 'aprovado';
        } else if (situacao === 'Recuperação') {
            classeSituacao = 'recuperacao';
        }

        return `
            <tr>
                <td>${escaparHTML(aluno.nome)}</td>

                <td>${escaparHTML(aluno.matricula)}</td>

                <td>${escaparHTML(aluno.turma)}</td>

                <td>${media.toFixed(2).replace('.', ',')}</td>

                <td>${aluno.frequencia}%</td>

                <td>
                    <span class="status ${classeSituacao}">
                        ${situacao}
                    </span>
                </td>

                <td>
                    <button
                        class="botao-acao editar"
                        type="button"
                        data-editar="${escaparHTML(aluno.id)}">
                        Editar
                    </button>

                    <button
                        class="botao-acao excluir"
                        type="button"
                        data-excluir="${escaparHTML(aluno.id)}">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ======================================
// EDITAR ALUNO
// ======================================

function editarAluno(id) {
    const aluno = alunos.find(aluno => aluno.id === id);

    if (!aluno) {
        mostrarNotificacao('Aluno não encontrado.');
        return;
    }

    // Preencher formulário com dados existentes
    campoId.value = aluno.id;
    campoNome.value = aluno.nome;
    campoMatricula.value = aluno.matricula;
    campoTurma.value = aluno.turma;
    campoNota1.value = aluno.nota1;
    campoNota2.value = aluno.nota2;
    campoFrequencia.value = aluno.frequencia;

    // Alterar título e botão
    tituloFormulario.textContent = 'Editar aluno';
    botaoSalvar.textContent = 'Salvar alterações';

    botaoCancelar.hidden = false;

    // Levar usuário até o formulário
    document.getElementById('cadastro').scrollIntoView({
        behavior: 'smooth'
    });
}

// ======================================
// EXCLUIR ALUNO
// ======================================

function excluirAluno(id) {
    const aluno = alunos.find(aluno => aluno.id === id);

    if (!aluno) {
        mostrarNotificacao('Aluno não encontrado.');
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir o aluno ${aluno.nome}?`
    );

    if (!confirmar) {
        return;
    }

    const alunosAnteriores = [...alunos];

    alunos = alunos.filter(aluno => aluno.id !== id);

    if (!salvarAlunos()) {
        alunos = alunosAnteriores;
        return;
    }

    atualizarSistema();

    mostrarNotificacao('Aluno excluído com sucesso!');
}

// ======================================
// BOTÕES DE AÇÃO DA TABELA
// ======================================

listaAlunos.addEventListener('click', evento => {
    const botaoEditar = evento.target.closest('[data-editar]');
    const botaoExcluir = evento.target.closest('[data-excluir]');

    if (botaoEditar) {
        editarAluno(botaoEditar.dataset.editar);
    }

    if (botaoExcluir) {
        excluirAluno(botaoExcluir.dataset.excluir);
    }
});

// ======================================
// CANCELAR EDIÇÃO
// ======================================

function limparFormulario() {
    formulario.reset();

    campoId.value = '';

    tituloFormulario.textContent = 'Cadastrar aluno';

    botaoSalvar.textContent = 'Cadastrar aluno';

    botaoCancelar.hidden = true;
}

botaoCancelar.addEventListener('click', () => {
    limparFormulario();

    mostrarNotificacao('Edição cancelada.');
});

// ======================================
// PESQUISAR ALUNOS
// ======================================

pesquisa.addEventListener('input', renderizarAlunos);

// ======================================
// ATUALIZAR INDICADORES
// ======================================

function atualizarResumo() {
    // Total de alunos cadastrados
    totalAlunos.textContent = alunos.length;

    // Quantidade de alunos aprovados
    const aprovados = alunos.filter(aluno =>
        verificarSituacao(aluno) === 'Aprovado'
    );

    totalAprovados.textContent = aprovados.length;

    // Calcular média geral
    if (alunos.length === 0) {
        mediaGeral.textContent = '0,00';
        return;
    }

    const somaMedias = alunos.reduce((soma, aluno) => {
        return soma + calcularMedia(aluno);
    }, 0);

    const media = somaMedias / alunos.length;

    mediaGeral.textContent = media.toFixed(2).replace('.', ',');
}

// ======================================
// ATUALIZAR TODO O SISTEMA
// ======================================

function atualizarSistema() {
    renderizarAlunos();
    atualizarResumo();
}

// ======================================
// INICIAR SISTEMA
// ======================================

atualizarSistema();
