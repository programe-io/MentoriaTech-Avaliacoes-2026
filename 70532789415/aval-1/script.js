
import java.util.ArrayList;
import java.util.Scanner;

public class GerenciadorTarefas {

    static Scanner scanner = new Scanner(System.in);

    static ArrayList<Tarefa> tarefas = new ArrayList<>();

    static int contadorCodigo = 0;

    // Classe que representa uma tarefa
    static class Tarefa {

        int id;
        String titulo;
        boolean concluida;

        Tarefa(int id, String titulo, boolean concluida) {
            this.id = id;
            this.titulo = titulo;
            this.concluida = concluida;
        }
    }

    // Gera código automaticamente
    public static int gerarCodigo() {
        contadorCodigo++;
        return contadorCodigo;
    }

    // Cadastra uma nova tarefa
    public static void cadastrarTarefa() {

        System.out.print("Digite o título da tarefa: ");

        String titulo = scanner.nextLine().trim();

        if (titulo.isEmpty()) {
            System.out.println("Digite uma tarefa válida!");
            return;
        }

        Tarefa novaTarefa = new Tarefa(
            gerarCodigo(),
            titulo,
            false
        );

        tarefas.add(novaTarefa);

        System.out.println("Tarefa cadastrada com sucesso!");
    }

    // Lista todas as tarefas
    public static void listarTarefas() {

        if (tarefas.isEmpty()) {
            System.out.println("Nenhuma tarefa cadastrada.");
            return;
        }

        System.out.println("\n===== LISTA DE TAREFAS =====");

        for (Tarefa tarefa : tarefas) {

            System.out.println("Código: " + tarefa.id);
            System.out.println("Título: " + tarefa.titulo);

            System.out.println(
                "Concluída: " +
                (tarefa.concluida ? "Sim" : "Não")
            );

            System.out.println("-------------------------");
        }
    }

    // Busca tarefa pelo código
    public static Tarefa buscarTarefa(int codigo) {

        for (Tarefa tarefa : tarefas) {

            if (tarefa.id == codigo) {
                return tarefa;
            }
        }

        return null;
    }

    // Marca tarefa como concluída
    public static void concluirTarefa() {

        System.out.print("Digite o código da tarefa: ");

        int codigo = Integer.parseInt(scanner.nextLine());

        Tarefa tarefa = buscarTarefa(codigo);

        if (tarefa != null) {

            tarefa.concluida = !tarefa.concluida;

            System.out.println("Situação da tarefa atualizada!");

        } else {

            System.out.println("Tarefa não encontrada!");
        }
    }

    // Exclui uma tarefa
    public static void excluirTarefa() {

        System.out.print("Digite o código da tarefa: ");

        int codigo = Integer.parseInt(scanner.nextLine());

        Tarefa tarefa = buscarTarefa(codigo);

        if (tarefa != null) {

            tarefas.remove(tarefa);

            System.out.println("Tarefa excluída com sucesso!");

        } else {

            System.out.println("Tarefa não encontrada!");
        }
    }

    // Menu principal
    public static void main(String[] args) {

        int opcao;

        do {

            System.out.println("\n===== GERENCIADOR DE TAREFAS =====");
            System.out.println("1 - Cadastrar tarefa");
            System.out.println("2 - Listar tarefas");
            System.out.println("3 - Concluir / Desfazer tarefa");
            System.out.println("4 - Excluir tarefa");
            System.out.println("0 - Sair");

            System.out.print("Escolha uma opção: ");

            try {

                opcao = Integer.parseInt(scanner.nextLine());

                switch (opcao) {

                    case 1:
                        cadastrarTarefa();
                        break;

                    case 2:
                        listarTarefas();
                        break;

                    case 3:
                        concluirTarefa();
                        break;

                    case 4:
                        excluirTarefa();
                        break;

                    case 0:
                        System.out.println("Sistema encerrado!");
                        break;

                    default:
                        System.out.println("Opção inválida!");
                }

            } catch (NumberFormatException erro) {

                System.out.println("Digite uma opção numérica válida!");

                opcao = -1;
            }

        } while (opcao != 0);

        scanner.close();
    }
}
