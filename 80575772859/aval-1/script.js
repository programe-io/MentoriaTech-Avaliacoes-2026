// VerdeAuto - Lógica da Horta Automatizada

const horta = {
  umidade: 68,
    temperatura: 24,
      luz: 850,
        reservatorio: 80,
          auto: true,
            plantas: ["Tomate", "Alface", "Manjericão"]
            };

            // Elementos
            const el = {
              umidade: document.getElementById('umidade'),
                barra: document.getElementById('barraUmidade'),
                  msg: document.getElementById('mensagem'),
                    temp: document.querySelectorAll('.card .valor')[1]
                    };

                    // 1. SIMULAR SENSORES EM TEMPO REAL
                    function simularSensores() {
                      // umidade cai sozinha com o tempo
                        if (horta.auto) {
                            horta.umidade -= Math.random() * 0.8;
                              }
                                
                                  // temperatura varia
                                    horta.temperatura = (24 + Math.sin(Date.now()/10000) * 2).toFixed(1);
                                      horta.luz = 700 + Math.floor(Math.random() * 300);

                                        // atualiza tela
                                          if(el.umidade) el.umidade.innerText = Math.round(horta.umidade) + "%";
                                            if(el.barra) el.barra.style.width = horta.umidade + "%";
                                              
                                                // cor da barra muda se estiver seco
                                                  if (horta.umidade < 40) {
                                                      el.barra.style.background = "#ef5350";
                                                          notificar("⚠️ Solo seco! Irrigando automaticamente...");
                                                              if (horta.auto) irrigar();
                                                                } else if (horta.umidade < 60) {
                                                                    el.barra.style.background = "#ffca28";
                                                                      } else {
                                                                          el.barra.style.background = "#29b6f6";
                                                                            }

                                                                              // salva
                                                                                localStorage.setItem("horta", JSON.stringify(horta));
                                                                                }

                                                                                setInterval(simularSensores, 2000);

                                                                                // 2. IRRIGAÇÃO
                                                                                function irrigar() {
                                                                                  if (horta.reservatorio <= 5) {
                                                                                      notificar("🚰 Reservatório vazio! Reabasteça.");
                                                                                          return;
                                                                                            }

                                                                                              el.msg.innerText = "💧 Irrigando por 30 segundos...";
                                                                                                document.querySelector(".btn-irrigar")?.classList.add("irrigando");

                                                                                                  setTimeout(() => {
                                                                                                      horta.umidade = 85 + Math.random() * 5;
                                                                                                          horta.reservatorio -= 5;
                                                                                                              el.msg.innerText = "✅ Irrigação concluída! Umidade em " + Math.round(horta.umidade) + "%";
                                                                                                                  document.querySelector(".btn-irrigar")?.classList.remove("irrigando");
                                                                                                                      
                                                                                                                          // efeito sonoro visual
                                                                                                                              criarGotas();
                                                                                                                                }, 2500);
                                                                                                                                }

                                                                                                                                // 3. MODO AUTOMÁTICO
                                                                                                                                function alternarModo() {
                                                                                                                                  horta.auto = !horta.auto;
                                                                                                                                    const btn = document.getElementById('btnModo');
                                                                                                                                      btn.innerText = horta.auto ? "Pausar Automático" : "Ativar Automático";
                                                                                                                                        notificar(horta.auto ? "▶️ Automático ATIVADO" : "⏸️ Automático PAUSADO");
                                                                                                                                        }

                                                                                                                                        // 4. NOTIFICAÇÃO E EFEITO DE GOTAS (só CSS/JS)
                                                                                                                                        function notificar(texto) {
                                                                                                                                          console.log(texto);
                                                                                                                                            if(el.msg) el.msg.innerText = texto;
                                                                                                                                            }

                                                                                                                                            function criarGotas() {
                                                                                                                                              for(let i=0; i<6; i++){
                                                                                                                                                  const gota = document.createElement("div");
                                                                                                                                                      gota.innerText = "💧";
                                                                                                                                                          gota.style.position = "fixed";
                                                                                                                                                              gota.style.left = 50 + Math.random()*40 + "%";
                                                                                                                                                                  gota.style.top = "0";
                                                                                                                                                                      gota.style.fontSize = "22px";
                                                                                                                                                                          gota.style.animation = "cair 1s ease-in forwards";
                                                                                                                                                                              document.body.appendChild(gota);
                                                                                                                                                                                  setTimeout(()=> gota.remove(), 1000);
                                                                                                                                                                                    }
                                                                                                                                                                                    }

                                                                                                                                                                                    // CSS da animação de cair injetado via JS
                                                                                                                                                                                    const style = document.createElement("style");
                                                                                                                                                                                    style.innerHTML = `@keyframes cair { to { top: 60vh; opacity:0; transform: translateY(100px); } }`;
                                                                                                                                                                                    document.head.appendChild(style);

                                                                                                                                                                                    // Carregar dados salvos
                                                                                                                                                                                    const salvo = localStorage.getItem("horta");
                                                                                                                                                                                    if(salvo) Object.assign(horta, JSON.parse(salvo));

                                                                                                                                                                                    console.log("🌱 Horta VerdeAuto iniciada");