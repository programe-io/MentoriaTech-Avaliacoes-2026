<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>City Driving 3D | Realistic Daylight Simulator</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            background-color: #87ceeb;
            color: #333;
            font-family: 'Segoe UI', system-ui, sans-serif;
            overflow: hidden;
            height: 100vh;
        }

        #canvas-3d {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        /* HUD - Painel de Informações Superior */
        .hud-city {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 10;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 15px 25px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .hud-city h1 {
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #1a202c;
            margin-bottom: 4px;
        }
        .hud-city p {
            font-size: 12px;
            color: #4a5568;
        }
        .hud-city span {
            color: #0066ff;
            font-weight: bold;
        }

        /* Velocímetro Esportivo */
        .speed-panel {
            position: absolute;
            bottom: 25px;
            right: 25px;
            z-index: 10;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(240, 244, 248, 0.98) 100%);
            border: 2px solid rgba(0, 102, 255, 0.6);
            width: 115px;
            height: 115px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .speed-panel .km {
            font-size: 28px;
            font-weight: bold;
            font-family: monospace;
            color: #1a202c;
        }
        .speed-panel .unit {
            font-size: 10px;
            color: #0066ff;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Caixa de Instruções */
        .instructions {
            position: absolute;
            bottom: 25px;
            left: 25px;
            z-index: 10;
            background: rgba(255, 255, 255, 0.85);
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 11px;
            color: #2d3748;
            border: 1px solid rgba(0,0,0,0.05);
            line-height: 1.6;
            backdrop-filter: blur(5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body>

    <div id="canvas-3d"></div>

    <div class="hud-city">
        <h1>Urban Coastline</h1>
        <p>Localização: <span>Metrópole Solar</span></p>
        <p>Ambiente: <span>Cidade Clara (Dia)</span></p>
    </div>

    <div class="speed-panel">
        <div class="km" id="km-display">0</div>
        <div class="unit">km/h</div>
    </div>

    <div class="instructions">
        <strong>COMANDOS URBANOS:</strong><br>
        • Pilotar: WASD ou Setas do Teclado<br>
        • Drift / Brecar: Barra de Espaço<br>
        • Recomeçar (Reset): R
    </div>

<script>
    // --- CONFIGURAÇÕES GLOBAIS ---
    let cena, camera, renderizador, carroGrupo, rodasModificadas = [];
    
    // Física do Carro
    let fisica = {
        x: 0, z: 0, y: 0.2,
        velocidade: 0,
        angulo: 0,
        maxVelocidade: 1.2,
        aceleracao: 0.02,
        friccao: 0.008,
        freio: 0.035,
        velCurva: 0.04
    };

    // Controle de Teclas
    let comandos = { frente: false, tras: false, esquerda: false, direita: false, freioMao: false };

    function iniciar() {
        const container = document.getElementById("canvas-3d");

        // Criar a cena com céu azul claro realista
        cena = new THREE.Scene();
        cena.background = new THREE.Color(0xa3d2e2);
        cena.fog = new THREE.FogExp2(0xa3d2e2, 0.008);

        // Câmera de perseguição (Chase Cam)
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Renderizador WebGL
        renderizador = new THREE.WebGLRenderer({ antialias: true });
        renderizador.setSize(window.innerWidth, window.innerHeight);
        renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderizador.shadowMap.enabled = true;
        renderizador.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderizador.domElement);

        // ILUMINAÇÃO DE DIA REALISTA
        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.65); // Muita luz difusa para simular o dia
        cena.add(luzAmbiente);

        // Luz do Sol Direcional (Gera sombras nítidas e realistas no asfalto)
        const luzSol = new THREE.DirectionalLight(0xfffaed, 1.2);
        luzSol.position.set(120, 200, 80);
        luzSol.castShadow = true;
        luzSol.shadow.mapSize.width = 2048;
        luzSol.shadow.mapSize.height = 2048;
        luzSol.shadow.camera.near = 0.5;
        luzSol.shadow.camera.far = 500;
        
        const d = 200;
        luzSol.shadow.camera.left = -d;
        luzSol.shadow.camera.right = d;
        luzSol.shadow.camera.top = d;
        luzSol.shadow.camera.bottom = -d;
        cena.add(luzSol);

        // GERAR A CIDADE INTERATIVA
        construirCidadeClara();

        // CONSTRUIR O SUPERCARRO
        criarCarroLuxo();

        // Ativar Inputs do Teclado
        configurarControles();

        // Iniciar Loop do Jogo
        loop();
    }

    // --- ENGENHARIA DA CIDADE PROCEDURAL CLARA ---
    function construirCidadeClara() {
        const tamanhoMapa = 400;

        // Asfalto cinza urbano realista sob a luz do sol
        const asfaltoGeo = new THREE.PlaneGeometry(tamanhoMapa, tamanhoMapa);
        const asfaltoMat = new THREE.MeshStandardMaterial({ 
            color: 0x3a3d40, 
            roughness: 0.5,
            metalness: 0.2
        });
        const soloAsfalto = new THREE.Mesh(asfaltoGeo, asfaltoMat);
        soloAsfalto.rotation.x = -Math.PI / 2;
        soloAsfalto.receiveShadow = true;
        cena.add(soloAsfalto);

        // Faixas amarelas e brancas das ruas e avenidas
        const gridRuas = new THREE.GridHelper(tamanhoMapa, 40, 0xffffff, 0xdcdcdc);
        gridRuas.position.y = 0.01;
        cena.add(gridRuas);

        // Paleta de Materiais para Prédios de Luxo Realistas (Concreto claro, vidro espelhado e cerâmica)
        const materiaisPredios = [
            new THREE.MeshStandardMaterial({ color: 0xdfdfdf, roughness: 0.3, metalness: 0.5, clearcoat: 0.5 }), // Comercial espelhado
            new THREE.MeshStandardMaterial({ color: 0xeaeaea, roughness: 0.6, metalness: 0.1 }), // Concreto arquitetônico claro
            new THREE.MeshStandardMaterial({ color: 0xd2c3b6, roughness: 0.5, metalness: 0.2 }), // Prédio moderno bege
            new THREE.MeshStandardMaterial({ color: 0xb5c9d6, roughness: 0.2, metalness: 0.7 })  // Torre de vidro azulada
        ];

        const espacamentoBlocos = 20;

        for (let x = -tamanhoMapa/2 + 10; x < tamanhoMapa/2; x += espacamentoBlocos) {
            for (let z = -tamanhoMapa/2 + 10; z < tamanhoMapa/2; z += espacamentoBlocos) {
                
                // Garantir o cruzamento livre das avenidas principais do grid
                if (Math.abs(x) < 8 || Math.abs(z) < 8 || x % 40 === 0 || z % 40 === 0) {
                    continue; 
                }

                // Altura estrutural realista para os blocos da cidade
                const alturaPredio = Math.random() * 40 + 12;
                const larguraPredio = Math.random() * 5 + 9;
                const profundidadePredio = Math.random() * 5 + 9;

                const predioGeo = new THREE.BoxGeometry(larguraPredio, alturaPredio, profundidadePredio);
                const matSelecionado = materiaisPredios[Math.floor(Math.random() * materiaisPredios.length)];
                
                const predioMesh = new THREE.Mesh(predioGeo, matSelecionado);
                predioMesh.position.set(x, alturaPredio / 2, z);
                predioMesh.castShadow = true;
                predioMesh.receiveShadow = true;
                cena.add(predioMesh);

                // Elementos decorativos nos topos (caixas de ventilação/helipontos)
                if (Math.random() < 0.4) {
                    const caixaTopo = new THREE.Mesh(
                        new THREE.BoxGeometry(larguraPredio*0.5, 1.5, profundidadePredio*0.5),
                        materiaisPredios[1]
                    );
                    caixaTopo.position.set(x, alturaPredio + 0.75, z);
                    caixaTopo.castShadow = true;
                    cena.add(caixaTopo);
                }
            }
        }
    }

    // --- CONSTRUÇÃO DO SUPERCARRO EM 3D ---
    function criarCarroLuxo() {
        carroGrupo = new THREE.Group();

        // Vermelho Candy Luxo com Verniz Espelhado de Fábrica
        const pinturaMat = new THREE.MeshStandardMaterial({
            color: 0xcc0000, 
            metalness: 0.8,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02
        });

        const vidroMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.1, metalness: 0.9 });
        const pneuMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1f, roughness: 0.7 });
        const rodaCromo = new THREE.MeshStandardMaterial({ color: 0xdcdcdc, metalness: 0.9, roughness: 0.15 });

        // Corpo do Carro Superesportivo
        const corpo = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.32, 2.85), pinturaMat);
        corpo.position.y = 0.25;
        corpo.castShadow = true;
        corpo.receiveShadow = true;
        carroGrupo.add(corpo);

        // Cockpit / Cabine aerodinâmica
        const cabine = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), vidroMat);
        cabine.position.set(0, 0.42, -0.05);
        cabine.scale.set(1.0, 0.7, 2.0);
        cabine.castShadow = true;
        carroGrupo.add(cabine);

        // Aerofólio Traseiro Esportivo fixo
        const asa = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 0.3), pinturaMat);
        asa.position.set(0, 0.52, 1.3);
        asa.castShadow = true;
        carroGrupo.add(asa);

        // Rodas de perfil baixo
        const pneuEixoGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.22, 24);
        pneuEixoGeo.rotateZ(Math.PI / 2);

        const posicoesEixos = [
            { x: 0.7, y: 0.18, z: -0.85 }, { x: -0.7, y: 0.18, z: -0.85 }, 
            { x: 0.7, y: 0.18, z: 0.85 },  { x: -0.7, y: 0.18, z: 0.85 }  
        ];

        posicoesEixos.forEach((eixo, i) => {
            const pneu = new THREE.Mesh(pneuEixoGeo, pneuMat);
            const calota = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.24, 12), rodaCromo);
            calota.rotateZ(Math.PI / 2);
            pneu.add(calota);

            pneu.position.set(eixo.x, eje = eixo.y, eixo.z);
            pneu.castShadow = true;
            carroGrupo.add(pneu);
            rodasModificadas.push(pneu);
        });

        cena.add(carroGrupo);
    }

    // --- CAPTAÇÃO DE ENTRADAS DO TECLADO ---
    function configurarControles() {
        window.addEventListener('keydown', (e) => {
            const k = e.key.toLowerCase();
            if (k === 'arrowup' || k === 'w') comandos.frente = true;
            if (k === 'arrowdown' || k === 's') comandos.tras = true;
            if (k === 'arrowleft' || k === 'a') comandos.esquerda = true;
            if (k === 'arrowright' || k === 'd') comandos.direita = true;
            if (e.key === ' ') comandos.freioMao = true;
            if (k === 'r') resetarCarroParaOrigem();
        });

        window.addEventListener('keyup', (e) => {
            const k = e.key.toLowerCase();
            if (k === 'arrowup' || k === 'w') comandos.frente = false;
            if (k === 'arrowdown' || k === 's') comandos.tras = false;
            if (k === 'arrowleft' || k === 'a') comandos.esquerda = false;
            if (k === 'arrowright' || k === 'd') comandos.direita = false;
            if (e.key === ' ') comandos.freioMao = false;
        });
    }

    function resetarCarroParaOrigem() {
        fisica.x = 0; fisica.z = 0; fisica.y = 0.2;
        fisica.velocidade = 0; fisica.angulo = 0;
        carroGrupo.rotation.set(0, 0, 0);
    }

    // --- LOOP DINÂMICO E ENGINE DE FÍSICA ---
    function loop() {
        requestAnimationFrame(loop);

        // 1. Aceleração e Física Inercial
        if (comandos.frente) {
            fisica.velocidade += fisica.aceleracao;
            if (fisica.velocidade > fisica.maxVelocidade) fisica.velocidade = fisica.maxVelocidade;
        } else if (comandos.tras) {
            fisica.velocidade -= fisica.aceleracao * 0.5;
            if (fisica.velocidade < -fisica.maxVelocidade * 0.4) fisica.velocidade = -fisica.maxVelocidade * 0.4;
        } else {
            if (fisica.velocidade > 0) fisica.velocidade -= fisica.friccao;
            if (fisica.velocidade < 0) fisica.velocidade += fisica.friccao;
            if (Math.abs(fisica.velocidade) < 0.005) fisica.velocidade = 0;
        }

        // Freio de mão dinâmico
        if (comandos.freioMao) {
            if (fisica.velocidade > 0) fisica.velocidade -= fisica.freio;
            if (fisica.velocidade < 0) fisica.velocidade += fisica.freio;
        }

        // Curvas proporcionais ao movimento
        if (Math.abs(fisica.velocidade) > 0.04) {
            const reInversor = fisica.velocidade > 0 ? 1 : -1;
            if (comandos.esquerda) fisica.angulo += fisica.velCurva * reInversor;
            if (comandos.direita) fisica.angulo -= fisica.velCurva * reInversor;
        }

        fisica.x -= Math.sin(fisica.angulo) * fisica.velocidade;
        fisica.z -= Math.cos(fisica.angulo) * fisica.velocidade;

        // Limites físicos invisíveis nas extremidades da cidade
        fisica.x = Math.max(-195, Math.min(195, fisica.x));
        fisica.z = Math.max(-195, Math.min(195, fisica.z));

        if (carroGrupo) {
            carroGrupo.position.x = fisica.x;
            carroGrupo.position.z = fisica.z;
            carroGrupo.rotation.y = fisica.angulo;

            // Girar os pneus visualmente de acordo com a velocidade
            rodasModificadas.forEach((rodaMesh, idx) => {
                rodaMesh.rotation.x -= fisica.velocidade * 1.6;
                
                // Rodas frontais esterçam ao comando de curva
                if (idx < 2) {
                    if (comandos.esquerda) rodaMesh.rotation.y = 0.32;
                    else if (comandos.direita) rodaMesh.rotation.y = -0.32;
                    else rodaMesh.rotation.y = 0;
                }
            });
        }

        // 2. Câmera Orbital Inteligente de Perseguição Flutuante
        const distAtras = 5.6;
        const altCam = 1.9;

        const camAlvoX = fisica.x + Math.sin(fisica.angulo) * distAtras;
        const camAlvoZ = fisica.z + Math.cos(fisica.angulo) * distAtras;

        // Suavização do movimento de câmera (Efeito mola/Inércia de lente)
        camera.position.x += (camAlvoX - camera.position.x) * 0.08;
        camera.position.z += (camAlvoZ - camera.position.z) * 0.08;
        camera.position.y += ((fisica.y + altCam) - camera.position.y) * 0.08;

        camera.lookAt(fisica.x, fisica.y + 0.3, fisica.z);

        // 3. Atualizar HUD de Velocidade Convertida
        const velocidadeConversao = Math.round(Math.abs(fisica.velocidade) * 240);
        document.getElementById("km-display").innerText = velocidadeConversao;

        renderizador.render(cena, camera);
    }

    // Auto-ajuste de tela dinâmica
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderizador.setSize(window.innerWidth, window.innerHeight);
    });

    window.onload = iniciar;
</script>
</body>
</html>