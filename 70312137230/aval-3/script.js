// Variável em memória temporária (sem localStorage)
let historicoIMC = [];

function atualizarSistema() {
  renderizarHistorico();
}

function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-msg');
  if (!toast || !msg) return;
  msg.textContent = mensagem;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

window.calcularIMC = function() {
  const nomeInput = document.getElementById('nome');
  const pesoInput = document.getElementById('peso');
  const alturaInput = document.getElementById('altura');

  const nome = nomeInput.value.trim() || 'Anônimo';
  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value);

  if (isNaN(peso) || peso <= 0 || isNaN(altura) || altura <= 0) {
    alert('Por favor, informe valores válidos para peso e altura!');
    return;
  }

  const imc = peso / (altura * altura);
  const imcArredondado = imc.toFixed(2);

  let classificacao = '';
  let corBadge = '';
  let dica = '';

  if (imc < 18.5) {
    classificacao = 'Abaixo do peso';
    corBadge = 'bg-sky-500/20 text-sky-300 border border-sky-500/30';
    dica = 'Seu IMC indica magreza. É recomendado consultar um nutricionista para avaliar sua ingestão calórica e ganho de massa magra saudável.';
  } else if (imc >= 18.5 && imc <= 24.9) {
    classificacao = 'Peso Normal';
    corBadge = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    dica = 'Parabéns! Seu peso está dentro da faixa ideal de eutrofia. Mantenha hábitos equilibrados de alimentação e exercícios físicos.';
  } else if (imc >= 25 && imc <= 29.9) {
    classificacao = 'Sobrepeso';
    corBadge = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    dica = 'Atenção: Seu IMC aponta sobrepeso. Pequenos ajustes na rotina alimentar e prática regular de cardio podem ajudar no bem-estar.';
  } else if (imc >= 30 && imc <= 34.9) {
    classificacao = 'Obesidade Grau I';
    corBadge = 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
    dica = 'Cuidado: Obesidade Grau I detectada. Busque orientação médica ou nutricional para acompanhamento preventivo da saúde metabólica.';
  } else if (imc >= 35 && imc <= 39.9) {
    classificacao = 'Obesidade Grau II';
    corBadge = 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
    dica = 'Alerta importante: Obesidade Grau II. É altamente recomendada a avaliação com especialistas de saúde para suporte personalizado.';
  } else {
    classificacao = 'Obesidade Grau III';
    corBadge = 'bg-rose-700/30 text-rose-200 border border-rose-600/50';
    dica = 'Atenção médica prioritária necessária. Obesidade grau mórbido requer acompanhamento clínico multidisciplinar contínuo.';
  }

  const cardRes = document.getElementById('card-resultado');
  document.getElementById('res-imc').textContent = imcArredondado;
  const badgeClass = document.getElementById('res-classificacao');
  badgeClass.textContent = classificacao;
  badgeClass.className = `text-xs font-bold px-2.5 py-1 rounded-full ${corBadge}`;
  document.getElementById('res-dica').textContent = dica;
  cardRes.classList.remove('hidden');

  const novoRegistro = {
    id: Date.now(),
    nome: nome,
    peso: peso,
    altura: altura,
    imc: imcArredondado,
    classificacao: classificacao,
    cor: corBadge
  };

  historicoIMC.unshift(novoRegistro);
  atualizarSistema();
  mostrarToast(`IMC de ${nome} calculado: ${imcArredondado}`);
};

window.renderizarHistorico = function() {
  const tbody = document.getElementById('tabela-historico');
  const estadoVazio = document.getElementById('estado-vazio-hist');
  const contador = document.getElementById('contador-historico');

  if (!tbody) return;

  contador.textContent = `${historicoIMC.length} registro(s)`;

  if (historicoIMC.length === 0) {
    estadoVazio.classList.remove('hidden');
    tbody.innerHTML = '';
    return;
  }

  estadoVazio.classList.add('hidden');

  tbody.innerHTML = historicoIMC.map(h => `
    <tr class="hover:bg-slate-800/40 transition">
      <td class="py-3 px-3 font-medium text-white">${h.nome}</td>
      <td class="py-3 px-3 text-slate-300">${h.peso} kg • ${h.altura}m</td>
      <td class="py-3 px-3 font-mono font-bold text-teal-300">${h.imc}</td>
      <td class="py-3 px-3"><span class="px-2 py-0.5 text-xs font-semibold rounded-full ${h.cor}">${h.classificacao}</span></td>
      <td class="py-3 px-3 text-right">
        <button type="button" onclick="excluirRegistro(${h.id})" title="Remover" class="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition cursor-pointer">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </td>
    </tr>
  `).join('');

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
};

window.excluirRegistro = function(id) {
  historicoIMC = historicoIMC.filter(h => h.id !== id);
  atualizarSistema();
  mostrarToast('Registro removido do relatório.');
};

window.limparTudo = function() {
  historicoIMC = [];
  document.getElementById('nome').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('altura').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('card-resultado').classList.add('hidden');
  atualizarSistema();
  mostrarToast('Dados limpos com sucesso!');
};

setTimeout(() => {
  atualizarSistema();
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}, 200);