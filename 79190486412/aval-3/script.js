// Troque pelo número real, com código do país e DDD (ex.: 5511999999999)
const WHATSAPP = "5500000000000";

const raiz = document.documentElement;
const btn = document.getElementById("troca");
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Modo quieto / divertido (lembra a escolha)
function definirModo(modo, festa) {
  raiz.dataset.modo = modo;
    btn.setAttribute("aria-pressed", modo === "divertido");
      try { localStorage.setItem("diego-modo", modo); } catch (e) {}
        if (festa && modo === "divertido" && !reduz) chuva();
        }
        btn.addEventListener("click", () => {
          definirModo(raiz.dataset.modo === "quieto" ? "divertido" : "quieto", true);
          });
          try {
            const salvo = localStorage.getItem("diego-modo");
              if (salvo === "divertido") definirModo("divertido", false);
              } catch (e) {}

              // 2. Chuva de emojis ao ativar o modo divertido
              function chuva() {
                const area = document.getElementById("chuva");
                  const emojis = ["😄", "🎉", "🤪", "✨", "🎈", "😎"];
                    for (let i = 0; i < 24; i++) {
                        const s = document.createElement("span");
                            s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                                s.style.left = Math.random() * 100 + "vw";
                                    s.style.animationDelay = Math.random() * 0.8 + "s";
                                        area.appendChild(s);
                                            setTimeout(() => s.remove(), 3500);
                                              }
                                              }

                                              // 3. Pergunte ao Diego (respostas de exemplo, edite à vontade)
                                              const respostas = [
                                                "Hmm... talvez.",
                                                  "Só se tiver lanche.",
                                                    "Sim, mas eu fico no fundo da sala.",
                                                      "Boa ideia. Vai você primeiro.",
                                                        "Deixa eu pensar... não.",
                                                          "Claro! Eu levo o silêncio.",
                                                            "Pergunta de novo, não ouvi. (Ouvi.)"
                                                            ];
                                                            let ultima = -1;
                                                            document.getElementById("sorteia").addEventListener("click", () => {
                                                              let n;
                                                                do { n = Math.floor(Math.random() * respostas.length); } while (n === ultima);
                                                                  ultima = n;
                                                                    document.getElementById("resposta").textContent = respostas[n];
                                                                    });

                                                                    // 4. Recado pelo WhatsApp
                                                                    document.getElementById("form").addEventListener("submit", e => {
                                                                      e.preventDefault();
                                                                        const nome = document.getElementById("fNome").value.trim();
                                                                          const msg = document.getElementById("fMsg").value.trim();
                                                                            const erro = document.getElementById("erro");
                                                                              if (nome.length < 2) return erro.textContent = "Digite seu nome.";
                                                                                if (msg.length < 3) return erro.textContent = "Escreva o recado.";
                                                                                  erro.textContent = "";
                                                                                    const texto = `Oi, Diego! Aqui é ${nome}. ${msg}`;
                                                                                      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
                                                                                      });

                                                                                      document.getElementById("ano").textContent = new Date().getFullYear();
                                                                                      