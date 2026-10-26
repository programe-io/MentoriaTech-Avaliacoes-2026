
"use strict";

// BLOCKVERSE 3D
// Compatível com Three.js r128

const THREE3D = window.THREE;

const container = document.getElementById("mundo3D");
const menu = document.getElementById("menuInicial");
const hud = document.getElementById("interface");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fd3ff);
scene.fog = new THREE.FogExp2(0x8fd3ff, 0.008);

const camera = new THREE.PerspectiveCamera(
  70, innerWidth / innerHeight, 0.1, 600
);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

container.appendChild(renderer.domElement);

// ILUMINAÇÃO

scene.add(new THREE.HemisphereLight(
  0xc9eaff, 0x46613e, 0.85
));

const sun = new THREE.DirectionalLight(
  0xffe7b5, 1.7
);

sun.position.set(60, 90, 35);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -100;
sun.shadow.camera.right = 100;
sun.shadow.camera.top = 100;
sun.shadow.camera.bottom = -100;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 250;
sun.shadow.bias = -0.0003;
scene.add(sun);

// MATERIAIS

const mat = (color, extra = {}) =>
  new THREE.MeshStandardMaterial({
    color,
    roughness: 0.85,
    ...extra
  });

const grass = mat(0x4d9e5b);
const grassLight = mat(0x73b96b);
const stone = mat(0x77878e);
const bark = mat(0x79513b);
const leaves = mat(0x26875b);
const leavesLight = mat(0x46a878);
const wood = mat(0xb98a56);
const skin = mat(0xf0ba91);
const shirt = mat(0x28bfa5);
const pants = mat(0x273f68);
const dark = mat(0x263343);
const crystalMat = mat(0x57e9ff, {
  metalness: 0.2,
  emissive: 0x087f9c,
  emissiveIntensity: 0.4
});

// TERRENO PROCEDURAL

const WORLD = 180;
const terrainSegments = 110;

function heightAt(x, z) {
  return (
    Math.sin(x * 0.045) * 4 +
    Math.cos(z * 0.052) * 3 +
    Math.sin((x + z) * 0.025) * 5 +
    Math.sin(x * 0.12) *
    Math.cos(z * 0.11) * 1.3
  );
}

const terrainGeo = new THREE.PlaneGeometry(
  WORLD, WORLD,
  terrainSegments, terrainSegments
);

terrainGeo.rotateX(-Math.PI / 2);

const pos = terrainGeo.attributes.position;
const colors = [];

const c1 = new THREE.Color(0x367d54);
const c2 = new THREE.Color(0x89b875);
const c3 = new THREE.Color(0x8b9793);

for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i);
  const z = pos.getZ(i);
  const h = heightAt(x, z);

  pos.setY(i, h);

  const color = h > 7 ? c3 : h > 0 ? c2 : c1;
  colors.push(color.r, color.g, color.b);
}

terrainGeo.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colors, 3)
);

terrainGeo.computeVertexNormals();

const terrain = new THREE.Mesh(
  terrainGeo,
  new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.95,
    flatShading: false
  })
);

terrain.receiveShadow = true;
scene.add(terrain);

// OBJETOS E RECURSOS

const resources = [];
const obstacles = [];

function addMesh(parent, geometry, material, x, y, z) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addTree(x, z) {
  const y = heightAt(x, z);
  const group = new THREE.Group();
  group.position.set(x, y, z);

  addMesh(
    group,
    new THREE.CylinderGeometry(0.35, 0.55, 4, 8),
    bark, 0, 2, 0
  );

  for (let i = 0; i < 3; i++) {
    addMesh(
      group,
      new THREE.ConeGeometry(2.6 - i * 0.4, 3.2, 8),
      i % 2 ? leavesLight : leaves,
      0, 4 + i * 1.45, 0
    );
  }

  scene.add(group);
  resources.push({
    type: "wood",
    object: group,
    x, z
  });
  obstacles.push({ x, z, radius: 0.7 });
}

function addRock(x, z) {
  const y = heightAt(x, z);
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const rock = addMesh(
    group,
    new THREE.DodecahedronGeometry(1.3, 0),
    stone, 0, 0.7, 0
  );

  rock.scale.set(1.2, 0.7, 0.9);

  scene.add(group);
  resources.push({
    type: "stone",
    object: group,
    x, z
  });
  obstacles.push({ x, z, radius: 1 });
}

function addCrystal(x, z) {
  const y = heightAt(x, z);
  const group = new THREE.Group();
  group.position.set(x, y, z);

  addMesh(
    group,
    new THREE.OctahedronGeometry(1.1),
    crystalMat, 0, 1.2, 0
  );

  scene.add(group);
  resources.push({
    type: "crystal",
    object: group,
    x, z
  });
}

function randomPosition() {
  return (Math.random() - 0.5) * (WORLD - 15);
}

