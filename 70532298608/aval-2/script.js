
import java.util.ArrayList;
import java.util.Scanner;

class Produto {
    int codigo;
    String descricao;
    int quantidade;
    double valor;

    public Produto(int codigo, String descricao,
                   int quantidade, double valor) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.valor = valor;
    }
}

public class Estoque {
    static ArrayList<Produto> produtos = new ArrayList<>();
    static Scanner entrada = new Scanner(System.in);

    public static void main(String[] args) {
        int opcao;

        do {
            System.out.println("\n===== SISTEMA DE ESTOQUE =====");
            System.out.println("1 - Cadastrar produto");
            System.out.println("2 - Listar produtos");
            System.out.println("3 - Alterar valor");
            System.out.println("4 - Alterar quantidade");
            System.out.println("0 - Sair");
            System.out.print("Escolha uma opção: ");

            opcao = entrada.nextInt();
            entrada.nextLine();

            switch (opcao) {
                case 1:
                    cadastrarProduto();
                    break;
                case 2:
                    listarProdutos();
                    break;
                case 3:
                    alterarValor();
                    break;
                case 4:
                    alterarQuantidade();
                    break;
                case 0:
                    System.out.println("Sistema encerrado!");
                    break;
                default:
                    System.out.println("Opção inválida!");
            }
        } while (opcao != 0);

        entrada.close();
    }

    static void cadastrarProduto() {
        System.out.print("Código: ");
        int codigo = entrada.nextInt();
        entrada.nextLine();

        if (buscarProduto(codigo) != null) {
            System.out.println("Código já cadastrado!");
            return;
        }

        System.out.print("Descrição: ");
        String descricao = entrada.nextLine();

        System.out.print("Quantidade: ");
        int quantidade = entrada.nextInt();

        System.out.print("Valor: ");
        double valor = entrada.nextDouble();

        if (codigo <= 0 || descricao.trim().isEmpty()
                || quantidade < 0 || valor < 0) {
            System.out.println("Dados inválidos!");
            return;
        }

        produtos.add(new Produto(
            codigo, descricao, quantidade, valor
        ));

        System.out.println("Produto cadastrado com sucesso!");
    }

    static void listarProdutos() {
        if (produtos.isEmpty()) {
            System.out.println("Nenhum produto cadastrado.");
            return;
        }

        for (Produto p : produtos) {
            System.out.println("\nCódigo: " + p.codigo);
            System.out.println("Descrição: " + p.descricao);
            System.out.println("Quantidade: " + p.quantidade);
            System.out.printf("Valor: R$ %.2f%n", p.valor);
        }
    }

    static Produto buscarProduto(int codigo) {
        for (Produto p : produtos) {
            if (p.codigo == codigo) {
                return p;
            }
        }
        return null;
    }

    static void alterarValor() {
        System.out.print("Código do produto: ");
        int codigo = entrada.nextInt();

        Produto p = buscarProduto(codigo);

        if (p == null) {
            System.out.println("Produto não encontrado!");
            return;
        }

        System.out.print("Novo valor: ");
        double novoValor = entrada.nextDouble();

        if (novoValor < 0) {
            System.out.println("Valor inválido!");
            return;
        }

        p.valor = novoValor;
        System.out.println("Valor alterado com sucesso!");
    }

    static void alterarQuantidade() {
        System.out.print("Código do produto: ");
        int codigo = entrada.nextInt();

        Produto p = buscarProduto(codigo);

        if (p == null) {
            System.out.println("Produto não encontrado!");
            return;
        }

        System.out.print("Nova quantidade: ");
        int novaQuantidade = entrada.nextInt();

        if (novaQuantidade < 0) {
            System.out.println("Quantidade inválida!");
            return;
        }

        p.quantidade = novaQuantidade;
        System.out.println("Quantidade alterada com sucesso!");
    }
}
