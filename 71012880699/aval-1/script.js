// Função chamada ao enviar o formulário
function criarNovoPost(event) {
    // Evita o comportamento padrão do HTML de recarregar a página
    event.preventDefault();

    // Capturando os elementos de entrada do formulário
    const tituloInput = document.getElementById('titulo');
    const categoriaSelect = document.getElementById('categoria');
    const conteudoTextarea = document.getElementById('conteudo');

    // Capturando os valores inseridos pelo usuário
    const titulo = tituloInput.value;
    const categoria = categoriaSelect.value;
    const conteudo = conteudoTextarea.value;

    // Obtendo a data atual formatada localmente
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Criando a estrutura do novo post dinamicamente
    const novoPostCard = document.createElement('article');
    novoPostCard.className = 'post-card';

    // Montando o HTML interno do novo post
    novoPostCard.innerHTML = `
        <div class="post-categoria">${categoria}</div>
        <h3>${titulo}</h3>
        <p class="post-meta">Publicado em: ${dataAtual}</p>
        <p class="post-resumo">${conteudo}</p>
    `;

    // Localizando a lista de notícias e inserindo o novo post no topo
    const listaPosts = document.getElementById('lista-posts');
    listaPosts.insertBefore(novoPostCard, listaPosts.firstChild);

    // Limpando os campos do formulário após a postagem bem-sucedida
    tituloInput.value = '';
    conteudoTextarea.value = '';

    // Scroll suave de volta para a seção de notícias para visualizar a publicação
    document.getElementById('noticias').scrollIntoView({ behavior: 'smooth' });
}
    