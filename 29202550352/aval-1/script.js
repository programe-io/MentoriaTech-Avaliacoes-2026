
function adicionarPost() {
  const titulo = document.getElementById("titulo").value;
  const conteudo = document.getElementById("conteudo").value;

  if (!titulo.trim() || !conteudo.trim()) {
    alert("Preencha todos os campos!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const h3 = document.createElement("h3");
  h3.textContent = titulo;

  const p = document.createElement("p");
  p.textContent = conteudo;

  const data = document.createElement("small");
  data.textContent = new Date().toLocaleDateString("pt-BR");

  const botao = document.createElement("button");
  botao.textContent = "Excluir";
  botao.className = "excluir";
  botao.onclick = () => post.remove();

  post.append(h3, p, data, document.createElement("br"), botao);

  document.getElementById("posts").prepend(post);

  document.getElementById("titulo").value = "";
  document.getElementById("conteudo").value = "";
}
