
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("===== CONTROLE DE IMC =====");

        // Receber dados do paciente
        System.out.print("Nome do paciente: ");
        String nome = entrada.nextLine();

        System.out.print("Peso (kg): ");
        double peso = entrada.nextDouble();

        System.out.print("Altura (m): ");
        double altura = entrada.nextDouble();

        // Verificar dados
        if (peso <= 0 || altura <= 0) {
            System.out.println("Peso ou altura inválidos!");
        } else {

            // Calcular IMC
            double imc = peso / (altura * altura);

            String classificacao;

            // Classificação
            if (imc < 18.5) {
                classificacao = "Abaixo do peso";
            } else if (imc < 25) {
                classificacao = "Peso adequado";
            } else if (imc < 30) {
                classificacao = "Sobrepeso";
            } else if (imc < 35) {
                classificacao = "Obesidade grau I";
            } else if (imc < 40) {
                classificacao = "Obesidade grau II";
            } else {
                classificacao = "Obesidade grau III";
            }

            // Exibir resultado
            System.out.println("\n===== RESULTADO =====");
            System.out.println("Paciente: " + nome);
            System.out.println("Peso: " + peso + " kg");
            System.out.println("Altura: " + altura + " m");
            System.out.printf("IMC: %.2f%n", imc);
            System.out.println("Classificação: " + classificacao);
        }

        entrada.close();
    }
}
