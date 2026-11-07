'use strict';

// Projeto educativo local, sem conexão com o Instagram real.

/* Ícones da interface */
const ICONS = {
 home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  search: '<circle cx="10.8" cy="10.8" r="7.8"/><path d="m16.5 16.5 4.5 4.5"/>',
   bookmark: '<path d="M5 3h14v18l-7-4-7 4z"/>',
    plus: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 7v10M7 12h10"/>',
     user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
      heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
       comment: '<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 10 10 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 1 1 16.1-4z"/>'
       };

       function icon(name) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true">'
         + ICONS[name] + '</svg>';
         }

         document.querySelectorAll('[data-icon]').forEach(element => {
          element.insertAdjacentHTML('afterbegin', icon(element.dataset.icon));
          });

          const $ = selector => document.querySelector(selector);
          const KEY = 'instagram_clone_estudo_v1';

          /* Dados iniciais de demonstração */
          const defaults = () => ({
           username: 'seu.perfil',
            following: [],
             posts: [
              {
               id: 'demo-1',
                user: 'lia.cria',
                 location: 'Um respiro no dia',
                  image: 'assets/paisagem.svg',
                   caption: 'Às vezes, tudo o que a gente precisa é de um novo ponto de vista. Qual cor combina com o seu dia?',
                    likes: 128,
                     liked: false,
                      saved: false,
                       own: false,
                        created: 0,
                         comments: [
                          { user: 'bia.atelie', text: 'Essas cores ficaram lindas!' }
                           ]
                            },
                             {
                              id: 'demo-2',
                               user: 'caio.foto',
                                location: 'Luz de fim de tarde',
                                 image: 'assets/arquitetura.svg',
                                  caption: 'Luz, linhas e um pouco de calma. Um registro do meu caderno de ideias.',
                                   likes: 86,
                                    liked: false,
                                     saved: false,
                                      own: false,
                                       created: 0,
                                        comments: []
                                         },
                                          {
                                           id: 'demo-3',
                                            user: 'bia.atelie',
                                             location: 'Ateliê de ideias',
                                              image: 'assets/abstrato.svg',
                                               caption: 'Experimentando formas sem pressa. Criar também é se permitir brincar.',
                                                likes: 204,
                                                 liked: false,
                                                  saved: false,
                                                   own: false,
                                                    created: 0,
                                                     comments: []
                                                      }
                                                       ]
                                                       });

                                                       function validPost(post) {
                                                        return post
                                                         && typeof post.id === 'string'
                                                          && typeof post.user === 'string'
                                                           && typeof post.caption === 'string'
                                                            && typeof post.image === 'string'
                                                             && (
                                                              post.image.startsWith('assets/')
                                                               || /^data:image\/(jpeg|png|webp);base64,/.test(post.image)
                                                                )
                                                                 && Array.isArray(post.comments)
                                                                  && typeof post.likes === 'number';
                                                                  }

                                                                  let state = defaults();
                                                                  let view = 'home';
                                                                  let pendingPhoto = '';
                                                                  let processing = false;
                                                                  let toastTimer;

                                                                  /* Recupera os dados deste navegador */
                                                                  try {
                                                                   const saved = JSON.parse(localStorage.getItem(KEY));

                                                                    if (
                                                                     saved
                                                                      && typeof saved.username === 'string'
                                                                       && Array.isArray(saved.posts)
                                                                        && saved.posts.every(validPost)
                                                                         && Array.isArray(saved.following)
                                                                          ) {
                                                                           state = saved;
                                                                            }
                                                                            } catch (error) {
                                                                             // Mantém os dados iniciais se a leitura não estiver disponível.
                                                                             }

                                                                             /* Avisos e armazenamento */
                                                                             function toast(message) {
                                                                              $('#toast').textContent = message;
                                                                               $('#toast').classList.add('visible');
                                                                                clearTimeout(toastTimer);

                                                                                 toastTimer = setTimeout(() => {
                                                                                  $('#toast').classList.remove('visible');
                                                                                   }, 3200);
                                                                                   }

                                                                                   function persist() {
                                                                                    try {
                                                                                     localStorage.setItem(KEY, JSON.stringify(state));
                                                                                      return true;
                                                                                       } catch (error) {
                                                                                        toast('Não foi possível salvar. Remova uma publicação com foto e tente novamente.');
                                                                                         return false;
                                                                                          }
                                                                                          }

                                                                                          function mutate(change) {
                                                                                           const previous = JSON.stringify(state);
                                                                                            change();

                                                                                             if (!persist()) {
                                                                                              state = JSON.parse(previous);
                                                                                               return false;
                                                                                                }

                                                                                                 return true;
                                                                                                 }

                                                                                                 /* Cria elementos usando texto, sem interpretar HTML do usuário */
                                                                                                 function text(tag, value, className) {
                                                                                                  const element = document.createElement(tag);
                                                                                                   element.textContent = value;

                                                                                                    if (className) {
                                                                                                     element.className = className;
                                                                                                      }

                                                                                                       return element;
                                                                                                       }

                                                                                                       function action(label, name, pressed) {
                                                                                                        const button = document.createElement('button');
                                                                                                         button.type = 'button';
                                                                                                          button.setAttribute('aria-label', label);

                                                                                                           if (pressed !== undefined) {
                                                                                                            button.setAttribute('aria-pressed', String(pressed));
                                                                                                             }

                                                                                                              // Apenas os ícones fixos acima são inseridos como HTML.
                                                                                                               button.innerHTML = icon(name);
                                                                                                                return button;
                                                                                                                }

                                                                                                                /* Monta o feed */
                                                                                                                function render() {
                                                                                                                 $('#profile-label').textContent = state.username;
                                                                                                                  $('#feed-title').textContent = view === 'saved'
                                                                                                                   ? 'Publicações salvas'
                                                                                                                    : 'Para você';

                                                                                                                     document.querySelectorAll('[data-view]').forEach(button => {
                                                                                                                      const active = button.dataset.view === view;
                                                                                                                       button.classList.toggle('active', active);
                                                                                                                        button.setAttribute('aria-pressed', String(active));
                                                                                                                         });

                                                                                                                          const query = $('#search').value.trim().toLocaleLowerCase('pt-BR');

                                                                                                                           const posts = state.posts.filter(post => {
                                                                                                                            const matchesView = view !== 'saved' || post.saved;
                                                                                                                             const searchable = (post.user + ' ' + post.caption)
                                                                                                                              .toLocaleLowerCase('pt-BR');

                                                                                                                               return matchesView && (!query || searchable.includes(query));
                                                                                                                                });

                                                                                                                                 $('#feed').replaceChildren();
                                                                                                                                  $('#empty').hidden = posts.length > 0;

                                                                                                                                   posts.forEach(post => {
                                                                                                                                    const article = document.createElement('article');
                                                                                                                                     article.className = 'post';
                                                                                                                                      article.dataset.id = post.id;

                                                                                                                                       /* Cabeçalho da publicação */
                                                                                                                                        const header = document.createElement('header');
                                                                                                                                         header.className = 'post-header';

                                                                                                                                          const avatarClass = post.own
                                                                                                                                           ? 'self'
                                                                                                                                            : post.user === 'lia.cria'
                                                                                                                                             ? 'pink'
                                                                                                                                              : post.user === 'caio.foto'
                                                                                                                                               ? 'blue'
                                                                                                                                                : 'green';

                                                                                                                                                 header.append(
                                                                                                                                                  text('span', post.user[0].toUpperCase(), 'avatar ' + avatarClass)
                                                                                                                                                   );

                                                                                                                                                    const owner = document.createElement('div');
                                                                                                                                                     owner.className = 'post-owner';
                                                                                                                                                      owner.append(
                                                                                                                                                       text('strong', post.user),
                                                                                                                                                        text(
                                                                                                                                                         'small',
                                                                                                                                                          post.own
                                                                                                                                                           ? 'Publicação local'
                                                                                                                                                            : post.location || 'Perfil de demonstração'
                                                                                                                                                             )
                                                                                                                                                              );
                                                                                                                                                               header.append(owner);

                                                                                                                                                                const time = text('time', post.own ? 'agora' : '2 h');

                                                                                                                                                                 if (post.created) {
                                                                                                                                                                  time.dateTime = new Date(post.created).toISOString();
                                                                                                                                                                   }

                                                                                                                                                                    header.append(time);

                                                                                                                                                                     /* Excluir somente publicações próprias */
                                                                                                                                                                      if (post.own) {
                                                                                                                                                                       const remove = text('button', 'Excluir', 'delete');
                                                                                                                                                                        remove.type = 'button';

                                                                                                                                                                         remove.addEventListener('click', () => {
                                                                                                                                                                          const confirmed = confirm(
                                                                                                                                                                           'Excluir esta publicação deste navegador?'
                                                                                                                                                                            );

                                                                                                                                                                             if (confirmed && mutate(() => {
                                                                                                                                                                              state.posts = state.posts.filter(item => item.id !== post.id);
                                                                                                                                                                               })) {
                                                                                                                                                                                render();
                                                                                                                                                                                 }
                                                                                                                                                                                  });

                                                                                                                                                                                   header.append(remove);
                                                                                                                                                                                    }

                                                                                                                                                                                     /* Imagem da publicação */
                                                                                                                                                                                      const image = document.createElement('img');
                                                                                                                                                                                       image.className = 'post-image';
                                                                                                                                                                                        image.src = post.image;
                                                                                                                                                                                         image.alt = post.own
                                                                                                                                                                                          ? 'Foto publicada por ' + post.user
                                                                                                                                                                                           : 'Ilustração de demonstração: ' + post.location;
                                                                                                                                                                                            image.loading = 'lazy';

                                                                                                                                                                                             image.addEventListener('dblclick', () => {
                                                                                                                                                                                              if (!post.liked && mutate(() => {
                                                                                                                                                                                               post.liked = true;
                                                                                                                                                                                                post.likes++;
                                                                                                                                                                                                 })) {
                                                                                                                                                                                                  render();
                                                                                                                                                                                                   }
                                                                                                                                                                                                    });

                                                                                                                                                                                                     /* Botões de ação */
                                                                                                                                                                                                      const actions = document.createElement('div');
                                                                                                                                                                                                       actions.className = 'actions';

                                                                                                                                                                                                        const like = action(
                                                                                                                                                                                                         post.liked ? 'Descurtir' : 'Curtir',
                                                                                                                                                                                                          'heart',
                                                                                                                                                                                                           post.liked
                                                                                                                                                                                                            );
                                                                                                                                                                                                             like.classList.toggle('liked', post.liked);

                                                                                                                                                                                                              like.addEventListener('click', () => {
                                                                                                                                                                                                               if (mutate(() => {
                                                                                                                                                                                                                post.likes += post.liked ? -1 : 1;
                                                                                                                                                                                                                 post.liked = !post.liked;
                                                                                                                                                                                                                  })) {
                                                                                                                                                                                                                   render();
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                     });

                                                                                                                                                                                                                      const comment = action('Comentar', 'comment');

                                                                                                                                                                                                                       const save = action(
                                                                                                                                                                                                                        post.saved ? 'Remover dos salvos' : 'Salvar publicação',
                                                                                                                                                                                                                         'bookmark',
                                                                                                                                                                                                                          post.saved
                                                                                                                                                                                                                           );
                                                                                                                                                                                                                            save.classList.toggle('saved', post.saved);

                                                                                                                                                                                                                             save.addEventListener('click', () => {
                                                                                                                                                                                                                              if (mutate(() => {
                                                                                                                                                                                                                               post.saved = !post.saved;
                                                                                                                                                                                                                                })) {
                                                                                                                                                                                                                                 render();
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                   });

                                                                                                                                                                                                                                    actions.append(like, comment, save);

                                                                                                                                                                                                                                     /* Legenda */
                                                                                                                                                                                                                                      const caption = text('p', '', 'caption');
                                                                                                                                                                                                                                       caption.append(
                                                                                                                                                                                                                                        text('strong', post.user),
                                                                                                                                                                                                                                         document.createTextNode(post.caption)
                                                                                                                                                                                                                                          );

                                                                                                                                                                                                                                           /* Comentários existentes */
                                                                                                                                                                                                                                            const comments = document.createElement('div');
                                                                                                                                                                                                                                             comments.className = 'comments';

                                                                                                                                                                                                                                              post.comments.forEach(item => {
                                                                                                                                                                                                                                               const row = text('div', '', 'comment');
                                                                                                                                                                                                                                                row.append(
                                                                                                                                                                                                                                                 text('strong', item.user),
                                                                                                                                                                                                                                                  document.createTextNode(item.text)
                                                                                                                                                                                                                                                   );
                                                                                                                                                                                                                                                    comments.append(row);
                                                                                                                                                                                                                                                     });

                                                                                                                                                                                                                                                      /* Formulário de novo comentário */
                                                                                                                                                                                                                                                       const form = document.createElement('form');
                                                                                                                                                                                                                                                        form.className = 'comment-form';

                                                                                                                                                                                                                                                         const input = document.createElement('input');
                                                                                                                                                                                                                                                          input.placeholder = 'Adicione um comentário…';
                                                                                                                                                                                                                                                           input.maxLength = 200;
                                                                                                                                                                                                                                                            input.required = true;
                                                                                                                                                                                                                                                             input.setAttribute(
                                                                                                                                                                                                                                                              'aria-label',
                                                                                                                                                                                                                                                               'Comentário na publicação de ' + post.user
                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                 const submit = text('button', 'Publicar');
                                                                                                                                                                                                                                                                  submit.type = 'submit';
                                                                                                                                                                                                                                                                   form.append(input, submit);

                                                                                                                                                                                                                                                                    comment.addEventListener('click', () => input.focus());

                                                                                                                                                                                                                                                                     form.addEventListener('submit', event => {
                                                                                                                                                                                                                                                                      event.preventDefault();
                                                                                                                                                                                                                                                                       const value = input.value.trim();

                                                                                                                                                                                                                                                                        if (!value) return;

                                                                                                                                                                                                                                                                         if (post.comments.length >= 50) {
                                                                                                                                                                                                                                                                          toast('Limite de 50 comentários por publicação neste protótipo.');
                                                                                                                                                                                                                                                                           return;
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                             if (mutate(() => {
                                                                                                                                                                                                                                                                              post.comments.push({ user: state.username, text: value });
                                                                                                                                                                                                                                                                               })) {
                                                                                                                                                                                                                                                                                render();
                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                   article.append(
                                                                                                                                                                                                                                                                                    header,
                                                                                                                                                                                                                                                                                     image,
                                                                                                                                                                                                                                                                                      actions,
                                                                                                                                                                                                                                                                                       text('p', post.likes.toLocaleString('pt-BR') + ' curtidas', 'likes'),
                                                                                                                                                                                                                                                                                        caption,
                                                                                                                                                                                                                                                                                         comments,
                                                                                                                                                                                                                                                                                          form
                                                                                                                                                                                                                                                                                           );

                                                                                                                                                                                                                                                                                            $('#feed').append(article);
                                                                                                                                                                                                                                                                                             });

                                                                                                                                                                                                                                                                                              /* Atualiza os botões Seguir */
                                                                                                                                                                                                                                                                                               document.querySelectorAll('.follow').forEach(button => {
                                                                                                                                                                                                                                                                                                const name = button.parentElement.querySelector('strong').textContent;
                                                                                                                                                                                                                                                                                                 const following = state.following.includes(name);
                                                                                                                                                                                                                                                                                                  button.textContent = following ? 'Seguindo' : 'Seguir';
                                                                                                                                                                                                                                                                                                   button.setAttribute('aria-pressed', String(following));
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                    /* Abrir janela de criação */
                                                                                                                                                                                                                                                                                                    function openCreate() {
                                                                                                                                                                                                                                                                                                     if (state.posts.filter(post => post.own).length >= 12) {
                                                                                                                                                                                                                                                                                                      toast('Este protótipo aceita até 12 publicações pessoais.');
                                                                                                                                                                                                                                                                                                       return;
                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                         $('#create-dialog').showModal();
                                                                                                                                                                                                                                                                                                         }

                                                                                                                                                                                                                                                                                                         ['#create-nav', '#create-mobile', '#new-mobile'].forEach(selector => {
                                                                                                                                                                                                                                                                                                          $(selector).addEventListener('click', openCreate);
                                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                                          /* Abrir janela de perfil */
                                                                                                                                                                                                                                                                                                          function openProfile() {
                                                                                                                                                                                                                                                                                                           $('#username').value = state.username;
                                                                                                                                                                                                                                                                                                            $('#profile-dialog').showModal();
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                            ['#profile-nav', '#profile-mobile', '#edit-profile'].forEach(selector => {
                                                                                                                                                                                                                                                                                                             $(selector).addEventListener('click', openProfile);
                                                                                                                                                                                                                                                                                                             });

                                                                                                                                                                                                                                                                                                             /* Fechar janelas */
                                                                                                                                                                                                                                                                                                             document.querySelectorAll('[data-close]').forEach(button => {
                                                                                                                                                                                                                                                                                                              button.addEventListener('click', () => {
                                                                                                                                                                                                                                                                                                               document.getElementById(button.dataset.close).close();
                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                /* Alternar entre início e salvos */
                                                                                                                                                                                                                                                                                                                document.querySelectorAll('[data-view]').forEach(button => {
                                                                                                                                                                                                                                                                                                                 button.addEventListener('click', () => {
                                                                                                                                                                                                                                                                                                                  view = button.dataset.view;
                                                                                                                                                                                                                                                                                                                   render();
                                                                                                                                                                                                                                                                                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                                                                                                                                                                                                                                                                     });
                                                                                                                                                                                                                                                                                                                     });

                                                                                                                                                                                                                                                                                                                     /* Pesquisa */
                                                                                                                                                                                                                                                                                                                     ['#search-nav', '#search-mobile'].forEach(selector => {
                                                                                                                                                                                                                                                                                                                      $(selector).addEventListener('click', () => {
                                                                                                                                                                                                                                                                                                                       window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                                                                                                                                                                                                                                                                        $('#search').focus();
                                                                                                                                                                                                                                                                                                                         });
                                                                                                                                                                                                                                                                                                                         });

                                                                                                                                                                                                                                                                                                                         $('#search').addEventListener('input', render);

                                                                                                                                                                                                                                                                                                                         /* Salvar nome de usuário */
                                                                                                                                                                                                                                                                                                                         $('#profile-form').addEventListener('submit', event => {
                                                                                                                                                                                                                                                                                                                          event.preventDefault();
                                                                                                                                                                                                                                                                                                                           const value = $('#username').value.trim();

                                                                                                                                                                                                                                                                                                                            if (!/^[A-Za-z0-9_.]{1,24}$/.test(value)) return;

                                                                                                                                                                                                                                                                                                                             if (mutate(() => {
                                                                                                                                                                                                                                                                                                                              const oldName = state.username;
                                                                                                                                                                                                                                                                                                                               state.username = value;

                                                                                                                                                                                                                                                                                                                                state.posts.forEach(post => {
                                                                                                                                                                                                                                                                                                                                 if (post.own) post.user = value;

                                                                                                                                                                                                                                                                                                                                  post.comments.forEach(comment => {
                                                                                                                                                                                                                                                                                                                                   if (comment.user === oldName) comment.user = value;
                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                     });
                                                                                                                                                                                                                                                                                                                                      })) {
                                                                                                                                                                                                                                                                                                                                       $('#profile-dialog').close();
                                                                                                                                                                                                                                                                                                                                        render();
                                                                                                                                                                                                                                                                                                                                         toast('Perfil atualizado.');
                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                                                                          /* Seguir e deixar de seguir perfis fictícios */
                                                                                                                                                                                                                                                                                                                                          document.querySelectorAll('.follow').forEach(button => {
                                                                                                                                                                                                                                                                                                                                           button.addEventListener('click', () => {
                                                                                                                                                                                                                                                                                                                                            const name = button.parentElement.querySelector('strong').textContent;

                                                                                                                                                                                                                                                                                                                                             if (mutate(() => {
                                                                                                                                                                                                                                                                                                                                              state.following = state.following.includes(name)
                                                                                                                                                                                                                                                                                                                                               ? state.following.filter(item => item !== name)
                                                                                                                                                                                                                                                                                                                                                : [...state.following, name];
                                                                                                                                                                                                                                                                                                                                                 })) {
                                                                                                                                                                                                                                                                                                                                                  render();
                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                    /* Stories ilustrativos */
                                                                                                                                                                                                                                                                                                                                                    document.querySelectorAll('[data-story]').forEach(button => {
                                                                                                                                                                                                                                                                                                                                                     button.addEventListener('click', () => {
                                                                                                                                                                                                                                                                                                                                                      $('#story-title').textContent = button.dataset.story;
                                                                                                                                                                                                                                                                                                                                                       $('#story-dialog').showModal();
                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                        /* Valida, redimensiona e comprime a foto */
                                                                                                                                                                                                                                                                                                                                                        async function compressPhoto(file) {
                                                                                                                                                                                                                                                                                                                                                         const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];

                                                                                                                                                                                                                                                                                                                                                          if (!acceptedTypes.includes(file.type)) {
                                                                                                                                                                                                                                                                                                                                                           throw Error('Escolha uma imagem JPG, PNG ou WebP.');
                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                             if (file.size > 10 * 1024 * 1024) {
                                                                                                                                                                                                                                                                                                                                                              throw Error('A foto deve ter no máximo 10 MB.');
                                                                                                                                                                                                                                                                                                                                                               }

                                                                                                                                                                                                                                                                                                                                                                const url = URL.createObjectURL(file);

                                                                                                                                                                                                                                                                                                                                                                 try {
                                                                                                                                                                                                                                                                                                                                                                  const image = new Image();
                                                                                                                                                                                                                                                                                                                                                                   image.src = url;
                                                                                                                                                                                                                                                                                                                                                                    await image.decode();

                                                                                                                                                                                                                                                                                                                                                                     const ratio = Math.min(
                                                                                                                                                                                                                                                                                                                                                                      1,
                                                                                                                                                                                                                                                                                                                                                                       1080 / Math.max(image.width, image.height)
                                                                                                                                                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                                                                                                                                                         const canvas = document.createElement('canvas');
                                                                                                                                                                                                                                                                                                                                                                          canvas.width = Math.max(1, Math.round(image.width * ratio));
                                                                                                                                                                                                                                                                                                                                                                           canvas.height = Math.max(1, Math.round(image.height * ratio));

                                                                                                                                                                                                                                                                                                                                                                            const context = canvas.getContext('2d');
                                                                                                                                                                                                                                                                                                                                                                             context.fillStyle = '#fff';
                                                                                                                                                                                                                                                                                                                                                                              context.fillRect(0, 0, canvas.width, canvas.height);
                                                                                                                                                                                                                                                                                                                                                                               context.drawImage(image, 0, 0, canvas.width, canvas.height);

                                                                                                                                                                                                                                                                                                                                                                                return canvas.toDataURL('image/jpeg', 0.78);
                                                                                                                                                                                                                                                                                                                                                                                 } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                  throw Error('Não foi possível ler essa foto. Escolha outra imagem.');
                                                                                                                                                                                                                                                                                                                                                                                   } finally {
                                                                                                                                                                                                                                                                                                                                                                                    URL.revokeObjectURL(url);
                                                                                                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                                                                                                     }

                                                                                                                                                                                                                                                                                                                                                                                     /* Mostra a prévia da foto selecionada */
                                                                                                                                                                                                                                                                                                                                                                                     $('#photo').addEventListener('change', async () => {
                                                                                                                                                                                                                                                                                                                                                                                      pendingPhoto = '';
                                                                                                                                                                                                                                                                                                                                                                                       $('#preview').hidden = true;
                                                                                                                                                                                                                                                                                                                                                                                        $('#form-error').textContent = '';

                                                                                                                                                                                                                                                                                                                                                                                         const file = $('#photo').files[0];
                                                                                                                                                                                                                                                                                                                                                                                          if (!file) return;

                                                                                                                                                                                                                                                                                                                                                                                           processing = true;
                                                                                                                                                                                                                                                                                                                                                                                            $('#publish').disabled = true;

                                                                                                                                                                                                                                                                                                                                                                                             try {
                                                                                                                                                                                                                                                                                                                                                                                              pendingPhoto = await compressPhoto(file);
                                                                                                                                                                                                                                                                                                                                                                                               $('#preview').src = pendingPhoto;
                                                                                                                                                                                                                                                                                                                                                                                                $('#preview').hidden = false;
                                                                                                                                                                                                                                                                                                                                                                                                 } catch (error) {
                                                                                                                                                                                                                                                                                                                                                                                                  $('#form-error').textContent = error.message;
                                                                                                                                                                                                                                                                                                                                                                                                   $('#photo').value = '';
                                                                                                                                                                                                                                                                                                                                                                                                    } finally {
                                                                                                                                                                                                                                                                                                                                                                                                     processing = false;
                                                                                                                                                                                                                                                                                                                                                                                                      $('#publish').disabled = false;
                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                       });

                                                                                                                                                                                                                                                                                                                                                                                                       /* Publica a foto no feed local */
                                                                                                                                                                                                                                                                                                                                                                                                       $('#create-form').addEventListener('submit', event => {
                                                                                                                                                                                                                                                                                                                                                                                                        event.preventDefault();
                                                                                                                                                                                                                                                                                                                                                                                                         if (processing) return;

                                                                                                                                                                                                                                                                                                                                                                                                          if (!pendingPhoto) {
                                                                                                                                                                                                                                                                                                                                                                                                           $('#form-error').textContent = 'Escolha uma foto antes de publicar.';
                                                                                                                                                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                                                                                                                                                             }

                                                                                                                                                                                                                                                                                                                                                                                                              if (mutate(() => {
                                                                                                                                                                                                                                                                                                                                                                                                               state.posts.unshift({
                                                                                                                                                                                                                                                                                                                                                                                                                id: 'post-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
                                                                                                                                                                                                                                                                                                                                                                                                                 user: state.username,
                                                                                                                                                                                                                                                                                                                                                                                                                  image: pendingPhoto,
                                                                                                                                                                                                                                                                                                                                                                                                                   caption: $('#caption').value.trim(),
                                                                                                                                                                                                                                                                                                                                                                                                                    likes: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                     liked: false,
                                                                                                                                                                                                                                                                                                                                                                                                                      saved: false,
                                                                                                                                                                                                                                                                                                                                                                                                                       own: true,
                                                                                                                                                                                                                                                                                                                                                                                                                        created: Date.now(),
                                                                                                                                                                                                                                                                                                                                                                                                                         comments: []
                                                                                                                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                                                                                                                           })) {
                                                                                                                                                                                                                                                                                                                                                                                                                            $('#create-form').reset();
                                                                                                                                                                                                                                                                                                                                                                                                                             pendingPhoto = '';
                                                                                                                                                                                                                                                                                                                                                                                                                              $('#preview').hidden = true;
                                                                                                                                                                                                                                                                                                                                                                                                                               $('#form-error').textContent = '';
                                                                                                                                                                                                                                                                                                                                                                                                                                $('#create-dialog').close();
                                                                                                                                                                                                                                                                                                                                                                                                                                 view = 'home';
                                                                                                                                                                                                                                                                                                                                                                                                                                  $('#search').value = '';
                                                                                                                                                                                                                                                                                                                                                                                                                                   render();
                                                                                                                                                                                                                                                                                                                                                                                                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                                                                                                                                                                                                                                                                                                                                                                                     toast('Publicação criada neste navegador.');
                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                                                                                                                                                                      /* Exibe o feed ao abrir a página */
                                                                                                                                                                                                                                                                                                                                                                                                                                      render();