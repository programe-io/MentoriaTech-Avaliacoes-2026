let alunos = [];

function cadastrar() {
  const nome = document.getElementById("nome").value.trim();
  const n1 = Number(document.getElementById("nota1").value);
  const n2 = Number(document.getElementById("nota2").value);

  if (!nome || n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 ||
      document.getElementById("nota1").value === "" ||
      document.getElementById("nota2").value === "") {
    alert("Preencha os campos corretamente!");
    return;
  }

  alunos.push({
    nome,
    nota1: n1,
    nota2: n2
  });

  mostrar();

  document.getElementById("nome").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
}

function mostrar() {
  const resultado = document.getElementById("resultado");
  const busca = document.getElementById("pesquisa").value.toLowerCase();

  resultado.innerHTML = "";

  alunos.forEach((aluno, i) => {
    if (!aluno.nome.toLowerCase().includes(busca)) return;

    const media = (aluno.nota1 + aluno.nota2) / 2;

    const div = document.createElement("div");
    div.className = "aluno";

    const nome = document.createElement("strong");
    nome.textContent = aluno.nome;

    const info = document.createElement("p");
    info.textContent = "Média: " + media.toFixed(1) +
      " - " + (media >= 7 ? "Aprovado" : "Reprovado");

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.onclick = () => {
      alunos.splice(i, 1);
      mostrar();
    };

    div.append(nome, info, excluir);
    resultado.appendChild(div);
  });
}