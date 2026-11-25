// =====================================
// ANAMNESE PRO - SISTEMA DE ANAMNESE
// =====================================

const form = document.getElementById("formAnamnese");
const resultado = document.getElementById("resultado");

let fichas = [];

try {
    fichas = JSON.parse(
        localStorage.getItem("anamneseFichas")
    ) || [];
} catch {
    fichas = [];
}

let fichaAtual = null;

// =====================================
// CAMPOS DO FORMULÁRIO
// =====================================

const campos = [
    "nome", "nascimento", "cpf", "telefone",
    "email", "sexo", "peso", "altura",
    "detalheDoenca", "detalheAlergia",
    "detalheMedicamento", "detalheCirurgia",
    "detalheLesao", "detalheRestricao",
    "tipoAtividade", "frequencia", "objetivo",
    "alimentacao", "sono", "agua", "estresse",
    "resultados", "observacoes", "profissional",
    "assinatura", "dataFicha"
];

const radios = [
    "doenca", "alergia", "medicamento",
    "cirurgia", "lesao", "restricao",
    "atividade", "musculacao"
];

// =====================================
// OBTER DADOS DO FORMULÁRIO
// =====================================

function obterDados() {

    const dados = {};

    campos.forEach(id => {
        dados[id] = document.getElementById(id).value.trim();
    });

    radios.forEach(nome => {
        const selecionado = document.querySelector(
            `input[name="${nome}"]:checked`
        );

        dados[nome] = selecionado
            ? selecionado.value
            : "Não informado";
    });

    return dados;
}

// =====================================
// SALVAR DADOS
// =====================================

function salvarDados() {
    localStorage.setItem(
        "anamneseFichas",
        JSON.stringify(fichas)
    );
}

// =====================================
// FORMATAR INFORMAÇÕES
// =====================================

function adicionarLinha(titulo, valor) {

    const linha = document.createElement("p");
    const nome = document.createElement("strong");

    nome.textContent = titulo + ": ";

    linha.appendChild(nome);
    linha.appendChild(
        document.createTextNode(valor || "Não informado")
    );

    return linha;
}

function adicionarTitulo(texto) {
    const titulo = document.createElement("h3");
    titulo.textContent = texto;
    return titulo;
}

// =====================================
// VISUALIZAR UMA FICHA
// =====================================

function visualizarFicha(dados) {

    fichaAtual = dados;

    const resumo = document.getElementById("resumo");
    resumo.innerHTML = "";

    const conteudo = document.createElement("div");
    conteudo.className = "resumo-ficha";

    const secoes = [
        {
            titulo: "Dados pessoais",
            campos: [
                ["Nome", "nome"],
                ["Nascimento", "nascimento"],
                ["CPF", "cpf"],
                ["Telefone", "telefone"],
                ["E-mail", "email"],
                ["Sexo", "sexo"],
                ["Peso (kg)", "peso"],
                ["Altura (cm)", "altura"]
            ]
        },
        {
            titulo: "Histórico de saúde",
            campos: [
                ["Possui doença", "doenca"],
                ["Detalhes", "detalheDoenca"],
                ["Possui alergia", "alergia"],
                ["Detalhes", "detalheAlergia"],
                ["Usa medicamentos", "medicamento"],
                ["Medicamentos", "detalheMedicamento"],
                ["Já realizou cirurgia", "cirurgia"],
                ["Detalhes", "detalheCirurgia"],
                ["Possui lesões", "lesao"],
                ["Detalhes", "detalheLesao"],
                ["Possui restrição médica", "restricao"],
                ["Detalhes", "detalheRestricao"]
            ]
        },
        {
            titulo: "Atividade física",
            campos: [
                ["Pratica atividade física", "atividade"],
                ["Tipo de atividade", "tipoAtividade"],
                ["Frequência", "frequencia"],
                ["Já praticou musculação", "musculacao"]
            ]
        },
        {
            titulo: "Hábitos e objetivos",
            campos: [
                ["Objetivo", "objetivo"],
                ["Alimentação", "alimentacao"],
                ["Sono", "sono"],
                ["Consumo de água", "agua"],
                ["Estresse", "estresse"],
                ["Resultados esperados", "resultados"]
            ]
        },
        {
            titulo: "Observações e declaração",
            campos: [
                ["Observações", "observacoes"],
                ["Profissional responsável", "profissional"],
                ["Assinatura", "assinatura"],
                ["Data", "dataFicha"]
            ]
        }
    ];

    secoes.forEach(secao => {

        conteudo.appendChild(
            adicionarTitulo(secao.titulo)
        );

        secao.campos.forEach(([titulo, id]) => {
            conteudo.appendChild(
                adicionarLinha(titulo, dados[id])
            );
        });
    });

    resumo.appendChild(conteudo);

    resultado.hidden = false;

    resultado.scrollIntoView({
        behavior: "smooth"
    });
}

// =====================================
// CADASTRAR FICHA
// =====================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const dados = obterDados();

    if (!dados.nome || !dados.telefone ||
        !dados.nascimento || !dados.assinatura ||
        !dados.dataFicha) {

        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const nascimento = new Date(
        dados.nascimento + "T00:00:00"
    );

    const hoje = new Date();

    if (nascimento > hoje) {
        alert("A data de nascimento não pode ser futura.");
        return;
    }

    if (!document.getElementById("consentimento").checked) {
        alert("É necessário aceitar a declaração.");
        return;
    }

    dados.id = Date.now();

    fichas.push(dados);

    salvarDados();
    renderizarFichas();

    visualizarFicha(dados);

    form.reset();

    document.getElementById("dataFicha").value =
        new Date().toLocaleDateString("en-CA");

    alert("Ficha cadastrada com sucesso!");
});

