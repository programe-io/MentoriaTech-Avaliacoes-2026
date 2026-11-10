document.addEventListener('DOMContentLoaded', () => {
  // Estado local com carregamento seguro do localStorage
  let tarefas = carregarDados();


  // Referências dos elementos do DOM
  const formTarefa = document.getElementById('form-tarefa');
  const inputCodigo = document.getElementById('codigo');
  const inputTitulo = document.getElementById('titulo');
  const selectPrioridade = document.getElementById('prioridade');
  const tabelaBody = document.getElementById('lista-tarefas');
  const filtroPrioridade = document.getElementById('filtro-prioridade');


  // Função para ler o localStorage com tratamento de exceções
  function carregarDados() {
    try {
      const dados = localStorage.getItem('tarefas_db');
      return dados ? JSON.parse(dados) : [
        { codigo: 'TSK-01', titulo: 'Estudar JavaScript ES6', prioridade: 'Alta', concluida: false },
        { codigo: 'TSK-02', titulo: 'Revisar estrutura HTML/CSS', prioridade: 'Média', concluida: true }
      ];
    } catch (error) {
      console.error('Erro ao ler localStorage:', error);
      return [];
    }
  }


  // Função para salvar no localStorage
  function salvarDados() {
    try {
      localStorage.setItem('tarefas_db', JSON.stringify(tarefas));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }


  // 1. Cadastrar Tarefa
  function cadastrarTarefa(codigo, titulo, prioridade) {
    const codLimpo = codigo.trim();
    const titLimpo = titulo.trim();


    if (!codLimpo || !titLimpo) {
      alert('Preencha todos os campos obrigatórios.');
      return false;
    }


    const existe = tarefas.some(t => t.codigo.toLowerCase() === codLimpo.toLowerCase());
    if (existe) {
      alert(Já existe uma tarefa com o código "${codLimpo}".);
      return false;
    }


    tarefas.push({
      codigo: codLimpo,
      titulo: titLimpo,
      prioridade: prioridade,
      concluida: false
    });


    salvarDados();
    listarTarefas();
    return true;
  }


  // 2. Listar Tarefas (Construção segura de DOM sem innerHTML para strings dinamicas)
  function listarTarefas() {
    const filtro = filtroPrioridade ? filtroPrioridade.value : 'Todas';
    tabelaBody.innerHTML = '';


    const filtradas = tarefas.filter(t => filtro === 'Todas' || t.prioridade === filtro);


    if (filtradas.length === 0) {
      const trVazia = document.createElement('tr');
      const tdVazia = document.createElement('td');
      tdVazia.colSpan = 5;
      tdVazia.style.textAlign = 'center';
      tdVazia.textContent = 'Nenhuma tarefa encontrada.';
      trVazia.appendChild(tdVazia);
      tabelaBody.appendChild(trVazia);
      return;
    }


    filtradas.forEach(tarefa => {
      const tr = document.createElement('tr');
      if (tarefa.concluida) {
        tr.classList.add('concluida');
      }


      // Checkbox (Marcar Concluída)
      const tdCheck = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = tarefa.concluida;
      checkbox.addEventListener('change', () => marcarConcluida(tarefa.codigo));
      tdCheck.appendChild(checkbox);


      // Código
      const tdCodigo = document.createElement('td');
      const strongCod = document.createElement('strong');
      strongCod.textContent = tarefa.codigo;
      tdCodigo.appendChild(strongCod);


      // Título
      const tdTitulo = document.createElement('td');
      tdTitulo.className = 'titulo-tarefa';
      tdTitulo.textContent = tarefa.titulo;


      // Badge Prioridade
      const tdBadge = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = badge badge-${tarefa.prioridade};
      badge.textContent = tarefa.prioridade;
      tdBadge.appendChild(badge);


      // Alterar Prioridade (Select Inline)
      const tdAcoes = document.createElement('td');
      const selectInline = document.createElement('select');
      selectInline.className = 'select-prio-inline';
      
      ['Baixa', 'Média', 'Alta'].forEach(prio => {
        const opt = document.createElement('option');
        opt.value = prio;
        opt.textContent = prio;
        if (tarefa.prioridade === prio) opt.selected = true;
        selectInline.appendChild(opt);
      });


      selectInline.addEventListener('change', (e) => alterarPrioridade(tarefa.codigo, e.target.value));
      tdAcoes.appendChild(selectInline);


      // Inserção dos elementos na linha
      tr.appendChild(tdCheck);
      tr.appendChild(tdCodigo);
      tr.appendChild(tdTitulo);
      tr.appendChild(tdBadge);
      tr.appendChild(tdAcoes);


      tabelaBody.appendChild(tr);
    });
  }


  // 3. Marcar Tarefa como Concluída
  function marcarConcluida(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
      tarefa.concluida = !tarefa.concluida;
      salvarDados();
      listarTarefas();
    }
  }


  // 4. Alterar Prioridade
  function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
      tarefa.prioridade = novaPrioridade;
      salvarDados();
      listarTarefas();
    }
  }


  // Listeners de Eventos
  formTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    const cadastrado = cadastrarTarefa(
      inputCodigo.value,
      inputTitulo.value,
      selectPrioridade.value
    );


    if (cadastrado) {
      inputCodigo.value = '';
      inputTitulo.value = '';
      selectPrioridade.value = 'Média';
    }
  });


  filtroPrioridade.addEventListener('change', listarTarefas);


  // Exibição inicial
  listarTarefas();