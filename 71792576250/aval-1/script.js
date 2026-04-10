<script>
// ===== MODO ESCURO =====
const toggleDarkMode = () => {
  document.body.classList.toggle("dark");
\};

// Criar botão de modo escuro
const btnDark = document.createElement("button");
btnDark.innerText = "🌙 Modo Escuro";
btnDark.style.position = "fixed";
btnDark.style.top = "10px";
btnDark.style.right = "10px";
btnDark.onclick = toggleDarkMode;
document.body.appendChild(btnDark);


// ===== EXPANDIR "LER MAIS" =====
function toggleReadMore(button) {
  const content = button.previousElementSibling;
  if (content.classList.contains("expanded")) {
    content.classList.remove("expanded");
    button.innerText = "Ler mais";
  \} else {
    content.classList.add("expanded");
    button.innerText = "Mostrar menos";
  \}
\}


// ===== ADICIONAR NOVO POST =====
function adicionarPost() {
  const titulo = prompt("Digite o título do post:");
  const conteudo = prompt("Digite o conteúdo:");

  if (!titulo || !conteudo) return;

  const container = document.querySelector(".container");

  const post = document.createElement("div");
  post.classList.add("post");

  const data = new Date().toLocaleDateString("pt-BR");

  post.innerHTML = `
    <h2>\${titulo\}</h2>
    <p class="date">Publicado em \${data\}</p>
    <p class="content">\${conteudo.substring(0, 100)\}...</p>
    <button onclick="toggleReadMore(this)">Ler mais</button>
  `;

  container.prepend(post);
\}


// ===== BOTÃO PARA NOVO POST =====
const btnNovoPost = document.createElement("button");
btnNovoPost.innerText = "➕ Novo Post";
btnNovoPost.style.display = "block";
btnNovoPost.style.margin = "20px auto";
btnNovoPost.onclick = adicionarPost;

document.querySelector(".container").before(btnNovoPost);
</script>$0