// ---------- Menu suspenso ----------
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
          });
          });

          // ---------- Modal de agendamento ----------
          const modalOverlay = document.getElementById('modalOverlay');
          const modalServico = document.getElementById('modalServico');
          const agendaForm = document.getElementById('agendaForm');
          const modalSucesso = document.getElementById('modalSucesso');
          const modalCancelar = document.getElementById('modalCancelar');

          function abrirModal(servico){
            modalServico.textContent = servico;
              modalOverlay.classList.remove('hidden');
                agendaForm.classList.remove('hidden');
                  modalSucesso.classList.add('hidden');
                    agendaForm.reset();
                    }

                    function fecharModal(){
                      modalOverlay.classList.add('hidden');
                      }

                      // Botão "Agendar" de cada serviço
                      document.querySelectorAll('.agendar-btn').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const servico = btn.closest('.service-item').dataset.service;
                                abrirModal(servico);
                                  });
                                  });

                                  // Botão "Falar com o estúdio" (abre modal genérico)
                                  document.getElementById('contatoBtn').addEventListener('click', () => {
                                    abrirModal('Fale com o estúdio');
                                    });

                                    // Cancelar
                                    modalCancelar.addEventListener('click', fecharModal);

                                    // Fecha o modal se clicar fora da caixa branca
                                    modalOverlay.addEventListener('click', (event) => {
                                      if (event.target === modalOverlay){
                                          fecharModal();
                                            }
                                            });

                                            // Envio do formulário (simulado, sem backend)
                                            agendaForm.addEventListener('submit', (event) => {
                                              event.preventDefault();
                                                agendaForm.classList.add('hidden');
                                                  modalSucesso.classList.remove('hidden');

                                                    // Fecha o modal automaticamente depois de alguns segundos
                                                      setTimeout(fecharModal, 2500);
                                                      });
                                                      