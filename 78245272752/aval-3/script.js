// ==========================================================================
// MAIORES DO BRASIL - LÓGICA E DADOS (12 GRANDES)
// ==========================================================================

// 1. BANCO DE DADOS DOS CLUBES
const clubes = [
  {
    id: 'flamengo',
    nome: 'Flamengo',
    estado: 'RJ',
    regiao: 'sudeste',
    alcunha: 'Rubro-Negro',
    fundacao: 1895,
    titulos: { mundial: 1, libertadores: 3, brasileiro: 8, copaBrasil: 4 },
    idolos: ['Zico', 'Gabigol', 'Adílio', 'Junior', 'Arrascaeta'],
    cor: '#e11d48'
  },
  {
    id: 'palmeiras',
    nome: 'Palmeiras',
    estado: 'SP',
    regiao: 'sudeste',
    alcunha: 'Verdão',
    fundacao: 1914,
    titulos: { mundial: 0, libertadores: 3, brasileiro: 12, copaBrasil: 4 },
    idolos: ['Ademir da Guia', 'Marcos', 'Dudu', 'Raphael Veiga', 'César Sampaio'],
    cor: '#10b981'
  },
  {
    id: 'sao-paulo',
    nome: 'São Paulo',
    estado: 'SP',
    regiao: 'sudeste',
    alcunha: 'Tricolor Paulista',
    fundacao: 1930,
    titulos: { mundial: 3, libertadores: 3, brasileiro: 6, copaBrasil: 1 },
    idolos: ['Rogério Ceni', 'Raí', 'Telê Santana', 'Müller', 'Lugano'],
    cor: '#ef4444'
  },
  {
    id: 'santos',
    nome: 'Santos',
    estado: 'SP',
    regiao: 'sudeste',
    alcunha: 'Peixe',
    fundacao: 1912,
    titulos: { mundial: 2, libertadores: 3, brasileiro: 8, copaBrasil: 1 },
    idolos: ['Pelé', 'Neymar', 'Pepe', 'Coutinho', 'Giovanni'],
    cor: '#ffffff'
  },
  {
    id: 'corinthians',
    nome: 'Corinthians',
    estado: 'SP',
    regiao: 'sudeste',
    alcunha: 'Timão',
    fundacao: 1910,
    titulos: { mundial: 2, libertadores: 1, brasileiro: 7, copaBrasil: 3 },
    idolos: ['Cássio', 'Socrates', 'Marcelinho Carioca', 'Rivelino', 'Neto'],
    cor: '#ffffff'
  },
  {
    id: 'gremio',
    nome: 'Grêmio',
    estado: 'RS',
    regiao: 'sul',
    alcunha: 'Imortal Tricolor',
    fundacao: 1903,
    titulos: { mundial: 1, libertadores: 3, brasileiro: 2, copaBrasil: 5 },
    idolos: ['Renato Gaúcho', 'Geromel', 'Luan', 'Danrlei', 'Hugo De León'],
    cor: '#0284c7'
  },
  {
    id: 'cruzeiro',
    nome: 'Cruzeiro',
    estado: 'MG',
    regiao: 'sudeste',
    alcunha: 'Raposa',
    fundacao: 1921,
    titulos: { mundial: 0, libertadores: 2, brasileiro: 4, copaBrasil: 6 },
    idolos: ['Tostão', 'Alex', 'Dirceu Lopes', 'Fábio', 'Sorín'],
    cor: '#2563eb'
  },
  {
    id: 'internacional',
    nome: 'Internacional',
    estado: 'RS',
    regiao: 'sul',
    alcunha: 'Colorado',
    fundacao: 1909,
    titulos: { mundial: 1, libertadores: 2, brasileiro: 3, copaBrasil: 1 },
    idolos: ['Falcão', 'Fernandão', 'D\'Alessandro', 'Figueroa', 'Taffarel'],
    cor: '#dc2626'
  },
  {
    id: 'atletico-mg',
    nome: 'Atlético-MG',
    estado: 'MG',
    regiao: 'sudeste',
    alcunha: 'Galo',
    fundacao: 1908,
    titulos: { mundial: 0, libertadores: 1, brasileiro: 3, copaBrasil: 2 },
    idolos: ['Reinaldo', 'Ronaldinho Gaúcho', 'Hulk', 'Éder Aleixo', 'Victor'],
    cor: '#ffffff'
  },
  {
    id: 'fluminense',
    nome: 'Fluminense',
    estado: 'RJ',
    regiao: 'sudeste',
    alcunha: 'Tricolor das Laranjeiras',
    fundacao: 1902,
    titulos: { mundial: 0, libertadores: 1, brasileiro: 4, copaBrasil: 1 },
    idolos: ['Fred', 'Castilho', 'Germán Cano', 'Thiago Silva', 'Assis'],
    cor: '#059669'
  },
  {
    id: 'botafogo',
    nome: 'Botafogo',
    estado: 'RJ',
    regiao: 'sudeste',
    alcunha: 'Glorioso',
    fundacao: 1904,
    titulos: { mundial: 0, libertadores: 1, brasileiro: 2, copaBrasil: 0 },
    idolos: ['Garrincha', 'Nilton Santos', 'Jairzinho', 'Tulio Maravilha', 'Jefferson'],
    cor: '#ffffff'
  },
  {
    id: 'vasco',
    nome: 'Vasco da Gama',
    estado: 'RJ',
    regiao: 'sudeste',
    alcunha: 'Gigante da Colina',
    fundacao: 1898,
    titulos: { mundial: 0, libertadores: 1, brasileiro: 4, copaBrasil: 1 },
    idolos: ['Roberto Dinamite', 'Romário', 'Edmundo', 'Juninho Pernambucano', 'Barbosa'],
    cor: '#ffffff'
  }
];

