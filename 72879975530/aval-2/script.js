document.addEventListener('DOMContentLoaded', () => {
  // 1. Acessibilidade: Alto Contraste e Tamanho da Fonte
  const btnContraste = document.getElementById('btn-contraste');
  const btnFonteMais = document.getElementById('btn-fonte-mais');
  const btnFonteMenos = document.getElementById('btn-fonte-menos');
  let tamanhoFonte = 16;

  btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
  });

  btnFonteMais.addEventListener('click', () => {
    if (tamanhoFonte < 22) {
      tamanhoFonte += 2;
      document.body.style.fontSize = `${tamanhoFonte}px`;
    }
  });

  btnFonteMenos.addEventListener('click', () => {
    if (tamanhoFonte > 12) {
      tamanhoFonte -= 2;
      document.body.style.fontSize = `${tamanhoFonte}px`;
    }
  });

  // 2. Filtro de Pesquisa de Serviços
  const campoBusca = document.getElementById('campo-busca');
  const btnBuscar = document.getElementById('btn-buscar');
  const cards = document.querySelectorAll('.card-servico');
  const mensagemFiltro = document.getElementById('mensagem-filtro');

  function filtrarServicos() {
    const termo = campoBusca.value.toLowerCase().trim();
    let encontrados = 0;

    cards.forEach(card => {
      const titulo = card.querySelector('h3').textContent.toLowerCase();
      const descricao = card.querySelector('p').textContent.toLowerCase();
      const tags = card.getAttribute('data-tags').toLowerCase();

      if (titulo.includes(termo) || descricao.includes(termo) || tags.includes(termo)) {
        card.style.display = 'flex';
        encontrados++;
      } else {
        card.style.display = 'none';
      }
    });

    if (termo === '') {
      mensagemFiltro.textContent = '';
    } else if (encontrados === 0) {
      mensagemFiltro.textContent = `Nenhum serviço encontrado para "${campoBusca.value}".`;
    } else {
      mensagemFiltro.textContent = `Exibindo ${encontrados} resultado(s) para "${campoBusca.value}".`;
    }
  }

  btnBuscar.addEventListener('click', filtrarServicos);
  campoBusca.addEventListener('keyup', filtrarServicos);

  // 3. Modal de Login com Máscara Simples de CPF
  const btnLogin = document.getElementById('btn-login');
  const modalLogin = document.getElementById('modal-login');
  const btnFecharModal = document.getElementById('btn-fechar-modal');
  const btnConfirmarCpf = document.getElementById('btn-confirmar-cpf');
  const inputCpf = document.getElementById('input-cpf');
  const feedbackLogin = document.getElementById('feedback-login');

  btnLogin.addEventListener('click', () => {
    modalLogin.classList.remove('oculto');
    inputCpf.focus();
  });

  btnFecharModal.addEventListener('click', () => {
    modalLogin.classList.add('oculto');
    feedbackLogin.textContent = '';
    inputCpf.value = '';
  });

  // Formata automaticamente o CPF enquanto digita
  inputCpf.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = valor;
  });

  btnConfirmarCpf.addEventListener('click', () => {
    const cpfLimpo = inputCpf.value.replace(/\D/g, '');
    if (cpfLimpo.length === 11) {
      feedbackLogin.style.color = '#168821';
      feedbackLogin.textContent = 'CPF validado! Redirecionando...';
      setTimeout(() => {
        btnLogin.textContent = `Olá, ${inputCpf.value}`;
        modalLogin.classList.add('oculto');
        feedbackLogin.textContent = '';
      }, 1000);
    } else {
      feedbackLogin.style.color = '#D32F2F';
      feedbackLogin.textContent = 'Por favor, digite um CPF válido com 11 números.';
    }
  });
});