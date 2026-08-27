import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Classe que representa a Tarefa
class Tarefa {
    private int codigo;
    private String titulo;
    private int prioridade; // 1: Alta, 2: Média, 3: Baixa
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

    public String getPrioridadeTexto() {
        switch (prioridade) {
            case 1: return "Alta";
            case 2: return "Média";
            case 3: return "Baixa";
            default: return "Desconhecida";
        }
    }
}

public class GerenciadorTarefas {
    private static List<Tarefa> tarefas = new ArrayList<>();
    private static int proximoCodigo = 1;
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int opcao;

        do {
            System.out.println("\n========================================");
            System.out.println("       GERENCIADOR DE TAREFAS (JAVA)    ");
            System.out.println("========================================");
            System.out.println("1. Cadastrar nova tarefa");
            System.out.println("2. Listar tarefas");
            System.out.println("3. Marcar tarefa como concluída");
            System.out.println("4. Alterar prioridade de uma tarefa");
            System.out.println("0. Sair");
            System.out.println("========================================");
            System.out.print("Escolha uma opção: ");

            // Validação simples para evitar erro caso o usuário digite texto
            if (scanner.hasNextInt()) {
                opcao = scanner.nextInt();
                scanner.nextLine(); // Limpa o buffer de quebra de linha
            } else {
                System.out.println("❌ Por favor, digite um número válido!");
                scanner.nextLine(); // Descarta entrada inválida
                opcao = -1;
                continue;
            }

            switch (opcao) {
                case 1:
                    cadastrarTarefa();
                    break;
                case 2:
                    listarTarefas();
                    break;
                case 3:
                    marcarConcluida();
                    break;
                case 4:
                    alterarPrioridade();
                    break;
                case 0:
                    System.out.println("Encerrando o programa... Até logo!");
                    break;
                default:
                    System.out.println("❌ Opção inválida! Tente novamente.");
            }

        } while (opcao != 0);

        scanner.close();
    }

    // 1. Cadastrar uma nova tarefa
    public static void cadastrarTarefa() {
        System.out.println("\n--- CADASTRAR TAREFA ---");
        System.out.print("Digite o título (Mínimo de 5 caracteres): ");
        String titulo = scanner.nextLine().trim();

        // Validação do título
        if (titulo.length() < 5) {
            System.out.println("❌ Erro: O título deve ter no mínimo 5 caracteres.");
            return;
        }

        System.out.print("Digite a prioridade (1-Alta, 2-Média, 3-Baixa): ");
        if (scanner.hasNextInt()) {
            int prioridade = scanner.nextInt();
            scanner.nextLine();

            // Validação da prioridade
            if (prioridade < 1 || prioridade > 3) {
                System.out.println("❌ Erro: A prioridade deve ser um valor entre 1 e 3.");
                return;
            }

            Tarefa novaTarefa = new Tarefa(proximoCodigo++, titulo, prioridade);
            tarefas.add(novaTarefa);
            System.out.println("✅ Tarefa cadastrada com sucesso! (Código: " + novaTarefa.getCodigo() + ")");
        } else {
            System.out.println("❌ Erro: Prioridade inválida.");
            scanner.nextLine();
        }
    }

    // 2. Listar as tarefas cadastradas
    public static void listarTarefas() {
        System.out.println("\n--- LISTA DE TAREFAS ---");
        if (tarefas.isEmpty()) {
            System.out.println("Nenhuma tarefa cadastrada no momento.");
            return;
        }

        for (Tarefa t : tarefas) {
            String status = t.isConcluida() ? "[X] Concluída" : "[ ] Pendente";
            System.out.println("[Cód: " + t.getCodigo() + "] " + t.getTitulo() + 
                               " | Prioridade: " + t.getPrioridadeTexto() + 
                               " | Status: " + status);
        }
    }

    // 3. Marcar uma tarefa como concluída
    public static void marcarConcluida() {
        listarTarefas();
        if (tarefas.isEmpty()) return;

        System.out.print("\nDigite o código da tarefa que deseja marcar como concluída: ");
        if (scanner.hasNextInt()) {
            int codigo = scanner.nextInt();
            scanner.nextLine();

            Tarefa tarefa = buscarTarefaPorCodigo(codigo);
            if (tarefa != null) {
                tarefa.setConcluida(true);
                System.out.println("🎉 Tarefa [" + tarefa.getCodigo() + "] marcada como concluída!");
            } else {
                System.out.println("❌ Erro: Tarefa com o código " + codigo + " não encontrada.");
            }
        } else {
            System.out.println("❌ Erro: Código inválido.");
            scanner.nextLine();
        }
    }

    // 4. Alterar a prioridade de uma tarefa
    public static void alterarPrioridade() {
        listarTarefas();
        if (tarefas.isEmpty()) return;

        System.out.print("\nDigite o código da tarefa que deseja alterar a prioridade: ");
        if (scanner.hasNextInt()) {
            int codigo = scanner.nextInt();
            scanner.nextLine();

            Tarefa tarefa = buscarTarefaPorCodigo(codigo);
            if (tarefa != null) {
                System.out.print("Digite a nova prioridade (1-Alta, 2-Média, 3-Baixa): ");
                if (scanner.hasNextInt()) {
                    int novaPrioridade = scanner.nextInt();
                    scanner.nextLine();

                    if (novaPrioridade >= 1 && novaPrioridade <= 3) {
                        tarefa.setPrioridade(novaPrioridade);
                        System.out.println("🔄 Prioridade da tarefa alterada para " + tarefa.getPrioridadeTexto() + "!");
                    } else {
                        System.out.println("❌ Erro: A prioridade deve ser um valor entre 1 e 3.");
                    }
                } else {
                    System.out.println("❌ Erro: Valor de prioridade inválido.");
                    scanner.nextLine();
                }
            } else {
                System.out.println("❌ Erro: Tarefa com o código " + codigo + " não encontrada.");
            }
        } else {
            System.out.println("❌ Erro: Código inválido.");
            scanner.nextLine();
        }
    }

    // Método auxiliar para buscar tarefa pelo ID
    private static Tarefa buscarTarefaPorCodigo(int codigo) {
        for (Tarefa t : tarefas) {
            if (t.getCodigo() == codigo) {
                return t;
            }
        }
        return null;
    }
}