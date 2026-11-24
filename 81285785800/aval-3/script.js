const alvo = document.getElementById("alvo");
const arena = document.getElementById("arena");

const pontosEl = document.getElementById("pontos");
const tempoEl = document.getElementById("tempo");
const comboEl = document.getElementById("combo");
const recordeEl = document.getElementById("recorde");
const progresso = document.getElementById("progresso");

const inicio = document.getElementById("inicio");
const fim = document.getElementById("fim");

const btnComecar = document.getElementById("btnComecar");
const btnNovamente = document.getElementById("btnNovamente");
const btnTema = document.getElementById("btnTema");

const pontuacaoFinal = document.getElementById("pontuacaoFinal");
const mensagemFinal = document.getElementById("mensagemFinal");

let pontos = 0;
let tempo = 30;
let combo = 0;
let jogoAtivo = false;
let intervalo;

let recorde = Number(localStorage.getItem("recordeClique")) || 0;
recordeEl.textContent = recorde;

function iniciarJogo() {
  pontos = 0;
    tempo = 30;
      combo = 0;
        jogoAtivo = true;

          pontosEl.textContent = pontos;
            tempoEl.textContent = tempo;
              comboEl.textContent = combo;
                progresso.style.width = "100%";

                  inicio.classList.add("escondido");
                    fim.classList.add("escondido");

                      alvo.style.display = "block";

                        posicionarAlvo();

                          clearInterval(intervalo);

                            intervalo = setInterval(() => {
                                tempo--;

                                    tempoEl.textContent = tempo;

                                        const porcentagem = (tempo / 30) * 100;
                                            progresso.style.width = porcentagem + "%";

                                                if (tempo <= 0) {
                                                      terminarJogo();
                                                          }
                                                            }, 1000);
                                                            }

                                                            function posicionarAlvo() {
                                                              const larguraArena = arena.clientWidth;
                                                                const alturaArena = arena.clientHeight;

                                                                  const tamanho = 70;

                                                                    const x = Math.random() * (larguraArena - tamanho - 20) + 10;
                                                                      const y = Math.random() * (alturaArena - tamanho - 20) + 10;

                                                                        alvo.style.left = x + "px";
                                                                          alvo.style.top = y + "px";
                                                                          }

                                                                          alvo.addEventListener("click", () => {
                                                                            if (!jogoAtivo) return;

                                                                              combo++;

                                                                                let ganho = 10;

                                                                                  if (combo >= 5) {
                                                                                      ganho = 20;
                                                                                        }

                                                                                          if (combo >= 10) {
                                                                                              ganho = 30;
                                                                                                }

                                                                                                  pontos += ganho;

                                                                                                    pontosEl.textContent = pontos;
                                                                                                      comboEl.textContent = combo;

                                                                                                        posicionarAlvo();
                                                                                                        });

                                                                                                        arena.addEventListener("click", (evento) => {
                                                                                                          if (!jogoAtivo) return;

                                                                                                            if (evento.target !== alvo) {
                                                                                                                combo = 0;
                                                                                                                    comboEl.textContent = combo;
                                                                                                                      }
                                                                                                                      });

                                                                                                                      function terminarJogo() {
                                                                                                                        jogoAtivo = false;

                                                                                                                          clearInterval(intervalo);

                                                                                                                            alvo.style.display = "none";

                                                                                                                              pontuacaoFinal.textContent = pontos;

                                                                                                                                if (pontos > recorde) {
                                                                                                                                    recorde = pontos;
                                                                                                                                        localStorage.setItem("recordeClique", recorde);
                                                                                                                                            recordeEl.textContent = recorde;

                                                                                                                                                mensagemFinal.textContent = "🏆 Novo recorde! Parabéns!";
                                                                                                                                                  } else if (pontos >= 300) {
                                                                                                                                                      mensagemFinal.textContent = "🔥 Excelente! Você foi muito rápido!";
                                                                                                                                                        } else if (pontos >= 150) {
                                                                                                                                                            mensagemFinal.textContent = "👏 Muito bom! Continue treinando!";
                                                                                                                                                              } else {
                                                                                                                                                                  mensagemFinal.textContent = "💪 Tente novamente para melhorar sua pontuação!";
                                                                                                                                                                    }

                                                                                                                                                                      fim.classList.remove("escondido");
                                                                                                                                                                      }

                                                                                                                                                                      btnComecar.addEventListener("click", iniciarJogo);
                                                                                                                                                                      btnNovamente.addEventListener("click", iniciarJogo);

                                                                                                                                                                      btnTema.addEventListener("click", () => {
                                                                                                                                                                        document.body.classList.toggle("claro");

                                                                                                                                                                          if (document.body.classList.contains("claro")) {
                                                                                                                                                                              btnTema.textContent = "☀️";
                                                                                                                                                                                } else {
                                                                                                                                                                                    btnTema.textContent = "🌙";
                                                                                                                                                                                      }
                                                                                                                                                                                      });