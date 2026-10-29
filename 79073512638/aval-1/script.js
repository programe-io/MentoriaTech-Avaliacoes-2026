// Executa o código após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

  // 1. Seleção de elementos do DOM
  const botao = document.querySelector('#meuBotao');
  const elementoSaida = document.querySelector('#resultado');

  // 2. Manipulação de Array de dados
  const usuarios = [
    { id: 1, nome: 'Ana', ativo: true },
    { id: 2, nome: 'Carlos', ativo: false },
    { id: 3, nome: 'Mariana', ativo: true }
  ];

  // Filtra apenas usuários ativos
  const usuariosAtivos = usuarios.filter(usuario => usuario.ativo);

  // 3. Função assíncrona para buscar dados de uma API externa
  async function buscarDados() {
    try {
      elementoSaida.textContent = 'Carregando...';
      
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status}`);
      }

      const dados = await resposta.json();
      elementoSaida.innerHTML = `<strong>${dados.title}</strong><p>${dados.body}</p>`;
    } catch (erro) {
      console.error('Falha ao obter dados:', erro);
      elementoSaida.textContent = 'Ocorreu um erro ao carregar os dados.';
    }
  }

  // 4. Event Listener para lidar com o clique do botão
  if (botao) {
    botao.addEventListener('click', () => {
      console.log('Usuários ativos:', usuariosAtivos);
      buscarDados();
    });
  }

});