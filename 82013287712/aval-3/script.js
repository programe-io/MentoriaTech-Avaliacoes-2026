import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Produto {
    private int codigo;
    private String nome;
    private double preco;
    private int quantidade;

    public Produto(int codigo, String nome, double preco, int quantidade) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    \}

    public int getCodigo() { return codigo; \}
    public String getNome() { return nome; \}
    public double getPreco() { return preco; \}
    public int getQuantidade() { return quantidade; \}
    public void setQuantidade(int quantidade) { this.quantidade = quantidade; \}

    @Override
    public String toString() {
        return "Cód: " + codigo + " | " + nome + " | Preço: R\$ " + String.format("%.2f", preco) + " | Estoque: " + quantidade;
    \}
\}

public class Mercadinho {
    private static List<Produto> estoque = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int opcao;

        // Produtos iniciais para teste
        estoque.add(new Produto(1, "Arroz 5kg", 25.50, 10));
        estoque.add(new Produto(2, "Feijão 1kg", 8.90, 15));
        estoque.add(new Produto(3, "Leite 1L", 4.50, 20));

        do {
            System.out.println("\\n--- SISTEMA DO MERCADINHO ---");
            System.out.println("1. Listar Produtos");
            System.out.println("2. Cadastrar Produto");
            System.out.println("3. Realizar Venda");
            System.out.println("0. Sair");
            System.out.print("Escolha uma opção: ");
            
            while (!scanner.hasNextInt()) {
                System.out.print("Digite um número válido: ");
                scanner.next();
            \}
            opcao = scanner.nextInt();

            switch (opcao) {
                case 1:
                    listarProdutos();
                    break;
                case 2:
                    cadastrarProduto();
                    break;
                case 3:
                    realizarVenda();
                    break;
                case 0:
                    System.out.println("Saindo do sistema. Até logo!");
                    break;
                default:
                    System.out.println("Opção inválida!");
            \}
        \} while (opcao != 0);

        scanner.close();
    \}

    private static void listarProdutos() {
        System.out.println("\\n--- ESTOQUE ATUAL ---");
        if (estoque.isEmpty()) {
            System.out.println("Nenhum produto cadastrado.");
        \} else {
            for (Produto p : estoque) {
                System.out.println(p);
            \}
        \}
    \}

    private static void cadastrarProduto() {
        System.out.print("\\nDigite o código do produto: ");
        int codigo = scanner.nextInt();
        scanner.nextLine(); // limpar buffer

        System.out.print("Digite o nome do produto: ");
        String nome = scanner.nextLine();

        System.out.print("Digite o preço do produto (ex: 5.50): ");
        double preco = scanner.nextDouble();

        System.out.print("Digite a quantidade em estoque: ");
        int qtd = scanner.nextInt();

        estoque.add(new Produto(codigo, nome, preco, qtd));
        System.out.println("Produto cadastrado com sucesso!");
    \}

    private static void realizarVenda() {
        System.out.println("\\n--- REALIZAR VENDA ---");
        listarProdutos();
        System.out.print("\\nDigite o código do produto que deseja vender: ");
        int codigo = scanner.nextInt();

        Produto produtoEncontrado = null;
        for (Produto p : estoque) {
            if (p.getCodigo() == codigo) {
                produtoEncontrado = p;
                break;
            \}
        \}

        if (produtoEncontrado == null) {
            System.out.println("Produto não encontrado!");
            return;
        \}

        System.out.print("Quantidade desejada: ");
        int qtdVenda = scanner.nextInt();

        if (qtdVenda > produtoEncontrado.getQuantidade()) {
            System.out.println("Estoque insuficiente! Disponível: " + produtoEncontrado.getQuantidade());
            return;
        \}

        double total = produtoEncontrado.getPreco() * qtdVenda;
        System.out.printf("Total da compra: R\$ %.2f\\n", total);
        System.out.print("Digite o valor pago pelo cliente: R\$ ");
        double valorPago = scanner.nextDouble();

        if (valorPago < total) {
            System.out.println("Valor insuficiente para pagar a compra!");
        \} else {
            double troco = valorPago - total;
            produtoEncontrado.setQuantidade(produtoEncontrado.getQuantidade() - qtdVenda);
            System.out.printf("Venda realizada com sucesso! Troco: R\$ %.2f\\n", troco);
        \}
    \}
\}$0