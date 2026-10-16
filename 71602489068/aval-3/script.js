
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("==============================");
        System.out.println("     🚀 MEU PROGRAMA JAVA");
        System.out.println("==============================");

        System.out.print("Digite seu nome: ");
        String nome = scanner.nextLine();

        System.out.println();
        System.out.println("Olá, " + nome + "!");
        System.out.println("Seja bem-vindo ao mundo Java!");
        System.out.println("Seu programa está funcionando!");

        System.out.println("==============================");

        scanner.close();
    }
}
