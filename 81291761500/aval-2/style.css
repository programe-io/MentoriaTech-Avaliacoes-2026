const receitas = [
 {
  id:1,nome:'Macarrão cremoso',cat:'Massas',
  tempo:25,dificuldade:'Fácil',
  descricao:'Uma massa cremosa e cheia de sabor para o almoço.',
  foto:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
  porcoes:2,
  ingredientes:['200 g de macarrão','1 caixa de creme de leite','1 tomate picado','1/2 cebola picada','1 colher de azeite','Sal e queijo a gosto'],
  passos:['Cozinhe o macarrão em água fervente até ficar macio.','Em uma panela, aqueça o azeite e refogue a cebola e o tomate.','Acrescente o creme de leite e misture em fogo baixo.','Junte o macarrão escorrido, misture e finalize com queijo.']
 },
 {
  id:2,nome:'Bolo de chocolate',cat:'Bolos',
  tempo:50,dificuldade:'Fácil',
  descricao:'Bolo fofinho com sabor intenso de chocolate.',
  foto:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
  porcoes:8,
  ingredientes:['2 xícaras de farinha de trigo','1 xícara de açúcar','1 xícara de chocolate em pó','2 ovos','1 xícara de leite','1/2 xícara de óleo','1 colher de fermento'],
  passos:['Misture a farinha, o açúcar e o chocolate em uma tigela.','Adicione os ovos, o leite e o óleo; mexa até ficar homogêneo.','Acrescente o fermento e misture delicadamente.','Coloque em forma untada e asse em forno preaquecido a 180 °C por cerca de 35 a 40 minutos.']
 },
 {
  id:3,nome:'Frango assado',cat:'Carnes',
  tempo:60,dificuldade:'Médio',
  descricao:'Frango douradinho, temperado e ótimo para reunir a família.',
  foto:'https://images.unsplash.com/photo-1532634896-26909d0d4b4a?auto=format&fit=crop&w=900&q=85',
  porcoes:4,
  ingredientes:['1 kg de pedaços de frango','3 dentes de alho','Suco de 1 limão','2 colheres de azeite','1 colher de páprica','Sal e ervas a gosto'],
  passos:['Tempere o frango com alho, limão, azeite, páprica, sal e ervas.','Deixe pegar sabor por pelo menos 20 minutos na geladeira.','Disponha em uma assadeira sem amontoar.','Asse a 200 °C até ficar bem cozido e dourado, virando na metade do tempo.']
 },
 {
  id:4,nome:'Pudim de leite',cat:'Sobremesas',
  tempo:70,dificuldade:'Médio',
  descricao:'Sobremesa clássica com calda de caramelo.',
  foto:'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85',
  porcoes:8,
  ingredientes:['1 lata de leite condensado','A mesma medida de leite','3 ovos','1 xícara de açúcar para a calda','1/2 xícara de água quente'],
  passos:['Derreta o açúcar em fogo baixo até formar um caramelo.','Com cuidado, acrescente a água quente e mexa até dissolver.','Bata o leite condensado, o leite e os ovos.','Despeje na forma caramelizada e asse em banho-maria a 180 °C até firmar.','Espere esfriar e leve à geladeira antes de desenformar.']
 },
 {
  id:5,nome:'Suco de morango',cat:'Bebidas',
  tempo:10,dificuldade:'Fácil',
  descricao:'Bebida refrescante e simples para qualquer momento.',
  foto:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85',
  porcoes:2,
  ingredientes:['1 xícara de morangos lavados','400 ml de água gelada','Açúcar ou mel a gosto','Gelo a gosto'],
  passos:['Lave bem os morangos e retire as folhas.','Coloque os morangos e a água no liquidificador.','Bata até ficar homogêneo.','Adoce a gosto e sirva com gelo.']
 },
 {
  id:6,nome:'Panquecas caseiras',cat:'Massas',
  tempo:30,dificuldade:'Fácil',
  descricao:'Massa leve que combina com recheios doces ou salgados.',
  foto:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85',
  porcoes:4,
  ingredientes:['1 xícara de farinha de trigo','1 xícara de leite','1 ovo','1 colher de óleo','1 pitada de sal'],
  passos:['Bata todos os ingredientes no liquidificador até formar uma massa lisa.','Aqueça uma frigideira untada em fogo médio.','Coloque uma pequena porção de massa e espalhe.','Doure dos dois lados e repita até acabar a massa.','Recheie como preferir.']
 }
];

const imagensFallback = {
  1:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
  5:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85'
};

const favoritos = new Set(
 JSON.parse(localStorage.getItem('saborFavoritos') || '[]')
);

let categoriaAtual = 'Todas';
let termoBusca = '';
let porcoesAtuais = 1;
let receitaAtual = null;

let itens = JSON.parse(
 localStorage.getItem('saborLista') || '[]'
);

