
import java.util.Scanner;

public class CalculadoraIMC {

    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("===== CALCULADORA DE IMC =====");

        System.out.print("Digite seu peso (kg): ");
        double peso = entrada.nextDouble();

        System.out.print("Digite sua altura (m): ");
        double altura = entrada.nextDouble();

        if (peso <= 0 || altura <= 0) {
            System.out.println("Digite valores validos!");
        } else {

            double imc = peso / (altura * altura);

            System.out.printf("Seu IMC: %.2f%n", imc);

            if (imc < 18.5) {
                System.out.println("Classificacao: Abaixo do peso");
            } else if (imc < 25) {
                System.out.println("Classificacao: Peso normal");
            } else if (imc < 30) {
                System.out.println("Classificacao: Sobrepeso");
            } else {
                System.out.println("Classificacao: Obesidade");
            }
        }

        entrada.close();
    }
}
