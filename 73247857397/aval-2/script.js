// ==========================================
// 1. Canvas de Partículas Flutuantes
// ==========================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(147, 197, 253, ${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateCanvas);
}

animateCanvas();

// ==========================================
// 2. Timer Pomodoro
// ==========================================
let duration = 1500;
let remainingTime = duration;
let timerId = null;

const display = document.getElementById('timer-display');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');
const modeBtns = document.querySelectorAll('.mode-btn');

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (timerId !== null) return;
  
  btnStart.disabled = true;
  btnPause.disabled = false;
  
  timerId = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      timerId = null;
      btnStart.disabled = false;
      btnPause.disabled = true;
      playChime();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  btnStart.disabled = false;
  btnPause.disabled = true;
}

function resetTimer() {
  pauseTimer();
  remainingTime = duration;
  updateDisplay();
}

btnStart.addEventListener('click', startTimer);
btnPause.addEventListener('click', pauseTimer);
btnReset.addEventListener('click', resetTimer);

modeBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    modeBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    duration = parseInt(e.target.dataset.time, 10);
    resetTimer();
  });
});

// ==========================================
// 3. Gerador de Som em Tempo Real (Web Audio API)
// ==========================================
let audioCtx = null;
const soundNodes = {};

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function createNoiseBuffer() {
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function setupSound(type) {
  initAudio();
  if (soundNodes[type]) return soundNodes[type];

  const buffer = createNoiseBuffer();
  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;

  const filter = audioCtx.createBiquadFilter();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;

  if (type === 'rain') {
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
  } else if (type === 'waves') {
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 1;
  } else if (type === 'wind') {
    filter.type = 'bandpass';
    filter.frequency.value = 250;
    filter.Q.value = 3;
  } else if (type === 'noise') {
    filter.type = 'lowpass';
    filter.frequency.value = 350;
  }

  noiseSource.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  noiseSource.start();

  const sound = { gainNode, filter };
  soundNodes[type] = sound;
  return sound;
}

function setVolume(type, val) {
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const sound = setupSound(type);
  sound.gainNode.gain.setTargetAtTime(val * 0.15, audioCtx.currentTime, 0.1);
}

document.getElementById('vol-rain').addEventListener('input', e => setVolume('rain', e.target.value));
document.getElementById('vol-waves').addEventListener('input', e => setVolume('waves', e.target.value));
document.getElementById('vol-wind').addEventListener('input', e => setVolume('wind', e.target.value));
document.getElementById('vol-noise').addEventListener('input', e => setVolume('noise', e.target.value));

function playChime() {
  if (!audioCtx) initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 1.5);
}