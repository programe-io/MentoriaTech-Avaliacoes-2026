
// CARREGAR DADOS SALVOS

let pacientes = JSON.parse(
    localStorage.getItem("pacientes")
) || [];

// ELEMENTOS DO HTML

const form = document.getElementById("formAnamnese");

const listaPacientes = document.getElementById("listaPacientes");

const pesquisa = document.getElementById("pesquisa");

// CAMPOS DO FORMULÁRIO

const campos = [
    "nome",
    "nascimento",
    "sexo",
    "telefone",
    "email",
    "profissao",
    "queixa",
    "doencas",
    "cirurgias",
    "internacoes",
    "alergias",
    "medicamentos",
    "familia",
    "alimentacao",
    "atividade",
    "sono",
    "observacoes",
    "observacaoProfissional",
    "profissional"
];

// DEFINIR DATA MÁXIMA DE NASCIMENTO

document.getElementById("nascimento").max =
    new Date().toISOString().split("T")[0];

// SALVAR NO NAVEGADOR

function salvarDados() {

    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );

}

// CADASTRAR PACIENTE

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const dados = {};

    campos.forEach(campo => {

        dados[campo] = document
            .getElementById(campo)
            .value.trim();

    });

    if (!dados.nome || !dados.nascimento) {
        alert("Preencha o nome e a data de nascimento!");
        return;
    }

    const nascimento = new Date(
        dados.nascimento + "T00:00:00"
    );

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (
        Number.isNaN(nascimento.getTime()) ||
        nascimento > hoje
    ) {
        alert("Informe uma data de nascimento válida!");
        return;
    }

    const paciente = {
        id: Date.now(),
        ...dados,
        dataCadastro: new Date().toLocaleString("pt-BR")
    };

    pacientes.push(paciente);

    salvarDados();

    listarPacientes();

    form.reset();

    alert("Ficha cadastrada com sucesso!");

});

// LISTAR PACIENTES

function listarPacientes(filtro = "") {

    listaPacientes.innerHTML = "";

    const encontrados = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(
            filtro.toLowerCase()
        )
    );

    if (encontrados.length === 0) {

        const linha = document.createElement("tr");

        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.className = "vazio";
        celula.textContent = "Nenhum paciente encontrado.";

        linha.appendChild(celula);

        listaPacientes.appendChild(linha);

        return;
    }

    encontrados.forEach(paciente => {

        const linha = document.createElement("tr");

        const valores = [
            paciente.id,
            paciente.nome,
            formatarData(paciente.nascimento),
            paciente.telefone || "Não informado"
        ];

        valores.forEach(valor => {

            const celula = document.createElement("td");

            celula.textContent = valor;

            linha.appendChild(celula);

        });

        // BOTÕES DE AÇÃO

        const celulaAcoes = document.createElement("td");

        const acoes = document.createElement("div");

        acoes.className = "acoes";

        // VISUALIZAR

        const visualizar = document.createElement("button");

        visualizar.textContent = "Ver";
        visualizar.className = "btn-visualizar";

        visualizar.addEventListener("click", () => {
            visualizarFicha(paciente.id);
        });

        // IMPRIMIR

        const imprimir = document.createElement("button");

        imprimir.textContent = "Imprimir";
        imprimir.className = "btn-imprimir";

        imprimir.addEventListener("click", () => {
            imprimirFicha(paciente.id);
        });

        // EXCLUIR

        const excluir = document.createElement("button");

        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";

        excluir.addEventListener("click", () => {
            excluirPaciente(paciente.id);
        });

        acoes.appendChild(visualizar);
        acoes.appendChild(imprimir);
        acoes.appendChild(excluir);

        celulaAcoes.appendChild(acoes);

        linha.appendChild(celulaAcoes);

        listaPacientes.appendChild(linha);

    });

}

// FORMATAR DATA

function formatarData(data) {

    if (!data) return "Não informada";

    const partes = data.split("-");

    if (partes.length !== 3) return data;

    return partes.reverse().join("/");

}

// PESQUISAR PACIENTES

pesquisa.addEventListener("input", function() {

    listarPacientes(this.value);

});

// VISUALIZAR FICHA

