
const fields = [
    'name', 'birth', 'cpf', 'phone', 'email',
    'address', 'profession', 'marital', 'complaint',
    'history', 'allergies', 'medications', 'family',
    'exercise', 'smoking', 'notes', 'professional',
    'appointment'
];

let records = JSON.parse(
    localStorage.getItem('anamneseProRecords') || '[]'
);

function save() {
    localStorage.setItem(
        'anamneseProRecords',
        JSON.stringify(records)
    );
}

function navigate(page) {
    document.querySelectorAll('.page').forEach(section => {
        section.classList.remove('show');
    });

    document.getElementById(page).classList.add('show');

    const titles = {
        dashboard: 'Visão geral',
        patients: 'Pacientes',
        form: 'Ficha de anamnese'
    };

    document.getElementById('page-title').textContent =
        titles[page];

    if (page === 'dashboard') renderDashboard();
    if (page === 'patients') renderPatients();
}

function resetForm() {
    document.getElementById('anamnesis-form').reset();
    document.getElementById('record-id').value = '';
    document.getElementById('form-heading').textContent =
        'Nova ficha de anamnese';
}

function dateBR(value) {
    if (!value) return '—';

    return new Date(value + 'T00:00:00')
        .toLocaleDateString('pt-BR');
}

function safe(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);
}

function renderDashboard() {
    document.getElementById('total-patients').textContent =
        records.length;

    document.getElementById('total-forms').textContent =
        records.length;

    const ordered = [...records].sort((a, b) =>
        b.created.localeCompare(a.created)
    );

    document.getElementById('last-date').textContent =
        ordered.length ? dateBR(ordered[0].created) : '—';

    document.getElementById('recent-list').innerHTML =
        ordered.slice(0, 5).map(r => `
            <tr>
                <td>${safe(r.name)}</td>
                <td>${safe(r.phone)}</td>
                <td>${dateBR(r.created)}</td>
                <td>Ficha salva</td>
            </tr>
        `).join('');

    document.getElementById('recent-empty').style.display =
        ordered.length ? 'none' : 'block';
}

function renderPatients() {
    const query = document.getElementById('search')
        .value.toLowerCase();

    const filtered = records.filter(r =>
        r.name.toLowerCase().includes(query) ||
        (r.cpf || '').toLowerCase().includes(query)
    );

    document.getElementById('patient-list').innerHTML =
        filtered.map(r => `
            <tr>
                <td>${safe(r.name)}</td>
                <td>${safe(r.cpf)}</td>
                <td>${safe(r.phone)}</td>
                <td>${dateBR(r.created)}</td>
                <td>
                    <button class="small-btn"
                        onclick="editRecord('${r.id}')">
                        Editar
                    </button>

                    <button class="small-btn"
                        onclick="printRecord('${r.id}')">
                        Imprimir
                    </button>

                    <button class="small-btn"
                        onclick="deleteRecord('${r.id}')">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');

    document.getElementById('patients-empty').style.display =
        filtered.length ? 'none' : 'block';
}

document.getElementById('search').addEventListener(
    'input',
    renderPatients
);

document.getElementById('anamnesis-form').addEventListener(
    'submit',
    function(event) {
        event.preventDefault();

        const data = {};

        fields.forEach(field => {
            data[field] = document.getElementById(field)
                .value.trim();
        });

        if (!data.name || !data.complaint) {
            alert('Preencha os campos obrigatórios!');
            return;
        }

        const id = document.getElementById('record-id').value;

        if (id) {
            const index = records.findIndex(r => r.id === id);
            records[index] = {
                ...records[index],
                ...data
            };

            alert('Ficha atualizada com sucesso!');
        } else {
            records.push({
                id: Date.now().toString(),
                ...data,
                created: new Date().toISOString().slice(0, 10)
            });

            alert('Paciente cadastrado com sucesso!');
        }

        save();
        resetForm();
        navigate('patients');
    }
);

function editRecord(id) {
    const record = records.find(r => r.id === id);

    if (!record) return;

    fields.forEach(field => {
        document.getElementById(field).value =
            record[field] || '';
    });

    document.getElementById('record-id').value = id;
    document.getElementById('form-heading').textContent =
        'Editar ficha de anamnese';

    navigate('form');
}

function deleteRecord(id) {
    if (!confirm('Deseja excluir esta ficha?')) return;

    records = records.filter(r => r.id !== id);

    save();
    renderPatients();
    renderDashboard();

    alert('Ficha excluída!');
}

function printRecord(id) {
    const r = records.find(item => item.id === id);

    if (!r) return;

    const content = `
        <h1>ANAMNESE PRO</h1>
        <h2>Ficha do paciente</h2>
        ${fields.map(field => `
            <p>
                <strong>${field}:</strong>
                ${safe(r[field]) || '—'}
            </p>
        `).join('')}
        <p>Data do cadastro: ${dateBR(r.created)}</p>
    `;

    const win = window.open('', '_blank');

    if (!win) {
        alert('Permita pop-ups para imprimir.');
        return;
    }

    win.document.write(`
        <html>
        <head>
            <title>Ficha de Anamnese</title>
            <style>
                body {
                    font-family: Arial;
                    padding: 30px;
                }
                h1 { color: #3268d8; }
                p { padding: 8px 0; border-bottom: 1px solid #ddd; }
            </style>
        </head>
        <body>
            ${content}
            <script>
                window.onload = () => window.print();
            <\/script>
        </body>
        </html>
    `);

    win.document.close();
}

renderDashboard();
