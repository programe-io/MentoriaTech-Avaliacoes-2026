// Seleção dos elementos da página
const timeline = document.getElementById('timeline');
const authorInput = document.getElementById('authorInput');
const contentInput = document.getElementById('contentInput');
const publishBtn = document.getElementById('publishBtn');

// Função que gera a data atual formatada
function obterDataAtual() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função responsável por criar e publicar a postagem
function criarNovoPost() {
    const autor = authorInput.value.trim();
    const conteudo = contentInput.value.trim();

    // Impede o envio se houver campos vazios
    if (autor === '' || conteudo === '') {
        alert('Por favor, preencha todos os campos antes de publicar.');
        return;
    }

    // Cria o elemento do novo post
    const novoPost = document.createElement('article');
    novoPost.classList.add('post-card');

    // Define o conteúdo HTML interno do post
    novoPost.innerHTML = `
        <div class="post-header">
            <span class="post-author">${autor}</span>
            <span class="post-date">${obterDataAtual()}</span>
        </div>
        <p class="post-content">${conteudo}</p>
    `;

    // Insere no topo da linha do tempo
    timeline.insertBefore(novoPost, timeline.firstChild);

    // Limpa os campos de texto para a próxima publicação
    authorInput.value = '';
    contentInput.value = '';
}

// Configura o botão para reagir ao clique do usuário
publishBtn.addEventListener('click', criarNovoPost);
