
// Elementos dos formulários
const formularioParticipante = document.getElementById("participanteForm");
const formularioAcao = document.getElementById("acaoForm");

// Elementos das listas e indicadores
const listaParticipantes = document.getElementById("listaParticipantes");
const seletorParticipante = document.getElementById("participanteAcao");
const areaRanking = document.getElementById("ranking");
const areaHistorico = document.getElementById("historico");
const mensagem = document.getElementById("mensagem");

// Botões de edição
const botaoParticipante = document.getElementById("botaoParticipante");
const botaoCancelar = document.getElementById("cancelarEdicao");

// Recupera os dados salvos no navegador
function carregarDados(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave));
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

let participantes = carregarDados("ecoParticipantes");
let acoes = carregarDados("ecoAcoes");

let participanteEmEdicao = null;

// Garante identificadores e dados válidos
participantes = participantes.map((pessoa, indice) => ({
    ...pessoa,
    id: String(pessoa.id || Date.now() + indice),
    nome: pessoa.nome || "",
    turma: pessoa.turma || ""
}));

acoes = acoes.map((acao, indice) => ({
    ...acao,
    id: String(acao.id || Date.now() + indice),
    pontos: Number(acao.pontos) || 0
}));

// Salva os dados no navegador
function salvarDados() {
    localStorage.setItem("ecoParticipantes", JSON.stringify(participantes));
    localStorage.setItem("ecoAcoes", JSON.stringify(acoes));
}

// Exibe mensagens para o usuário
function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

// Calcula os pontos de cada categoria
function calcularPontos(categoria) {
    const tabelaPontos = {
        "Reciclagem": 10,
        "Plantio": 15,
        "Economia de água": 10,
        "Economia de energia": 10,
        "Limpeza": 15
    };

    return tabelaPontos[categoria] || 5;
}

// Atualiza os números do painel
function atualizarIndicadores() {
    const quantidadePontos = acoes.reduce(
        (soma, acao) => soma + (Number(acao.pontos) || 0),
        0
    );

    document.getElementById("totalParticipantes").textContent =
        participantes.length;

    document.getElementById("totalAcoes").textContent =
        acoes.length;

    document.getElementById("totalPontos").textContent =
        quantidadePontos;
}

// Cadastra ou edita participantes
formularioParticipante.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nomeParticipante").value.trim();
    const turma = document.getElementById("turma").value.trim();

    if (!nome || !turma) {
        mostrarMensagem("Preencha todos os campos!");
        return;
    }

    if (participanteEmEdicao !== null) {
        const pessoa = participantes.find(
            item => item.id === participanteEmEdicao
        );

        if (pessoa) {
            pessoa.nome = nome;
            pessoa.turma = turma;
        }

        mostrarMensagem("Participante atualizado com sucesso!");

    } else {
        participantes.push({
            id: Date.now().toString(),
            nome: nome,
            turma: turma
        });

        mostrarMensagem("Participante cadastrado com sucesso!");
    }

    participanteEmEdicao = null;

    formularioParticipante.reset();
    botaoParticipante.textContent = "Cadastrar participante";
    botaoCancelar.hidden = true;

    salvarDados();
    atualizarPagina();
});

// Registra uma nova ação sustentável
formularioAcao.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const idParticipante = seletorParticipante.value;
    const nomeAcao = document.getElementById("nomeAcao").value.trim();
    const categoria = document.getElementById("categoria").value;

    const pessoa = participantes.find(
        item => item.id === idParticipante
    );

    if (!pessoa || !nomeAcao || !categoria) {
        mostrarMensagem("Confira os dados da ação!");
        return;
    }

    const novaAcao = {
        id: Date.now().toString(),
        participanteId: pessoa.id,
        participante: pessoa.nome,
        nome: nomeAcao,
        categoria: categoria,
        pontos: calcularPontos(categoria),
        data: new Date().toLocaleDateString("pt-BR")
    };

    acoes.push(novaAcao);

    formularioAcao.reset();

    salvarDados();
    atualizarPagina();

    mostrarMensagem("Ação registrada com sucesso! +" +
        novaAcao.pontos + " pontos.");
});

