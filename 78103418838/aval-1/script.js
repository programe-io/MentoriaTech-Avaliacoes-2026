
"use strict";

// ======================================
// VIDACITY 3D - MOTOR DO JOGO
// ======================================

const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const random = (a, b) => a + Math.random() * (b - a);

let scene, camera, renderer, clock;
let player, playerBody, playerHead;
let sun, ambientLight;
let running = false;
let paused = false;
let worldReady = false;
let currentTarget = null;

const keys = {};
const colliders = [];
const interactables = [];
const npcs = [];
const trees = [];

const state = {
  name: "Meu Personagem",
  money: 1000,
  level: 1,
  day: 1,
  minutes: 480,
  hunger: 85,
  energy: 90,
  fun: 80,
  hygiene: 85,
  clothing: "#4488ff",
  mission: 0,
  missionCount: 0,
  visited: [],
  inventory: [],
  homeLevel: 0
};

const missions = [
  {
    text: "Conheça 3 vizinhos pela cidade!",
    goal: 3
  },
  {
    text: "Trabalhe 2 vezes para ganhar dinheiro!",
    goal: 2
  },
  {
    text: "Compre 2 itens na loja!",
    goal: 2
  },
  {
    text: "Divirta-se 3 vezes!",
    goal: 3
  },
  {
    text: "Visite 3 lugares diferentes!",
    goal: 3
  }
];

const materials = {
  grass: 0x7dc979,
  road: 0x444d62,
  sidewalk: 0xd8dce4,
  wood: 0xa87552,
  roof: 0xf16f70,
  window: 0x8fe6ff,
  leaves: 0x39a96b
};

// ======================================
// INICIALIZAÇÃO DO THREE.JS
// ======================================

function initWorld() {
  if (worldReady) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x91d8ff);
  scene.fog = new THREE.Fog(0x91d8ff, 65, 160);

  camera = new THREE.PerspectiveCamera(
    65,
    innerWidth / innerHeight,
    0.1,
    250
  );

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
  });

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(
    Math.min(devicePixelRatio, 2)
  );

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;

  $("gameCanvas").appendChild(renderer.domElement);

  clock = new THREE.Clock();

  ambientLight = new THREE.HemisphereLight(
    0xffffff,
    0x657a92,
    0.85
  );
  scene.add(ambientLight);

  sun = new THREE.DirectionalLight(
    0xfff1d2,
    1.3
  );

  sun.position.set(30, 55, 25);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -75;
  sun.shadow.camera.right = 75;
  sun.shadow.camera.top = 75;
  sun.shadow.camera.bottom = -75;
  scene.add(sun);

  createCity();
  createPlayer();
  createNPCs();
  createClouds();

  camera.position.set(0, 9, 13);
  camera.lookAt(0, 1, 0);

  worldReady = true;
  animate();
}

// ======================================
// OBJETOS 3D
// ======================================

function material(color, extra = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.82,
    ...extra
  });
}

function box(w, h, d, color, x, y, z, parent = scene) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    material(color)
  );

  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function sphere(r, color, x, y, z, parent = scene) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(r, 16, 12),
    material(color)
  );

  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function cylinder(rt, rb, h, color, x, y, z, parent = scene) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(rt, rb, h, 10),
    material(color)
  );

  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function addCollider(x, z, w, d) {
  colliders.push({
    x, z,
    w: w / 2,
    d: d / 2
  });
}

function blocked(x, z) {
  if (Math.abs(x) > 73 || Math.abs(z) > 73) {
    return true;
  }

  return colliders.some(c =>
    Math.abs(x - c.x) < c.w + 0.38 &&
    Math.abs(z - c.z) < c.d + 0.38
  );
}

// ======================================
// CIDADE
// ======================================

