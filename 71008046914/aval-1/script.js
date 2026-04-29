// ===============================
// TROCAR NOTÍCIAS (MENU)
// ===============================
function mostrarPost(id) {
  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    post.style.display = "none";
  });

  document.getElementById(id).style.display = "block";
}

// ===============================
// UPLOAD DE IMAGEM (INSERIR FOTO)
// ===============================
const input = document.getElementById("uploadImagem");
const preview = document.getElementById("preview");

if (input) {
  input.addEventListener("change", function () {
    const arquivo = this.files[0];

    if (arquivo) {
      const leitor = new FileReader();

      leitor.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
      };

      leitor.readAsDataURL(arquivo);
    }
  });
}

// ===============================
// CARROSSEL AUTOMÁTICO (OPCIONAL)
// ===============================
let slideIndex = 0;

function iniciarCarrossel() {
  const slides = document.querySelectorAll(".slide");

  if (slides.length === 0) return;

  slides.forEach(slide => {
    slide.style.display = "none";
  });

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(iniciarCarrossel, 3000);
}

// ===============================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ===============================
function animarScroll() {
  const elementos = document.querySelectorAll(".post");

  elementos.forEach(el => {
    const posicao = el.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;

    if (posicao < alturaTela - 50) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}

// ===============================
// INICIAR TUDO
// ===============================
window.onload = function () {
  iniciarCarrossel();
  animarScroll();
};

window.addEventListener("scroll", animarScroll);