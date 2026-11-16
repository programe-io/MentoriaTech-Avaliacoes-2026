
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Abrir e fechar o menu
menuToggle.addEventListener("click", () => {

  const opened = mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
            String(opened)
              );

                menuToggle.textContent = opened ? "✕" : "☰";

                });

                // Fechar o menu ao clicar em um link
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
                                                