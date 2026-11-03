
// FILTROS DOS DESENHOS

const filtros = document.querySelectorAll('.filtro');
const cards = document.querySelectorAll('.card');

filtros.forEach((botao) => {

    botao.addEventListener('click', () => {

        filtros.forEach(item =>
            item.classList.remove('ativo')
        );

        botao.classList.add('ativo');

        const categoria = botao.dataset.filtro;

        cards.forEach(card => {

            const categorias =
                card.dataset.categoria.split(' ');

            card.hidden =
                categoria !== 'todos' &&
                !categorias.includes(categoria);

        });
    });
});


// JANELAS DE INFORMAÇÕES

const modal = document.getElementById('modal');

document.querySelectorAll('.detalhes').forEach(botao => {

    botao.addEventListener('click', () => {

        document.getElementById('modalTitulo')
            .textContent = botao.dataset.titulo;

        document.getElementById('modalTexto')
            .textContent = botao.dataset.texto;

        modal.showModal();

    });
});

function fecharModal() {
    modal.close();
}

document.getElementById('fecharModal')
    .addEventListener('click', fecharModal);

document.getElementById('okModal')
    .addEventListener('click', fecharModal);


// SORTEIO DE PERSONAGENS

const personagens = [

    {
        emoji: '🐶',
        nome: 'um filhote da Patrulha Canina',
        frase: 'Você gosta de ajudar!'
    },

    {
        emoji: '🐷',
        nome: 'a Peppa',
        frase: 'Você adora diversão!'
    },

    {
        emoji: '🧑‍🚀',
        nome: 'a Luna',
        frase: 'Você é muito curioso!'
    },

    {
        emoji: '🐻',
        nome: 'um dos Ursos sem Curso',
        frase: 'Você valoriza a amizade!'
    },

    {
        emoji: '🐱',
        nome: 'a Gabby',
        frase: 'Você tem muita imaginação!'
    }

];

document.getElementById('sortear')
    .addEventListener('click', () => {

        const escolhido = personagens[
            Math.floor(Math.random() * personagens.length)
        ];

        document.getElementById('resultado').innerHTML = `

            <span>${escolhido.emoji}</span>

            <strong>
                Você combina com ${escolhido.nome}!
            </strong>

            <p>${escolhido.frase}</p>

        `;

    });


// MENU RESPONSIVO

const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {

    const aberto = menu.classList.toggle('aberto');

    menuBtn.setAttribute(
        'aria-expanded',
        String(aberto)
    );

});

menu.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

        menu.classList.remove('aberto');

        menuBtn.setAttribute('aria-expanded', 'false');

    });

});


// ANO AUTOMÁTICO NO RODAPÉ

document.getElementById('ano').textContent =
    new Date().getFullYear();
