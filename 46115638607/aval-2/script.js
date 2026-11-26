
const links = document.querySelectorAll(".links a");

links.forEach((link, index) => {
  link.style.opacity = "0";
    link.style.transform = "translateY(15px)";

      setTimeout(() => {
          link.style.transition = "0.5s ease";
              link.style.opacity = "1";
                  link.style.transform = "translateY(0)";
                    }, 150 * (index + 1));
                    });
                    