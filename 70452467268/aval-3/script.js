const movimentacaoForm = document.getElementById("movimentacaoForm");
const metaForm = document.getElementById("metaForm");

const historico = document.getElementById("historico");
const listaMetas = document.getElementById("listaMetas");
const graficoCategorias = document.getElementById("graficoCategorias");
const mensagem = document.getElementById("mensagem");

const botaoMovimentacao = document.getElementById("botaoMovimentacao");
const cancelarEdicao = document.getElementById("cancelarEdicao");

let movimentacoes = JSON.parse(
    localStorage.getItem("finanMovimentacoes")
) || [];

let metas = JSON.parse(
    localStorage.getItem("finanMetas")
) || [];

let movimentacaoEmEdicao = null;

// Formatar valores em reais
function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar informações no navegador
function salvarDados() {
    localStorage.setItem(
        "finanMovimentacoes",
        JSON.stringify(movimentacoes)
    );

    localStorage.setItem(
        "finanMetas",
        JSON.stringify(metas)
    );
}

// Calcular receitas e despesas
function calcularTotais() {
    let receitas = 0;
    let despesas = 0;

    for (let i = 0; i < movimentacoes.length; i++) {
        const item = movimentacoes[i];

        if (item.tipo === "receita") {
            receitas += item.valor;
        } else {
            despesas += item.valor;
        }
    }

    return {
        receitas: receitas,
        despesas: despesas,
        saldo: receitas - despesas
    };
}

// Atualizar indicadores
function atualizarResumo() {
    const totais = calcularTotais();

    document.getElementById("saldoAtual").textContent =
        moeda(totais.saldo);

    document.getElementById("totalReceitas").textContent =
        moeda(totais.receitas);

    document.getElementById("totalDespesas").textContent =
        moeda(totais.despesas);

    document.getElementById("barraReceita").textContent =
        moeda(totais.receitas);

    document.getElementById("barraDespesa").textContent =
        moeda(totais.despesas);
}

// Cadastrar e editar movimentações
movimentacaoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const valor = Number(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;

    if (!descricao || !tipo || !categoria ||
        !Number.isFinite(valor) || valor <= 0) {
        mensagem.textContent = "Preencha os campos corretamente.";
        return;
    }

    if (movimentacaoEmEdicao !== null) {
        const item = movimentacoes.find(function(movimento) {
            return movimento.id === movimentacaoEmEdicao;
        });

        if (!item) return;

        item.descricao = descricao;
        item.valor = valor;
        item.tipo = tipo;
        item.categoria = categoria;

        mensagem.textContent = "Movimentação atualizada!";
    } else {
        movimentacoes.push({
            id: Date.now(),
            descricao: descricao,
            valor: valor,
            tipo: tipo,
            categoria: categoria
        });

        mensagem.textContent = "Movimentação cadastrada!";
    }

    movimentacaoEmEdicao = null;
    movimentacaoForm.reset();

    botaoMovimentacao.textContent = "Adicionar movimentação";
    cancelarEdicao.hidden = true;

    atualizarSistema();
});

// Preparar edição
function editarMovimentacao(id) {
    const item = movimentacoes.find(function(movimento) {
        return movimento.id === id;
    });

    if (!item) return;

    movimentacaoEmEdicao = id;

    document.getElementById("descricao").value = item.descricao;
    document.getElementById("valor").value = item.valor;
    document.getElementById("tipo").value = item.tipo;
    document.getElementById("categoria").value = item.categoria;

    botaoMovimentacao.textContent = "Salvar alterações";
    cancelarEdicao.hidden = false;

    document.getElementById("descricao").focus();
}

// Cancelar edição
cancelarEdicao.addEventListener("click", function() {
    movimentacaoEmEdicao = null;
    movimentacaoForm.reset();

    botaoMovimentacao.textContent = "Adicionar movimentação";
    cancelarEdicao.hidden = true;

    mensagem.textContent = "Edição cancelada.";
});

// Excluir movimentação
function excluirMovimentacao(id) {
    const confirmar = confirm("Deseja excluir esta movimentação?");

    if (!confirmar) return;

    movimentacoes = movimentacoes.filter(function(item) {
        return item.id !== id;
    });

    if (movimentacaoEmEdicao === id) {
        movimentacaoEmEdicao = null;
        movimentacaoForm.reset();
        botaoMovimentacao.textContent = "Adicionar movimentação";
        cancelarEdicao.hidden = true;
    }

    mensagem.textContent = "Movimentação excluída.";
    atualizarSistema();
}