// =====================================
// LISTAR FICHAS
// =====================================

function renderizarFichas() {

    const lista = document.getElementById("listaFichas");

    lista.innerHTML = "";

    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase().trim();

    const encontradas = fichas.filter(ficha =>
        ficha.nome.toLowerCase().includes(pesquisa)
    );

    encontradas.forEach(ficha => {

        const linha = document.createElement("tr");

        const dados = [
            ficha.nome,
            ficha.telefone,
            ficha.dataFicha
        ];

        dados.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor || "Não informado";
            linha.appendChild(td);
        });

        const tdAcoes = document.createElement("td");
        tdAcoes.className = "acoes";

        const visualizar = document.createElement("button");
        visualizar.textContent = "Ver ficha";
        visualizar.className = "btn-visualizar";

        visualizar.onclick = () => visualizarFicha(ficha);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";

        excluir.onclick = () => excluirFicha(ficha.id);

        tdAcoes.append(visualizar, excluir);
        linha.appendChild(tdAcoes);

        lista.appendChild(linha);
    });

    document.getElementById("semFichas").hidden =
        encontradas.length !== 0;
}

// =====================================
// PESQUISAR FICHAS
// =====================================

document.getElementById("pesquisa")
    .addEventListener("input", renderizarFichas);

// =====================================
// EXCLUIR FICHA
// =====================================

function excluirFicha(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta ficha?"
    );

    if (!confirmar) return;

    fichas = fichas.filter(ficha => ficha.id !== id);

    salvarDados();
    renderizarFichas();

    if (fichaAtual && fichaAtual.id === id) {
        fichaAtual = null;
        resultado.hidden = true;
    }
}

// =====================================
// IMPRIMIR FICHA
// =====================================

function imprimirFicha() {

    if (!fichaAtual) {
        alert("Selecione uma ficha primeiro.");
        return;
    }

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas para imprimir.");
        return;
    }

    const dados = fichaAtual;

    const secoes = [
        {
            titulo: "Dados pessoais",
            campos: [
                ["Nome", "nome"],
                ["Nascimento", "nascimento"],
                ["CPF", "cpf"],
                ["Telefone", "telefone"],
                ["E-mail", "email"],
                ["Sexo", "sexo"],
                ["Peso", "peso"],
                ["Altura", "altura"]
            ]
        },
        {
            titulo: "Histórico de saúde",
            campos: [
                ["Doença", "doenca"],
                ["Detalhes", "detalheDoenca"],
                ["Alergia", "alergia"],
                ["Detalhes", "detalheAlergia"],
                ["Medicamentos", "medicamento"],
                ["Detalhes", "detalheMedicamento"],
                ["Cirurgia", "cirurgia"],
                ["Detalhes", "detalheCirurgia"],
                ["Lesões", "lesao"],
                ["Detalhes", "detalheLesao"],
                ["Restrição médica", "restricao"],
                ["Detalhes", "detalheRestricao"]
            ]
        },
        {
            titulo: "Atividade física",
            campos: [
                ["Atividade física", "atividade"],
                ["Tipo de atividade", "tipoAtividade"],
                ["Frequência", "frequencia"],
                ["Musculação", "musculacao"]
            ]
        },
        {
            titulo: "Hábitos e objetivos",
            campos: [
                ["Objetivo", "objetivo"],
                ["Alimentação", "alimentacao"],
                ["Sono", "sono"],
                ["Água", "agua"],
                ["Estresse", "estresse"],
                ["Resultados", "resultados"]
            ]
        },
        {
            titulo: "Observações e declaração",
            campos: [
                ["Observações", "observacoes"],
                ["Profissional", "profissional"],
                ["Assinatura", "assinatura"],
                ["Data", "dataFicha"]
            ]
        }
    ];

    const linhas = secoes.map(secao => {

        const itens = secao.campos.map(([titulo, id]) => `
            <p><strong>${titulo}:</strong> ${
                escaparHTML(dados[id] || "Não informado")
            }</p>
        `).join("");

        return `<h2>${secao.titulo}</h2>${itens}`;

    }).join("");

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Ficha de Anamnese</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #26372d;
                }

                h1 {
                    text-align: center;
                    color: #185638;
                }

                h2 {
                    color: #1c663e;
                    margin-top: 25px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 8px;
                }

                p {
                    padding: 7px 0;
                    border-bottom: 1px solid #eee;
                    overflow-wrap: anywhere;
                }

                @media print {
                    body { padding: 10px; }
                }
            </style>
        </head>
        <body>
            <h1>ANAMNESE PRO</h1>
            <h2>Ficha de Anamnese</h2>
            ${linhas}
        </body>
        </html>
    `);

    janela.document.close();

    janela.onload = function() {
        janela.focus();
        janela.print();
    };
}

// =====================================
// PROTEÇÃO DE TEXTO NA IMPRESSÃO
// =====================================

function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// =====================================
// BOTÕES
// =====================================

document.getElementById("btnImprimir")
    .addEventListener("click", imprimirFicha);

document.getElementById("btnVoltar")
    .addEventListener("click", function() {
        resultado.hidden = true;

        form.scrollIntoView({
            behavior: "smooth"
        });
    });

// =====================================
// INICIALIZAÇÃO
// =====================================

document.getElementById("dataFicha").value =
    new Date().toLocaleDateString("en-CA");

renderizarFichas();