// 2. INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  renderizarCards(clubes);
  preencherSelectsComparador();
  renderizarRanking(clubes);
  configurarEventos();
});

// 3. RENDERIZAÇÃO DOS CARDS DE CLUBES
function renderizarCards(lista) {
  const grid = document.getElementById('clubsGrid');
  if (!grid) return;

  grid.innerHTML = lista.map(clube => {
    const totalTitulos = clube.titulos.mundial + clube.titulos.libertadores + 
                         clube.titulos.brasileiro + clube.titulos.copaBrasil;

    return `
      <div class="club-card" onclick="mostrarDetalhes('${clube.id}')">
        <div class="club-header">
          <div class="club-title">
            <h3>${clube.nome}</h3>
            <p>${clube.alcunha}</p>
          </div>
          <span class="state-badge">${clube.estado}</span>
        </div>
        
        <div class="trophy-summary">
          <div class="trophy-item">
            <span class="count">${clube.titulos.mundial}</span>
            <span class="label">Mundial</span>
          </div>
          <div class="trophy-item">
            <span class="count">${clube.titulos.libertadores}</span>
            <span class="label">Libertadores</span>
          </div>
          <div class="trophy-item">
            <span class="count">${clube.titulos.brasileiro}</span>
            <span class="label">Brasileirão</span>
          </div>
          <div class="trophy-item">
            <span class="count">${clube.titulos.copaBrasil}</span>
            <span class="label">Copa Brasil</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 4. MODO COMPARADOR (X vs Y)
function preencherSelectsComparador() {
  const selectA = document.getElementById('selectClubA');
  const selectB = document.getElementById('selectClubB');
  if (!selectA || !selectB) return;

  const options = clubes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
  selectA.innerHTML = options;
  selectB.innerHTML = options;

  // Seleciona o 1º e 2º por padrão
  selectB.value = clubes[1].id;
}

function compararClubes() {
  const idA = document.getElementById('selectClubA').value;
  const idB = document.getElementById('selectClubB').value;

  const clubeA = clubes.find(c => c.id === idA);
  const clubeB = clubes.find(c => c.id === idB);

  const containerResult = document.getElementById('comparatorResult');
  if (!containerResult) return;

  containerResult.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
      <div style="text-align: center; background: var(--bg-element); padding: 20px; border-radius: 10px;">
        <h3>${clubeA.nome}</h3>
        <p>🏆 Mundiais: <strong>${clubeA.titulos.mundial}</strong></p>
        <p>🌎 Libertadores: <strong>${clubeA.titulos.libertadores}</strong></p>
        <p>🇧🇷 Brasileirões: <strong>${clubeA.titulos.brasileiro}</strong></p>
        <p>🥇 Copas do Brasil: <strong>${clubeA.titulos.copaBrasil}</strong></p>
      </div>

      <div style="text-align: center; background: var(--bg-element); padding: 20px; border-radius: 10px;">
        <h3>${clubeB.nome}</h3>
        <p>🏆 Mundiais: <strong>${clubeB.titulos.mundial}</strong></p>
        <p>🌎 Libertadores: <strong>${clubeB.titulos.libertadores}</strong></p>
        <p>🇧🇷 Brasileirões: <strong>${clubeB.titulos.brasileiro}</strong></p>
        <p>🥇 Copas do Brasil: <strong>${clubeB.titulos.copaBrasil}</strong></p>
      </div>
    </div>
  `;
}

// 5. FILTROS E BUSCA
function configurarEventos() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const termo = e.target.value.toLowerCase();
      const filtrados = clubes.filter(c => 
        c.nome.toLowerCase().includes(termo) || 
        c.estado.toLowerCase().includes(termo)
      );
      renderizarCards(filtrados);
    });
  }
}

// 6. DETALHES NO MODAL OU CONSOLE
function mostrarDetalhes(id) {
  const clube = clubes.find(c => c.id === id);
  alert(`🏛️ ${clube.nome}\nFundação: ${clube.fundacao}\nÍdolos: ${clube.idolos.join(', ')}`);
}