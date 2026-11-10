import java.util.Scanner;
import java.util.Locale;

public class CalculadoraNotas {
    public static void main(String[] args) {
        // Garante que o programa aceite ponto (.) como separador decimal
        Scanner scanner = new Scanner(System.in).useLocale(Locale.US);

        System.out.println("=== SISTEMA DE NOTAS ===");
        
        System.out.print("Digite o nome do aluno: ");
        String nome = scanner.nextLine();

        System.out.print("Digite a quantidade de notas: ");
        int quantidade = scanner.nextInt();

        double soma = 0;

        for (int i = 1; i <= quantidade; i++) {
            System.out.print("Digite a nota " + i + ": ");
            double nota = scanner.nextDouble();
            soma += nota;
        \}

        double media = soma / quantidade;

        System.out.println("\\n--- RESULTADO ---");
        System.out.println("Aluno: " + nome);
        System.out.printf("Média Final: %.2f%n", media);

        // Verifica a situação com base na média 7.0
        if (media >= 7.0) {
            System.out.println("Situação: APROVADO");
        \} else if (media >= 5.0) {
            System.out.println("Situação: RECUPERAÇÃO");
        \} else {
            System.out.println("Situação: REPROVADO");
        \}

        scanner.close();
    \}
\}$0