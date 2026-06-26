const botao = document.getElementById('botao-mudar');

const tonsRosa = [
    '#ffeff7',
        '#fce4ec',
            '#f8bbd0',
                '#f48fb1',
                    '#f06292'
                    ];
                    let indice = 0;

                    botao.addEventListener('click', () => {
                        indice = (indice + 1) % tonsRosa.length;
                            document.body.style.backgroundColor = tonsRosa[indice];
                            });
                            