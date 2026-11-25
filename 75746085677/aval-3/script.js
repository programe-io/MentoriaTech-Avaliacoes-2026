
const CHAVE = "anamneseClinicaGeral";

let pacientes = JSON.parse(localStorage.getItem(CHAVE)) || [];

const form = document.getElementById("formAnamnese");
const campos = Array.from(form.querySelectorAll("input, select, textarea"))
    .filter(campo => campo.id && campo.id !== "indice");

function salvarDados() {
    localStorage.setItem(CHAVE, JSON.stringify(pacientes));
}

// COLETAR DADOS
function coletarDados() {
    const dados = {};

    campos.forEach(campo => {
        dados[campo.id] = campo.value.trim();
    });

    return dados;
}

// PREENCHER FORMULÁRIO
function preencherFormulario(paciente) {
    campos.forEach(campo => {
        campo.value = paciente[campo.id] || "";
    });
}

// FORMATAR DATA
function formatarData(data) {
    if (!data) return "Não informado";

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// CALCULAR IDADE
function calcularIdade(data) {
    if (!data) return "Não informada";

    const nascimento = new Date(data + "T00:00:00");
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getMonth() ||
        (
            hoje.getMonth() === nascimento.getMonth() &&
            hoje.getDate() < nascimento.getDate()
        );

    if (aindaNaoFezAniversario) idade--;

    return idade >= 0 ? idade + " anos" : "Data inválida";
}

// CALCULAR IMC
function calcularIMC() {
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    const campoIMC = document.getElementById("imc");

    if (peso > 0 && altura > 0) {
        campoIMC.value = (peso / (altura * altura)).toFixed(2);
    } else {
        campoIMC.value = "";
    }
}

document.getElementById("peso").addEventListener("input", calcularIMC);
document.getElementById("altura").addEventListener("input", calcularIMC);

// ATUALIZAR DASHBOARD
function atualizarDashboard() {
    const nomes = new Set(
        pacientes.map(p => p.nome.trim().toLowerCase())
    );

    document.getElementById("totalPacientes").textContent = nomes.size;

    document.getElementById("totalFichas").textContent =
        pacientes.length;

    document.getElementById("totalAtendimentos").textContent =
        pacientes.length;
}

// ATUALIZAR TABELA
function atualizarTela() {
    atualizarDashboard();

    const lista = document.getElementById("listaPacientes");

    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    const encontrados = pacientes
        .map((paciente, index) => ({ paciente, index }))
        .filter(item =>
            item.paciente.nome.toLowerCase().includes(pesquisa)
        );

    if (encontrados.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 5;
        coluna.className = "vazio";
        coluna.textContent = "Nenhum paciente encontrado.";

        linha.appendChild(coluna);
        lista.appendChild(linha);

        return;
    }

    encontrados.forEach(({ paciente, index }) => {
        const linha = document.createElement("tr");

        const valores = [
            paciente.nome,
            paciente.cpf || "Não informado",
            formatarData(paciente.dataConsulta),
            paciente.profissional || "Não informado"
        ];

        valores.forEach(valor => {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.className = "acoes";

        const visualizar = document.createElement("button");
        visualizar.textContent = "Ver ficha";
        visualizar.className = "visualizar";
        visualizar.onclick = () => visualizarPaciente(index);

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.onclick = () => editarPaciente(index);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirPaciente(index);

        acoes.append(visualizar, editar, excluir);
        colunaAcoes.appendChild(acoes);

        linha.appendChild(colunaAcoes);
        lista.appendChild(linha);
    });
}

// CADASTRAR E EDITAR
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const indice = document.getElementById("indice").value;

    const dados = coletarDados();

    if (!dados.nome || !dados.nascimento ||
        !dados.dataConsulta || !dados.queixa) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    const nascimento = new Date(dados.nascimento + "T00:00:00");
    const consulta = new Date(dados.dataConsulta + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (isNaN(nascimento.getTime()) || nascimento > hoje) {
        alert("Data de nascimento inválida!");
        return;
    }

    if (isNaN(consulta.getTime())) {
        alert("Data da consulta inválida!");
        return;
    }

    if (consulta > hoje) {
        alert("A data da consulta não pode ser futura.");
        return;
    }

    if (indice === "") {
        dados.id = Date.now();
        pacientes.push(dados);

        alert("Ficha cadastrada com sucesso!");
    } else {
        const posicao = Number(indice);

        if (!pacientes[posicao]) {
            alert("Ficha não encontrada.");
            return;
        }

        dados.id = pacientes[posicao].id;
        pacientes[posicao] = dados;

        alert("Ficha atualizada com sucesso!");
    }

    salvarDados();
    atualizarTela();
    cancelarEdicao();
});

// EDITAR
function editarPaciente(index) {
    const paciente = pacientes[index];

    if (!paciente) return;

    preencherFormulario(paciente);

    document.getElementById("indice").value = index;

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    document.getElementById("btnCancelar").hidden = false;

    calcularIMC();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// CANCELAR EDIÇÃO
function cancelarEdicao() {
    form.reset();

    document.getElementById("indice").value = "";

    document.getElementById("btnSalvar").textContent =
        "Salvar Ficha";

    document.getElementById("btnCancelar").hidden = true;

    document.getElementById("imc").value = "";
}

document.getElementById("btnCancelar")
    .addEventListener("click", cancelarEdicao);

// EXCLUIR
function excluirPaciente(index) {
    if (!confirm("Deseja realmente excluir esta ficha?")) return;

    pacientes.splice(index, 1);

    salvarDados();
    atualizarTela();

    if (document.getElementById("indice").value === String(index)) {
        cancelarEdicao();
    }

    alert("Ficha excluída!");
}

// ESCAPAR TEXTO NA IMPRESSÃO
function escapar(valor) {
    return String(valor || "Não informado").replace(
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

// VISUALIZAR FICHA
function visualizarPaciente(index) {
    const paciente = pacientes[index];

    if (!paciente) return;

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas no navegador.");
        return;
    }

    const secoes = [
        {
            titulo: "01. Identificação",
            campos: [
                ["Nome", paciente.nome],
                ["Nascimento", formatarData(paciente.nascimento)],
                ["Idade", calcularIdade(paciente.nascimento)],
                ["CPF", paciente.cpf],
                ["Sexo", paciente.sexo],
                ["Estado civil", paciente.estadoCivil],
                ["Telefone", paciente.telefone],
                ["E-mail", paciente.email],
                ["Profissão", paciente.profissao],
                ["Endereço", paciente.endereco]
            ]
        },
        {
            titulo: "02. Atendimento",
            campos: [
                ["Data", formatarData(paciente.dataConsulta)],
                ["Profissional", paciente.profissional],
                ["Tipo", paciente.tipoConsulta]
            ]
        },
        {
            titulo: "03. Queixa e história atual",
            campos: [
                ["Queixa principal", paciente.queixa],
                ["História da doença atual", paciente.historiaAtual],
                ["Sintomas", paciente.sintomas]
            ]
        },
        {
            titulo: "04. Antecedentes pessoais",
            campos: [
                ["Doenças", paciente.doencas],
                ["Cirurgias", paciente.cirurgias],
                ["Histórico de doenças", paciente.historicoDoencas],
                ["Cirurgias e internações", paciente.historicoCirurgias]
            ]
        },
        {
            titulo: "05. Medicamentos e alergias",
            campos: [
                ["Alergias", paciente.alergias],
                ["Reação alérgica", paciente.reacaoAlergica],
                ["Descrição das alergias", paciente.descricaoAlergias],
                ["Medicamentos", paciente.medicamentos]
            ]
        },
        {
            titulo: "06. Histórico familiar",
            campos: [
                ["Histórico familiar", paciente.historicoFamiliar]
            ]
        },
        {
            titulo: "07. Hábitos de vida",
            campos: [
                ["Atividade física", paciente.atividade],
                ["Tabagismo", paciente.tabagismo],
                ["Álcool", paciente.alcool],
                ["Sono", paciente.sono],
                ["Alimentação", paciente.alimentacao],
                ["Consumo de água", paciente.agua]
            ]
        },
        {
            titulo: "08. Sinais vitais e medidas",
            campos: [
                ["Pressão arterial", paciente.pressao],
                ["Frequência cardíaca", paciente.frequenciaCardiaca],
                ["Frequência respiratória", paciente.frequenciaRespiratoria],
                ["Temperatura", paciente.temperatura],
                ["Saturação", paciente.saturacao],
                ["Peso", paciente.peso],
                ["Altura", paciente.altura],
                ["IMC", paciente.imc]
            ]
        },
        {
            titulo: "09. Exame físico",
            campos: [
                ["Estado geral", paciente.estadoGeral],
                ["Cardiovascular", paciente.cardiovascular],
                ["Respiratório", paciente.respiratorio],
                ["Abdominal", paciente.abdome],
                ["Neurológico", paciente.neurologico],
                ["Outros achados", paciente.outrosAchados]
            ]
        },
        {
            titulo: "10. Avaliação e conduta",
            campos: [
                ["Hipótese diagnóstica", paciente.hipotese],
                ["Exames solicitados", paciente.exames],
                ["Conduta", paciente.conduta],
                ["Observações", paciente.observacoes]
            ]
        }
    ];

    const conteudo = secoes.map(secao => `
        <section>
            <h2>${escapar(secao.titulo)}</h2>
            ${secao.campos.map(([nome, valor]) => `
                <p>
                    <strong>${escapar(nome)}:</strong><br>
                    ${escapar(valor).replace(/\n/g, "<br>")}
                </p>
            `).join("")}
        </section>
    `).join("");

    janela.document.open();

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Ficha Médica</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 900px;
                    margin: 30px auto;
                    padding: 20px;
                    color: #334155;
                    line-height: 1.5;
                }

                h1 {
                    color: #075985;
                    text-align: center;
                }

                h2 {
                    color: #075985;
                    border-bottom: 2px solid #bae6fd;
                    padding-bottom: 8px;
                    margin-top: 30px;
                }

                p {
                    margin: 14px 0;
                    overflow-wrap: anywhere;
                }

                section {
                    page-break-inside: avoid;
                }

                button {
                    background: #0284c7;
                    color: white;
                    border: 0;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                }

                @media print {
                    button {
                        display: none;
                    }

                    body {
                        margin: 0;
                        padding: 10px;
                    }
                }
            </style>
        </head>

        <body>
            <h1>Ficha de Anamnese Médica</h1>
            <p style="text-align:center">
                Clínica Geral - Registro de Atendimento
            </p>

            ${conteudo}

            <br>
            <button onclick="window.print()">Imprimir ficha</button>
        </body>
        </html>
    `);

    janela.document.close();
}

// PESQUISAR
document.getElementById("pesquisa")
    .addEventListener("input", atualizarTela);

// INICIAR
atualizarTela();
