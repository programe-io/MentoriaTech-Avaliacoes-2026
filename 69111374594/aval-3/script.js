
const formulario = document.getElementById("formAluno");
const lista = document.getElementById("listaAlunos");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const curso = document.getElementById("curso").value;

  if (!nome || !email || !curso) {
    mensagem.textContent = "Preencha todos os campos!";
    return;
  }

  const aluno = document.createElement("li");
  aluno.textContent = nome + " - " + email + " - " + curso;

  lista.appendChild(aluno);

  mensagem.textContent = "Aluno cadastrado com sucesso!";
  formulario.reset();
});
