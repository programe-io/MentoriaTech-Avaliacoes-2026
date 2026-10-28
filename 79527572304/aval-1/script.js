
const entry = document.getElementById('entry');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const status = document.getElementById('status');
const quoteText = document.getElementById('quoteText');
const quoteButton = document.getElementById('quoteButton');

// Frases curtas inspiradas no clima da série.
const quotes = [
  '"Hello, brother."',
  '"I do believe in killing the messenger."',
  '"People change."',
  '"I promise you, I will never leave you again."'
];

// Carrega o texto salvo anteriormente.
try {
  entry.value = localStorage.getItem('damonDiary') || '';
} catch (error) {
  status.textContent = 'O armazenamento local não está disponível.';
}

// Salva a página do diário.
saveButton.addEventListener('click', () => {
  try {
    localStorage.setItem('damonDiary', entry.value);
    status.textContent = 'Sua página foi guardada. Até a próxima noite!';
  } catch (error) {
    status.textContent = 'Não foi possível salvar neste navegador.';
  }
});

// Apaga o texto e a cópia salva.
clearButton.addEventListener('click', () => {
  entry.value = '';

  try {
    localStorage.removeItem('damonDiary');
    status.textContent = 'A página foi apagada.';
  } catch (error) {
    status.textContent = 'Texto apagado da tela.';
  }
});

// Mostra uma frase diferente.
quoteButton.addEventListener('click', () => {
  const currentQuote = quoteText.textContent;
  let nextQuote = currentQuote;

  while (nextQuote === currentQuote && quotes.length > 1) {
    nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
  }

  quoteText.textContent = nextQuote;
});
