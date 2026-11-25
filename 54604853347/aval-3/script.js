import java.util.Scanner;

public class CalculadoraIMC {

    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        String nome;
        double peso, altura, imc;

        System.out.println("================================");
        System.out.println("       CALCULADORA DE IMC");
        System.out.println("================================");

        // Receber nome do paciente
        System.out.print("Digite o nome do paciente: ");
        nome = entrada.nextLine();

        // Receber peso
        System.out.print("Digite o peso (kg): ");
        peso = entrada.nextDouble();

        // Receber altura
        System.out.print("Digite a altura (metros): ");
        altura = entrada.nextDouble();

        // Verificar os dados
        if (peso <= 0 || altura <= 0) {
            System.out.println("Peso e altura devem ser maiores que zero.");
            entrada.close();
            return;
        }

        // Calcular IMC
        imc = peso / (altura * altura);

        // Exibir informações
        System.out.println("\n================================");
        System.out.println("       RESULTADO DO PACIENTE");
        System.out.println("================================");

        System.out.println("Nome: " + nome);
        System.out.println("Peso: " + peso + " kg");
        System.out.println("Altura: " + altura + " m");
        System.out.printf("IMC: %.2f%n", imc);

        // Classificação para adultos
        if (imc < 18.5) {
            System.out.println("Classificação: Abaixo do peso");
        }
        else if (imc < 25) {
            System.out.println("Classificação: Faixa de peso adequada");
        }
        else if (imc < 30) {
            System.out.println("Classificação: Sobrepeso");
        }
        else {
            System.out.println("Classificação: Obesidade");
        }

        System.out.println("================================");

        entrada.close();
    }
}