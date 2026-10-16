
import java.util.Scanner;

public class MentoriaTec {

    static Scanner scanner = new Scanner(System.in);

    static void mostrarMenu() {
        System.out.println("\n================================");
        System.out.println("       MENTORIA TEC");
        System.out.println(" Tecnologia para o seu futuro!");
        System.out.println("================================");
        System.out.println("1 - Conhecer a mentoria");
        System.out.println("2 - Cursos disponíveis");
        System.out.println("3 - Benefícios");
        System.out.println("4 - Contato");
        System.out.println("0 - Sair");
        System.out.print("\nEscolha uma opção: ");
    }

    static void conhecerMentoria() {
        System.out.println("\n--- SOBRE A MENTORIA TEC ---");
        System.out.println("Aprenda tecnologia e desenvolva");
        System.out.println("novas habilidades para o futuro.");
        System.out.println("Nosso objetivo é ajudar você a evoluir!");
    }

    static void mostrarCursos() {
        System.out.println("\n--- CURSOS DISPONÍVEIS ---");
        System.out.println("1. Programação Java");
        System.out.println("2. Desenvolvimento Web");
        System.out.println("3. HTML e CSS");
        System.out.println("4. Inteligência Artificial");
    }

    static void mostrarBeneficios() {
        System.out.println("\n--- BENEFÍCIOS ---");
        System.out.println("- Aprendizado prático");
        System.out.println("- Desenvolvimento de projetos");
        System.out.println("- Orientação profissional");
        System.out.println("- Evolução no seu próprio ritmo");
    }

    static void mostrarContato() {
        System.out.println("\n--- ENTRE EM CONTATO ---");
        System.out.println("Projeto: Mentoria Tec");
        System.out.println("Contato: contato@mentori atec.com");
        System.out.println("Substitua pelo e-mail oficial.");
    }

    public static void main(String[] args) {

        int opcao;

        do {
            mostrarMenu();
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    conhecerMentoria();
                    break;

                case 2:
                    mostrarCursos();
                    break;

                case 3:
                    mostrarBeneficios();
                    break;

                case 4:
                    mostrarContato();
                    break;

                case 0:
                    System.out.println(
                        "\nObrigado por conhecer a Mentoria Tec!"
                    );
                    break;

                default:
                    System.out.println(
                        "\nOpção inválida. Tente novamente."
                    );
            }

        } while (opcao != 0);

        scanner.close();
    }
}