// Mostra os participantes cadastrados
function mostrarParticipantes() {
    listaParticipantes.replaceChildren();
    seletorParticipante.replaceChildren();

    const opcaoInicial = document.createElement("option");
    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione um participante";

    seletorParticipante.appendChild(opcaoInicial);

    if (participantes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum participante cadastrado.";
        listaParticipantes.appendChild(aviso);
    }

    participantes.forEach(pessoa => {
        const cartao = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = pessoa.nome;

        const turma = document.createElement("p");
        turma.textContent = "Turma: " + pessoa.turma;

        const editar = document.createElement("button");
        editar.type = "button";
        editar.textContent = "Editar";

        editar.addEventListener("click", function() {
            document.getElementById("nomeParticipante").value = pessoa.nome;
            document.getElementById("turma").value = pessoa.turma;

            participanteEmEdicao = pessoa.id;

            botaoParticipante.textContent = "Salvar alterações";
            botaoCancelar.hidden = false;

            mostrarMensagem("Editando participante: " + pessoa.nome);

            formularioParticipante.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });

        cartao.append(titulo, turma, editar);
        listaParticipantes.appendChild(cartao);

        const opcao = document.createElement("option");
        opcao.value = pessoa.id;
        opcao.textContent = pessoa.nome;

        seletorParticipante.appendChild(opcao);
    });
}

// Exibe o ranking de pontuação
function mostrarRanking() {
    areaRanking.replaceChildren();

    if (participantes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhum participante no ranking.";
        areaRanking.appendChild(aviso);
        return;
    }

    const ranking = participantes.map(pessoa => {
        const pontos = acoes
            .filter(acao => acao.participanteId === pessoa.id)
            .reduce((soma, acao) => soma + acao.pontos, 0);

        return {
            nome: pessoa.nome,
            turma: pessoa.turma,
            pontos: pontos
        };
    });

    ranking.sort((a, b) => b.pontos - a.pontos);

    ranking.forEach((pessoa, indice) => {
        const cartao = document.createElement("div");

        const colocacao = document.createElement("h3");
        colocacao.textContent =
            (indice + 1) + "º lugar - " + pessoa.nome;

        const turma = document.createElement("p");
        turma.textContent = "Turma: " + pessoa.turma;

        const pontos = document.createElement("p");
        pontos.textContent = "Pontuação: " + pessoa.pontos + " pontos";

        cartao.append(colocacao, turma, pontos);
        areaRanking.appendChild(cartao);
    });
}

// Exibe o histórico de ações
function mostrarHistorico() {
    areaHistorico.replaceChildren();

    if (acoes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma ação registrada.";
        areaHistorico.appendChild(aviso);
        return;
    }

    [...acoes].reverse().forEach(acao => {
        const cartao = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = acao.nome || "Ação sustentável";

        const pessoa = participantes.find(
            item => item.id === acao.participanteId
        );

        const participante = document.createElement("p");
        participante.textContent =
            "Participante: " + (pessoa?.nome || acao.participante || "Não identificado");

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + (acao.categoria || "Não informada");

        const pontos = document.createElement("p");
        pontos.textContent = "Pontos: " + acao.pontos;

        const data = document.createElement("p");
        data.textContent = "Data: " + (acao.data || "Não informada");

        cartao.append(titulo, participante, categoria, pontos, data);
        areaHistorico.appendChild(cartao);
    });
}

// Atualiza todas as áreas do sistema
function atualizarPagina() {
    mostrarParticipantes();
    mostrarRanking();
    mostrarHistorico();
    atualizarIndicadores();
}

// Cancela a edição de um participante
botaoCancelar.addEventListener("click", function() {
    participanteEmEdicao = null;

    formularioParticipante.reset();

    botaoParticipante.textContent = "Cadastrar participante";
    botaoCancelar.hidden = true;

    mostrarMensagem("Edição cancelada.");
});

// Inicializa o sistema
atualizarPagina();
