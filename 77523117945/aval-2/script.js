// Variáveis principais do Three.js
let cena, camera, renderizador;
let jogadorMesh, luzJogador;

// Estados do Jogo
let jogoAtivo = true;
let score = 0;
let health = 100;
let ammo = 200;

// Vetores e Arrays de Controle
const keys = {};
let inimigos = [];
let projeteis = [];

// Elementos do DOM (HUD)
const hudAmmo = document.getElementById("hud-ammo");
const hudHealth = document.getElementById("hud-health");
const hudScore = document.getElementById("hud-score");
const hudFace = document.getElementById("angel-face");
const gameOverScreen = document.getElementById("game-over-screen");
const btnRestart = document.getElementById("btn-restart");
const container3d = document.getElementById("canvas-3d");

// 1. Inicialização do Universo 3D
function init3D() {
    // Criando a Cena
    cena = new THREE.Scene();
    cena.background = new THREE.Color(0x140303); // Névoa avermelhada de fundo
    cena.fog = new THREE.FogExp2(0x140303, 0.05);

    // Configurando Câmera Dinâmica
    camera = new THREE.PerspectiveCamera(60, 800 / 450, 0.1, 1000);
    
    // Configurando Renderizador WebGL
    renderizador = new THREE.WebGLRenderer({ antialias: true });
    renderizador.setSize(800, 450);
    renderizador.shadowMap.enabled = true;
    container3d.appendChild(renderizador.domElement);

    // Iluminação do Ambiente Gótico
    const luzAmbiente = new THREE.AmbientLight(0x331111, 1.5);
    cena.add(luzAmbiente);

    const luzDirecional = new THREE.DirectionalLight(0xff0000, 0.8);
    luzDirecional.position.set(0, 50, 0);
    cena.add(luzDirecional);

    // Criando o Solo Sagrado (Plano de Batalha)
    const soloGeo = new THREE.PlaneGeometry(80, 80);
    const soloMat = new THREE.MeshStandardMaterial({ color: 0x1f142e, roughness: 0.8 });
    const solo = new THREE.Mesh(soloGeo, soloMat);
    solo.rotation.x = -Math.PI / 2; // Deita o plano para virar chão
    solo.receiveShadow = true;
    cena.add(solo);

    // Criando o Personagem (O Anjo - Esfera Dourada de Luz)
    const jogadorGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const jogadorMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00ffff, roughness: 0.2 });
    jogadorMesh = new THREE.Mesh(jogadorGeo, jogadorMat);
    jogadorMesh.position.set(0, 1.2, 0);
    jogadorMesh.castShadow = true;
    cena.add(jogadorMesh);

    // Luz que emana do próprio Anjo
    luzJogador = new THREE.PointLight(0x00ffff, 2, 15);
    luzJogador.position.set(0, 3, 0);
    cena.add(luzJogador);

    // Posicionamento Inicial da Câmera (Perspectiva Isométrica superior)
    ajustarCamera();
}

function ajustarCamera() {
    camera.position.set(jogadorMesh.position.x, jogadorMesh.position.y + 18, jogadorMesh.position.z + 12);
    camera.lookAt(jogadorMesh.position);
}

// 2. Gerenciador de Controles
window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

// Evento de disparo (Mouse)
window.addEventListener("mousedown", () => {
    if (!jogoAtivo || ammo <= 0) return;
    atirar3D();
});

function atirar3D() {
    ammo--;
    hudAmmo.innerText = ammo;

    // Projétil 3D (Esfera de Plasma de Luz)
    const projGeo = new THREE.SphereGeometry(0.3, 8, 8);
    const projMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const projMesh = new THREE.Mesh(projGeo, projMat);

    // Atira na direção para onde o jogador está se movendo, ou para frente por padrão
    let dirX = 0, dirZ = -1;
    if (keys["KeyA"]) dirX = -1;
    if (keys["KeyD"]) dirX = 1;
    if (keys["KeyW"]) dirZ = -1;
    if (keys["KeyS"]) dirZ = 1;

    // Normaliza vetor de disparo
    if (dirX !== 0 && dirZ !== 0) {
        dirX *= 0.707;
        dirZ *= 0.707;
    }

    projMesh.position.set(jogadorMesh.position.x, jogadorMesh.position.y, jogadorMesh.position.z);
    cena.add(projMesh);

    projeteis.push({
        mesh: projMesh,
        vx: dirX === 0 && dirZ === 0 ? 0.4 : dirX * 0.5,
        vz: dirX === 0 && dirZ === 0 ? -0.4 : dirZ * 0.5,
        vida: 60 // Tempo de duração do tiro antes de sumir
    });
}

