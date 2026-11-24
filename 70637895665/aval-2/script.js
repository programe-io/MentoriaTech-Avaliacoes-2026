
// =====================================
// 1. CONFIGURAÇÕES INICIAIS
// =====================================

const STORAGE_KEY = "controleFinanceiro";

let movimentacoes = carregarDados();

let filtroAtual = "todos";

const formulario = document.getElementById(
    "form-financeiro"
);

const campoId = document.getElementById("id");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");
const categoria = document.getElementById("categoria");
const data = document.getElementById("data");

const lista = document.getElementById(
    "lista-financeira"
);

const totalReceitas = document.getElementById(
    "total-receitas"
);

const totalDespesas = document.getElementById(
    "total-despesas"
);

const saldoTotal = document.getElementById(
    "saldo-total"
);

const botaoSalvar = document.getElementById(
    "btn-salvar"
);

const botaoCancelar = document.getElementById(
    "btn-cancelar"
);


// =====================================
// 2. CARREGAR DADOS DO LOCALSTORAGE
// =====================================

function carregarDados() {

    try {

        const dados = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(dados) ? dados : [];

    } catch (erro) {

        console.error("Erro ao carregar dados:", erro);

        return [];

    }

}


// =====================================
// 3. SALVAR DADOS
// =====================================

function salvarDados(novosDados) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(novosDados)
        );

        movimentacoes = novosDados;

        return true;

    } catch (erro) {

        alert("Não foi possível salvar os dados.");

        return false;

    }

}


// =====================================
// 4. FORMATAR MOEDA
// =====================================

function formatarMoeda(numero) {

    return Number(numero).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// =====================================
// 5. CADASTRAR MOVIMENTAÇÃO - CREATE
// =====================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = campoId.value;

    const descricaoValor = descricao.value.trim();

    const valorNumerico = Number(valor.value);

    const tipoValor = tipo.value;

    const categoriaValor = categoria.value;

    const dataValor = data.value;

    if (
        !descricaoValor ||
        !Number.isFinite(valorNumerico) ||
        valorNumerico <= 0 ||
        !dataValor
    ) {

        alert("Preencha todos os campos corretamente!");

        return;

    }

    const movimentacao = {

        id: id || (
            Date.now().toString() +
            Math.random().toString(16).slice(2)
        ),

        descricao: descricaoValor,

        valor: valorNumerico,

        tipo: tipoValor,

        categoria: categoriaValor,

        data: dataValor

    };

    let novosDados;

    if (id) {

        // UPDATE

        novosDados = movimentacoes.map(item => {

            return item.id === id
                ? movimentacao
                : item;

        });

    } else {

        // CREATE

        novosDados = [
            ...movimentacoes,
            movimentacao
        ];

    }

    if (!salvarDados(novosDados)) return;

    formulario.reset();

    campoId.value = "";

    data.value = obterDataAtual();

    botaoSalvar.textContent =
        "Cadastrar movimentação";

    botaoCancelar.hidden = true;

    atualizarSistema();

    alert(
        id
            ? "Movimentação atualizada!"
            : "Movimentação cadastrada!"
    );

});


// =====================================
// 6. LISTAR MOVIMENTAÇÕES - READ
// =====================================

function listarMovimentacoes() {

    lista.replaceChildren();

    const dadosFiltrados = movimentacoes
        .filter(item => {

            return filtroAtual === "todos" ||
                item.tipo === filtroAtual;

        })
        .sort((a, b) => b.data.localeCompare(a.data));

    if (dadosFiltrados.length === 0) {

        const linha = document.createElement("tr");

        const celula = document.createElement("td");

        celula.colSpan = 6;

        celula.textContent =
            "Nenhuma movimentação encontrada.";

        linha.appendChild(celula);

        lista.appendChild(linha);

        return;

    }

    dadosFiltrados.forEach(item => {

        const linha = document.createElement("tr");

        function criarCelula(conteudo) {

            const celula = document.createElement("td");

            celula.textContent = conteudo;

            linha.appendChild(celula);

            return celula;

        }

        criarCelula(formatarData(item.data));

        criarCelula(item.descricao);

        criarCelula(item.categoria);

        const celulaTipo = criarCelula(
            item.tipo === "receita"
                ? "Receita"
                : "Despesa"
        );

        celulaTipo.className = item.tipo;

        const sinal = item.tipo === "receita"
            ? "+ "
            : "- ";

        const celulaValor = criarCelula(
            sinal + formatarMoeda(item.valor)
        );

        celulaValor.className = item.tipo;

        const acoes = document.createElement("td");

        const editar = document.createElement("button");

        editar.textContent = "Editar";

        editar.className = "btn-editar";

        editar.dataset.acao = "editar";

        editar.dataset.id = item.id;

        const excluir = document.createElement("button");

        excluir.textContent = "Excluir";

        excluir.className = "btn-excluir";

        excluir.dataset.acao = "excluir";

        excluir.dataset.id = item.id;

        acoes.append(editar, excluir);

        linha.appendChild(acoes);

        lista.appendChild(linha);

    });

}


