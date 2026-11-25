(function () {
      "use strict";

      if (typeof THREE === "undefined") {
        document.body.innerHTML = "<div style='padding:24px;color:#fff;font-family:sans-serif;'>Erro ao carregar Three.js. Verifique sua conexão e recarregue a página.</div>";
        return;
      }

      // =========================================================================
      // 1. SINTETIZADOR DE ÁUDIO (WEB AUDIO API)
      // =========================================================================
      let audioCtx = null;
      let soundEnabled = true;

      function ensureAudioContext() {
        if (!soundEnabled) return;
        if (!audioCtx) {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          if (Ctx) audioCtx = new Ctx();
        }
        if (audioCtx && audioCtx.state === "suspended") {
          audioCtx.resume().catch(() => {});
        }
      }

      function playSfx(type) {
        if (!soundEnabled) return;
        ensureAudioContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        if (type === "ak") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(165, now);
          osc.frequency.exponentialRampToValueAtTime(42, now + 0.11);
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.12);
        } else if (type === "carbine") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(55, now + 0.09);
          gain.gain.setValueAtTime(0.19, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.10);
        } else if (type === "pistol") {
          osc.type = "square";
          osc.frequency.setValueAtTime(280, now);
          osc.frequency.exponentialRampToValueAtTime(68, now + 0.08);
          gain.gain.setValueAtTime(0.16, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.09);
        } else if (type === "fist") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(125, now);
          osc.frequency.exponentialRampToValueAtTime(45, now + 0.09);
          gain.gain.setValueAtTime(0.20, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.10);
        } else if (type === "hit") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(920, now);
          osc.frequency.exponentialRampToValueAtTime(520, now + 0.055);
          gain.gain.setValueAtTime(0.16, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.06);
        } else if (type === "reload") {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(620, now + 0.07);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.14);
        } else if (type === "loot") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.setValueAtTime(780, now + 0.07);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.16);
        } else if (type === "hurt") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(110, now);
          osc.frequency.linearRampToValueAtTime(65, now + 0.14);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.15);
        }
      }

      // =========================================================================
      // 2. SKINS, NÍVEIS, ARMAS E ESTADO DE SALA
      // =========================================================================
      const SKINS = {
        urbano: {
          key: "urbano",
          name: "Operador Urbano",
          shirt: 0x334155,
          vest: 0x0f172a,
          pants: 0x1e293b,
          accent: 0x157d87,
          visor: 0x38bdf8
        },
        artico: {
          key: "artico",
          name: "Fantasma Ártico",
          shirt: 0xe2e8f0,
          vest: 0x94a3b8,
          pants: 0xcbd5e1,
          accent: 0x334155,
          visor: 0x0ea5e9
        },
        sombra: {
          key: "sombra",
          name: "Sombra Noturna",
          shirt: 0x18181b,
          vest: 0x09090b,
          pants: 0x111827,
          accent: 0xdc2626,
          visor: 0xef4444
        },
        deserto: {
          key: "deserto",
          name: "Vanguarda Deserto",
          shirt: 0xb45309,
          vest: 0x78350f,
          pants: 0x92400e,
          accent: 0x451a03,
          visor: 0xfbbf24
        },
        ouro: {
          key: "ouro",
          name: "Comando Ouro",
          shirt: 0x1e293b,
          vest: 0xd97706,
          pants: 0x0f172a,
          accent: 0xf59e0b,
          visor: 0xfde047
        },
        ciber: {
          key: "ciber",
          name: "Sentinela Ciber",
          shirt: 0x1e1b4b,
          vest: 0x312e81,
          pants: 0x0f172a,
          accent: 0x06b6d4,
          visor: 0x22d3ee
        }
      };

      const BOT_SKIN_POOL = [
        { shirt: 0xdc2626, vest: 0x1e293b, pants: 0x0f172a, accent: 0x991b1b, visor: 0xfca5a5 },
        { shirt: 0xea580c, vest: 0x1c1917, pants: 0x292524, accent: 0x9a3412, visor: 0xfdba74 },
        { shirt: 0x7c3aed, vest: 0x1e1b4b, pants: 0x0f172a, accent: 0x5b21b6, visor: 0xc4b5fd },
        { shirt: 0x2563eb, vest: 0x0f172a, pants: 0x1e293b, accent: 0x1d4ed8, visor: 0x93c5fd },
        { shirt: 0x059669, vest: 0x064e3b, pants: 0x1e293b, accent: 0x047857, visor: 0x6ee7b7 },
        { shirt: 0xdb2777, vest: 0x1f2937, pants: 0x111827, accent: 0x9d174d, visor: 0xf9a8d4 }
      ];

      const MATCH_LEVELS = {
        recruta: {
          key: "recruta",
          label: "Recruta (Fácil)",
          desc: "Oponentes mais lentos, alcance de visão curto, menor dano por disparo e zona segura fechando bem devagar.",
          botSpeedMult: 0.76,
          botSightRange: 48,
          botFireInterval: 1.15,
          botAccuracy: 0.20,
          botDamage: 4,
          botHp: 85,
          zoneShrinkSpeed: 0.9,
          botDuelRate: 0.032
        },
        soldado: {
          key: "soldado",
          label: "Soldado (Médio)",
          desc: "Equilíbrio tático padrão: oponentes patrulham, buscam a zona segura e mantêm precisão intermediária.",
          botSpeedMult: 1.0,
          botSightRange: 64,
          botFireInterval: 0.72,
          botAccuracy: 0.35,
          botDamage: 7,
          botHp: 100,
          zoneShrinkSpeed: 1.5,
          botDuelRate: 0.045
        },
        veterano: {
          key: "veterano",
          label: "Veterano (Difícil)",
          desc: "Oponentes mais rápidos, maior alcance visual, boa precisão e zona segura fechando mais rápido.",
          botSpeedMult: 1.24,
          botSightRange: 80,
          botFireInterval: 0.48,
          botAccuracy: 0.54,
          botDamage: 10,
          botHp: 115,
          zoneShrinkSpeed: 2.2,
          botDuelRate: 0.06
        },
        elite: {
          key: "elite",
          label: "Elite (Extremo)",
          desc: "Reflexos rápidos, alta precisão a longa distância, dano elevado e zona segura extremamente agressiva.",
          botSpeedMult: 1.45,
          botSightRange: 98,
          botFireInterval: 0.32,
          botAccuracy: 0.72,
          botDamage: 14,
          botHp: 130,
          zoneShrinkSpeed: 3.0,
          botDuelRate: 0.075
        }
      };

      const WEAPON_DEFS = {
        ak: {
          key: "ak",
          title: "[1] FUZIL AK-47",
          damage: 34,
          fireRate: 0.13,
          range: 175,
          reloadTime: 1.45,
          auto: true,
          recoilKick: 0.040,
          tracerColor: 0xfef08a
        },
        carbine: {
          key: "carbine",
          title: "[2] CARABINA",
          damage: 26,
          fireRate: 0.10,
          range: 150,
          reloadTime: 1.25,
          auto: true,
          recoilKick: 0.028,
          tracerColor: 0x38bdf8
        },
        pistol: {
          key: "pistol",
          title: "[3] PISTOLA",
          damage: 24,
          fireRate: 0.22,
          range: 95,
          reloadTime: 1.0,
          auto: false,
          recoilKick: 0.034,
          tracerColor: 0xfacc15
        },
        fist: {
          key: "fist",
          title: "[4] PUNHO",
          damage: 55,
          fireRate: 0.42,
          range: 3.6,
          reloadTime: 0,
          auto: false,
          recoilKick: 0.0,
          tracerColor: 0xffffff
        }
      };

      let selectedSkinKey = "urbano";
      let selectedLevel = "soldado";
      let selectedOpponentCount = 98;
      let selectedArenaSize = 720;

      // Sala com código: sem bots quando criada ou acessada por código de convite
      let currentRoomCode = "";
      let isCodeRoomMode = false;
      const localClientId = "player_" + Math.random().toString(36).slice(2, 10);
      let roomChannel = null;
      let remotePlayersMap = new Map();
      let remotePlayerMeshes = new Map();
      let lastSyncSentAt = 0;

      // =========================================================================
      // 3. RENDERIZADOR WEBGL ÚNICO + DUAS CENAS SEPARADAS
      // =========================================================================
      const container = document.getElementById("gameCanvasContainer");
      const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      const skinToneMat = new THREE.MeshStandardMaterial({ color: 0xe0ac69, roughness: 0.65 });
      const bootDarkMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.7 });
      const gunMetalDark = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.82 });
      const gunMetalGray = new THREE.MeshStandardMaterial({ color: 0x52525b, roughness: 0.3, metalness: 0.85 });
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.65 });

      // =========================================================================
      // 4. PERSONAGEM 3D SIMÉTRICO
      // =========================================================================
      function createTacticalCharacterMesh(skinColors, combatPose) {
        const root = new THREE.Group();
        root.rotation.set(0, 0, 0);

        const shirtMat = new THREE.MeshStandardMaterial({ color: skinColors.shirt, roughness: 0.55 });
        const vestMat = new THREE.MeshStandardMaterial({ color: skinColors.vest, roughness: 0.5, metalness: 0.2 });
        const pantsMat = new THREE.MeshStandardMaterial({ color: skinColors.pants, roughness: 0.72 });
        const accentMat = new THREE.MeshStandardMaterial({ color: skinColors.accent, roughness: 0.45, metalness: 0.3 });
        const visorMat = new THREE.MeshStandardMaterial({
          color: skinColors.visor,
          emissive: skinColors.visor,
          emissiveIntensity: 0.55,
          roughness: 0.2
        });

        const bootGeo = new THREE.BoxGeometry(0.24, 0.18, 0.32);
        const leftBoot = new THREE.Mesh(bootGeo, bootDarkMat);
        leftBoot.position.set(-0.17, 0.09, 0.03);
        leftBoot.castShadow = true;

        const rightBoot = new THREE.Mesh(bootGeo, bootDarkMat);
        rightBoot.position.set(0.17, 0.09, 0.03);
        rightBoot.castShadow = true;

        const legGeo = new THREE.BoxGeometry(0.22, 0.66, 0.24);
        const leftLeg = new THREE.Mesh(legGeo, pantsMat);
        leftLeg.position.set(-0.17, 0.51, 0);
        leftLeg.castShadow = true;

        const rightLeg = new THREE.Mesh(legGeo, pantsMat);
        rightLeg.position.set(0.17, 0.51, 0);
        rightLeg.castShadow = true;

        const kneeGeo = new THREE.BoxGeometry(0.18, 0.14, 0.05);
        const leftKnee = new THREE.Mesh(kneeGeo, accentMat);
        leftKnee.position.set(-0.17, 0.50, 0.13);

        const rightKnee = new THREE.Mesh(kneeGeo, accentMat);
        rightKnee.position.set(0.17, 0.50, 0.13);

        const belt = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.10, 0.36), bootDarkMat);
        belt.position.set(0, 0.87, 0);

        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.68, 0.32), shirtMat);
        torso.position.set(0, 1.25, 0);
        torso.castShadow = true;

        const vest = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.58, 0.38), vestMat);
        vest.position.set(0, 1.26, 0);
        vest.castShadow = true;

        const shoulderGeo = new THREE.BoxGeometry(0.22, 0.16, 0.30);
        const leftShoulder = new THREE.Mesh(shoulderGeo, accentMat);
        leftShoulder.position.set(-0.43, 1.51, 0);
        leftShoulder.castShadow = true;

        const rightShoulder = new THREE.Mesh(shoulderGeo, accentMat);
        rightShoulder.position.set(0.43, 1.51, 0);
        rightShoulder.castShadow = true;

        const armGeo = new THREE.BoxGeometry(0.19, 0.56, 0.20);
        const gloveGeo = new THREE.BoxGeometry(0.20, 0.18, 0.21);

        const leftArm = new THREE.Mesh(armGeo, shirtMat);
        const rightArm = new THREE.Mesh(armGeo, shirtMat);
        const leftGlove = new THREE.Mesh(gloveGeo, accentMat);
        const rightGlove = new THREE.Mesh(gloveGeo, accentMat);

        if (combatPose) {
          leftArm.position.set(-0.42, 1.28, 0.16);
          leftArm.rotation.set(-Math.PI / 2.4, 0, 0);
          leftGlove.position.set(-0.24, 1.24, 0.42);

          rightArm.position.set(0.42, 1.28, 0.14);
          rightArm.rotation.set(-Math.PI / 2.2, 0, 0);
          rightGlove.position.set(0.20, 1.24, 0.36);
        } else {
          leftArm.position.set(-0.43, 1.16, 0);
          leftArm.rotation.set(0, 0, 0);
          leftGlove.position.set(-0.43, 0.80, 0);

          rightArm.position.set(0.43, 1.16, 0);
          rightArm.rotation.set(0, 0, 0);
          rightGlove.position.set(0.43, 0.80, 0);
        }

        leftArm.castShadow = true;
        rightArm.castShadow = true;

        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.12, 12), skinToneMat);
        neck.position.set(0, 1.63, 0);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), skinToneMat);
        head.position.set(0, 1.86, 0);
        head.castShadow = true;

        const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.22, 0.46), accentMat);
        helmet.position.set(0, 2.00, 0);
        helmet.castShadow = true;

        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.04), visorMat);
        visor.position.set(0, 1.88, 0.22);

        root.add(
          leftBoot, rightBoot, leftLeg, rightLeg, leftKnee, rightKnee,
          belt, torso, vest, leftShoulder, rightShoulder,
          leftArm, rightArm, leftGlove, rightGlove,
          neck, head, helmet, visor
        );

        let muzzle = null;
        if (combatPose) {
          const rifle = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 0.64), gunMetalDark);
          rifle.position.set(0.0, 1.24, 0.48);
          root.add(rifle);

          muzzle = new THREE.Mesh(
            new THREE.SphereGeometry(0.11, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xfef08a })
          );
          muzzle.position.set(0.0, 1.25, 0.84);
          muzzle.visible = false;
          root.add(muzzle);
        }

        return {
          root,
          leftLeg,
          rightLeg,
          materials: { shirtMat, vestMat, pantsMat, accentMat, visorMat },
          muzzle
        };
      }

      // =========================================================================
      // 5. CENA 1: HANGAR TÁTICO DO LOBBY
      // =========================================================================
      const lobbyScene = new THREE.Scene();
      lobbyScene.background = new THREE.Color(0x070d19);
      lobbyScene.fog = new THREE.FogExp2(0x070d19, 0.025);

      const lobbyCamera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);

      const lobbyAmbient = new THREE.HemisphereLight(0xbae6fd, 0x0f172a, 0.9);
      lobbyScene.add(lobbyAmbient);

      const lobbyKeyLight = new THREE.SpotLight(0xffffff, 1.65, 25, Math.PI / 4, 0.45, 1);
      lobbyKeyLight.position.set(3.2, 5.5, 4.5);
      lobbyKeyLight.target.position.set(0, 1.1, 0);
      lobbyKeyLight.castShadow = true;
      lobbyScene.add(lobbyKeyLight, lobbyKeyLight.target);

      const lobbyRimLight = new THREE.PointLight(0x22d3ee, 1.4, 14);
      lobbyRimLight.position.set(-2.6, 2.8, -2.5);
      lobbyScene.add(lobbyRimLight);

      function createHangarFloorTexture() {
        const c = document.createElement("canvas");
        c.width = 256;
        c.height = 256;
        const g = c.getContext("2d");
        g.fillStyle = "#0b1322";
        g.fillRect(0, 0, 256, 256);
        g.strokeStyle = "rgba(34, 211, 238, 0.14)";
        g.lineWidth = 2;
        g.strokeRect(1, 1, 254, 254);
        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(20, 20);
        return tex;
      }

      const hangarFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(36, 36),
        new THREE.MeshStandardMaterial({ map: createHangarFloorTexture(), roughness: 0.45, metalness: 0.4 })
      );
      hangarFloor.rotation.x = -Math.PI / 2;
      hangarFloor.receiveShadow = true;
      lobbyScene.add(hangarFloor);

      const hangarBackWall = new THREE.Mesh(
        new THREE.BoxGeometry(24, 9, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.35 })
      );
      hangarBackWall.position.set(0, 4.5, -4.5);
      lobbyScene.add(hangarBackWall);

      const hangarStripe = new THREE.Mesh(
        new THREE.BoxGeometry(20, 0.12, 0.55),
        new THREE.MeshBasicMaterial({ color: 0x157d87 })
      );
      hangarStripe.position.set(0, 2.6, -4.48);
      lobbyScene.add(hangarStripe);

      const pedestalBase = new THREE.Mesh(
        new THREE.CylinderGeometry(1.18, 1.32, 0.22, 48),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.7 })
      );
      pedestalBase.position.set(0, 0.11, 0);
      pedestalBase.receiveShadow = true;
      lobbyScene.add(pedestalBase);

      const pedestalRingOuter = new THREE.Mesh(
        new THREE.RingGeometry(1.06, 1.16, 48),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide })
      );
      pedestalRingOuter.rotation.x = -Math.PI / 2;
      pedestalRingOuter.position.set(0, 0.225, 0);
      lobbyScene.add(pedestalRingOuter);

      const pedestalRingInner = new THREE.Mesh(
        new THREE.RingGeometry(0.72, 0.78, 48),
        new THREE.MeshBasicMaterial({ color: 0x157d87, side: THREE.DoubleSide })
      );
      pedestalRingInner.rotation.x = -Math.PI / 2;
      pedestalRingInner.position.set(0, 0.225, 0);
      lobbyScene.add(pedestalRingInner);

      const lobbyCharacterRig = createTacticalCharacterMesh(SKINS[selectedSkinKey], false);
      lobbyCharacterRig.root.position.set(0, 0.22, 0);
      lobbyScene.add(lobbyCharacterRig.root);

      let lobbyCharacterYaw = 0.28;
      let lobbyDragActive = false;
      let lobbyDragLastX = 0;

      function updateLobbyCameraLayout() {
        lobbyCamera.aspect = window.innerWidth / window.innerHeight;
        lobbyCamera.updateProjectionMatrix();
        if (window.innerWidth <= 820) {
          lobbyCamera.position.set(0, 1.55, 4.4);
          lobbyCamera.lookAt(0, 1.15, 0);
        } else {
          lobbyCamera.position.set(0.85, 1.48, 4.15);
          lobbyCamera.lookAt(0.78, 1.14, 0);
        }
      }
      updateLobbyCameraLayout();

      // =========================================================================
      // 6. CENA 2: ARENA 3D COM CASAS, ESCADAS DE TELHADO E 2 KITS MÉDICOS
      // =========================================================================
      let arenaSize = selectedArenaSize;
      let arenaHalf = arenaSize / 2;

      const arenaScene = new THREE.Scene();
      arenaScene.background = new THREE.Color(0x6ba4d9);
      arenaScene.fog = new THREE.FogExp2(0x7fb3e0, 0.0020);

      const arenaCamera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.15, 700);
      arenaCamera.rotation.order = "YXZ";

      const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x365314, 1.05);
      arenaScene.add(hemiLight);

      const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.35);
      sunLight.position.set(140, 220, 110);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.set(2048, 2048);
      sunLight.shadow.camera.near = 20;
      sunLight.shadow.camera.far = 520;
      const shadowExtent = 165;
      sunLight.shadow.camera.left = -shadowExtent;
      sunLight.shadow.camera.right = shadowExtent;
      sunLight.shadow.camera.top = shadowExtent;
      sunLight.shadow.camera.bottom = -shadowExtent;
      arenaScene.add(sunLight);

      function createGrassTexture() {
        const c = document.createElement("canvas");
        c.width = 512;
        c.height = 512;
        const g = c.getContext("2d");
        g.fillStyle = "#3b5e2b";
        g.fillRect(0, 0, 512, 512);

        for (let i = 0; i < 4500; i++) {
          const x = (i * 73) % 512;
          const y = (i * 137) % 512;
          g.fillStyle = i % 3 === 0 ? "#487035" : (i % 3 === 1 ? "#2f4d21" : "#517a3c");
          g.fillRect(x, y, 3, 6);
        }

        const tex = new THREE.CanvasTexture(c);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(72, 72);
        return tex;
      }

      function createCrateTexture() {
        const c = document.createElement("canvas");
        c.width = 128;
        c.height = 128;
        const g = c.getContext("2d");
        g.fillStyle = "#854d0e";
        g.fillRect(0, 0, 128, 128);
        g.fillStyle = "#a16207";
        g.fillRect(10, 10, 108, 108);
        g.strokeStyle = "#facc15";
        g.lineWidth = 6;
        g.strokeRect(6, 6, 116, 116);
        g.beginPath();
        g.moveTo(8, 8);
        g.lineTo(120, 120);
        g.moveTo(120, 8);
        g.lineTo(8, 120);
        g.stroke();
        return new THREE.CanvasTexture(c);
      }

      function createGreenMedkitTexture() {
        const c = document.createElement("canvas");
        c.width = 256;
        c.height = 192;
        const g = c.getContext("2d");
        g.fillStyle = "#16a34a";
        g.fillRect(0, 0, 256, 192);
        g.strokeStyle = "#86efac";
        g.lineWidth = 8;
        g.strokeRect(6, 6, 244, 180);

        g.fillStyle = "#ffffff";
        g.fillRect(114, 48, 28, 96);
        g.fillRect(80, 82, 96, 28);
        return new THREE.CanvasTexture(c);
      }

      const grassTexture = createGrassTexture();
      const groundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(arenaSize, arenaSize),
        new THREE.MeshStandardMaterial({ map: grassTexture, roughness: 0.9, metalness: 0.05 })
      );
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.receiveShadow = true;
      arenaScene.add(groundMesh);

      const roadMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
      const roadNS = new THREE.Mesh(new THREE.PlaneGeometry(14, arenaSize - 12), roadMat);
      roadNS.rotation.x = -Math.PI / 2;
      roadNS.position.y = 0.03;
      roadNS.receiveShadow = true;
      arenaScene.add(roadNS);

      const roadEW = new THREE.Mesh(new THREE.PlaneGeometry(arenaSize - 12, 14), roadMat);
      roadEW.rotation.x = -Math.PI / 2;
      roadEW.position.y = 0.04;
      roadEW.receiveShadow = true;
      arenaScene.add(roadEW);

      const safeZone = {
        x: 0,
        z: 0,
        radius: 475,
        targetRadius: 34,
        shrinkSpeed: 1.5,
        damageTick: 0
      };

      const safeZoneMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 95, 64, 1, true),
        new THREE.MeshBasicMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.22,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      safeZoneMesh.position.set(0, 47.5, 0);
      safeZoneMesh.scale.set(safeZone.radius, 1, safeZone.radius);
      arenaScene.add(safeZoneMesh);

      const worldGroup = new THREE.Group();
      arenaScene.add(worldGroup);

      const botGroupRoot = new THREE.Group();
      arenaScene.add(botGroupRoot);

      let wallColliders = [];
      let circleObstacles = [];
      let buildingRects = [];
      let roofPlazas = [];
      let lootCrates = [];
      let medkits = [];

      const crateMat = new THREE.MeshStandardMaterial({ map: createCrateTexture(), roughness: 0.55, metalness: 0.15 });
      const crateGeo = new THREE.BoxGeometry(1.15, 0.85, 1.15);

      const medkitMat = new THREE.MeshStandardMaterial({
        map: createGreenMedkitTexture(),
        emissive: 0x22c55e,
        emissiveIntensity: 0.65,
        roughness: 0.35
      });

      const housePalettes = [
        { wall: 0xd6d3d1, trim: 0x57534e, roof: 0x334155, stair: 0x78350f, pitched: false },
        { wall: 0xeab308, trim: 0x92400e, roof: 0xc2410c, stair: 0x78350f, pitched: true },
        { wall: 0x0284c7, trim: 0x0f172a, roof: 0x1e293b, stair: 0x475569, pitched: false },
        { wall: 0xdc2626, trim: 0x7f1d1d, roof: 0x991b1b, stair: 0x78350f, pitched: true },
        { wall: 0x65a30d, trim: 0x365314, roof: 0x3f6212, stair: 0x78350f, pitched: false },
        { wall: 0x9ca3af, trim: 0x374151, roof: 0x4b5563, stair: 0x475569, pitched: false },
        { wall: 0x2563eb, trim: 0x1e3a8a, roof: 0xb45309, stair: 0x78350f, pitched: true },
        { wall: 0xe7d5b7, trim: 0x78350f, roof: 0x334155, stair: 0x78350f, pitched: false }
      ];

      const floorConcreteMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.85 });
      const railMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45, metalness: 0.65 });
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 });
      const foliageMatA = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.85 });
      const foliageMatB = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 });
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.88 });

      function addWallBox(cx, cz, w, d, h, mat) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.position.set(cx, h / 2, cz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        worldGroup.add(mesh);
        wallColliders.push({
          minX: cx - w / 2,
          maxX: cx + w / 2,
          minZ: cz - d / 2,
          maxZ: cz + d / 2,
          height: h
        });
      }

      function spawnGreenMedkit(x, y, z) {
        const group = new THREE.Group();
        const box = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.78, 0.85), medkitMat);
        box.position.y = 0.39;
        box.castShadow = true;
        group.add(box);

        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.24), railMat);
        handle.position.y = 0.84;
        group.add(handle);

        const glowRing = new THREE.Mesh(
          new THREE.RingGeometry(0.68, 0.92, 24),
          new THREE.MeshBasicMaterial({ color: 0x4ade80, side: THREE.DoubleSide })
        );
        glowRing.rotation.x = -Math.PI / 2;
        glowRing.position.y = 0.03;
        group.add(glowRing);

        group.position.set(x, y, z);
        worldGroup.add(group);

        medkits.push({
          x,
          y,
          z,
          group,
          active: true,
          respawnTimer: 0
        });
      }

      function addBattleHouseWithRoofStairs(cx, cz, w, d, h, paletteIndex, hasMedkit) {
        const pal = housePalettes[paletteIndex % housePalettes.length];
        const wallMat = new THREE.MeshStandardMaterial({ color: pal.wall, roughness: 0.76 });
        const trimMat = new THREE.MeshStandardMaterial({ color: pal.trim, roughness: 0.65 });
        const roofMat = new THREE.MeshStandardMaterial({ color: pal.roof, roughness: 0.72 });
        const stairMat = new THREE.MeshStandardMaterial({ color: pal.stair, roughness: 0.72 });

        const t = 0.55;
        const doorW = 3.4;

        const floorSlab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, d), floorConcreteMat);
        floorSlab.position.set(cx, 0.08, cz);
        floorSlab.receiveShadow = true;
        worldGroup.add(floorSlab);

        const segW = Math.max(1.2, (w - doorW) / 2);
        const segD = Math.max(1.2, (d - doorW) / 2);

        addWallBox(cx - (doorW / 2 + segW / 2), cz - d / 2 + t / 2, segW, t, h, wallMat);
        addWallBox(cx + (doorW / 2 + segW / 2), cz - d / 2 + t / 2, segW, t, h, wallMat);
        addWallBox(cx - (doorW / 2 + segW / 2), cz + d / 2 - t / 2, segW, t, h, wallMat);
        addWallBox(cx + (doorW / 2 + segW / 2), cz + d / 2 - t / 2, segW, t, h, wallMat);
        addWallBox(cx - w / 2 + t / 2, cz - (doorW / 2 + segD / 2), t, segD, h, wallMat);
        addWallBox(cx - w / 2 + t / 2, cz + (doorW / 2 + segD / 2), t, segD, h, wallMat);
        addWallBox(cx + w / 2 - t / 2, cz - (doorW / 2 + segD / 2), t, segD, h, wallMat);
        addWallBox(cx + w / 2 - t / 2, cz + (doorW / 2 + segD / 2), t, segD, h, wallMat);

        const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(w + 0.9, 0.42, d + 0.9), roofMat);
        roofSlab.position.set(cx, h + 0.21, cz);
        roofSlab.castShadow = true;
        roofSlab.receiveShadow = true;
        worldGroup.add(roofSlab);

        const parapetH = 0.72;
        const parapetFront = new THREE.Mesh(new THREE.BoxGeometry(w + 0.9, parapetH, 0.22), trimMat);
        parapetFront.position.set(cx, h + 0.42 + parapetH / 2, cz + d / 2 + 0.34);
        worldGroup.add(parapetFront);

        const parapetLeft = new THREE.Mesh(new THREE.BoxGeometry(0.22, parapetH, d + 0.9), trimMat);
        parapetLeft.position.set(cx - w / 2 - 0.34, h + 0.42 + parapetH / 2, cz);
        worldGroup.add(parapetLeft);

        const parapetRight = new THREE.Mesh(new THREE.BoxGeometry(0.22, parapetH, d + 0.9), trimMat);
        parapetRight.position.set(cx + w / 2 + 0.34, h + 0.42 + parapetH / 2, cz);
        worldGroup.add(parapetRight);

        if (pal.pitched) {
          const ridge = new THREE.Mesh(new THREE.BoxGeometry(w + 1.1, 1.35, d * 0.45), roofMat);
          ridge.position.set(cx, h + 0.95, cz - d * 0.16);
          ridge.castShadow = true;
          worldGroup.add(ridge);
        }

        const stepCount = 12;
        const stairX = cx + w / 2 + 1.35;
        const stairStartZ = cz + d / 2 + 2.2;
        const stairEndZ = cz + d / 2 - 1.2;
        const topY = h + 0.42;

        for (let s = 0; s < stepCount; s++) {
          const frac = (s + 0.5) / stepCount;
          const sy = frac * topY;
          const sz = stairStartZ + (stairEndZ - stairStartZ) * frac;
          const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.24, 0.52), stairMat);
          stepMesh.position.set(stairX, sy, sz);
          stepMesh.castShadow = true;
          stepMesh.receiveShadow = true;
          worldGroup.add(stepMesh);
        }

        const railBeam = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 4.4), railMat);
        railBeam.position.set(stairX + 0.72, topY * 0.5 + 0.75, (stairStartZ + stairEndZ) * 0.5);
        railBeam.rotation.x = Math.atan2(topY, Math.abs(stairStartZ - stairEndZ));
        worldGroup.add(railBeam);

        roofPlazas.push({
          cx,
          cz,
          minX: cx - (w + 0.9) / 2,
          maxX: cx + (w + 0.9) / 2,
          minZ: cz - (d + 0.9) / 2,
          maxZ: cz + (d + 0.9) / 2,
          topY,
          stairMinX: stairX - 0.9,
          stairMaxX: stairX + 0.9,
          stairZLow: Math.min(stairStartZ, stairEndZ) - 0.6,
          stairZHigh: Math.max(stairStartZ, stairEndZ) + 0.6
        });

        buildingRects.push({
          minX: cx - w / 2 - 2.2,
          maxX: cx + w / 2 + 2.5,
          minZ: cz - d / 2 - 2.2,
          maxZ: cz + d / 2 + 2.8,
          cx,
          cz,
          w,
          d
        });

        spawnLootCrate(cx - w * 0.22, cz - d * 0.22, false);
        if (hasMedkit) {
          spawnGreenMedkit(cx, topY + 0.04, cz);
        } else {
          spawnLootCrate(cx + w * 0.22, cz + d * 0.22, false);
        }
      }

      function spawnLootCrate(x, z, fromElimination) {
        const mesh = new THREE.Mesh(crateGeo, crateMat);
        mesh.position.set(x, 0.425, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        worldGroup.add(mesh);

        lootCrates.push({
          x,
          z,
          mesh,
          akAmmo: fromElimination ? 40 : 30,
          carbineAmmo: fromElimination ? 30 : 25,
          pistolAmmo: fromElimination ? 25 : 20,
          heal: fromElimination ? 35 : 25
        });
      }

      function buildDynamicArena() {
        arenaSize = selectedArenaSize;
        arenaHalf = arenaSize / 2;

        groundMesh.geometry.dispose();
        groundMesh.geometry = new THREE.PlaneGeometry(arenaSize, arenaSize);
        const rep = Math.max(24, Math.round(arenaSize / 10));
        grassTexture.repeat.set(rep, rep);

        roadNS.geometry.dispose();
        roadNS.geometry = new THREE.PlaneGeometry(14, arenaSize - 12);

        roadEW.geometry.dispose();
        roadEW.geometry = new THREE.PlaneGeometry(arenaSize - 12, 14);

        while (worldGroup.children.length > 0) {
          worldGroup.remove(worldGroup.children[0]);
        }
        wallColliders = [];
        circleObstacles = [];
        buildingRects = [];
        roofPlazas = [];
        lootCrates = [];
        medkits = [];

        const perimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
        addWallBox(0, -arenaHalf + 1, arenaSize, 2, 10, perimMat);
        addWallBox(0, arenaHalf - 1, arenaSize, 2, 10, perimMat);
        addWallBox(-arenaHalf + 1, 0, 2, arenaSize, 10, perimMat);
        addWallBox(arenaHalf - 1, 0, 2, arenaSize, 10, perimMat);

        const scaleFactor = arenaSize / 720;

        const battleHouses = [
          [-26, -24, 16, 14, 4.6, 0, false],
          [26, -24, 16, 14, 4.6, 1, true],
          [-26, 26, 16, 14, 4.6, 2, true],
          [26, 26, 16, 14, 4.6, 3, false],

          [-98, -92, 20, 16, 5.0, 4, false],
          [-66, -96, 16, 14, 4.6, 5, false],
          [98, -92, 20, 16, 5.0, 6, false],
          [66, -96, 16, 14, 4.6, 7, false],

          [-98, 92, 20, 16, 5.0, 1, false],
          [-66, 96, 16, 14, 4.6, 0, false],
          [98, 92, 20, 16, 5.0, 3, false],
          [66, 96, 16, 14, 4.6, 2, false],

          [0, -165, 22, 18, 5.2, 6, false],
          [0, 165, 22, 18, 5.2, 4, false],
          [-170, 0, 20, 18, 5.2, 7, false],
          [170, 0, 20, 18, 5.2, 5, false],

          [-220, -210, 20, 16, 5.0, 2, false],
          [220, -210, 20, 16, 5.0, 0, false],
          [-220, 210, 20, 16, 5.0, 1, false],
          [220, 210, 20, 16, 5.0, 3, false]
        ];

        const maxCoord = arenaHalf - 28;
        for (const [bx, bz, bw, bd, bh, palIdx, hasKit] of battleHouses) {
          const sx = Math.max(-maxCoord, Math.min(maxCoord, bx * scaleFactor));
          const sz = Math.max(-maxCoord, Math.min(maxCoord, bz * scaleFactor));
          addBattleHouseWithRoofStairs(sx, sz, bw, bd, bh, palIdx, hasKit);
        }

        const containerRed = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.55, metalness: 0.3 });
        const containerBlue = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.55, metalness: 0.3 });
        const containerTeal = new THREE.MeshStandardMaterial({ color: 0x157d87, roughness: 0.55, metalness: 0.3 });
        const containers = [
          [-44, -14, false, containerRed],
          [-44, -8, false, containerBlue],
          [44, 10, false, containerTeal],
          [44, 16, false, containerRed],
          [-86, 38, true, containerBlue],
          [86, -38, true, containerRed],
          [-38, 130, false, containerTeal],
          [38, -130, false, containerBlue],
          [-148, -75, true, containerRed],
          [148, 75, true, containerTeal]
        ];
        for (const [cx, cz, rotated, cMat] of containers) {
          const sx = Math.max(-maxCoord, Math.min(maxCoord, cx * scaleFactor));
          const sz = Math.max(-maxCoord, Math.min(maxCoord, cz * scaleFactor));
          addWallBox(sx, sz, rotated ? 3.2 : 8.2, rotated ? 8.2 : 3.2, 3.1, cMat);
        }

        let seed = 1337 + Math.round(arenaSize);
        const nextRand = () => {
          seed = (seed * 16807) % 2147483647;
          return (seed - 1) / 2147483646;
        };

        const trunkGeo = new THREE.CylinderGeometry(0.35, 0.52, 4.2, 8);
        const crownBottomGeo = new THREE.ConeGeometry(2.7, 4.4, 8);
        const crownTopGeo = new THREE.ConeGeometry(2.0, 3.6, 8);
        const treeCount = Math.max(70, Math.round(250 * scaleFactor * scaleFactor));

        for (let i = 0; i < treeCount; i++) {
          const tx = (nextRand() - 0.5) * (arenaSize - 44);
          const tz = (nextRand() - 0.5) * (arenaSize - 44);

          if (Math.abs(tx) < 12 || Math.abs(tz) < 12) continue;
          if (Math.hypot(tx, tz - 18) < 14) continue;
          let insideBuilding = false;
          for (const b of buildingRects) {
            if (tx >= b.minX - 2 && tx <= b.maxX + 2 && tz >= b.minZ - 2 && tz <= b.maxZ + 2) {
              insideBuilding = true;
              break;
            }
          }
          if (insideBuilding) continue;

          const tree = new THREE.Group();
          const trunk = new THREE.Mesh(trunkGeo, trunkMat);
          trunk.position.y = 2.1;
          trunk.castShadow = true;
          tree.add(trunk);

          const c1 = new THREE.Mesh(crownBottomGeo, i % 2 === 0 ? foliageMatA : foliageMatB);
          c1.position.y = 5.0;
          c1.castShadow = true;
          tree.add(c1);

          const c2 = new THREE.Mesh(crownTopGeo, foliageMatB);
          c2.position.y = 7.2;
          c2.castShadow = true;
          tree.add(c2);

          tree.position.set(tx, 0, tz);
          worldGroup.add(tree);
          circleObstacles.push({ x: tx, z: tz, r: 0.72 });
        }

        const rockGeo = new THREE.DodecahedronGeometry(1.6, 0);
        const rockCount = Math.max(35, Math.round(115 * scaleFactor * scaleFactor));

        for (let i = 0; i < rockCount; i++) {
          const rx = (nextRand() - 0.5) * (arenaSize - 50);
          const rz = (nextRand() - 0.5) * (arenaSize - 50);
          if (Math.abs(rx) < 12 || Math.abs(rz) < 12) continue;
          if (Math.hypot(rx, rz - 18) < 14) continue;

          const scale = 0.8 + nextRand() * 1.1;
          const rock = new THREE.Mesh(rockGeo, rockMat);
          rock.scale.set(scale * 1.2, scale * 0.85, scale);
          rock.position.set(rx, 0.9 * scale, rz);
          rock.rotation.set(nextRand() * 2, nextRand() * 2, 0);
          rock.castShadow = true;
          rock.receiveShadow = true;
          worldGroup.add(rock);
          circleObstacles.push({ x: rx, z: rz, r: 1.45 * scale });
        }
      }

      // =========================================================================
      // 7. VIEWMODELS EM PRIMEIRA PESSOA
      // =========================================================================
      const viewmodelRoot = new THREE.Group();
      arenaCamera.add(viewmodelRoot);
      arenaScene.add(arenaCamera);

      const fpSleeveMat = new THREE.MeshStandardMaterial({ color: SKINS[selectedSkinKey].shirt, roughness: 0.65 });
      const fpGloveMat = new THREE.MeshStandardMaterial({ color: SKINS[selectedSkinKey].accent, roughness: 0.55 });

      const muzzleLight = new THREE.PointLight(0xfef08a, 0, 12);
      muzzleLight.position.set(0.25, -0.15, -1.1);
      arenaCamera.add(muzzleLight);

      function buildFirstPersonViewmodels() {
        const akGroup = new THREE.Group();
        const akReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.085, 0.34), gunMetalDark);
        akReceiver.position.set(0, 0, -0.15);
        akGroup.add(akReceiver);

        const akStock = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.095, 0.22), woodMat);
        akStock.position.set(0, -0.025, 0.11);
        akStock.rotation.x = 0.12;
        akGroup.add(akStock);

        const akHandguard = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.07, 0.22), woodMat);
        akHandguard.position.set(0, 0.005, -0.41);
        akGroup.add(akHandguard);

        const akBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.28, 10), gunMetalGray);
        akBarrel.rotation.x = Math.PI / 2;
        akBarrel.position.set(0, 0.015, -0.64);
        akGroup.add(akBarrel);

        const akMag = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.17, 0.075), gunMetalGray);
        akMag.position.set(0, -0.10, -0.22);
        akMag.rotation.x = -0.28;
        akGroup.add(akMag);

        const akRightSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.085, 0.18), fpSleeveMat);
        akRightSleeve.position.set(0.02, -0.09, 0.08);
        const akRightGlove = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.09, 0.10), fpGloveMat);
        akRightGlove.position.set(0, -0.075, -0.05);

        const akLeftSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.18), fpSleeveMat);
        akLeftSleeve.position.set(-0.07, -0.06, -0.27);
        const akLeftGlove = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.10), fpGloveMat);
        akLeftGlove.position.set(-0.02, -0.045, -0.39);

        akGroup.add(akRightSleeve, akRightGlove, akLeftSleeve, akLeftGlove);
        akGroup.position.set(0.26, -0.24, -0.36);

        const carbGroup = new THREE.Group();
        const carbBody = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.36), gunMetalDark);
        carbBody.position.set(0, 0, -0.18);
        carbGroup.add(carbBody);

        const carbHolo = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.07), gunMetalGray);
        carbHolo.position.set(0, 0.06, -0.14);
        carbGroup.add(carbHolo);

        const carbBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.25, 10), gunMetalGray);
        carbBarrel.rotation.x = Math.PI / 2;
        carbBarrel.position.set(0, 0.01, -0.46);
        carbGroup.add(carbBarrel);

        const carbMag = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.15, 0.06), gunMetalGray);
        carbMag.position.set(0, -0.09, -0.24);
        carbGroup.add(carbMag);

        const carbRightSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.18), fpSleeveMat);
        carbRightSleeve.position.set(0.02, -0.085, 0.07);
        const carbRightGlove = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.085, 0.10), fpGloveMat);
        carbRightGlove.position.set(0, -0.07, -0.06);

        const carbLeftSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.16), fpSleeveMat);
        carbLeftSleeve.position.set(-0.06, -0.055, -0.22);
        const carbLeftGlove = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.10), fpGloveMat);
        carbLeftGlove.position.set(-0.02, -0.04, -0.34);

        carbGroup.add(carbRightSleeve, carbRightGlove, carbLeftSleeve, carbLeftGlove);
        carbGroup.position.set(0.25, -0.23, -0.34);

        const pistolGroup = new THREE.Group();
        const pistolSlide = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.055, 0.22), gunMetalGray);
        pistolSlide.position.set(0, 0.02, -0.14);
        pistolGroup.add(pistolSlide);

        const pistolFrame = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.032, 0.20), gunMetalDark);
        pistolFrame.position.set(0, -0.015, -0.13);
        pistolGroup.add(pistolFrame);

        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.11, 0.06), gunMetalDark);
        pistolGrip.position.set(0, -0.065, -0.05);
        pistolGrip.rotation.x = 0.22;
        pistolGroup.add(pistolGrip);

        const pistolSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.085, 0.18), fpSleeveMat);
        pistolSleeve.position.set(0.01, -0.08, 0.08);
        const pistolGlove = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.095, 0.095), fpGloveMat);
        pistolGlove.position.set(0, -0.065, -0.05);

        pistolGroup.add(pistolSleeve, pistolGlove);
        pistolGroup.position.set(0.24, -0.22, -0.34);

        const fistGroup = new THREE.Group();
        const rightFist = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.095, 0.12), fpGloveMat);
        rightFist.position.set(0.23, -0.22, -0.38);
        const rightForearm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.22), fpSleeveMat);
        rightForearm.position.set(0.24, -0.25, -0.22);

        const leftFist = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.095, 0.12), fpGloveMat);
        leftFist.position.set(-0.23, -0.22, -0.38);
        const leftForearm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.22), fpSleeveMat);
        leftForearm.position.set(-0.24, -0.25, -0.22);

        fistGroup.add(rightFist, rightForearm, leftFist, leftForearm);

        viewmodelRoot.add(akGroup, carbGroup, pistolGroup, fistGroup);
        return { ak: akGroup, carbine: carbGroup, pistol: pistolGroup, fist: fistGroup };
      }

      const viewmodels = buildFirstPersonViewmodels();

      function applySkinSelection(skinKey) {
        if (!SKINS[skinKey]) return;
        selectedSkinKey = skinKey;
        const sk = SKINS[skinKey];

        const mats = lobbyCharacterRig.materials;
        mats.shirtMat.color.setHex(sk.shirt);
        mats.vestMat.color.setHex(sk.vest);
        mats.pantsMat.color.setHex(sk.pants);
        mats.accentMat.color.setHex(sk.accent);
        mats.visorMat.color.setHex(sk.visor);
        mats.visorMat.emissive.setHex(sk.visor);

        fpSleeveMat.color.setHex(sk.shirt);
        fpGloveMat.color.setHex(sk.accent);

        document.getElementById("selectedSkinTitle").textContent = sk.name;
        document.getElementById("activeSkinPedestalLabel").textContent = sk.name.toUpperCase();
        document.querySelectorAll(".skin-card").forEach((card) => {
          card.classList.toggle("active", card.dataset.skin === skinKey);
        });
      }

      // =========================================================================
      // 8. JOGADOR, COLISÃO, ESCADAS/TELHADOS E SALA POR CÓDIGO
      // =========================================================================
      const player = {
        pos: new THREE.Vector3(0, 0, 18),
        velY: 0,
        grounded: true,
        yaw: 0,
        pitch: 0,
        hp: 100,
        maxHp: 100,
        radius: 0.65,
        activeWeapon: "ak",
        weapons: {
          ak: { mag: 20, maxMag: 20, reserve: 100 },
          carbine: { mag: 30, maxMag: 30, reserve: 80 },
          pistol: { mag: 15, maxMag: 15, reserve: 50 },
          fist: { mag: Infinity, maxMag: Infinity, reserve: Infinity }
        },
        reloading: false,
        reloadTimer: 0,
        fireCooldown: 0,
        recoilOffset: 0,
        bobPhase: 0
      };

      let gameState = "LOBBY"; // "LOBBY" | "PLAYING" | "PAUSED" | "ENDED"
      let bots = [];
      let tracers = [];
      let kills = 0;
      let aliveCount = 99;
      let mouseSensitivity = 1.0;
      let hitmarkerTimer = 0;
      let killBannerTimer = 0;

      const keys = {};
      const mouseState = { down: false, dragging: false, lastX: 0, lastY: 0 };

      function clearRemotePlayerMeshes() {
        for (const entry of remotePlayerMeshes.values()) {
          arenaScene.remove(entry.rig.root);
        }
        remotePlayerMeshes.clear();
        remotePlayersMap.clear();
      }

      function syncRemotePlayersVisuals(dt) {
        if (!currentRoomCode || gameState !== "PLAYING") return;

        const nowMs = Date.now();
        for (const [uid, pData] of remotePlayersMap.entries()) {
          if (!uid || uid === localClientId) continue;
          if (nowMs - (pData.updatedAt || 0) > 12000) {
            if (remotePlayerMeshes.has(uid)) {
              arenaScene.remove(remotePlayerMeshes.get(uid).rig.root);
              remotePlayerMeshes.delete(uid);
            }
            continue;
          }

          let entry = remotePlayerMeshes.get(uid);
          if (!entry) {
            const skinCfg = SKINS[pData.skin] || SKINS.urbano;
            const rig = createTacticalCharacterMesh(skinCfg, true);
            rig.root.position.set(pData.x || 0, pData.y || 0, pData.z || 0);
            arenaScene.add(rig.root);
            entry = { rig, walkPhase: 0 };
            remotePlayerMeshes.set(uid, entry);
          }

          const targetX = typeof pData.x === "number" ? pData.x : 0;
          const targetY = typeof pData.y === "number" ? pData.y : 0;
          const targetZ = typeof pData.z === "number" ? pData.z : 0;
          const targetYaw = typeof pData.yaw === "number" ? pData.yaw : 0;

          const prevX = entry.rig.root.position.x;
          const prevZ = entry.rig.root.position.z;
          const blend = Math.min(1, dt * 12);
          entry.rig.root.position.x += (targetX - prevX) * blend;
          entry.rig.root.position.y += (targetY - entry.rig.root.position.y) * blend;
          entry.rig.root.position.z += (targetZ - prevZ) * blend;
          entry.rig.root.rotation.set(0, targetYaw, 0);

          const movedDist = Math.hypot(entry.rig.root.position.x - prevX, entry.rig.root.position.z - prevZ);
          if (movedDist > 0.004) {
            entry.walkPhase += dt * 11;
            const swing = Math.sin(entry.walkPhase) * 0.45;
            entry.rig.leftLeg.rotation.x = swing;
            entry.rig.rightLeg.rotation.x = -swing;
          } else {
            entry.rig.leftLeg.rotation.x = 0;
            entry.rig.rightLeg.rotation.x = 0;
          }
        }
      }

      function publishLocalPlayerState(forceNow = false) {
        if (!roomChannel || !currentRoomCode || gameState !== "PLAYING") return;
        const nowMs = Date.now();
        if (!forceNow && nowMs - lastSyncSentAt < 100) return;
        lastSyncSentAt = nowMs;

        try {
          roomChannel.postMessage({
            type: "player_state",
            roomCode: currentRoomCode,
            uid: localClientId,
            x: Number(player.pos.x.toFixed(2)),
            y: Number(player.pos.y.toFixed(2)),
            z: Number(player.pos.z.toFixed(2)),
            yaw: Number(player.yaw.toFixed(3)),
            hp: Math.max(0, Math.round(player.hp)),
            skin: selectedSkinKey,
            updatedAt: nowMs
          });
        } catch (err) {}
      }

      function connectRoomChannel(code) {
        if (roomChannel) {
          try { roomChannel.close(); } catch (e) {}
          roomChannel = null;
        }
        clearRemotePlayerMeshes();
        if (!code || typeof BroadcastChannel === "undefined") return;

        roomChannel = new BroadcastChannel("br3d_room_" + code);
        roomChannel.onmessage = (event) => {
          const msg = event && event.data;
          if (!msg || msg.roomCode !== currentRoomCode) return;
          if (!msg.uid || msg.uid === localClientId) return;

          if (msg.type === "player_state") {
            remotePlayersMap.set(msg.uid, msg);
            const realCount = Array.from(remotePlayersMap.keys()).filter((uid) => {
              const item = remotePlayersMap.get(uid);
              return uid !== localClientId && item && Date.now() - (item.updatedAt || 0) < 12000;
            }).length;
            document.getElementById("roomStatusFeedback").textContent =
              `Sala ${code} • ${realCount + 1} jogador(es) conectado(s) • 0 oponentes bots.`;
          }
        };
      }

      function checkCollision2D(x, z, r) {
        if (x - r < -arenaHalf + 2.2 || x + r > arenaHalf - 2.2) return true;
        if (z - r < -arenaHalf + 2.2 || z + r > arenaHalf - 2.2) return true;

        for (let i = 0; i < wallColliders.length; i++) {
          const w = wallColliders[i];
          if (player.pos.y >= w.height - 0.15) continue;
          const cx = Math.max(w.minX, Math.min(x, w.maxX));
          const cz = Math.max(w.minZ, Math.min(z, w.maxZ));
          const dx = x - cx;
          const dz = z - cz;
          if (dx * dx + dz * dz < r * r) return true;
        }

        for (let i = 0; i < circleObstacles.length; i++) {
          const c = circleObstacles[i];
          const dx = x - c.x;
          const dz = z - c.z;
          const minDist = r + c.r;
          if (dx * dx + dz * dz < minDist * minDist) return true;
        }

        return false;
      }

      function getSupportHeightAt(x, z, currentY) {
        let supportY = 0;

        for (let i = 0; i < roofPlazas.length; i++) {
          const rp = roofPlazas[i];

          if (
            x >= rp.minX - 0.25 &&
            x <= rp.maxX + 0.25 &&
            z >= rp.minZ - 0.25 &&
            z <= rp.maxZ + 0.25
          ) {
            if (currentY >= rp.topY - 1.25 || Math.abs(currentY - rp.topY) < 0.35) {
              if (rp.topY > supportY) supportY = rp.topY;
            }
          }

          if (
            x >= rp.stairMinX &&
            x <= rp.stairMaxX &&
            z >= rp.stairZLow &&
            z <= rp.stairZHigh
          ) {
            const span = Math.max(0.001, rp.stairZHigh - rp.stairZLow);
            const t = Math.max(0, Math.min(1, (rp.stairZHigh - z) / span));
            const rampY = t * rp.topY;
            if (currentY >= rampY - 1.15 && rampY > supportY) {
              supportY = rampY;
            }
          }
        }

        return supportY;
      }

      function segmentBlockedByWalls(x1, z1, x2, z2) {
        const dist = Math.hypot(x2 - x1, z2 - z1);
        const steps = Math.max(1, Math.ceil(dist / 2.2));
        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          const sx = x1 + (x2 - x1) * t;
          const sz = z1 + (z2 - z1) * t;
          if (checkCollision2D(sx, sz, 0.25)) return true;
        }
        return false;
      }

      function findFreeSpawnPoint(minDistFromCenter = 24) {
        const limit = Math.max(40, arenaSize - 40);
        for (let attempt = 0; attempt < 250; attempt++) {
          const x = (Math.random() - 0.5) * limit;
          const z = (Math.random() - 0.5) * limit;
          if (Math.hypot(x, z - 18) < minDistFromCenter) continue;
          if (!checkCollision2D(x, z, 1.1)) return { x, z };
        }
        return { x: 28, z: 28 };
      }

      // =========================================================================
      // 9. SINCRONIZAÇÃO DO HUD
      // =========================================================================
      const hudAliveCount = document.getElementById("hudAliveCount");
      const hudKillsCount = document.getElementById("hudKillsCount");
      const akMagText = document.getElementById("akMagText");
      const akResText = document.getElementById("akResText");
      const akBarFill = document.getElementById("akBarFill");
      const carbineAmmoText = document.getElementById("carbineAmmoText");
      const carbineBarFill = document.getElementById("carbineBarFill");
      const pistolAmmoText = document.getElementById("pistolAmmoText");
      const pistolBarFill = document.getElementById("pistolBarFill");
      const hpText = document.getElementById("hpText");
      const hpBarFill = document.getElementById("hpBarFill");
      const weaponTitleText = document.getElementById("weaponTitleText");
      const reloadBanner = document.getElementById("reloadBanner");
      const lootPromptBanner = document.getElementById("lootPromptBanner");
      const killFeedBanner = document.getElementById("killFeedBanner");
      const zoneWarningBanner = document.getElementById("zoneWarningBanner");
      const sectorBadge = document.getElementById("sectorBadge");
      const hitmarkerEl = document.getElementById("hitmarker");

      function updateCountersHud() {
        hudAliveCount.textContent = aliveCount;
        hudKillsCount.textContent = kills;

        const hpClamped = Math.max(0, Math.round(player.hp));
        hpText.textContent = `VIDA: ${hpClamped} / ${player.maxHp}`;
        hpBarFill.style.width = `${(hpClamped / player.maxHp) * 100}%`;
        hpBarFill.style.background = hpClamped > 45
          ? "linear-gradient(90deg, #10b981 0%, #34d399 100%)"
          : (hpClamped > 22 ? "#f59e0b" : "#ef4444");
      }

      function syncWeaponHudAndViewmodel() {
        const wKey = player.activeWeapon;
        const wDef = WEAPON_DEFS[wKey];

        viewmodels.ak.visible = wKey === "ak";
        viewmodels.carbine.visible = wKey === "carbine";
        viewmodels.pistol.visible = wKey === "pistol";
        viewmodels.fist.visible = wKey === "fist";

        document.getElementById("mainWeaponBox").classList.toggle("active", wKey === "ak");
        document.getElementById("slotCarbine").classList.toggle("active", wKey === "carbine");
        document.getElementById("slotPistol").classList.toggle("active", wKey === "pistol");
        document.getElementById("slotFist").classList.toggle("active", wKey === "fist");

        const ak = player.weapons.ak;
        akMagText.textContent = ak.mag;
        akResText.textContent = `/${ak.reserve}`;
        akBarFill.style.width = `${Math.min(100, (ak.mag / ak.maxMag) * 100)}%`;

        const carb = player.weapons.carbine;
        carbineAmmoText.textContent = carb.reserve;
        carbineBarFill.style.width = `${Math.min(100, (carb.mag / carb.maxMag) * 100)}%`;

        const pist = player.weapons.pistol;
        pistolAmmoText.textContent = pist.reserve;
        pistolBarFill.style.width = `${Math.min(100, (pist.mag / pist.maxMag) * 100)}%`;

        weaponTitleText.textContent = wDef.title;
        reloadBanner.style.display = player.reloading ? "block" : "none";
      }

      function switchWeapon(wKey) {
        if (!WEAPON_DEFS[wKey] || player.activeWeapon === wKey) return;
        player.activeWeapon = wKey;
        player.reloading = false;
        player.reloadTimer = 0;
        syncWeaponHudAndViewmodel();
      }

      function triggerReload() {
        if (gameState !== "PLAYING" || player.reloading) return;
        const wKey = player.activeWeapon;
        if (wKey === "fist") return;
        const st = player.weapons[wKey];
        if (st.mag >= st.maxMag || st.reserve <= 0) return;

        player.reloading = true;
        player.reloadTimer = WEAPON_DEFS[wKey].reloadTime;
        playSfx("reload");
        syncWeaponHudAndViewmodel();
      }

      // =========================================================================
      // 10. DISPARO, COLETA, KITS MÉDICOS E ELIMINAÇÃO
      // =========================================================================
      function spawnBulletTracer(startVec, endVec, colorHex) {
        const geo = new THREE.BufferGeometry().setFromPoints([startVec, endVec]);
        const mat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.9 });
        const line = new THREE.Line(geo, mat);
        arenaScene.add(line);
        tracers.push({ line, geo, mat, life: 0.08 });
      }

      function eliminateBotCleanly(bot, killedByPlayer) {
        if (!bot.alive) return;
        bot.alive = false;
        bot.dying = true;
        bot.deathTimer = 0.28;
        if (bot.rig.muzzle) bot.rig.muzzle.visible = false;

        aliveCount = Math.max(1, aliveCount - 1);
        spawnLootCrate(bot.x, bot.z, true);

        if (killedByPlayer) {
          kills += 1;
          killFeedBanner.textContent = `ABATE CONFIRMADO! (${kills} ABATES)`;
          killFeedBanner.style.display = "block";
          killBannerTimer = 2.0;
        }

        updateCountersHud();

        if (aliveCount <= 1 && player.hp > 0 && gameState === "PLAYING") {
          finishMatch(true);
        }
      }

      function collectNearbyLoot(maxRadius) {
        let collectedAny = false;
        for (let i = lootCrates.length - 1; i >= 0; i--) {
          const crate = lootCrates[i];
          const d = Math.hypot(player.pos.x - crate.x, player.pos.z - crate.z);
          if (d <= maxRadius) {
            player.weapons.ak.reserve += crate.akAmmo;
            player.weapons.carbine.reserve += crate.carbineAmmo;
            player.weapons.pistol.reserve += crate.pistolAmmo;
            player.hp = Math.min(player.maxHp, player.hp + crate.heal);
            worldGroup.remove(crate.mesh);
            lootCrates.splice(i, 1);
            collectedAny = true;
          }
        }

        for (let i = 0; i < medkits.length; i++) {
          const kit = medkits[i];
          if (!kit.active) continue;
          const d = Math.hypot(player.pos.x - kit.x, player.pos.z - kit.z);
          if (d <= maxRadius && player.hp < player.maxHp) {
            player.hp = player.maxHp;
            kit.active = false;
            kit.group.visible = false;
            kit.respawnTimer = 15.0;
            collectedAny = true;
          }
        }

        if (collectedAny) {
          playSfx("loot");
          syncWeaponHudAndViewmodel();
          updateCountersHud();
        }
        return collectedAny;
      }

      function firePlayerWeapon() {
        if (gameState !== "PLAYING" || player.reloading || player.fireCooldown > 0) return;

        const wKey = player.activeWeapon;
        const wDef = WEAPON_DEFS[wKey];
        const st = player.weapons[wKey];

        if (wKey !== "fist") {
          if (st.mag <= 0) {
            if (st.reserve > 0) triggerReload();
            return;
          }
          st.mag -= 1;
          if (st.mag === 0 && st.reserve > 0) {
            triggerReload();
          }
        }

        player.fireCooldown = wDef.fireRate;
        player.recoilOffset = wDef.recoilKick;
        playSfx(wKey);

        if (wKey !== "fist") {
          muzzleLight.intensity = 3.2;
        }

        const eyeOrigin = new THREE.Vector3(player.pos.x, player.pos.y + 1.7, player.pos.z);
        const forwardDir = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(player.pitch, player.yaw, 0, "YXZ")).normalize();

        let maxHitDist = wDef.range;
        const stepSize = 1.4;
        const maxSteps = Math.floor(wDef.range / stepSize);
        for (let s = 1; s <= maxSteps; s++) {
          const d = s * stepSize;
          const px = eyeOrigin.x + forwardDir.x * d;
          const py = eyeOrigin.y + forwardDir.y * d;
          const pz = eyeOrigin.z + forwardDir.z * d;
          if (py <= 0.05 || checkCollision2D(px, pz, 0.2)) {
            maxHitDist = d;
            break;
          }
        }

        let hitBot = null;
        let closestBotDist = maxHitDist;

        for (let i = 0; i < bots.length; i++) {
          const bot = bots[i];
          if (!bot.alive) continue;

          const toBotX = bot.x - eyeOrigin.x;
          const toBotY = 1.15 - eyeOrigin.y;
          const toBotZ = bot.z - eyeOrigin.z;

          const proj = toBotX * forwardDir.x + toBotY * forwardDir.y + toBotZ * forwardDir.z;
          if (proj < 0 || proj > closestBotDist) continue;

          const closestX = eyeOrigin.x + forwardDir.x * proj;
          const closestY = eyeOrigin.y + forwardDir.y * proj;
          const closestZ = eyeOrigin.z + forwardDir.z * proj;

          const horizErr = Math.hypot(bot.x - closestX, bot.z - closestZ);
          const vertErr = Math.abs(1.15 - closestY);

          if (horizErr <= 0.65 && vertErr <= 1.05) {
            closestBotDist = proj;
            hitBot = bot;
          }
        }

        if (wKey !== "fist") {
          const muzzleWorld = new THREE.Vector3(0.24, -0.20, -0.75).applyMatrix4(arenaCamera.matrixWorld);
          const endPoint = eyeOrigin.clone().addScaledVector(forwardDir, closestBotDist);
          spawnBulletTracer(muzzleWorld, endPoint, wDef.tracerColor);
        }

        if (hitBot) {
          hitBot.hp -= wDef.damage;
          hitBot.aggroTimer = 6.0;
          hitmarkerEl.classList.add("show");
          hitmarkerTimer = 0.13;
          playSfx("hit");

          if (hitBot.hp <= 0) {
            eliminateBotCleanly(hitBot, true);
          }
        }

        syncWeaponHudAndViewmodel();
      }

      function damagePlayer(amount) {
        if (gameState !== "PLAYING" || player.hp <= 0) return;
        player.hp = Math.max(0, player.hp - amount);
        playSfx("hurt");
        updateCountersHud();

        if (player.hp <= 0) {
          finishMatch(false);
        }
      }

      // =========================================================================
      // 11. TRANSIÇÃO LOBBY <-> PARTIDA
      // =========================================================================
      const lobbyScreen = document.getElementById("lobbyScreen");
      const gameplayHud = document.getElementById("gameplayHud");
      const settingsModal = document.getElementById("settingsModal");
      const endMatchModal = document.getElementById("endMatchModal");

      function finishMatch(isVictory) {
        gameState = "ENDED";
        mouseState.down = false;
        mouseState.dragging = false;
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }

        const levelName = MATCH_LEVELS[selectedLevel].label;
        const skinName = SKINS[selectedSkinKey].name;
        document.getElementById("endMatchTitle").textContent = isVictory
          ? "VITÓRIA ROYALE! #1"
          : "ELIMINADO";
        document.getElementById("endMatchStats").textContent = isVictory
          ? `Skin: ${skinName} • Nível: ${levelName} • Você venceu na arena (${arenaSize}m × ${arenaSize}m) com ${kills} abates!`
          : `Skin: ${skinName} • Nível: ${levelName} • Posição Final: #${aliveCount} • Abates: ${kills}.`;

        endMatchModal.classList.add("open");
      }

      function startNewMatch() {
        const lvl = MATCH_LEVELS[selectedLevel];
        const spawnOpponentsCount = isCodeRoomMode ? 0 : selectedOpponentCount;
        buildDynamicArena();
        clearRemotePlayerMeshes();

        while (botGroupRoot.children.length > 0) {
          botGroupRoot.remove(botGroupRoot.children[0]);
        }
        for (const t of tracers) {
          arenaScene.remove(t.line);
          t.geo.dispose();
          t.mat.dispose();
        }
        tracers = [];
        bots = [];

        kills = 0;
        aliveCount = spawnOpponentsCount + 1;
        killBannerTimer = 0;
        hitmarkerTimer = 0;
        killFeedBanner.style.display = "none";
        lootPromptBanner.style.display = "none";
        zoneWarningBanner.style.display = "none";

        applySkinSelection(selectedSkinKey);
        player.pos.set(0, 0, 18);
        player.velY = 0;
        player.grounded = true;
        player.yaw = 0;
        player.pitch = 0;
        player.hp = 100;
        player.activeWeapon = "ak";
        player.weapons.ak = { mag: 20, maxMag: 20, reserve: 100 };
        player.weapons.carbine = { mag: 30, maxMag: 30, reserve: 80 };
        player.weapons.pistol = { mag: 15, maxMag: 15, reserve: 50 };
        player.weapons.fist = { mag: Infinity, maxMag: Infinity, reserve: Infinity };
        player.reloading = false;
        player.reloadTimer = 0;
        player.fireCooldown = 0;
        player.recoilOffset = 0;

        safeZone.x = (Math.random() - 0.5) * Math.min(70, arenaSize * 0.1);
        safeZone.z = (Math.random() - 0.5) * Math.min(70, arenaSize * 0.1);
        safeZone.radius = arenaHalf * 0.92;
        safeZone.targetRadius = Math.max(24, arenaSize * 0.05);
        safeZone.shrinkSpeed = lvl.zoneShrinkSpeed;
        safeZone.damageTick = 0;
        safeZoneMesh.position.set(safeZone.x, 47.5, safeZone.z);
        safeZoneMesh.scale.set(safeZone.radius, 1, safeZone.radius);

        for (let i = 0; i < spawnOpponentsCount; i++) {
          const sp = findFreeSpawnPoint(24);
          const botSkin = BOT_SKIN_POOL[i % BOT_SKIN_POOL.length];
          const rig = createTacticalCharacterMesh(botSkin, true);
          rig.root.position.set(sp.x, 0, sp.z);
          rig.root.rotation.set(0, 0, 0);
          botGroupRoot.add(rig.root);

          bots.push({
            x: sp.x,
            z: sp.z,
            yaw: Math.random() * Math.PI * 2,
            hp: lvl.botHp,
            speed: (5.6 + Math.random() * 1.5) * lvl.botSpeedMult,
            alive: true,
            dying: false,
            deathTimer: 0,
            fireCooldown: Math.random() * lvl.botFireInterval,
            muzzleTimer: 0,
            wanderTimer: 1.2 + Math.random() * 3.0,
            aggroTimer: 0,
            strafeDir: Math.random() < 0.5 ? 1 : -1,
            walkPhase: Math.random() * 10,
            rig
          });
        }

        gameState = "PLAYING";
        lobbyScreen.classList.add("hidden");
        settingsModal.classList.remove("open");
        endMatchModal.classList.remove("open");
        gameplayHud.classList.add("active");

        syncWeaponHudAndViewmodel();
        updateCountersHud();

        if (renderer.domElement.requestPointerLock) {
          try {
            renderer.domElement.requestPointerLock();
          } catch (e) {}
        }
      }

      function returnToLobby() {
        gameState = "LOBBY";
        mouseState.down = false;
        mouseState.dragging = false;
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        gameplayHud.classList.remove("active");
        settingsModal.classList.remove("open");
        endMatchModal.classList.remove("open");
        lobbyScreen.classList.remove("hidden");
        updateLobbyCameraLayout();
      }

      // =========================================================================
      // 12. MINIMAPA TÁTICO
      // =========================================================================
      const minimapCanvas = document.getElementById("minimapCanvas");
      const mctx = minimapCanvas.getContext("2d");

      function drawMinimap() {
        const w = minimapCanvas.width;
        const h = minimapCanvas.height;
        const half = w / 2;
        const scale = 0.42;

        mctx.clearRect(0, 0, w, h);
        mctx.fillStyle = "#101b29";
        mctx.fillRect(0, 0, w, h);

        mctx.save();
        mctx.translate(half, half);
        mctx.rotate(player.yaw);

        mctx.fillStyle = "#334155";
        mctx.fillRect((-player.pos.x - 7) * scale, (-player.pos.z - arenaHalf) * scale, 14 * scale, arenaSize * scale);
        mctx.fillRect((-player.pos.x - arenaHalf) * scale, (-player.pos.z - 7) * scale, arenaSize * scale, 14 * scale);

        mctx.fillStyle = "#94a3b8";
        for (let i = 0; i < buildingRects.length; i++) {
          const b = buildingRects[i];
          const bx = (b.cx - player.pos.x - b.w / 2) * scale;
          const bz = (b.cz - player.pos.z - b.d / 2) * scale;
          if (Math.abs(bx) > w || Math.abs(bz) > h) continue;
          mctx.fillRect(bx, bz, b.w * scale, b.d * scale);
        }

        mctx.fillStyle = "#22c55e";
        for (let i = 0; i < medkits.length; i++) {
          const kit = medkits[i];
          if (!kit.active) continue;
          const kx = (kit.x - player.pos.x) * scale;
          const kz = (kit.z - player.pos.z) * scale;
          mctx.fillRect(kx - 1.5, kz - 4, 3, 8);
          mctx.fillRect(kx - 4, kz - 1.5, 8, 3);
        }

        mctx.strokeStyle = "#22d3ee";
        mctx.lineWidth = 2;
        mctx.beginPath();
        mctx.arc((safeZone.x - player.pos.x) * scale, (safeZone.z - player.pos.z) * scale, safeZone.radius * scale, 0, Math.PI * 2);
        mctx.stroke();

        mctx.fillStyle = "#ef4444";
        for (let i = 0; i < bots.length; i++) {
          const bot = bots[i];
          if (!bot.alive) continue;
          const dx = (bot.x - player.pos.x) * scale;
          const dz = (bot.z - player.pos.z) * scale;
          if (dx * dx + dz * dz > half * half * 1.1) continue;
          mctx.beginPath();
          mctx.arc(dx, dz, 2.6, 0, Math.PI * 2);
          mctx.fill();
        }

        mctx.restore();

        mctx.fillStyle = "#22c55e";
        mctx.beginPath();
        mctx.moveTo(half, half - 7);
        mctx.lineTo(half + 5, half + 5);
        mctx.lineTo(half, half + 2);
        mctx.lineTo(half - 5, half + 5);
        mctx.closePath();
        mctx.fill();

        const sx = player.pos.x < -80 ? "OESTE" : (player.pos.x > 80 ? "LESTE" : "CENTRAL");
        const sz = player.pos.z < -80 ? "NORTE" : (player.pos.z > 80 ? "SUL" : "");
        sectorBadge.textContent = `SETOR ${sz ? sz + "-" + sx : sx}`;
      }

      // =========================================================================
      // 13. LOOP PRINCIPAL
      // =========================================================================
      const clock = new THREE.Clock();

      function updateArenaSimulation(dt) {
        if (gameState !== "PLAYING") return;

        const lvl = MATCH_LEVELS[selectedLevel];
        syncRemotePlayersVisuals(dt);
        publishLocalPlayerState(false);

        const keyTurnSpeed = 2.1 * mouseSensitivity;
        if (keys["KeyQ"] || keys["ArrowLeft"]) player.yaw += keyTurnSpeed * dt;
        if (keys["KeyE"] || keys["ArrowRight"]) player.yaw -= keyTurnSpeed * dt;
        if (keys["ArrowUp"]) player.pitch = Math.min(1.25, player.pitch + 1.5 * dt);
        if (keys["ArrowDown"]) player.pitch = Math.max(-1.25, player.pitch - 1.5 * dt);

        let moveForward = 0;
        let moveRight = 0;
        if (keys["KeyW"]) moveForward += 1;
        if (keys["KeyS"]) moveForward -= 1;
        if (keys["KeyD"]) moveRight += 1;
        if (keys["KeyA"]) moveRight -= 1;

        const isSprinting = Boolean(keys["ShiftLeft"] || keys["ShiftRight"]);
        const moveSpeed = isSprinting ? 13.5 : 8.6;

        const fwdX = -Math.sin(player.yaw);
        const fwdZ = -Math.cos(player.yaw);
        const rgtX = Math.cos(player.yaw);
        const rgtZ = -Math.sin(player.yaw);

        let vx = fwdX * moveForward + rgtX * moveRight;
        let vz = fwdZ * moveForward + rgtZ * moveRight;
        const vLen = Math.hypot(vx, vz);

        if (vLen > 0.001) {
          vx = (vx / vLen) * moveSpeed;
          vz = (vz / vLen) * moveSpeed;

          const nextX = player.pos.x + vx * dt;
          if (!checkCollision2D(nextX, player.pos.z, player.radius)) {
            player.pos.x = nextX;
          }
          const nextZ = player.pos.z + vz * dt;
          if (!checkCollision2D(player.pos.x, nextZ, player.radius)) {
            player.pos.z = nextZ;
          }

          if (player.grounded) {
            player.bobPhase += dt * (isSprinting ? 14 : 9.5);
          }
        } else {
          player.bobPhase = 0;
        }

        if (keys["Space"] && player.grounded) {
          player.velY = 8.4;
          player.grounded = false;
        }

        const groundSupportY = getSupportHeightAt(player.pos.x, player.pos.z, player.pos.y);
        if (player.grounded && player.pos.y > groundSupportY + 0.05 && player.pos.y - groundSupportY <= 0.85) {
          player.pos.y = groundSupportY;
          player.velY = 0;
        } else {
          player.velY -= 22.0 * dt;
          player.pos.y += player.velY * dt;
          if (player.pos.y <= groundSupportY) {
            player.pos.y = groundSupportY;
            player.velY = 0;
            player.grounded = true;
          } else {
            player.grounded = false;
          }
        }

        const bobY = player.grounded && vLen > 0.01 ? Math.sin(player.bobPhase) * 0.042 : 0;
        const bobX = player.grounded && vLen > 0.01 ? Math.cos(player.bobPhase * 0.5) * 0.022 : 0;
        arenaCamera.position.set(player.pos.x, player.pos.y + 1.7 + bobY, player.pos.z);
        arenaCamera.rotation.order = "YXZ";
        arenaCamera.rotation.y = player.yaw;
        arenaCamera.rotation.x = player.pitch;
        arenaCamera.rotation.z = 0;

        if (player.recoilOffset > 0) {
          player.recoilOffset = Math.max(0, player.recoilOffset - dt * 0.25);
        }
        if (muzzleLight.intensity > 0) {
          muzzleLight.intensity = Math.max(0, muzzleLight.intensity - dt * 36);
        }

        viewmodelRoot.position.set(
          bobX * 0.55,
          bobY * 0.55 - (player.reloading ? 0.14 : 0),
          player.recoilOffset
        );
        viewmodelRoot.rotation.set(player.reloading ? -0.42 : player.recoilOffset * 1.4, 0, 0);

        if (player.fireCooldown > 0) player.fireCooldown -= dt;

        if (player.reloading) {
          player.reloadTimer -= dt;
          if (player.reloadTimer <= 0) {
            const st = player.weapons[player.activeWeapon];
            const needed = st.maxMag - st.mag;
            const take = Math.min(needed, st.reserve);
            st.mag += take;
            st.reserve -= take;
            player.reloading = false;
            syncWeaponHudAndViewmodel();
          }
        }

        if (mouseState.down && WEAPON_DEFS[player.activeWeapon].auto) {
          firePlayerWeapon();
        }

        if (hitmarkerTimer > 0) {
          hitmarkerTimer -= dt;
          if (hitmarkerTimer <= 0) hitmarkerEl.classList.remove("show");
        }

        if (killBannerTimer > 0) {
          killBannerTimer -= dt;
          if (killBannerTimer <= 0) killFeedBanner.style.display = "none";
        }

        for (let i = 0; i < medkits.length; i++) {
          const kit = medkits[i];
          if (kit.active) {
            kit.group.rotation.y += dt * 1.8;
          } else if (kit.respawnTimer > 0) {
            kit.respawnTimer -= dt;
            if (kit.respawnTimer <= 0) {
              kit.active = true;
              kit.group.visible = true;
            }
          }
        }

        collectNearbyLoot(1.95);

        let nearLoot = false;
        for (let i = 0; i < lootCrates.length; i++) {
          const d = Math.hypot(player.pos.x - lootCrates[i].x, player.pos.z - lootCrates[i].z);
          if (d <= 3.8) {
            nearLoot = true;
            break;
          }
        }
        if (!nearLoot) {
          for (let i = 0; i < medkits.length; i++) {
            const kit = medkits[i];
            if (!kit.active) continue;
            const d = Math.hypot(player.pos.x - kit.x, player.pos.z - kit.z);
            if (d <= 3.8) {
              nearLoot = true;
              break;
            }
          }
        }
        lootPromptBanner.style.display = nearLoot ? "block" : "none";

        if (safeZone.radius > safeZone.targetRadius) {
          safeZone.radius = Math.max(safeZone.targetRadius, safeZone.radius - safeZone.shrinkSpeed * dt);
          safeZoneMesh.scale.set(safeZone.radius, 1, safeZone.radius);
        }

        const distZonePlayer = Math.hypot(player.pos.x - safeZone.x, player.pos.z - safeZone.z);
        if (distZonePlayer > safeZone.radius) {
          zoneWarningBanner.style.display = "block";
          safeZone.damageTick += dt;
          if (safeZone.damageTick >= 1.0) {
            safeZone.damageTick = 0;
            damagePlayer(5);
          }
        } else {
          zoneWarningBanner.style.display = "none";
          safeZone.damageTick = 0;
        }

        for (let i = tracers.length - 1; i >= 0; i--) {
          const t = tracers[i];
          t.life -= dt;
          if (t.life <= 0) {
            arenaScene.remove(t.line);
            t.geo.dispose();
            t.mat.dispose();
            tracers.splice(i, 1);
          }
        }

        for (let i = 0; i < bots.length; i++) {
          const bot = bots[i];

          if (!bot.alive) {
            if (bot.dying) {
              bot.deathTimer -= dt;
              const prog = 1 - Math.max(0, bot.deathTimer / 0.28);
              bot.rig.root.position.set(bot.x, -prog * 0.9, bot.z);
              bot.rig.root.rotation.set(-prog * (Math.PI / 2), bot.yaw, 0);
              if (bot.deathTimer <= 0) {
                bot.dying = false;
                bot.rig.root.visible = false;
              }
            }
            continue;
          }

          if (bot.fireCooldown > 0) bot.fireCooldown -= dt;
          if (bot.aggroTimer > 0) bot.aggroTimer -= dt;
          if (bot.muzzleTimer > 0) {
            bot.muzzleTimer -= dt;
            if (bot.muzzleTimer <= 0 && bot.rig.muzzle) bot.rig.muzzle.visible = false;
          }

          const botZoneDist = Math.hypot(bot.x - safeZone.x, bot.z - safeZone.z);
          if (botZoneDist > safeZone.radius) {
            bot.hp -= 5 * dt;
            if (bot.hp <= 0) {
              eliminateBotCleanly(bot, false);
              continue;
            }
          }

          const distToPlayer = Math.hypot(player.pos.x - bot.x, player.pos.z - bot.z);
          const canSeePlayer = player.hp > 0 &&
            distToPlayer < lvl.botSightRange &&
            !segmentBlockedByWalls(bot.x, bot.z, player.pos.x, player.pos.z);

          let moveX = 0;
          let moveZ = 0;

          if (canSeePlayer || bot.aggroTimer > 0) {
            bot.yaw = Math.atan2(player.pos.x - bot.x, player.pos.z - bot.z);

            if (distToPlayer > 20) {
              moveX = Math.sin(bot.yaw) * bot.speed * 0.85;
              moveZ = Math.cos(bot.yaw) * bot.speed * 0.85;
            } else {
              moveX = Math.cos(bot.yaw) * bot.speed * 0.62 * bot.strafeDir;
              moveZ = -Math.sin(bot.yaw) * bot.speed * 0.62 * bot.strafeDir;
            }

            if (canSeePlayer && bot.fireCooldown <= 0) {
              bot.fireCooldown = lvl.botFireInterval * (0.82 + Math.random() * 0.45);
              bot.muzzleTimer = 0.055;
              if (bot.rig.muzzle) bot.rig.muzzle.visible = true;

              const spread = (1.08 - lvl.botAccuracy) * 2.4;
              const startMuzzle = new THREE.Vector3(bot.x, 1.25, bot.z);
              const targetVec = new THREE.Vector3(
                player.pos.x + (Math.random() - 0.5) * spread,
                1.35 + (Math.random() - 0.5) * 0.65,
                player.pos.z + (Math.random() - 0.5) * spread
              );
              spawnBulletTracer(startMuzzle, targetVec, 0xfbbf24);

              if (Math.random() < lvl.botAccuracy) {
                damagePlayer(lvl.botDamage);
              }
            }
          } else if (botZoneDist > safeZone.radius * 0.86) {
            bot.yaw = Math.atan2(safeZone.x - bot.x, safeZone.z - bot.z);
            moveX = Math.sin(bot.yaw) * bot.speed;
            moveZ = Math.cos(bot.yaw) * bot.speed;
          } else {
            bot.wanderTimer -= dt;
            if (bot.wanderTimer <= 0) {
              bot.yaw += (Math.random() - 0.5) * 2.6;
              bot.strafeDir = Math.random() < 0.5 ? 1 : -1;
              bot.wanderTimer = 1.6 + Math.random() * 3.0;
            }
            moveX = Math.sin(bot.yaw) * bot.speed * 0.65;
            moveZ = Math.cos(bot.yaw) * bot.speed * 0.65;

            if (distToPlayer > 90 && Math.random() < dt * lvl.botDuelRate) {
              eliminateBotCleanly(bot, false);
              continue;
            }
          }

          const nextBx = bot.x + moveX * dt;
          const nextBz = bot.z + moveZ * dt;
          if (!checkCollision2D(nextBx, bot.z, 0.65)) {
            bot.x = nextBx;
          } else {
            bot.yaw += Math.PI * 0.5;
          }
          if (!checkCollision2D(bot.x, nextBz, 0.65)) {
            bot.z = nextBz;
          } else {
            bot.yaw -= Math.PI * 0.5;
          }

          bot.walkPhase += dt * 9.5;
          const legSwing = Math.sin(bot.walkPhase) * 0.48;
          bot.rig.leftLeg.rotation.x = legSwing;
          bot.rig.rightLeg.rotation.x = -legSwing;
          bot.rig.root.position.set(bot.x, 0, bot.z);
          bot.rig.root.rotation.set(0, bot.yaw, 0);
        }
      }

      function renderLoop() {
        const dt = Math.min(clock.getDelta(), 0.05);

        if (gameState === "LOBBY") {
          lobbyCharacterRig.root.rotation.set(0, lobbyCharacterYaw, 0);
          lobbyCharacterRig.root.position.set(0, 0.22, 0);
          renderer.render(lobbyScene, lobbyCamera);
        } else {
          updateArenaSimulation(dt);
          if (gameState === "PLAYING") {
            drawMinimap();
          }
          renderer.render(arenaScene, arenaCamera);
        }

        requestAnimationFrame(renderLoop);
      }

      // =========================================================================
      // 14. EVENTOS DO LOBBY E CONTROLES
      // =========================================================================
      document.querySelectorAll(".skin-card").forEach((card) => {
        card.addEventListener("click", () => applySkinSelection(card.dataset.skin));
      });

      const lobbyStageArea = document.getElementById("lobbyStageArea");
      lobbyStageArea.addEventListener("mousedown", (e) => {
        if (gameState !== "LOBBY") return;
        lobbyDragActive = true;
        lobbyDragLastX = e.clientX;
      });

      window.addEventListener("mousemove", (e) => {
        if (gameState === "LOBBY" && lobbyDragActive) {
          const dx = e.clientX - lobbyDragLastX;
          lobbyDragLastX = e.clientX;
          lobbyCharacterYaw += dx * 0.012;
        }
      });

      window.addEventListener("mouseup", () => {
        lobbyDragActive = false;
      });

      lobbyStageArea.addEventListener("touchstart", (e) => {
        if (gameState !== "LOBBY" || !e.touches.length) return;
        lobbyDragActive = true;
        lobbyDragLastX = e.touches[0].clientX;
      }, { passive: true });

      window.addEventListener("touchmove", (e) => {
        if (gameState === "LOBBY" && lobbyDragActive && e.touches.length) {
          const dx = e.touches[0].clientX - lobbyDragLastX;
          lobbyDragLastX = e.touches[0].clientX;
          lobbyCharacterYaw += dx * 0.014;
        }
      }, { passive: true });

      window.addEventListener("touchend", () => {
        lobbyDragActive = false;
      });

      document.getElementById("rotateLeftBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        lobbyCharacterYaw -= 0.55;
      });

      document.getElementById("rotateRightBtn").addEventListener("click", (e) => {
        e.stopPropagation();
        lobbyCharacterYaw += 0.55;
      });

      const lobbyLevelLabel = document.getElementById("lobbyLevelLabel");
      const lobbyLevelDesc = document.getElementById("lobbyLevelDesc");

      function selectMatchLevel(levelKey) {
        if (!MATCH_LEVELS[levelKey]) return;
        selectedLevel = levelKey;
        const info = MATCH_LEVELS[levelKey];
        lobbyLevelLabel.textContent = info.label;
        lobbyLevelDesc.textContent = info.desc;
        document.querySelectorAll(".level-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.level === levelKey);
        });
      }

      document.querySelectorAll(".level-btn").forEach((btn) => {
        btn.addEventListener("click", () => selectMatchLevel(btn.dataset.level));
      });

      const oppSlider = document.getElementById("oppSlider");
      const oppTotalReadout = document.getElementById("oppTotalReadout");

      function selectOpponentCount(val) {
        const clamped = Math.max(5, Math.min(98, Math.round(Number(val) || 98)));
        selectedOpponentCount = clamped;
        oppSlider.value = clamped;
        oppTotalReadout.textContent = `${clamped} oponentes • ${clamped + 1} vivos na arena`;
        document.querySelectorAll(".preset-btn").forEach((btn) => {
          btn.classList.toggle("active", Number(btn.dataset.opp) === clamped);
        });
      }

      oppSlider.addEventListener("input", () => {
        isCodeRoomMode = false;
        currentRoomCode = "";
        document.getElementById("roomBadgeHeader").textContent = "PADRÃO";
        document.getElementById("roomCodeDisplay").textContent = "SEM CÓDIGO";
        selectOpponentCount(oppSlider.value);
      });

      document.querySelectorAll(".preset-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          isCodeRoomMode = false;
          currentRoomCode = "";
          document.getElementById("roomBadgeHeader").textContent = "PADRÃO";
          document.getElementById("roomCodeDisplay").textContent = "SEM CÓDIGO";
          selectOpponentCount(btn.dataset.opp);
        });
      });

      const arenaSizeSlider = document.getElementById("arenaSizeSlider");
      const arenaSizeReadout = document.getElementById("arenaSizeReadout");

      function getArenaSizeCategory(size) {
        if (size < 440) return "Pequena";
        if (size < 640) return "Média";
        if (size < 840) return "Gigante";
        return "Colossal";
      }

      function selectArenaSize(val) {
        const clamped = Math.max(320, Math.min(1000, Math.round(Number(val) || 720)));
        selectedArenaSize = clamped;
        arenaSizeSlider.value = clamped;
        const label = getArenaSizeCategory(clamped);
        arenaSizeReadout.textContent = `${clamped}m × ${clamped}m (${label})`;
        document.querySelectorAll(".size-preset-btn").forEach((btn) => {
          btn.classList.toggle("active", Number(btn.dataset.size) === clamped);
        });
      }

      arenaSizeSlider.addEventListener("input", () => selectArenaSize(arenaSizeSlider.value));
      document.querySelectorAll(".size-preset-btn").forEach((btn) => {
        btn.addEventListener("click", () => selectArenaSize(btn.dataset.size));
      });

      // Criar Nova Sala (Código 777) e Digitar Código de Convite
      const createRoomCodeBtn = document.getElementById("createRoomCodeBtn");
      const roomCodeDisplay = document.getElementById("roomCodeDisplay");
      const copyRoomCodeBtn = document.getElementById("copyRoomCodeBtn");
      const inviteCodeInput = document.getElementById("inviteCodeInput");
      const joinInviteCodeBtn = document.getElementById("joinInviteCodeBtn");
      const roomBadgeHeader = document.getElementById("roomBadgeHeader");
      const roomStatusFeedback = document.getElementById("roomStatusFeedback");

      function generateRoomCode() {
        return "777";
      }

      createRoomCodeBtn.addEventListener("click", () => {
        const code = generateRoomCode();
        currentRoomCode = code;
        isCodeRoomMode = true;
        roomCodeDisplay.textContent = code;
        inviteCodeInput.value = code;
        roomBadgeHeader.textContent = `SALA ${code} (0 BOTS)`;
        roomStatusFeedback.textContent = `Nova sala ${code} criada sem oponentes bots. Compartilhe o código e clique em ENTRAR NA PARTIDA.`;
        connectRoomChannel(code);
      });

      copyRoomCodeBtn.addEventListener("click", () => {
        if (!currentRoomCode) {
          roomStatusFeedback.textContent = "Crie uma sala ou digite um código antes de copiar.";
          return;
        }
        const tempInput = document.createElement("input");
        tempInput.value = currentRoomCode;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand("copy");
          roomStatusFeedback.textContent = `Código ${currentRoomCode} copiado para a área de transferência.`;
        } catch (err) {
          roomStatusFeedback.textContent = `Código da sala: ${currentRoomCode}`;
        }
        document.body.removeChild(tempInput);
      });

      joinInviteCodeBtn.addEventListener("click", () => {
        const cleaned = (inviteCodeInput.value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (!cleaned) {
          roomStatusFeedback.textContent = "Digite um código de convite válido para entrar na sala.";
          return;
        }
        currentRoomCode = cleaned;
        isCodeRoomMode = true;
        inviteCodeInput.value = cleaned;
        roomCodeDisplay.textContent = cleaned;
        roomBadgeHeader.textContent = `SALA ${cleaned} (0 BOTS)`;
        roomStatusFeedback.textContent = `Entrando na sala ${cleaned} sem oponentes bots...`;
        connectRoomChannel(cleaned);
        ensureAudioContext();
        startNewMatch();
        publishLocalPlayerState(true);
      });

      document.getElementById("enterMatchBtn").addEventListener("click", () => {
        ensureAudioContext();
        startNewMatch();
        if (currentRoomCode) {
          connectRoomChannel(currentRoomCode);
          publishLocalPlayerState(true);
        }
      });

      document.getElementById("mainWeaponBox").addEventListener("click", () => switchWeapon("ak"));
      document.getElementById("slotCarbine").addEventListener("click", () => switchWeapon("carbine"));
      document.getElementById("slotPistol").addEventListener("click", () => switchWeapon("pistol"));
      document.getElementById("slotFist").addEventListener("click", () => switchWeapon("fist"));

      document.getElementById("openSettingsBtn").addEventListener("click", () => {
        if (gameState !== "PLAYING") return;
        gameState = "PAUSED";
        mouseState.down = false;
        mouseState.dragging = false;
        if (document.pointerLockElement) document.exitPointerLock();
        settingsModal.classList.add("open");
      });

      document.getElementById("resumeMatchBtn").addEventListener("click", () => {
        settingsModal.classList.remove("open");
        gameState = "PLAYING";
        if (renderer.domElement.requestPointerLock) {
          try {
            renderer.domElement.requestPointerLock();
          } catch (e) {}
        }
      });

      document.getElementById("restartFromPauseBtn").addEventListener("click", startNewMatch);
      document.getElementById("returnLobbyFromPauseBtn").addEventListener("click", returnToLobby);
      document.getElementById("playAgainBtn").addEventListener("click", startNewMatch);
      document.getElementById("endToLobbyBtn").addEventListener("click", returnToLobby);

      const sensSlider = document.getElementById("sensSlider");
      const sensLabel = document.getElementById("sensLabel");
      sensSlider.addEventListener("input", () => {
        mouseSensitivity = Number(sensSlider.value);
        sensLabel.textContent = `${mouseSensitivity.toFixed(1)}x`;
      });

      document.getElementById("soundToggleCheckbox").addEventListener("change", (e) => {
        soundEnabled = e.target.checked;
      });

      window.addEventListener("keydown", (e) => {
        if (document.activeElement === inviteCodeInput) {
          if (e.code === "Enter") {
            e.preventDefault();
            joinInviteCodeBtn.click();
          }
          return;
        }
        keys[e.code] = true;
        if (e.code === "Space" && gameState === "PLAYING") e.preventDefault();

        if (gameState !== "PLAYING") return;

        if (e.code === "Digit1" || e.code === "Numpad1") switchWeapon("ak");
        if (e.code === "Digit2" || e.code === "Numpad2") switchWeapon("carbine");
        if (e.code === "Digit3" || e.code === "Numpad3") switchWeapon("pistol");
        if (e.code === "Digit4" || e.code === "Numpad4") switchWeapon("fist");
        if (e.code === "KeyR") triggerReload();
        if (e.code === "KeyF") collectNearbyLoot(3.8);
        if (e.code === "KeyP" || e.code === "Escape") {
          gameState = "PAUSED";
          mouseState.down = false;
          if (document.pointerLockElement) document.exitPointerLock();
          settingsModal.classList.add("open");
        }
      });

      window.addEventListener("keyup", (e) => {
        keys[e.code] = false;
      });

      renderer.domElement.addEventListener("mousedown", (e) => {
        if (gameState !== "PLAYING") return;
        if (e.button === 0) {
          ensureAudioContext();
          if (document.pointerLockElement !== renderer.domElement && renderer.domElement.requestPointerLock) {
            try {
              renderer.domElement.requestPointerLock();
            } catch (err) {}
          }
          mouseState.down = true;
          mouseState.dragging = true;
          mouseState.lastX = e.clientX;
          mouseState.lastY = e.clientY;
          firePlayerWeapon();
        }
      });

      window.addEventListener("mouseup", (e) => {
        if (e.button === 0) {
          mouseState.down = false;
          mouseState.dragging = false;
        }
      });

      window.addEventListener("mousemove", (e) => {
        if (gameState !== "PLAYING") return;

        const sens = 0.0022 * mouseSensitivity;
        if (document.pointerLockElement === renderer.domElement) {
          player.yaw -= e.movementX * sens;
          player.pitch = Math.max(-1.25, Math.min(1.25, player.pitch - e.movementY * sens));
        } else if (mouseState.dragging) {
          const dx = e.clientX - mouseState.lastX;
          const dy = e.clientY - mouseState.lastY;
          mouseState.lastX = e.clientX;
          mouseState.lastY = e.clientY;
          player.yaw -= dx * sens * 1.35;
          player.pitch = Math.max(-1.25, Math.min(1.25, player.pitch - dy * sens * 1.35));
        }
      });

      window.addEventListener("wheel", (e) => {
        if (gameState !== "PLAYING") return;
        const order = ["ak", "carbine", "pistol", "fist"];
        const idx = order.indexOf(player.activeWeapon);
        const nextIdx = (idx + (e.deltaY > 0 ? 1 : -1) + order.length) % order.length;
        switchWeapon(order[nextIdx]);
      });

      window.addEventListener("resize", () => {
        arenaCamera.aspect = window.innerWidth / window.innerHeight;
        arenaCamera.updateProjectionMatrix();
        updateLobbyCameraLayout();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      window.addEventListener("load", () => {
        applySkinSelection("urbano");
        syncWeaponHudAndViewmodel();
        renderLoop();
      });
    })();
