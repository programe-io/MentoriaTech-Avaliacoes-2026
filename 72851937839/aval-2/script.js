// ---------- Dados dos agentes ----------
const AGENTS = {
  Duelistas: [
    { name: 'Jett', desc: 'Ágil e arriscada, abre espaço com dashes e impulsos rápidos.' },
    { name: 'Reyna', desc: 'Ganha força a cada abate e se recupera para seguir na luta.' },
    { name: 'Raze', desc: 'Usa explosivos para forçar a entrada e expulsar inimigos de cantos.' },
    { name: 'Phoenix', desc: 'Joga com fogo e consegue se curar dentro das próprias chamas.' }
  ],
  Iniciadores: [
    { name: 'Sova', desc: 'Encontra inimigos com drone e dardos de reconhecimento.' },
    { name: 'Breach', desc: 'Atordoa e abala adversários mesmo através das paredes.' },
    { name: 'Skye', desc: 'Cura aliados e envia criaturas para achar os inimigos.' },
    { name: 'Fade', desc: 'Rastreia rivais e os deixa vulneráveis para o time entrar.' }
  ],
  Controladores: [
    { name: 'Omen', desc: 'Bloqueia a visão com fumaças e surge onde ninguém espera.' },
    { name: 'Viper', desc: 'Domina áreas com cortinas e nuvens tóxicas.' },
    { name: 'Brimstone', desc: 'Posiciona fumaças à distância e apoia o time com ataques orbitais.' },
    { name: 'Astra', desc: 'Observa o mapa inteiro e coloca estrelas para controlar o espaço.' }
  ],
  Sentinelas: [
    { name: 'Sage', desc: 'Cura aliados, atrasa inimigos e cria barreiras.' },
    { name: 'Cypher', desc: 'Vigia áreas com câmeras e armadilhas.' },
    { name: 'Killjoy', desc: 'Protege o site com torretas e alarmes.' },
    { name: 'Chamber', desc: 'Atira com precisão e prepara armadilhas para segurar posições.' }
  ]
};

// ---------- Menu no celular ----------
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// ---------- Abas de funções ----------
const tabsEl = document.querySelector('.tabs');
const gridEl = document.getElementById('agent-grid');
const roles = Object.keys(AGENTS);

function showRole(role) {
  tabsEl.querySelectorAll('button').forEach((b) => {
    b.setAttribute('aria-selected', String(b.textContent === role));
  });
  gridEl.replaceChildren();
  AGENTS[role].forEach((a) => {
    const card = document.createElement('article');
    card.className = 'agent';
    const h = document.createElement('h3');
    h.textContent = a.name;
    const p = document.createElement('p');
    p.textContent = a.desc;
    card.append(h, p);
    gridEl.append(card);
  });
}

roles.forEach((role) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('role', 'tab');
  btn.textContent = role;
  btn.addEventListener('click', () => showRole(role));
  tabsEl.append(btn);
});

showRole(roles[0]);

// ---------- Sorteio de agente ----------
const singular = { Duelistas: 'Duelista', Iniciadores: 'Iniciador', Controladores: 'Controlador', Sentinelas: 'Sentinela' };
const pickName = document.getElementById('pick-name');
const pickRole = document.getElementById('pick-role');
const pickDesc = document.getElementById('pick-desc');

document.getElementById('roll').addEventListener('click', () => {
  const role = roles[Math.floor(Math.random() * roles.length)];
  const list = AGENTS[role];
  const agent = list[Math.floor(Math.random() * list.length)];
  pickName.textContent = agent.name;
  pickRole.textContent = singular[role];
  pickDesc.textContent = agent.desc;
});