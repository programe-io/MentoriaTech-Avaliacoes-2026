import java.util.Scanner;

public class BlogAdrielly {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int opcao;

        do {
            System.out.println("\n===== BLOG DA ADRIELLY 💜 =====");
            System.out.println("1 - Sobre mim");
            System.out.println("2 - Meus interesses");
            System.out.println("3 - Ver imagem (descrição IA)");
            System.out.println("4 - Contato");
            System.out.println("0 - Sair");
            System.out.print("Escolha uma opção: ");

            opcao = sc.nextInt();
            sc.nextLine();

            switch (opcao) {

                case 1:
                    System.out.println("\n📖 Sobre mim:");
                    System.out.println("Meu nome é Adrielly e gosto de tecnologia, criatividade e aprender coisas novas.");
                    break;

                case 2:
                    System.out.println("\n💡 Meus interesses:");
                    System.out.println("- Inteligência Artificial 🤖");
                    System.out.println("- Programação 💻");
                    System.out.println("- Design digital 🎨");
                    System.out.println("- Música 🎵");
                    break;

                case 3:
                    System.out.println("\n🖼️ Imagem de IA:");
                    System.out.println("Uma mulher IA futurista, estilo cyberpunk, olhos brilhantes, arte digital moderna.");
                    break;

                case 4:
                    System.out.println("\n📩 Contato:");
                    System.out.println("Email: adrielly@email.com (exemplo)");
                    System.out.println("Instagram: @adrielly (exemplo)");
                    break;

                case 0:
                    System.out.println("\nSaindo do blog... 💜");
                    break;

                default:
                    System.out.println("\nOpção inválida!");
            }

        } while (opcao != 0);

        sc.close();
    }
}