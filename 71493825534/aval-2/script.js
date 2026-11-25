import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
    import {
      getFirestore,
      doc,
      getDoc,
      setDoc,
      updateDoc,
      deleteDoc,
      onSnapshot,
      collection,
      addDoc
    } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

    (function () {
      "use strict";

      if (typeof THREE === "undefined") {
        document.body.innerHTML = "<div style='padding:24px;color:#fff;font-family:sans-serif;'>Erro ao carregar Three.js. Verifique sua conexão e recarregue a página.</div>";
        return;
      }

      window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

      /* =====================================================================
       * 1. INICIALIZAÇÃO FIREBASE (AUTH ANÔNIMA + FIRESTORE REALTIME PVP)
       * ===================================================================== */
      const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
      let firebaseApp = null;
      let auth = null;
      let db = null;
      let currentUser = null;
      let firebaseReady = false;

      const firebaseStatusPill = document.getElementById("firebaseStatusPill");
      const firebaseStatusText = document.getElementById("firebaseStatusText");
      const onlineUidShortEl = document.getElementById("onlineUidShort");

      function setNetworkStatus(isOnline, label) {
        firebaseStatusPill.classList.remove("online", "offline");
        firebaseStatusPill.classList.add(isOnline ? "online" : "offline");
        firebaseStatusText.textContent = label;
      }

      async function initFirebaseMultiplayer() {
        try {
          if (typeof __firebase_config === "undefined") {
            setNetworkStatus(false, "Modo Offline (Sem Servidor)");
            return;
          }
          const firebaseConfig = JSON.parse(__firebase_config);
          firebaseApp = initializeApp(firebaseConfig);
          auth = getAuth(firebaseApp);
          db = getFirestore(firebaseApp);

          if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
          } else {
            await signInAnonymously(auth);
          }

          onAuthStateChanged(auth, (user) => {
            if (!user) return;
            currentUser = user;
            firebaseReady = true;
            setNetworkStatus(true, "Servidor Online");
            onlineUidShortEl.textContent = `ID: ${user.uid.slice(0, 6).toUpperCase()}`;
            subscribeToOpenRooms();
          });
        } catch (err) {
          console.error("Erro ao conectar Firebase:", err);
          setNetworkStatus(false, "Falha na Rede Online");
        }
      }

      /* Estado Multiplayer Online PvP */
      let lobbyMode = "online"; // "online" | "solo"
      let activeRoomId = null;
      let activeRoomData = null;
      let isRoomHost = false;
      let unsubRoomsList = null;
      let unsubRoomDoc = null;
      let unsubRoomPlayers = null;
      let unsubRoomEvents = null;

      // Mapa de jogadores remotos conectados na sala atual: uid -> { data, rig, labelSprite, labelCanvas, labelCtx, labelTex, targetPos, targetYaw, walkPhase, muzzleTimer, lastHpRendered }
      const remotePlayers = new Map();
      const processedEventIds = new Set();
      let lastSyncTimestamp = 0;

      const defaultNick = `Operador_${Math.floor(100 + Math.random() * 899)}`;
      const playerNicknameInput = document.getElementById("playerNicknameInput");
      playerNicknameInput.value = defaultNick;

      function getPlayerNickname() {
        const raw = (playerNicknameInput.value || "").trim();
        return raw.length > 0 ? raw.slice(0, 18) : defaultNick;
      }

      function roomsCollectionRef() {
        return collection(db, "artifacts", appId, "public", "data", "br_rooms");
      }

      function roomDocRef(roomId) {
        return doc(db, "artifacts", appId, "public", "data", "br_rooms", roomId);
      }

      function roomPlayersCollectionRef(roomId) {
        return collection(db, "artifacts", appId, "public", "data", `br_room_players_${roomId}`);
      }

      function roomPlayerDocRef(roomId, uid) {
        return doc(db, "artifacts", appId, "public", "data", `br_room_players_${roomId}`, uid);
      }

      function roomEventsCollectionRef(roomId) {
        return collection(db, "artifacts", appId, "public", "data", `br_room_events_${roomId}`);
      }

      /* Plaqueta 3D flutuante (Nickname + Barra de HP) acima da cabeça dos jogadores remotos */
      function createPlayerOverheadTag(nickname, hp) {
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;

        const mat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          depthTest: false
        });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(2.1, 0.52, 1);
        sprite.position.set(0, 2.52, 0);

        updatePlayerOverheadTag(ctx, texture, nickname, hp);
        return { sprite, canvas, ctx, texture };
      }

      function updatePlayerOverheadTag(ctx, texture, nickname, hp) {
        const clampedHp = Math.max(0, Math.min(100, Math.round(hp)));
        ctx.clearRect(0, 0, 256, 64);

        // Fundo pílula escuro
        ctx.fillStyle = "rgba(9, 15, 28, 0.84)";
        ctx.beginPath();
        ctx.roundRect(14, 6, 228, 52, 12);
        ctx.fill();

        ctx.strokeStyle = "rgba(34, 211, 238, 0.55)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Nickname
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 21px 'Barlow Condensed', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(nickname || "Jogador", 128, 30);

        // Barra de vida
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.fillRect(32, 39, 192, 9);

        ctx.fillStyle = clampedHp > 45 ? "#10b981" : (clampedHp > 22 ? "#f59e0b" : "#ef4444");
        ctx.fillRect(32, 39, (192 * clampedHp) / 100, 9);

        texture.needsUpdate = true;
      }

      function clearRemotePlayersFromScene() {
        for (const [, rp] of remotePlayers.entries()) {
          botGroupRoot.remove(rp.rig.root);
          if (rp.labelTex) rp.labelTex.dispose();
        }
        remotePlayers.clear();
        processedEventIds.clear();
      }

      window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });

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
        } else if (type === "scope") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(580, now);
          osc.frequency.exponentialRampToValueAtTime(760, now + 0.045);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
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
        } else if (type === "medkit") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.07);
          osc.frequency.setValueAtTime(783.99, now + 0.14);
          osc.frequency.setValueAtTime(1046.5, now + 0.21);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.34);
        }
      }

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
          range: 240,
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
          range: 205,
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
          range: 130,
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

      const container = document.getElementById("gameCanvasContainer");
      const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      const skinToneMat = new THREE.MeshStandardMaterial({ color: 0xe0ac69, roughness: 0.65 });
      const bootDarkMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.7 });
      const gunMetalDark = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.82 });
      const gunMetalGray = new THREE.MeshStandardMaterial({ color: 0x52525b, roughness: 0.3, metalness: 0.85 });
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.65 });

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
          leftBoot,
          rightBoot,
          torso,
          vest,
          leftArm,
          rightArm,
          leftShoulder,
          rightShoulder,
          leftKnee,
          rightKnee,
          leftGlove,
          rightGlove,
          helmet,
          visor,
          muzzle,
          materials: { shirtMat, vestMat, pantsMat, accentMat, visorMat }
        };
      }

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

      let ARENA_SIZE = selectedArenaSize;
      let ARENA_HALF = ARENA_SIZE / 2;

      const BASE_FOV = 72;
      const SCOPE_4X_FOV = 18;

      const arenaScene = new THREE.Scene();
      arenaScene.background = new THREE.Color(0x6ba4d9);
      arenaScene.fog = new THREE.FogExp2(0x7fb3e0, 0.0018);

      const arenaCamera = new THREE.PerspectiveCamera(BASE_FOV, window.innerWidth / window.innerHeight, 0.15, 950);
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

      const grassTexture = createGrassTexture();
      const groundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(ARENA_SIZE, ARENA_SIZE),
        new THREE.MeshStandardMaterial({ map: grassTexture, roughness: 0.9, metalness: 0.05 })
      );
      groundMesh.rotation.x = -Math.PI / 2;
      groundMesh.receiveShadow = true;
      arenaScene.add(groundMesh);

      const roadMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
      const roadNS = new THREE.Mesh(new THREE.PlaneGeometry(14, ARENA_SIZE - 12), roadMat);
      roadNS.rotation.x = -Math.PI / 2;
      roadNS.position.y = 0.03;
      roadNS.receiveShadow = true;
      arenaScene.add(roadNS);

      const roadEW = new THREE.Mesh(new THREE.PlaneGeometry(ARENA_SIZE - 12, 14), roadMat);
      roadEW.rotation.x = -Math.PI / 2;
      roadEW.position.y = 0.04;
      roadEW.receiveShadow = true;
      arenaScene.add(roadEW);

      const safeZone = {
        x: 0,
        z: 0,
        radius: ARENA_SIZE * 0.66,
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
      let lootCrates = [];
      let walkableSurfaces = [];
      let roofMedkits = [];
      let stairExclusionZones = [];

      const crateMat = new THREE.MeshStandardMaterial({ map: createCrateTexture(), roughness: 0.55, metalness: 0.15 });
      const crateGeo = new THREE.BoxGeometry(1.15, 0.85, 1.15);

      const wallMatA = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.78 });
      const wallMatB = new THREE.MeshStandardMaterial({ color: 0xd6c7b2, roughness: 0.8 });
      const brickMat = new THREE.MeshStandardMaterial({ color: 0x8c3b2b, roughness: 0.85 });
      const cabinWoodMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.82 });
      const hangarMetalMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.55, metalness: 0.45 });
      const hangarStripeMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 });
      const bunkerConcreteMat = new THREE.MeshStandardMaterial({ color: 0x52525b, roughness: 0.92 });
      const villaStuccoMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.72 });
      const terracottaMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.75 });
      const glassWindowMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.25,
        roughness: 0.15,
        metalness: 0.8,
        transparent: true,
        opacity: 0.72
      });
      const roofMatDark = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.65 });
      const parapetMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.72 });
      const floorConcreteMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.85 });
      const floorWoodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.82 });
      const stairSteelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45, metalness: 0.65 });
      const stairTreadMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.55, metalness: 0.5 });
      const stairSafetyMat = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x157d87,
        emissiveIntensity: 0.45,
        roughness: 0.3
      });
      const medkitWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.15 });
      const medkitRedMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xdc2626,
        emissiveIntensity: 0.45,
        roughness: 0.25
      });
      const medkitRingMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 });
      const foliageMatA = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.85 });
      const foliageMatB = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 });
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.88 });

      function addWallBox(cx, cz, w, d, h, mat, minY = 0) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.position.set(cx, minY + h / 2, cz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        worldGroup.add(mesh);
        wallColliders.push({
          minX: cx - w / 2,
          maxX: cx + w / 2,
          minZ: cz - d / 2,
          maxZ: cz + d / 2,
          minY: minY,
          maxY: minY + h,
          height: h
        });
      }

      /**
       * Verifica se uma posição (x, z) invade a área livre de uma escada de acesso ao telhado.
       */
      function isInsideStairExclusion(x, z, pad = 0) {
        for (let i = 0; i < stairExclusionZones.length; i++) {
          const ez = stairExclusionZones[i];
          if (
            x >= ez.minX - pad &&
            x <= ez.maxX + pad &&
            z >= ez.minZ - pad &&
            z <= ez.maxZ + pad
          ) {
            return true;
          }
        }
        return false;
      }

      /**
       * Cria um Kit Médico 3D detalhado no telhado (maleta branca com cruz vermelha, aro verde e ícone + giratório).
       */
      function spawnRoofMedkit(x, y, z) {
        const group = new THREE.Group();
        group.position.set(x, y, z);

        const floorRing = new THREE.Mesh(new THREE.RingGeometry(0.68, 0.88, 32), medkitRingMat);
        floorRing.rotation.x = -Math.PI / 2;
        floorRing.position.y = 0.015;
        group.add(floorRing);

        const caseBox = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.34, 0.66), medkitWhiteMat);
        caseBox.position.y = 0.18;
        caseBox.castShadow = true;
        caseBox.receiveShadow = true;
        group.add(caseBox);

        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.08), stairSteelMat);
        handle.position.y = 0.38;
        group.add(handle);

        const topCrossH = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.03, 0.12), medkitRedMat);
        topCrossH.position.y = 0.36;
        const topCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.36), medkitRedMat);
        topCrossV.position.y = 0.36;
        group.add(topCrossH, topCrossV);

        const frontCrossH = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.69), medkitRedMat);
        frontCrossH.position.y = 0.18;
        const frontCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.69), medkitRedMat);
        frontCrossV.position.y = 0.18;
        group.add(frontCrossH, frontCrossV);

        const floatingCross = new THREE.Group();
        floatingCross.position.y = 1.05;
        const floatBarH = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.14, 0.14), medkitRedMat);
        const floatBarV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.46, 0.14), medkitRedMat);
        floatingCross.add(floatBarH, floatBarV);
        group.add(floatingCross);

        worldGroup.add(group);

        roofMedkits.push({
          x,
          y,
          z,
          group,
          floatingCross,
          collected: false,
          bobPhase: Math.random() * Math.PI * 2
        });
      }

      /**
       * Constrói escada externa tática na fachada Sul (+Z) da casa dando acesso direto ao telhado.
       */
      function addExteriorRoofStairs(cx, cz, w, d, roofY) {
        const stairW = 2.5;
        const stairX = cx + w / 2 - 1.55;
        const zWallSouth = cz + d / 2;
        const zLandingStart = zWallSouth + 0.35;
        const zLandingEnd = zWallSouth + 2.2;
        const stairRun = 6.8;
        const zBottom = zLandingEnd + stairRun;

        const landingLen = zLandingEnd - zLandingStart;
        const landingCenterZ = (zLandingStart + zLandingEnd) / 2;
        const landingMesh = new THREE.Mesh(
          new THREE.BoxGeometry(stairW, 0.32, landingLen),
          stairSteelMat
        );
        landingMesh.position.set(stairX, roofY - 0.16, landingCenterZ);
        landingMesh.castShadow = true;
        landingMesh.receiveShadow = true;
        worldGroup.add(landingMesh);

        const supportH = roofY - 0.32;
        addWallBox(stairX - stairW / 2 + 0.14, zLandingEnd - 0.16, 0.24, 0.24, supportH, stairSteelMat, 0);
        addWallBox(stairX + stairW / 2 - 0.14, zLandingEnd - 0.16, 0.24, 0.24, supportH, stairSteelMat, 0);

        const beaconPost = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.35, 0.14), stairSteelMat);
        beaconPost.position.set(stairX + stairW / 2 - 0.12, roofY + 0.67, zLandingEnd - 0.15);
        worldGroup.add(beaconPost);

        const beaconStrip = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.18), stairSafetyMat);
        beaconStrip.position.set(stairX + stairW / 2 - 0.12, roofY + 1.15, zLandingEnd - 0.15);
        worldGroup.add(beaconStrip);

        const numSteps = 14;
        const stepRise = roofY / numSteps;
        const stepTreadDepth = stairRun / numSteps;

        for (let s = 0; s < numSteps; s++) {
          const stepTopY = (s + 1) * stepRise;
          const stepCenterZ = zBottom - (s + 0.5) * stepTreadDepth;

          const treadMesh = new THREE.Mesh(
            new THREE.BoxGeometry(stairW - 0.24, 0.14, stepTreadDepth + 0.08),
            stairTreadMat
          );
          treadMesh.position.set(stairX, stepTopY - 0.07, stepCenterZ);
          treadMesh.castShadow = true;
          treadMesh.receiveShadow = true;
          worldGroup.add(treadMesh);

          const nosingMesh = new THREE.Mesh(
            new THREE.BoxGeometry(stairW - 0.26, 0.045, 0.06),
            stairSafetyMat
          );
          nosingMesh.position.set(stairX, stepTopY - 0.02, stepCenterZ + stepTreadDepth * 0.48);
          worldGroup.add(nosingMesh);
        }

        const slopeLen = Math.hypot(stairRun, roofY);
        const slopeAngle = Math.atan2(roofY, stairRun);
        const midZ = (zLandingEnd + zBottom) / 2;
        const midY = roofY / 2;

        const sideOffsets = [-stairW / 2 + 0.08, stairW / 2 - 0.08];
        for (const ox of sideOffsets) {
          const stringer = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.34, slopeLen + 0.3), stairSteelMat);
          stringer.position.set(stairX + ox, midY - 0.12, midZ);
          stringer.rotation.x = slopeAngle;
          stringer.castShadow = true;
          worldGroup.add(stringer);

          const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, slopeLen + 0.35), stairSafetyMat);
          topRail.position.set(stairX + ox, midY + 0.92, midZ);
          topRail.rotation.x = slopeAngle;
          worldGroup.add(topRail);

          for (let p = 0; p <= 3; p++) {
            const frac = p / 3;
            const pz = zBottom - frac * stairRun;
            const py = frac * roofY;
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 0.08), stairSteelMat);
            post.position.set(stairX + ox, py + 0.46, pz);
            worldGroup.add(post);
          }

          wallColliders.push({
            minX: stairX + ox - 0.12,
            maxX: stairX + ox + 0.12,
            minZ: zLandingStart,
            maxZ: zBottom,
            minY: 0,
            maxY: roofY + 1.05,
            height: roofY + 1.05
          });
        }

        wallColliders.push({
          minX: stairX - stairW / 2 + 0.15,
          maxX: stairX + stairW / 2 - 0.15,
          minZ: zLandingStart,
          maxZ: zLandingEnd + stairRun * 0.45,
          minY: 0,
          maxY: roofY * 0.48,
          height: roofY * 0.48
        });

        walkableSurfaces.push({
          type: "rampZ",
          minX: stairX - stairW / 2 + 0.15,
          maxX: stairX + stairW / 2 - 0.15,
          minZ: zLandingEnd - 0.05,
          maxZ: zBottom + 0.25,
          zStart: zBottom,
          zEnd: zLandingEnd - 0.05,
          yStart: 0,
          yEnd: roofY
        });

        walkableSurfaces.push({
          type: "flat",
          minX: stairX - stairW / 2 + 0.1,
          maxX: stairX + stairW / 2 - 0.1,
          minZ: zLandingStart - 0.1,
          maxZ: zLandingEnd + 0.1,
          y: roofY
        });

        stairExclusionZones.push({
          minX: stairX - stairW / 2 - 1.5,
          maxX: stairX + stairW / 2 + 1.5,
          minZ: zLandingStart - 0.5,
          maxZ: zBottom + 2.5
        });

        return {
          stairX,
          stairW
        };
      }

      /**
       * Constrói 5 estilos arquitetônicos diferentes de construções entráveis:
       * - "modern": Casa Urbana Moderna com fachada em dois tons, janelas iluminadas e ar-condicionado no teto.
       * - "cabin": Cabana Rústica de Madeira com varanda frontal, colunas de tronco e telhado inclinado (duas águas).
       * - "warehouse": Galpão Industrial Metálico com faixa laranja, claraboias e vigas de aço.
       * - "bunker": Posto Militar Blindado com paredes espessas, sacos de areia, antena de radar e seteiras.
       * - "villa": Sobrado/Vila Mediterrânea com paredes claras, detalhes em terracota, pergolado e torre lateral.
       */
      function addEnterableBuilding(cx, cz, w, d, h, styleKey = "modern", hasStairs = false, hasRoofMedkit = false) {
        const styleConfigs = {
          modern: {
            wall: wallMatA,
            trim: parapetMat,
            floor: floorConcreteMat,
            roof: roofMatDark,
            wallThick: 0.55,
            doorW: 3.4
          },
          cabin: {
            wall: cabinWoodMat,
            trim: woodMat,
            floor: floorWoodMat,
            roof: terracottaMat,
            wallThick: 0.52,
            doorW: 3.2
          },
          warehouse: {
            wall: hangarMetalMat,
            trim: hangarStripeMat,
            floor: floorConcreteMat,
            roof: stairSteelMat,
            wallThick: 0.48,
            doorW: 4.4
          },
          bunker: {
            wall: bunkerConcreteMat,
            trim: roofMatDark,
            floor: floorConcreteMat,
            roof: bunkerConcreteMat,
            wallThick: 0.85,
            doorW: 3.0
          },
          villa: {
            wall: villaStuccoMat,
            trim: brickMat,
            floor: floorConcreteMat,
            roof: terracottaMat,
            wallThick: 0.58,
            doorW: 3.4
          }
        };

        const cfg = styleConfigs[styleKey] || styleConfigs.modern;
        const mat = cfg.wall;
        const t = cfg.wallThick;
        const doorW = cfg.doorW;
        const roofY = h + 0.44;

        // Piso interno personalizado por estilo
        const floorSlab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.14, d), cfg.floor);
        floorSlab.position.set(cx, 0.07, cz);
        floorSlab.receiveShadow = true;
        worldGroup.add(floorSlab);

        // Laje principal do telhado (caminhável)
        const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.8, 0.45, d + 0.8), cfg.roof);
        roof.position.set(cx, h + 0.215, cz);
        roof.castShadow = true;
        roof.receiveShadow = true;
        worldGroup.add(roof);

        wallColliders.push({
          minX: cx - (w + 0.8) / 2,
          maxX: cx + (w + 0.8) / 2,
          minZ: cz - (d + 0.8) / 2,
          maxZ: cz + (d + 0.8) / 2,
          minY: h,
          maxY: roofY - 0.05,
          height: 0.39
        });

        walkableSurfaces.push({
          type: "flat",
          minX: cx - (w + 0.7) / 2,
          maxX: cx + (w + 0.7) / 2,
          minZ: cz - (d + 0.7) / 2,
          maxZ: cz + (d + 0.7) / 2,
          y: roofY
        });

        const segW = Math.max(1.2, (w - doorW) / 2);
        const segD = Math.max(1.2, (d - doorW) / 2);

        // Paredes Norte e Sul com portas
        addWallBox(cx - (doorW / 2 + segW / 2), cz - d / 2 + t / 2, segW, t, h, mat, 0);
        addWallBox(cx + (doorW / 2 + segW / 2), cz - d / 2 + t / 2, segW, t, h, mat, 0);

        addWallBox(cx - (doorW / 2 + segW / 2), cz + d / 2 - t / 2, segW, t, h, mat, 0);
        addWallBox(cx + (doorW / 2 + segW / 2), cz + d / 2 - t / 2, segW, t, h, mat, 0);

        // Paredes Oeste e Leste com portas
        addWallBox(cx - w / 2 + t / 2, cz - (doorW / 2 + segD / 2), t, segD, h, mat, 0);
        addWallBox(cx - w / 2 + t / 2, cz + (doorW / 2 + segD / 2), t, segD, h, mat, 0);

        addWallBox(cx + w / 2 - t / 2, cz - (doorW / 2 + segD / 2), t, segD, h, mat, 0);
        addWallBox(cx + w / 2 - t / 2, cz + (doorW / 2 + segD / 2), t, segD, h, mat, 0);

        // Vergas (vigas superiores acima das 4 portas para dar acabamento arquitetônico)
        const lintelH = 0.75;
        if (h > 3.8) {
          addWallBox(cx, cz - d / 2 + t / 2, doorW, t, lintelH, cfg.trim, h - lintelH);
          addWallBox(cx, cz + d / 2 - t / 2, doorW, t, lintelH, cfg.trim, h - lintelH);
          addWallBox(cx - w / 2 + t / 2, cz, t, doorW, lintelH, cfg.trim, h - lintelH);
          addWallBox(cx + w / 2 - t / 2, cz, t, doorW, lintelH, cfg.trim, h - lintelH);
        }

        // Detalhes arquitetônicos exclusivos de cada tipo de casa
        if (styleKey === "modern") {
          // Moldura de vidro nas fachadas laterais e unidade de ar-condicionado no telhado
          const winL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.3, Math.min(3.2, segD * 0.65)), glassWindowMat);
          winL.position.set(cx - w / 2 - 0.02, h * 0.55, cz - (doorW / 2 + segD / 2));
          const winR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.3, Math.min(3.2, segD * 0.65)), glassWindowMat);
          winR.position.set(cx + w / 2 + 0.02, h * 0.55, cz + (doorW / 2 + segD / 2));
          worldGroup.add(winL, winR);

          if (!hasRoofMedkit) {
            addWallBox(cx + w * 0.22, cz - d * 0.2, 1.8, 1.4, 1.05, wallMatA, roofY);
          }
        } else if (styleKey === "cabin") {
          // Varanda frontal (Norte) com deck de madeira e pilares de tronco
          const porchDepth = 2.4;
          const porchDeck = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.22, porchDepth), floorWoodMat);
          porchDeck.position.set(cx, 0.11, cz - d / 2 - porchDepth / 2);
          porchDeck.receiveShadow = true;
          worldGroup.add(porchDeck);

          const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, 0.25, porchDepth + 0.3), terracottaMat);
          porchRoof.position.set(cx, h - 0.35, cz - d / 2 - porchDepth / 2);
          porchRoof.rotation.x = -0.14;
          porchRoof.castShadow = true;
          worldGroup.add(porchRoof);

          const postPositions = [-w / 2 + 0.4, -doorW / 2 - 0.3, doorW / 2 + 0.3, w / 2 - 0.4];
          for (const px of postPositions) {
            addWallBox(cx + px, cz - d / 2 - porchDepth + 0.25, 0.26, 0.26, h - 0.4, trunkMat, 0);
          }

          // Cumeeira inclinada decorativa se não tiver escada para o telhado
          if (!hasStairs) {
            const ridge = new THREE.Mesh(new THREE.BoxGeometry(w + 1.1, 1.35, d * 0.52), terracottaMat);
            ridge.position.set(cx, roofY + 0.55, cz);
            ridge.castShadow = true;
            worldGroup.add(ridge);
          }
        } else if (styleKey === "warehouse") {
          // Faixa industrial amarela/laranja contornando o galpão e claraboias no teto
          const stripeN = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.48, d + 0.12), hangarStripeMat);
          stripeN.position.set(cx, h * 0.68, cz);
          worldGroup.add(stripeN);

          // Pilastras metálicas externas nos 4 cantos
          const corners = [
            [-w / 2, -d / 2], [w / 2, -d / 2],
            [-w / 2, d / 2], [w / 2, d / 2]
          ];
          for (const [ox, oz] of corners) {
            addWallBox(cx + ox, cz + oz, 0.72, 0.72, h + 0.4, stairSteelMat, 0);
          }

          // Claraboias translúcidas no teto
          const sky1 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.32, 0.22, d * 0.28), glassWindowMat);
          sky1.position.set(cx - w * 0.22, roofY + 0.08, cz);
          const sky2 = new THREE.Mesh(new THREE.BoxGeometry(w * 0.32, 0.22, d * 0.28), glassWindowMat);
          sky2.position.set(cx + w * 0.22, roofY + 0.08, cz);
          worldGroup.add(sky1, sky2);
        } else if (styleKey === "bunker") {
          // Contrafortes inclinados nos cantos, barricada frontal e torre de radar
          const buttresses = [
            [-w / 2 - 0.25, -d / 2 - 0.25], [w / 2 + 0.25, -d / 2 - 0.25],
            [-w / 2 - 0.25, d / 2 + 0.25], [w / 2 + 0.25, d / 2 + 0.25]
          ];
          for (const [bx, bz] of buttresses) {
            addWallBox(cx + bx, cz + bz, 0.9, 0.9, h * 0.75, parapetMat, 0);
          }

          // Antena tática no telhado
          const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 3.4, 8), stairSteelMat);
          mast.position.set(cx + w * 0.28, roofY + 1.7, cz - d * 0.25);
          const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), medkitRedMat);
          beacon.position.set(cx + w * 0.28, roofY + 3.45, cz - d * 0.25);
          worldGroup.add(mast, beacon);
        } else if (styleKey === "villa") {
          // Molduras de tijolo aparentes nos cantos e pergolado de madeira no telhado
          const corners = [
            [-w / 2, -d / 2], [w / 2, -d / 2],
            [-w / 2, d / 2], [w / 2, d / 2]
          ];
          for (const [ox, oz] of corners) {
            addWallBox(cx + ox, cz + oz, 0.75, 0.75, h, brickMat, 0);
          }

          // Pergolado decorativo elevado no canto do telhado
          const pergolaX = cx + w * 0.2;
          const pergolaZ = cz - d * 0.18;
          addWallBox(pergolaX - 1.6, pergolaZ - 1.4, 0.22, 0.22, 2.3, brickMat, roofY);
          addWallBox(pergolaX + 1.6, pergolaZ - 1.4, 0.22, 0.22, 2.3, brickMat, roofY);
          addWallBox(pergolaX - 1.6, pergolaZ + 1.4, 0.22, 0.22, 2.3, brickMat, roofY);
          addWallBox(pergolaX + 1.6, pergolaZ + 1.4, 0.22, 0.22, 2.3, brickMat, roofY);

          for (let b = -1.4; b <= 1.4; b += 0.7) {
            const beam = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.14, 0.16), woodMat);
            beam.position.set(pergolaX, roofY + 2.35, pergolaZ + b);
            worldGroup.add(beam);
          }
        }

        if (hasStairs) {
          const stairInfo = addExteriorRoofStairs(cx, cz, w, d, roofY);

          const pH = 0.82;
          const pT = 0.34;
          const rMinX = cx - (w + 0.7) / 2;
          const rMaxX = cx + (w + 0.7) / 2;
          const rMinZ = cz - (d + 0.7) / 2;
          const rMaxZ = cz + (d + 0.7) / 2;
          const rW = rMaxX - rMinX;
          const rD = rMaxZ - rMinZ;

          addWallBox(cx, rMinZ + pT / 2, rW, pT, pH, parapetMat, roofY);
          addWallBox(rMinX + pT / 2, cz, pT, rD - pT * 2, pH, parapetMat, roofY);
          addWallBox(rMaxX - pT / 2, cz, pT, rD - pT * 2, pH, parapetMat, roofY);

          const gapLeft = stairInfo.stairX - stairInfo.stairW / 2;
          const gapRight = stairInfo.stairX + stairInfo.stairW / 2;
          const leftSpan = gapLeft - rMinX;
          const rightSpan = rMaxX - gapRight;

          if (leftSpan > 0.3) {
            addWallBox(rMinX + leftSpan / 2, rMaxZ - pT / 2, leftSpan, pT, pH, parapetMat, roofY);
          }
          if (rightSpan > 0.3) {
            addWallBox(gapRight + rightSpan / 2, rMaxZ - pT / 2, rightSpan, pT, pH, parapetMat, roofY);
          }
        }

        if (hasRoofMedkit) {
          spawnRoofMedkit(cx - w * 0.16, roofY, cz - d * 0.12);
        }

        buildingRects.push({
          minX: cx - w / 2 - 2,
          maxX: cx + w / 2 + 2,
          minZ: cz - d / 2 - 2,
          maxZ: cz + d / 2 + 2,
          cx,
          cz,
          w,
          d,
          styleKey,
          hasStairs
        });

        spawnLootCrate(cx - w * 0.24, cz - d * 0.24, false);
        spawnLootCrate(cx + w * 0.24, cz + d * 0.24, false);
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
        ARENA_SIZE = selectedArenaSize;
        ARENA_HALF = ARENA_SIZE / 2;
        const scaleRatio = ARENA_SIZE / 720;

        groundMesh.geometry.dispose();
        groundMesh.geometry = new THREE.PlaneGeometry(ARENA_SIZE, ARENA_SIZE);
        const grassTiles = Math.max(24, Math.round(ARENA_SIZE / 10));
        grassTexture.repeat.set(grassTiles, grassTiles);

        roadNS.geometry.dispose();
        roadNS.geometry = new THREE.PlaneGeometry(14, ARENA_SIZE - 12);

        roadEW.geometry.dispose();
        roadEW.geometry = new THREE.PlaneGeometry(ARENA_SIZE - 12, 14);

        arenaCamera.far = Math.max(650, ARENA_SIZE * 1.15);
        arenaCamera.updateProjectionMatrix();

        while (worldGroup.children.length > 0) {
          worldGroup.remove(worldGroup.children[0]);
        }
        wallColliders = [];
        circleObstacles = [];
        buildingRects = [];
        lootCrates = [];
        walkableSurfaces = [];
        roofMedkits = [];
        stairExclusionZones = [];

        const perimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
        addWallBox(0, -ARENA_HALF + 1, ARENA_SIZE, 2, 12, perimMat, 0);
        addWallBox(0, ARENA_HALF - 1, ARENA_SIZE, 2, 12, perimMat, 0);
        addWallBox(-ARENA_HALF + 1, 0, 2, ARENA_SIZE, 12, perimMat, 0);
        addWallBox(ARENA_HALF - 1, 0, 2, ARENA_SIZE, 12, perimMat, 0);

        const buildings = [
          // Quadrante Central (4 estilos distintos ao redor da praça)
          [-24, -22, 16, 14, 4.6, "modern", false, false],
          [24, -22, 17, 14, 4.8, "villa", true, true],
          [-24, 24, 15, 13, 4.4, "cabin", true, true],
          [24, 24, 18, 15, 4.6, "bunker", true, false],

          // Complexos Intermediários Noroeste e Nordeste
          [-98, -92, 24, 18, 5.6, "warehouse", true, false],
          [-66, -96, 15, 14, 4.4, "cabin", false, false],
          [98, -92, 22, 18, 5.2, "villa", true, false],
          [66, -96, 16, 14, 4.5, "modern", false, false],

          // Complexos Intermediários Sudoeste e Sudeste
          [-98, 92, 22, 18, 5.0, "bunker", true, false],
          [-66, 96, 16, 14, 4.5, "villa", false, false],
          [98, 92, 24, 18, 5.6, "warehouse", true, false],
          [66, 96, 15, 13, 4.4, "cabin", false, false],

          // Grandes Estruturas Cardeais
          [0, -170, 28, 20, 6.0, "warehouse", true, false],
          [0, 170, 24, 19, 5.4, "villa", false, false],
          [-180, 0, 22, 22, 5.2, "bunker", false, false],
          [180, 0, 22, 22, 5.4, "modern", false, false],

          // Postos Avançados nos Cantos do Mapa
          [-225, -215, 20, 16, 4.6, "cabin", false, false],
          [225, -215, 24, 18, 5.4, "bunker", false, false],
          [-225, 215, 24, 18, 5.6, "warehouse", false, false],
          [225, 215, 22, 18, 5.2, "villa", false, false]
        ];

        for (const [rawBx, rawBz, bw, bd, bh, styleKey, hasStairs, hasRoofMedkit] of buildings) {
          const bx = Math.round(rawBx * scaleRatio);
          const bz = Math.round(rawBz * scaleRatio);
          const southExtra = hasStairs ? 10.5 : 0;
          const northExtra = styleKey === "cabin" ? 3.0 : 0;
          if (
            Math.abs(bx) + bw / 2 > ARENA_HALF - 12 ||
            bz - bd / 2 - northExtra < -ARENA_HALF + 12 ||
            bz + bd / 2 + southExtra > ARENA_HALF - 12
          ) {
            continue;
          }
          addEnterableBuilding(bx, bz, bw, bd, bh, styleKey, hasStairs, hasRoofMedkit);
        }

        const towerMetal = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.65, metalness: 0.4 });
        const watchtowers = [
          [-56, -56], [56, -56], [-56, 56], [56, 56],
          [-132, 0], [132, 0], [0, -112], [0, 112],
          [-168, -168], [168, -168], [-168, 168], [168, 168]
        ];
        for (const [rawTx, rawTz] of watchtowers) {
          const tx = Math.round(rawTx * scaleRatio);
          const tz = Math.round(rawTz * scaleRatio);
          if (Math.abs(tx) > ARENA_HALF - 10 || Math.abs(tz) > ARENA_HALF - 10) continue;

          const offsets = [[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]];
          for (const [ox, oz] of offsets) {
            addWallBox(tx + ox, tz + oz, 0.45, 0.45, 7.6, towerMetal);
          }
          const platform = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.35, 4.5), roofMatDark);
          platform.position.set(tx, 7.6, tz);
          platform.castShadow = true;
          worldGroup.add(platform);

          const roofTop = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.3, 4.8), towerMetal);
          roofTop.position.set(tx, 10.5, tz);
          worldGroup.add(roofTop);

          spawnLootCrate(tx, tz, false);
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
        for (const [rawCx, rawCz, rotated, cMat] of containers) {
          const cx = Math.round(rawCx * scaleRatio);
          const cz = Math.round(rawCz * scaleRatio);
          const cw = rotated ? 3.2 : 8.2;
          const cd = rotated ? 8.2 : 3.2;
          if (Math.abs(cx) + cw / 2 > ARENA_HALF - 8 || Math.abs(cz) + cd / 2 > ARENA_HALF - 8) continue;
          addWallBox(cx, cz, cw, cd, 3.1, cMat);
        }

        let seed = 1337;
        const nextRand = () => {
          seed = (seed * 16807) % 2147483647;
          return (seed - 1) / 2147483646;
        };

        const trunkGeo = new THREE.CylinderGeometry(0.35, 0.52, 4.2, 8);
        const crownBottomGeo = new THREE.ConeGeometry(2.7, 4.4, 8);
        const crownTopGeo = new THREE.ConeGeometry(2.0, 3.6, 8);

        const treeCount = Math.max(55, Math.round(250 * scaleRatio * scaleRatio));
        for (let i = 0; i < treeCount; i++) {
          const tx = (nextRand() - 0.5) * (ARENA_SIZE - 32);
          const tz = (nextRand() - 0.5) * (ARENA_SIZE - 32);

          if (Math.abs(tx) < 11 || Math.abs(tz) < 11) continue;
          if (Math.hypot(tx, tz - 18) < 13) continue;
          if (isInsideStairExclusion(tx, tz, 1.5)) continue;
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
          circleObstacles.push({ x: tx, z: tz, r: 0.72, maxY: 8.5 });
        }

        const rockGeo = new THREE.DodecahedronGeometry(1.6, 0);
        const rockCount = Math.max(25, Math.round(115 * scaleRatio * scaleRatio));
        for (let i = 0; i < rockCount; i++) {
          const rx = (nextRand() - 0.5) * (ARENA_SIZE - 36);
          const rz = (nextRand() - 0.5) * (ARENA_SIZE - 36);
          if (Math.abs(rx) < 11 || Math.abs(rz) < 11) continue;
          if (Math.hypot(rx, rz - 18) < 13) continue;
          if (isInsideStairExclusion(rx, rz, 2.0)) continue;

          const scale = 0.8 + nextRand() * 1.1;
          const rock = new THREE.Mesh(rockGeo, rockMat);
          rock.scale.set(scale * 1.2, scale * 0.85, scale);
          rock.position.set(rx, 0.9 * scale, rz);
          rock.rotation.set(nextRand() * 2, nextRand() * 2, 0);
          rock.castShadow = true;
          rock.receiveShadow = true;
          worldGroup.add(rock);
          circleObstacles.push({ x: rx, z: rz, r: 1.45 * scale, maxY: 2.2 * scale });
        }
      }

      const viewmodelRoot = new THREE.Group();
      arenaCamera.add(viewmodelRoot);
      arenaScene.add(arenaCamera);

      const fpSleeveMat = new THREE.MeshStandardMaterial({ color: SKINS[selectedSkinKey].shirt, roughness: 0.65 });
      const fpGloveMat = new THREE.MeshStandardMaterial({ color: SKINS[selectedSkinKey].accent, roughness: 0.55 });

      const muzzleLight = new THREE.PointLight(0xfef08a, 0, 12);
      muzzleLight.position.set(0.25, -0.15, -1.1);
      arenaCamera.add(muzzleLight);

      /**
       * Gera texturas procedurais detalhadas inspiradas nas 3 skins fornecidas:
       * 1) AK-47: Grafite urbano preto/cinza, chamas laranja-douradas, caveira vermelha no carregador e inscrições.
       * 2) Carabina: Rifle de precisão tático titânio/areia deserto com luneta e trilhos ventilados.
       * 3) Pistola: Artefato Faraó Egípcio com bandagens douradas, escaravelho, hieróglifos e listras turquesa/carmesim.
       */
      function createWeaponSkinTextures() {
        // 1. Textura AK-47 (Grafite + Chamas + Caveira)
        const akCanvas = document.createElement("canvas");
        akCanvas.width = 512;
        akCanvas.height = 256;
        const akg = akCanvas.getContext("2d");

        akg.fillStyle = "#262629";
        akg.fillRect(0, 0, 512, 256);

        // Textura de grafite cinza/branco riscado no fundo
        akg.strokeStyle = "rgba(226, 232, 240, 0.28)";
        akg.lineWidth = 3;
        for (let i = 0; i < 42; i++) {
          akg.beginPath();
          const gx = (i * 53) % 512;
          const gy = (i * 29) % 256;
          akg.moveTo(gx, gy);
          akg.lineTo(gx + 34, gy - 14);
          akg.lineTo(gx + 52, gy + 10);
          akg.stroke();
        }

        // Chamas vibrantes laranja e amarelo-ouro ao longo do corpo
        const flameGrad = akg.createLinearGradient(0, 60, 512, 190);
        flameGrad.addColorStop(0, "#ea580c");
        flameGrad.addColorStop(0.5, "#f59e0b");
        flameGrad.addColorStop(1, "#fde047");
        akg.fillStyle = flameGrad;

        for (let f = 0; f < 8; f++) {
          const fx = f * 66;
          akg.beginPath();
          akg.moveTo(fx, 180);
          akg.quadraticCurveTo(fx + 22, 70, fx + 54, 115);
          akg.quadraticCurveTo(fx + 36, 145, fx + 64, 175);
          akg.closePath();
          akg.fill();
        }

        // Inscrições estilo street/grafite ("ENEMIES", "X")
        akg.fillStyle = "#fde047";
        akg.font = "900 24px 'Barlow Condensed', sans-serif";
        akg.fillText("ENEMIES  ✕  FRAG  ✕  GO!", 24, 46);
        akg.fillText("✕  NO MERCY  ✕", 260, 228);

        const akBodyTex = new THREE.CanvasTexture(akCanvas);

        // Textura dedicada para o carregador da AK-47 (Caveira vermelha e dentes amarelos)
        const magCanvas = document.createElement("canvas");
        magCanvas.width = 256;
        magCanvas.height = 256;
        const mg = magCanvas.getContext("2d");
        mg.fillStyle = "#f59e0b";
        mg.fillRect(0, 0, 256, 256);

        // Crânio vermelho escuro
        mg.fillStyle = "#881337";
        mg.beginPath();
        mg.ellipse(128, 115, 78, 92, 0, 0, Math.PI * 2);
        mg.fill();

        // Órbitas oculares e dentes dourados
        mg.fillStyle = "#fef08a";
        mg.beginPath();
        mg.arc(96, 82, 18, 0, Math.PI * 2);
        mg.arc(160, 82, 18, 0, Math.PI * 2);
        mg.fill();

        for (let t = 0; t < 7; t++) {
          mg.fillRect(74 + t * 16, 134, 11, 34);
        }
        const akMagTex = new THREE.CanvasTexture(magCanvas);

        // 2. Textura Carabina Tática (Titânio + Marrom Deserto + Trilhos)
        const carbCanvas = document.createElement("canvas");
        carbCanvas.width = 512;
        carbCanvas.height = 256;
        const cg = carbCanvas.getContext("2d");

        cg.fillStyle = "#4b5563";
        cg.fillRect(0, 0, 512, 256);

        // Faixa superior/inferior areia tática (FDE / Tan)
        cg.fillStyle = "#a89882";
        cg.fillRect(0, 0, 512, 68);
        cg.fillRect(0, 188, 512, 68);

        // Ranhuras metálicas do trilho Picatinny
        cg.fillStyle = "#1f2937";
        for (let r = 12; r < 500; r += 22) {
          cg.fillRect(r, 82, 12, 28);
          cg.fillRect(r, 146, 12, 28);
        }
        const carbineTex = new THREE.CanvasTexture(carbCanvas);

        // 3. Textura Pistola Faraó Egípcio (Bandagens douradas + Turquesa/Carmesim + Escaravelho)
        const pistCanvas = document.createElement("canvas");
        pistCanvas.width = 512;
        pistCanvas.height = 256;
        const pg = pistCanvas.getContext("2d");

        const goldGrad = pg.createLinearGradient(0, 0, 512, 256);
        goldGrad.addColorStop(0, "#fde047");
        goldGrad.addColorStop(0.5, "#d97706");
        goldGrad.addColorStop(1, "#92400e");
        pg.fillStyle = goldGrad;
        pg.fillRect(0, 0, 512, 256);

        // Linhas escuras de bandagens sobrepostas
        pg.strokeStyle = "#291808";
        pg.lineWidth = 4;
        for (let b = -60; b < 560; b += 44) {
          pg.beginPath();
          pg.moveTo(b, 0);
          pg.lineTo(b + 85, 256);
          pg.stroke();

          pg.beginPath();
          pg.moveTo(b + 40, 0);
          pg.lineTo(b - 55, 256);
          pg.stroke();
        }

        // Listras reais do toucado Faraó (Turquesa e Carmesim) na parte traseira
        const stripeColors = ["#0d9488", "#b91c1c"];
        for (let s = 0; s < 10; s++) {
          pg.fillStyle = stripeColors[s % 2];
          pg.fillRect(350 + s * 15, 16, 11, 110);
          pg.strokeStyle = "#fef08a";
          pg.lineWidth = 1.5;
          pg.strokeRect(350 + s * 15, 16, 11, 110);
        }

        // Escaravelho dourado central
        pg.fillStyle = "#fbbf24";
        pg.beginPath();
        pg.ellipse(275, 132, 22, 28, 0, 0, Math.PI * 2);
        pg.fill();
        pg.strokeStyle = "#451a03";
        pg.lineWidth = 3;
        pg.stroke();

        const pistolTex = new THREE.CanvasTexture(pistCanvas);

        return { akBodyTex, akMagTex, carbineTex, pistolTex };
      }

      function buildFirstPersonViewmodels() {
        const weaponTextures = createWeaponSkinTextures();

        const akGraffitiMat = new THREE.MeshStandardMaterial({
          map: weaponTextures.akBodyTex,
          roughness: 0.45,
          metalness: 0.35
        });
        const akMagSkullMat = new THREE.MeshStandardMaterial({
          map: weaponTextures.akMagTex,
          roughness: 0.42,
          metalness: 0.3
        });
        const akOrangeAccentMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0xb45309,
          emissiveIntensity: 0.25,
          roughness: 0.4
        });

        const carbineTitaniumMat = new THREE.MeshStandardMaterial({
          map: weaponTextures.carbineTex,
          roughness: 0.38,
          metalness: 0.68
        });
        const carbineTanMat = new THREE.MeshStandardMaterial({
          color: 0xa89882,
          roughness: 0.48,
          metalness: 0.35
        });
        const carbineBrownPanelMat = new THREE.MeshStandardMaterial({
          color: 0x8c6d53,
          roughness: 0.62,
          metalness: 0.15
        });

        const pistolPharaohMat = new THREE.MeshStandardMaterial({
          map: weaponTextures.pistolTex,
          roughness: 0.28,
          metalness: 0.78
        });
        const pistolGoldTrimMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          roughness: 0.25,
          metalness: 0.85
        });

        // 1. AK-47 com Skin Grafite Chamas & Caveira
        const akGroup = new THREE.Group();
        const akReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.088, 0.34), akGraffitiMat);
        akReceiver.position.set(0, 0, -0.15);
        akGroup.add(akReceiver);

        const akStock = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.098, 0.22), akGraffitiMat);
        akStock.position.set(0, -0.025, 0.11);
        akStock.rotation.x = 0.12;
        akGroup.add(akStock);

        const akHandguard = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.074, 0.22), akGraffitiMat);
        akHandguard.position.set(0, 0.005, -0.41);
        akGroup.add(akHandguard);

        const akBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.28, 10), gunMetalDark);
        akBarrel.rotation.x = Math.PI / 2;
        akBarrel.position.set(0, 0.015, -0.64);
        akGroup.add(akBarrel);

        // Detalhe laranja no tubo de gás e massa de mira
        const akGasTube = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.22, 8), akOrangeAccentMat);
        akGasTube.rotation.x = Math.PI / 2;
        akGasTube.position.set(0, 0.036, -0.54);
        akGroup.add(akGasTube);

        const akFrontSight = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.036, 0.022), akOrangeAccentMat);
        akFrontSight.position.set(0, 0.036, -0.73);
        akGroup.add(akFrontSight);

        const akMag = new THREE.Mesh(new THREE.BoxGeometry(0.050, 0.175, 0.078), akMagSkullMat);
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

        // 2. Carabina com Skin Rifle Tático Titânio/Areia + Luneta Telescópica
        const carbGroup = new THREE.Group();
        const carbBody = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.082, 0.38), carbineTitaniumMat);
        carbBody.position.set(0, 0, -0.18);
        carbGroup.add(carbBody);

        // Coronha tática areia
        const carbStock = new THREE.Mesh(new THREE.BoxGeometry(0.054, 0.095, 0.20), carbineTanMat);
        carbStock.position.set(0, -0.015, 0.10);
        carbGroup.add(carbStock);

        // Painéis laterais marrom-areia no guarda-mão
        const carbSidePanelL = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.036, 0.18), carbineBrownPanelMat);
        carbSidePanelL.position.set(0, -0.005, -0.29);
        carbGroup.add(carbSidePanelL);

        // Luneta Telescópica completa em tom titânio-areia
        const scopeTube = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.24, 14), carbineTanMat);
        scopeTube.rotation.x = Math.PI / 2;
        scopeTube.position.set(0, 0.072, -0.15);
        carbGroup.add(scopeTube);

        const scopeFrontBell = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.021, 0.065, 14), carbineTanMat);
        scopeFrontBell.rotation.x = Math.PI / 2;
        scopeFrontBell.position.set(0, 0.072, -0.26);
        carbGroup.add(scopeFrontBell);

        const scopeRearBell = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.025, 0.055, 14), carbineTanMat);
        scopeRearBell.rotation.x = Math.PI / 2;
        scopeRearBell.position.set(0, 0.072, -0.04);
        carbGroup.add(scopeRearBell);

        const scopeRing1 = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.045, 0.022), gunMetalDark);
        scopeRing1.position.set(0, 0.052, -0.20);
        const scopeRing2 = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.045, 0.022), gunMetalDark);
        scopeRing2.position.set(0, 0.052, -0.10);
        carbGroup.add(scopeRing1, scopeRing2);

        const carbBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.27, 10), gunMetalDark);
        carbBarrel.rotation.x = Math.PI / 2;
        carbBarrel.position.set(0, 0.012, -0.48);
        carbGroup.add(carbBarrel);

        const carbMag = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.145, 0.072), gunMetalGray);
        carbMag.position.set(0, -0.088, -0.22);
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

        // 3. Pistola com Skin Faraó Egípcio (Ouro, Bandagens, Turquesa e Carmesim)
        const pistolGroup = new THREE.Group();
        const pistolSlide = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.058, 0.23), pistolPharaohMat);
        pistolSlide.position.set(0, 0.022, -0.14);
        pistolGroup.add(pistolSlide);

        const pistolFrame = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.034, 0.21), pistolPharaohMat);
        pistolFrame.position.set(0, -0.015, -0.13);
        pistolGroup.add(pistolFrame);

        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.115, 0.064), pistolPharaohMat);
        pistolGrip.position.set(0, -0.065, -0.05);
        pistolGrip.rotation.x = 0.22;
        pistolGroup.add(pistolGrip);

        // Detalhes dourados na mira traseira e base do carregador
        const pistolRearSight = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.014, 0.018), pistolGoldTrimMat);
        pistolRearSight.position.set(0, 0.054, -0.04);
        const pistolMagBase = new THREE.Mesh(new THREE.BoxGeometry(0.050, 0.016, 0.068), pistolGoldTrimMat);
        pistolMagBase.position.set(0, -0.122, -0.036);
        pistolGroup.add(pistolRearSight, pistolMagBase);

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

        return {
          ak: akGroup,
          carbine: carbGroup,
          pistol: pistolGroup,
          fist: fistGroup
        };
      }

      const viewmodels = buildFirstPersonViewmodels();

      function applySkinSelection(skinKey) {
        if (!SKINS[skinKey]) return;
        selectedSkinKey = skinKey;
        const skin = SKINS[skinKey];

        lobbyCharacterRig.materials.shirtMat.color.setHex(skin.shirt);
        lobbyCharacterRig.materials.vestMat.color.setHex(skin.vest);
        lobbyCharacterRig.materials.pantsMat.color.setHex(skin.pants);
        lobbyCharacterRig.materials.accentMat.color.setHex(skin.accent);
        lobbyCharacterRig.materials.visorMat.color.setHex(skin.visor);
        lobbyCharacterRig.materials.visorMat.emissive.setHex(skin.visor);

        fpSleeveMat.color.setHex(skin.shirt);
        fpGloveMat.color.setHex(skin.accent);

        document.getElementById("selectedSkinTitle").textContent = skin.name;
        document.getElementById("activeSkinPedestalLabel").textContent = skin.name.toUpperCase();

        document.querySelectorAll(".skin-card").forEach((card) => {
          card.classList.toggle("active", card.dataset.skin === skinKey);
        });

        // Se estiver em uma sala online de espera, atualiza a skin escolhida no Firestore
        if (firebaseReady && currentUser && activeRoomId && gameState === "LOBBY") {
          updateDoc(roomPlayerDocRef(activeRoomId, currentUser.uid), {
            skin: skinKey,
            nickname: getPlayerNickname(),
            updatedAt: Date.now()
          }).catch(() => {});
        }
      }

      const player = {
        pos: new THREE.Vector3(0, 0, 18),
        velX: 0,
        velZ: 0,
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

      let gameState = "LOADING";
      let isScoped4x = false;
      let bots = [];
      let tracers = [];
      let kills = 0;
      let aliveCount = 99;
      let mouseSensitivity = 1.0;
      let hitmarkerTimer = 0;
      let killBannerTimer = 0;
      let medkitBannerTimer = 0;
      let medkitFullBannerTimer = 0;

      const keys = {};
      const mouseState = {
        down: false,
        rightDown: false,
        dragging: false,
        hasAimPosition: false,
        lastX: 0,
        lastY: 0
      };

      const scope4xOverlayEl = document.getElementById("scope4xOverlay");
      const crosshairEl = document.getElementById("crosshair");

      function activateScope4x() {
        if (!player || player.activeWeapon === "fist" || player.activeWeapon === "pistol" || player.reloading) return;
        if (!isScoped4x) {
          isScoped4x = true;
          playSfx("scope");
        }
        if (scope4xOverlayEl) scope4xOverlayEl.classList.add("active");
        if (crosshairEl) crosshairEl.style.opacity = "0";
        viewmodelRoot.visible = false;
      }

      function deactivateScope4x() {
        isScoped4x = false;
        if (scope4xOverlayEl) scope4xOverlayEl.classList.remove("active");
        if (crosshairEl) crosshairEl.style.opacity = "1";
        viewmodelRoot.visible = true;
      }

      function getSurfaceHeightAt(x, z, feetY) {
        let bestY = 0;
        for (let i = 0; i < walkableSurfaces.length; i++) {
          const s = walkableSurfaces[i];
          if (x < s.minX - 0.15 || x > s.maxX + 0.15 || z < s.minZ - 0.15 || z > s.maxZ + 0.15) continue;

          let surfY = 0;
          if (s.type === "flat") {
            surfY = s.y;
          } else if (s.type === "rampZ") {
            const t = Math.max(0, Math.min(1, (z - s.zStart) / (s.zEnd - s.zStart)));
            surfY = s.yStart + t * (s.yEnd - s.yStart);
          }

          if (surfY <= feetY + 0.58 && surfY > bestY) {
            bestY = surfY;
          }
        }
        return bestY;
      }

      function checkCollision3D(x, feetY, z, r, bodyHeight = 1.8) {
        if (x - r < -ARENA_HALF + 2.2 || x + r > ARENA_HALF - 2.2) return true;
        if (z - r < -ARENA_HALF + 2.2 || z + r > ARENA_HALF - 2.2) return true;

        for (let i = 0; i < wallColliders.length; i++) {
          const w = wallColliders[i];
          if (feetY + bodyHeight <= w.minY + 0.05 || feetY >= w.maxY - 0.05) continue;

          const cx = Math.max(w.minX, Math.min(x, w.maxX));
          const cz = Math.max(w.minZ, Math.min(z, w.maxZ));
          const dx = x - cx;
          const dz = z - cz;
          if (dx * dx + dz * dz < r * r) return true;
        }

        for (let i = 0; i < circleObstacles.length; i++) {
          const c = circleObstacles[i];
          if (feetY >= (c.maxY || 8.0) - 0.05) continue;

          const dx = x - c.x;
          const dz = z - c.z;
          const minDist = r + c.r;
          if (dx * dx + dz * dz < minDist * minDist) return true;
        }

        return false;
      }

      function checkCollision2D(x, z, r) {
        return checkCollision3D(x, 0, z, r, 1.8);
      }

      function checkRayBlocked3D(px, py, pz) {
        if (px < -ARENA_HALF + 2.0 || px > ARENA_HALF - 2.0) return true;
        if (pz < -ARENA_HALF + 2.0 || pz > ARENA_HALF - 2.0) return true;

        for (let i = 0; i < wallColliders.length; i++) {
          const w = wallColliders[i];
          if (py < w.minY || py > w.maxY) continue;
          if (px >= w.minX - 0.15 && px <= w.maxX + 0.15 && pz >= w.minZ - 0.15 && pz <= w.maxZ + 0.15) {
            return true;
          }
        }

        for (let i = 0; i < circleObstacles.length; i++) {
          const c = circleObstacles[i];
          if (py > (c.maxY || 8.0)) continue;
          const dx = px - c.x;
          const dz = pz - c.z;
          const minDist = c.r + 0.15;
          if (dx * dx + dz * dz < minDist * minDist) return true;
        }

        return false;
      }

      function segmentBlockedByWalls3D(x1, y1, z1, x2, y2, z2) {
        const dist = Math.hypot(x2 - x1, y2 - y1, z2 - z1);
        const steps = Math.max(1, Math.ceil(dist / 2.0));
        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          const sx = x1 + (x2 - x1) * t;
          const sy = y1 + (y2 - y1) * t;
          const sz = z1 + (z2 - z1) * t;
          if (checkRayBlocked3D(sx, sy, sz)) return true;
        }
        return false;
      }

      function findFreeSpawnPoint(minDistFromCenter = 24) {
        const safeMinDist = Math.min(minDistFromCenter, ARENA_HALF * 0.35);
        for (let attempt = 0; attempt < 250; attempt++) {
          const x = (Math.random() - 0.5) * (ARENA_SIZE - 32);
          const z = (Math.random() - 0.5) * (ARENA_SIZE - 32);
          if (Math.hypot(x, z - 18) < safeMinDist) continue;
          if (isInsideStairExclusion(x, z, 1.5)) continue;
          if (!checkCollision2D(x, z, 1.1)) return { x, z };
        }
        return { x: Math.min(40, ARENA_HALF * 0.5), z: Math.min(40, ARENA_HALF * 0.5) };
      }

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
      const medkitBanner = document.getElementById("medkitBanner");
      const medkitFullBanner = document.getElementById("medkitFullBanner");
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

        if (wKey === "fist") {
          deactivateScope4x();
        } else if (mouseState.rightDown && gameState === "PLAYING" && wKey !== "pistol") {
          activateScope4x();
        }

        syncWeaponHudAndViewmodel();
      }

      function triggerReload() {
        if (gameState !== "PLAYING" || player.reloading) return;
        const wKey = player.activeWeapon;
        if (wKey === "fist") return;
        const st = player.weapons[wKey];
        if (st.mag >= st.maxMag || st.reserve <= 0) return;

        deactivateScope4x();
        player.reloading = true;
        player.reloadTimer = WEAPON_DEFS[wKey].reloadTime;
        playSfx("reload");
        syncWeaponHudAndViewmodel();
      }

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

        if (aliveCount <= 1 && player.hp > 0 && gameState === "PLAYING" && lobbyMode !== "online") {
          finishMatch(true);
        }
      }

      function collectNearbyLoot(maxRadius) {
        let collectedAny = false;
        for (let i = lootCrates.length - 1; i >= 0; i--) {
          const crate = lootCrates[i];
          if (player.pos.y > 1.8) continue;
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
        if (collectedAny) {
          playSfx("loot");
          syncWeaponHudAndViewmodel();
          updateCountersHud();
        }
        return collectedAny;
      }

      /**
       * Verifica proximidade com Kits Médicos nos telhados para restaurar 100% da vida após combate.
       */
      function checkRoofMedkits(maxRadius, manualPress = false) {
        let nearFullMedkit = false;

        for (let i = 0; i < roofMedkits.length; i++) {
          const mk = roofMedkits[i];
          if (mk.collected) continue;

          const horizDist = Math.hypot(player.pos.x - mk.x, player.pos.z - mk.z);
          const vertDist = Math.abs(player.pos.y - mk.y);

          if (horizDist <= maxRadius && vertDist <= 1.65) {
            if (player.hp < player.maxHp) {
              player.hp = player.maxHp;
              mk.collected = true;
              worldGroup.remove(mk.group);
              playSfx("medkit");
              updateCountersHud();

              medkitFullBanner.style.display = "none";
              medkitFullBannerTimer = 0;
              medkitBanner.textContent = "KIT MÉDICO APLICADO! VIDA RECARREGADA (100/100)";
              medkitBanner.style.display = "block";
              medkitBannerTimer = 3.2;
              return true;
            } else {
              nearFullMedkit = true;
              if (manualPress) {
                medkitFullBannerTimer = 2.2;
              }
            }
          }
        }

        if (nearFullMedkit || medkitFullBannerTimer > 0) {
          medkitFullBanner.style.display = "block";
        } else {
          medkitFullBanner.style.display = "none";
        }

        return false;
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
        player.recoilOffset = isScoped4x ? wDef.recoilKick * 0.45 : wDef.recoilKick;
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
          if (py <= 0.05 || checkRayBlocked3D(px, py, pz)) {
            maxHitDist = d;
            break;
          }
        }

        let hitBot = null;
        let hitRemotePlayer = null;
        let closestTargetDist = maxHitDist;

        for (let i = 0; i < bots.length; i++) {
          const bot = bots[i];
          if (!bot.alive) continue;

          const toBotX = bot.x - eyeOrigin.x;
          const toBotY = 1.15 - eyeOrigin.y;
          const toBotZ = bot.z - eyeOrigin.z;

          const proj = toBotX * forwardDir.x + toBotY * forwardDir.y + toBotZ * forwardDir.z;
          if (proj < 0 || proj > closestTargetDist) continue;

          const closestX = eyeOrigin.x + forwardDir.x * proj;
          const closestY = eyeOrigin.y + forwardDir.y * proj;
          const closestZ = eyeOrigin.z + forwardDir.z * proj;

          const horizErr = Math.hypot(bot.x - closestX, bot.z - closestZ);
          const vertErr = Math.abs(1.15 - closestY);

          if (horizErr <= 0.65 && vertErr <= 1.05) {
            closestTargetDist = proj;
            hitBot = bot;
            hitRemotePlayer = null;
          }
        }

        // Detecção de acerto contra jogadores reais conectados na sala (PvP Online)
        if (lobbyMode === "online" && activeRoomId) {
          for (const [uid, rp] of remotePlayers.entries()) {
            if (!rp.data || !rp.data.alive || rp.data.hp <= 0) continue;

            const rx = rp.rig.root.position.x;
            const ry = rp.rig.root.position.y + 1.15;
            const rz = rp.rig.root.position.z;

            const toPlayerX = rx - eyeOrigin.x;
            const toPlayerY = ry - eyeOrigin.y;
            const toPlayerZ = rz - eyeOrigin.z;

            const proj = toPlayerX * forwardDir.x + toPlayerY * forwardDir.y + toPlayerZ * forwardDir.z;
            if (proj < 0 || proj > closestTargetDist) continue;

            const closestX = eyeOrigin.x + forwardDir.x * proj;
            const closestY = eyeOrigin.y + forwardDir.y * proj;
            const closestZ = eyeOrigin.z + forwardDir.z * proj;

            const horizErr = Math.hypot(rx - closestX, rz - closestZ);
            const vertErr = Math.abs(ry - closestY);

            if (horizErr <= 0.68 && vertErr <= 1.10) {
              closestTargetDist = proj;
              hitRemotePlayer = { uid, rp };
              hitBot = null;
            }
          }
        }

        const endPoint = eyeOrigin.clone().addScaledVector(forwardDir, closestTargetDist);

        if (wKey !== "fist") {
          const muzzleWorld = isScoped4x
            ? new THREE.Vector3(0, -0.14, -0.75).applyMatrix4(arenaCamera.matrixWorld)
            : new THREE.Vector3(0.24, -0.20, -0.75).applyMatrix4(arenaCamera.matrixWorld);
          spawnBulletTracer(muzzleWorld, endPoint, wDef.tracerColor);

          // Envia evento visual do disparo para os outros jogadores da sala verem
          if (lobbyMode === "online" && firebaseReady && currentUser && activeRoomId) {
            addDoc(roomEventsCollectionRef(activeRoomId), {
              type: "shot",
              fromUid: currentUser.uid,
              sx: Number(eyeOrigin.x.toFixed(2)),
              sy: Number((eyeOrigin.y - 0.35).toFixed(2)),
              sz: Number(eyeOrigin.z.toFixed(2)),
              ex: Number(endPoint.x.toFixed(2)),
              ey: Number(endPoint.y.toFixed(2)),
              ez: Number(endPoint.z.toFixed(2)),
              color: wDef.tracerColor,
              ts: Date.now()
            }).catch(() => {});
          }
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
        } else if (hitRemotePlayer) {
          hitmarkerEl.classList.add("show");
          hitmarkerTimer = 0.14;
          playSfx("hit");

          // Aplica dano PvP no jogador atingido via Firestore
          if (firebaseReady && currentUser && activeRoomId) {
            const targetUid = hitRemotePlayer.uid;
            const targetNick = hitRemotePlayer.rp.data.nickname || "Jogador";
            const currentTargetHp = Number(hitRemotePlayer.rp.data.hp || 100);
            const nextTargetHp = Math.max(0, currentTargetHp - wDef.damage);
            const isLethal = currentTargetHp > 0 && nextTargetHp <= 0;

            hitRemotePlayer.rp.data.hp = nextTargetHp;
            if (isLethal) {
              hitRemotePlayer.rp.data.alive = false;
              kills += 1;
              killFeedBanner.textContent = `VOCÊ ELIMINOU ${targetNick.toUpperCase()}! (${kills} ABATES)`;
              killFeedBanner.style.display = "block";
              killBannerTimer = 2.6;
              updateCountersHud();
            }

            addDoc(roomEventsCollectionRef(activeRoomId), {
              type: "hit",
              fromUid: currentUser.uid,
              fromNick: getPlayerNickname(),
              targetUid: targetUid,
              targetNick: targetNick,
              damage: wDef.damage,
              lethal: isLethal,
              ts: Date.now()
            }).catch(() => {});

            if (isLethal) {
              updateDoc(roomPlayerDocRef(activeRoomId, currentUser.uid), {
                kills: kills,
                updatedAt: Date.now()
              }).catch(() => {});
            }
          }
        }

        syncWeaponHudAndViewmodel();
      }

      function damagePlayer(amount, attackerNick = null) {
        if (gameState !== "PLAYING" || player.hp <= 0) return;
        player.hp = Math.max(0, player.hp - amount);
        playSfx("hurt");
        updateCountersHud();

        if (lobbyMode === "online" && firebaseReady && currentUser && activeRoomId) {
          const isDead = player.hp <= 0;
          updateDoc(roomPlayerDocRef(activeRoomId, currentUser.uid), {
            hp: Math.round(player.hp),
            alive: !isDead,
            updatedAt: Date.now()
          }).catch(() => {});

          if (isDead) {
            addDoc(roomEventsCollectionRef(activeRoomId), {
              type: "eliminated",
              victimUid: currentUser.uid,
              victimNick: getPlayerNickname(),
              killerNick: attackerNick || "Zona Segura",
              x: Number(player.pos.x.toFixed(2)),
              z: Number(player.pos.z.toFixed(2)),
              ts: Date.now()
            }).catch(() => {});
          }
        }

        if (player.hp <= 0) {
          finishMatch(false);
        }
      }

      const lobbyScreen = document.getElementById("lobbyScreen");
      const gameplayHud = document.getElementById("gameplayHud");
      const settingsModal = document.getElementById("settingsModal");
      const endMatchModal = document.getElementById("endMatchModal");

      function finishMatch(isVictory) {
        gameState = "ENDED";
        document.body.classList.remove("gameplay-mouse-hidden");
        mouseState.down = false;
        mouseState.dragging = false;
        deactivateScope4x();
        arenaCamera.fov = BASE_FOV;
        arenaCamera.updateProjectionMatrix();

        if (document.pointerLockElement) {
          document.exitPointerLock();
        }

        if (lobbyMode === "online" && isRoomHost && firebaseReady && activeRoomId) {
          updateDoc(roomDocRef(activeRoomId), {
            status: "finished",
            updatedAt: Date.now()
          }).catch(() => {});
        }

        const levelName = lobbyMode === "online" ? "Multiplayer Online PvP" : MATCH_LEVELS[selectedLevel].label;
        const skinName = SKINS[selectedSkinKey].name;
        const sizeLabel = getArenaSizeCategory(selectedArenaSize);
        document.getElementById("endMatchTitle").textContent = isVictory
          ? "VITÓRIA ROYALE! #1"
          : "ELIMINADO";
        document.getElementById("endMatchStats").textContent = isVictory
          ? `Skin: ${skinName} • Modo: ${levelName} • Sala: ${selectedArenaSize}m (${sizeLabel}) • Você venceu com ${kills} abates!`
          : `Skin: ${skinName} • Modo: ${levelName} • Sala: ${selectedArenaSize}m (${sizeLabel}) • Posição: #${aliveCount} • Abates: ${kills}.`;

        endMatchModal.classList.add("open");
      }

      function startNewMatch(onlineConfig = null) {
        const isOnlineMatch = Boolean(onlineConfig && lobbyMode === "online");
        if (isOnlineMatch && onlineConfig.arenaSize) {
          selectedArenaSize = Number(onlineConfig.arenaSize) || 720;
        }

        const lvl = MATCH_LEVELS[selectedLevel];
        buildDynamicArena();

        while (botGroupRoot.children.length > 0) {
          botGroupRoot.remove(botGroupRoot.children[0]);
        }
        clearRemotePlayersFromScene();

        for (const t of tracers) {
          arenaScene.remove(t.line);
          t.geo.dispose();
          t.mat.dispose();
        }
        tracers = [];
        bots = [];

        const onlineBotCount = isOnlineMatch && onlineConfig.fillBots ? 4 : 0;
        const totalBotsToSpawn = isOnlineMatch ? onlineBotCount : selectedOpponentCount;

        kills = 0;
        aliveCount = isOnlineMatch
          ? Math.max(1, (onlineConfig.playerCount || 1) + onlineBotCount)
          : (selectedOpponentCount + 1);
        killBannerTimer = 0;
        medkitBannerTimer = 0;
        medkitFullBannerTimer = 0;
        hitmarkerTimer = 0;
        killFeedBanner.style.display = "none";
        medkitBanner.style.display = "none";
        medkitFullBanner.style.display = "none";
        lootPromptBanner.style.display = "none";
        zoneWarningBanner.style.display = "none";

        deactivateScope4x();
        arenaCamera.fov = BASE_FOV;
        arenaCamera.updateProjectionMatrix();

        applySkinSelection(selectedSkinKey);

        // No modo Online PvP, cada jogador nasce em um ponto seguro distribuído ao redor do mapa
        if (isOnlineMatch) {
          const spawnPt = findFreeSpawnPoint(18);
          player.pos.set(spawnPt.x, 0, spawnPt.z);
          player.yaw = Math.atan2(spawnPt.x, spawnPt.z);
        } else {
          player.pos.set(0, 0, 18);
          player.yaw = 0;
        }

        player.velX = 0;
        player.velZ = 0;
        player.velY = 0;
        player.grounded = true;
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

        const zoneOffsetLimit = Math.min(70, ARENA_SIZE * 0.10);
        safeZone.x = isOnlineMatch && typeof onlineConfig.zoneX === "number"
          ? onlineConfig.zoneX
          : (Math.random() - 0.5) * zoneOffsetLimit;
        safeZone.z = isOnlineMatch && typeof onlineConfig.zoneZ === "number"
          ? onlineConfig.zoneZ
          : (Math.random() - 0.5) * zoneOffsetLimit;
        safeZone.radius = ARENA_SIZE * 0.66;
        safeZone.targetRadius = Math.max(22, ARENA_SIZE * 0.048);
        safeZone.shrinkSpeed = lvl.zoneShrinkSpeed * (ARENA_SIZE / 720);
        safeZone.damageTick = 0;
        safeZoneMesh.position.set(safeZone.x, 47.5, safeZone.z);
        safeZoneMesh.scale.set(safeZone.radius, 1, safeZone.radius);

        for (let i = 0; i < totalBotsToSpawn; i++) {
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

        if (isOnlineMatch && firebaseReady && currentUser && activeRoomId) {
          updateDoc(roomPlayerDocRef(activeRoomId, currentUser.uid), {
            x: Number(player.pos.x.toFixed(2)),
            y: Number(player.pos.y.toFixed(2)),
            z: Number(player.pos.z.toFixed(2)),
            yaw: Number(player.yaw.toFixed(3)),
            hp: 100,
            alive: true,
            kills: 0,
            skin: selectedSkinKey,
            nickname: getPlayerNickname(),
            updatedAt: Date.now()
          }).catch(() => {});
        }

        gameState = "PLAYING";
        document.body.classList.add("gameplay-mouse-hidden");
        mouseState.hasAimPosition = false;
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
        document.body.classList.remove("gameplay-mouse-hidden");
        mouseState.hasAimPosition = false;
        mouseState.down = false;
        mouseState.dragging = false;
        deactivateScope4x();
        arenaCamera.fov = BASE_FOV;
        arenaCamera.updateProjectionMatrix();

        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        clearRemotePlayersFromScene();
        gameplayHud.classList.remove("active");
        settingsModal.classList.remove("open");
        endMatchModal.classList.remove("open");
        lobbyScreen.classList.remove("hidden");
        updateLobbyCameraLayout();

        if (lobbyMode === "online" && activeRoomId && isRoomHost && firebaseReady) {
          updateDoc(roomDocRef(activeRoomId), {
            status: "waiting",
            updatedAt: Date.now()
          }).catch(() => {});
        }
      }

      const minimapCanvas = document.getElementById("minimapCanvas");
      const mctx = minimapCanvas.getContext("2d");

      function drawMinimap() {
        const w = minimapCanvas.width;
        const h = minimapCanvas.height;
        const half = w / 2;
        const scale = 0.42 * (720 / ARENA_SIZE);

        mctx.clearRect(0, 0, w, h);
        mctx.fillStyle = "#101b29";
        mctx.fillRect(0, 0, w, h);

        mctx.save();
        mctx.translate(half, half);
        mctx.rotate(player.yaw);

        mctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
        mctx.lineWidth = 1.5;
        mctx.strokeRect(
          (-player.pos.x - ARENA_HALF) * scale,
          (-player.pos.z - ARENA_HALF) * scale,
          ARENA_SIZE * scale,
          ARENA_SIZE * scale
        );

        mctx.fillStyle = "#334155";
        mctx.fillRect((-player.pos.x - 7) * scale, (-player.pos.z - ARENA_HALF) * scale, 14 * scale, ARENA_SIZE * scale);
        mctx.fillRect((-player.pos.x - ARENA_HALF) * scale, (-player.pos.z - 7) * scale, ARENA_SIZE * scale, 14 * scale);

        mctx.fillStyle = "#94a3b8";
        for (let i = 0; i < buildingRects.length; i++) {
          const b = buildingRects[i];
          const bx = (b.cx - player.pos.x - b.w / 2) * scale;
          const bz = (b.cz - player.pos.z - b.d / 2) * scale;
          if (Math.abs(bx) > w || Math.abs(bz) > h) continue;
          const styleColors = {
            modern: "#94a3b8",
            cabin: "#b45309",
            warehouse: "#d97706",
            bunker: "#64748b",
            villa: "#e2e8f0"
          };
          mctx.fillStyle = styleColors[b.styleKey] || "#94a3b8";
          mctx.fillRect(bx, bz, b.w * scale, b.d * scale);

          if (b.hasStairs) {
            const sx = (b.cx + b.w / 2 - 2.6 - player.pos.x) * scale;
            const sz = (b.cz + b.d / 2 - player.pos.z) * scale;
            mctx.fillStyle = "#22d3ee";
            mctx.fillRect(sx, sz, Math.max(2.5, 2.4 * scale), Math.max(3.5, 4.2 * scale));
          }
        }

        for (let i = 0; i < roofMedkits.length; i++) {
          const mk = roofMedkits[i];
          if (mk.collected) continue;
          const mx = (mk.x - player.pos.x) * scale;
          const mz = (mk.z - player.pos.z) * scale;
          if (mx * mx + mz * mz > half * half * 1.15) continue;

          mctx.fillStyle = "#10b981";
          mctx.beginPath();
          mctx.arc(mx, mz, 5.2, 0, Math.PI * 2);
          mctx.fill();

          mctx.fillStyle = "#ffffff";
          mctx.fillRect(mx - 3.2, mz - 1.1, 6.4, 2.2);
          mctx.fillRect(mx - 1.1, mz - 3.2, 2.2, 6.4);
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

        // Jogadores reais conectados na sala (PvP Online)
        if (lobbyMode === "online") {
          for (const [, rp] of remotePlayers.entries()) {
            if (!rp.data || !rp.data.alive || rp.data.hp <= 0) continue;
            const rx = rp.rig.root.position.x;
            const rz = rp.rig.root.position.z;
            const dx = (rx - player.pos.x) * scale;
            const dz = (rz - player.pos.z) * scale;
            if (dx * dx + dz * dz > half * half * 1.1) continue;
            mctx.fillStyle = "#f43f5e";
            mctx.beginPath();
            mctx.arc(dx, dz, 3.2, 0, Math.PI * 2);
            mctx.fill();
          }
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

        const sectorThreshold = ARENA_HALF * 0.24;
        const sx = player.pos.x < -sectorThreshold ? "OESTE" : (player.pos.x > sectorThreshold ? "LESTE" : "CENTRAL");
        const sz = player.pos.z < -sectorThreshold ? "NORTE" : (player.pos.z > sectorThreshold ? "SUL" : "");
        sectorBadge.textContent = `SETOR ${sz ? sz + "-" + sx : sx} • ${ARENA_SIZE}M`;
      }

      const LOADING_DURATION_MS = 3000;
      const loadingStartTime = performance.now();
      const loadingScreenEl = document.getElementById("loadingScreen");
      const loadingBarFillEl = document.getElementById("loadingBarFill");
      const loadingPercentTextEl = document.getElementById("loadingPercentText");
      const loadingStatusTextEl = document.getElementById("loadingStatusText");
      const loadingCountdownTextEl = document.getElementById("loadingCountdownText");

      const clock = new THREE.Clock();

      function updateArenaSimulation(dt) {
        if (gameState !== "PLAYING") return;

        const lvl = MATCH_LEVELS[selectedLevel];

        const targetFov = isScoped4x ? SCOPE_4X_FOV : BASE_FOV;
        if (Math.abs(arenaCamera.fov - targetFov) > 0.05) {
          arenaCamera.fov += (targetFov - arenaCamera.fov) * Math.min(1, dt * 18);
          arenaCamera.updateProjectionMatrix();
        } else if (arenaCamera.fov !== targetFov) {
          arenaCamera.fov = targetFov;
          arenaCamera.updateProjectionMatrix();
        }

        const scopeTurnMult = isScoped4x ? 0.35 : 1.0;
        const keyTurnSpeed = 2.1 * mouseSensitivity * scopeTurnMult;
        if (keys["KeyQ"] || keys["ArrowLeft"]) player.yaw += keyTurnSpeed * dt;
        if (keys["KeyE"] || keys["ArrowRight"]) player.yaw -= keyTurnSpeed * dt;
        if (keys["ArrowUp"]) player.pitch = Math.min(1.25, player.pitch + 1.5 * scopeTurnMult * dt);
        if (keys["ArrowDown"]) player.pitch = Math.max(-1.25, player.pitch - 1.5 * scopeTurnMult * dt);

        let moveForward = 0;
        let moveRight = 0;
        if (keys["KeyW"]) moveForward += 1;
        if (keys["KeyS"]) moveForward -= 1;
        if (keys["KeyD"]) moveRight += 1;
        if (keys["KeyA"]) moveRight -= 1;

        const isSprinting = Boolean(keys["ShiftLeft"] || keys["ShiftRight"]) && !isScoped4x;
        const moveSpeed = isScoped4x ? 5.2 : (isSprinting ? 13.5 : 8.6);

        const fwdX = -Math.sin(player.yaw);
        const fwdZ = -Math.cos(player.yaw);
        const rgtX = Math.cos(player.yaw);
        const rgtZ = -Math.sin(player.yaw);

        let vx = fwdX * moveForward + rgtX * moveRight;
        let vz = fwdZ * moveForward + rgtZ * moveRight;
        const mag = Math.hypot(vx, vz);
        if (mag > 1) { vx /= mag; vz /= mag; }
        // Inércia leve: suaviza a partida e a parada, sem alterar a velocidade máxima.
        const accel = player.grounded ? 42 : 18;
        if (mag > 0.001) {
          player.velX += vx * accel * dt;
          player.velZ += vz * accel * dt;
        } else {
          const friction = player.grounded ? 24 : 3;
          const speed = Math.hypot(player.velX, player.velZ);
          const reduced = Math.max(0, speed - friction * dt);
          if (speed > 0.0001) { player.velX *= reduced / speed; player.velZ *= reduced / speed; }
        }
        const velocity = Math.hypot(player.velX, player.velZ);
        if (velocity > moveSpeed) { player.velX *= moveSpeed / velocity; player.velZ *= moveSpeed / velocity; }

        const nextX = player.pos.x + player.velX * dt;
        if (!checkCollision3D(nextX, player.pos.y, player.pos.z, player.radius, 1.75)) player.pos.x = nextX;
        else player.velX = 0;

        const nextZ = player.pos.z + player.velZ * dt;
        if (!checkCollision3D(player.pos.x, player.pos.y, nextZ, player.radius, 1.75)) player.pos.z = nextZ;
        else player.velZ = 0;

        const supportY = getSurfaceHeightAt(player.pos.x, player.pos.z, player.pos.y);

        if (keys["Space"] && player.grounded) {
          player.velY = 8.4;
          player.grounded = false;
        }

        player.velY -= 22.0 * dt;
        player.pos.y += player.velY * dt;

        if (player.pos.y <= supportY && player.velY <= 0) {
          player.pos.y = supportY;
          player.velY = 0;
          player.grounded = true;
        } else if (player.pos.y < supportY) {
          player.pos.y = supportY;
          player.velY = 0;
          player.grounded = true;
        } else if (player.pos.y > supportY + 0.04) {
          player.grounded = false;
        }

        if (mag > 0.05 && player.grounded) {
          player.bobPhase += dt * (isSprinting ? 14.5 : 10.5);
        }

        if (player.reloading) {
          player.reloadTimer -= dt;
          if (player.reloadTimer <= 0) {
            player.reloading = false;
            player.reloadTimer = 0;
            const st = player.weapons[player.activeWeapon];
            if (st && isFinite(st.maxMag)) {
              const needed = Math.max(0, st.maxMag - st.mag);
              const transfer = Math.min(needed, st.reserve);
              st.mag += transfer;
              st.reserve -= transfer;
            }
            syncWeaponHudAndViewmodel();
            if (mouseState.rightDown && player.activeWeapon !== "fist" && player.activeWeapon !== "pistol") {
              activateScope4x();
            }
          }
        }

        if (player.fireCooldown > 0) {
          player.fireCooldown = Math.max(0, player.fireCooldown - dt);
        }

        if (player.recoilOffset > 0) {
          player.recoilOffset = Math.max(0, player.recoilOffset - dt * 0.24);
        }

        if (muzzleLight.intensity > 0) {
          muzzleLight.intensity = Math.max(0, muzzleLight.intensity - dt * 36);
        }

        const bobX = player.grounded ? Math.cos(player.bobPhase * 0.5) * 0.014 : 0;
        const bobY = player.grounded ? Math.abs(Math.sin(player.bobPhase)) * 0.016 : 0;

        arenaCamera.position.set(player.pos.x + bobX, player.pos.y + 1.7 + bobY, player.pos.z);
        arenaCamera.rotation.set(
          Math.max(-1.25, Math.min(1.25, player.pitch + player.recoilOffset * 0.35)),
          player.yaw,
          0,
          "YXZ"
        );
        arenaCamera.updateMatrixWorld();

        viewmodelRoot.position.set(-bobX * 0.6, -bobY * 0.6, player.recoilOffset * 0.55);
        viewmodelRoot.rotation.set(player.recoilOffset * 1.1, 0, 0);

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

        if (medkitBannerTimer > 0) {
          medkitBannerTimer -= dt;
          if (medkitBannerTimer <= 0) medkitBanner.style.display = "none";
        }

        if (medkitFullBannerTimer > 0) {
          medkitFullBannerTimer -= dt;
        }

        for (let i = 0; i < roofMedkits.length; i++) {
          const mk = roofMedkits[i];
          if (mk.collected) continue;
          mk.bobPhase += dt * 3.2;
          mk.floatingCross.rotation.y += dt * 2.4;
          mk.floatingCross.position.y = 1.05 + Math.sin(mk.bobPhase) * 0.12;
        }
        checkRoofMedkits(2.15, false);

        collectNearbyLoot(1.95);

        let nearLoot = false;
        if (player.pos.y <= 1.8) {
          for (let i = 0; i < lootCrates.length; i++) {
            const d = Math.hypot(player.pos.x - lootCrates[i].x, player.pos.z - lootCrates[i].z);
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

        // Sincronização em tempo real do jogador local e da zona segura no modo Online PvP
        if (lobbyMode === "online" && firebaseReady && currentUser && activeRoomId) {
          const nowMs = performance.now();
          if (nowMs - lastSyncTimestamp >= 95) {
            lastSyncTimestamp = nowMs;
            updateDoc(roomPlayerDocRef(activeRoomId, currentUser.uid), {
              x: Number(player.pos.x.toFixed(2)),
              y: Number(player.pos.y.toFixed(2)),
              z: Number(player.pos.z.toFixed(2)),
              yaw: Number(player.yaw.toFixed(3)),
              hp: Math.round(player.hp),
              alive: player.hp > 0,
              kills: kills,
              updatedAt: Date.now()
            }).catch(() => {});

            if (isRoomHost) {
              updateDoc(roomDocRef(activeRoomId), {
                zoneRadius: Number(safeZone.radius.toFixed(2)),
                updatedAt: Date.now()
              }).catch(() => {});
            }
          }
        }

        // Interpolação suave e animação 3D dos jogadores remotos na arena PvP
        if (lobbyMode === "online") {
          for (const [, rp] of remotePlayers.entries()) {
            const isAlive = rp.data && rp.data.alive && rp.data.hp > 0;
            rp.rig.root.visible = Boolean(isAlive);
            if (!isAlive) continue;

            const prevX = rp.rig.root.position.x;
            const prevZ = rp.rig.root.position.z;

            rp.rig.root.position.lerp(rp.targetPos, Math.min(1, dt * 14));

            // Interpolação angular suave
            let diffYaw = rp.targetYaw - rp.rig.root.rotation.y;
            while (diffYaw > Math.PI) diffYaw -= Math.PI * 2;
            while (diffYaw < -Math.PI) diffYaw += Math.PI * 2;
            rp.rig.root.rotation.y += diffYaw * Math.min(1, dt * 14);

            const movedDist = Math.hypot(
              rp.rig.root.position.x - prevX,
              rp.rig.root.position.z - prevZ
            );
            if (movedDist > 0.004) {
              rp.walkPhase += dt * 11.5;
              const swing = Math.sin(rp.walkPhase) * 0.5;
              rp.rig.leftLeg.rotation.x = swing;
              rp.rig.rightLeg.rotation.x = -swing;
            } else {
              rp.rig.leftLeg.rotation.x *= 0.85;
              rp.rig.rightLeg.rotation.x *= 0.85;
            }

            if (rp.muzzleTimer > 0) {
              rp.muzzleTimer -= dt;
              if (rp.muzzleTimer <= 0 && rp.rig.muzzle) {
                rp.rig.muzzle.visible = false;
              }
            }

            if (rp.lastHpRendered !== rp.data.hp || rp.lastNickRendered !== rp.data.nickname) {
              rp.lastHpRendered = rp.data.hp;
              rp.lastNickRendered = rp.data.nickname;
              updatePlayerOverheadTag(rp.labelCtx, rp.labelTex, rp.data.nickname, rp.data.hp);
            }
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
            !segmentBlockedByWalls3D(bot.x, 1.65, bot.z, player.pos.x, player.pos.y + 1.65, player.pos.z);

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
                player.pos.y + 1.35 + (Math.random() - 0.5) * 0.65,
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
          if (!checkCollision2D(nextBx, bot.z, 0.65) && !isInsideStairExclusion(nextBx, bot.z, 0.4)) {
            bot.x = nextBx;
          } else {
            bot.yaw += Math.PI * 0.5;
          }
          if (!checkCollision2D(bot.x, nextBz, 0.65) && !isInsideStairExclusion(bot.x, nextBz, 0.4)) {
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

      function renderLoop(now) {
        const dt = Math.min(clock.getDelta(), 0.05);

        if (gameState === "LOADING") {
          const elapsed = now - loadingStartTime;
          const progress = Math.min(1, Math.max(0, elapsed / LOADING_DURATION_MS));
          const pct = Math.floor(progress * 100);
          const remainingSec = Math.max(0, (LOADING_DURATION_MS - elapsed) / 1000);

          loadingBarFillEl.style.width = `${pct}%`;
          loadingPercentTextEl.textContent = `${pct}%`;
          loadingCountdownTextEl.textContent = `${remainingSec.toFixed(1)}s restantes`;

          if (elapsed < 800) {
            loadingStatusTextEl.textContent = "Carregando texturas da arena...";
          } else if (elapsed < 1600) {
            loadingStatusTextEl.textContent = "Inicializando modelos 3D e skins...";
          } else if (elapsed < 2400) {
            loadingStatusTextEl.textContent = "Sincronizando armamentos e balística...";
          } else {
            loadingStatusTextEl.textContent = "Pronto! Entrando no Hangar Tático...";
          }

          lobbyCharacterRig.root.rotation.set(0, lobbyCharacterYaw, 0);
          lobbyCharacterRig.root.position.set(0, 0.22, 0);
          renderer.render(lobbyScene, lobbyCamera);

          if (elapsed >= LOADING_DURATION_MS) {
            gameState = "LOBBY";
            lobbyScreen.classList.remove("hidden");
            updateLobbyCameraLayout();
            loadingScreenEl.classList.add("fade-out");
            setTimeout(() => {
              loadingScreenEl.classList.add("hidden");
            }, 350);
          }
        } else if (gameState === "LOBBY") {
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

      oppSlider.addEventListener("input", () => selectOpponentCount(oppSlider.value));
      document.querySelectorAll(".preset-btn").forEach((btn) => {
        btn.addEventListener("click", () => selectOpponentCount(btn.dataset.opp));
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

      /* =====================================================================
       * 2. CONTROLE DE SALAS ONLINE PVP NO LOBBY (CRIAR, ENTRAR, ESPERA, SYNC)
       * ===================================================================== */
      const tabOnlinePvpBtn = document.getElementById("tabOnlinePvpBtn");
      const tabSoloBotsBtn = document.getElementById("tabSoloBotsBtn");
      const onlinePvpSection = document.getElementById("onlinePvpSection");
      const soloBotsSection = document.getElementById("soloBotsSection");
      const roomBrowserView = document.getElementById("roomBrowserView");
      const roomStagingView = document.getElementById("roomStagingView");
      const openRoomsListEl = document.getElementById("openRoomsList");
      const openRoomsCountLabel = document.getElementById("openRoomsCountLabel");
      const stagingPlayersListEl = document.getElementById("stagingPlayersList");
      const stagingPlayersCountText = document.getElementById("stagingPlayersCountText");
      const stagingRoomCodeText = document.getElementById("stagingRoomCodeText");
      const stagingRoomMetaText = document.getElementById("stagingRoomMetaText");
      const startOnlineMatchBtn = document.getElementById("startOnlineMatchBtn");
      const waitingHostMessage = document.getElementById("waitingHostMessage");
      const fillBotsOptionRow = document.getElementById("fillBotsOptionRow");

      function switchLobbyMode(mode) {
        lobbyMode = mode;
        tabOnlinePvpBtn.classList.toggle("active", mode === "online");
        tabSoloBotsBtn.classList.toggle("active", mode === "solo");
        onlinePvpSection.classList.toggle("hidden-block", mode !== "online");
        soloBotsSection.classList.toggle("hidden-block", mode !== "solo");
      }

      tabOnlinePvpBtn.addEventListener("click", () => switchLobbyMode("online"));
      tabSoloBotsBtn.addEventListener("click", () => switchLobbyMode("solo"));

      const onlineArenaSizeSelect = document.getElementById("onlineArenaSizeSelect");
      const onlineMaxPlayersSelect = document.getElementById("onlineMaxPlayersSelect");
      const onlineRoomSizeLabel = document.getElementById("onlineRoomSizeLabel");

      function updateOnlineCreateSummary() {
        const sz = onlineArenaSizeSelect.value;
        const mp = onlineMaxPlayersSelect.value;
        onlineRoomSizeLabel.textContent = `${sz}m • ${mp} Jogadores`;
        selectArenaSize(Number(sz));
      }
      onlineArenaSizeSelect.addEventListener("change", updateOnlineCreateSummary);
      onlineMaxPlayersSelect.addEventListener("change", updateOnlineCreateSummary);

      playerNicknameInput.addEventListener("change", () => {
        if (firebaseReady && currentUser && activeRoomId) {
          updateDoc(roomPlayerDocRef(activeRoomId, currentUser.uid), {
            nickname: getPlayerNickname(),
            updatedAt: Date.now()
          }).catch(() => {});
        }
      });

      function subscribeToOpenRooms() {
        if (!firebaseReady || !db) return;
        if (unsubRoomsList) unsubRoomsList();

        unsubRoomsList = onSnapshot(
          roomsCollectionRef(),
          (snapshot) => {
            const now = Date.now();
            const rooms = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              // Ignora salas inativas há mais de 20 minutos
              if (data.updatedAt && now - data.updatedAt > 20 * 60 * 1000) return;
              rooms.push({ id: docSnap.id, ...data });
            });

            rooms.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            openRoomsCountLabel.textContent = `${rooms.length} ${rooms.length === 1 ? "sala" : "salas"}`;

            if (rooms.length === 0) {
              openRoomsListEl.innerHTML = `<div style="font-size:11.5px; color:#94a3b8; text-align:center; padding:10px 4px;">Nenhuma sala aberta no momento. Crie uma acima!</div>`;
              return;
            }

            openRoomsListEl.innerHTML = "";
            rooms.forEach((rm) => {
              const item = document.createElement("div");
              item.className = "room-item";
              const isPlaying = rm.status === "playing";
              const pCount = rm.playerCount || 1;
              const maxP = rm.maxPlayers || 12;

              item.innerHTML = `
                <div class="room-item-info">
                  <div class="room-item-title">${rm.code || rm.id} • Host: ${rm.hostNick || "Operador"}</div>
                  <div class="room-item-meta">Arena ${rm.arenaSize || 720}m • ${pCount}/${maxP} jogadores</div>
                </div>
                <span class="room-status-badge ${isPlaying ? "playing" : ""}">
                  ${isPlaying ? "EM JOGO" : "AGUARDANDO"}
                </span>
              `;
              item.addEventListener("click", () => joinOnlineRoom(rm.id));
              openRoomsListEl.appendChild(item);
            });
          },
          (err) => {
            console.error("Erro ao listar salas:", err);
          }
        );
      }

      async function createOnlineRoom() {
        if (!firebaseReady || !currentUser) {
          setNetworkStatus(false, "Aguarde conexão com servidor...");
          return;
        }

        const codeNum = Math.floor(1000 + Math.random() * 9000);
        const roomCode = `BR-${codeNum}`;
        const arenaSize = Number(onlineArenaSizeSelect.value) || 720;
        const maxPlayers = Number(onlineMaxPlayersSelect.value) || 12;
        const zoneOffsetLimit = Math.min(70, arenaSize * 0.10);

        const roomPayload = {
          code: roomCode,
          hostUid: currentUser.uid,
          hostNick: getPlayerNickname(),
          arenaSize: arenaSize,
          maxPlayers: maxPlayers,
          status: "waiting",
          playerCount: 1,
          fillBots: false,
          zoneX: Number(((Math.random() - 0.5) * zoneOffsetLimit).toFixed(2)),
          zoneZ: Number(((Math.random() - 0.5) * zoneOffsetLimit).toFixed(2)),
          zoneRadius: arenaSize * 0.66,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };

        await setDoc(roomDocRef(roomCode), roomPayload);
        await joinOnlineRoom(roomCode);
      }

      async function joinOnlineRoom(roomIdInput) {
        if (!firebaseReady || !currentUser) return;
        const cleanId = (roomIdInput || "").trim().toUpperCase();
        if (!cleanId) return;

        const rRef = roomDocRef(cleanId);
        const rSnap = await getDoc(rRef);
        if (!rSnap.exists()) {
          openRoomsCountLabel.textContent = "Sala não encontrada!";
          return;
        }

        const rData = rSnap.data();
        activeRoomId = cleanId;
        activeRoomData = rData;
        isRoomHost = rData.hostUid === currentUser.uid;

        await setDoc(roomPlayerDocRef(cleanId, currentUser.uid), {
          uid: currentUser.uid,
          nickname: getPlayerNickname(),
          skin: selectedSkinKey,
          x: 0,
          y: 0,
          z: 18,
          yaw: 0,
          hp: 100,
          alive: true,
          kills: 0,
          joinedAt: Date.now(),
          updatedAt: Date.now()
        });

        roomBrowserView.classList.add("hidden-block");
        roomStagingView.classList.remove("hidden-block");
        stagingRoomCodeText.textContent = cleanId;

        startOnlineMatchBtn.classList.toggle("hidden-block", !isRoomHost);
        fillBotsOptionRow.classList.toggle("hidden-block", !isRoomHost);
        waitingHostMessage.classList.toggle("hidden-block", isRoomHost);

        subscribeToActiveRoom(cleanId);
      }

      function subscribeToActiveRoom(roomId) {
        if (unsubRoomDoc) unsubRoomDoc();
        if (unsubRoomPlayers) unsubRoomPlayers();
        if (unsubRoomEvents) unsubRoomEvents();

        // 1. Escuta estado geral da sala (início da partida, zona segura, host)
        unsubRoomDoc = onSnapshot(
          roomDocRef(roomId),
          (snap) => {
            if (!snap.exists()) {
              leaveOnlineRoom();
              return;
            }
            const data = snap.data();
            const prevStatus = activeRoomData ? activeRoomData.status : "waiting";
            activeRoomData = data;
            isRoomHost = data.hostUid === currentUser.uid;

            stagingRoomMetaText.textContent = `Arena ${data.arenaSize || 720}m • Host: ${data.hostNick || "Operador"}`;

            if (!isRoomHost && gameState === "PLAYING" && typeof data.zoneRadius === "number") {
              safeZone.x = data.zoneX || 0;
              safeZone.z = data.zoneZ || 0;
              safeZone.radius = data.zoneRadius;
              safeZoneMesh.position.set(safeZone.x, 47.5, safeZone.z);
              safeZoneMesh.scale.set(safeZone.radius, 1, safeZone.radius);
            }

            // Quando o Host inicia a partida, todos os jogadores na sala entram juntos na arena 3D
            if (data.status === "playing" && prevStatus !== "playing" && gameState === "LOBBY") {
              ensureAudioContext();
              startNewMatch(data);
            }
          },
          (err) => console.error("Erro room snapshot:", err)
        );

        // 2. Escuta jogadores conectados na sala (Hangar + Posições 3D na Arena)
        unsubRoomPlayers = onSnapshot(
          roomPlayersCollectionRef(roomId),
          (snapshot) => {
            const playersList = [];
            const seenRemoteUids = new Set();

            snapshot.forEach((pDoc) => {
              const p = pDoc.data();
              playersList.push(p);

              if (p.uid !== currentUser.uid) {
                seenRemoteUids.add(p.uid);
                let rp = remotePlayers.get(p.uid);

                if (!rp) {
                  const skinPalette = SKINS[p.skin] || SKINS.urbano;
                  const rig = createTacticalCharacterMesh(skinPalette, true);
                  rig.root.position.set(p.x || 0, p.y || 0, p.z || 18);
                  rig.root.rotation.set(0, p.yaw || 0, 0);

                  const tag = createPlayerOverheadTag(p.nickname || "Jogador", p.hp ?? 100);
                  rig.root.add(tag.sprite);
                  botGroupRoot.add(rig.root);

                  rp = {
                    data: p,
                    rig,
                    labelSprite: tag.sprite,
                    labelCtx: tag.ctx,
                    labelTex: tag.texture,
                    targetPos: new THREE.Vector3(p.x || 0, p.y || 0, p.z || 18),
                    targetYaw: p.yaw || 0,
                    walkPhase: 0,
                    muzzleTimer: 0,
                    lastHpRendered: p.hp ?? 100,
                    lastNickRendered: p.nickname || "Jogador"
                  };
                  remotePlayers.set(p.uid, rp);
                } else {
                  rp.data = p;
                  rp.targetPos.set(p.x || 0, p.y || 0, p.z || 18);
                  rp.targetYaw = p.yaw || 0;

                  // Atualiza skin caso o jogador tenha trocado no hangar
                  const skinPalette = SKINS[p.skin];
                  if (skinPalette && rp.appliedSkin !== p.skin) {
                    rp.appliedSkin = p.skin;
                    rp.rig.materials.shirtMat.color.setHex(skinPalette.shirt);
                    rp.rig.materials.vestMat.color.setHex(skinPalette.vest);
                    rp.rig.materials.pantsMat.color.setHex(skinPalette.pants);
                    rp.rig.materials.accentMat.color.setHex(skinPalette.accent);
                    rp.rig.materials.visorMat.color.setHex(skinPalette.visor);
                    rp.rig.materials.visorMat.emissive.setHex(skinPalette.visor);
                  }
                }
              }
            });

            // Remove jogadores que saíram da sala
            for (const [uid, rp] of remotePlayers.entries()) {
              if (!seenRemoteUids.has(uid)) {
                botGroupRoot.remove(rp.rig.root);
                if (rp.labelTex) rp.labelTex.dispose();
                remotePlayers.delete(uid);
              }
            }

            // Atualiza lista visual na Sala de Espera (Hangar)
            const maxP = (activeRoomData && activeRoomData.maxPlayers) || 12;
            stagingPlayersCountText.textContent = `${playersList.length} / ${maxP}`;
            stagingPlayersListEl.innerHTML = "";

            playersList.forEach((pl) => {
              const skinObj = SKINS[pl.skin] || SKINS.urbano;
              const isHostBadge = activeRoomData && pl.uid === activeRoomData.hostUid;
              const row = document.createElement("div");
              row.className = "staging-player-row";
              row.innerHTML = `
                <span style="font-weight:700; color:#f8fafc;">
                  ${pl.nickname || "Operador"} ${isHostBadge ? "<b style='color:#22d3ee;'>[HOST]</b>" : ""}
                </span>
                <span style="color:#94a3b8; font-size:11px;">${skinObj.name}</span>
              `;
              stagingPlayersListEl.appendChild(row);
            });

            if (isRoomHost && activeRoomData && activeRoomData.playerCount !== playersList.length) {
              updateDoc(roomDocRef(roomId), {
                playerCount: playersList.length,
                updatedAt: Date.now()
              }).catch(() => {});
            }

            // Atualiza contador ALIVE e verifica Vitória Royale PvP durante a partida
            if (gameState === "PLAYING" && lobbyMode === "online") {
              const alivePlayers = playersList.filter((pl) => pl.alive && (pl.hp ?? 100) > 0);
              const aliveBots = bots.filter((b) => b.alive);
              aliveCount = alivePlayers.length + aliveBots.length;
              updateCountersHud();

              if (aliveCount <= 1 && player.hp > 0 && playersList.length >= 1) {
                if (playersList.length > 1 || aliveBots.length === 0) {
                  if (playersList.length > 1 || (activeRoomData && activeRoomData.fillBots)) {
                    finishMatch(true);
                  }
                }
              }
            }
          },
          (err) => console.error("Erro players snapshot:", err)
        );

        // 3. Escuta eventos de combate em tempo real (tiros, hits recebidos, eliminações)
        unsubRoomEvents = onSnapshot(
          roomEventsCollectionRef(roomId),
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type !== "added") return;
              const evId = change.doc.id;
              if (processedEventIds.has(evId)) return;
              processedEventIds.add(evId);

              const ev = change.doc.data();
              if (!ev || (ev.ts && Date.now() - ev.ts > 8000)) return;

              if (ev.type === "shot" && ev.fromUid !== currentUser.uid) {
                const startV = new THREE.Vector3(ev.sx, ev.sy, ev.sz);
                const endV = new THREE.Vector3(ev.ex, ev.ey, ev.ez);
                spawnBulletTracer(startV, endV, ev.color || 0xfef08a);

                const shooterRp = remotePlayers.get(ev.fromUid);
                if (shooterRp && shooterRp.rig.muzzle) {
                  shooterRp.rig.muzzle.visible = true;
                  shooterRp.muzzleTimer = 0.06;
                }
              } else if (ev.type === "hit" && ev.targetUid === currentUser.uid && gameState === "PLAYING") {
                damagePlayer(Number(ev.damage || 15), ev.fromNick || "Rival");
              } else if (ev.type === "eliminated" && gameState === "PLAYING") {
                spawnLootCrate(ev.x || 0, ev.z || 0, true);
                if (ev.victimUid !== currentUser.uid) {
                  killFeedBanner.textContent = `${(ev.killerNick || "Rival").toUpperCase()} ELIMINOU ${(ev.victimNick || "Jogador").toUpperCase()}`;
                  killFeedBanner.style.display = "block";
                  killBannerTimer = 2.6;
                }
              }
            });
          },
          (err) => console.error("Erro events snapshot:", err)
        );
      }

      async function leaveOnlineRoom() {
        const prevRoomId = activeRoomId;
        const wasHost = isRoomHost;

        if (unsubRoomDoc) { unsubRoomDoc(); unsubRoomDoc = null; }
        if (unsubRoomPlayers) { unsubRoomPlayers(); unsubRoomPlayers = null; }
        if (unsubRoomEvents) { unsubRoomEvents(); unsubRoomEvents = null; }

        clearRemotePlayersFromScene();
        activeRoomId = null;
        activeRoomData = null;
        isRoomHost = false;

        roomStagingView.classList.add("hidden-block");
        roomBrowserView.classList.remove("hidden-block");

        if (firebaseReady && currentUser && prevRoomId) {
          await deleteDoc(roomPlayerDocRef(prevRoomId, currentUser.uid)).catch(() => {});
          if (wasHost) {
            await deleteDoc(roomDocRef(prevRoomId)).catch(() => {});
          }
        }
      }

      document.getElementById("createOnlineRoomBtn").addEventListener("click", createOnlineRoom);
      document.getElementById("joinByCodeBtn").addEventListener("click", () => {
        joinOnlineRoom(document.getElementById("joinRoomCodeInput").value);
      });
      document.getElementById("leaveOnlineRoomBtn").addEventListener("click", leaveOnlineRoom);

      document.getElementById("copyRoomCodeBtn").addEventListener("click", () => {
        if (!activeRoomId) return;
        const tempInput = document.createElement("input");
        tempInput.value = activeRoomId;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        const btn = document.getElementById("copyRoomCodeBtn");
        btn.textContent = "Copiado!";
        setTimeout(() => {
          btn.textContent = "Copiar Código";
        }, 1500);
      });

      startOnlineMatchBtn.addEventListener("click", async () => {
        if (!firebaseReady || !currentUser || !activeRoomId || !isRoomHost) return;
        ensureAudioContext();
        const fillBots = document.getElementById("onlineFillBotsCheckbox").checked;

        await updateDoc(roomDocRef(activeRoomId), {
          status: "playing",
          fillBots: fillBots,
          updatedAt: Date.now()
        });

        startNewMatch({
          ...activeRoomData,
          status: "playing",
          fillBots: fillBots
        });
      });

      document.getElementById("enterMatchBtn").addEventListener("click", () => {
        ensureAudioContext();
        startNewMatch(null);
      });

      document.getElementById("mainWeaponBox").addEventListener("click", () => switchWeapon("ak"));
      document.getElementById("slotCarbine").addEventListener("click", () => switchWeapon("carbine"));
      document.getElementById("slotPistol").addEventListener("click", () => switchWeapon("pistol"));
      document.getElementById("slotFist").addEventListener("click", () => switchWeapon("fist"));

      document.getElementById("openSettingsBtn").addEventListener("click", () => {
        if (gameState !== "PLAYING") return;
        gameState = "PAUSED";
        document.body.classList.remove("gameplay-mouse-hidden");
        mouseState.down = false;
        mouseState.dragging = false;
        deactivateScope4x();
        if (document.pointerLockElement) document.exitPointerLock();
        settingsModal.classList.add("open");
      });

      document.getElementById("resumeMatchBtn").addEventListener("click", () => {
        settingsModal.classList.remove("open");
        gameState = "PLAYING";
        document.body.classList.add("gameplay-mouse-hidden");
        if (renderer.domElement.requestPointerLock) {
          try {
            renderer.domElement.requestPointerLock();
          } catch (e) {}
        }
      });

      document.getElementById("restartFromPauseBtn").addEventListener("click", () => {
        if (lobbyMode === "online" && activeRoomData) {
          startNewMatch(activeRoomData);
        } else {
          startNewMatch(null);
        }
      });
      document.getElementById("returnLobbyFromPauseBtn").addEventListener("click", returnToLobby);
      document.getElementById("playAgainBtn").addEventListener("click", () => {
        if (lobbyMode === "online" && activeRoomData) {
          startNewMatch(activeRoomData);
        } else {
          startNewMatch(null);
        }
      });
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
        keys[e.code] = true;
        if (e.code === "Space" && gameState === "PLAYING") e.preventDefault();

        if (gameState !== "PLAYING") return;

        if (e.code === "Digit1" || e.code === "Numpad1") switchWeapon("ak");
        if (e.code === "Digit2" || e.code === "Numpad2") switchWeapon("carbine");
        if (e.code === "Digit3" || e.code === "Numpad3") switchWeapon("pistol");
        if (e.code === "Digit4" || e.code === "Numpad4") switchWeapon("fist");
        if (e.code === "KeyR") triggerReload();
        if (e.code === "KeyF") {
          const healed = checkRoofMedkits(3.8, true);
          if (!healed) collectNearbyLoot(3.8);
        }
        if (e.code === "KeyP" || e.code === "Escape") {
          gameState = "PAUSED";
          document.body.classList.remove("gameplay-mouse-hidden");
          mouseState.down = false;
          deactivateScope4x();
          if (document.pointerLockElement) document.exitPointerLock();
          settingsModal.classList.add("open");
        }
      });

      window.addEventListener("keyup", (e) => {
        keys[e.code] = false;
      });

      renderer.domElement.addEventListener("mousedown", (e) => {
        if (gameState !== "PLAYING") return;
        ensureAudioContext();

        if (e.button === 0) {
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
        } else if (e.button === 2) {
          e.preventDefault();
          mouseState.rightDown = true;
          if (player.activeWeapon !== "pistol" && player.activeWeapon !== "fist") activateScope4x();
        }
      });

      window.addEventListener("mouseup", (e) => {
        if (e.button === 0) {
          mouseState.down = false;
          mouseState.dragging = false;
        } else if (e.button === 2) {
          mouseState.rightDown = false;
          deactivateScope4x();
        }
      });

      window.addEventListener("blur", () => {
        mouseState.down = false;
        mouseState.dragging = false;
        deactivateScope4x();
      });

      window.addEventListener("mousemove", (e) => {
        if (gameState !== "PLAYING") return;

        const scopeMult = isScoped4x ? 0.35 : 1.0;
        const sens = 0.0022 * mouseSensitivity * scopeMult;

        if (document.pointerLockElement === renderer.domElement) {
          player.yaw -= e.movementX * sens;
          player.pitch = Math.max(-1.25, Math.min(1.25, player.pitch - e.movementY * sens));
        } else {
          // Controle de mira sem precisar segurar/clicar o botão esquerdo.
          // No fallback sem pointer-lock, o primeiro evento apenas sincroniza a posição.
          if (!mouseState.hasAimPosition) {
            mouseState.lastX = e.clientX;
            mouseState.lastY = e.clientY;
            mouseState.hasAimPosition = true;
            return;
          }
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
        selectArenaSize(720);
        updateOnlineCreateSummary();
        syncWeaponHudAndViewmodel();
        initFirebaseMultiplayer();
        requestAnimationFrame(renderLoop);
      });
    })();
