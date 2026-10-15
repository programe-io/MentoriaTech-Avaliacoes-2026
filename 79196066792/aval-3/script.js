// 1. Nome em letras que reagem ao mouse/toque
const nome = document.getElementById("nome");
"Alessandro".split("").forEach(l => {
  const s = document.createElement("span");
    s.textContent = l;
      s.setAttribute("aria-hidden", "true");
        nome.appendChild(s);
        });
        const letras = [...nome.children];
        const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

        function mover(x, y) {
          letras.forEach(el => {
              const r = el.getBoundingClientRect();
                  const dx = x - (r.left + r.width / 2);
                      const dy = y - (r.top + r.height / 2);
                          const d = Math.hypot(dx, dy);
                              const forca = Math.max(0, 1 - d / 220);
                                  el.style.transform = `translateY(${-forca * 28}px) rotate(${forca * (dx > 0 ? -6 : 6)}deg)`;
                                      el.classList.toggle("perto", forca > 0.5);
                                        });
                                        }
                                        function soltar() {
                                          letras.forEach(el => { el.style.transform = ""; el.classList.remove("perto"); });
                                          }
                                          if (!reduz) {
                                            const hero = document.getElementById("inicio");
                                              hero.addEventListener("pointermove", e => mover(e.clientX, e.clientY));
                                                hero.addEventListener("pointerleave", soltar);
                                                }

                                                // 2. Menu no celular
                                                const menuBtn = document.getElementById("menuBtn");
                                                const navEl = document.getElementById("nav");
                                                menuBtn.addEventListener("click", () => {
                                                  const aberto = navEl.classList.toggle("aberto");
                                                    menuBtn.setAttribute("aria-expanded", aberto);
                                                    });
                                                    navEl.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
                                                      navEl.classList.remove("aberto");
                                                        menuBtn.setAttribute("aria-expanded", "false");
                                                        }));

                                                        // 3. Filtro de projetos
                                                        const filtros = document.querySelectorAll(".filtro");
                                                        const cards = document.querySelectorAll(".card");
                                                        filtros.forEach(btn => btn.addEventListener("click", () => {
                                                          filtros.forEach(b => b.classList.remove("ativo"));
                                                            btn.classList.add("ativo");
                                                              const f = btn.dataset.filtro;
                                                                cards.forEach(c => {
                                                                    const mostrar = f === "todos" || c.dataset.tipo === f;
                                                                        c.classList.toggle("escondido", !mostrar);
                                                                            if (mostrar) { c.classList.remove("aparece"); void c.offsetWidth; c.classList.add("aparece"); }
                                                                              });
                                                                              }));

                                                                              // 4. Contador dos números (roda uma vez ao aparecer)
                                                                              const contadores = document.querySelectorAll("[data-alvo]");
                                                                              const obs = new IntersectionObserver((itens, o) => {
                                                                                itens.forEach(i => {
                                                                                    if (!i.isIntersecting) return;
                                                                                        const el = i.target, alvo = +el.dataset.alvo;
                                                                                            let n = 0;
                                                                                                const passo = Math.max(1, Math.round(alvo / 40));
                                                                                                    const t = setInterval(() => {
                                                                                                          n = Math.min(alvo, n + passo);
                                                                                                                el.textContent = n;
                                                                                                                      if (n === alvo) clearInterval(t);
                                                                                                                          }, 30);
                                                                                                                              o.unobserve(el);
                                                                                                                                });
                                                                                                                                }, { threshold: 0.6 });
                                                                                                                                contadores.forEach(c => obs.observe(c));

                                                                                                                                // 5. Formulário com validação
                                                                                                                                const form = document.getElementById("form");
                                                                                                                                const campos = [
                                                                                                                                  { el: "fNome", erro: "eNome", ok: v => v.trim().length >= 2, msg: "Digite seu nome." },
                                                                                                                                    { el: "fEmail", erro: "eEmail", ok: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Digite um e-mail válido, como nome@email.com." },
                                                                                                                                      { el: "fMsg", erro: "eMsg", ok: v => v.trim().length >= 10, msg: "Escreva pelo menos 10 caracteres." }
                                                                                                                                      ];
                                                                                                                                      form.addEventListener("submit", e => {
                                                                                                                                        e.preventDefault();
                                                                                                                                          let tudoOk = true;
                                                                                                                                            campos.forEach(c => {
                                                                                                                                                const input = document.getElementById(c.el);
                                                                                                                                                    const valido = c.ok(input.value);
                                                                                                                                                        input.classList.toggle("invalido", !valido);
                                                                                                                                                            document.getElementById(c.erro).textContent = valido ? "" : c.msg;
                                                                                                                                                                if (!valido) tudoOk = false;
                                                                                                                                                                  });
                                                                                                                                                                    const ok = document.getElementById("ok");
                                                                                                                                                                      if (tudoOk) {
                                                                                                                                                                          ok.textContent = "Mensagem enviada! Responderei em breve.";
                                                                                                                                                                              form.reset();
                                                                                                                                                                                } else {
                                                                                                                                                                                    ok.textContent = "";
                                                                                                                                                                                      }
                                                                                                                                                                                      });

                                                                                                                                                                                      // 6. Ano no rodapé
                                                                                                                                                                                      document.getElementById("ano").textContent = new Date().getFullYear();
                                                                                                                                                                                      