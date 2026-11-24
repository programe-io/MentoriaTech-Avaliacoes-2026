const form = document.getElementById("imc-form");
const listaEl = document.getElementById("lista-registros");
const botoesFiltro = document.querySelectorAll(".filtros button");

let registros = JSON.parse(localStorage.getItem("gerenciador_imc")) || [];
let filtroAtual = "todas";

function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
    let classificacao = "";

      if (imc < 18.5) classificacao = "Abaixo do peso";
        else if (imc < 25) classificacao = "Peso normal";
          else if (imc < 30) classificacao = "Sobrepeso";
            else classificacao = "Obesidade";

              return {
                  valor: imc.toFixed(2),
                      classificacao
                        };
                        }

                        function salvar() {
                          localStorage.setItem("gerenciador_imc", JSON.stringify(registros));
                          }

                          function renderizar() {
                            listaEl.innerHTML = "";

                              const filtrados = registros.filter((item) => {
                                  if (filtroAtual === "pendentes") return !item.concluida;
                                      if (filtroAtual === "concluidas") return item.concluida;
                                          return true;
                                            });

                                              filtrados.forEach((item) => {
                                                  const li = document.createElement("li");
                                                      li.className = `item ${item.concluida ? "concluida" : ""}`;

                                                          li.innerHTML = `
                                                                <div>
                                                                        <strong class="titulo">${item.nome}</strong>
                                                                                <p>IMC: <strong>${item.imc}</strong> (${item.classificacao}) — ${item.peso}kg / ${item.altura}m</p>
                                                                                      </div>
                                                                                            <div class="acoes">
                                                                                                    <button type="button" onclick="alternarStatus(${item.id})">
                                                                                                              ${item.concluida ? "Reabrir" : "Concluir"}
                                                                                                                      </button>
                                                                                                                              <button type="button" class="btn-remover" onclick="removerItem(${item.id})">
                                                                                                                                        Excluir
                                                                                                                                                </button>
                                                                                                                                                      </div>
                                                                                                                                                          `;

                                                                                                                                                              listaEl.appendChild(li);
                                                                                                                                                                });
                                                                                                                                                                }

                                                                                                                                                                function alternarStatus(id) {
                                                                                                                                                                  registros = registros.map((item) =>
                                                                                                                                                                      item.id === id ? { ...item, concluida: !item.concluida } : item
                                                                                                                                                                        );
                                                                                                                                                                          salvar();
                                                                                                                                                                            renderizar();
                                                                                                                                                                            }

                                                                                                                                                                            function removerItem(id) {
                                                                                                                                                                              registros = registros.filter((item) => item.id !== id);
                                                                                                                                                                                salvar();
                                                                                                                                                                                  renderizar();
                                                                                                                                                                                  }

                                                                                                                                                                                  form.addEventListener("submit", (event) => {
                                                                                                                                                                                    event.preventDefault();

                                                                                                                                                                                      const nome = document.getElementById("nome").value.trim();
                                                                                                                                                                                        const peso = parseFloat(document.getElementById("peso").value);
                                                                                                                                                                                          const altura = parseFloat(document.getElementById("altura").value);

                                                                                                                                                                                            if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) return;

                                                                                                                                                                                              const resultado = calcularIMC(peso, altura);

                                                                                                                                                                                                registros.unshift({
                                                                                                                                                                                                    id: Date.now(),
                                                                                                                                                                                                        nome,
                                                                                                                                                                                                            peso,
                                                                                                                                                                                                                altura,
                                                                                                                                                                                                                    imc: resultado.valor,
                                                                                                                                                                                                                        classificacao: resultado.classificacao,
                                                                                                                                                                                                                            concluida: false
                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                salvar();
                                                                                                                                                                                                                                  renderizar();
                                                                                                                                                                                                                                    form.reset();
                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                    botoesFiltro.forEach((btn) => {
                                                                                                                                                                                                                                      btn.addEventListener("click", () => {
                                                                                                                                                                                                                                          botoesFiltro.forEach((b) => b.classList.remove("ativo"));
                                                                                                                                                                                                                                              btn.classList.add("ativo");
                                                                                                                                                                                                                                                  filtroAtual = btn.dataset.filtro;
                                                                                                                                                                                                                                                      renderizar();
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                        renderizar();
                                                                                                                                                                                                                                                        