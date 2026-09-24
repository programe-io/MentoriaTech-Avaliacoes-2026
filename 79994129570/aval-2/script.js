// ===============================
// CONFIGURAÇÕES
// ===============================

const RENDA_MENSAL = 5697;
const META_INVESTIMENTO = 1100;

const categoriasPadrao = [
    "Alimentação",
    "Moradia",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação"
];

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

let categorias =
    JSON.parse(localStorage.getItem("categorias")) ||
    categoriasPadrao;


// ===============================
// ELEMENTOS
// ===============================

const listaGastos = document.getElementById("listaGastos");
const listaCategorias = document.getElementById("listaCategorias");

const rendaTotal = document.getElementById("rendaTotal");
const gastosTotal = document.getElementById("gastosTotal");
const investimentoTotal = document.getElementById("investimentoTotal");
const saldoTotal = document.getElementById("saldoTotal");

const modalGasto = document.getElementById("modalGasto");
const modalCategoria = document.getElementById("modalCategoria");

const formGasto = document.getElementById("formGasto");
const formCategoria = document.getElementById("formCategoria");

const categoriaSelect = document.getElementById("categoria");

const mesSelecionado = document.getElementById("mesSelecionado");


// ===============================
// DATA ATUAL
// ===============================

const hoje = new Date();

const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

const mesAtual = `${ano}-${mes}`;

mesSelecionado.value = mesAtual;

document.getElementById("data").value =
    `${ano}-${mes}-${dia}`;


// ===============================
// FORMATAÇÃO DE DINHEIRO
// ===============================

function dinheiro(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ===============================
// SALVAR DADOS
// ===============================

function salvarDados() {

    localStorage.setItem(
        "gastos",
        JSON.stringify(gastos)
    );

    localStorage.setItem(
        "categorias",
        JSON.stringify(categorias)
    );
}


// ===============================
// FILTRAR GASTOS
// ===============================

function gastosDoMes() {

    const mes = mesSelecionado.value;

    return gastos.filter(gasto =>
        gasto.data.startsWith(mes)
    );
}


// ===============================
// ATUALIZAR DASHBOARD
// ===============================

function atualizarDashboard() {

    const gastosMes = gastosDoMes();

    const totalGastos = gastosMes
        .filter(gasto => gasto.tipo === "gasto")
        .reduce(
            (total, gasto) => total + Number(gasto.valor),
            0
        );

    const totalInvestimentos = gastosMes
        .filter(gasto => gasto.tipo === "investimento")
        .reduce(
            (total, gasto) => total + Number(gasto.valor),
            0
        );

    const saldo =
        RENDA_MENSAL -
        totalGastos -
        totalInvestimentos;

    rendaTotal.textContent =
        dinheiro(RENDA_MENSAL);

    gastosTotal.textContent =
        dinheiro(totalGastos);

    investimentoTotal.textContent =
        dinheiro(totalInvestimentos);

    saldoTotal.textContent =
        dinheiro(saldo);


    // Progresso da meta

    let percentual =
        (totalInvestimentos / META_INVESTIMENTO) * 100;

    percentual = Math.min(percentual, 100);

    document.getElementById(
        "barraProgresso"
    ).style.width = percentual + "%";

    document.getElementById(
        "textoProgresso"
    ).textContent =
        `${dinheiro(totalInvestimentos)} de ${dinheiro(META_INVESTIMENTO)}`;

}


// ===============================
// MOSTRAR GASTOS
// ===============================

function mostrarGastos() {

    const gastosMes = gastosDoMes();

    listaGastos.innerHTML = "";

    if (gastosMes.length === 0) {

        listaGastos.innerHTML = `
            <p style="color: #6b7280;">
                Nenhum gasto registrado neste mês.
            </p>
        `;

        return;
    }


    gastosMes
        .sort((a, b) =>
            new Date(b.data) - new Date(a.data)
        )
        .forEach(gasto => {

            const div = document.createElement("div");

            div.className = "gasto";

            div.innerHTML = `

                <div class="gasto-info">

                    <strong>
                        ${escaparHTML(gasto.descricao)}
                    </strong>

                    <small>
                        ${escaparHTML(gasto.categoria)}
                        • ${formatarData(gasto.data)}
                    </small>

                </div>

                <div class="gasto-direita">

                    <span class="gasto-valor">
                        ${dinheiro(Number(gasto.valor))}
                    </span>

                    <button
                        class="btn-excluir"
                        onclick="excluirGasto('${gasto.id}')"
                    >
                        🗑
                    </button>

                </div>
            `;

            listaGastos.appendChild(div);

        });

}


// ===============================
// MOSTRAR CATEGORIAS
// ===============================

function mostrarCategorias() {

    listaCategorias.innerHTML = "";

    categorias.forEach(categoria => {

        const gastosCategoria =
            gastosDoMes()
                .filter(gasto =>
                    gasto.categoria === categoria &&
                    gasto.tipo === "gasto"
                )
                .reduce(
                    (total, gasto) =>
                        total + Number(gasto.valor),
                    0
                );

        const div =
            document.createElement("div");

        div.className = "categoria";

        div.innerHTML = `
            <span>${escaparHTML(categoria)}</span>
            <span>${dinheiro(gastosCategoria)}</span>
        `;

        listaCategorias.appendChild(div);

    });

}


// ===============================
// PREENCHER SELECT
// ===============================

function atualizarCategoriasSelect() {

    categoriaSelect.innerHTML = "";

    categorias.forEach(categoria => {

        const option =
            document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        categoriaSelect.appendChild(option);

    });

}


// ===============================
// ADICIONAR GASTO
// ===============================

formGasto.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value.trim();

        const categoria =
            document.getElementById("categoria").value;

        const valor =
            Number(document.getElementById("valor").value);

        const data =
            document.getElementById("data").value;


        if (!descricao || !categoria || valor <= 0 || !data) {

            alert("Preencha todos os campos corretamente.");

            return;
        }


        const novoGasto = {

            id: Date.now().toString(),

            descricao,

            categoria,

            valor,

            data,

            tipo: "gasto"

        };


        gastos.push(novoGasto);

        salvarDados();

        formGasto.reset();

        document.getElementById("data").value =
            `${ano}-${mes}-${dia}`;

        fecharModalGasto();

        atualizarTudo();

    }
);


