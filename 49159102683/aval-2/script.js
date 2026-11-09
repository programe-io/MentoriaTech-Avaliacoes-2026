import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

// Classe que representa o Boletim de Ocorrência
class BoletimOcorrencia {
    private String protocolo;
    private String nome;
    private String cpf;
    private String tipoOcorrencia;
    private String descricao;
    private String data;

    public BoletimOcorrencia(String protocolo, String nome, String cpf, String tipoOcorrencia, String descricao, String data) {
        this.protocolo = protocolo;
        this.nome = nome;
        this.cpf = cpf;
        this.tipoOcorrencia = tipoOcorrencia;
        this.descricao = descricao;
        this.data = data;
    }

    public String getProtocolo() {
        return protocolo;
    }

    public void exibirDetalhes() {
        System.out.println("\n----------------------------------------");
        System.out.println("PROTOCOLO: " + protocolo);
        System.out.println("Comunicante: " + nome + " (CPF: " + cpf + ")");
        System.out.println("Tipo: " + tipoOcorrencia);
        System.out.println("Data/Hora: " + data);
        System.out.println("Descrição: " + descricao);
        System.out.println("----------------------------------------");
    }
}

public class DelegaciaSistema {
    private static List<BoletimOcorrencia> bancoDeDados = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);
    private static Random random = new Random();

    public static void main(String[] args) {
        int opcao;

        do {
            exibirMenu();
            while (!scanner.hasNextInt()) {
                System.out.println("Por favor, digite um número válido.");
                scanner.next();
            }
            opcao = scanner.nextInt();
            scanner.nextLine(); // Limpar o buffer

            switch (opcao) {
                case 1:
                    registrarBO();
                    break;
                case 2:
                    consultarBO();
                    break;
                case 3:
                    listarTodos();
                    break;
                case 4:
                    System.out.println("\nSaindo do Sistema da Delegacia Digital. Até logo!");
                    break;
                default:
                    System.out.println("\n[ERRO] Opção inválida! Tente novamente.");
            }
        } while (opcao != 4);

        scanner.close();
    }

    private static void exibirMenu() {
        System.out.println("\n========================================");
        System.out.println("    SISTEMA DE DELEGACIA DIGITAL (B.O.)   ");
        System.out.println("========================================");
        System.out.println("1. Registrar Boletim de Ocorrência");
        System.out.println("2. Consultar por Protocolo");
        System.out.println("3. Listar Todas as Ocorrências da Sessão");
        System.out.println("4. Sair");
        System.out.print("Escolha uma opção: ");
    }

    private static void registrarBO() {
        System.out.println("\n--- NOVO BOLETIM DE OCORRÊNCIA ---");
        
        System.out.print("Nome completo do comunicante: ");
        String nome = scanner.nextLine();

        System.out.print("CPF (ex: 000.000.000-00): ");
        String cpf = scanner.nextLine();

        System.out.print("Tipo de Ocorrência (Ex: Furto, Roubo, Ameaça): ");
        String tipo = scanner.nextLine();

        System.out.print("Descrição detalhada dos fatos: ");
        String descricao = scanner.nextLine();

        // Gerar protocolo aleatório de 6 dígitos
        String protocolo = "BO-" + (100000 + random.nextInt(900000));
        String dataAtual = java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));

        BoletimOcorrencia novoBO = new BoletimOcorrencia(protocolo, nome, cpf, tipo, descricao, dataAtual);
        bancoDeDados.add(novoBO);

        System.out.println("\n[SUCESSO] B.O. registrado com sucesso!");
        System.out.println("Guarde o seu número de protocolo: " + protocolo);
    }

    private static void consultarBO() {
        System.out.println("\n--- CONSULTAR BOLETIM DE OCORRÊNCIA ---");
        System.out.print("Digite o número do protocolo (Ex: BO-123456): ");
        String protocoloBusca = scanner.nextLine().trim().toUpperCase();

        boolean encontrado = false;
        for (BoletimOcorrencia bo : bancoDeDados) {
            if (bo.getProtocolo().equals(protocoloBusca)) {
                bo.exibirDetalhes();
                encontrado = true;
                break;
            }
        }

        if (!encontrado) {
            System.out.println("\n[AVISO] Nenhum boletim encontrado com o protocolo: " + protocoloBusca);
        }
    }

    private static void listarTodos() {
        System.out.println("\n--- OCORRÊNCIAS REGISTRADAS NA SESSÃO ---");
        if (bancoDeDados.isEmpty()) {
            System.out.println("Nenhuma ocorrência registrada até o momento.");
            return;
        }

        for (BoletimOcorrencia bo : bancoDeDados) {
            bo.exibirDetalhes();
        }
    }
}