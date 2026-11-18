
let quantidade = 0;

const contador = document.getElementById('contador');

const botoesComprar = document.querySelectorAll('.comprar');

botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
            quantidade++;
                    contador.textContent = quantidade;

                            botao.textContent = 'Adicionado ✓';

                                    setTimeout(() => {
                                                botao.textContent = 'Adicionar à sacola';
                                                        }, 1500);
                                                            });
                                                            });

                                                            // FILTRO DE PRODUTOS

                                                            const filtros = document.querySelectorAll('.filtro');
                                                            const produtos = document.querySelectorAll('.produto');

                                                            filtros.forEach(filtro => {

                                                                filtro.addEventListener('click', () => {

                                                                        filtros.forEach(item => {
                                                                                    item.classList.remove('ativo');
                                                                                            });

                                                                                                    filtro.classList.add('ativo');

                                                                                                            const categoria = filtro.dataset.categoria;

                                                                                                                    produtos.forEach(produto => {

                                                                                                                                if (
                                                                                                                                                categoria === 'todos' ||
                                                                                                                                                                produto.dataset.categoria === categoria
                                                                                                                                                                            ) {
                                                                                                                                                                                            produto.classList.remove('escondido');
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                        produto.classList.add('escondido');
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                