// 3. Sistema de Geração de Demônios em 3D (Spawning)
function spawnDemoniaco3D() {
    if (jogoAtivo) {
        // Gera em posições aleatórias na borda da arena de 80x80 unidades
        const angulo = Math.random() * Math.PI * 2;
        const raioSpawn = 35; 
        const x = jogadorMesh.position.x + Math.cos(angulo) * raioSpawn;
        const z = jogadorMesh.position.z + Math.sin(angulo) * raioSpawn;

        // Geometria pontiaguda de cristal demoníaco (Cone/Pirâmide)
        const demoGeo = new THREE.ConeGeometry(1.3, 3, 4);
        const demoMat = new THREE.MeshStandardMaterial({ color: 0x8a0000, roughness: 0.5 });
        const demoMesh = new THREE.Mesh(demoGeo, demoMat);
        demoMesh.position.set(x, 1.5, z);
        demoMesh.castShadow = true;
        cena.add(demoMesh);

        inimigos.push({
            mesh: demoMesh,
            vida: 2,
            velocidade: 0.05 + (Math.random() * 0.04)
        });
    }

    setTimeout(spawnDemoniaco3D, Math.max(500, 1800 - score * 8));
}

// 4. Lógica de Atualizações Físicas (Engine Update)
function update() {
    if (!jogoAtivo) return;

    // Movimentação do Anjo (Teclado WASD aplicado nos eixos X e Z 3D)
    if (keys["KeyW"]) jogadorMesh.position.z -= 0.15;
    if (keys["KeyS"]) jogadorMesh.position.z += 0.15;
    if (keys["KeyA"]) jogadorMesh.position.x -= 0.15;
    if (keys["KeyD"]) jogadorMesh.position.x += 0.15;

    // Prende o jogador dentro dos limites da arena quadrada
    jogadorMesh.position.x = Math.max(-38, Math.min(38, jogadorMesh.position.x));
    jogadorMesh.position.z = Math.max(-38, Math.min(38, jogadorMesh.position.z));

    // Luz e câmera seguem o jogador suavemente
    luzJogador.position.set(jogadorMesh.position.x, jogadorMesh.position.y + 2, jogadorMesh.position.z);
    ajustarCamera();

    // Atualizar Tiros
    for (let i = projeteis.length - 1; i >= 0; i--) {
        let p = projeteis[i];
        p.mesh.position.x += p.vx;
        p.mesh.position.z += p.vz;
        p.vida--;

        if (p.vida <= 0) {
            cena.remove(p.mesh);
            projeteis.splice(i, 1);
        }
    }

    // Atualizar Demônios
    for (let i = inimigos.length - 1; i >= 0; i--) {
        let enemy = inimigos[i];
        
        // Perseguição calculando vetores de direção tridimensionais
        let dx = jogadorMesh.position.x - enemy.mesh.position.x;
        let dz = jogadorMesh.position.z - enemy.mesh.position.z;
        let dist = Math.hypot(dx, dz);

        enemy.mesh.position.x += (dx / dist) * enemy.velocidade;
        enemy.mesh.position.z += (dz / dist) * enemy.velocidade;
        enemy.mesh.rotation.y += 0.02; // Roda o cristal para efeito visual maligno

        // Colisão: Demônio encosta no Anjo
        if (dist < 2.0) {
            health -= 0.5;
            hudHealth.innerText = Math.max(0, Math.floor(health)) + "%";
            hudFace.innerText = "😰";
            if (health <= 0) finalizarJogo3D();
        }

        // Colisão: Tiro acerta Demônio
        for (let j = projeteis.length - 1; j >= 0; j--) {
            let p = projeteis[j];
            let distTiro = enemy.mesh.position.distanceTo(p.mesh.position);

            if (distTiro < 1.8) {
                enemy.vida--;
                cena.remove(p.mesh);
                projeteis.splice(j, 1);

                if (enemy.vida <= 0) {
                    score += 15;
                    hudScore.innerText = score;
                    cena.remove(enemy.mesh);
                    inimigos.splice(i, 1);
                    if (Math.random() > 0.6) ammo = Math.min(200, ammo + 15);
                    hudAmmo.innerText = ammo;
                }
                break;
            }
        }
    }

    if (health > 0 && Math.random() > 0.98) hudFace.innerText = "😇";
}

// 5. Renderização em Tempo Real (Loop)
function gameLoop() {
    update();
    renderizador.render(cena, camera);
    requestAnimationFrame(gameLoop);
}

function finalizarJogo3D() {
    jogoAtivo = false;
    hudFace.innerText = "💀";
    hudHealth.innerText = "0%";
    gameOverScreen.classList.remove("hidden");
}

function reiniciar3D() {
    health = 100;
    ammo = 200;
    score = 0;
    
    // Limpar objetos 3D da cena para não causar vazamento de memória
    inimigos.forEach(e => cena.remove(e.mesh));
    projeteis.forEach(p => cena.remove(p.mesh));
    
    inimigos = [];
    projeteis = [];
    jogadorMesh.position.set(0, 1.2, 0);

    hudHealth.innerText = "100%";
    hudAmmo.innerText = "200";
    hudScore.innerText = "0";
    hudFace.innerText = "😇";
    gameOverScreen.classList.add("hidden");
    jogoAtivo = true;
}

// Listeners de reinicialização
btnRestart.addEventListener("click", reiniciar3D);
window.addEventListener("keydown", e => {
    if (e.code === "KeyR" && !jogoAtivo) reiniciar3D();
});

// Execução Inicial
init3D();
spawnDemoniaco3D();
gameLoop();