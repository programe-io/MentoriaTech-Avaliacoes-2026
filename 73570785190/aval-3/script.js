
const form = document.querySelector("#form-anamnese");
const lista = document.querySelector("#lista-pacientes");
const busca = document.querySelector("#busca");

const totalPacientes = document.querySelector("#total-pacientes");
const totalFichas = document.querySelector("#total-fichas");

const btnSalvar = document.querySelector("#btn-salvar");
const btnCancelar = document.querySelector("#btn-cancelar");
const tituloFormulario = document.querySelector("#titulo-formulario");

// Recuperar fichas salvas
let fichas = JSON.parse(localStorage.getItem("anamnese")) || [];

// Campos do formulário
const campos = [
    "nome",
    "nascimento",
    "sexo",
    "telefone",
    "email",
    "profissao",
    "data-atendimento",
    "profissional",
    "queixa",
    "historico",
    "doencas",
    "alergias",
    "medicamentos",
    "cirurgias",
    "familia",
    "alimentacao",
    "atividade",
    "tabagismo",
    "alcool",
    "observacoes",
    "conduta"
];

// Salvar no localStorage
function salvarDados() {
    localStorage.setItem("anamnese", JSON.stringify(fichas));
}

// Capturar dados do formulário
function capturarDados() {
    const dados = {};

    campos.forEach(campo => {
        dados[campo] = document.getElementById(campo).value.trim();
    });

    return dados;
}

// Preencher formulário
function preencherFormulario(ficha) {
    campos.forEach(campo => {
        document.getElementById(campo).value = ficha[campo] || "";
    });

    document.querySelector("#ficha-id").value = ficha.id;
}

// Limpar formulário e voltar ao modo cadastro
function limparFormulario() {
    form.reset();

    document.querySelector("#ficha-id").value = "";

    btnSalvar.textContent = "Salvar ficha";
    btnCancelar.hidden = true;

    tituloFormulario.textContent = "Nova ficha de anamnese";
}

// Cadastrar ou editar ficha
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = capturarDados();

    if (!dados.nome || !dados.nascimento ||
        !dados["data-atendimento"] || !dados.queixa) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    if (dados.nascimento > new Date().toLocaleDateString("en-CA")) {
        alert("A data de nascimento não pode ser futura!");
        return;
    }

    const id = document.querySelector("#ficha-id").value;

    if (id) {
        const ficha = fichas.find(f => f.id === Number(id));

        if (!ficha) {
            alert("Ficha não encontrada.");
            return;
        }

        Object.assign(ficha, dados);

        alert("Ficha atualizada com sucesso!");

    } else {
        const novaFicha = {
            id: Date.now(),
            ...dados
        };

        fichas.push(novaFicha);

        alert("Ficha cadastrada com sucesso!");
    }

    salvarDados();
    limparFormulario();
    render();
});

// Editar ficha
function editarFicha(id) {
    const ficha = fichas.find(f => f.id === id);

    if (!ficha) return;

    preencherFormulario(ficha);

    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    tituloFormulario.textContent = "Editar ficha de anamnese";

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Visualizar e imprimir ficha
function visualizarFicha(id) {
    const ficha = fichas.find(f => f.id === id);

    if (!ficha) return;

    preencherFormulario(ficha);

    btnSalvar.textContent = "Salvar ficha";
    btnCancelar.hidden = false;

    tituloFormulario.textContent = "Ficha para visualização e impressão";

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        window.print();
    }, 300);
}

// Excluir ficha
function excluirFicha(id) {
    const ficha = fichas.find(f => f.id === id);

    if (!ficha) return;

    const confirmar = confirm(
        `Deseja excluir a ficha de ${ficha.nome}?`
    );

    if (!confirmar) return;

    fichas = fichas.filter(f => f.id !== id);

    salvarDados();
    render();

    if (Number(document.querySelector("#ficha-id").value) === id) {
        limparFormulario();
    }
}

// Formatar data
function formatarData(data) {
    if (!data) return "-";

    const partes = data.split("-");

    if (partes.length !== 3) return data;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Criar tabela de pacientes
function renderLista() {
    lista.innerHTML = "";

    const termo = busca.value.trim().toLowerCase();

    const resultado = fichas.filter(ficha =>
        ficha.nome.toLowerCase().includes(termo)
    );

    if (resultado.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 5;
        td.classList.add("vazio");
        td.textContent = "Nenhuma ficha encontrada.";

        tr.appendChild(td);
        lista.appendChild(tr);

        return;
    }

    resultado.forEach(ficha => {
        const tr = document.createElement("tr");

        const valores = [
            ficha.nome,
            ficha.telefone || "-",
            formatarData(ficha["data-atendimento"]),
            ficha.profissional || "-"
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });

        const tdAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.classList.add("acoes");

        const btnVisualizar = document.createElement("button");
        btnVisualizar.textContent = "Imprimir";
        btnVisualizar.classList.add("visualizar");
        btnVisualizar.dataset.acao = "visualizar";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("editar");
        btnEditar.dataset.acao = "editar";

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("excluir");
        btnExcluir.dataset.acao = "excluir";

        [btnVisualizar, btnEditar, btnExcluir].forEach(botao => {
            botao.dataset.id = ficha.id;
            acoes.appendChild(botao);
        });

        tdAcoes.appendChild(acoes);
        tr.appendChild(tdAcoes);

        lista.appendChild(tr);
    });
}

// Delegação de eventos na tabela
lista.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao || !lista.contains(botao)) return;

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;

    if (acao === "editar") {
        editarFicha(id);
    }

    if (acao === "excluir") {
        excluirFicha(id);
    }

    if (acao === "visualizar") {
        visualizarFicha(id);
    }
});

// Atualizar contadores
function atualizarResumo() {
    const pacientesUnicos = new Set(
        fichas.map(f => f.nome.trim().toLowerCase())
    );

    totalPacientes.textContent = pacientesUnicos.size;
    totalFichas.textContent = fichas.length;
}

// Renderização geral
function render() {
    atualizarResumo();
    renderLista();
}

// Busca em tempo real
busca.addEventListener("input", renderLista);

// Cancelar edição
btnCancelar.addEventListener("click", limparFormulario);

// Limpar formulário
form.addEventListener("reset", function() {
    setTimeout(() => {
        document.querySelector("#ficha-id").value = "";
        btnSalvar.textContent = "Salvar ficha";
        btnCancelar.hidden = true;
        tituloFormulario.textContent = "Nova ficha de anamnese";
    }, 0);
});

// Inicializar sistema
render();
