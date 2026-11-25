import java.util.Scanner;

public class Main {

    public static class Produto {
        private String nome;
        private double preco;

        public Produto(String nome, double preco) {
            this.nome = nome;
            setPreco(preco);
        }

        public String getNome() {
            return nome;
        }

        public double getPreco() {
            return preco;
        }

        public void setPreco(double preco) {
            if (preco < 0) {
                throw new IllegalArgumentException("O preço não pode ser negativo.");
            }
            this.preco = preco;
        }

        public double calcularDesconto(double percentual) {
            return preco - (preco * (percentual / 100.0));
        }
    }

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Nome do produto: ");
            String nome = scanner.nextLine();

            System.out.print("Preço (ex: 150.00): ");
            double preco = scanner.nextDouble();

            Produto produto = new Produto(nome, preco);
            double precoComDesconto = produto.calcularDesconto(10);

            System.out.printf("Produto: %s | Preço original: R$ %.2f | Com 10%% off: R$ %.2f%n",
                    produto.getNome(), produto.getPreco(), precoComDesconto);
        }
    }
}