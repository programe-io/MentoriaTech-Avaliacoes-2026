
const fs = require("fs");
const readline = require("readline");

const arquivo = "tarefas.json";

let tarefas = fs.existsSync(arquivo)
  ? JSON.parse(fs.readFileSync(arquivo, "utf8"))
  : [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

function salvar() {
  fs.writeFileSync(arquivo, JSON.stringify(tarefas, null, 2));
}

function gerarId() {
  return tarefas.length
    ? Math.max(...tarefas.map(t => t.id)) + 1
    : 1;
}

// CADASTRAR TAREFA
async function cadastrar() {
  console.log("\n=== CADASTRAR TAREFA ===");

  const titulo = await perguntar("Título: ");
  const descricao = await perguntar("Descrição: ");
  const prioridade = await perguntar("Prioridade (baixa, media, alta): ");
  const prazo = await perguntar("Prazo (AAAA-MM-DD): ");

  if (!titulo.trim()) {
    console.log("O título é obrigatório!");
    return;
  }

  if (!["baixa", "media", "alta"].includes(prioridade.toLowerCase())) {
    console.log("Prioridade inválida!");
    return;
  }

  tarefas.push({
    id: gerarId(),
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    prioridade: prioridade.toLowerCase(),
    prazo: prazo || "Sem prazo",
    status: "Pendente",
    criadaEm: new Date().toLocaleString("pt-BR")
  });

  salvar();
  console.log("Tarefa cadastrada com sucesso!");
}

// LISTAR TAREFAS
function listar(lista = tarefas) {
  console.log("\n=== LISTA DE TAREFAS ===");

  if (lista.length === 0) {
    console.log("Nenhuma tarefa encontrada.");
    return;
  }

  lista.forEach(t => {
    console.log(`
ID: ${t.id}
Título: ${t.titulo}
Descrição: ${t.descricao}
Prioridade: ${t.prioridade.toUpperCase()}
Prazo: ${t.prazo}
Status: ${t.status}
-----------------------------`);
  });
}

// CONCLUIR TAREFA
async function concluir() {
  const id = Number(await perguntar("ID da tarefa: "));

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    console.log("Tarefa não encontrada!");
    return;
  }

  tarefa.status =
    tarefa.status === "Concluída" ? "Pendente" : "Concluída";

  salvar();
  console.log("Status atualizado!");
}

// EDITAR TAREFA
async function editar() {
  const id = Number(await perguntar("ID da tarefa: "));

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    console.log("Tarefa não encontrada!");
    return;
  }

  const titulo = await perguntar("Novo título (Enter mantém): ");
  const descricao = await perguntar("Nova descrição (Enter mantém): ");
  const prioridade = await perguntar("Nova prioridade (Enter mantém): ");
  const prazo = await perguntar("Novo prazo (Enter mantém): ");

  if (titulo.trim()) tarefa.titulo = titulo.trim();
  if (descricao.trim()) tarefa.descricao = descricao.trim();

  if (prioridade.trim()) {
    const p = prioridade.toLowerCase();

    if (!["baixa", "media", "alta"].includes(p)) {
      console.log("Prioridade inválida!");
      return;
    }

    tarefa.prioridade = p;
  }

  if (prazo.trim()) tarefa.prazo = prazo;

  salvar();
  console.log("Tarefa editada com sucesso!");
}

// EXCLUIR TAREFA
async function excluir() {
  const id = Number(await perguntar("ID da tarefa: "));

  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    console.log("Tarefa não encontrada!");
    return;
  }

  const confirmar = await perguntar("Confirmar exclusão? (s/n): ");

  if (confirmar.toLowerCase() === "s") {
    tarefas.splice(indice, 1);
    salvar();
    console.log("Tarefa excluída!");
  }
}

// BUSCAR TAREFA
async function buscar() {
  const termo = (await perguntar("Digite o título: ")).toLowerCase();

  const resultado = tarefas.filter(t =>
    t.titulo.toLowerCase().includes(termo)
  );

  listar(resultado);
}

// FILTRAR TAREFAS
async function filtrar() {
  console.log(`
1 - Todas
2 - Pendentes
3 - Concluídas
4 - Prioridade alta
5 - Prioridade média
6 - Prioridade baixa
`);

  const opcao = await perguntar("Escolha: ");

  const filtros = {
    "1": () => tarefas,
    "2": () => tarefas.filter(t => t.status === "Pendente"),
    "3": () => tarefas.filter(t => t.status === "Concluída"),
    "4": () => tarefas.filter(t => t.prioridade === "alta"),
    "5": () => tarefas.filter(t => t.prioridade === "media"),
    "6": () => tarefas.filter(t => t.prioridade === "baixa")
  };

  if (!filtros[opcao]) {
    console.log("Opção inválida!");
    return;
  }

  listar(filtros[opcao]());
}

// ESTATÍSTICAS
function estatisticas() {
  const total = tarefas.length;

  const concluidas = tarefas.filter(
    t => t.status === "Concluída"
  ).length;

  const pendentes = tarefas.filter(
    t => t.status === "Pendente"
  ).length;

  const alta = tarefas.filter(
    t => t.prioridade === "alta"
  ).length;

  console.log(`
======= ESTATÍSTICAS =======
Total de tarefas: ${total}
Concluídas: ${concluidas}
Pendentes: ${pendentes}
Prioridade alta: ${alta}
Taxa de conclusão: ${
    total ? ((concluidas / total) * 100).toFixed(1) : 0
  }%
============================
`);
}

// MENU PRINCIPAL
async function menu() {
  while (true) {
    console.log(`
=================================
       GERENCIADOR DE TAREFAS
=================================
1 - Cadastrar tarefa
2 - Listar tarefas
3 - Concluir / Reabrir tarefa
4 - Editar tarefa
5 - Excluir tarefa
6 - Buscar tarefa
7 - Filtrar tarefas
8 - Estatísticas
0 - Sair
=================================
`);

    const opcao = await perguntar("Escolha uma opção: ");

    try {
      switch (opcao) {
        case "1": await cadastrar(); break;
        case "2": listar(); break;
        case "3": await concluir(); break;
        case "4": await editar(); break;
        case "5": await excluir(); break;
        case "6": await buscar(); break;
        case "7": await filtrar(); break;
        case "8": estatisticas(); break;

        case "0":
          console.log("Sistema encerrado. Até mais!");
          rl.close();
          return;

        default:
          console.log("Opção inválida!");
      }
    } catch (erro) {
      console.log("Erro:", erro.message);
    }
  }
}

menu();
