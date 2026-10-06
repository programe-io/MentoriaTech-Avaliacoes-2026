document.addEventListener('DOMContentLoaded', () => {
  const timeDisplay = document.getElementById('time');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const modeBtns = document.querySelectorAll('.mode-btn');
  const cycleCountDisplay = document.getElementById('cycleCount');

  // Configurações dos modos (em minutos)
  const modes = {
    work: 25,
    shortBreak: 5,
    longBreak: 15
  };

  let currentMode = 'work';
  let timeLeft = modes[currentMode] * 60;
  let timerId = null;
  let isRunning = false;
  let completedCycles = 0;

  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timeDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - Pomodoro`;
  }

  function startTimer() {
    if (isRunning) {
      // Pausar
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Iniciar';
    } else {
      // Iniciar / Continuar
      isRunning = true;
      startBtn.textContent = 'Pausar';
      
      timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
          clearInterval(timerId);
          isRunning = false;
          startBtn.textContent = 'Iniciar';

          if (currentMode === 'work') {
            completedCycles++;
            cycleCountDisplay.textContent = completedCycles;
            switchMode('shortBreak');
          } else {
            switchMode('work');
          }

          alert('Tempo esgotado!');
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Iniciar';
    timeLeft = modes[currentMode] * 60;
    updateDisplay();
  }

  function switchMode(newMode) {
    currentMode = newMode;

    // Atualiza classes do body para mudar a cor de fundo
    document.body.className = newMode === 'work' ? '' : newMode;

    // Atualiza cor do texto do botão Iniciar conforme o modo
    const colors = { work: '#ba4949', shortBreak: '#388e3c', longBreak: '#397097' };
    startBtn.style.color = colors[newMode];

    // Atualiza os botões de modo
    modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === newMode);
    });

    resetTimer();
  }

  // Event Listeners
  startBtn.addEventListener('click', startTimer);
  resetBtn.addEventListener('click', resetTimer);

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchMode(btn.dataset.mode);
    });
  });

  // Exibição inicial
  updateDisplay();
});