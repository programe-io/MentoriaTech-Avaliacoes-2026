
import java.util.Scanner;

public class CalculadoraIMC {

    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        System.out.println("================================");
        System.out.println("      CALCULADORA DE IMC");
        System.out.println("================================");

        System.out.print("Digite seu peso em kg: ");
        double peso = entrada.nextDouble();

        System.out.print("Digite sua altura em metros: ");
        double altura = entrada.nextDouble();

        if (peso <= 0 || altura <= 0) {
            System.out.println("Peso ou altura inválidos!");
        } else {

            double imc = peso / (altura * altura);

            System.out.printf("Seu IMC é: %.2f%n", imc);

            if (imc < 18.5) {
                System.out.println("Classificação: Abaixo do peso");
            } else if (imc < 25) {
                System.out.println("Classificação: Peso normal");
            } else if (imc < 30) {
                System.out.println("Classificação: Sobrepeso");
            } else if (imc < 35) {
                System.out.println("Classificação: Obesidade grau I");
            } else if (imc < 40) {
                System.out.println("Classificação: Obesidade grau II");
            } else {
                System.out.println("Classificação: Obesidade grau III");
            }
        }

        entrada.close();
    }
}
