
let tarefas = [];
let codigo = 1;

function validar(d) {
  return d.trim() !== "";
}

function cadastrar() {
  let d = descricao.value;

  if (!validar(d)) {
    alert("Digite uma tarefa!");
    return;
  }

  tarefas.push({
    codigo: codigo++,
    descricao: d,
    prioridade: prioridade.value,
    concluida: false
  });

  listar();
  descricao.value = "";
}

function listar() {
  lista.innerHTML = "";

  tarefas.forEach(t => {
    lista.innerHTML += `
      <li class="${t.concluida ? 'concluida' : ''}">
        ${t.codigo} - ${t.descricao} 
        (${t.prioridade})
        <button onclick="concluir(${t.codigo})">
          Concluir
        </button>
        <button onclick="alterar(${t.codigo})">
          Prioridade
        </button>
      </li>`;
  });
}

function buscar(c) {
  return tarefas.find(t => t.codigo === c);
}

function concluir(c) {
  let t = buscar(c);
  if (t) t.concluida = !t.concluida;
  listar();
}

function alterar(c) {
  let t = buscar(c);
  if (t) {
    t.prioridade = t.prioridade === "Alta" ? "Baixa" : "Alta";
  }
  listar();
}