let avisoTimer;

function imagemDa(receita) {
 return imagensFallback[receita.id] || receita.foto;
}

function salvarFavoritos() {
 localStorage.setItem(
  'saborFavoritos',
  JSON.stringify([...favoritos])
 );
}

function mostrarAviso(texto) {
 const aviso = document.getElementById('aviso');
 aviso.textContent = texto;
 aviso.classList.add('visivel');

 clearTimeout(avisoTimer);

 avisoTimer = setTimeout(() => {
  aviso.classList.remove('visivel');
 }, 2200);
}

function receitaCorresponde(r) {
 const texto = [
  r.nome,
  r.cat,
  r.descricao,
  ...r.ingredientes
 ].join(' ').toLowerCase();

 return (
  (categoriaAtual === 'Todas' || r.cat === categoriaAtual) &&
  texto.includes(termoBusca)
 );
}

function criarCard(r) {
 const salvo = favoritos.has(r.id);

 return `
 <article class="receita-card">
  <div class="foto-card">
   <img
    src="${imagemDa(r)}"
    alt="${r.nome}"
    loading="lazy"
    onerror="this.src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80'"
   >

   <button
    class="favoritar ${salvo ? 'salvo' : ''}"
    data-fav="${r.id}"
    aria-label="${salvo ? 'Remover dos' : 'Adicionar aos'} favoritos"
   >${salvo ? '♥' : '♡'}</button>
  </div>

  <div class="card-corpo">
   <div class="card-meta">
    <span class="tag-cat">${r.cat}</span>
    <span>⏱ ${r.tempo} min</span>
   </div>

   <h3>${r.nome}</h3>
   <p>${r.descricao}</p>

   <button class="ver-receita" data-abrir="${r.id}">
    Ver receita →
   </button>
  </div>
 </article>`;
}

function renderizar() {
 const filtradas = receitas.filter(receitaCorresponde);

 document.getElementById('gradeReceitas').innerHTML =
  filtradas.map(criarCard).join('');

 document.getElementById('semReceitas').hidden =
  filtradas.length !== 0;

 const salvas = receitas.filter(r => favoritos.has(r.id));

 document.getElementById('gradeFavoritos').innerHTML =
  salvas.map(criarCard).join('');

 document.getElementById('semFavoritos').hidden =
  salvas.length !== 0;

 document.getElementById('contadorFav').textContent =
  `${salvas.length} salvas`;
}

// Filtros de categorias
document.getElementById('categorias').addEventListener('click', e => {
 const b = e.target.closest('[data-cat]');
 if (!b) return;

 categoriaAtual = b.dataset.cat;

 document.querySelectorAll('.categoria').forEach(x => {
  x.classList.toggle('ativa', x === b);
 });

 renderizar();
});

// Pesquisa
document.getElementById('busca').addEventListener('input', e => {
 termoBusca = e.target.value.toLowerCase().trim();
 renderizar();
});

// Favoritos e abertura de receitas
document.addEventListener('click', e => {
 const fav = e.target.closest('[data-fav]');

 if (fav) {
  const id = Number(fav.dataset.fav);

  favoritos.has(id)
   ? favoritos.delete(id)
   : favoritos.add(id);

  salvarFavoritos();
  renderizar();

  mostrarAviso(
   favoritos.has(id)
    ? 'Receita adicionada aos favoritos!'
    : 'Receita removida dos favoritos.'
  );
 }

 const abrir = e.target.closest('[data-abrir]');

 if (abrir) {
  abrirReceita(Number(abrir.dataset.abrir));
 }
});

// Abrir receita
function abrirReceita(id) {
 receitaAtual = receitas.find(r => r.id === id);

 if (!receitaAtual) return;

 porcoesAtuais = receitaAtual.porcoes;

 renderizarDetalhe();

 document.getElementById('receitaDialog').showModal();
}

