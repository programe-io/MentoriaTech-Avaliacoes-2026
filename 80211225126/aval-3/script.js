// ==========================================
// 1. CONFIGURAÇÃO DO CENÁRIO 3D
// ==========================================
const cena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderizador.domElement);

// Ativa os controlos orbitais para permitir rodar a câmara com o rato
const controlos = new THREE.OrbitControls(camara, renderizador.domElement);
controlos.enableDamping = true;
controlos.dampingFactor = 0.05;

// ==========================================
// 2. ILUMINAÇÃO
// ==========================================
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.3);
cena.add(luzAmbiente);

// Luz frontal branca para criar os reflexos brilhantes no metal
const luzDirecional = new THREE.DirectionalLight(0xffffff, 1);
luzDirecional.position.set(0, 2, 5);
cena.add(luzDirecional);

// Luzes pontuais roxas para projetar a cor néon nas laterais do logótipo
const luzRoxa1 = new THREE.PointLight(0xa855f7, 2, 50);
luzRoxa1.position.set(-3, 0, 3);
cena.add(luzRoxa1);

const luzRoxa2 = new THREE.PointLight(0xa855f7, 2, 50);
luzRoxa2.position.set(3, 0, 3);
cena.add(luzRoxa2);

// ==========================================
// 3. MODELAÇÃO DO LOGÓTIPO (PORTAS DOS BTS)
// ==========================================
const formatoPorta = new THREE.Shape();
formatoPorta.moveTo(0.12, 1.8);    // Canto superior interno
formatoPorta.lineTo(0.95, 1.55);   // Canto superior externo
formatoPorta.lineTo(0.65, -1.55);  // Canto inferior externo
formatoPorta.lineTo(0.12, -1.8);   // Canto inferior interno
formatoPorta.closePath();

// Configurações para dar profundidade e relevo chanfrado ao desenho 2D
const opcoesExtrusao = {
    depth: 0.25,          // Espessura do bloco 3D
    bevelEnabled: true,   // Ativa cantos suavizados
    bevelThickness: 0.04,
    bevelSize: 0.02,
    bevelSegments: 4
};

const geometriaPorta = new THREE.ExtrudeGeometry(formatoPorta, opcoesExtrusao);

// Configuração do material roxo metalizado e polido
const materialBts = new THREE.MeshStandardMaterial({
    color: 0x9333ea,       // Tom oficial roxo
    metalness: 0.8,        // Nível de reflexo metálico
    roughness: 0.15,       // Lisura da superfície (menor = mais espelhada)
});

// Criar um grupo para conter as duas metades unidas
const btsGroup = new THREE.Group();

// Lado Direito do Logótipo
const portaDireita = new THREE.Mesh(geometriaPorta, materialBts);
btsGroup.add(portaDireita);

// Lado Esquerdo (Espelhado usando escala negativa no eixo X)
const portaEsquerda = new THREE.Mesh(geometriaPorta, materialBts);
portaEsquerda.scale.x = -1;
btsGroup.add(portaEsquerda);

// Adiciona o grupo centralizado ao cenário
cena.add(btsGroup);

// Afasta a câmara para enquadrar o objeto na tela
camara.position.set(0, 0, 5.5);
controlos.update();

// ==========================================
// 4. CICLO DE ANIMAÇÃO E RENDERIZAÇÃO
// ==========================================
function animar() {
    requestAnimationFrame(animar);

    // Efeito de rotação automática no próprio eixo
    btsGroup.rotation.y += 0.006;

    // Atualiza a física do arrasto do rato
    controlos.update();

    // Desenha o frame atual na tela
    renderizador.render(cena, camara);
}

// Inicia a execução da animação
animar();

// ==========================================
// 5. AJUSTE DINÂMICO DE JANELA (RESPONSIVIDADE)
// ==========================================
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});