function createCity() {
  box(160, 0.25, 160, materials.grass, 0, -0.2, 0);

  // Ruas principais
  [-40, 0, 40].forEach(p => {
    box(160, 0.04, 9, materials.road, 0, 0, p);
    box(9, 0.04, 160, materials.road, p, 0, 0);

    box(160, 0.07, 1.3, materials.sidewalk, 0, 0, p - 5.2);
    box(160, 0.07, 1.3, materials.sidewalk, 0, 0, p + 5.2);
    box(1.3, 0.07, 160, materials.sidewalk, p - 5.2, 0, 0);
    box(1.3, 0.07, 160, materials.sidewalk, p + 5.2, 0);
  });

  // Faixas nas ruas
  for (let i = -72; i < 75; i += 8) {
    [-40, 0, 40].forEach(p => {
      box(3, 0.055, 0.18, 0xffe7a0, i, 0.04, p);
      box(0.18, 0.055, 3, 0xffe7a0, p, 0.04, i);
    });
  }

  // Casas e estabelecimentos
  createHouse(-20, -20, 0xffd5b8, "Minha Casa", "home");
  createHouse(20, -20, 0xb8ddff, "Casa da Luna", "neighbor");
  createHouse(-20, 20, 0xffc8db, "Casa do Leo", "neighbor");
  createHouse(20, 20, 0xd5c4ff, "Casa da Bia", "neighbor");

  createBuilding(-60, -20, 0xffbb66, "Mercado", "market");
  createBuilding(60, -20, 0x85d8ff, "Café", "cafe");
  createBuilding(-60, 20, 0xc4a2ff, "Loja", "shop");
  createBuilding(60, 20, 0xff9ba9, "Trabalho", "work");

  createPark(-20, 60);
  createPark(20, 60);

  // Árvores e decoração
  for (let x = -68; x <= 68; x += 12) {
    for (let z = -68; z <= 68; z += 12) {
      const nearRoad = [-40, 0, 40].some(
        p => Math.abs(x - p) < 8 || Math.abs(z - p) < 8
      );

      const nearBuilding = interactables.some(
        a => Math.abs(x - a.x) < 10 &&
             Math.abs(z - a.z) < 10
      );

      if (!nearRoad && !nearBuilding && Math.random() > 0.45) {
        createTree(x + random(-2, 2), z + random(-2, 2));
      }
    }
  }

  // Postes de iluminação
  for (let x = -60; x <= 60; x += 20) {
    createLamp(x, -6.5);
    createLamp(x, 6.5);
  }

  // Fonte na praça
  cylinder(3.3, 3.5, 0.6, 0xd9e4ee, 0, 0.3, 60);
  cylinder(2.8, 2.8, 0.12, 0x55c8f5, 0, 0.68, 60);
  cylinder(0.4, 0.6, 2, 0xd9e4ee, 0, 1.6, 60);

  addInteractable("Fonte da Praça", 0, 57, "fun");
}

function createHouse(x, z, color, name, type) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  scene.add(group);

  box(9, 5, 8, color, 0, 2.5, 0, group);

  // Telhado inclinado
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(7.2, 3.1, 4),
    material(materials.roof)
  );
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 6.5;
  roof.castShadow = true;
  group.add(roof);

  // Porta
  box(1.7, 3, 0.16, 0x765344, 0, 1.5, 4.08, group);
  sphere(0.12, 0xffd75b, 0.58, 1.45, 4.2, group);

  // Janelas
  [-2.8, 2.8].forEach(px => {
    box(1.8, 1.8, 0.15, 0xffffff, px, 3, 4.1, group);
    box(1.5, 1.5, 0.18, materials.window, px, 3, 4.2, group);
    box(0.12, 1.5, 0.2, 0xffffff, px, 3, 4.31, group);
    box(1.5, 0.12, 0.2, 0xffffff, px, 3, 4.31, group);
  });

  // Caminho da entrada
  box(2.2, 0.07, 3.5, 0xe6d5bb, x, 0.02, z + 5.7);

  addCollider(x, z, 9, 8);
  addInteractable(name, x, z + 6.4, type);
}

