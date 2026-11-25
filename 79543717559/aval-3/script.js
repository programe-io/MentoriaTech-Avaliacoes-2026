import java.util.Scanner;

public class SituacaoAluno {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nome do aluno: ");
        String nome = scanner.nextLine();

        System.out.print("Nota 1: ");
        double nota1 = scanner.nextDouble();

        System.out.print("Nota 2: ");
        double nota2 = scanner.nextDouble();

        double media = (nota1 + nota2) / 2.0;
        String status;

        if (media >= 7.0) {
            status = "Aprovado";
        \} else if (media >= 5.0) {
            status = "Recuperação";
        \} else {
            status = "Reprovado";
        \}

        System.out.printf("%nAluno: %s | Média: %.2f | Situação: %s%n", nome, media, status);
        scanner.close();$0