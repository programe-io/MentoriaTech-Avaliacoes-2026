// Troque pelo número real, com código do país e DDD (ex.: 5511999999999)
const WHATSAPP = "5500000000000";

const aulas = [
  { dia: "Seg", hora: "07:00", nome: "Hatha yoga", desc: "Posturas lentas para acordar o corpo.", nivel: "Iniciante" },
    { dia: "Seg", hora: "19:30", nome: "Respiração e pausa", desc: "Técnicas de respiração para fechar o dia.", nivel: "Todos os níveis" },
      { dia: "Ter", hora: "18:00", nome: "Vinyasa", desc: "Sequências fluidas, ligadas à respiração.", nivel: "Intermediário" },
        { dia: "Qua", hora: "07:00", nome: "Hatha yoga", desc: "Posturas lentas para acordar o corpo.", nivel: "Iniciante" },
          { dia: "Qui", hora: "19:00", nome: "Yoga restaurativo", desc: "Posturas apoiadas e relaxamento profundo.", nivel: "Todos os níveis" },
            { dia: "Sex", hora: "12:15", nome: "Yoga express", desc: "Quarenta minutos para a pausa do almoço.", nivel: "Todos os níveis" },
              { dia: "Sáb", hora: "09:00", nome: "Vinyasa", desc: "Sequências fluidas, ligadas à respiração.", nivel: "Intermediário" }
              ];
              const planos = [
                { nome: "Aula avulsa", preco: "R$ 45", per: "por aula", desc: "Para experimentar sem compromisso." },
                  { nome: "2x por semana", preco: "R$ 260", per: "por mês", desc: "Duas aulas semanais, no horário que preferir." },
                    { nome: "Livre", preco: "R$ 340", per: "por mês", desc: "Todas as aulas da semana, quando quiser." }
                    ];

                    // 1. Respiração guiada (inspire 4s, segure 4s, expire 6s)
                    const circulo = document.getElementById("circulo");
                    const fase = document.getElementById("fase");
                    const btnR = document.getElementById("btnRespira");
                    const passos = [
                      { txt: "Inspire", seg: 4, cheio: true },
                        { txt: "Segure", seg: 4, cheio: true },
                          { txt: "Expire", seg: 6, cheio: false }
                          ];
                          let ativo = false, timer = null, i = 0, ciclos = 0;

                          function passo() {
                            const p = passos[i];
                              fase.textContent = p.txt;
                                circulo.style.setProperty("--tempo", (p.txt === "Segure" ? 0.01 : p.seg) + "s");
                                  circulo.classList.toggle("cheio", p.cheio);
                                    timer = setTimeout(() => {
                                        i = (i + 1) % passos.length;
                                            if (i === 0) ciclos++;
                                                if (ciclos >= 6) return parar("Muito bem. Respire normalmente.");
                                                    passo();
                                                      }, p.seg * 1000);
                                                      }
                                                      function parar(msg) {
                                                        clearTimeout(timer);
                                                          ativo = false; i = 0; ciclos = 0;
                                                            circulo.style.setProperty("--tempo", "1.5s");
                                                              circulo.classList.remove("cheio");
                                                                fase.textContent = msg || "Pronta para começar?";
                                                                  btnR.textContent = "Começar respiração";
                                                                  }
                                                                  btnR.addEventListener("click", () => {
                                                                    if (ativo) return parar();
                                                                      ativo = true;
                                                                        btnR.textContent = "Parar";
                                                                          passo();
                                                                          });

                                                                          // 2. Lista de aulas com filtro por dia
                                                                          const lista = document.getElementById("lista");
                                                                          aulas.forEach(a => {
                                                                            const li = document.createElement("li");
                                                                              li.className = "aula";
                                                                                li.dataset.dia = a.dia;
                                                                                  li.innerHTML = `<div class="quando">${a.dia}<small>${a.hora}</small></div>
                                                                                      <div><h3>${a.nome}</h3><p>${a.desc} ${a.nivel}.</p></div>`;
                                                                                        lista.appendChild(li);
                                                                                        });
                                                                                        const vazio = document.createElement("li");
                                                                                        vazio.className = "vazio"; vazio.hidden = true;
                                                                                        vazio.textContent = "Sem aulas neste dia. Veja os outros dias da semana.";
                                                                                        lista.appendChild(vazio);

                                                                                        const dias = document.querySelectorAll(".dia");
                                                                                        dias.forEach(d => d.addEventListener("click", () => {
                                                                                          dias.forEach(x => x.classList.remove("ativo"));
                                                                                            d.classList.add("ativo");
                                                                                              let n = 0;
                                                                                                lista.querySelectorAll(".aula").forEach(li => {
                                                                                                    const ver = d.dataset.dia === "todos" || li.dataset.dia === d.dataset.dia;
                                                                                                        li.classList.toggle("escondido", !ver);
                                                                                                            if (ver) n++;
                                                                                                              });
                                                                                                                vazio.hidden = n > 0;
                                                                                                                }));

                                                                                                                // 3. Planos (um escolhido por vez)
                                                                                                                const grade = document.getElementById("gradePlanos");
                                                                                                                planos.forEach((p, idx) => {
                                                                                                                  const b = document.createElement("button");
                                                                                                                    b.type = "button"; b.className = "plano";
                                                                                                                      b.setAttribute("aria-pressed", idx === 1);
                                                                                                                        b.innerHTML = `<h3>${p.nome}</h3><span class="preco">${p.preco} <small>${p.per}</small></span><p>${p.desc}</p>`;
                                                                                                                          b.addEventListener("click", () => {
                                                                                                                              grade.querySelectorAll(".plano").forEach(x => x.setAttribute("aria-pressed", "false"));
                                                                                                                                  b.setAttribute("aria-pressed", "true");
                                                                                                                                    });
                                                                                                                                      grade.appendChild(b);
                                                                                                                                      });

                                                                                                                                      // 4. Reserva pelo WhatsApp
                                                                                                                                      const sel = document.getElementById("fAula");
                                                                                                                                      aulas.forEach((a, idx) => {
                                                                                                                                        const o = document.createElement("option");
                                                                                                                                          o.value = idx;
                                                                                                                                            o.textContent = `${a.dia} ${a.hora} — ${a.nome}`;
                                                                                                                                              sel.appendChild(o);
                                                                                                                                              });
                                                                                                                                              document.getElementById("form").addEventListener("submit", e => {
                                                                                                                                                e.preventDefault();
                                                                                                                                                  const nome = document.getElementById("fNome").value.trim();
                                                                                                                                                    const erro = document.getElementById("erro");
                                                                                                                                                      if (nome.length < 2) return erro.textContent = "Digite seu nome.";
                                                                                                                                                        erro.textContent = "";
                                                                                                                                                          const a = aulas[sel.value];
                                                                                                                                                            const plano = grade.querySelector('[aria-pressed="true"] h3').textContent;
                                                                                                                                                              const msg = `Olá, Maria Victória! Sou ${nome} e quero reservar uma aula experimental de ${a.nome} (${a.dia} às ${a.hora}). Tenho interesse no plano: ${plano}.`;
                                                                                                                                                                window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
                                                                                                                                                                });

                                                                                                                                                                document.getElementById("ano").textContent = new Date().getFullYear();
                                                                                                                                                                