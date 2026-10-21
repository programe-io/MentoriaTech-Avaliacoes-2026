
class Pessoa {
    String nome;
    double peso;
    double altura;

    public Pessoa(String nome, double peso, double altura) {
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    public double calcularIMC() {
        return peso / (altura * altura);
    }

    public String verificarStatus() {
        double imc = calcularIMC();

        if (imc < 18.5) {
            return "Abaixo do peso";
        } else if (imc < 25) {
            return "Peso normal";
        } else if (imc < 30) {
            return "Sobrepeso";
        } else {
            return "Obesidade";
        }
    }
}

public class IMC {
    public static void main(String[] args) {
        Pessoa[] pessoas = {
            new Pessoa("Ana", 50, 1.60),
            new Pessoa("Bruno", 90, 1.75),
            new Pessoa("Carla", 45, 1.65),
            new Pessoa("Daniel", 100, 1.70)
        };

        System.out.printf(
            "%-12s %-12s %-12s %-12s %-20s%n",
            "Nome", "Peso (kg)", "Altura (m)", "IMC", "Status"
        );

        System.out.println(
            "-------------------------------------------------------------------"
        );

        for (Pessoa pessoa : pessoas) {
            System.out.printf(
                "%-12s %-12.2f %-12.2f %-12.2f %-20s%n",
                pessoa.nome,
                pessoa.peso,
                pessoa.altura,
                pessoa.calcularIMC(),
                pessoa.verificarStatus()
            );
        }
    }
}
