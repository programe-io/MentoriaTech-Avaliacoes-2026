JavaScript


// Pega os elementos da tela
const nomeInput = document.getElementById("nome");
const tituloInput = document.getElementById("titulo");
const htmlInput = document.getElementById("codigoHTML");
const cssInput = document.getElementById("codigoCSS");
const jsInput = document.getElementById("codigoJS");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");
const preview = document.getElementById("preview");

// Função para mostrar a prévia do site
function atualizarPreview() {
  const codigoCompleto = `
    <html>
      <head><style>\${cssInput.value\}</style></head>
      <body>\${htmlInput.value\}<script>\${jsInput.value\}<\\/script></body>
    </html>
  `;
  preview.srcdoc = codigoCompleto;
\}

// Botão Visualizar
document.getElementById("btnVisualizar").addEventListener("click", function() {
  atualizarPreview();
  mensagem.textContent = "✅ Prévia atualizada!";
  mensagem.style.color = "#4a00e0";
\});

// Botão Publicar
document.getElementById("btnPublicar").addEventListener("click", function() {
  const nome = nomeInput.value.trim();
  const titulo = tituloInput.value.trim();

  // Validação: não deixa publicar vazio
  if (nome === "" || titulo === "") {
    mensagem.textContent = "⚠️ Preencha seu nome e o título antes de publicar!";
    mensagem.style.color = "red";
    return;
  \}

  // Cria o card do trabalho publicado
  const div = document.createElement("div");
  div.className = "item-publicado";
  div.innerHTML = `
    <h3>📄 \${titulo\}</h3>
    <p><b>Aluno:</b> \${nome\}</p>
    <p><b>Status:</b> Enviado para o professor para avaliação ✅</p>
    <p><b>data:[STRIPPED] \${new Date().toLocaleString("pt-BR")\}</p>
  `;

  lista.prepend(div);
  atualizarPreview();

  mensagem.textContent = "🎉 Parabéns! Seu código foi publicado e compartilhado com o professor!";
  mensagem.style.color = "#00c853";

  // Limpa os campos de nome e título
  nomeInput.value = "";
  tituloInput.value = "";
\});

// Mostra a prévia assim que abre a página
atualizarPreview();$0