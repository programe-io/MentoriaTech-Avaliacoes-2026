const agora = new Date();

document.getElementById("dataHoje").textContent =
  agora.toLocaleDateString("pt-BR");

  function mostrarCalendario() {
    const mes = Number(document.getElementById("mes").value);
      const ano = 2026;
        const primeiroDia = new Date(ano, mes, 1).getDay();
          const totalDias = new Date(ano, mes + 1, 0).getDate();

            let html = "<h3>" +
                new Date(ano, mes, 1).toLocaleDateString("pt-BR", {
                      month: "long",
                            year: "numeric"
                                }) +
                                    "</h3>";

                                      html += '<div class="dias">';

                                        const semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

                                          semana.forEach(function(dia) {
                                              html += '<div class="dia-semana">' + dia + '</div>';
                                                });

                                                  for (let i = 0; i < primeiroDia; i++) {
                                                      html += '<div class="vazio"></div>';
                                                        }

                                                          for (let dia = 1; dia <= totalDias; dia++) {
                                                              const ehHoje =
                                                                    agora.getFullYear() === ano &&
                                                                          agora.getMonth() === mes &&
                                                                                agora.getDate() === dia;

                                                                                    html += '<div class="dia' +
                                                                                          (ehHoje ? ' hoje' : '') +
                                                                                                '">' + dia + '</div>';
                                                                                                  }

                                                                                                    html += '</div>';

                                                                                                      document.getElementById("resultado").innerHTML = html;
                                                                                                      }

                                                                                                      document.getElementById("mes").value = agora.getMonth();
                                                                                                      mostrarCalendario();
                                                                                                      