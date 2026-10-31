
// MT BRASIL - INTERATIVIDADE

// Animação ao aparecer na tela
const elementos = document.querySelectorAll(
    '.card, .galeria, .sobre'
    );

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                            entrada.target.classList.add('mostrar');
                                    }
                                        });
                                        }, {
                                            threshold: 0.15
                                            });

                                            elementos.forEach((elemento) => {
                                                elemento.classList.add('revelar');
                                                    observador.observe(elemento);
                                                    });

                                                    // Efeito ao clicar nas fotos das motos
                                                    const imagens = document.querySelectorAll(
                                                        '.card img, .gallery img'
                                                        );

                                                        const modal = document.createElement('div');

                                                        modal.className = 'modal-foto';

                                                        modal.innerHTML = `
                                                            <span class="fechar">&times;</span>
                                                                <img src="" alt="Foto ampliada">
                                                                `;

                                                                document.body.appendChild(modal);

                                                                const imagemAmpliada = modal.querySelector('img');

                                                                imagens.forEach((imagem) => {
                                                                    imagem.addEventListener('click', () => {
                                                                            imagemAmpliada.src = imagem.src;
                                                                                    modal.classList.add('ativo');
                                                                                        });
                                                                                        });

                                                                                        modal.addEventListener('click', () => {
                                                                                            modal.classList.remove('ativo');
                                                                                            });

                                                                                            // Ano automático no rodapé
                                                                                            const rodape = document.querySelector('footer p');

                                                                                            if (rodape) {
                                                                                                rodape.textContent =
                                                                                                        `© ${new Date().getFullYear()} MT Brasil - Todos os direitos reservados.`;
                                                                                                        }

                                                                                                        // Menu com indicação da página
                                                                                                        const links = document.querySelectorAll('nav a');

                                                                                                        links.forEach((link) => {
                                                                                                            link.addEventListener('click', () => {
                                                                                                                    links.forEach((item) => {
                                                                                                                                item.classList.remove('ativo');
                                                                                                                                        });

                                                                                                                                                link.classList.add('ativo');
                                                                                                                                                    });
                                                                                                                                                    });
                                                                                                                                                    