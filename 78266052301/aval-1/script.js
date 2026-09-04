// ================================
// MENU MOBILE
// ================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
          });
          });


          // ================================
          // RESERVA
          // ================================

          const form = document.getElementById("reservationForm");

          form.addEventListener("submit", function (event) {
            event.preventDefault();

              const nome = document.getElementById("nome").value;
                const data = document.getElementById("data").value;
                  const horario = document.getElementById("horario").value;
                    const pessoas = document.getElementById("pessoas").value;

                      if (!nome || !data || !horario || !pessoas) {
                          alert("Por favor, preencha todos os campos.");
                              return;
                                }

                                  alert(
                                      `🍽️ Reserva realizada com sucesso!\n\n` +
                                          `Nome: ${nome}\n` +
                                              `Data: ${data}\n` +
                                                  `Horário: ${horario}\n` +
                                                      `Pessoas: ${pessoas}`
                                                        );

                                                          form.reset();
                                                          });


                                                          // ================================
                                                          // ANIMAÇÃO DOS CARDS
                                                          // ================================

                                                          const cards = document.querySelectorAll(".card");

                                                          const observer = new IntersectionObserver(
                                                            (entries) => {
                                                                entries.forEach((entry) => {
                                                                      if (entry.isIntersecting) {
                                                                              entry.target.classList.add("show");
                                                                                    }
                                                                                        });
                                                                                          },
                                                                                            {
                                                                                                threshold: 0.15
                                                                                                  }
                                                                                                  );

                                                                                                  cards.forEach((card) => {
                                                                                                    observer.observe(card);
                                                                                                    });


                                                                                                    // ================================
                                                                                                    // DATA MÍNIMA DA RESERVA
                                                                                                    // ================================

                                                                                                    const dataInput = document.getElementById("data");

                                                                                                    const hoje = new Date();
                                                                                                    const ano = hoje.getFullYear();
                                                                                                    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
                                                                                                    const dia = String(hoje.getDate()).padStart(2, "0");

                                                                                                    dataInput.min = `${ano}-${mes}-${dia}`;