// ===============================
// NOVA CATEGORIA
// ===============================

formCategoria.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const nome =
            document
                .getElementById("nomeCategoria")
                .value
                .trim();


        if (!nome) {

            alert("Digite o nome da categoria.");

            return;
        }


        const existe =
            categorias.some(
                categoria =>
                    categoria.toLowerCase() ===
                    nome.toLowerCase()
            );


        if (existe) {

            alert("Essa categoria já existe.");

            return;
        }


        categorias.push(nome);

        salvarDados();

        formCategoria.reset();

        fecharModalCategoria();

        atualizarTudo();

    }
);


// ===============================
// EXCLUIR GASTO
// ===============================

function excluirGasto(id) {

    const confirmar =
        confirm("Deseja realmente excluir este gasto?");

    if (!confirmar) return;

    gastos =
        gastos.filter(gasto =>
            gasto.id !== id
        );

    salvarDados();

    atualizarTudo();

}


// ===============================
// MODAL GASTO
// ===============================

document
    .getElementById("btnAdicionarGasto")
    .addEventListener(
        "click",
        () => {

            modalGasto.classList.add("ativo");

        }
    );


document
    .getElementById("fecharGasto")
    .addEventListener(
        "click",
        fecharModalGasto
    );


function fecharModalGasto() {

    modalGasto.classList.remove("ativo");

}


// ===============================
// MODAL CATEGORIA
// ===============================

document
    .getElementById("btnNovaCategoria")
    .addEventListener(
        "click",
        () => {

            modalCategoria.classList.add("ativo");

        }
    );


document
    .getElementById("fecharCategoria")
    .addEventListener(
        "click",
        fecharModalCategoria
    );


function fecharModalCategoria() {

    modalCategoria.classList.remove("ativo");

}


// ===============================
// TROCAR MÊS
// ===============================

mesSelecionado.addEventListener(
    "change",
    atualizarTudo
);


// ===============================
// MODO ESCURO
// ===============================

document
    .getElementById("btnTema")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle("escuro");

            const escuro =
                document.body.classList.contains("escuro");

            localStorage.setItem(
                "temaEscuro",
                escuro
            );

            document.getElementById(
                "btnTema"
            ).textContent =
                escuro ? "☀️" : "🌙";

        }
    );


// Recuperar tema

if (
    localStorage.getItem("temaEscuro") === "true"
) {

    document.body.classList.add("escuro");

    document.getElementById(
        "btnTema"
    ).textContent = "☀️";

}


// ===============================
// FUNÇÕES AUXILIARES
// ===============================

function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


// ===============================
// ATUALIZAR TUDO
// ===============================

function atualizarTudo() {

    atualizarCategoriasSelect();

    mostrarGastos();

    mostrarCategorias();

    atualizarDashboard();

}


// INICIALIZAÇÃO

atualizarTudo();