// =====================================
// 7. EDITAR MOVIMENTAÇÃO - UPDATE
// =====================================

function editarMovimentacao(id) {

    const item = movimentacoes.find(
        movimentacao => movimentacao.id === id
    );

    if (!item) return;

    campoId.value = item.id;

    descricao.value = item.descricao;

    valor.value = item.valor;

    tipo.value = item.tipo;

    categoria.value = item.categoria;

    data.value = item.data;

    botaoSalvar.textContent = "Salvar alterações";

    botaoCancelar.hidden = false;

    descricao.focus();

}


// =====================================
// 8. EXCLUIR MOVIMENTAÇÃO - DELETE
// =====================================

function excluirMovimentacao(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta movimentação?"
    );

    if (!confirmar) return;

    const novosDados = movimentacoes.filter(
        item => item.id !== id
    );

    if (!salvarDados(novosDados)) return;

    if (campoId.value === id) {

        formulario.reset();

        campoId.value = "";

        data.value = obterDataAtual();

        botaoSalvar.textContent =
            "Cadastrar movimentação";

        botaoCancelar.hidden = true;

    }

    atualizarSistema();

    alert("Movimentação excluída!");

}


// =====================================
// 9. BOTÕES DE EDIÇÃO E EXCLUSÃO
// =====================================

lista.addEventListener("click", function(event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const id = botao.dataset.id;

    if (botao.dataset.acao === "editar") {

        editarMovimentacao(id);

    }

    if (botao.dataset.acao === "excluir") {

        excluirMovimentacao(id);

    }

});


// =====================================
// 10. FILTRAR MOVIMENTAÇÕES
// =====================================

document.querySelector(".filtros")
    .addEventListener("click", function(event) {

        const botao = event.target.closest(
            "button[data-filtro]"
        );

        if (!botao) return;

        filtroAtual = botao.dataset.filtro;

        document.querySelectorAll(
            ".filtros button"
        ).forEach(button => {

            button.classList.toggle(
                "ativo",
                button === botao
            );

        });

        listarMovimentacoes();

    });


// =====================================
// 11. CALCULAR RECEITAS, DESPESAS E SALDO
// =====================================

function atualizarResumo() {

    const receitas = movimentacoes
        .filter(item => item.tipo === "receita")
        .reduce((total, item) => total + Number(item.valor), 0);

    const despesas = movimentacoes
        .filter(item => item.tipo === "despesa")
        .reduce((total, item) => total + Number(item.valor), 0);

    const saldo = receitas - despesas;

    totalReceitas.textContent =
        formatarMoeda(receitas);

    totalDespesas.textContent =
        formatarMoeda(despesas);

    saldoTotal.textContent =
        formatarMoeda(saldo);

    saldoTotal.classList.toggle(
        "negative",
        saldo < 0
    );

}


// =====================================
// 12. CANCELAR EDIÇÃO
// =====================================

botaoCancelar.addEventListener("click", function() {

    formulario.reset();

    campoId.value = "";

    data.value = obterDataAtual();

    botaoSalvar.textContent =
        "Cadastrar movimentação";

    botaoCancelar.hidden = true;

});


// =====================================
// 13. FORMATAR DATA
// =====================================

function formatarData(dataTexto) {

    const partes = dataTexto.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


function obterDataAtual() {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes = String(
        hoje.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoje.getDate()
    ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;

}


// =====================================
// 14. ATUALIZAR SISTEMA
// =====================================

function atualizarSistema() {

    listarMovimentacoes();

    atualizarResumo();

}


// =====================================
// 15. INICIALIZAR PROJETO
// =====================================

data.value = obterDataAtual();

document.querySelector(
    '.filtros button[data-filtro="todos"]'
).classList.add("ativo");

atualizarSistema();
