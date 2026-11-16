const form = document.getElementById('formEntrega');
const listaEntregas = document.getElementById('listaEntregas');
const contador = document.getElementById('contador');

let totalEntregas = 0;

form.addEventListener('submit', function(evento) {
  evento.preventDefault();

  // Captura os valores digitados
  const nome = document.getElementById('nomeAluno').value;
  const disciplina = document.getElementById('disciplina').value;
  const link = document.getElementById('linkRepo').value;
  const obs = document.getElementById('observacoes').value;
  const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' \});

  // Remove a mensagem de lista vazia na primeira entrega
  if (totalEntregas === 0) {
    listaEntregas.innerHTML = '';
  \}

  // Cria o cartão da nova entrega
  const item = document.createElement('div');
  item.classList.add('item-entrega');
  item.innerHTML = `
    <h3>\${disciplina\} - \${nome\}</h3>
    <p>Enviado às \${horaAtual\} • \${obs ? obs : 'Sem observações.'\}</p>
    <a href="\${link\}" target="_blank">Acessar código no GitHub ↗</a>
  `;

  // Adiciona no topo da lista
  listaEntregas.prepend(item);

  // Atualiza o contador e limpa o formulário
  totalEntregas++;
  contador.textContent = totalEntregas;
  form.reset();
\});$0