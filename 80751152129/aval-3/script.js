document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona os elementos usando o ID do novo HTML
    const botaoInteracao = document.getElementById('btn-interacao');
    const tituloPrincipal = document.querySelector('header h1');
    const conteudoMain = document.querySelector('main');

    // 2. Lógica do contador de cliques
    let cliques = 0;

    if (botaoInteracao) {
        botaoInteracao.addEventListener('click', () => {
            cliques++;
            botaoInteracao.textContent = `Você clicou ${cliques} vez(es)!`;

            if (cliques === 5) {
                tituloPrincipal.textContent = 'Parabéns! Você chegou a 5 cliques!';
            }
        });
    }

    // 3. Cria o botão para alternar o Modo Escuro
    const botaoTema = document.createElement('button');
    botaoTema.style.marginLeft = '10px';
    botaoTema.style.backgroundColor = '#343a40';

    // Verifica se o usuário já tinha escolhido o modo escuro antes
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-mode');
        botaoTema.textContent = 'Alternar Modo Claro';
    } else {
        botaoTema.textContent = 'Alternar Modo Escuro';
    }

    // Alterna a classe .dark-mode definida no CSS e salva a preferência
    botaoTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        const modoEscuroAtivo = document.body.classList.contains('dark-mode');

        if (modoEscuroAtivo) {
            botaoTema.textContent = 'Alternar Modo Claro';
            localStorage.setItem('tema', 'escuro');
        } else {
            botaoTema.textContent = 'Alternar Modo Escuro';
            localStorage.setItem('tema', 'claro');
        }
    });

    // Insere o botão de tema dentro do <main>
    if (conteudoMain) {
        conteudoMain.appendChild(botaoTema);
    }
});
