
// ==========================================
// SISTEMA DE FICHA DE ANAMNESE
// JAVASCRIPT
// ==========================================

let pacientes = JSON.parse(
    localStorage.getItem("pacientes_anamnese")
) || [];

let pacienteEditando = null;

const form = document.getElementById("formAnamnese");

// CAMPOS DO FORMULÁRIO
const campos = [
    "nome",
    "nascimento",
    "sexo",
    "telefone",
    "email",
    "endereco",
    "queixa",
    "historico",
    "doencas",
    "cirurgias",
    "alergia",
    "alergiaDescricao",
    "medicamento",
    "medicamentoDescricao",
    "familia",
    "observacoes"
];

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem(
        "pacientes_anamnese",
        JSON.stringify(pacientes)
    );

    atualizarSistema();
}

// CADASTRAR PACIENTE
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = {};

    campos.forEach(campo => {
        dados[campo] = document
            .getElementById(campo).value.trim();
    });

    if (!dados.nome) {
        alert("Informe o nome do paciente!");
        return;
    }

    if (pacienteEditando !== null) {

        const paciente = pacientes.find(
            p => p.id === pacienteEditando
        );

        if (!paciente) return;

        Object.assign(paciente, dados);

        alert("Anamnese atualizada com sucesso!");

    } else {

        const paciente = {
            id: Date.now(),
            ...dados,
            dataCadastro: new Date().toISOString()
        };

        pacientes.push(paciente);

        alert("Paciente cadastrado com sucesso!");
    }

    salvarDados();

    limparFormulario();
});

// LISTAR PACIENTES
function listarPacientes() {

    const lista = document.getElementById("listaPacientes");

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    const resultado = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(pesquisa) ||
        paciente.telefone.toLowerCase().includes(pesquisa)
    );

    resultado.forEach(paciente => {

        const linha = document.createElement("tr");

        const nome = document.createElement("td");
        nome.textContent = paciente.nome;

        const telefone = document.createElement("td");
        telefone.textContent = paciente.telefone || "-";

        const queixa = document.createElement("td");
        queixa.textContent = paciente.queixa || "-";

        const acoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "editar";

        btnEditar.onclick = () => {
            editarPaciente(paciente.id);
        };

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "excluir";

        btnExcluir.onclick = () => {
            excluirPaciente(paciente.id);
        };

        const btnImprimir = document.createElement("button");
        btnImprimir.textContent = "Imprimir";
        btnImprimir.className = "imprimir";

        btnImprimir.onclick = () => {
            imprimirAnamnese(paciente.id);
        };

        acoes.append(
            btnEditar,
            btnExcluir,
            btnImprimir
        );

        linha.append(
            nome,
            telefone,
            queixa,
            acoes
        );

        lista.appendChild(linha);
    });

    document.getElementById("semPacientes").hidden =
        resultado.length > 0;
}

// EDITAR PACIENTE
function editarPaciente(id) {

    const paciente = pacientes.find(
        p => p.id === id
    );

    if (!paciente) return;

    pacienteEditando = id;

    campos.forEach(campo => {
        document.getElementById(campo).value =
            paciente[campo] || "";
    });

    document.getElementById("tituloFormulario")
        .textContent = "Editar Anamnese";

    document.getElementById("btnSalvar")
        .textContent = "Atualizar Anamnese";

    document.getElementById("btnCancelar").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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

    alert("Ficha excluída com sucesso!");
}

// LIMPAR FORMULÁRIO
function limparFormulario() {

    form.reset();

    pacienteEditando = null;

    document.getElementById("tituloFormulario")
        .textContent = "Cadastro de Anamnese";

    document.getElementById("btnSalvar")
        .textContent = "Salvar Anamnese";

    document.getElementById("btnCancelar").hidden = true;
}

// CANCELAR EDIÇÃO
document.getElementById("btnCancelar")
    .addEventListener("click", limparFormulario);

// PESQUISAR PACIENTES
document.getElementById("pesquisa")
    .addEventListener("input", listarPacientes);

// ATUALIZAR DASHBOARD
function atualizarDashboard() {

    document.getElementById("totalPacientes")
        .textContent = pacientes.length;

    document.getElementById("totalFichas")
        .textContent = pacientes.length;
}

// IMPRIMIR ANAMNESE
function imprimirAnamnese(id) {

    const paciente = pacientes.find(
        p => p.id === id
    );

    if (!paciente) return;

    const escapar = valor => String(valor || "-")
        .replace(/[&<>"']/g, caractere => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[caractere]);

    const secoes = [
        {
            titulo: "Dados pessoais",
            campos: [
                ["Nome", "nome"],
                ["Nascimento", "nascimento"],
                ["Sexo", "sexo"],
                ["Telefone", "telefone"],
                ["E-mail", "email"],
                ["Endereço", "endereco"]
            ]
        },
        {
            titulo: "Informações clínicas",
            campos: [
                ["Queixa principal", "queixa"],
                ["Histórico atual", "historico"],
                ["Histórico de doenças", "doencas"],
                ["Cirurgias anteriores", "cirurgias"]
            ]
        },
        {
            titulo: "Saúde e medicamentos",
            campos: [
                ["Alergias", "alergia"],
                ["Descrição das alergias", "alergiaDescricao"],
                ["Utiliza medicamentos", "medicamento"],
                ["Descrição dos medicamentos", "medicamentoDescricao"],
                ["Histórico familiar", "familia"],
                ["Observações profissionais", "observacoes"]
            ]
        }
    ];

    const conteudo = secoes.map(secao => `
        <section>
            <h2>${escapar(secao.titulo)}</h2>
            ${secao.campos.map(([rotulo, campo]) => `
                <div class="campo">
                    <strong>${escapar(rotulo)}:</strong>
                    <p>${escapar(paciente[campo])}</p>
                </div>
            `).join("")}
        </section>
    `).join("");

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas para imprimir.");
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
                    color: #222;
                }

                h1 {
                    text-align: center;
                    color: #164e63;
                }

                h2 {
                    background: #e0f2fe;
                    padding: 10px;
                    margin-top: 25px;
                }

                .campo {
                    margin: 15px 0;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 8px;
                }

                .campo p {
                    white-space: pre-wrap;
                    margin-top: 5px;
                }

                .assinatura {
                    margin-top: 70px;
                    text-align: center;
                }

                @media print {
                    body { padding: 10px; }
                }
            </style>
        </head>
        <body>
            <h1>FICHA DE ANAMNESE</h1>
            ${conteudo}

            <div class="assinatura">
                __________________________________<br>
                Assinatura do profissional
            </div>

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

// INICIALIZAR SISTEMA
function atualizarSistema() {
    listarPacientes();
    atualizarDashboard();
}

atualizarSistema();
