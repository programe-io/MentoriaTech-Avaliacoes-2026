
const alunoForm = document.getElementById("alunoForm");
const frequenciaForm = document.getElementById("frequenciaForm");

const alunoEscolhido = document.getElementById("alunoEscolhido");
const alunosEl = document.getElementById("alunos");
const historicoEl = document.getElementById("historico");
const mensagem = document.getElementById("mensagem");

let alunos = [];
let frequencias = [];

alunoForm.addEventListener("submit", event => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idade = Number(document.getElementById("idade").value);
  const plano = document.getElementById("plano").value;

  if (nome.length < 3 || !Number.isInteger(idade) ||
      idade < 12 || idade > 100 || !plano) {
    mensagem.textContent = "Confira os dados informados.";
    return;
  }

  if (alunos.some(a => a.nome.toLowerCase() === nome.toLowerCase())) {
    mensagem.textContent = "Esse aluno já está cadastrado.";
    return;
  }

  alunos.push({
    id: Date.now() + Math.random(),
    nome,
    idade,
    plano,
    entradas: 0
  });

  alunoForm.reset();

  atualizarSelecao();
  mostrarAlunos();

  mensagem.textContent = "Aluno cadastrado com sucesso!";
});

frequenciaForm.addEventListener("submit", event => {
  event.preventDefault();

  const id = Number(alunoEscolhido.value);
  const aluno = alunos.find(a => a.id === id);

  if (!aluno) {
    mensagem.textContent = "Selecione um aluno.";
    return;
  }

  aluno.entradas++;

  frequencias.unshift({
    nome: aluno.nome,
    data: new Date().toLocaleString("pt-BR")
  });

  frequenciaForm.reset();

  mostrarAlunos();
  mostrarHistorico();

  mensagem.textContent = "Frequência registrada!";
});

function atualizarSelecao() {
  alunoEscolhido.replaceChildren();

  const op0 = document.createElement("option");
  op0.value = "";
  op0.textContent = "Selecione um aluno";

  alunoEscolhido.append(op0);

  alunos.forEach(a => {
    const op = document.createElement("option");
    op.value = a.id;
    op.textContent = a.nome;

    alunoEscolhido.append(op);
  });
}

function mostrarAlunos() {
  alunosEl.replaceChildren();

  if (!alunos.length) {
    alunosEl.textContent = "Nenhum aluno cadastrado.";
    return;
  }

  alunos.forEach(a => {
    const card = document.createElement("article");
    card.className = "card";

    const h = document.createElement("h3");
    h.textContent = a.nome;

    const p = document.createElement("p");
    p.textContent = `Idade: ${a.idade} | Plano: ${a.plano}`;

    const f = document.createElement("p");
    f.textContent = `Frequências registradas: ${a.entradas}`;

    card.append(h, p, f);
    alunosEl.append(card);
  });
}

function mostrarHistorico() {
  historicoEl.replaceChildren();

  if (!frequencias.length) {
    historicoEl.textContent = "Nenhuma frequência registrada.";
    return;
  }

  frequencias.forEach(f => {
    const card = document.createElement("article");
    card.className = "card";

    const h = document.createElement("h3");
    h.textContent = f.nome;

    const p = document.createElement("p");
    p.textContent = `Entrada registrada em: ${f.data}`;

    card.append(h, p);
    historicoEl.append(card);
  });
}

atualizarSelecao();
mostrarAlunos();
mostrarHistorico();
