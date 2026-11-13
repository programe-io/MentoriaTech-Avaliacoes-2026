document.addEventListener('DOMContentLoaded', () => {
  // 1. Barra de progresso da teia conforme o usuário rola a página
  const progressBar = document.getElementById('webProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  });

  // 2. Filtro por capítulos no menu superior
  const filterButtons = document.querySelectorAll('.nav-btn');
  const panels = document.querySelectorAll('.comic-panel');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove estado ativo dos outros botões
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      panels.forEach((panel) => {
        const panelCat = panel.getAttribute('data-category');
        if (category === 'all' || panelCat === category) {
          panel.classList.remove('hidden-panel');
        } else {
          panel.classList.add('hidden-panel');
        }
      });
    });
  });

  // 3. Simulador Interativo Cliente-Servidor (Capítulo 7)
  const btnSimulate = document.getElementById('btnSimulate');
  const webShot = document.getElementById('webShot');
  const simStatus = document.getElementById('simStatus');
  const nodeServer = document.getElementById('nodeServer');
  const nodeClient = document.getElementById('nodeClient');

  let isSimulating = false;

  btnSimulate.addEventListener('click', () => {
    if (isSimulating) return;
    isSimulating = true;
    btnSimulate.disabled = true;

    // Passo 1: Cliente envia requisição
    simStatus.textContent = '1. Navegador enviando requisição HTTP ao servidor...';
    webShot.textContent = 'REQ HTTP 🕸️➡️';
    webShot.style.transform = 'translateX(65px)';
    nodeClient.style.background = '#ffe600';

    // Passo 2: Servidor processa
    setTimeout(() => {
      simStatus.textContent = '2. Servidor processando solicitação...';
      nodeServer.style.background = '#ff2a85';
      nodeServer.style.color = '#fffdf7';
    }, 700);

    // Passo 3: Servidor devolve os dados
    setTimeout(() => {
      simStatus.textContent = '3. Servidor enviando HTML/CSS/Dados de volta!';
      webShot.textContent = '⬅️🕸️ 200 OK';
      webShot.style.transform = 'translateX(-65px)';
    }, 1500);

    // Passo 4: Navegador exibe o site
    setTimeout(() => {
      simStatus.textContent = '4. Página exibida na tela em milissegundos! THWIP!';
      webShot.textContent = 'HTTP 🕸️';
      webShot.style.transform = 'translateX(0px)';
      nodeClient.style.background = '#00f0ff';
      nodeServer.style.background = '#00f0ff';
      nodeServer.style.color = '#111111';
      btnSimulate.disabled = false;
      isSimulating = false;
    }, 2300);
  });

  // 4. Botão Sentido Aranha (Dica rápida aleatória baseada no texto)
  const btnSpiderSense = document.getElementById('btnSpiderSense');
  const spiderTip = document.getElementById('spiderTip');

  const tips = [
    '⚡ RESUMO RÁPIDO: Internet = estrada física (cabos, roteadores). Web = os carros e páginas que trafegam nela!',
    '🌊 CURIOSIDADE: Mesmo com satélites no espaço, os cabos submarinos carregam a maior parte dos dados mundiais por terem menor latência!',
    '🧠 MEMORIZE A TRÍADE DE TIM BERNERS-LEE: HTML (estrutura), HTTP (transporte) e URL (endereço)!',
    '🛡️ ORIGEM: Tudo começou nos anos 1960 com a ARPANET, criada para manter comunicações ativas mesmo se parte da rede falhasse.'
  ];

  let lastIndex = -1;

  btnSpiderSense.addEventListener('click', () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * tips.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;
    spiderTip.style.display = 'block';
    spiderTip.textContent = tips[randomIndex];
  });
});