function visualizarFicha(id) {

    const paciente = pacientes.find(
        item => item.id === id
    );

    if (!paciente) return;

    const dados = [
        ["Nome", paciente.nome],
        ["Nascimento", formatarData(paciente.nascimento)],
        ["Sexo", paciente.sexo],
        ["Telefone", paciente.telefone],
        ["E-mail", paciente.email],
        ["Profissão", paciente.profissao],
        ["Queixa principal", paciente.queixa],
        ["Doenças", paciente.doencas],
        ["Cirurgias", paciente.cirurgias],
        ["Internações", paciente.internacoes],
        ["Alergias", paciente.alergias],
        ["Medicamentos", paciente.medicamentos],
        ["Histórico familiar", paciente.familia],
        ["Alimentação", paciente.alimentacao],
        ["Atividade física", paciente.atividade],
        ["Sono", paciente.sono],
        ["Outros hábitos", paciente.observacoes],
        ["Observações profissionais", paciente.observacaoProfissional],
        ["Profissional responsável", paciente.profissional],
        ["Data do cadastro", paciente.dataCadastro]
    ];

    const conteudo = dados
        .map(([titulo, valor]) =>
            `${titulo}: ${valor || "Não informado"}`
        )
        .join("\n\n");

    alert(conteudo);

}

// ESCAPAR TEXTOS PARA A IMPRESSÃO

function escaparHTML(texto) {

    return String(texto || "Não informado").replace(
        /[&<>"']/g,
        caractere => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[caractere]
    );

}

// IMPRIMIR FICHA

function imprimirFicha(id) {

    const paciente = pacientes.find(
        item => item.id === id
    );

    if (!paciente) return;

    const dados = [
        ["Nome completo", paciente.nome],
        ["Data de nascimento", formatarData(paciente.nascimento)],
        ["Sexo", paciente.sexo],
        ["Telefone", paciente.telefone],
        ["E-mail", paciente.email],
        ["Profissão", paciente.profissao],
        ["Queixa principal", paciente.queixa],
        ["Doenças anteriores ou atuais", paciente.doencas],
        ["Cirurgias", paciente.cirurgias],
        ["Internações", paciente.internacoes],
        ["Alergias", paciente.alergias],
        ["Medicamentos", paciente.medicamentos],
        ["Histórico familiar", paciente.familia],
        ["Alimentação", paciente.alimentacao],
        ["Atividade física", paciente.atividade],
        ["Qualidade do sono", paciente.sono],
        ["Outros hábitos", paciente.observacoes],
        ["Observações profissionais", paciente.observacaoProfissional],
        ["Profissional responsável", paciente.profissional],
        ["Data do cadastro", paciente.dataCadastro]
    ];

    const linhas = dados.map(([titulo, valor]) => `
        <div class="item">
            <strong>${escaparHTML(titulo)}</strong>
            <p>${escaparHTML(valor)}</p>
        </div>
    `).join("");

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas para imprimir a ficha.");
        return;
    }

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
                    color: #333;
                }

                h1 {
                    color: #155e75;
                    text-align: center;
                    margin-bottom: 10px;
                }

                h2 {
                    border-bottom: 2px solid #155e75;
                    padding-bottom: 10px;
                }

                .item {
                    border-bottom: 1px solid #ddd;
                    padding: 12px 0;
                    break-inside: avoid;
                }

                .item strong {
                    color: #155e75;
                }

                .item p {
                    white-space: pre-wrap;
                    overflow-wrap: anywhere;
                    margin-top: 6px;
                }

                @media print {
                    body {
                        padding: 10px;
                    }
                }
            </style>
        </head>

        <body>

            <h1>FICHA DE ANAMNESE</h1>

            <h2>Dados do Paciente</h2>

            ${linhas}

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>

        </body>
        </html>
    `);

    janela.document.close();

}

// EXCLUIR PACIENTE

function excluirPaciente(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta ficha?"
    );

    if (!confirmar) return;

    pacientes = pacientes.filter(
        paciente => paciente.id !== id
    );

    salvarDados();

    listarPacientes();

    alert("Ficha excluída com sucesso!");

}

// INICIALIZAR SISTEMA

listarPacientes();
