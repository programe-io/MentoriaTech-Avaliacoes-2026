import java.util.Scanner;

public class LojaSuplementos {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int opcao;

        System.out.println("================================");
        System.out.println("      💪 POWER SUPLEMENTOS      ");
        System.out.println("================================");

        do {
            System.out.println("\n--- PRODUTOS ---");
            System.out.println("1 - Whey Protein - R$ 99,90");
            System.out.println("2 - Creatina - R$ 79,90");
            System.out.println("3 - Pré-Treino - R$ 89,90");
            System.out.println("0 - Sair");

            System.out.print("\nEscolha um produto: ");
            opcao = scanner.nextInt();

            switch (opcao) {

                case 1:
                    System.out.println("Whey Protein adicionado ao carrinho!");
                    System.out.println("Preço: R$ 99,90");
                    break;

                case 2:
                    System.out.println("Creatina adicionada ao carrinho!");
                    System.out.println("Preço: R$ 79,90");
                    break;

                case 3:
                    System.out.println("Pré-Treino adicionado ao carrinho!");
                    System.out.println("Preço: R$ 89,90");
                    break;

                case 0:
                    System.out.println("Obrigado por visitar a Power Suplementos!");
                    break;

                default:
                    System.out.println("Opção inválida!");
            }

        } while (opcao != 0);

        scanner.close();
    }
}