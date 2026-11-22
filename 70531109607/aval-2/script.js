
// Elementos do HTML
const participanteForm = document.getElementById("participanteForm");
const acaoForm = document.getElementById("acaoForm");

const nomeParticipante = document.getElementById("nomeParticipante");
const turma = document.getElementById("turma");
const participanteEscolhido = document.getElementById("participanteEscolhido");
const nomeAcao = document.getElementById("nomeAcao");
const categoria = document.getElementById("categoria");

const listaParticipantes = document.getElementById("listaParticipantes");
const ranking = document.getElementById("ranking");
const historico = document.getElementById("historico");
const mensagem = document.getElementById("mensagem");

const totalParticipantes = document.getElementById("totalParticipantes");
const totalAcoes = document.getElementById("totalAcoes");
const totalPontos = document.getElementById("totalPontos");

// Chaves de armazenamento
const CHAVE_PARTICIPANTES = "ecoParticipantes";
const CHAVE_ACOES = "ecoAcoes";

// Recuperar dados salvos
function carregarDados(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
}

let participantes = carregarDados(CHAVE_PARTICIPANTES);
let acoes = carregarDados(CHAVE_ACOES);

// Salvar informações
function salvarDados() {
    try {
        localStorage.setItem(
            CHAVE_PARTICIPANTES,
            JSON.stringify(participantes)
        );

        localStorage.setItem(
            CHAVE_ACOES,
            JSON.stringify(acoes)
        );

        return true;
    } catch (erro) {
        mostrarMensagem("Não foi possível salvar os dados neste navegador.");
        return false;
    }
}

// Pontuação por categoria
function calcularPontos(categoriaSelecionada) {
    const pontuacao = {
        "Reciclagem": 10,
        "Economia de água": 15,
        "Economia de energia": 15,
        "Plantio": 20,
        "Limpeza": 15
    };

    return pontuacao[categoriaSelecionada] || 0;
}

// Exibir mensagem
let temporizadorMensagem;

function mostrarMensagem(texto) {
    mensagem.textContent = texto;

    clearTimeout(temporizadorMensagem);

    temporizadorMensagem = setTimeout(() => {
        mensagem.textContent = "";
    }, 3500);
}

// Criar elemento de texto com segurança
function criarItem(texto) {
    const elemento = document.createElement("p");
    elemento.textContent = texto;
    return elemento;
}

// Atualizar opções de participantes
function atualizarSelecao() {
    const valorAnterior = participanteEscolhido.value;

    participanteEscolhido.innerHTML = "";

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione um participante";

    participanteEscolhido.appendChild(opcaoInicial);

    participantes.forEach((participante) => {
        const opcao = document.createElement("option");

        opcao.value = participante.id;
        opcao.textContent = participante.nome;

        participanteEscolhido.appendChild(opcao);
    });

    if (participantes.some(p => p.id === valorAnterior)) {
        participanteEscolhido.value = valorAnterior;
    }
}

// Mostrar participantes cadastrados
function atualizarParticipantes() {
    listaParticipantes.innerHTML = "";

    if (participantes.length === 0) {
        listaParticipantes.appendChild(
            criarItem("Nenhum participante cadastrado.")
        );
        return;
    }

    participantes.forEach((participante) => {
        const item = criarItem(
            participante.nome +
            " | Turma: " + participante.turma +
            " | Pontos: " + participante.pontos
        );

        listaParticipantes.appendChild(item);
    });
}

// Organizar e mostrar ranking
function atualizarRanking() {
    ranking.innerHTML = "";

    if (participantes.length === 0) {
        ranking.appendChild(
            criarItem("O ranking aparecerá aqui.")
        );
        return;
    }

    const classificados = [...participantes].sort(
        (a, b) => b.pontos - a.pontos
    );

    classificados.forEach((participante, indice) => {
        const item = criarItem(
            (indice + 1) + "º lugar - " +
            participante.nome + ": " +
            participante.pontos + " pontos"
        );

        ranking.appendChild(item);
    });
}

// Mostrar histórico de ações
function atualizarHistorico() {
    historico.innerHTML = "";

    if (acoes.length === 0) {
        historico.appendChild(
            criarItem("Nenhuma atividade registrada.")
        );
        return;
    }

    [...acoes].reverse().forEach((acao) => {
        const item = criarItem(
            acao.participante +
            " realizou " + acao.nome +
            " (" + acao.categoria + ")" +
            " - " + acao.pontos + " pontos"
        );

        historico.appendChild(item);
    });
}

// Atualizar números do resumo
function atualizarResumo() {
    totalParticipantes.textContent = participantes.length;
    totalAcoes.textContent = acoes.length;

    const pontos = participantes.reduce(
        (soma, participante) => soma + participante.pontos,
        0
    );

    totalPontos.textContent = pontos;
}

// Atualizar todas as partes da página
function atualizarTela() {
    atualizarSelecao();
    atualizarParticipantes();
    atualizarRanking();
    atualizarHistorico();
    atualizarResumo();
}

// Cadastrar participante
participanteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = nomeParticipante.value.trim();
    const turmaInformada = turma.value.trim();

    if (!nome || !turmaInformada) {
        mostrarMensagem("Preencha todos os campos!");
        return;
    }

    const duplicado = participantes.some((participante) =>
        participante.nome.toLowerCase() === nome.toLowerCase() &&
        participante.turma.toLowerCase() === turmaInformada.toLowerCase()
    );

    if (duplicado) {
        mostrarMensagem("Esse participante já está cadastrado nessa turma!");
        return;
    }

    const novoParticipante = {
        id: String(Date.now()) + String(Math.random()),
        nome: nome,
        turma: turmaInformada,
        pontos: 0
    };

    participantes.push(novoParticipante);

    salvarDados();
    participanteForm.reset();
    atualizarTela();

    mostrarMensagem("Participante cadastrado com sucesso!");
});

// Registrar ação sustentável
acaoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const idParticipante = participanteEscolhido.value;
    const descricao = nomeAcao.value.trim();
    const categoriaSelecionada = categoria.value;

    if (!idParticipante || !descricao || !categoriaSelecionada) {
        mostrarMensagem("Preencha todos os campos da ação!");
        return;
    }

    const participante = participantes.find(
        (p) => p.id === idParticipante
    );

    if (!participante) {
        mostrarMensagem("Selecione um participante válido!");
        return;
    }

    const pontos = calcularPontos(categoriaSelecionada);

    if (pontos === 0) {
        mostrarMensagem("Categoria inválida!");
        return;
    }

    // Somar pontos ao participante
    participante.pontos += pontos;

    // Registrar a atividade
    acoes.push({
        participanteId: participante.id,
        participante: participante.nome,
        nome: descricao,
        categoria: categoriaSelecionada,
        pontos: pontos,
        data: new Date().toLocaleString("pt-BR")
    });

    salvarDados();
    acaoForm.reset();
    atualizarTela();

    mostrarMensagem(
        "Ação registrada! " + participante.nome +
        " ganhou " + pontos + " pontos!"
    );
});

// Carregar informações ao abrir a página
atualizarTela();
