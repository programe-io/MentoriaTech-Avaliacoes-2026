// Troque pelo número real, com código do país e DDD (ex.: 5511999999999)
const WHATSAPP = "5500000000000";

const produtos = [
  { id: 1, nome: "Bolo de morango", desc: "Massa de baunilha, chantilly e morangos frescos.", preco: 85, tipo: "bolo", cor: "#e63a6e" },
    { id: 2, nome: "Bolo de chocolate", desc: "Massa úmida com ganache de chocolate meio amargo.", preco: 80, tipo: "bolo", cor: "#6b3a2a" },
      { id: 3, nome: "Torta de maracujá", desc: "Base crocante e mousse de maracujá.", preco: 70, tipo: "torta", cor: "#e0a100" },
        { id: 4, nome: "Torta de pistache", desc: "Creme de pistache e base de amêndoas.", preco: 95, tipo: "torta", cor: "#5aa17a" },
          { id: 5, nome: "Brigadeiro gourmet (6 un.)", desc: "Chocolate belga, enrolados na hora.", preco: 24, tipo: "doce", cor: "#3d1237" },
            { id: 6, nome: "Beijinho de coco (6 un.)", desc: "Coco fresco e cravo na medida certa.", preco: 22, tipo: "doce", cor: "#9bc9ad" }
            ];
            const carrinho = {};
            const moeda = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

            // 1. Seletor de sabor do bolo
            const bolo = document.getElementById("bolo");
            const nomeSabor = document.getElementById("saborNome");
            const botoesSabor = document.querySelectorAll(".sabor");
            botoesSabor.forEach(b => b.addEventListener("click", () => {
              botoesSabor.forEach(x => x.classList.remove("ativo"));
                b.classList.add("ativo");
                  document.documentElement.style.setProperty("--c", b.dataset.cor);
                    document.documentElement.style.setProperty("--clara", b.dataset.clara);
                      nomeSabor.textContent = b.dataset.nome;
                        bolo.classList.remove("troca"); void bolo.offsetWidth; bolo.classList.add("troca");
                        }));

                        // 2. Cardápio
                        const lista = document.getElementById("lista");
                        produtos.forEach(p => {
                          const li = document.createElement("li");
                            li.className = "item";
                              li.dataset.tipo = p.tipo;
                                li.style.setProperty("--cor", p.cor);
                                  li.innerHTML = `
                                      <div><h3>${p.nome}</h3><p>${p.desc}</p><span class="preco">${moeda(p.preco)}</span></div>
                                          <div class="qtd">
                                                <button type="button" aria-label="Tirar ${p.nome}" data-id="${p.id}" data-d="-1">−</button>
                                                      <output id="q${p.id}">0</output>
                                                            <button type="button" aria-label="Adicionar ${p.nome}" data-id="${p.id}" data-d="1">+</button>
                                                                </div>`;
                                                                  lista.appendChild(li);
                                                                  });
                                                                  lista.addEventListener("click", e => {
                                                                    const b = e.target.closest("button[data-id]");
                                                                      if (!b) return;
                                                                        const id = +b.dataset.id;
                                                                          carrinho[id] = Math.max(0, (carrinho[id] || 0) + +b.dataset.d);
                                                                            document.getElementById("q" + id).textContent = carrinho[id];
                                                                              atualizarPedido();
                                                                              });

                                                                              // 3. Filtro
                                                                              const filtros = document.querySelectorAll(".filtro");
                                                                              filtros.forEach(f => f.addEventListener("click", () => {
                                                                                filtros.forEach(x => x.classList.remove("ativo"));
                                                                                  f.classList.add("ativo");
                                                                                    document.querySelectorAll(".item").forEach(i => {
                                                                                        i.classList.toggle("escondido", f.dataset.filtro !== "todos" && i.dataset.tipo !== f.dataset.filtro);
                                                                                          });
                                                                                          }));

                                                                                          // 4. Resumo do pedido
                                                                                          function atualizarPedido() {
                                                                                            const resumo = document.getElementById("resumo");
                                                                                              resumo.innerHTML = "";
                                                                                                let total = 0, itens = 0;
                                                                                                  produtos.forEach(p => {
                                                                                                      const q = carrinho[p.id] || 0;
                                                                                                          if (!q) return;
                                                                                                              itens += q; total += q * p.preco;
                                                                                                                  const li = document.createElement("li");
                                                                                                                      li.innerHTML = `<span>${q}× ${p.nome}</span><span>${moeda(q * p.preco)}</span>`;
                                                                                                                          resumo.appendChild(li);
                                                                                                                            });
                                                                                                                              document.getElementById("vazio").hidden = itens > 0;
                                                                                                                                document.getElementById("total").textContent = moeda(total);
                                                                                                                                }
                                                                                                                                atualizarPedido();

                                                                                                                                // 5. Enviar pelo WhatsApp
                                                                                                                                const data = document.getElementById("data");
                                                                                                                                data.min = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
                                                                                                                                document.getElementById("enviar").addEventListener("click", e => {
                                                                                                                                  e.preventDefault();
                                                                                                                                    const erro = document.getElementById("erro");
                                                                                                                                      const nome = document.getElementById("cliente").value.trim();
                                                                                                                                        const linhas = produtos.filter(p => carrinho[p.id]).map(p => `${carrinho[p.id]}x ${p.nome}`);
                                                                                                                                          if (!linhas.length) return erro.textContent = "Adicione pelo menos um item ao pedido.";
                                                                                                                                            if (nome.length < 2) return erro.textContent = "Digite seu nome.";
                                                                                                                                              if (!data.value) return erro.textContent = "Escolha a data desejada.";
                                                                                                                                                if (data.value < data.min) return erro.textContent = "Escolha uma data com pelo menos 3 dias de antecedência.";
                                                                                                                                                  erro.textContent = "";
                                                                                                                                                    const [a, m, d] = data.value.split("-");
                                                                                                                                                      const total = document.getElementById("total").textContent;
                                                                                                                                                        const msg = `Olá, Ana Beatriz! Sou ${nome} e gostaria de encomendar para ${d}/${m}/${a}:\n${linhas.join("\n")}\nTotal: ${total}`;
                                                                                                                                                          window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
                                                                                                                                                          });

                                                                                                                                                          document.getElementById("ano").textContent = new Date().getFullYear();
                                                                                                                                                          