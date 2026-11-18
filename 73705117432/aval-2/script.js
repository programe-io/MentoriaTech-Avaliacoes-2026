// ===== Configuração =====
const NOMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const NOMES_LONGOS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const META_AGUA = 2000;
const PASSO_AGUA = 250;
const CHAVE = 'prumo-dados';
const SUGESTOES = [
  ['Agachamento', 'Força', 'series', 3, 12], ['Flexão de braço', 'Força', 'series', 3, 10],
  ['Prancha', 'Core', 'minutos', 2], ['Corrida leve', 'Cardio', 'minutos', 25],
  ['Caminhada', 'Cardio', 'minutos', 30], ['Alongamento', 'Mobilidade', 'minutos', 10],
  ['Abdominal', 'Core', 'series', 3, 15], ['Yoga', 'Mobilidade', 'minutos', 20]
];

// ===== Estado =====
const $ = (id) => document.getElementById(id);
let dados = carregar();
let diaSel = (new Date().getDay() + 6) % 7; // 0 = segunda

function padrao() {
  const ex = (nome, categoria, medida, a, b) =>
    ({ id: crypto.randomUUID(), nome, categoria, medida, series: a, reps: b, minutos: a });
  return {
    plano: [
      [ex('Agachamento', 'Força', 'series', 3, 12), ex('Flexão de braço', 'Força', 'series', 3, 10), ex('Alongamento', 'Mobilidade', 'minutos', 10)],
      [ex('Corrida leve', 'Cardio', 'minutos', 25), ex('Prancha', 'Core', 'minutos', 2)],
      [ex('Abdominal', 'Core', 'series', 3, 15), ex('Yoga', 'Mobilidade', 'minutos', 20)],
      [ex('Agachamento', 'Força', 'series', 3, 12), ex('Caminhada', 'Cardio', 'minutos', 30)],
      [ex('Flexão de braço', 'Força', 'series', 3, 10), ex('Prancha', 'Core', 'minutos', 2), ex('Alongamento', 'Mobilidade', 'minutos', 10)],
      [ex('Caminhada', 'Cardio', 'minutos', 40)],
      [ex('Yoga', 'Mobilidade', 'minutos', 20)]
    ],
    feitos: {},  // { 'AAAA-MM-DD': [ids concluídos] }
    agua: {},    // { 'AAAA-MM-DD': ml }
    sono: {}     // { 'AAAA-MM-DD': horas }
  };
}
function carregar() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || padrao(); } catch { return padrao(); }
}
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(dados)); } catch {}
}

// ===== Datas: cada dia da semana atual tem uma data real =====
function dataDoDia(i) {
  const d = new Date();
  const hoje = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - hoje + i);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return { chave: `${d.getFullYear()}-${mm}-${dd}`, numero: d.getDate() };
}
const chaveSel = () => dataDoDia(diaSel).chave;
const concluidos = (i) => dados.feitos[dataDoDia(i).chave] || [];
const progresso = (i) => {
  const total = dados.plano[i].length;
  const ok = dados.plano[i].filter((e) => concluidos(i).includes(e.id)).length;
  return { total, ok, pct: total ? Math.round((ok / total) * 100) : 0 };
};
const detalhe = (e) => e.medida === 'series' ? `${e.series} × ${e.reps} repetições` : `${e.minutos} min`;

// ===== Renderização =====
function renderDias() {
  const hoje = (new Date().getDay() + 6) % 7;
  $('dias').innerHTML = NOMES.map((n, i) => `
    <button data-i="${i}" class="${i === hoje ? 'hoje' : ''}" aria-pressed="${i === diaSel}">
      <small>${n}</small><b>${dataDoDia(i).numero}</b>
    </button>`).join('');
}

function renderLista() {
  const lista = dados.plano[diaSel];
  const feitos = concluidos(diaSel);
  $('tituloDia').textContent = `Treino de ${NOMES_LONGOS[diaSel].toLowerCase()}`;
  const p = progresso(diaSel);
  const min = lista.filter((e) => e.medida === 'minutos').reduce((s, e) => s + e.minutos, 0);
  $('resumoDia').textContent = p.total ? `${p.ok} de ${p.total} feitos${min ? ` · ${min} min de atividade` : ''}` : '';
  $('lista').innerHTML = lista.length ? lista.map((e) => `
    <li class="ex ${feitos.includes(e.id) ? 'feito' : ''}">
      <input type="checkbox" data-id="${e.id}" ${feitos.includes(e.id) ? 'checked' : ''} aria-label="Concluir ${e.nome}">
      <div><h4>${e.nome}</h4><span class="det"><span class="tag ${e.categoria}">${e.categoria}</span>${detalhe(e)}</span></div>
      <button class="rm" data-rm="${e.id}">Remover</button>
    </li>`).join('')
    : '<li class="vazio">Dia sem exercícios. Adicione um abaixo ou aproveite para descansar.</li>';
  $('anel').style.setProperty('--p', p.pct);
  $('anelTexto').textContent = p.pct + '%';
}

