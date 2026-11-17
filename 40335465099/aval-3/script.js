"use strict";

const form = document.getElementById("form-pessoa");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");
const errorMessage = document.getElementById("erro");
const successMessage = document.getElementById("sucesso");
const tableBody = document.getElementById("tabela");
const emptyState = document.getElementById("vazio");
const counter = document.getElementById("contador");

const STORAGE_KEY = "ficha-anamnese-imc-pacientes-v1";
let patients = loadPatients();
let nextId = patients.reduce((largest, patient) => Math.max(largest, patient.id), 0) + 1;

const numberFormat = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function calculateBmi(weight, height) {
  return weight / (height * height);
}

function classifyBmi(bmi) {
  if (bmi < 18.5) return { label: "Abaixo do peso", className: "badge-under" };
  if (bmi < 25) return { label: "Peso normal", className: "badge-normal" };
  if (bmi < 30) return { label: "Sobrepeso", className: "badge-overweight" };
  return { label: "Obesidade", className: "badge-obesity" };
}

function readForm() {
  return {
    name: nomeInput.value.trim(),
    age: Number(idadeInput.value),
    height: Number(alturaInput.value),
    weight: Number(pesoInput.value),
  };
}

function validate(patient) {
  if (patient.name.length < 2) {
    return "Informe o nome com pelo menos duas letras.";
  }
  if (!Number.isInteger(patient.age) || patient.age < 1 || patient.age > 120) {
    return "A idade deve ser um número inteiro entre 1 e 120.";
  }
  if (!Number.isFinite(patient.height) || patient.height < 0.5 || patient.height > 2.5) {
    return "A altura deve estar entre 0,5 m e 2,5 m.";
  }
  if (!Number.isFinite(patient.weight) || patient.weight < 2 || patient.weight > 500) {
    return "O peso deve estar entre 2 kg e 500 kg.";
  }
  return "";
}

function makeCell(value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  return cell;
}

function makePatientRow(patient) {
  const bmi = calculateBmi(patient.weight, patient.height);
  const classification = classifyBmi(bmi);
  const row = document.createElement("tr");

  row.append(
    makeCell(patient.name),
    makeCell(String(patient.age)),
    makeCell(`${patient.height.toFixed(2).replace(".", ",")} m`),
    makeCell(`${patient.weight.toFixed(1).replace(".", ",")} kg`),
    makeCell(numberFormat.format(bmi)),
  );

  const classificationCell = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = `badge ${classification.className}`;
  badge.textContent = classification.label;
  classificationCell.append(badge);
  row.append(classificationCell);

  const actionCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "btn-delete";
  deleteButton.textContent = "Apagar";
  deleteButton.setAttribute("aria-label", `Apagar o registro de ${patient.name}`);
  deleteButton.addEventListener("click", () => deletePatient(patient.id));
  actionCell.append(deleteButton);
  row.append(actionCell);

  return row;
}

function render() {
  tableBody.replaceChildren(...patients.map(makePatientRow));
  emptyState.hidden = patients.length > 0;

  const label = patients.length === 1 ? "paciente" : "pacientes";
  counter.textContent = `${patients.length} ${label}`;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  successMessage.hidden = true;
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.hidden = false;
  errorMessage.hidden = true;
}

function clearMessages() {
  errorMessage.hidden = true;
  successMessage.hidden = true;
}

function loadPatients() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((patient) =>
      patient &&
      Number.isInteger(patient.id) &&
      typeof patient.name === "string" &&
      Number.isInteger(patient.age) &&
      Number.isFinite(patient.height) &&
      Number.isFinite(patient.weight)
    );
  } catch (error) {
    console.warn("Não foi possível carregar os pacientes salvos.", error);
    return [];
  }
}

function savePatients() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    return true;
  } catch (error) {
    console.error("Não foi possível salvar os pacientes.", error);
    showError("O navegador não permitiu salvar os dados neste dispositivo.");
    return false;
  }
}

function deletePatient(id) {
  const patient = patients.find((item) => item.id === id);
  patients = patients.filter((item) => item.id !== id);
  savePatients();
  render();

  if (patient) showSuccess(`Registro de ${patient.name} apagado.`);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessages();

  const patient = readForm();
  const validationError = validate(patient);
  if (validationError) {
    showError(validationError);
    return;
  }

  patients.push({ id: nextId++, ...patient });
  if (!savePatients()) {
    patients.pop();
    nextId -= 1;
    render();
    return;
  }

  form.reset();
  render();
  nomeInput.focus();
  showSuccess(`${patient.name} foi cadastrado(a) com sucesso.`);
});

render();
