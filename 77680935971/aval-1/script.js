// Mensagem de boas-vindas
window.onload = function () {
  alert("Bem-vindo ao meu blog!");
};

// Função para criar um novo post
function criarPost(titulo, conteudo) {
  const container = document.querySelector(".container");

  const post = document.createElement("div");
  post.classList.add("post");

  const h2 = document.createElement("h2");
  h2.textContent = titulo;

  const p = document.createElement("p");
  p.textContent = conteudo;

  post.appendChild(h2);
  post.appendChild(p);

  container.appendChild(post);
}

// Exemplo: posts automáticos
criarPost("Post com JavaScript", "Este post foi criado automaticamente com JS!");
criarPost("Outro Post Dinâmico", "Você pode gerar quantos posts quiser usando uma função.");

// Função para adicionar post via prompt (opcional)
function adicionarPostManual() {
  const titulo = prompt("Digite o título do post:");
  const conteudo = prompt("Digite o conteúdo do post:");

  if (titulo && conteudo) {
    criarPost(titulo, conteudo);
  }
}