// Mostrar detalhes da receita
function renderizarDetalhe() {
 const r = receitaAtual;

 document.getElementById('detalheReceita').innerHTML = `
 <img
  class="detalhe-foto"
  src="${imagemDa(r)}"
  alt="${r.nome}"
  onerror="this.src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80'"
 >

 <div class="detalhe-corpo">
  <span class="sobretitulo">
   ${r.cat.toUpperCase()} · ${r.tempo} MIN · ${r.dificuldade.toUpperCase()}
  </span>

  <h2>${r.nome}</h2>
  <p>${r.descricao}</p>

  <div class="porcoes">
   <strong>Porções:</strong>
   <button id="menosPorcao">−</button>
   <b>${porcoesAtuais}</b>
   <button id="maisPorcao">+</button>
  </div>

  <div class="detalhe-colunas">
   <div>
    <h3>Ingredientes</h3>
    <ul>
     ${r.ingredientes.map(i => `<li>${i}</li>`).join('')}
    </ul>

    <button
     class="btn btn-principal comprar-ingredientes"
     id="adicionarIngredientes"
    >
     ＋ Lista de compras
    </button>
   </div>

   <div>
    <h3>Modo de preparo</h3>
    <ol>
     ${r.passos.map(p => `<li>${p}</li>`).join('')}
    </ol>
   </div>
  </div>
 </div>`;

 document.getElementById('menosPorcao').addEventListener('click', () => {
  porcoesAtuais = Math.max(1, porcoesAtuais - 1);
  renderizarDetalhe();
 });

 document.getElementById('maisPorcao').addEventListener('click', () => {
  porcoesAtuais = Math.min(30, porcoesAtuais + 1);
  renderizarDetalhe();
 });

 document.getElementById('adicionarIngredientes').addEventListener('click', () => {
  r.ingredientes.forEach(i => {
   itens.push({
    id:Date.now() + Math.random(),
    texto:i,
    feito:false
   });
  });

  salvarLista();

  document.getElementById('receitaDialog').close();

  abrirLista();

  mostrarAviso('Ingredientes adicionados à lista!');
 });
}

// Fechar janela de receita
document.getElementById('fecharDialog').addEventListener('click', () => {
 document.getElementById('receitaDialog').close();
});

document.getElementById('receitaDialog').addEventListener('click', e => {
 if (e.target === e.currentTarget) {
  e.currentTarget.close();
 }
});

// Receita surpresa
document.getElementById('surpresaBtn').addEventListener('click', () => {
 const r = receitas[Math.floor(Math.random() * receitas.length)];
 abrirReceita(r.id);
});

// Tema claro e escuro
document.getElementById('temaBtn').addEventListener('click', () => {
 document.body.classList.toggle('escuro');

 const escuro = document.body.classList.contains('escuro');

 localStorage.setItem(
  'saborTema',
  escuro ? 'escuro' : 'claro'
 );

 document.getElementById('temaBtn').textContent =
  escuro ? '☀️' : '🌙';
});

if (localStorage.getItem('saborTema') === 'escuro') {
 document.body.classList.add('escuro');
 document.getElementById('temaBtn').textContent = '☀️';
}

// Lista de compras
function salvarLista() {
 localStorage.setItem('saborLista', JSON.stringify(itens));
 renderizarLista();
}

function renderizarLista() {
 document.getElementById('contadorLista').textContent =
  itens.filter(i => !i.feito).length;

 document.getElementById('resumoLista').textContent =
  `${itens.length} itens · ${itens.filter(i => i.feito).length} comprados`;

 document.getElementById('itensLista').innerHTML =
  itens.map(i => `
   <li class="${i.feito ? 'concluido' : ''}">
    <input
     type="checkbox"
     data-check="${i.id}"
     ${i.feito ? 'checked' : ''}
     aria-label="Marcar ${i.texto}"
    >
    <span>${escapar(i.texto)}</span>
    <button
     class="remover-item"
     data-remover="${i.id}"
     aria-label="Remover ${i.texto}"
    >×</button>
   </li>
  `).join('');
}

function escapar(s) {
 return String(s).replace(/[&<>"']/g, c => ({
  '&':'&amp;',
  '<':'&lt;',
  '>':'&gt;',
  '"':'&quot;',
  "'":'&#39;'
 }[c]));
}

function abrirLista() {
 document.getElementById('listaDialog').showModal();
}

document.getElementById('listaBtn').addEventListener('click', abrirLista);

document.getElementById('fecharLista').addEventListener('click', () => {
 document.getElementById('listaDialog').close();
});

// Adicionar item
document.getElementById('formLista').addEventListener('submit', e => {
 e.preventDefault();

 const campo = document.getElementById('novoItem');
 const texto = campo.value.trim();

 if (!texto) return;

 itens.push({
  id:Date.now() + Math.random(),
  texto,
  feito:false
 });

 campo.value = '';

 salvarLista();
 campo.focus();
});

// Marcar item comprado
document.getElementById('itensLista').addEventListener('change', e => {
 if (e.target.matches('[data-check]')) {
  const i = itens.find(
   x => String(x.id) === e.target.dataset.check
  );

  if (i) {
   i.feito = e.target.checked;
   salvarLista();
  }
 }
});

// Remover item
document.getElementById('itensLista').addEventListener('click', e => {
 const b = e.target.closest('[data-remover]');

 if (!b) return;

 itens = itens.filter(
  i => String(i.id) !== b.dataset.remover
 );

 salvarLista();
});

// Limpar lista
document.getElementById('limparLista').addEventListener('click', () => {
 if (!itens.length) return;

 itens = [];

 salvarLista();

 mostrarAviso('Lista limpa!');
});

// Inicializar o site
renderizar();
renderizarLista();