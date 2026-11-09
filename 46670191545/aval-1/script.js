/* ==========================================================================
   PROJETO MEU BLOG - SCRIPT DE INTERATIVIDADE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    inicializarCurtidas();
    inicializarBusca();
});

/* ==========================================================================
   1. SISTEMA DE CURTIDAS (LIKE BUTTON)
   ========================================================================== */
function inicializarCurtidas() {
    // Seleciona todos os posts do blog
    const posts = document.querySelectorAll('article');

    posts.forEach((post, index) => {
        // Cria dinamicamente a estrutura do botão de curtir
        const areaInteracao = document.createElement('div');
        areaInteracao.className = 'area-curtidas';
        areaInteracao.style.marginTop = '1rem';
        areaInteracao.style.display = 'flex';
        areaInteracao.style.alignItems = 'center';
        areaInteracao.style.gap = '0.5rem';

        let contadorLikes = 0;

        const botaoLike = document.createElement('button');
        botaoLike.innerHTML = '❤️ Curtir';
        botaoLike.style.cursor = 'pointer';
        botaoLike.style.padding = '0.4rem 0.8rem';
        botaoLike.style.border = '1px solid #3498db';
        botaoLike.style.borderRadius = '4px';
        botaoLike.style.backgroundColor = '#transparent';
        botaoLike.style.color = '#3498db';
        botaoLike.style.fontWeight = 'bold';
        botaoLike.style.transition = 'all 0.2s';

        const textoContador = document.createElement('span');
        textoContador.innerText = `${contadorLikes} curtidas`;
        textoContador.style.fontSize = '0.9rem';
        textoContador.style.color = '#7f8c8d';

        // Evento de clique para aumentar as curtidas e mudar o visual do botão
        botaoLike.addEventListener('click', () => {
            contadorLikes++;
            textoContador.innerText = `${contadorLikes} ${contadorLikes === 1 ? 'curtida' : 'curtidas'}`;
            
            botaoLike.style.backgroundColor = '#3498db';
            botaoLike.style.color = '#fff';
            
            // Pequeno efeito visual de clique
            botaoLike.style.transform = 'scale(1.1)';
            setTimeout(() => botaoLike.style.transform = 'scale(1)', 100);
        });

        // Adiciona os elementos criados ao final de cada post
        areaInteracao.appendChild(botaoLike);
        areaInteracao.appendChild(textoContador);
        post.appendChild(areaInteracao);
    });
}

/* ==========================================================================
   2. SISTEMA DE FILTRO DE BUSCA (SEARCH BAR)
   ========================================================================== */
function inicializarBusca() {
    const barraLateral = document.querySelector('aside');
    
    // Cria a barra de pesquisa dinamicamente no topo da barra lateral
    const containerBusca = document.createElement('div');
    containerBusca.className = 'bloco-busca';
    containerBusca.style.marginBottom = '1.5rem';

    const tituloBusca = document.createElement('h3');
    tituloBusca.innerText = 'Pesquisar Posts';
    tituloBusca.style.color = '#2c3e50';
    tituloBusca.style.marginBottom = '0.8rem';
    tituloBusca.style.borderBottom = '2px solid #3498db';
    tituloBusca.style.paddingBottom = '0.3rem';

    const campoInput = document.createElement('input');
    campoInput.type = 'text';
    campoInput.placeholder = 'Digite um título...';
    campoInput.style.width = '100%';
    campoInput.style.padding = '0.5rem';
    campoInput.style.borderRadius = '4px';
    campoInput.style.border = '1px solid #bdc3c7';

    containerBusca.appendChild(tituloBusca);
    containerBusca.appendChild(campoInput);
    
    // Insere a busca como o primeiro elemento da barra lateral
    barraLateral.insertBefore(containerBusca, barraLateral.firstChild);

    // Evento para monitorar a digitação e esconder os posts que não combinam
    campoInput.addEventListener('input', (evento) => {
        const termoPesquisa = evento.target.value.toLowerCase();
        const posts = document.querySelectorAll('.conteudo-principal article');

        posts.forEach(post => {
            const tituloPost = post.querySelector('h2').innerText.toLowerCase();
            
            if (tituloPost.includes(termoPesquisa)) {
                post.style.display = 'block'; // Mostra o post
            } else {
                post.style.display = 'none';  // Esconde o post
            }
        });
    });
}
