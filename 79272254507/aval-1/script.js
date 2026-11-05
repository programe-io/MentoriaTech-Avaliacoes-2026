/* ==========================================================================
   1. CRIAÇÃO DO BOTÃO DE MODO ESCURO (DARK MODE)
   ========================================================================== */
// Cria o botão dinamicamente via JS
const botaoTema = document.createElement('button');
botaoTema.innerHTML = '🌓 Alternar Tema';
botaoTema.style.position = 'fixed';
botaoTema.style.bottom = '20px';
botaoTema.style.right = '20px';
botaoTema.style.padding = '10px 15px';
botaoTema.style.backgroundColor = '#1abc9c';
botaoTema.style.color = '#fff';
botaoTema.style.border = 'none';
botaoTema.style.borderRadius = '50px';
botaoTema.style.cursor = 'pointer';
botaoTema.style.fontWeight = 'bold';
botaoTema.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
botaoTema.style.zIndex = '1000';

// Adiciona o botão ao corpo da página
document.body.appendChild(botaoTema);

// Escuta o clique no botão para alternar a classe no body
botaoTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
});

/* ==========================================================================
   2. SISTEMA DE INTERAÇÃO (CURTIDAS NOS POSTS)
   ========================================================================== */
// Seleciona todos os artigos (posts) da página
const posts = document.querySelectorAll('.post');

posts.forEach((post) => {
    // Cria um container para a interação
    const areaInteracao = document.createElement('div');
    areaInteracao.style.marginTop = '15px';
    areaInteracao.style.display = 'flex';
    areaInteracao.style.alignItems = 'center';
    areaInteracao.style.gap = '10px';

    // Cria o botão de curtir
    const botaoCurtir = document.createElement('button');
    botaoCurtir.innerHTML = '❤️ Curtir';
    botaoCurtir.style.background = 'none';
    botaoCurtir.style.border = '1px solid #1abc9c';
    botaoCurtir.style.color = '#1abc9c';
    botaoCurtir.style.padding = '5px 10px';
    botaoCurtir.style.borderRadius = '4px';
    botaoCurtir.style.cursor = 'pointer';

    // Cria o contador de curtidas
    let contagem = 0;
    const contador = document.createElement('span');
    contador.innerHTML = `${contagem} curtidas`;
    contador.style.fontSize = '0.9rem';
    contador.style.color = '#7f8c8d';

    // Evento de clique para aumentar as curtidas
    botaoCurtir.addEventListener('click', () => {
        contagem++;
        contador.innerHTML = `${contagem} curtidas`;
        botaoCurtir.style.backgroundColor = '#1abc9c';
        botaoCurtir.style.color = '#fff';
    });

    // Adiciona os elementos criados ao post
    areaInteracao.appendChild(botaoCurtir);
    areaInteracao.appendChild(contador);
    post.appendChild(areaInteracao);
});

/* ==========================================================================
   3. MENSAGEM DE BOAS-VINDAS NO CONSOLE
   ========================================================================== */
console.log("🚀 O script do 'Meu Blog' foi carregado com sucesso! Explore os recursos na página.");