function createBuilding(x, z, color, name, type) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  scene.add(group);

  box(12, 7, 10, color, 0, 3.5, 0, group);
  box(13, 0.6, 11, 0xffffff, 0, 7.2, 0, group);

  // Fachada
  box(4, 4.2, 0.2, 0x5c9dc4, 0, 2.1, 5.12, group);

  [-4.3, 4.3].forEach(px => {
    box(2.4, 3, 0.18, 0x9be7ff, px, 3, 5.12, group);
  });

  // Letreiro
  box(7, 1.1, 0.35, 0x37345f, 0, 6.1, 5.35, group);

  addCollider(x, z, 12, 10);
  addInteractable(name, x, z + 7.1, type);
}

function createTree(x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  scene.add(group);

  cylinder(0.3, 0.45, 2.6, 0x89603f, 0, 1.3, 0, group);
  sphere(1.8, 0x3eae69, 0, 3.3, 0, group);
  sphere(1.3, 0x57c97c, -0.8, 3.6, 0, group);
  sphere(1.2, 0x329b5b, 0.8, 3.5, 0, group);

  trees.push(group);
}

function createLamp(x, z) {
  cylinder(0.12, 0.2, 5, 0x434c66, x, 2.5, z);
  sphere(0.45, 0xffefae, x, 5.1, z);
}

function createPark(x, z) {
  box(22, 0.04, 22, 0x6cce83, x, 0.02, z);

  for (let i = 0; i < 5; i++) {
    createTree(
      x + random(-9, 9),
      z + random(-9, 9)
    );
  }

  // Bancos
  [-5, 5].forEach(px => {
    box(3, 0.25, 0.9, 0x9a6748, x + px, 1, z);
    box(3, 1.2, 0.2, 0x9a6748, x + px, 1.5, z - 0.5);
    box(0.2, 1, 0.2, 0x555555, x + px - 1, 0.5, z);
    box(0.2, 1, 0.2, 0x555555, x + px + 1, 0.5, z);
  });
}

function createClouds() {
  for (let i = 0; i < 18; i++) {
    const group = new THREE.Group();

    for (let j = 0; j < 4; j++) {
      sphere(
        random(2, 4),
        0xffffff,
        j * 2.5,
        random(-0.5, 0.5),
        0,
        group
      );
    }

    group.position.set(
      random(-85, 85),
      random(24, 35),
      random(-85, 85)
    );

    group.userData.cloud = true;
    scene.add(group);
  }
}

// ======================================
// PERSONAGEM 3D
// ======================================

function createPerson(color = "#4488ff") {
  const group = new THREE.Group();

  // Pernas
  box(0.42, 1.1, 0.5, 0x303a66, -0.3, 0.55, 0, group);
  box(0.42, 1.1, 0.5, 0x303a66, 0.3, 0.55, 0, group);

  // Sapatos
  box(0.5, 0.25, 0.75, 0xffffff, -0.3, 0.13, 0.15, group);
  box(0.5, 0.25, 0.75, 0xffffff, 0.3, 0.13, 0.15, group);

  // Tronco
  const body = box(1.1, 1.4, 0.65, color, 0, 1.8, 0, group);

  // Braços
  box(0.3, 1.2, 0.4, color, -0.75, 1.8, 0, group);
  box(0.3, 1.2, 0.4, color, 0.75, 1.8, 0, group);

  // Cabeça
  const head = sphere(0.58, 0xf3bf94, 0, 2.95, 0, group);

  // Cabelo
  sphere(0.58, 0x3a2630, 0, 3.22, -0.12, group);

  // Olhos
  sphere(0.075, 0x222233, -0.2, 3, 0.52, group);
  sphere(0.075, 0x222233, 0.2, 3, 0.52, group);

  // Sorriso
  box(0.22, 0.035, 0.04, 0xa65c5c, 0, 2.77, 0.57, group);

  group.userData.body = body;
  group.userData.head = head;

  return group;
}

function createPlayer() {
  player = createPerson(state.clothing);
  player.position.set(0, 0, 10);
  scene.add(player);

  playerBody = player.userData.body;
  playerHead = player.userData.head;
}

// ======================================
// VIZINHOS
// ======================================