function renderHabitos() {
  const ml = dados.agua[chaveSel()] || 0;
  $('aguaMl').textContent = ml.toLocaleString('pt-BR');
  $('aguaBarra').style.width = Math.min(100, (ml / META_AGUA) * 100) + '%';
  const h = dados.sono[chaveSel()];
  $('sono').value = h ?? '';
  $('dicaSono').textContent = h === undefined || h === ''
    ? 'Adultos costumam precisar de 7 a 9 horas.'
    : h < 7 ? 'Abaixo do recomendado. Tente dormir um pouco mais hoje.' : 'Boa noite de sono.';
}

function renderSemana() {
  let totalOk = 0, totalEx = 0;
  $('grafico').innerHTML = NOMES.map((n, i) => {
    const p = progresso(i);
    totalOk += p.ok; totalEx += p.total;
    return `<div class="col ${p.total ? '' : 'vazia'}" title="${p.ok} de ${p.total}">
      <i style="height:${p.total ? Math.max(4, p.pct) : 4}%"></i>${n}</div>`;
  }).join('');
  $('resumoSemana').textContent = `${totalOk} de ${totalEx} exercícios concluídos na semana.`;
}

function renderTudo() { renderDias(); renderLista(); renderHabitos(); renderSemana(); salvar(); }

// ===== Eventos =====
$('dias').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  diaSel = Number(b.dataset.i); renderTudo();
});

$('lista').addEventListener('change', (e) => {
  const id = e.target.dataset.id; if (!id) return;
  const k = chaveSel();
  const atual = new Set(dados.feitos[k] || []);
  e.target.checked ? atual.add(id) : atual.delete(id);
  dados.feitos[k] = [...atual];
  renderTudo();
});

$('lista').addEventListener('click', (e) => {
  const id = e.target.dataset.rm; if (!id) return;
  dados.plano[diaSel] = dados.plano[diaSel].filter((x) => x.id !== id);
  renderTudo();
});

$('medida').addEventListener('change', () => {
  const s = $('medida').value === 'series';
  $('campoSeries').hidden = !s; $('campoMin').hidden = s;
});

$('sugestoes').innerHTML = SUGESTOES.map((s, i) => `<button type="button" data-s="${i}">${s[0]}</button>`).join('');
$('sugestoes').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  const [nome, cat, med, a, r] = SUGESTOES[b.dataset.s];
  $('nome').value = nome; $('categoria').value = cat; $('medida').value = med;
  if (med === 'series') { $('series').value = a; $('reps').value = r; } else { $('minutos').value = a; }
  $('medida').dispatchEvent(new Event('change'));
});

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const medida = $('medida').value;
  dados.plano[diaSel].push({
    id: crypto.randomUUID(), nome: $('nome').value.trim(), categoria: $('categoria').value, medida,
    series: Number($('series').value) || 1, reps: Number($('reps').value) || 1, minutos: Number($('minutos').value) || 1
  });
  $('nome').value = '';
  renderTudo();
});

$('maisAgua').addEventListener('click', () => {
  dados.agua[chaveSel()] = (dados.agua[chaveSel()] || 0) + PASSO_AGUA; renderTudo();
});
$('menosAgua').addEventListener('click', () => {
  dados.agua[chaveSel()] = Math.max(0, (dados.agua[chaveSel()] || 0) - PASSO_AGUA); renderTudo();
});
$('sono').addEventListener('change', () => {
  const v = $('sono').value;
  if (v === '') delete dados.sono[chaveSel()]; else dados.sono[chaveSel()] = Math.min(14, Math.max(0, Number(v)));
  renderTudo();
});

// ===== Início =====
const h = new Date().getHours();
$('saudacao').textContent = (h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite') + '. Vamos cuidar da rotina de hoje?';
renderTudo();