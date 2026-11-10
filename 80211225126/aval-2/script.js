<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logótipo 3D dos BTS com Three.js</title>
    <style>
        body {
            margin: 0;
            background-color: #050505;
            overflow: hidden;
            font-family: 'Segoe UI', sans-serif;
        }
        #info {
            position: absolute;
            top: 20px;
            width: 100%;
            text-align: center;
            color: #ffffff;
            font-weight: bold;
            font-size: 20px;
            letter-spacing: 5px;
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
            pointer-events: none;
        }
        .sub {
            font-size: 12px;
            letter-spacing: 2px;
            color: #888;
            margin-top: 5px;
        }
    </style>
    <!-- Importa a biblioteca Three.js e o controlo de câmara OrbitControls -->
    <script src="https://cloudflare.com"></script>
    <script src="https://jsdelivr.net"></script>
</head>
<body>

    <div id="info">
        BTS
        <div class="sub">Arrasta com o rato para rodar em 3D</div>
    </div>

    <script>
        // 1. Configuração Inicial do Cenário 3D
        const cena = new THREE.Scene();
        const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderizador = new THREE.WebGLRenderer({ antialias: true });
        
        renderizador.setSize(window.innerWidth, window.innerHeight);
        renderizador.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderizador.domElement);

        // Controles para mexer a câmara com o rato
        const controlos = new THREE.OrbitControls(camara, renderizador.domElement);
        controlos.enableDamping = true;

        // 2. Iluminação do Cenário (Essencial para o efeito 3D)
        const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.4);
        cena.add(luzAmbiente);

        const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.8);
        luzDirecional.position.set(5, 5, 5);
        cena.add(luzDirecional);

        const luzNeon = new THREE.PointLight(0xa855f7, 1.5, 100); // Brilho roxo (cor dos BTS)
        luzNeon.position.set(0, 0, 2);
        cena.add(luzNeon);

        // 3. Criar a Forma 3D (Trapezoide do Logótipo)
        // Criamos o desenho 2D de uma das portas do logótipo
        const formatoPorta = new THREE.Shape();
        formatoPorta.moveTo(0.1, 2.0);    // Canto superior interno
        formatoPorta.lineTo(0.9, 1.7);    // Canto superior externo
        formatoPorta.lineTo(0.6, -1.7);   // Canto inferior externo
        formatoPorta.lineTo(0.1, -2.0);   // Canto inferior interno
        formatoPorta.closePath();

        // Extrudimos o desenho 2D para ganhar profundidade e tornar-se 3D
        const definicoesExtrusao = {
            depth: 0.3,           // Espessura do 3D
            bevelEnabled: true,   // Bordas suavizadas
            bevelThickness: 0.05,
            bevelSize: 0.02,
            bevelSegments: 3
        };

        const geometriaPorta = new THREE.ExtrudeGeometry(formatoPorta, definicoesExtrusao);

        // Material com reflexos metálicos
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.7,
            roughness: 0.2
        });

        // Criamos um grupo para juntar as duas portas e controlá-las juntas
        const grupoLogo = new THREE.Group();

        // Porta Esquerda (Invertemos a escala no eixo X para espelhar)
        const portaEsquerda = new THREE.Mesh(geometriaPorta, material);
        portaEsquerda.scale.x = -1; 
        portaEsquerda.position.x = -0.1; // Pequeno espaço no meio
        grupoLogo.add(portaEsquerda);

        // Porta Direita
        const portaDireita = new THREE.Mesh(geometriaPorta, material);
        portaDireita.position.x = 0.1;
        grupoLogo.add(portaDireita);

        // Adiciona o logótipo completo à cena
        cena.add(grupoLogo);

        // Posiciona a câmara
        camara.position.z = 5;

        // 4. Loop de Animação
        function animar() {
            requestAnimationFrame(animar);

            // Rotação suave automática contínua
            grupoLogo.rotation.y += 0.005;

            // Atualiza os controlos do rato
            controlos.update();

            // Renderiza a cena
            renderizador.render(cena, camara);
        }

        // Inicia a animação
        animar();

        // Ajusta o tamanho se a janela do navegador mudar
        window.addEventListener('resize', () => {
            camara.aspect = window.innerWidth / window.innerHeight;
            camara.updateProjectionMatrix();
            renderizador.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>