const botaoPublicar = document.getElementById('botaoPublicar');
const textoPost = document.getElementById('textoPost');
const feed = document.getElementById('feed');

// 1. Função para criar um novo post
botaoPublicar.addEventListener('click', function() {
    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    // Cria a estrutura HTML do post via JavaScript
    const novoPost = document.createElement('div');
    novoPost.classList.add('post');

    novoPost.innerHTML = `
        <p class="autor">Você</p>
        <p class="conteudo">${texto}</p>
        <button class="botao-curtir">Curtir (<span>0</span>)</button>
    `;

    // Adiciona o post no topo do feed
    feed.prepend(novoPost);

    // Limpa a caixa de texto
    textoPost.value = "";

    // Ativa o botão de curtir para este novo post
    ativarBotaoCurtir(novoPost);
});

// 2. Função para gerenciar curtidas (inclusive em posts criados dinamicamente)
function ativarBotaoCurtir(elementoPost) {
    const botaoCurtir = elementoPost.querySelector('.botao-curtir');
    const spanContador = botaoCurtir.querySelector('span');
    
    let curtido = false;
    let contador = 0;

    botaoCurtir.addEventListener('click', function() {
        if (!curtido) {
            contador++;
            curtido = true;
            botaoCurtir.classList.add('curtido');
            botaoCurtir.innerHTML = `Curtido (<span>${contador}</span>)`;
        } else {
            contador--;
            curtido = false;
            botaoCurtir.classList.remove('curtido');
            botaoCurtir.innerHTML = `Curtir (<span>${contador}</span>)`;
        }
    });
}

// Ativa o botão de curtir no post inicial que já estava no HTML
const postInicial = document.querySelector('.post');
ativarBotaoCurtir(postInicial);