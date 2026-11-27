
const formulario = document.getElementById("anamneseForm");
const listaPacientes = document.getElementById("listaPacientes");

// Recuperar cadastros salvos
let pacientes = JSON.parse(
    localStorage.getItem("anamneses")
) || [];

// Campos da anamnese
const campos = [
    "nome", "nascimento", "cpf", "sexo",
    "telefone", "profissao", "queixa", "hda",
    "doencas", "cirurgias", "alergias",
    "medicamentos", "familia", "tabagismo",
    "alcool", "atividade", "pressao", "fc",
    "temperatura", "peso", "altura", "fr",
    "exame", "diagnostico", "conduta",
    "profissional"
];

// Salvar anamnese
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const paciente = {};

    campos.forEach(campo => {
        paciente[campo] = document.getElementById(campo).value;
    });

    paciente.id = Date.now();

    pacientes.push(paciente);

    localStorage.setItem(
        "anamneses",
        JSON.stringify(pacientes)
    );

    alert("Anamnese cadastrada com sucesso!");

    formulario.reset();
    renderizarPacientes();
});

// Mostrar pacientes
function renderizarPacientes() {
    listaPacientes.innerHTML = "";

    if (pacientes.length === 0) {
        listaPacientes.innerHTML =
            "<p>Nenhuma anamnese cadastrada.</p>";
        return;
    }

    pacientes.forEach(paciente => {
        const div = document.createElement("div");
        div.className = "paciente";

        const informacoes = document.createElement("div");
        const nome = document.createElement("strong");
        const telefone = document.createElement("p");

        nome.textContent = paciente.nome;
        telefone.textContent =
            "Telefone: " + (paciente.telefone || "Não informado");

        informacoes.append(nome, telefone);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoImprimir = document.createElement("button");
        botaoImprimir.className = "imprimir";
        botaoImprimir.textContent = "Imprimir";
        botaoImprimir.addEventListener("click", () => {
            imprimirAnamnese(paciente.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "excluir";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", () => {
            excluirPaciente(paciente.id);
        });

        acoes.append(botaoImprimir, botaoExcluir);
        div.append(informacoes, acoes);

        listaPacientes.appendChild(div);
    });
}

// Excluir paciente
function excluirPaciente(id) {
    const confirmar = confirm(
        "Deseja realmente excluir esta anamnese?"
    );

    if (!confirmar) return;

    pacientes = pacientes.filter(p => p.id !== id);

    localStorage.setItem(
        "anamneses",
        JSON.stringify(pacientes)
    );

    renderizarPacientes();
}

// Imprimir anamnese
function imprimirAnamnese(id) {
    const paciente = pacientes.find(p => p.id === id);

    if (!paciente) return;

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas para imprimir.");
        return;
    }

    const titulos = {
        nome: "Nome",
        nascimento: "Data de nascimento",
        cpf: "CPF",
        sexo: "Sexo",
        telefone: "Telefone",
        profissao: "Profissão",
        queixa: "Queixa principal",
        hda: "História da doença atual",
        doencas: "Doenças anteriores",
        cirurgias: "Cirurgias anteriores",
        alergias: "Alergias",
        medicamentos: "Medicamentos em uso",
        familia: "Histórico familiar",
        tabagismo: "Tabagismo",
        alcool: "Consumo de álcool",
        atividade: "Atividade física",
        pressao: "Pressão arterial",
        fc: "Frequência cardíaca",
        temperatura: "Temperatura",
        peso: "Peso",
        altura: "Altura",
        fr: "Frequência respiratória",
        exame: "Observações do exame físico",
        diagnostico: "Hipótese diagnóstica",
        conduta: "Conduta médica",
        profissional: "Profissional responsável"
    };

    const conteudo = campos.map(campo => {
        const valor = paciente[campo] || "Não informado";

        return `
            <div class="item">
                <strong>${titulos[campo]}</strong>
                <p>${escaparHTML(valor)}</p>
            </div>
        `;
    }).join("");

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Anamnese - ${escaparHTML(paciente.nome)}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #333;
                }

                h1 {
                    color: #087e8b;
                    text-align: center;
                }

                .item {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                }

                .item strong {
                    color: #087e8b;
                }

                .item p {
                    white-space: pre-wrap;
                }

                @media print {
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>Ficha de Anamnese Médica</h1>
            ${conteudo}
            <br>
            <button onclick="window.print()">Imprimir ficha</button>
        </body>
        </html>
    `);

    janela.document.close();
}

// Evitar injeção de HTML na impressão
function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

// Inicializar sistema
renderizarPacientes();
