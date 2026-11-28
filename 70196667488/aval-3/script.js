import java.util.Locale;
import java.util.Scanner;

public class CalculadoraIMC {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in).useLocale(Locale.US);

        System.out.println("=== CALCULADORA DE IMC ===");

        System.out.print("Digite o nome do paciente: ");
        String nome = scanner.nextLine();

        System.out.print("Digite o peso do paciente (kg) [ex: 70.5]: ");
        double peso = scanner.nextDouble();

        System.out.print("Digite a altura do paciente (m) [ex: 1.75]: ");
        double altura = scanner.nextDouble();

        Paciente paciente = new Paciente(nome, peso, altura);
        paciente.exibirInformacoes();

        scanner.close();
    }
}

class Paciente {
    private String nome;
    private double peso;
    private double altura;

    public Paciente(String nome, double peso, double altura) {
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    public double calcularIMC() {
        return peso / (altura * altura);
    }

    public String obterClassificacao() {
        double imc = calcularIMC();

        if (imc < 18.5) {
            return "Abaixo do peso";
        } else if (imc < 25.0) {
            return "Peso normal";
        } else if (imc < 30.0) {
            return "Sobrepeso";
        } else if (imc < 35.0) {
            return "Obesidade Grau I";
        } else if (imc < 40.0) {
            return "Obesidade Grau II";
        } else {
            return "Obesidade Grau III";
        }
    }

    public void exibirInformacoes() {
        double imc = calcularIMC();
        System.out.println("\n--- RESULTADO DO PACIENTE ---");
        System.out.println("Nome: " + nome);
        System.out.printf("Peso: %.2f kg\n", peso);
        System.out.printf("Altura: %.2f m\n", altura);
        System.out.printf("IMC: %.2f\n", imc);
        System.out.println("Classificação: " + obterClassificacao());
        System.out.println("-----------------------------");
    }
}
