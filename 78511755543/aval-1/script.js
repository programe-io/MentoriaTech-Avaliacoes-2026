
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Abrir e fechar menu
menuToggle.addEventListener("click", () => {

  const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
            String(isOpen)
              );

                menuToggle.textContent = isOpen ? "✕" : "☰";

                });

                // Fechar menu ao clicar em um link
                mainNav.querySelectorAll("a").forEach((link) => {

                  link.addEventListener("click", () => {

                      mainNav.classList.remove("open");

                          menuToggle.setAttribute(
                                "aria-expanded",
                                      "false"
                                          );

                                              menuToggle.textContent = "☰";

                                                });

                                                });
                                                