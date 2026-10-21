
const flores = [
  {
      nome: "🌹 Rosa",
          descricao: "Representa o amor e a beleza.",
              cor: "#f8b4c4"
                },
                  {
                      nome: "🌻 Girassol",
                          descricao: "Acompanha a luz do sol e simboliza alegria.",
                              cor: "#ffe082"
                                },
                                  {
                                      nome: "🌷 Tulipa",
                                          descricao: "Uma flor delicada, conhecida por suas cores.",
                                              cor: "#ffb3c6"
                                                },
                                                  {
                                                      nome: "🌼 Margarida",
                                                          descricao: "Simboliza simplicidade e pureza.",
                                                              cor: "#fff0a8"
                                                                },
                                                                  {
                                                                      nome: "🌺 Hibisco",
                                                                          descricao: "Uma flor tropical de cores vibrantes.",
                                                                              cor: "#ffb3a7"
                                                                                },
                                                                                  {
                                                                                      nome: "🪻 Lavanda",
                                                                                          descricao: "Conhecida por sua cor e aroma suave.",
                                                                                              cor: "#d8c5f5"
                                                                                                }
                                                                                                ];

                                                                                                const dashboard = document.createElement("section");

                                                                                                dashboard.style.cssText = `
                                                                                                  font-family: Arial, sans-serif;
                                                                                                    background: #f0f8ef;
                                                                                                      padding: 25px;
                                                                                                        border-radius: 15px;
                                                                                                          color: #285943;
                                                                                                          `;

                                                                                                          dashboard.innerHTML = `
                                                                                                            <h1 style="text-align:center;">🌿 Natureza e Flores 🌸</h1>
                                                                                                              <p style="text-align:center;">
                                                                                                                  Descubra a beleza e a diversidade das flores!
                                                                                                                    </p>
                                                                                                                      <div id="cartoes-flores" style="
                                                                                                                          display:grid;
                                                                                                                              grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
                                                                                                                                  gap:15px;
                                                                                                                                    "></div>
                                                                                                                                    `;

                                                                                                                                    const lista = dashboard.querySelector("#cartoes-flores");

                                                                                                                                    flores.forEach((flor) => {
                                                                                                                                      const cartao = document.createElement("article");

                                                                                                                                        cartao.style.cssText = `
                                                                                                                                            background:${flor.cor};
                                                                                                                                                padding:20px;
                                                                                                                                                    border-radius:12px;
                                                                                                                                                        text-align:center;
                                                                                                                                                            box-shadow:0 3px 8px #00000015;
                                                                                                                                                              `;

                                                                                                                                                                cartao.innerHTML = `
                                                                                                                                                                    <h2>${flor.nome}</h2>
                                                                                                                                                                        <p>${flor.descricao}</p>
                                                                                                                                                                          `;

                                                                                                                                                                            lista.appendChild(cartao);
                                                                                                                                                                            });

                                                                                                                                                                            document.body.appendChild(dashboard);
                                                                                                                                                                            