function createNPCs() {
  const data = [
    ["Luna", -14, -11, "#ff76b5"],
    ["Leo", -25, 12, "#5bc7ff"],
    ["Bia", 24, 12, "#bc83ff"],
    ["Rafa", 13, -13, "#ffbd57"],
    ["Nina", -52, 12, "#66d6a2"],
    ["Davi", 52, -12, "#ff8866"],
    ["Mia", 13, 53, "#ee77cc"],
    ["Theo", -14, 52, "#66aaff"]
  ];

  data.forEach(([name, x, z, color]) => {
    const npc = createPerson(color);
    npc.position.set(x, 0, z);
    npc.userData.name = name;
    npc.userData.origin = new THREE.Vector3(x, 0, z);
    npc.userData.target = new THREE.Vector3(x, 0, z);
    npc.userData.speed = random(0.6, 1.3);
    npc.userData.wait = 0;

    scene.add(npc);
    npcs.push(npc);
  });
}

function updateNPCs(dt) {
  npcs.forEach(npc => {
    npc.userData.wait -= dt;

    if (npc.userData.wait <= 0) {
      npc.userData.target.set(
        npc.userData.origin.x + random(-5, 5),
        0,
        npc.userData.origin.z + random(-5, 5)
      );
      npc.userData.wait = random(3, 8);
    }

    const direction = npc.userData.target.clone()
      .sub(npc.position);

    direction.y = 0;

    if (direction.length() > 0.3) {
      direction.normalize();

      const nx = npc.position.x +
        direction.x * npc.userData.speed * dt;
      const nz = npc.position.z +
        direction.z * npc.userData.speed * dt;

      if (!blocked(nx, nz)) {
        npc.position.x = nx;
        npc.position.z = nz;
        npc.rotation.y = Math.atan2(
          direction.x,
          direction.z
        );
      }
    }

    npc.userData.body.rotation.z =
      Math.sin(state.minutes + npc.position.x) * 0.02;
  });
}

// ======================================
// INTERAÇÕES
// ======================================

function addInteractable(name, x, z, type) {
  interactables.push({ name, x, z, type });
}

function findNearest() {
  let nearest = null;
  let distance = 3.5;

  interactables.forEach(item => {
    const d = Math.hypot(
      player.position.x - item.x,
      player.position.z - item.z
    );

    if (d < distance) {
      nearest = item;
      distance = d;
    }
  });

  npcs.forEach(npc => {
    const d = player.position.distanceTo(npc.position);

    if (d < distance) {
      nearest = {
        type: "npc",
        name: npc.userData.name,
        npc
      };
      distance = d;
    }
  });

  return nearest;
}

function updateInteraction() {
  currentTarget = findNearest();

  if (currentTarget) {
    $("interactionBox").classList.remove("hidden");
    $("interactionText").textContent =
      "Pressione E: " + currentTarget.name;
  } else {
    $("interactionBox").classList.add("hidden");
  }
}

function interact() {
  if (!running || paused || !currentTarget) return;

  const item = currentTarget;

  switch (item.type) {
    case "npc":
      talkToNPC(item.name);
      break;

    case "home":
      state.energy = clamp(state.energy + 35, 0, 100);
      state.hygiene = clamp(state.hygiene + 25, 0, 100);
      notify("🏠 Você descansou e tomou banho!");
      break;

    case "market":
      state.hunger = clamp(state.hunger + 40, 0, 100);
      spendMoney(25);
      notify("🍔 Você fez uma refeição!");
      break;

    case "cafe":
      if (spendMoney(15)) {
        state.fun = clamp(state.fun + 20, 0, 100);
        state.hunger = clamp(state.hunger + 15, 0, 100);
        notify("☕ Que lanche delicioso!");
      }
      break;

    case "shop":
      openModal("shopModal");
      break;

    case "work":
      openModal("jobsModal");
      break;

    case "neighbor":
      notify("🏡 Você visitou " + item.name);
      state.fun = clamp(state.fun + 10, 0, 100);
      break;

    case "fun":
      state.fun = clamp(state.fun + 30, 0, 100);
      progressMission(3);
      notify("🎉 Você se divertiu na praça!");
      break;
  }

  if (item.type !== "npc") {
    visitPlace(item.name);
  }

  updateHUD();
}

