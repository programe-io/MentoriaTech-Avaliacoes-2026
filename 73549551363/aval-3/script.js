(() => {
  // 1. Injeta o CSS base dinamicamente via JavaScript
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --bg: #f1f5f9; --card: #ffffff; --subtle: #f8fafc; --border: #e2e8f0;
      --text: #0f172a; --muted: #64748b; --primary: #2563eb;
      --under: #3b82f6; --normal: #10b981; --over: #f59e0b;
      --ob1: #f97316; --ob2: #ef4444; --ob3: #991b1b;
    }
    body.dark {
      --bg: #0b1120; --card: #1e293b; --subtle: #0f172a; --border: #334155;
      --text: #f8fafc; --muted: #94a3b8; --primary: #3b82f6;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 20px; transition: 0.2s; }
    .imc-wrap { max-width: 960px; margin: 0 auto; }
    .imc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .imc-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 20px; }
    @media (max-width: 780px) { .imc-grid { grid-template-columns: 1fr; } }
    .imc-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 22px; box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
    .imc-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; }
    .imc-group { margin-bottom: 18px; }
    .imc-input { width: 110px; padding: 6px 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--subtle); color: var(--text); font-weight: 700; text-align: right; }
    .imc-range { width: 100%; accent-color: var(--primary); cursor: pointer; }
    .imc-btn { background: var(--primary); color: #fff; border: none; padding: 12px; width: 100%; border-radius: 10px; font-weight: 700; cursor: pointer; }
    .imc-btn-outline { background: var(--card); color: var(--text); border: 1px solid var(--border); padding: 8px 14px; border-radius: 10px; cursor: pointer; font-weight: 600; }
    .imc-hero { text-align: center; background: var(--subtle); border: 1px solid var(--border); border-radius: 14px; padding: 18px; margin-bottom: 18px; }
    .imc-val { font-size: 3rem; font-weight: 800; line-height: 1.1; margin: 6px 0; }
    .imc-badge { display: inline-block; padding: 4px 14px; border-radius: 999px; color: #fff; font-size: 0.85rem; font-weight: 700; }
    .imc-bar { position: relative; height: 14px; border-radius: 999px; margin: 20px 0 8px;
      background: linear-gradient(90deg, var(--under) 0% 14%, var(--normal) 14% 40%, var(--over) 40% 60%, var(--ob1) 60% 80%, var(--ob2) 80% 92%, var(--ob3) 92% 100%); }
    .imc-ptr { position: absolute; top: -6px; width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 4px solid var(--text); transform: translateX(-50%); transition: left 0.3s ease; }
    .imc-ticks { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--muted); font-weight: 600; margin-bottom: 16px; }
    .imc-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .imc-box { background: var(--subtle); border: 1px solid var(--border); border-radius: 10px; padding: 10px; font-size: 0.85rem; }
    .imc-box strong { display: block; font-size: 0.95rem; margin-top: 2px; }
    .imc-advice { background: var(--subtle); border-left: 4px solid var(--primary); padding: 10px 12px; border-radius: 6px; font-size: 0.85rem; }
    .imc-hist { margin-top: 20px; display: flex; flex-direction: column; gap: 8px; }
    .imc-hist-item { display: flex; justify-content: space-between; align-items: center; background: var(--subtle); border: 1px solid var(--border); padding: 8px 12px; border-radius: 8px; font-size: 0.85rem; }
  `;
  document.head.appendChild(style);

  // 2. Renderiza a estrutura na página
  const root = document.createElement('div');
  root.className = 'imc-wrap';
  root.innerHTML = `
    <div class="imc-top">
      <div>
        <h1 style="font-size:1.35rem;font-weight:800;">Calculadora de IMC Pro (JS)</h1>
        <p style="font-size:0.85rem;color:var(--muted);">Interface e cálculos gerados 100% em JavaScript</p>
      </div>
      <button type="button" class="imc-btn-outline" id="jsThemeBtn">🌙 Tema Escuro</button>
    </div>

    <div class="imc-grid">
      <div class="imc-card">
        <div class="imc-group">
          <div class="imc-row"><span>Peso (kg)</span><input type="number" class="imc-input" id="jsWeight" value="72" min="20" max="300" step="0.1"></div>
          <input type="range" class="imc-range" id="jsWeightRange" value="72" min="30" max="200" step="0.5">
        </div>
        <div class="imc-group">
          <div class="imc-row"><span>Altura (cm)</span><input type="number" class="imc-input" id="jsHeight" value="175" min="80" max="250" step="1"></div>
          <input type="range" class="imc-range" id="jsHeightRange" value="175" min="120" max="220" step="1">
        </div>
        <button type="button" class="imc-btn" id="jsSaveBtn">Salvar Medição</button>
        <div class="imc-hist" id="jsHistory"></div>
      </div>

      <div class="imc-card">
        <div class="imc-hero">
          <div style="font-size:0.8rem;color:var(--muted);font-weight:700;">SEU IMC</div>
          <div class="imc-val" id="jsBmiVal">23,5</div>
          <span class="imc-badge" id="jsBmiBadge">Peso Normal</span>
        </div>
        <div class="imc-bar"><div class="imc-ptr" id="jsPointer"></div></div>
        <div class="imc-ticks"><span>15</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40+</span></div>
        <div class="imc-meta">
          <div class="imc-box">Peso Ideal<strong id="jsIdeal">--</strong></div>
          <div class="imc-box">Meta<strong id="jsGoal">--</strong></div>
        </div>
        <div class="imc-advice" id="jsAdvice">--</div>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  // 3. Referências e Estado
  const el = {
    weight: document.getElementById('jsWeight'),
    weightRange: document.getElementById('jsWeightRange'),
    height: document.getElementById('jsHeight'),
    heightRange: document.getElementById('jsHeightRange'),
    bmiVal: document.getElementById('jsBmiVal'),
    bmiBadge: document.getElementById('jsBmiBadge'),
    pointer: document.getElementById('jsPointer'),
    ideal: document.getElementById('jsIdeal'),
    goal: document.getElementById('jsGoal'),
    advice: document.getElementById('jsAdvice'),
    history: document.getElementById('jsHistory'),
    saveBtn: document.getElementById('jsSaveBtn'),
    themeBtn: document.getElementById('jsThemeBtn')
  };

  let currentRecord = null;

  // 4. Classificação segundo a OMS
  const classify = (bmi) => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'var(--under)', tip: 'Considere orientação nutricional para ganho de massa saudável.' };
    if (bmi < 25)   return { label: 'Peso Normal', color: 'var(--normal)', tip: 'Excelente! Seu IMC está na faixa ideal recomendada pela OMS.' };
    if (bmi < 30)   return { label: 'Sobrepeso', color: 'var(--over)', tip: 'Atenção moderada: ajustes na alimentação e exercícios ajudam a voltar à faixa ideal.' };
    if (bmi < 35)   return { label: 'Obesidade Grau I', color: 'var(--ob1)', tip: 'Risco metabólico moderado. Recomenda-se acompanhamento médico e nutricional.' };
    if (bmi < 40)   return { label: 'Obesidade Grau II', color: 'var(--ob2)', tip: 'Risco metabólico elevado. Busque orientação profissional multidisciplinar.' };
    return { label: 'Obesidade Grau III', color: 'var(--ob3)', tip: 'Risco metabólico muito elevado. É altamente recomendável acompanhamento médico.' };
  };

  // 5. Função Principal de Cálculo
  const update = () => {
    const kg = parseFloat(el.weight.value);
    const cm = parseFloat(el.height.value);
    if (!kg || !cm || cm <= 0) return;

    const m = cm / 100;
    const bmi = kg / (m * m);
    const info = classify(bmi);

    el.bmiVal.textContent = bmi.toFixed(1).replace('.', ',');
    el.bmiVal.style.color = info.color;
    el.bmiBadge.textContent = info.label;
    el.bmiBadge.style.backgroundColor = info.color;
    el.advice.textContent = info.tip;
    el.advice.style.borderLeftColor = info.color;

    const pct