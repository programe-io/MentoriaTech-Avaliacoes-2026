const visor = document.getElementById('visor');

function adicionar(valor) {
  visor.value += valor;
}

function limpar() {
  visor.value = '';
}

function apagar() {
  visor.value = visor.value.slice(0, -1);
}

function calcular() {
  try {
    visor.value = eval(visor.value);
  } catch {
    visor.value = 'Erro';
  }
}

function mudarTema(tema) {
  document.body.classList.remove('tema-rosa', 'tema-roxo');

  if (tema === 'rosa') {
    document.body.classList.add('tema-rosa');
  } else if (tema === 'roxo') {
    document.body.classList.add('tema-roxo');
  }
}
document.addEventListener('keydown', (evento) => {
  const tecla = evento.key;

  if ((tecla >= '0' && tecla <= '9') || ['+', '-', '*', '/', '.'].includes(tecla)) {
    adicionar(tecla);
  } else if (tecla === ',') {
    adicionar('.');
  } else if (tecla === 'Enter' || tecla === '=') {
    evento.preventDefault();
    calcular();
  } else if (tecla === 'Backspace') {
    apagar();
  } else if (tecla === 'Escape' || tecla.toLowerCase() === 'c') {
    limpar();
  }
});
