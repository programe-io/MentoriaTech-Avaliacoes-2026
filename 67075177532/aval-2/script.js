// SCROLL SUAVE

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function(e){

        e.preventDefault();

        const destino =
        document.querySelector(this.getAttribute('href'));

        destino.scrollIntoView({
            behavior:'smooth'
        });

    });

});


// ANIMAÇÃO DAS IMAGENS

const imagens =
document.querySelectorAll('.grid-images img');

imagens.forEach(img => {

    img.addEventListener('click', () => {

        if(img.style.transform === 'scale(1.2)'){

            img.style.transform = 'scale(1)';

        }else{

            img.style.transform = 'scale(1.2)';

        }

    });

});


// EFEITO NOS BOTÕES

const botoes =
document.querySelectorAll('.btn');

botoes.forEach(botao => {

    const textoOriginal = botao.innerHTML;

    botao.addEventListener('mouseenter', () => {

        botao.innerHTML = '⚽ Abrindo...';

    });

    botao.addEventListener('mouseleave', () => {

        botao.innerHTML = textoOriginal;

    });

});


// MENU ATIVO

const menuLinks =
document.querySelectorAll('.menu a');

menuLinks.forEach(link => {

    link.addEventListener('click', () => {

        menuLinks.forEach(item => {
            item.classList.remove('ativo');
        });

        link.classList.add('ativo');

    });

});


// ANIMAÇÃO AO ROLAR A PÁGINA

const artigos =
document.querySelectorAll('article');

window.addEventListener('scroll', () => {

    artigos.forEach(artigo => {

        const posicao =
        artigo.getBoundingClientRect().top;

        if(posicao < window.innerHeight - 100){

            artigo.style.opacity = '1';
            artigo.style.transform = 'translateY(0)';

        }

    });

});


// CONFIGURAÇÃO INICIAL DOS ARTIGOS

artigos.forEach(artigo => {

    artigo.style.opacity = '0';
    artigo.style.transform = 'translateY(50px)';
    artigo.style.transition = '0.6s';

});