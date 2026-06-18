import java.util.Scanner;

public class MenuSimples {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int opcao;

        do {
            System.out.println("\n=== MENU ===");
            System.out.println("1 - Olá");
            System.out.println("2 - Somar dois números");
            System.out.println("3 - Verificar se número é par");
            System.out.println("0 - Sair");
            System.out.print("Escolha uma opção: ");

            opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    System.out.println("Olá! Bem-vindo ao programa.");
                    break;

                case 2:
                    System.out.print("Digite o primeiro número: ");
                    int a = scanner.nextInt();

                    System.out.print("Digite o segundo número: ");
                    int b = scanner.nextInt();

                    System.out.println("Resultado: " + (a + b));
                    break;

                case 3:
                    System.out.print("Digite um número: ");
                    int n = scanner.nextInt();

                    if (n % 2 == 0) {
                        System.out.println("É par!");
                    } else {
                        System.out.println("É ímpar!");
                    }
                    break;

                case 0:
                    System.out.println("Saindo...");
                    break;

                default:
                    System.out.println("Opção inválida!");
            }

        } while (opcao != 0);

        scanner.close();
    }
}