function talkToNPC(name) {
  const messages = [
    "Que dia bonito para passear!",
    "Você já visitou o parque?",
    "Adoro morar nesta cidade!",
    "Vamos explorar a cidade!",
    "Ouvi dizer que tem novidades na loja!",
    "Você parece ser uma pessoa divertida!"
  ];

  const message = messages[
    Math.floor(Math.random() * messages.length)
  ];

  notify("💬 " + name + ": " + message);
  state.fun = clamp(state.fun + 8, 0, 100);

  const key = "npc:" + name;

  if (!state.visited.includes(key)) {
    state.visited.push(key);
    progressMission(0);
  }
}

function visitPlace(name) {
  const key = "place:" + name;

  if (!state.visited.includes(key)) {
    state.visited.push(key);
    progressMission(4);
  }
}

function spendMoney(amount) {
  if (state.money < amount) {
    notify("💰 Você não tem dinheiro suficiente!");
    return false;
  }

  state.money -= amount;
  return true;
}

// ======================================
// MISSÕES
// ======================================

function progressMission(index) {
  if (state.mission !== index) return;

  state.missionCount++;

  const mission = missions[state.mission];

  if (state.missionCount >= mission.goal) {
    state.money += 200;
    state.level++;
    state.mission++;
    state.missionCount = 0;

    notify("🏆 MISSÃO COMPLETA! +200 moedas!");

    if (state.mission >= missions.length) {
      state.mission = 0;
      state.visited = [];
    }
  }

  updateHUD();
}

// ======================================
// LOJA E TRABALHOS
// ======================================

const shopItems = [
  { name: "🍕 Pizza", price: 30, type: "food" },
  { name: "🎮 Videogame", price: 150, type: "fun" },
  { name: "🛋️ Sofá novo", price: 250, type: "furniture" },
  { name: "🛏️ Cama confortável", price: 350, type: "furniture" },
  { name: "🚲 Bicicleta", price: 450, type: "furniture" },
  { name: "🏠 Reforma da casa", price: 600, type: "home" }
];

const jobs = [
  { name: "☕ Atendente", salary: 80 },
  { name: "🍕 Entregador", salary: 120 },
  { name: "🎨 Artista", salary: 150 },
  { name: "💻 Programador", salary: 200 }
];

function setupShop() {
  $("shopItems").innerHTML = "";

  shopItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "shop-item";

    const label = document.createElement("span");
    label.textContent = item.name + " - 💰 " + item.price;

    const button = document.createElement("button");
    button.textContent = "Comprar";

    button.onclick = () => {
      if (!spendMoney(item.price)) return;

      state.inventory.push(item.name);

      if (item.type === "food") {
        state.hunger = clamp(state.hunger + 35, 0, 100);
      }

      if (item.type === "fun") {
        state.fun = clamp(state.fun + 40, 0, 100);
      }

      if (item.type === "home") {
        state.homeLevel++;
      }

      progressMission(2);
      notify("🛍️ Comprou: " + item.name);
      updateHUD();
    };

    div.append(label, button);
    $("shopItems").appendChild(div);
  });
}

function setupJobs() {
  $("jobsList").innerHTML = "";

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job-item";

    const label = document.createElement("span");
    label.textContent =
      job.name + " - 💰 " + job.salary;

    const button = document.createElement("button");
    button.textContent = "Trabalhar";

    button.onclick = () => {
      if (state.energy < 15) {
        notify("😴 Você precisa descansar!");
        return;
      }

      state.money += job.salary;
      state.energy = clamp(state.energy - 15, 0, 100);
      state.fun = clamp(state.fun - 8, 0, 100);
      state.minutes += 60;

      progressMission(1);
      notify("💼 Trabalho concluído! +" + job.salary);
      updateHUD();
    };

    div.append(label, button);
    $("jobsList").appendChild(div);
  });
}

