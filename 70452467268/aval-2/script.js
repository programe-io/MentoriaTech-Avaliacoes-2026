const movimentacaoForm = document.getElementById("movimentacaoForm");
const metaForm = document.getElementById("metaForm");
const economiaForm = document.getElementById("economiaForm");

const listaMetas = document.getElementById("listaMetas");
const metaEscolhida = document.getElementById("metaEscolhida");
const resumoCategorias = document.getElementById("resumoCategorias");
const mensagem = document.getElementById("mensagem");

let movimentacoes = [];
let metas = [];

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Registrar receitas e despesas
movimentacaoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const valor = Number(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;

    if (!descricao || !tipo || !categoria || !Number.isFinite(valor) || valor <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    movimentacoes.push({
        descricao: descricao,
        valor: valor,
        tipo: tipo,
        categoria: categoria
    });

    movimentacaoForm.reset();
    atualizarSistema();
});

// Criar metas
metaForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeMeta").value.trim();
    const valor = Number(document.getElementById("valorMeta").value);

    if (!nome || !Number.isFinite(valor) || valor <= 0) {
        alert("Informe uma meta e um valor válido.");
        return;
    }

    metas.push({
        id: Date.now(),
        nome: nome,
        objetivo: valor,
        economizado: 0
    });

    metaForm.reset();
    atualizarSistema();
});

// Atualizar o valor economizado
economiaForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = Number(metaEscolhida.value);
    const valor = Number(document.getElementById("valorEconomia").value);

    const meta = metas.find(function(item) {
        return item.id === id;
    });

    if (!meta || !Number.isFinite(valor) || valor <= 0) {
        mensagem.textContent = "Selecione uma meta e informe um valor válido.";
        return;
    }

    meta.economizado += valor;

    if (meta.economizado > meta.objetivo) {
        meta.economizado = meta.objetivo;
    }

    mensagem.textContent = "Meta atualizada com sucesso!";

    economiaForm.reset();
    atualizarSistema();
});

// Calcular receitas, despesas e saldo
function atualizarResumo() {
    let receitas = 0;
    let despesas = 0;

    for (let i = 0; i < movimentacoes.length; i++) {
        if (movimentacoes[i].tipo === "receita") {
            receitas += movimentacoes[i].valor;
        } else {
            despesas += movimentacoes[i].valor;
        }
    }

    document.getElementById("receitas").textContent = moeda(receitas);
    document.getElementById("despesas").textContent = moeda(despesas);
    document.getElementById("saldo").textContent = moeda(receitas - despesas);
}

// Atualizar opções das metas
function atualizarOpcoes() {
    metaEscolhida.replaceChildren();

    const inicial = document.createElement("option");
    inicial.value = "";
    inicial.textContent = "Selecione uma meta";
    metaEscolhida.appendChild(inicial);

    for (let i = 0; i < metas.length; i++) {
        const meta = metas[i];

        if (meta.economizado < meta.objetivo) {
            const opcao = document.createElement("option");
            opcao.value = meta.id;
            opcao.textContent = meta.nome;
            metaEscolhida.appendChild(opcao);
        }
    }
}

// Mostrar progresso das metas
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

        card.append(titulo, valores, progresso, porcentagem);
        listaMetas.appendChild(card);
    }
}

// Agrupar despesas por categoria
function mostrarCategorias() {
    resumoCategorias.replaceChildren();

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
        resumoCategorias.appendChild(aviso);
        return;
    }

    for (let i = 0; i < nomes.length; i++) {
        const linha = document.createElement("div");
        linha.className = "categoria";

        const texto = document.createElement("p");
        texto.textContent = nomes[i] + ": " + moeda(categorias[nomes[i]]);

        linha.appendChild(texto);
        resumoCategorias.appendChild(linha);
    }
}

function atualizarSistema() {
    atualizarResumo();
    atualizarOpcoes();
    mostrarMetas();
    mostrarCategorias();
}