for (let i = 0; i < 115; i++) {
  const x = randomPosition();
  const z = randomPosition();

  if (Math.hypot(x, z) < 10) continue;

  if (i % 9 === 0) addCrystal(x, z);
  else if (i % 4 === 0) addRock(x, z);
  else addTree(x, z);
}

// PERSONAGEM ORIGINAL

const player = new THREE.Group();
scene.add(player);

addMesh(
  player,
  new THREE.CapsuleGeometry(0.48, 0.85, 5, 10),
  shirt, 0, 1.35, 0
);

addMesh(
  player,
  new THREE.SphereGeometry(0.43, 16, 12),
  skin, 0, 2.45, 0
);

addMesh(
  player,
  new THREE.SphereGeometry(0.44, 16, 10),
  dark, 0, 2.68, 0
).scale.set(1, 0.45, 1);

const leftLeg = addMesh(
  player,
  new THREE.CapsuleGeometry(0.17, 0.55, 4, 8),
  pants, -0.24, 0.48, 0
);

const rightLeg = addMesh(
  player,
  new THREE.CapsuleGeometry(0.17, 0.55, 4, 8),
  pants, 0.24, 0.48, 0
);

const leftArm = addMesh(
  player,
  new THREE.CapsuleGeometry(0.15, 0.65, 4, 8),
  shirt, -0.65, 1.55, 0
);

const rightArm = addMesh(
  player,
  new THREE.CapsuleGeometry(0.15, 0.65, 4, 8),
  shirt, 0.65, 1.55, 0
);

player.position.set(0, heightAt(0, 0), 0);

// MOVIMENTAÇÃO

const keys = {};
let playing = false;
let yaw = 0;
let pitch = 0.2;
let velocityY = 0;
let jumping = false;
let stamina = 100;
let health = 100;
let selectedSlot = 1;
let elapsed = 0;

const inventory = {
  wood: 0,
  stone: 0,
  crystal: 0
};

document.addEventListener("keydown", e => {
  keys[e.code] = true;

  if (["Space", "ArrowUp", "ArrowDown"].includes(e.code)) {
    e.preventDefault();
  }

  if (e.code.startsWith("Digit")) {
    const number = Number(e.code.replace("Digit", ""));
    if (number >= 1 && number <= 6) selectSlot(number);
  }

  if (e.code === "KeyE" && playing) collectResource();
});

document.addEventListener("keyup", e => {
  keys[e.code] = false;
});

// CÂMERA COM MOUSE

document.addEventListener("mousemove", e => {
  if (!playing || document.pointerLockElement !== renderer.domElement) {
    return;
  }

  yaw -= e.movementX * 0.0025;
  pitch += e.movementY * 0.002;

  pitch = THREE.MathUtils.clamp(pitch, -0.4, 1.0);
});

function updateCamera() {
  const distance = 8;
  const horizontal = Math.cos(pitch) * distance;

  const target = new THREE.Vector3(
    player.position.x,
    player.position.y + 1.8,
    player.position.z
  );

  const desired = new THREE.Vector3(
    target.x + Math.sin(yaw) * horizontal,
    target.y + Math.sin(pitch) * distance + 2,
    target.z + Math.cos(yaw) * horizontal
  );

  camera.position.lerp(desired, 0.12);
  camera.lookAt(target);
}

// COLISÕES SIMPLES

function canMove(x, z) {
  const limit = WORLD / 2 - 2;

  if (Math.abs(x) > limit || Math.abs(z) > limit) {
    return false;
  }

  for (const obstacle of obstacles) {
    if (Math.hypot(
      x - obstacle.x,
      z - obstacle.z
    ) < obstacle.radius + 0.45) {
      return false;
    }
  }

  return true;
}

function updatePlayer(dt) {
  const forward = Number(!!keys.KeyW) - Number(!!keys.KeyS);
  const side = Number(!!keys.KeyD) - Number(!!keys.KeyA);

  const moving = forward !== 0 || side !== 0;
  const running = moving &&
    (keys.ShiftLeft || keys.ShiftRight) &&
    stamina > 0;

  const speed = running ? 11 : 6;

  if (running) {
    stamina = Math.max(0, stamina - 22 * dt);
  } else {
    stamina = Math.min(100, stamina + 14 * dt);
  }

  if (moving) {
    const angle = Math.atan2(side, forward) + yaw;
    const dx = -Math.sin(angle) * speed * dt;
    const dz = -Math.cos(angle) * speed * dt;

    if (canMove(player.position.x + dx, player.position.z)) {
      player.position.x += dx;
      player.position.z += dz;
    }

    player.rotation.y = angle;
  }

  const ground = heightAt(
    player.position.x,
    player.position.z
  );

  if (keys.Space && !jumping) {
    velocityY = 8;
    jumping = true;
  }

  velocityY -= 22 * dt;
  player.position.y += velocityY * dt;

  if (player.position.y <= ground) {
    player.position.y = ground;
    velocityY = 0;
    jumping = false;
  }

  const animation = moving && !jumping
    ? Math.sin(elapsed * (running ? 17 : 11)) * 0.55
    : 0;

  leftLeg.rotation.x = animation;
  rightLeg.rotation.x = -animation;
  leftArm.rotation.x = -animation * 0.7;
  rightArm.rotation.x = animation * 0.7;

  document.getElementById("barraEnergia").style.width =
    stamina + "%";

  document.getElementById("barraVida").style.width =
    health + "%";
}

