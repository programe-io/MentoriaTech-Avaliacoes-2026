
public class CalculadoraGSM {

    public static double calcularGSM(
        double peso,
        double largura,
        double comprimento
    ) {

        if (peso <= 0 || largura <= 0 || comprimento <= 0) {
            throw new IllegalArgumentException(
                "Os valores devem ser maiores que zero."
            );
        }

        double area = (largura * comprimento) / 10000;

        return peso / area;
    }

    public static void main(String[] args) {

        double peso = 5.0;
        double largura = 10.0;
        double comprimento = 10.0;

        double resultado = calcularGSM(
            peso, largura, comprimento
        );

        System.out.printf(
            "Gramatura: %.2f GSM%n", resultado
        );
    }
}
