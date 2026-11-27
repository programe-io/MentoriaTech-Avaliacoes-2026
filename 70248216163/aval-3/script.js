
const $ = id => document.getElementById(id);

let records = JSON.parse(localStorage.getItem("anamnesisRecords")) || [];

const form = $("anamnesisForm");

const fields = [
    "name",
    "birth",
    "cpf",
    "phone",
    "email",
    "profession",
    "complaint",
    "symptomTime",
    "disease",
    "allergy",
    "medication",
    "surgery",
    "healthDetails",
    "exercise",
    "smoking",
    "alcohol",
    "pressure",
    "heartRate",
    "weight",
    "height",
    "observations",
    "conduct",
    "professional",
    "appointmentDate"
];

function saveData() {
    localStorage.setItem(
        "anamnesisRecords",
        JSON.stringify(records)
    );
}

function getFormData() {
    const data = {};

    fields.forEach(field => {
        data[field] = $(field).value.trim();
    });

    return data;
}

function fillForm(record) {
    fields.forEach(field => {
        $(field).value = record[field] || "";
    });

    $("recordId").value = record.id;
    $("saveButton").textContent = "Atualizar anamnese";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function resetForm() {
    form.reset();
    $("recordId").value = "";
    $("saveButton").textContent = "Salvar anamnese";
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const data = getFormData();
    const id = $("recordId").value;

    if (!data.name || !data.appointmentDate) {
        alert("Preencha os campos obrigatórios.");
        return;
    }

    if (id) {
        const index = records.findIndex(
            record => String(record.id) === id
        );

        if (index !== -1) {
            records[index] = {
                ...records[index],
                ...data
            };
        }

    } else {
        records.push({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...data
        });
    }

    saveData();
    resetForm();
    renderRecords();

    alert("Anamnese salva com sucesso!");
});

function renderRecords() {
    const list = $("recordList");
    const search = $("search").value.toLowerCase();

    const filtered = records.filter(record =>
        record.name.toLowerCase().includes(search) ||
        (record.phone || "").includes(search) ||
        (record.cpf || "").includes(search)
    );

    list.innerHTML = "";

    if (!filtered.length) {
        list.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    Nenhum paciente encontrado.
                </td>
            </tr>
        `;
    }

    filtered.forEach(record => {
        const tr = document.createElement("tr");

        const values = [
            record.name,
            record.phone || "-",
            record.appointmentDate,
            record.professional || "-"
        ];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });

        const actions = document.createElement("td");
        actions.className = "action-buttons";

        const edit = document.createElement("button");
        edit.className = "edit-btn";
        edit.textContent = "Visualizar / Editar";
        edit.addEventListener("click", () => fillForm(record));

        const del = document.createElement("button");
        del.className = "delete-btn";
        del.textContent = "Excluir";
        del.addEventListener("click", () => deleteRecord(record.id));

        actions.append(edit, del);
        tr.appendChild(actions);

        list.appendChild(tr);
    });

    updateDashboard();
}

function deleteRecord(id) {
    const record = records.find(r => r.id === id);

    if (!record) return;

    if (!confirm(
        `Deseja excluir a anamnese de ${record.name}?`
    )) return;

    records = records.filter(r => r.id !== id);

    saveData();
    renderRecords();
}

function updateDashboard() {
    $("totalPatients").textContent = new Set(
        records.map(r => r.cpf || r.name.toLowerCase())
    ).size;

    $("totalRecords").textContent = records.length;

    const today = new Date().toISOString().slice(0, 10);

    $("todayRecords").textContent = records.filter(
        r => r.appointmentDate === today
    ).length;
}

$("search").addEventListener("input", renderRecords);

$("clearButton").addEventListener("click", () => {
    if (confirm("Deseja limpar os campos do formulário?")) {
        resetForm();
    }
});

$("printButton").addEventListener("click", () => {
    if (!$("name").value.trim()) {
        alert("Preencha os dados do paciente antes de imprimir.");
        return;
    }

    window.print();
});

// Máscara simples de CPF
$("cpf").addEventListener("input", event => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);

    value = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    event.target.value = value;
});

// Máscara de telefone
$("phone").addEventListener("input", event => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);

    if (value.length > 10) {
        value = value.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );
    } else if (value.length > 6) {
        value = value.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );
    } else if (value.length > 2) {
        value = value.replace(
            /^(\d{2})(\d+)$/,
            "($1) $2"
        );
    }

    event.target.value = value;
});

renderRecords();
