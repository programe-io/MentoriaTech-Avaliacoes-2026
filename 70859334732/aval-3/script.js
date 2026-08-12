import java.util.Scanner;

public class LojaBijuterias {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int opcao;
        double total = 0;

        do {
            System.out.println("\n==============================");
            System.out.println("     ✨ BRILHO & CHARME ✨");
            System.out.println("==============================");

            System.out.println("1 - Colar Dourado - R$ 39,90");
            System.out.println("2 - Brinco Delicado - R$ 24,90");
            System.out.println("3 - Pulseira Dourada - R$ 29,90");
            System.out.println("4 - Ver total da compra");
            System.out.println("0 - Finalizar compra");

            System.out.print("\nEscolha uma opção: ");
            opcao = scanner.nextInt();

            switch (opcao) {

                case 1:
                    total += 39.90;
                    System.out.println("Colar adicionado ao carrinho!");
                    break;

                case 2:
                    total += 24.90;
                    System.out.println("Brinco adicionado ao carrinho!");
                    break;

                case 3:
                    total += 29.90;
                    System.out.println("Pulseira adicionada ao carrinho!");
                    break;

                case 4:
                    System.out.printf("Total da compra: R$ %.2f%n", total);
                    break;

                case 0:
                    System.out.printf(
                        "Compra finalizada! Total: R$ %.2f%n",
                        total
                    );
                    System.out.println("Obrigado por comprar na Brilho & Charme! 💖");
                    break;

                default:
                    System.out.println("Opção inválida!");
            }

        } while (opcao != 0);

        scanner.close();
    }
}