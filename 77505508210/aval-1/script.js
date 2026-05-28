```java id="6m1y2p"
import java.util.Scanner;

public class Astronomia {

    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        int opcao;

        System.out.println("🌌 SISTEMA DE ASTRONOMIA 🌌");

        do {

            System.out.println("\nEscolha uma opção:");
            System.out.println("1 - O que é Astronomia");
            System.out.println("2 - Planetas");
            System.out.println("3 - Buraco Negro");
            System.out.println("4 - Galáxia");
            System.out.println("0 - Sair");

            System.out.print("Digite: ");
            opcao = entrada.nextInt();

            switch(opcao) {

                case 1:
                    System.out.println("\nA astronomia é a ciência que estuda o universo.");
                    break;

                case 2:
                    System.out.println("\nOs planetas giram ao redor do Sol.");
                    System.out.println("Exemplos: Terra, Marte e Júpiter.");
                    break;

                case 3:
                    System.out.println("\nUm buraco negro possui uma gravidade muito forte.");
                    break;

                case 4:
                    System.out.println("\nUma galáxia é formada por bilhões de estrelas.");
                    break;

                case 0:
                    System.out.println("\nEncerrando sistema...");
                    break;

                default:
                    System.out.println("\nOpção inválida!");
            }

        } while(opcao != 0);

        entrada.close();
    }
}
```
