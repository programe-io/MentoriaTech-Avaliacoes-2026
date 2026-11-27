
let patients = JSON.parse(localStorage.getItem("patients")) || [];

let records = JSON.parse(localStorage.getItem("records")) || [];

function saveData() {
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("records", JSON.stringify(records));
}

function showSection(id) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function updateDashboard() {
    document.getElementById("totalPatients").textContent =
        patients.length;

    document.getElementById("totalRecords").textContent =
        records.length;
}

document.getElementById("patientForm").addEventListener(
    "submit", function(e) {
        e.preventDefault();

        const patient = {
            id: Date.now(),
            name: document.getElementById("name").value.trim(),
            birth: document.getElementById("birth").value,
            cpf: document.getElementById("cpf").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            profession: document.getElementById("profession").value,
            sex: document.getElementById("sex").value,
            marital: document.getElementById("marital").value,
            address: document.getElementById("address").value
        };

        patients.push(patient);

        saveData();
        renderPatients();

        this.reset();

        updateDashboard();

        alert("Paciente cadastrado com sucesso!");

        showSection("pacientes");
    }
);

function renderPatients() {
    const list = document.getElementById("patientList");

    const select = document.getElementById("patientSelect");

    const previousSelection = select.value;

    list.innerHTML = "";

    select.innerHTML =
        '<option value="">Selecione um paciente</option>';

    patients.forEach(patient => {

        const option = document.createElement("option");
        option.value = patient.id;
        option.textContent = patient.name;

        select.appendChild(option);

        const div = document.createElement("div");
        div.className = "patient";

        const name = document.createElement("h3");
        name.textContent = patient.name;

        const phone = document.createElement("p");
        phone.textContent = "Telefone: " + (patient.phone || "Não informado");

        const email = document.createElement("p");
        email.textContent = "E-mail: " + (patient.email || "Não informado");

        const create = document.createElement("button");
        create.textContent = "Nova anamnese";
        create.addEventListener("click", () => {
            select.value = patient.id;
            showSection("anamnese");
        });

        const remove = document.createElement("button");
        remove.textContent = "Excluir";
        remove.className = "delete";

        remove.addEventListener("click", () => deletePatient(patient.id));

        div.append(name, phone, email, create, remove);

        list.appendChild(div);
    });

    select.value = previousSelection;
}

function deletePatient(id) {
    if (!confirm("Excluir este paciente e suas fichas?")) return;

    patients = patients.filter(patient => patient.id !== id);

    records = records.filter(record => record.patientId !== id);

    saveData();
    renderPatients();
    updateDashboard();
}

document.getElementById("search").addEventListener("input", function() {
    const search = this.value.toLowerCase();

    document.querySelectorAll(".patient").forEach(div => {
        const name = div.querySelector("h3").textContent.toLowerCase();

        div.style.display = name.includes(search) ? "block" : "none";
    });
});

document.getElementById("anamnesisForm").addEventListener(
    "submit", function(e) {
        e.preventDefault();

        const patientId = Number(
            document.getElementById("patientSelect").value
        );

        const patient = patients.find(p => p.id === patientId);

        if (!patient) {
            alert("Selecione um paciente cadastrado!");
            return;
        }

        const fields = [
            "complaint",
            "illness",
            "symptoms",
            "disease",
            "diseaseDetails",
            "medication",
            "medicationDetails",
            "allergy",
            "allergyDetails",
            "familyHistory",
            "food",
            "sleep",
            "exercise",
            "observations",
            "professional"
        ];

        const data = {};

        fields.forEach(field => {
            data[field] = document.getElementById(field).value;
        });

        const record = {
            id: Date.now(),
            patientId,
            patientName: patient.name,
            date: new Date().toISOString(),
            data
        };

        records.push(record);

        saveData();
        updateDashboard();

        alert("Anamnese salva com sucesso!");

        this.reset();
    }
);

function printRecord() {
    if (!document.getElementById("patientSelect").value) {
        alert("Selecione um paciente antes de imprimir.");
        return;
    }

    window.print();
}

updateDashboard();
renderPatients();
