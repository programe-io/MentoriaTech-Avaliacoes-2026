const tarefas = [];
let proximoCodigo = 1;
let opcao;

do {
  opcao = prompt(
    "GERENCIADOR DE TAREFAS\n" +
    "1 - Cadastrar tarefa\n" +
    "2 - Listar tarefas\n" +
    "3 - Marcar tarefa como concluída\n" +
    "4 - Alterar prioridade\n" +
    "0 - Sair"
  );

  switch (opcao) {
    case "1": {
      const titulo = prompt("Digite o título da tarefa:");

      if (!titulo || titulo.trim().length < 5) {
        alert("O título deve ter pelo menos 5 caracteres.");
        break;
      }

      const prioridade = Number(
        prompt("Digite a prioridade (1 = alta, 2 = média, 3 = baixa):")
      );

      if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida. Digite 1, 2 ou 3.");
        break;
      }

      tarefas.push({
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade,
        concluida: false
      });

      alert("Tarefa cadastrada!");
      break;
    }

    case "2": {
      if (tarefas.length === 0) {
        alert("Nenhuma tarefa cadastrada.");
        break;
      }

      let lista = "TAREFAS CADASTRADAS:\n\n";

      for (const tarefa of tarefas) {
        lista +=
          `Código: ${tarefa.codigo}\n` +
          `Título: ${tarefa.titulo}\n` +
          `Prioridade: ${tarefa.prioridade}\n` +
          `Status: ${tarefa.concluida ? "Concluída" : "Pendente"}\n\n`;
      }

      alert(lista);
      break;
    }

    case "3": {
      const codigo = Number(prompt("Digite o código da tarefa:"));
      const tarefa = tarefas.find(item => item.codigo === codigo);

      if (tarefa) {
        tarefa.concluida = true;
        alert("Tarefa marcada como concluída!");
      } else {
        alert("Tarefa não encontrada.");
      }
      break;
    }

    case "4": {
      const codigo = Number(prompt("Digite o código da tarefa:"));
      const tarefa = tarefas.find(item => item.codigo === codigo);

      if (!tarefa) {
        alert("Tarefa não encontrada.");
        break;
      }

      const prioridade = Number(
        prompt("Digite a nova prioridade (1 = alta, 2 = média, 3 = baixa):")
      );

      if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida. Digite 1, 2 ou 3.");
        break;
      }

      tarefa.prioridade = prioridade;
      alert("Prioridade alterada!");
      break;
    }

    case "0":
      alert("Programa encerrado.");
      break;

    default:
      alert("Opção inválida.");
  }
} while (opcao !== "0");