// ======================================
// HUD
// ======================================

function updateHUD() {
  $("playerName").textContent = state.name;
  $("playerLevel").textContent = "⭐ Nível " + state.level;
  $("money").textContent = state.money;

  const hours = Math.floor(state.minutes / 60) % 24;
  const mins = Math.floor(state.minutes % 60);

  $("gameTime").textContent =
    String(hours).padStart(2, "0") + ":" +
    String(mins).padStart(2, "0");

  $("gameDay").textContent = "Dia " + state.day;

  const needs = {
    hungerBar: state.hunger,
    energyBar: state.energy,
    funBar: state.fun,
    hygieneBar: state.hygiene
  };

  Object.entries(needs).forEach(([id, value]) => {
    $(id).style.width = clamp(value, 0, 100) + "%";
  });

  const mission = missions[state.mission];
  $("missionText").textContent = mission.text;
  $("missionProgress").textContent =
    state.missionCount + "/" + mission.goal;
}

function notify(message) {
  const element = document.createElement("div");
  element.className = "notification";
  element.textContent = message;

  $("notifications").appendChild(element);

  setTimeout(() => element.remove(), 3500);
}

// ======================================
// DIA E NOITE
// ======================================

function updateDayNight() {
  const hour = (state.minutes / 60) % 24;

  const daylight = clamp(
    Math.sin((hour - 6) / 12 * Math.PI),
    0.08,
    1
  );

  sun.intensity = daylight * 1.4;
  ambientLight.intensity = 0.3 + daylight * 0.65;

  const night = new THREE.Color(0x101b44);
  const day = new THREE.Color(0x91d8ff);

  scene.background = night.clone().lerp(day, daylight);
  scene.fog.color.copy(scene.background);
}

// ======================================
// MOVIMENTAÇÃO E CÂMERA
// ======================================

let cameraAngle = 0;
let cameraDistance = 11;
let cameraHeight = 7;
let walkingTime = 0;

function updatePlayer(dt) {
  let dx = 0;
  let dz = 0;

  if (keys["w"] || keys["arrowup"]) dz -= 1;
  if (keys["s"] || keys["arrowdown"]) dz += 1;
  if (keys["a"] || keys["arrowleft"]) dx -= 1;
  if (keys["d"] || keys["arrowright"]) dx += 1;

  if (dx !== 0 || dz !== 0) {
    const length = Math.hypot(dx, dz);
    dx /= length;
    dz /= length;

    const speed = keys["shift"] ? 9 : 5.5;

    const moveX =
      dx * Math.cos(cameraAngle) -
      dz * Math.sin(cameraAngle);

    const moveZ =
      dx * Math.sin(cameraAngle) +
      dz * Math.cos(cameraAngle);

    const nx = player.position.x + moveX * speed * dt;
    const nz = player.position.z + moveZ * speed * dt;

    if (!blocked(nx, player.position.z)) {
      player.position.x = nx;
    }

    if (!blocked(player.position.x, nz)) {
      player.position.z = nz;
    }

    player.rotation.y = Math.atan2(moveX, moveZ);

    walkingTime += dt * 12;
    player.position.y =
      Math.abs(Math.sin(walkingTime)) * 0.08;

    playerBody.rotation.z =
      Math.sin(walkingTime) * 0.035;
  } else {
    player.position.y = 0;
    playerBody.rotation.z = 0;
  }
}

function updateCamera(dt) {
  const target = new THREE.Vector3(
    player.position.x +
      Math.sin(cameraAngle) * cameraDistance,
    player.position.y + cameraHeight,
    player.position.z +
      Math.cos(cameraAngle) * cameraDistance
  );

  camera.position.lerp(target, Math.min(1, dt * 5));

  camera.lookAt(
    player.position.x,
    player.position.y + 1.8,
    player.position.z
  );
}

let dragging = false;
let previousMouseX = 0;

