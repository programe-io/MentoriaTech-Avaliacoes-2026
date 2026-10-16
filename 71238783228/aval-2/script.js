(() => {
      const busca = document.querySelector('#busca');
        const filtroArea = document.querySelector('#filtro-area');
          const cards = Array.from(document.querySelectorAll('.mentor-card'));
            const statusBusca = document.querySelector('#resultado-busca');
              const semResultados = document.querySelector('#sem-resultados');
                const campoMentor = document.querySelector('#mentor');
                  const campoData = document.querySelector('#data');
                    const formulario = document.querySelector('#form-mentoria');
                      const mensagem = document.querySelector('#mensagem-formulario');
                        const ano = document.querySelector('#ano-atual');

                          // Usa a data local do dispositivo, sem depender do fuso UTC.
                            const hoje = new Date();
                              const dataLocal = [
                                  hoje.getFullYear(),
                                      String(hoje.getMonth() + 1).padStart(2, '0'),
                                          String(hoje.getDate()).padStart(2, '0')
                                            ].join('-');

                                              campoData.min = dataLocal;
                                                if (ano) ano.textContent = String(hoje.getFullYear());

                                                  function normalizar(texto) {
                                                      return texto.normalize('NFD')
                                                            .replace(/[\u0300-\u036f]/g, '')
                                                                  .toLowerCase()
                                                                        .trim();
                                                                          }

                                                                            function filtrarMentores() {
                                                                                const termo = normalizar(busca.value);
                                                                                    const areaSelecionada = filtroArea.value;
                                                                                        let encontrados = 0;

                                                                                            cards.forEach((card) => {
                                                                                                  const textoCard = normalizar(
                                                                                                          `${card.dataset.termos || ''} ${card.innerText}`
                                                                                                                );
                                                                                                                      const correspondeAoTexto = textoCard.includes(termo);
                                                                                                                            const correspondeAArea =
                                                                                                                                    areaSelecionada === 'todas' ||
                                                                                                                                            card.dataset.area === areaSelecionada;
                                                                                                                                                  const visivel = correspondeAoTexto && correspondeAArea;

                                                                                                                                                        card.hidden = !visivel;
                                                                                                                                                              if (visivel) encontrados += 1;
                                                                                                                                                                  });

                                                                                                                                                                      semResultados.hidden = encontrados !== 0;
                                                                                                                                                                          statusBusca.textContent = termo || areaSelecionada !== 'todas'
                                                                                                                                                                                ? `${encontrados} ${encontrados === 1 ? 'mentor encontrado' : 'mentores encontrados'}.`
                                                                                                                                                                                      : '';
                                                                                                                                                                                        }

                                                                                                                                                                                          busca.addEventListener('input', filtrarMentores);
                                                                                                                                                                                            filtroArea.addEventListener('change', filtrarMentores);

                                                                                                                                                                                              document.querySelectorAll('.escolher-mentor').forEach((botao) => {
                                                                                                                                                                                                  botao.addEventListener('click', () => {
                                                                                                                                                                                                        campoMentor.value = botao.dataset.mentor;
                                                                                                                                                                                                              mensagem.textContent =
                                                                                                                                                                                                                      `${botao.dataset.mentor} foi selecionado. Agora conte o que você quer aprender.`;
                                                                                                                                                                                                                            mensagem.classList.remove('erro');
                                                                                                                                                                                                                                  document.querySelector('#solicitar').scrollIntoView({
                                                                                                                                                                                                                                          behavior: 'smooth',
                                                                                                                                                                                                                                                  block: 'start'
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                              document.querySelector('#nome').focus({ preventScroll: true });
                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                      formulario.addEventListener('submit', (evento) => {
                                                                                                                                                                                                                                                                          evento.preventDefault();
                                                                                                                                                                                                                                                                              mensagem.classList.remove('erro');

                                                                                                                                                                                                                                                                                  if (!formulario.reportValidity()) return;

                                                                                                                                                                                                                                                                                      const dados = new FormData(formulario);
                                                                                                                                                                                                                                                                                          const nome = String(dados.get('nome')).trim();
                                                                                                                                                                                                                                                                                              const mentor = String(dados.get('mentor'));
                                                                                                                                                                                                                                                                                                  const tema = String(dados.get('tema')).trim();
                                                                                                                                                                                                                                                                                                      const dataEscolhida = String(dados.get('data'));

                                                                                                                                                                                                                                                                                                          if (dataEscolhida < dataLocal) {
                                                                                                                                                                                                                                                                                                                mensagem.textContent = 'Escolha uma data de hoje em diante.';
                                                                                                                                                                                                                                                                                                                      mensagem.classList.add('erro');
                                                                                                                                                                                                                                                                                                                            campoData.focus();
                                                                                                                                                                                                                                                                                                                                  return;
                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                          const dataFormatada = new Date(
                                                                                                                                                                                                                                                                                                                                                `${dataEscolhida}T12:00:00`
                                                                                                                                                                                                                                                                                                                                                    ).toLocaleDateString('pt-BR');

                                                                                                                                                                                                                                                                                                                                                        mensagem.textContent =
                                                                                                                                                                                                                                                                                                                                                              `Solicitação demonstrativa registrada, ${nome}! Você escolheu ${mentor} para aprender sobre “${tema}”, na data ${dataFormatada}. Nenhum dado foi enviado pela internet.`;

                                                                                                                                                                                                                                                                                                                                                                  formulario.reset();
                                                                                                                                                                                                                                                                                                                                                                      campoData.min = dataLocal;
                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                        })();
                                                                                                                                                                                                                                                                                                                                                                        
})