// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Menu mobile
const menu = document.getElementById('menu');
document.getElementById('burger').onclick = () => menu.classList.toggle('aberto');
menu.querySelectorAll('a').forEach(a => a.onclick = () => menu.classList.remove('aberto'));

// Tema claro/escuro (lembra a escolha)
const btnTema = document.getElementById('tema');
try { if (localStorage.getItem('tema') === 'claro') { document.body.classList.add('claro'); btnTema.textContent = '☀️'; } } catch(e){}
btnTema.onclick = () => {
  const claro = document.body.classList.toggle('claro');
    btnTema.textContent = claro ? '☀️' : '🌙';
      try { localStorage.setItem('tema', claro ? 'claro' : 'escuro'); } catch(e){}
      };

      // Efeito de digitação
      const palavras = ['Front-end', 'Web', 'Criativo', 'Full Stack'];
      let p = 0, c = 0, apagando = false;
      const alvo = document.getElementById('digitando');
      function digitar() {
        const palavra = palavras[p];
          alvo.textContent = palavra.substring(0, c);
            if (!apagando && c < palavra.length) c++;
              else if (apagando && c > 0) c--;
                else if (!apagando) { apagando = true; return setTimeout(digitar, 1200); }
                  else { apagando = false; p = (p + 1) % palavras.length; }
                    setTimeout(digitar, apagando ? 60 : 110);
                    }
                    digitar();

                    // Animações ao rolar (reveal, barras e contadores)
                    function contar(el) {
                      const fim = +el.dataset.alvo; let n = 0;
                        const t = setInterval(() => {
                            n++; el.textContent = n;
                                if (n >= fim) clearInterval(t);
                                  }, 1200 / fim);
                                  }
                                  const obs = new IntersectionObserver(entradas => {
                                    entradas.forEach(e => {
                                        if (!e.isIntersecting) return;
                                            e.target.classList.add('visivel');
                                                e.target.querySelectorAll('.barra i').forEach(b => b.style.width = b.dataset.nivel + '%');
                                                    e.target.querySelectorAll('[data-alvo]').forEach(contar);
                                                        obs.unobserve(e.target);
                                                          });
                                                          }, { threshold: .2 });
                                                          document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

                                                          // Filtro de projetos
                                                          const filtros = document.querySelectorAll('.filtro');
                                                          filtros.forEach(btn => btn.onclick = () => {
                                                            filtros.forEach(b => b.classList.remove('ativo'));
                                                              btn.classList.add('ativo');
                                                                document.querySelectorAll('.card').forEach(card => {
                                                                    card.classList.toggle('oculto', btn.dataset.f !== 'todos' && card.dataset.cat !== btn.dataset.f);
                                                                      });
                                                                      });

                                                                      // Botão voltar ao topo
                                                                      const topo = document.getElementById('topo');
                                                                      window.addEventListener('scroll', () => topo.classList.toggle('mostrar', scrollY > 400));
                                                                      topo.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

                                                                      // Validação do formulário
                                                                      const form = document.getElementById('form');
                                                                      const aviso = document.getElementById('aviso');
                                                                      form.addEventListener('submit', e => {
                                                                        e.preventDefault();
                                                                          const nome = form.nome.value.trim(), email = form.email.value.trim(), msg = form.msg.value.trim();
                                                                            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                                                                              aviso.className = 'aviso';
                                                                                if (nome.length < 3) { aviso.textContent = 'Digite seu nome completo.'; aviso.classList.add('erro'); return; }
                                                                                  if (!emailOk) { aviso.textContent = 'Digite um e-mail válido.'; aviso.classList.add('erro'); return; }
                                                                                    if (msg.length < 10) { aviso.textContent = 'A mensagem precisa ter ao menos 10 caracteres.'; aviso.classList.add('erro'); return; }
                                                                                      aviso.textContent = '✅ Mensagem enviada com sucesso!';
                                                                                        aviso.classList.add('ok');
                                                                                          form.reset();
                                                                                          });