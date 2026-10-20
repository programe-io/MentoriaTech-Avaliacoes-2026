import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Classe que representa a Tarefa
class Tarefa {
    private int codigo;
    private String titulo;
    private int prioridade; // 1 (Alta), 2 (Média), 3 (Baixa)
    private boolean concluida;

    public Tarefa(int codigo, String titulo, int prioridade) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.prioridade = prioridade;
        this.concluida = false;
    }

    public int getCodigo() {
        return codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public int getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(int prioridade) {
        this.prioridade = prioridade;
    }

    public boolean isConcluida() {
        return concluida;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    @Override
    public String toString() {
        String statusStr = concluida ? "Concluída" : "Pendente";
        String prioStr;
        if (prioridade == 1) prioStr = "1 (Alta)";
        else if (prioridade == 2) prioStr = "2 (Média)";
        else prioStr = "3 (Baixa)";

        return String.format("Código: #%d | Título: %s | Prioridade: %s | Status: %s", 
                codigo, titulo, prioStr, statusStr);
    }
}

// Classe Principal do Sistema
public class GerenciadorDeTarefas {
    private static List<Tarefa> tarefas = new ArrayList<>();
    private static int contadorCodigo = 101;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int opcao;

        do {
            System.out.println("\n=== SISTEMA DE GERENCIAMENTO DE TAREFAS ===");
            System.out.println("1. Cadastrar uma nova tarefa");
            System.out.println("2. Listar as tarefas cadastradas");
            System.out.println("3. Marcar uma tarefa como concluída");
            System.out.println("4. Alterar a prioridade de uma tarefa");
            System.out.println("0. Sair");
            System.out.print("Escolha uma opção: ");

            while (!scanner.hasNextInt()) {
                System.out.print("Por favor, digite um número válido: ");
                scanner.next();
            }
            opcao = scanner.nextInt();
            scanner.nextLine(); // Consumir quebra de linha

            switch (opcao) {
                case 1:
                    cadastrarTarefa(scanner);
                    break;
                case 2:
                    listarTarefas();
                    break;
                case 3:
                    marcarConcluida(scanner);
                    break;
                case 4:
                    alterarPrioridade(scanner);
                    break;
                case 0:
                    System.out.println("A encerra o programa. Até logo!");
                    break;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        } while (opcao != 0);

        scanner.close();
    }

    // Cadastrar nova tarefa com regras de validação[cite: 1]
    private static void cadastrarTarefa(Scanner scanner) {
        System.out.print("Digite o título da tarefa (mínimo 5 caracteres): ");
        String titulo = scanner.nextLine();

        // Validação do título: mínimo 5 caracteres[cite: 1]
        if (titulo == null || titulo.trim().length() < 5) {
            System.out.println("[Erro] O título deve ter no mínimo 5 caracteres!");
            return;
        }

        System.out.print("Digite a prioridade (1 - Alta, 2 - Média, 3 - Baixa): ");
        while (!scanner.hasNextInt()) {
            System.out.print("[Erro] Digite um número válido para a prioridade (1 a 3): ");
            scanner.next();
        }
        int prioridade = scanner.nextInt();
        scanner.nextLine();

        // Validação da prioridade: valor entre 1 e 3[cite: 1]
        if (prioridade < 1 || prioridade > 3) {
            System.out.println("[Erro] A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)!");
            return;
        }

        Tarefa novaTarefa = new Tarefa(contadorCodigo++, titulo.trim(), prioridade);
        tarefas.add(novaTarefa);
        System.out.println("[Sucesso] Tarefa cadastrada com o código #" + novaTarefa.getCodigo() + "!");
    }

    // Listar as tarefas cadastradas[cite: 1]
    private static void listarTarefas() {
        System.out.println("\n--- LISTA DE TAREFAS ---");
        if (tarefas.isEmpty()) {
            System.out.println("Nenhuma tarefa cadastrada até o momento.");
            return;
        }

        for (Tarefa t : tarefas) {
            System.out.println(t);
        }
    }

    // Marcar uma tarefa como concluída[cite: 1]
    private static void marcarConcluida(Scanner scanner) {
        if (tarefas.isEmpty()) {
            System.out.println("Não há tarefas para atualizar.");
            return;
        }

        System.out.print("Digite o código da tarefa que deseja marcar como concluída: ");
        int codigo = scanner