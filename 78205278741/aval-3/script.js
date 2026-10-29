
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const playerHealth = document.getElementById("player-health");
const enemyHealth = document.getElementById("enemy-health");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const roundDisplay = document.getElementById("round");

let p = {
  x: 12,
  hp: 100,
  attacking: false,
  defending: false,
  jumping: false,
  vy: 0
};

let e = {
  x: 72,
  hp: 100,
  attacking: false
};

let running = false;
let seconds = 99;
let clock;
let aiClock;
let actionCooldown = false;
let round = 1;

const keys = {};

function updatePositions() {
  player.style.left = p.x + "%";
  enemy.style.left = e.x + "%";
}

function updateHealth() {
  playerHealth.style.width = Math.max(0, p.hp) + "%";
  enemyHealth.style.width = Math.max(0, e.hp) + "%";
}

function showMessage(text, duration = 800) {
  message.textContent = text;
  message.style.display = "block";

  if (duration > 0) {
    setTimeout(() => {
      if (running) message.style.display = "none";
    }, duration);
  }
}

function startGame() {
  clearInterval(clock);
  clearInterval(aiClock);

  p = {
    x: 12,
    hp: 100,
    attacking: false,
    defending: false,
    jumping: false,
    vy: 0
  };

  e = { x: 72, hp: 100, attacking: false };

  seconds = 99;
  running = true;
  actionCooldown = false;

  player.className = "fighter player";
  enemy.className = "fighter enemy";

  roundDisplay.textContent = "ROUND " + round;
  timerDisplay.textContent = seconds;
  message.style.display = "none";
  startButton.textContent = "REINICIAR LUTA";

  updatePositions();
  updateHealth();

  clock = setInterval(() => {
    if (!running) return;

    seconds--;
    timerDisplay.textContent = seconds;

    if (seconds <= 0) {
      finishGame();
    }
  }, 1000);

  aiClock = setInterval(enemyAI, 850);
}

function finishGame() {
  if (!running) return;

  running = false;
  clearInterval(clock);
  clearInterval(aiClock);

  if (p.hp <= 0 && e.hp <= 0) {
    showMessage("EMPATE!", 0);
  } else if (e.hp <= 0) {
    showMessage("VOCÊ VENCEU!", 0);
    round++;
  } else if (p.hp <= 0) {
    showMessage("VOCÊ PERDEU!", 0);
  } else if (p.hp > e.hp) {
    showMessage("VITÓRIA POR PONTOS!", 0);
    round++;
  } else if (p.hp < e.hp) {
    showMessage("DERROTA POR PONTOS!", 0);
  } else {
    showMessage("EMPATE!", 0);
  }

  startButton.textContent = "JOGAR NOVAMENTE";
}

function distance() {
  return Math.abs((p.x + 3) - (e.x + 3));
}

function attack(type) {
  if (!running || actionCooldown) return;

  actionCooldown = true;
  p.attacking = true;

  const className = type === "special"
    ? "special"
    : type === "punch"
      ? "punching"
      : "kicking";

  player.classList.add(className);

  const damage = {
    punch: 7,
    kick: 12,
    special: 24
  }[type];

  const reach = type === "special" ? 35 : 19;

  showMessage(
    type === "special" ? "GOLPE ESPECIAL!" :
    type === "kick" ? "CHUTE!" : "SOCO!",
    450
  );

  if (distance() <= reach) {
    e.hp = Math.max(0, e.hp - damage);

    enemy.classList.add("hit");
    enemy.style.filter = "drop-shadow(0 0 15px red)";

    setTimeout(() => {
      enemy.classList.remove("hit");
      enemy.style.filter = "";
    }, 350);

    updateHealth();

    if (e.hp <= 0) {
      finishGame();
    }
  } else {
    showMessage("ERROU O GOLPE!", 450);
  }

  setTimeout(() => {
    player.classList.remove(className);
    p.attacking = false;
    actionCooldown = false;
  }, type === "special" ? 600 : 350);
}

function defend(active) {
  if (!running) return;

  p.defending = active;
  player.style.filter = active
    ? "drop-shadow(0 0 10px #36d9ff)"
    : "";
}

function jump() {
  if (!running || p.jumping) return;

  p.jumping = true;
  p.vy = 13;
}

function enemyAI() {
  if (!running || e.hp <= 0) return;

  const d = distance();

  if (d > 17) {
    e.x += p.x < e.x ? -2 : 2;
    e.x = Math.max(8, Math.min(85, e.x));
    updatePositions();
    return;
  }

  if (Math.random() < 0.55) {
    enemy.classList.add("punching");
    showMessage("O TITÃ ATACA!", 350);

    setTimeout(() => {
      if (!running) return;

      if (!p.defending && !p.jumping && distance() <= 20) {
        p.hp = Math.max(0, p.hp - 9);
        player.classList.add("hit");
        setTimeout(() => player.classList.remove("hit"), 300);
        updateHealth();

        if (p.hp <= 0) finishGame();
      }

      enemy.classList.remove("punching");
    }, 250);
  }
}

function movePlayer(direction) {
  if (!running) return;

  p.x += direction * 2.5;
  p.x = Math.max(2, Math.min(85, p.x));

  updatePositions();
}

document.addEventListener("keydown", event => {
  const key = event.key.toLowerCase();

  if (
    ["arrowleft", "arrowright", "arrowup", " "].includes(key)
  ) {
    event.preventDefault();
  }

  keys[key] = true;

  if (event.repeat) return;

  if (key === "j") attack("punch");
  if (key === "k") attack("kick");
  if (key === "l") attack("special");
  if (key === "i") defend(true);

  if (key === "w" || key === "arrowup") jump();

  if (key === "a" || key === "arrowleft") movePlayer(-1);
  if (key === "d" || key === "arrowright") movePlayer(1);
});

document.addEventListener("keyup", event => {
  const key = event.key.toLowerCase();
  keys[key] = false;

  if (key === "i") defend(false);
});

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    attack(button.dataset.action);
  });
});

document.querySelector('[data-action="defend"]')
  .addEventListener("pointerdown", () => defend(true));

document.querySelector('[data-action="defend"]')
  .addEventListener("pointerup", () => defend(false));

document.querySelector('[data-action="defend"]')
  .addEventListener("pointerleave", () => defend(false));

startButton.addEventListener("click", startGame);

// Física simples do pulo
function gameLoop() {
  if (running && p.jumping) {
    p.vy -= 0.65;

    const currentBottom = parseFloat(
      player.style.bottom || "53"
    );

    const nextBottom = currentBottom + p.vy;

    if (nextBottom <= 53) {
      player.style.bottom = "53px";
      p.jumping = false;
      p.vy = 0;
    } else {
      player.style.bottom = nextBottom + "px";
    }
  }

  requestAnimationFrame(gameLoop);
}

updatePositions();
updateHealth();
gameLoop();