// COLETA

let messageTimeout;

function showMessage(text) {
  const element = document.getElementById("mensagemJogo");
  element.textContent = text;

  clearTimeout(messageTimeout);

  messageTimeout = setTimeout(() => {
    element.textContent = "";
  }, 2000);
}

function collectResource() {
  let nearest = null;
  let minDistance = 4;

  for (const resource of resources) {
    const distance = Math.hypot(
      player.position.x - resource.x,
      player.position.z - resource.z
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = resource;
    }
  }

  if (!nearest) {
    showMessage("Aproxime-se de um recurso!");
    return;
  }

  inventory[nearest.type]++;
  scene.remove(nearest.object);

  const index = resources.indexOf(nearest);
  resources.splice(index, 1);

  const obstacleIndex = obstacles.findIndex(
    item => item.x === nearest.x && item.z === nearest.z
  );

  if (obstacleIndex !== -1) {
    obstacles.splice(obstacleIndex, 1);
  }

  showMessage("Recurso coletado: " + nearest.type);
}

// INVENTÁRIO

function selectSlot(number) {
  selectedSlot = number;

  document.querySelectorAll(".slot").forEach(slot => {
    slot.classList.toggle(
      "selecionado",
      Number(slot.dataset.slot) === number
    );
  });
}

document.querySelectorAll(".slot").forEach(slot => {
  slot.addEventListener("click", () => {
    selectSlot(Number(slot.dataset.slot));
  });
});

// CONSTRUÇÃO

const buildings = [];

function build() {
  const materialType =
    selectedSlot === 2 ? "wood" :
    selectedSlot === 3 ? "stone" : null;

  if (!materialType) {
    showMessage("Selecione madeira (2) ou pedra (3)!");
    return;
  }

  if (inventory[materialType] <= 0) {
    showMessage("Colete mais recursos primeiro!");
    return;
  }

  const x = player.position.x -
    Math.sin(player.rotation.y) * 3;

  const z = player.position.z -
    Math.cos(player.rotation.y) * 3;

  if (!canMove(x, z)) {
    showMessage("Não é possível construir aqui!");
    return;
  }

  const y = heightAt(x, z);

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    materialType === "wood" ? wood : stone
  );

  mesh.position.set(x, y + 1, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  scene.add(mesh);
  buildings.push(mesh);
  obstacles.push({ x, z, radius: 1.3 });

  inventory[materialType]--;
  showMessage("Estrutura construída!");
}

renderer.domElement.addEventListener("mousedown", e => {
  if (!playing) return;

  if (document.pointerLockElement !== renderer.domElement) {
    renderer.domElement.requestPointerLock?.();
    return;
  }

  if (e.button === 0) build();
});

// MENU

document.getElementById("btnJogar").addEventListener(
  "click",
  () => {
    menu.classList.add("oculto");
    hud.classList.remove("oculto");
    playing = true;
    renderer.domElement.requestPointerLock?.();
    showMessage("Bem-vindo ao BLOCKVERSE!");
  }
);

document.getElementById("btnControles").addEventListener(
  "click",
  () => {
    document.getElementById("instrucoes")
      .classList.toggle("oculto");
  }
);

// CICLO DIA E NOITE

function updateDayNight() {
  const cycle = elapsed * 0.025;
  const daylight = (Math.sin(cycle) + 1) / 2;

  sun.intensity = 0.2 + daylight * 1.5;

  const dayColor = new THREE.Color(0x8fd3ff);
  const nightColor = new THREE.Color(0x101b42);

  const sky = nightColor.clone().lerp(
    dayColor, daylight
  );

  scene.background = sky;
  scene.fog.color.copy(sky);

  document.getElementById("horario").textContent =
    daylight > 0.4 ? "☀️ Dia" : "🌙 Noite";
}

// LOOP PRINCIPAL

const clock = new THREE.Clock();
let frameCount = 0;
let fpsTimer = 0;

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(clock.getDelta(), 0.05);

  if (playing) {
    elapsed += dt;
    updatePlayer(dt);
    updateDayNight();
  }

  updateCamera();

  // Animar cristais
  for (const resource of resources) {
    if (resource.type === "crystal") {
      resource.object.rotation.y += dt * 0.7;
    }
  }

  renderer.render(scene, camera);

  frameCount++;
  fpsTimer += dt;

  if (fpsTimer >= 1) {
    document.getElementById("fps").textContent =
      "FPS: " + Math.round(frameCount / fpsTimer);

    frameCount = 0;
    fpsTimer = 0;
  }
}

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

animate();
