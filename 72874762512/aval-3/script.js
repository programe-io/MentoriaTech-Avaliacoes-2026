document.addEventListener('DOMContentLoaded', () => {
  const passwordOutput = document.getElementById('passwordOutput');
  const copyBtn = document.getElementById('copyBtn');
  const lengthInput = document.getElementById('lengthInput');
  const lengthVal = document.getElementById('lengthVal');
  const uppercaseCb = document.getElementById('uppercase');
  const lowercaseCb = document.getElementById('lowercase');
  const numbersCb = document.getElementById('numbers');
  const symbolsCb = document.getElementById('symbols');
  const generateBtn = document.getElementById('generateBtn');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  // Atualiza o número exibido no slider
  lengthInput.addEventListener('input', () => {
    lengthVal.textContent = lengthInput.value;
    generatePassword();
  });

  function generatePassword() {
    let availableChars = '';
    if (uppercaseCb.checked) availableChars += charSets.uppercase;
    if (lowercaseCb.checked) availableChars += charSets.lowercase;
    if (numbersCb.checked) availableChars += charSets.numbers;
    if (symbolsCb.checked) availableChars += charSets.symbols;

    if (!availableChars) {
      passwordOutput.value = '';
      updateStrength(0);
      return;
    }

    let password = '';
    const length = parseInt(lengthInput.value);

    // Usa API criptográfica do navegador para gerar números aleatórios seguros
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      password += availableChars[randomValues[i] % availableChars.length];
    }

    passwordOutput.value = password;
    calculateStrength(password);
  }

  function calculateStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 14) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    updateStrength(score);
  }

  function updateStrength(score) {
    const levels = [
      { width: '0%', color: '#334155', label: '-' },
      { width: '20%', color: '#ef4444', label: 'Muito Fraca' },
      { width: '40%', color: '#f97316', label: 'Fraca' },
      { width: '60%', color: '#eab308', label: 'Média' },
      { width: '80%', color: '#84cc16', label: 'Forte' },
      { width: '100%', color: '#22c55e', label: 'Muito Forte' }
    ];

    const current = levels[score] || levels[0];
    strengthBar.style.width = current.width;
    strengthBar.style.backgroundColor = current.color;
    strengthText.textContent = `Força da senha: ${current.label}`;
  }

  // Copia a senha para a área de transferência
  copyBtn.addEventListener('click', async () => {
    if (!passwordOutput.value) return;
    
    try {
      await navigator.clipboard.writeText(passwordOutput.value);
      copyBtn.textContent = '✅';
      setTimeout(() => copyBtn.textContent = '📋', 1500);
    } catch (err) {
      alert('Erro ao copiar!');
    }
  });

  // Eventos para regerar a senha dinamicamente
  generateBtn.addEventListener('click', generatePassword);
  [uppercaseCb, lowercaseCb, numbersCb, symbolsCb].forEach(cb => {
    cb.addEventListener('change', generatePassword);
  });

  // Gerar primeira senha ao carregar
  generatePassword();
});