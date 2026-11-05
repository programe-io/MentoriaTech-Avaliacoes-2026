// 1. Seleciona os elementos do HTML pelos seus IDs
const formulario = document.getElementById('meuFormulario');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const listaNomes = document.getElementById('listaNomes');

// 2. Escuta o evento de envio (submit) do formulário
formulario.addEventListener('submit', function(evento) {
  // Impede que a página recarregue ao clicar no botão
  evento.preventDefault();

  // Pega os valores digitados e remove espaços em branco extras
  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  // Verifica se ambos os campos foram preenchidos
  if (nome !== '' && email !== '') {
    adicionarRegistro(nome, email);

    // Limpa os campos e volta o foco para o primeiro campo
    formulario.reset();
    inputNome.focus();
  }
});

// 3. Função que cria e exibe o item na lista do HTML
function adicionarRegistro(nome, email) {
  // Cria um elemento <li> (item da lista)
  const item = document.createElement('li');
  
  // Ajusta o alinhamento interno do item via JavaScript
  item.style.display = 'flex';
  item.style.justifyContent = 'space-between';
  item.style.alignItems = 'center';

  // Cria a área com os textos (Nome em negrito e E-mail abaixo)
  const info = document.createElement('div');
  info.innerHTML = `<strong>${nome}</strong><br><small style="color: #64748b;">${email}</small>`;

  // Cria um botão de excluir para este registro
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir';
  botaoExcluir.style.backgroundColor = '#ef4444';
  botaoExcluir.style.padding = '6px 10px';
  botaoExcluir.style.fontSize = '12px';
  botaoExcluir.style.marginTop = '0';

  // Adiciona a ação de remover o item quando clicar em Excluir
  botaoExcluir.addEventListener('click', function() {
    item.remove();
  });

  // Junta o texto e o botão dentro do <li>, e coloca o <li> na <ul>
  item.appendChild(info);
  item.appendChild(botaoExcluir);
  listaNomes.appendChild(item);
}