// Mostrar histórico
function mostrarHistorico() {
    historico.replaceChildren();

    if (movimentacoes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma movimentação registrada.";
        historico.appendChild(aviso);
        return;
    }

    for (let i = 0; i < movimentacoes.length; i++) {
        const item = movimentacoes[i];

        const card = document.createElement("article");
        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = item.descricao;
        titulo.classList.add(item.tipo);

        const valor = document.createElement("p");
        valor.textContent = "Valor: " + moeda(item.valor);

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + item.categoria;

        const tipo = document.createElement("p");
        tipo.textContent = "Tipo: " +
            (item.tipo === "receita" ? "Receita" : "Despesa");

        const botoes = document.createElement("div");
        botoes.className = "acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "editar";
        botaoEditar.addEventListener("click", function() {
            editarMovimentacao(item.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.addEventListener("click", function() {
            excluirMovimentacao(item.id);
        });

        botoes.append(botaoEditar, botaoExcluir);
        card.append(titulo, valor, categoria, tipo, botoes);

        historico.appendChild(card);
    }
}

// Criar metas
metaForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeMeta").value.trim();
    const objetivo = Number(document.getElementById("valorMeta").value);

    if (!nome || !Number.isFinite(objetivo) || objetivo <= 0) {
        alert("Informe um nome e um valor válido.");
        return;
    }

    metas.push({
        id: Date.now(),
        nome: nome,
        objetivo: objetivo,
        economizado: 0
    });

    metaForm.reset();
    mensagem.textContent = "Meta criada com sucesso!";

    atualizarSistema();
});

// Adicionar dinheiro a uma meta
function adicionarEconomia(id) {
    const meta = metas.find(function(item) {
        return item.id === id;
    });

    if (!meta) return;

    const restante = Math.max(0, meta.objetivo - meta.economizado);

    if (restante <= 0) {
        alert("Essa meta já foi concluída!");
        return;
    }

    const entrada = prompt(
        "Quanto deseja adicionar à meta? Valor restante: " + moeda(restante)
    );

    if (entrada === null || entrada.trim() === "") return;

    const valor = Number(entrada.replace(",", "."));

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    meta.economizado += Math.min(valor, restante);

    mensagem.textContent = "Economia adicionada à meta!";
    atualizarSistema();
}

// Excluir meta
function excluirMeta(id) {
    const confirmar = confirm("Deseja excluir esta meta?");

    if (!confirmar) return;

    metas = metas.filter(function(item) {
        return item.id !== id;
    });

    mensagem.textContent = "Meta excluída.";
    atualizarSistema();
}

// Mostrar metas e progresso
function mostrarMetas() {
    listaMetas.replaceChildren();

    if (metas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma meta cadastrada.";
        listaMetas.appendChild(aviso);
        return;
    }

    for (let i = 0; i < metas.length; i++) {
        const meta = metas[i];

        const percentual = Math.min(
            (meta.economizado / meta.objetivo) * 100,
            100
        );

        const card = document.createElement("article");
        card.className = "meta";

        const titulo = document.createElement("h3");
        titulo.textContent = meta.nome;

        const valores = document.createElement("p");
        valores.textContent = moeda(meta.economizado) +
            " de " + moeda(meta.objetivo);

        const progresso = document.createElement("div");
        progresso.className = "progresso";

        const barra = document.createElement("div");
        barra.className = "barra";
        barra.style.width = percentual + "%";

        progresso.appendChild(barra);

        const porcentagem = document.createElement("p");
        porcentagem.textContent = percentual.toFixed(1) + "% concluído";

        const botoes = document.createElement("div");
        botoes.className = "acoes";

        const adicionar = document.createElement("button");
        adicionar.textContent = "Adicionar economia";
        adicionar.disabled = percentual >= 100;
        adicionar.addEventListener("click", function() {
            adicionarEconomia(meta.id);
        });

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir meta";
        excluir.className = "excluir";
        excluir.addEventListener("click", function() {
            excluirMeta(meta.id);
        });

        botoes.append(adicionar, excluir);

        card.append(titulo, valores, progresso, porcentagem, botoes);
        listaMetas.appendChild(card);
    }
}

// Relatório de despesas por categoria
function mostrarCategorias() {
    graficoCategorias.replaceChildren();

    const categorias = {};

    for (let i = 0; i < movimentacoes.length; i++) {
        const item = movimentacoes[i];

        if (item.tipo === "despesa") {
            if (!categorias[item.categoria]) {
                categorias[item.categoria] = 0;
            }

            categorias[item.categoria] += item.valor;
        }
    }

    const nomes = Object.keys(categorias);

    if (nomes.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma despesa registrada.";
        graficoCategorias.appendChild(aviso);
        return;
    }

    const maiorValor = Math.max(...Object.values(categorias));

    for (let i = 0; i < nomes.length; i++) {
        const nome = nomes[i];
        const valor = categorias[nome];

        const linha = document.createElement("div");
        linha.className = "categoria";

        const texto = document.createElement("p");
        texto.textContent = nome + ": " + moeda(valor);

        const progresso = document.createElement("div");
        progresso.className = "progresso";

        const barra = document.createElement("div");
        barra.className = "barra";
        barra.style.width = (valor / maiorValor * 100) + "%";

        progresso.appendChild(barra);
        linha.append(texto, progresso);

        graficoCategorias.appendChild(linha);
    }
}

// Atualizar o sistema inteiro
function atualizarSistema() {
    salvarDados();
    atualizarResumo();
    mostrarHistorico();
    mostrarMetas();
    mostrarCategorias();
}

// Inicializar a aplicação
atualizarSistema();