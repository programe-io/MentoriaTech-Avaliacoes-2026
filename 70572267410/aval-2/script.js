document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anamneseForm');
  const listaFichas = document.getElementById('listaFichas');
  const contadorFichas = document.getElementById('contadorFichas');
  const buscaPaciente = document.getElementById('buscaPaciente');
  const btnLimpar = document.getElementById('btnLimpar');
  const btnImprimir = document.getElementById('btnImprimir');
  const inputCpf = document.getElementById('cpf');
  const inputTelefone = document.getElementById('telefone');

  let fichas = JSON.parse(localStorage.getItem('fichas_anamnese')) || [];
  let fichaEmEdicaoId = null;

  // Máscara de CPF
  inputCpf.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  });

  // Máscara de Telefone
  inputTelefone.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d)(\d{4})$/, '$1-$2');
    e.target.value = v;
  });

  // Salvar ou atualizar ficha
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const condicoesMarcadas = Array.from(
      document.querySelectorAll('input[name="condicoes"]:checked')
    ).map((cb) => cb.value);

    const dadosFicha = {
      id: fichaEmEdicaoId || Date.now(),
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
      nome: document.getElementById('nome').value.trim(),
      dataNascimento: document.getElementById('dataNascimento').value,
      cpf: inputCpf.value,
      telefone: inputTelefone.value,
      sexo: document.getElementById('sexo').value,
      profissao: document.getElementById('profissao').value.trim(),
      queixa: document.getElementById('queixa').value.trim(),
      condicoes: condicoesMarcadas,
      alergias: document.getElementById('alergias').value.trim(),
      medicamentos: document.getElementById('medicamentos').value.trim(),
      cirurgias: document.getElementById('cirurgias').value.trim(),
      tabagismo: document.getElementById('tabagismo').value,
      etilismo: document.getElementById('etilismo').value,
      atividadeFisica: document.getElementById('atividadeFisica').value,
      observacoes: document.getElementById('observacoes').value.trim()
    };

    if (fichaEmEdicaoId) {
      const index = fichas.findIndex((f) => f.id === fichaEmEdicaoId);
      if (index !== -1) fichas[index] = dadosFicha;
      fichaEmEdicaoId = null;
    } else {
      fichas.unshift(dadosFicha);
    }

    salvarNoStorage();
    renderizarLista();
    limparFormulario();
    alert('Ficha de anamnese salva com sucesso!');
  });

  // Renderizar lista lateral
  function renderizarLista(filtro = '') {
    listaFichas.innerHTML = '';

    const termo = filtro.toLowerCase();
    const filtradas = fichas.filter(
      (f) =>
        f.nome.toLowerCase().includes(termo) ||
        f.cpf.includes(termo)
    );

    contadorFichas.textContent = filtradas.length;

    if (filtradas.length === 0) {
      listaFichas.innerHTML = '<li style="color:#64748b; font-size:0.9rem;">Nenhuma ficha encontrada.</li>';
      return;
    }

    filtradas.forEach((ficha) => {
      const li = document.createElement('li');
      li.className = 'record-item';
      li.innerHTML = `
        <div class="record-info">
          <h4>${ficha.nome}</h4>
          <p>CPF: ${ficha.cpf} • ${ficha.dataRegistro}</p>
        </div>
        <div class="record-actions">
          <button type="button" class="btn-sm btn-view" data-id="${ficha.id}">Abrir</button>
          <button type="button" class="btn-sm btn-delete" data-id="${ficha.id}">Excluir</button>
        </div>
      `;
      listaFichas.appendChild(li);
    });
  }

  // Delegação de eventos para Abrir e Excluir
  listaFichas.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('btn-view')) {
      carregarFichaNoFormulario(id);
    }

    if (e.target.classList.contains('btn-delete')) {
      if (confirm('Deseja realmente excluir esta ficha?')) {
        fichas = fichas.filter((f) => f.id !== id);
        salvarNoStorage();
        renderizarLista(buscaPaciente.value);
        if (fichaEmEdicaoId === id) limparFormulario();
      }
    }
  });

  function carregarFichaNoFormulario(id) {
    const ficha = fichas.find((f) => f.id === id);
    if (!ficha) return;

    fichaEmEdicaoId = ficha.id;
    document.getElementById('nome').value = ficha.nome;
    document.getElementById('dataNascimento').value = ficha.dataNascimento;
    inputCpf.value = ficha.cpf;
    inputTelefone.value = ficha.telefone;
    document.getElementById('sexo').value = ficha.sexo;
    document.getElementById('profissao').value = ficha.profissao;
    document.getElementById('queixa').value = ficha.queixa;
    document.getElementById('alergias').value = ficha.alergias;
    document.getElementById('medicamentos').value = ficha.medicamentos;
    document.getElementById('cirurgias').value = ficha.cirurgias;
    document.getElementById('tabagismo').value = ficha.tabagismo;
    document.getElementById('etilismo').value = ficha.etilismo;
    document.getElementById('atividadeFisica').value = ficha.atividadeFisica;
    document.getElementById('observacoes').value = ficha.observacoes;

    // Marcar checkboxes correspondentes
    document.querySelectorAll('input[name="condicoes"]').forEach((cb) => {
      cb.checked = ficha.condicoes.includes(cb.value);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function limparFormulario() {
    form.reset();
    fichaEmEdicaoId = null;
  }

  function salvarNoStorage() {
    localStorage.setItem('fichas_anamnese', JSON.stringify(fichas));
  }

  // Eventos auxiliares
  buscaPaciente.addEventListener('input', (e) => renderizarLista(e.target.value));
  btnLimpar.addEventListener('click', limparFormulario);
  btnImprimir.addEventListener('click', () => window.print());

  // Inicialização
  renderizarLista();
});