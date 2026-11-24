document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anamnese-form');
  const listaFichasEl = document.getElementById('lista-fichas');
  const btnNova = document.getElementById('btn-nova');
  const btnImprimir = document.getElementById('btn-imprimir');
  const dataAtualEl = document.getElementById('data-atual');

  const STORAGE_KEY = 'fichas_anamnese_db';

  // Define a data atual no campo de assinatura
  const hoje = new Date().toLocaleDateString('pt-BR');
  dataAtualEl.textContent = hoje;

  // Máscara simples de CPF
  document.getElementById('cpf').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  });

  // Máscara simples de Telefone
  document.getElementById('telefone').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d)(\d{4})$/, '$1-$2');
    e.target.value = v;
  });

  // Buscar fichas salvas
  function getFichas() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  // Salvar fichas no localStorage
  function saveFichas(fichas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fichas));
  }

  // Renderizar histórico de fichas
  function renderizarHistorico() {
    const fichas = getFichas();
    listaFichasEl.innerHTML = '';

    if (fichas.length === 0) {
      listaFichasEl.innerHTML = '<p class="empty-msg">Nenhuma ficha salva ainda.</p>';
      return;
    }

    fichas.forEach((ficha) => {
      const card = document.createElement('div');
      card.className = 'ficha-card';
      card.innerHTML = `
        <div class="ficha-info">
          <strong>${ficha.nome}</strong>
          <span>Data: ${ficha.dataRegistro} | Tel: ${ficha.telefone}</span>
        </div>
        <div class="ficha-actions">
          <button type="button" class="btn btn-secondary btn-sm" onclick="carregarFicha('${ficha.id}')">Abrir / Editar</button>
          <button type="button" class="btn btn-danger btn-sm" onclick="excluirFicha('${ficha.id}')">Excluir</button>
        </div>
      `;
      listaFichasEl.appendChild(card);
    });
  }

  // Salvar ou atualizar ficha
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const idExistente = document.getElementById('ficha-id').value;
    const condicoesSelecionadas = Array.from(
      document.querySelectorAll('input[name="condicoes"]:checked')
    ).map((cb) => cb.value);

    const fichaObj = {
      id: idExistente || Date.now().toString(),
      dataRegistro: hoje,
      nome: document.getElementById('nome').value,
      nascimento: document.getElementById('nascimento').value,
      cpf: document.getElementById('cpf').value,
      telefone: document.getElementById('telefone').value,
      profissao: document.getElementById('profissao').value,
      endereco: document.getElementById('endereco').value,
      queixa: document.getElementById('queixa').value,
      condicoes: condicoesSelecionadas,
      alergiasDetalhe: document.getElementById('alergias-detalhe').value,
      medicamentos: document.getElementById('medicamentos').value,
      cirurgias: document.getElementById('cirurgias').value,
      fumante: document.getElementById('fumante').value,
      etilismo: document.getElementById('etilismo').value,
      atividadeFisica: document.getElementById('atividade-fisica').value,
      observacoes: document.getElementById('observacoes').value,
      aceite: document.getElementById('aceite').checked
    };

    let fichas = getFichas();

    if (idExistente) {
      fichas = fichas.map((f) => (f.id === idExistente ? fichaObj : f));
      alert('Ficha atualizada com sucesso!');
    } else {
      fichas.unshift(fichaObj);
      alert('Ficha salva com sucesso!');
    }

    saveFichas(fichas);
    limparFormulario();
    renderizarHistorico();
  });

  // Limpar formulário para nova ficha
  function limparFormulario() {
    form.reset();
    document.getElementById('ficha-id').value = '';
    dataAtualEl.textContent = hoje;
  }

  btnNova.addEventListener('click', limparFormulario);

  // Imprimir ou salvar como PDF
  btnImprimir.addEventListener('click', () => {
    window.print();
  });

  // Funções globais para os botões do histórico
  window.carregarFicha = (id) => {
    const fichas = getFichas();
    const ficha = fichas.find((f) => f.id === id);
    if (!ficha) return;

    document.getElementById('ficha-id').value = ficha.id;
    document.getElementById('nome').value = ficha.nome;
    document.getElementById('nascimento').value = ficha.nascimento;
    document.getElementById('cpf').value = ficha.cpf;
    document.getElementById('telefone').value = ficha.telefone;
    document.getElementById('profissao').value = ficha.profissao;
    document.getElementById('endereco').value = ficha.endereco;
    document.getElementById('queixa').value = ficha.queixa;
    document.getElementById('alergias-detalhe').value = ficha.alergiasDetalhe;
    document.getElementById('medicamentos').value = ficha.medicamentos;
    document.getElementById('cirurgias').value = ficha.cirurgias;
    document.getElementById('fumante').value = ficha.fumante;
    document.getElementById('etilismo').value = ficha.etilismo;
    document.getElementById('atividade-fisica').value = ficha.atividadeFisica;
    document.getElementById('observacoes').value = ficha.observacoes;
    document.getElementById('aceite').checked = ficha.aceite;
    dataAtualEl.textContent = ficha.dataRegistro;

    // Marcar checkboxes de condições
    document.querySelectorAll('input[name="condicoes"]').forEach((cb) => {
      cb.checked = ficha.condicoes.includes(cb.value);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.excluirFicha = (id) => {
    if (!confirm('Deseja realmente excluir esta ficha?')) return;
    const fichas = getFichas().filter((f) => f.id !== id);
    saveFichas(fichas);
    renderizarHistorico();
  };

  // Inicializar lista ao carregar a página
  renderizarHistorico();
});