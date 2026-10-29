const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    });
    nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        }));

        const revealItems = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries, obs) => {
              entries.forEach(entry => {
                    if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                                    obs.unobserve(entry.target);
                                          }
                                              });
                                                }, {threshold: .12, rootMargin: '0px 0px -30px 0px'});
                                                  revealItems.forEach(item => observer.observe(item));
                                                  } else revealItems.forEach(item => item.classList.add('is-visible'));

                                                  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
                                                    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
                                                      button.classList.add('active');
                                                        const category = button.dataset.filter;
                                                          document.querySelectorAll('.feature-card').forEach(card => {
                                                              card.classList.toggle('filtered-out', category !== 'todos' && card.dataset.category !== category);
                                                                });
                                                                }));

                                                                const articles = {
                                                                  'trajetoria': {
                                                                      title: 'Como Ratinho virou um dos rostos mais conhecidos da televisão',
                                                                          paragraphs: [
                                                                                'Carlos Massa, conhecido como Ratinho, construiu uma carreira marcada por uma comunicação direta, ritmo acelerado e linguagem popular. Sua presença na televisão se tornou familiar para diferentes gerações de brasileiros.',
                                                                                      'A trajetória do apresentador também reflete mudanças na TV aberta: programas de variedades que misturam entrevistas, histórias do cotidiano e participação de convidados seguem criando momentos que repercutem além do estúdio.',
                                                                                            'Este texto é um resumo editorial introdutório. Para datas, entrevistas e informações biográficas detalhadas, consulte fontes oficiais e veículos jornalísticos confiáveis.'
                                                                                                ]
                                                                                                  },
                                                                                                    'ao-vivo': {
                                                                                                        title: 'O que faz um programa ao vivo ser tão imprevisível?',
                                                                                                            paragraphs: [
                                                                                                                  'A televisão ao vivo combina preparação com capacidade de reação. Mesmo com pauta, equipe e produção, o comportamento dos convidados e a resposta do público podem alterar o ritmo do programa.',
                                                                                                                        'Apresentadores experientes precisam ouvir, improvisar, administrar o tempo e manter a conversa em movimento. Essa combinação ajuda a explicar por que momentos espontâneos costumam virar assunto depois da transmissão.',
                                                                                                                              'As situações variam de programa para programa; este artigo aborda características gerais do formato, não relata um episódio específico.'
                                                                                                                                  ]
                                                                                                                                    },
                                                                                                                                      'tv-popular': {
                                                                                                                                          title: 'Por que a televisão popular continua rendendo conversa?',
                                                                                                                                              paragraphs: [
                                                                                                                                                    'A televisão popular costuma abordar assuntos reconhecíveis: histórias pessoais, desafios cotidianos, música, humor e temas que mobilizam a audiência. A proximidade com a vida real ajuda o público a se identificar.',
                                                                                                                                                          'Hoje, os trechos também circulam nas redes sociais, onde cenas e comentários podem alcançar quem não assistiu à transmissão original. A conversa se estende da sala de casa para os grupos e feeds.',
                                                                                                                                                                'O resultado é uma experiência compartilhada que continua fazendo parte da cultura midiática brasileira.'
                                                                                                                                                                    ]
                                                                                                                                                                      }
                                                                                                                                                                      };
                                                                                                                                                                      const modal = document.querySelector('#articleModal');
                                                                                                                                                                      document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => {
                                                                                                                                                                        const article = articles[button.dataset.article];
                                                                                                                                                                          if (!article) return;
                                                                                                                                                                            document.querySelector('#modalTitle').textContent = article.title;
                                                                                                                                                                              const content = document.querySelector('#modalText');
                                                                                                                                                                                content.replaceChildren();
                                                                                                                                                                                  article.paragraphs.forEach(text => {
                                                                                                                                                                                      const p = document.createElement('p');
                                                                                                                                                                                          p.textContent = text;
                                                                                                                                                                                              content.appendChild(p);
                                                                                                                                                                                                });
                                                                                                                                                                                                  modal.classList.add('open');
                                                                                                                                                                                                    modal.setAttribute('aria-hidden', 'false');
                                                                                                                                                                                                      document.body.style.overflow = 'hidden';
                                                                                                                                                                                                      }));
                                                                                                                                                                                                      function closeModal() {
                                                                                                                                                                                                        modal.classList.remove('open');
                                                                                                                                                                                                          modal.setAttribute('aria-hidden', 'true');
                                                                                                                                                                                                            document.body.style.overflow = '';
                                                                                                                                                                                                            }
                                                                                                                                                                                                            modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
                                                                                                                                                                                                            document.addEventListener('keydown', event => {
                                                                                                                                                                                                              if (event.key === 'Escape') {
                                                                                                                                                                                                                  closeModal();
                                                                                                                                                                                                                      lightbox.classList.remove('open');
                                                                                                                                                                                                                          lightbox.setAttribute('aria-hidden', 'true');
                                                                                                                                                                                                                              document.body.style.overflow = '';
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                const lightbox = document.querySelector('#lightbox');
                                                                                                                                                                                                                                const lightboxImage = lightbox.querySelector('img');
                                                                                                                                                                                                                                document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => {
                                                                                                                                                                                                                                  lightboxImage.src = button.dataset.image;
                                                                                                                                                                                                                                    lightbox.classList.add('open');
                                                                                                                                                                                                                                      lightbox.setAttribute('aria-hidden', 'false');
                                                                                                                                                                                                                                        document.body.style.overflow = 'hidden';
                                                                                                                                                                                                                                        }));
                                                                                                                                                                                                                                        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                                                                                                                                                                                                                                          lightbox.classList.remove('open');
                                                                                                                                                                                                                                            lightbox.setAttribute('aria-hidden', 'true');
                                                                                                                                                                                                                                              document.body.style.overflow = '';
                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                              lightbox.addEventListener('click', event => {
                                                                                                                                                                                                                                                if (event.target === lightbox) {
                                                                                                                                                                                                                                                    lightbox.classList.remove('open');
                                                                                                                                                                                                                                                        lightbox.setAttribute('aria-hidden', 'true');
                                                                                                                                                                                                                                                            document.body.style.overflow = '';
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                              document.querySelector('#subscribeForm').addEventListener('submit', event => {
                                                                                                                                                                                                                                                                event.preventDefault();
                                                                                                                                                                                                                                                                  const input = document.querySelector('#email');
                                                                                                                                                                                                                                                                    if (input.checkValidity()) {
                                                                                                                                                                                                                                                                        document.querySelector('#formStatus').textContent = 'E-mail validado nesta demonstração. Conecte um serviço de newsletter para ativar o cadastro.';
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                          document.querySelector('#year').textContent = new Date().getFullYear();

                                                                                                                                                                                                                                                                          const photo = document.querySelector('.hero-photo');
                                                                                                                                                                                                                                                                          if (photo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer:fine)').matches) {
                                                                                                                                                                                                                                                                            document.querySelector('.hero-visual').addEventListener('pointermove', event => {
                                                                                                                                                                                                                                                                                const rect = event.currentTarget.getBoundingClientRect();
                                                                                                                                                                                                                                                                                    const x = (event.clientX - rect.left) / rect.width - .5;
                                                                                                                                                                                                                                                                                        const y = (event.clientY - rect.top) / rect.height - .5;
                                                                                                                                                                                                                                                                                            photo.style.transform = `rotate(${2 + x * 2}deg) translate(${x * 7}px, ${y * 7}px)`;
                                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                                document.querySelector('.hero-visual').addEventListener('pointerleave', () => photo.style.transform = 'rotate(2deg)');
                                                                                                                                                                                                                                                                                                }