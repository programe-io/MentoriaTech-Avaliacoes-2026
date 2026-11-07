'use strict';

const formulario = document.getElementById('formulario');
const nome = document.getElementById('nome');
const mensagem = document.getElementById('mensagem');
const arquivo = document.getElementById('foto');
const previa = document.getElementById('previa');
const areaPrevia = document.getElementById('area-previa');
const aviso = document.getElementById('aviso-foto');
const status = document.getElementById('status');
const feed = document.getElementById('feed');
const publicar = document.getElementById('publicar');

let fotoSelecionada = '';
let lendo = false;
let versao = 0;

// Limpa a foto e a prévia.
function limparFoto() {
 versao += 1;
  fotoSelecionada = '';
   lendo = false;
    publicar.disabled = false;
     arquivo.value = '';
      previa.removeAttribute('src');
       areaPrevia.hidden = true;
        aviso.textContent = '';
        }

        // Carrega a foto escolhida no dispositivo.
        arquivo.addEventListener('change', function () {
         const foto = arquivo.files[0];
          limparFoto();

           if (!foto) return;

            if (!['image/jpeg', 'image/png', 'image/webp'].includes(foto.type)) {
             aviso.textContent = 'Escolha uma foto JPG, PNG ou WebP.';
              return;
               }

                if (foto.size > 5 * 1024 * 1024) {
                 aviso.textContent = 'A foto precisa ter até 5 MB.';
                  return;
                   }

                    const atual = versao;
                     const leitor = new FileReader();

                      lendo = true;
                       publicar.disabled = true;
                        aviso.textContent = 'Carregando foto…';

                         leitor.addEventListener('load', function () {
                          if (atual !== versao) return;

                           const imagem = new Image();

                            imagem.onload = function () {
                             if (atual !== versao) return;

                              fotoSelecionada = leitor.result;
                               previa.src = fotoSelecionada;
                                areaPrevia.hidden = false;
                                 aviso.textContent = 'Foto pronta para publicar.';
                                  lendo = false;
                                   publicar.disabled = false;
                                    };

                                     imagem.onerror = function () {
                                      if (atual !== versao) return;
                                       limparFoto();
                                        aviso.textContent = 'Não foi possível abrir essa foto. Tente outra.';
                                         };

                                          imagem.src = leitor.result;
                                           });

                                            leitor.addEventListener('error', function () {
                                             if (atual !== versao) return;
                                              limparFoto();
                                               aviso.textContent = 'Não foi possível ler essa foto.';
                                                });

                                                 leitor.readAsDataURL(foto);
                                                 });

                                                 document.getElementById('remover-foto')
                                                  .addEventListener('click', limparFoto);

                                                  // Cria elementos sem transformar o texto em HTML.
                                                  function elemento(tag, classe, texto) {
                                                   const item = document.createElement(tag);
                                                    if (classe) item.className = classe;
                                                     if (texto !== undefined) item.textContent = texto;
                                                      return item;
                                                      }

                                                      // Monta uma publicação no feed.
                                                      function criarPost(autor, texto, foto, podeExcluir) {
                                                       const post = elemento('article', 'post');

                                                        post.appendChild(elemento('strong', '', autor));
                                                         post.appendChild(
                                                          elemento('div', 'data', new Date().toLocaleString('pt-BR'))
                                                           );

                                                            if (texto) {
                                                             post.appendChild(elemento('p', 'conteudo', texto));
                                                              }

                                                               if (foto) {
                                                                const imagem = elemento('img', 'foto');
                                                                 imagem.src = foto;
                                                                  imagem.alt = 'Foto publicada por ' + autor;
                                                                   post.appendChild(imagem);
                                                                    }

                                                                     const acoes = elemento('div', 'acoes');
                                                                      const curtir = elemento('button', 'secundario', 'Curtir · 0');

                                                                       curtir.type = 'button';
                                                                        curtir.setAttribute('aria-pressed', 'false');

                                                                         let curtido = false;

                                                                          curtir.addEventListener('click', function () {
                                                                           curtido = !curtido;
                                                                            curtir.textContent = curtido ? 'Curtido · 1' : 'Curtir · 0';
                                                                             curtir.setAttribute('aria-pressed', String(curtido));
                                                                              });

                                                                               acoes.appendChild(curtir);

                                                                                if (podeExcluir) {
                                                                                 const excluir = elemento('button', 'secundario', 'Excluir');
                                                                                  excluir.type = 'button';

                                                                                   excluir.addEventListener('click', function () {
                                                                                    if (window.confirm('Excluir esta publicação?')) {
                                                                                     post.remove();
                                                                                      status.textContent = 'Publicação excluída.';
                                                                                       }
                                                                                        });

                                                                                         acoes.appendChild(excluir);
                                                                                          }

                                                                                           post.appendChild(acoes);
                                                                                            feed.insertBefore(post, feed.firstChild);
                                                                                            }

                                                                                            // Publica o texto, a foto ou os dois juntos.
                                                                                            formulario.addEventListener('submit', function (evento) {
                                                                                             evento.preventDefault();
                                                                                              if (lendo) return;

                                                                                               const texto = mensagem.value.trim();

                                                                                                if (!texto && !fotoSelecionada) {
                                                                                                 status.textContent = 'Escreva uma mensagem ou escolha uma foto.';
                                                                                                  return;
                                                                                                   }

                                                                                                    criarPost(
                                                                                                     nome.value.trim() || 'Visitante',
                                                                                                      texto,
                                                                                                       fotoSelecionada,
                                                                                                        true
                                                                                                         );

                                                                                                          mensagem.value = '';
                                                                                                           limparFoto();
                                                                                                            status.textContent = 'Publicado! O post fica nesta aba até atualizar a página.';
                                                                                                            });

                                                                                                            // Publicação inicial de exemplo.
                                                                                                            criarPost(
                                                                                                             'Equipe A nova era',
                                                                                                              'Boas-vindas! Qual campanha de Call of Duty mais marcou você? Este é um post de exemplo.',
                                                                                                               '',
                                                                                                                false
                                                                                                                );