// ELSEWHERE — interactions, scroll states, and small moments of motion
(() => {
  const header = document.querySelector(".site-header");
  const progressBar = document.getElementById("progressBar");
  const nav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  // Scroll progress + sticky header treatment
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    header.classList.toggle("scrolled", window.scrollY > 30);

    // Highlight whichever section is currently closest to the top third of the viewport.
    const marker = window.scrollY + window.innerHeight * 0.32;
    let current = sections[0]?.id || "home";
    sections.forEach(section => {
      if (section.offsetTop <= marker) current = section.id;
    });
    navLinks.forEach(link => {
      const target = link.getAttribute("href").slice(1);
      link.classList.toggle("active", target === current);
    });
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  window.addEventListener("resize", updateScrollUI);
  updateScrollUI();

  // Mobile menu
  const closeMenu = () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });
  navLinks.forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  // Reveal sections as they enter the viewport. Fallback for older browsers included.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Newsletter demo: validates input and confirms locally (connect to a mailing service for production).
  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const formMessage = document.getElementById("formMessage");
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }
    formMessage.textContent = "You're on the list — see you out there ✳";
    emailInput.value = "";
  });

  // Gentle pointer drift on the hero art (disabled for touch and reduced-motion users).
  const hero = document.querySelector(".hero");
  const heroArt = document.querySelector(".hero-art");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hero && heroArt && window.matchMedia("(pointer: fine)").matches && !reducedMotion) {
    hero.addEventListener("pointermove", event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroArt.style.transform = `translate(${x * -7}px, ${y * -5}px)`;
    });
    hero.addEventListener("pointerleave", () => {
      heroArt.style.transform = "";
    });
  }
})();
