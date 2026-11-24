const inputGroup = document.querySelector('#bmi-form');
const nameInput = document.querySelector('#patient-name');
const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const calculateButton = document.querySelector('#calculate-button');
const resetButton = document.querySelector('#reset-button');
const errorMessage = document.querySelector('#form-error');
const emptyState = document.querySelector('#empty-state');
const resultContent = document.querySelector('#result-content');
const resultSubtitle = document.querySelector('#result-subtitle');
const resultGreeting = document.querySelector('#result-greeting');
const bmiNumber = document.querySelector('#bmi-number');
const classification = document.querySelector('#classification');
const classificationText = document.querySelector('#classification-text');
const scaleMarker = document.querySelector('#scale-marker');

function parseLocalizedNumber(value) {
  const cleaned = value.trim().replace(/\s/g, '');
  if (!/^(?:\d+\.?\d*|\d*,\d+)$/.test(cleaned)) return NaN;
  return Number(cleaned.replace(',', '.'));
}

function getBand(value) {
  if (value < 18.5) return { label: 'Abaixo do peso', tone: 'low' };
  if (value < 25) return { label: 'Faixa de referência', tone: 'healthy' };
  if (value < 30) return { label: 'Sobrepeso', tone: 'high' };
  if (value < 35) return { label: 'Obesidade grau I', tone: 'obese' };
  if (value < 40) return { label: 'Obesidade grau II', tone: 'obese' };
  return { label: 'Obesidade grau III', tone: 'obese' };
}

function showError(message, field) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  field?.focus();
}

function clearError() {
  errorMessage.textContent = '';
  errorMessage.hidden = true;
}

function calculateBmi() {
  clearError();

  const patientName = nameInput.value.trim();
  const weight = parseLocalizedNumber(weightInput.value);
  const height = parseLocalizedNumber(heightInput.value);

  if (!patientName) return showError('Informe seu nome para continuar.', nameInput);
  if (!weightInput.value.trim() || !Number.isFinite(weight)) {
    return showError('Digite um peso válido. Você pode usar vírgula nos decimais, como 68,5.', weightInput);
  }
  if (weight <= 0) return showError('O peso deve ser maior que zero.', weightInput);
  if (!heightInput.value.trim() || !Number.isFinite(height)) {
    return showError('Digite uma altura válida. Você pode usar vírgula nos decimais, como 1,70.', heightInput);
  }
  if (height <= 0) return showError('A altura deve ser maior que zero.', heightInput);

  const bmi = weight / (height * height);
  if (!Number.isFinite(bmi)) return showError('Não foi possível calcular com esses valores. Confira peso e altura.', heightInput);
  const band = getBand(bmi);

  resultGreeting.textContent = `Resultado de ${patientName}`;
  bmiNumber.textContent = bmi.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  classificationText.textContent = band.label;
  classification.dataset.band = band.tone;
  resultSubtitle.textContent = 'Cálculo concluído.';
  scaleMarker.style.left = `${Math.min(100, Math.max(0, ((bmi - 14) / 36) * 100))}%`;
  emptyState.hidden = true;
  resultContent.hidden = false;
  document.querySelector('#result-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetCalculator() {
  nameInput.value = '';
  weightInput.value = '';
  heightInput.value = '';
  clearError();
  emptyState.hidden = false;
  resultContent.hidden = true;
  resultSubtitle.textContent = 'A resposta aparece aqui.';
  resultGreeting.textContent = '';
  bmiNumber.textContent = '—';
  classificationText.textContent = '';
  classification.removeAttribute('data-band');
  scaleMarker.style.left = '0%';
  nameInput.focus();
}

calculateButton.addEventListener('click', calculateBmi);
resetButton.addEventListener('click', resetCalculator);
inputGroup.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.matches('input')) {
    event.preventDefault();
    calculateBmi();
  }
});
