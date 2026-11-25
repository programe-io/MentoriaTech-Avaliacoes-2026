
const form = document.getElementById("anamneseForm");
const steps = document.querySelectorAll(".form-step");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const formSection = document.getElementById("formSection");
const recordsSection = document.getElementById("recordsSection");

const recordsList = document.getElementById("recordsList");
const emptyRecords = document.getElementById("emptyRecords");

let currentStep = 0;

let records = JSON.parse(
    localStorage.getItem("anamneseRecords")
) || [];

// NAVEGAR ENTRE ETAPAS

function updateStep() {

    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    prevBtn.style.visibility =
        currentStep === 0 ? "hidden" : "visible";

    nextBtn.classList.toggle(
        "hidden",
        currentStep === steps.length - 1
    );

    submitBtn.classList.toggle(
        "hidden",
        currentStep !== steps.length - 1
    );

    const percentage =
        ((currentStep + 1) / steps.length) * 100;

    progressFill.style.width = percentage + "%";

    progressText.textContent =
        `Etapa ${currentStep + 1} de ${steps.length}`;
}

// VALIDAR ETAPA

function validateStep() {

    const fields = steps[currentStep].querySelectorAll(
        "input[required], textarea[required], select[required]"
    );

    for (const field of fields) {

        if (!field.checkValidity()) {
            field.reportValidity();
            return false;
        }
    }

    return true;
}

// PRÓXIMA ETAPA

nextBtn.addEventListener("click", () => {

    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
        currentStep++;
        updateStep();
        window.scrollTo(0, 0);
    }

});

// ETAPA ANTERIOR

prevBtn.addEventListener("click", () => {

    if (currentStep > 0) {
        currentStep--;
        updateStep();
        window.scrollTo(0, 0);
    }

});

// SALVAR DADOS

form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!validateStep()) return;

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const newRecord = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toLocaleString("pt-BR")
    };

    records.unshift(newRecord);

    localStorage.setItem(
        "anamneseRecords",
        JSON.stringify(records)
    );

    alert("Ficha de anamnese cadastrada com sucesso!");

    form.reset();

    currentStep = 0;
    updateStep();

    showRecords();

});

// MOSTRAR FICHAS

function showRecords() {

    formSection.classList.add("hidden");
    recordsSection.classList.remove("hidden");

    document.getElementById("formMenu").classList.remove("active");
    document.getElementById("recordsMenu").classList.add("active");

    renderRecords();

}

// MOSTRAR FORMULÁRIO

function showForm() {

    recordsSection.classList.add("hidden");
    formSection.classList.remove("hidden");

    document.getElementById("recordsMenu").classList.remove("active");
    document.getElementById("formMenu").classList.add("active");

}

// RENDERIZAR REGISTROS

function renderRecords() {

    recordsList.innerHTML = "";

    const search = document
        .getElementById("searchRecords")
        .value.toLowerCase();

    const filtered = records.filter(record =>
        record.nome.toLowerCase().includes(search)
    );

    emptyRecords.style.display =
        filtered.length === 0 ? "block" : "none";

    filtered.forEach(record => {

        const item = document.createElement("div");
        item.className = "record";

        const info = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = record.nome;

        const details = document.createElement("p");
        details.textContent =
            `Telefone: ${record.telefone || "Não informado"} | Cadastro: ${record.createdAt}`;

        info.append(name, details);

        const actions = document.createElement("div");
        actions.className = "record-actions";

        const printButton = document.createElement("button");
        printButton.textContent = "Imprimir";

        printButton.addEventListener("click", () => {
            printRecord(record.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", () => {
            deleteRecord(record.id);
        });

        actions.append(printButton, deleteButton);

        item.append(info, actions);

        recordsList.appendChild(item);

    });

}

// EXCLUIR FICHA

function deleteRecord(id) {

    if (!confirm("Deseja excluir esta ficha permanentemente?")) {
        return;
    }

    records = records.filter(record => record.id !== id);

    localStorage.setItem(
        "anamneseRecords",
        JSON.stringify(records)
    );

    renderRecords();

}

// IMPRIMIR FICHA

function printRecord(id) {

    const record = records.find(item => item.id === id);

    if (!record) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
        alert("Permita a abertura de janelas pop-up para imprimir.");
        return;
    }

    const fields = {
        "Nome completo": record.nome,
        "Nascimento": record.nascimento,
        "Sexo": record.sexo,
        "CPF": record.cpf,
        "Telefone": record.telefone,
        "E-mail": record.email,
        "Endereço": record.endereco,
        "Profissão": record.profissao,
        "Estado civil": record.estadoCivil,
        "Doenças": record.doencas,
        "Alergias": record.alergias,
        "Medicamentos": record.medicamentos,
        "Cirurgias": record.cirurgias,
        "Hospitalizações": record.hospitalizacoes,
        "Histórico familiar": record.historicoFamiliar,
        "Atividade física": record.atividadeFisica,
        "Sono": record.sono,
        "Tabagismo": record.tabagismo,
        "Álcool": record.alcool,
        "Queixa principal": record.queixa,
        "Sintomas": record.sintomas,
        "Observações": record.observacoes
    };

    const escapeHTML = value => String(value || "Não informado")
        .replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    const content = Object.entries(fields)
        .map(([label, value]) => `
            <div class="field">
                <strong>${escapeHTML(label)}</strong>
                <p>${escapeHTML(value)}</p>
            </div>
        `).join("");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Ficha de Anamnese</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 35px;
                    color: #222;
                }

                h1 {
                    text-align: center;
                    margin-bottom: 5px;
                }

                .subtitle {
                    text-align: center;
                    color: #666;
                    margin-bottom: 30px;
                }

                .field {
                    padding: 12px;
                    border-bottom: 1px solid #ddd;
                    break-inside: avoid;
                }

                .field strong {
                    font-size: 12px;
                    color: #555;
                }

                .field p {
                    margin: 6px 0 0;
                    white-space: pre-wrap;
                }

                .signature {
                    margin-top: 60px;
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                }

                .signature div {
                    width: 40%;
                    border-top: 1px solid #333;
                    padding-top: 10px;
                }

                @media print {
                    body {
                        padding: 15px;
                    }
                }
            </style>
        </head>

        <body>

            <h1>FICHA DE ANAMNESE</h1>

            <p class="subtitle">
                Registro de informações do paciente
            </p>

            ${content}

            <div class="signature">
                <div>Assinatura do paciente</div>
                <div>Assinatura do profissional</div>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>

        </body>
        </html>
    `);

    printWindow.document.close();

}

// EVENTOS DO MENU

document.getElementById("formMenu")
    .addEventListener("click", showForm);

document.getElementById("recordsMenu")
    .addEventListener("click", showRecords);

// PESQUISA

document.getElementById("searchRecords")
    .addEventListener("input", renderRecords);

// INICIALIZAR

updateStep();
