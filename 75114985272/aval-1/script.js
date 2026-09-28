const modules = [
  ['01', 'FUNDAMENTOS', 'Construa uma base sólida.', '2 + 2 = 4', 'v1'],
  ['02', 'ÁLGEBRA', 'Pense com incógnitas.', 'x + 7 = 12', 'v2'],
  ['03', 'GEOMETRIA', 'Domine formas e espaço.', '△ + □', 'v3'],
  ['04', 'FUNÇÕES', 'Entenda relações e gráficos.', 'f(x)=2x+1', 'v4'],
  ['05', 'ESTATÍSTICA', 'Transforme dados em informação.', 'μ = Σx/n', 'v5'],
  ['06', 'PROBABILIDADE', 'Calcule possibilidades.', 'P(A)=?', 'v6']
];


function cards(target) {
  document.getElementById(target).innerHTML = modules
    .map(m => `
      <div 
        class="card" 
        onclick="toast('Módulo ${m[0]} — ${m[1]} selecionado')"
      >
        <div class="visual ${m[4]}">
          <div class="formula">${m[3]}</div>
        </div>

        <div class="card-body">
          <div class="num">${m[0]} //</div>
          <h4>${m[1]}</h4>
          <p>${m[2]}</p>
        </div>
      </div>
    `)
    .join('');
}


// Criar os cards da página inicial
cards('homeGrid');

// Criar os cards da página de módulos
cards('moduleGrid');


// Criar o mapa de progresso
document.getElementById('progressGrid').innerHTML = modules
  .map((m, i) => `
    <div class="resource">
      <b>
        ${i < 4 ? '✓' : '🔒'} ${m[1]}
      </b>

      <span>
        ${
          i < 4
            ? (i === 3
                ? '68% dominado'
                : '100% dominado')
            : 'Desbloqueie avançando na trilha.'
        }
      </span>
    </div>
  `)
  .join('');


// Função para trocar de página
function show(id, btn) {

  // Esconde todas as páginas
  document
    .querySelectorAll('.page')
    .forEach(x => x.classList.remove('active'));

  // Mostra a página escolhida
  document
    .getElementById(id)
    .classList.add('active');

  // Remove o estado ativo dos botões
  document
    .querySelectorAll('.nav button')
    .forEach(x => x.classList.remove('active'));

  // Ativa o botão selecionado
  if (btn) {
    btn.classList.add('active');
  }

  // Volta para o topo
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


// Sistema de mensagens
function toast(msg) {

  const t = document.getElementById('toast');

  t.textContent = msg;

  t.classList.add('show');

  setTimeout(() => {
    t.classList.remove('show');
  }, 2200);
}


// Verificação das respostas dos desafios
function answer(v) {

  // Respostas corretas
  if (v === 6 || v === 49) {

    toast('✓ Resposta correta! +100 XP');

  } else {

    toast('Ainda não. Tente novamente!');

  }
}