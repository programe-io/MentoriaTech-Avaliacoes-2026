
const feed = document.getElementById("feed");

// SISTEMA DE CURTIDAS
document.addEventListener("click", function(event) {
  const button = event.target.closest(".like");

  if (!button) return;

  const numero = button.querySelector("small");
  let total = Number(numero.textContent);

  const curtido = button.classList.toggle("liked");

  numero.textContent = total + (curtido ? 1 : -1);
});

// REPRODUÇÃO AUTOMÁTICA
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target.querySelector("video");

    if (entry.isIntersecting) {
      document.querySelectorAll("video").forEach(v => {
        if (v !== video) v.pause();
      });

      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, {
  threshold: 0.65
});

function observarVideos() {
  document.querySelectorAll(".video-card").forEach(card => {
    observer.observe(card);
  });
}

observarVideos();

// ATIVAR E DESATIVAR SOM
function alternarSom(button) {
  const video = button.closest(".video-card")
                      .querySelector("video");

  video.muted = !video.muted;

  button.innerHTML = video.muted
    ? "🔇 <small>Som</small>"
    : "🔊 <small>Som</small>";
}

// COMENTÁRIOS
function comentar() {
  const texto = prompt("Digite seu comentário:");

  if (texto && texto.trim()) {
    alert("Comentário enviado: " + texto);
  }
}

// COMPARTILHAR
function compartilhar() {
  if (navigator.share) {
    navigator.share({
      title: "FutebolTok",
      text: "Assista a este vídeo de futebol!"
    }).catch(() => {});
  } else {
    alert("Compartilhamento não disponível.");
  }
}

// INÍCIO
function inicio() {
  feed.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// PERFIL
function perfil() {
  alert("Bem-vindo ao seu perfil FutebolTok!");
}

// PUBLICAR VÍDEOS
function abrirUpload() {
  document.getElementById("upload").click();
}

document.getElementById("upload").addEventListener("change", function(event) {

  const arquivo = event.target.files[0];

  if (!arquivo) return;

  const url = URL.createObjectURL(arquivo);

  const card = document.createElement("section");
  card.className = "video-card";

  card.innerHTML = `
    <video loop muted playsinline autoplay></video>

    <div class="info">
      <h3>@meu_perfil</h3>
      <p>⚽ Meu vídeo de futebol!</p>
      <p>#futebol #meuvideo</p>
    </div>

    <div class="actions">
      <button class="like">❤️ <small>0</small></button>
      <button onclick="comentar()">💬 <small>Comentários</small></button>
      <button onclick="compartilhar()">↗️ <small>Enviar</small></button>
      <button onclick="alternarSom(this)">🔇 <small>Som</small></button>
    </div>
  `;

  card.querySelector("video").src = url;

  feed.prepend(card);
  observer.observe(card);

  card.scrollIntoView({
    behavior: "smooth"
  });

  event.target.value = "";
});
