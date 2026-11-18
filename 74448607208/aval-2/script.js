document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anamneseForm');
  const lista = document.getElementById('listaRegistros');

  const carregarRegistros = () => {
    const dados = JSON.parse(localStorage.getItem('anamnese_simples')) || [];
    lista.innerHTML = '';

    if (dados.length === 0) {
      lista.innerHTML = '<p class="vazio">Nenhum registro salvo.</p>';
      return;
    }

    dados.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="info">
          <strong>${item.nome}</strong>
          <span>Peso: ${item.peso} kg &bull; Altura: ${item.altura} m &bull; IMC: ${item.imc}</span>
        </div>
        <button type="button" class="btn-delete" onclick="remover(${index})">Excluir</button>
      `;
      lista.appendChild(li);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const imc = (peso / (altura * altura)).toFixed(1);

    const dados = JSON.parse(localStorage.getItem('anamnese_simples')) || [];
    dados.unshift({ nome, peso, altura, imc });
    localStorage.setItem('anamnese_simples', JSON.stringify(dados));

    form.reset();
    carregarRegistros();
  });

  window.remover = (index) => {
    const dados = JSON.parse(localStorage.getItem('anamnese_simples')) || [];
    dados.splice(index, 1);
    localStorage.setItem('anamnese_simples', JSON.stringify(dados));
    carregarRegistros();
  };

  carregarRegistros();
});