function setupCameraControls() {
  const canvas = renderer.domElement;

  canvas.addEventListener("pointerdown", e => {
    dragging = true;
    previousMouseX = e.clientX;
  });

  window.addEventListener("pointerup", () => {
    dragging = false;
  });

  window.addEventListener("pointermove", e => {
    if (!dragging) return;

    cameraAngle -= (e.clientX - previousMouseX) * 0.005;
    previousMouseX = e.clientX;
  });

  canvas.addEventListener("wheel", e => {
    cameraDistance = clamp(
      cameraDistance + e.deltaY * 0.01,
      5,
      20
    );
  }, { passive: true });
}

// ======================================
// MINIMAPA
// ======================================

function drawMinimap() {
  const canvas = $("minimapCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = "#78c783";
  ctx.fillRect(0, 0, w, h);

  const scale = w / 160;
  const pos = (x, z) => ({
    x: (x + 80) * scale,
    y: (z + 80) * scale
  });

  ctx.fillStyle = "#626a7c";

  [-40, 0, 40].forEach(p => {
    ctx.fillRect(0, (p + 75.5) * scale, w, 9 * scale);
    ctx.fillRect((p + 75.5) * scale, 0, 9 * scale, h);
  });

  interactables.forEach(item => {
    const p = pos(item.x, item.z);
    ctx.fillStyle = "#fff3b0";
    ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
  });

  npcs.forEach(npc => {
    const p = pos(npc.position.x, npc.position.z);
    ctx.fillStyle = "#ff79b7";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  const p = pos(player.position.x, player.position.z);

  ctx.fillStyle = "#2477ff";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ======================================
// TEMPO E NECESSIDADES
// ======================================

let hudTimer = 0;

function updateSimulation(dt) {
  state.minutes += dt * 1.5;

  if (state.minutes >= 1440) {
    state.minutes -= 1440;
    state.day++;
    notify("🌅 Um novo dia começou!");
    saveGame();
  }

  state.hunger = clamp(
    state.hunger - dt * 0.018, 0, 100
  );

  state.energy = clamp(
    state.energy - dt * 0.012, 0, 100
  );

  state.fun = clamp(
    state.fun - dt * 0.01, 0, 100
  );

  state.hygiene = clamp(
    state.hygiene - dt * 0.008, 0, 100
  );

  hudTimer += dt;

  if (hudTimer >= 0.25) {
    updateHUD();
    drawMinimap();
    updateDayNight();
    hudTimer = 0;
  }
}

// ======================================
// LOOP PRINCIPAL
// ======================================

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(clock.getDelta(), 0.05);

  if (running && !paused) {
    updatePlayer(dt);
    updateNPCs(dt);
    updateCamera(dt);
    updateSimulation(dt);
    updateInteraction();
  }

  renderer.render(scene, camera);
}

// ======================================
// SALVAR E CARREGAR
// ======================================

function saveGame() {
  if (!player) return;

  const data = {
    state,
    position: {
      x: player.position.x,
      z: player.position.z
    }
  };

  localStorage.setItem(
    "vidacity3d-save",
    JSON.stringify(data)
  );

  notify("💾 Jogo salvo!");
}

function loadGame() {
  const raw = localStorage.getItem("vidacity3d-save");

  if (!raw) {
    notify("Nenhum jogo salvo encontrado!");
    return false;
  }

  try {
    const data = JSON.parse(raw);
    Object.assign(state, data.state);

    if (player && data.position) {
      player.position.set(
        data.position.x,
        0,
        data.position.z
      );
    }

    updateClothing();
    updateHUD();
    return true;
  } catch (error) {
    notify("Não foi possível carregar o jogo.");
    return false;
  }
}

function updateClothing() {
  if (!player) return;

  playerBody.material.color.set(state.clothing);
}

// ======================================
// MENUS
// ======================================

function openModal(id) {
  paused = true;
  $(id).classList.remove("hidden");
}

function closeModals() {
  document.querySelectorAll(".modal").forEach(el => {
    el.classList.add("hidden");
  });

  paused = false;
}

function togglePause() {
  if (!running) return;

  if (!$("pauseMenu").classList.contains("hidden")) {
    closeModals();
  } else {
    openModal("pauseMenu");
  }
}

function startGame(load = false) {
  $("mainMenu").classList.add("hidden");
  $("gameContainer").classList.remove("hidden");

  initWorld();

  if (load) loadGame();

  running = true;
  paused = false;

  clock.getDelta();
  updateHUD();
  setupCameraControls();
  notify("🌆 Bem-vindo ao VidaCity 3D!");
}

// ======================================
// EVENTOS DOS BOTÕES
// ======================================

function setupEvents() {
  $("playBtn").onclick = () => startGame(false);
  $("continueBtn").onclick = () => startGame(true);

  $("settingsBtn").onclick = () => {
    openModal("settingsModal");
  };

  $("shopBtn").onclick = () => openModal("shopModal");
  $("jobsBtn").onclick = () => openModal("jobsModal");
  $("characterBtn").onclick = () => openModal("characterModal");

  $("houseBtn").onclick = () => {
    notify("🏠 Sua casa está marcada no minimapa!");
  };

  $("mapBtn").onclick = () => {
    notify("🗺️ Explore os pontos amarelos no minimapa!");
  };

  $("phoneBtn").onclick = () => {
    notify("📱 Novas aventuras estão esperando por você!");
  };

  $("pauseBtn").onclick = togglePause;
  $("resumeBtn").onclick = closeModals;

  $("saveBtn").onclick = saveGame;

  $("exitBtn").onclick = () => {
    saveGame();
    running = false;
    closeModals();

    $("gameContainer").classList.add("hidden");
    $("mainMenu").classList.remove("hidden");
  };

  $("interactBtn").onclick = interact;
  $("mobileInteract").onclick = interact;

  $("saveCharacterBtn").onclick = () => {
    const name = $("nameInput").value.trim();

    if (name) {
      state.name = name;
    }

    updateHUD();
    closeModals();
    notify("👕 Personagem atualizado!");
  };

  document.querySelectorAll("#clothingColors button")
    .forEach(button => {
      button.onclick = () => {
        state.clothing = button.dataset.color;
        updateClothing();
      };
    });

  document.querySelectorAll(".close-modal")
    .forEach(button => {
      button.onclick = closeModals;
    });

  window.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();

    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
      e.preventDefault();
    }

    if (e.target.matches("input, textarea, select")) {
      return;
    }

    keys[key] = true;

    if (key === "e" && !e.repeat) interact();
    if (key === "escape" && !e.repeat) togglePause();
  });

  window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
  });

  window.addEventListener("blur", () => {
    Object.keys(keys).forEach(key => keys[key] = false);
  });

  const mobileKeys = {
    moveUp: "w",
    moveDown: "s",
    moveLeft: "a",
    moveRight: "d"
  };

  Object.entries(mobileKeys).forEach(([id, key]) => {
    const button = $(id);

    button.addEventListener("pointerdown", e => {
      e.preventDefault();
      keys[key] = true;
      button.setPointerCapture(e.pointerId);
    });

    const release = () => {
      keys[key] = false;
    };

    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", release);
  });

  window.addEventListener("resize", () => {
    if (!camera || !renderer) return;

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  $("graphicsQuality").onchange = e => {
    if (!renderer) return;

    const quality = e.target.value;

    renderer.setPixelRatio(
      quality === "low" ? 1 :
      quality === "medium" ? 1.5 :
      Math.min(devicePixelRatio, 2)
    );

    renderer.shadowMap.enabled = quality !== "low";
  };
}

// ======================================
// INICIAR INTERFACE
// ======================================

function boot() {
  setupEvents();
  setupShop();
  setupJobs();
  updateHUD();

  const progress = document.querySelector(".loading-progress");
  progress.style.width = "100%";

  setTimeout(() => {
    $("loadingScreen").classList.add("hidden");
  }, 700);
}

window.addEventListener("DOMContentLoaded", boot);
