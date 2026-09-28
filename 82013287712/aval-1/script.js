java
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Scanner;

// 1. MODELO DE DADOS (Usando Java Records para imutabilidade e concisão)
record Produto(int id, String nome, double preco, int estoque) {
    // Retorna uma nova instância com o estoque atualizado
    public Produto comEstoqueAtualizado(int quantidadeVendida) {
        return new Produto(this.id, this.nome, this.preco, this.estoque - cantidadeVendida);
    \}
\}

record ItemCarrinho(Produto produto, int quantidade) {
    public double getSubtotal() {
        return produto.preco() * quantidade;
    \}
\}

// 2. GERENCIAMENTO DE ESTOQUE (Repository Pattern)
class EstoqueRepository {
    private final List<Produto> produtos = new ArrayList<>();

    public EstoqueRepository() {
        // Carga inicial de produtos do mercadinho
        produtos.add(new Produto(1, "Pão Francês (KG)", 14.50, 50));
        produtos.add(new Produto(2, "Leite Integral 1L", 5.80, 30));
        produtos.add(new Produto(3, "Café Torrado 500g", 18.20, 20));
        produtos.add(new Produto(4, "Arroz Agulhinha 5kg", 27.90, 15));
        produtos.add(new Produto(5, "Feijão Carioca 1kg", 8.50, 25));
    \}

    public List<Produto> listarTodos() {
        return new ArrayList<>(produtos);
    \}

    public Optional<Produto> buscarPorId(int id) {
        return produtos.stream().filter(p -> p.id() == id).findFirst();
    \}

    public void atualizarEstoque(int id, int quantidade) {
        for (int i = 0; i < produtos.size(); i++) {
            if (produtos.get(i).id() == id) {
                produtos.set(i, produtos.get(i).comEstoqueAtualizado(quantidade));
                break;
            \}
        \}
    \}
\}

// 3. FLUXO PRINCIPAL DO SISTEMA
public class Main {
    private static final EstoqueRepository estoque = new EstoqueRepository();
    private static final List<ItemCarrinho> carrinho = new ArrayList<>();
    private static final NumberFormat moedaFormatar = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean executando = true;

        System.out.println("=== BEM-VINDO AO MERCADINHO DO BAIRRO ===");

        while (executando) {
            exibirMenu();
            System.out.print("\\nEscolha uma opção: ");
            String opcao = scanner.nextLine();

            switch (opcao) {
                case "1" -> exibirVitrine();
                case "2" -> adicionarAoCarrinho(scanner);
                case "3" -> exibirCarrinho();
                case "4" -> finalizarCompra();
                case "5" -> {
                    System.out.println("\\nObrigado por comprar conosco! Volte sempre.");
                    executando = false;
                \}
                default -> System.out.println("Opção inválida! Tente novamente.");
            \}
        \}
        scanner.close();
    \}

    private static void exibirMenu() {
        System.out.println("\\n-----------------------------------");
        System.out.println("1. Ver Produtos Disponíveis");
        System.out.println("2. Adicionar Produto ao Carrinho");
        System.out.println("3. Ver Meu Carrinho");
        System.out.println("4. Finalizar Compra e Pagar");
        System.out.println("5. Sair");
        System.out.println("-----------------------------------");
    \}

    private static void exibirVitrine() {
        System.out.println("\\n--- PRODUTOS DISPONÍVEIS ---");
        System.out.printf("%-4s | %-20s | %-10s | %-8s\\n", "ID", "Nome", "Preço", "Estoque");
        System.out.println("-------------------------------------------------------");
        
        estoque.listarTodos().forEach(p -> 
            System.out.printf("%-4d | %-20s | %-10s | %-8d\\n", 
                p.id(), p.nome(), moedaFormatar.format(p.preco()), p.estoque())
        );
    \}

    private static void adicionarAoCarrinho(Scanner scanner) {
        exibirVitrine();
        try {
            System.out.print("\\nDigite o ID do produto: ");
            int id = Integer.parseInt(scanner.nextLine());

            Optional<Produto> produtoOpt = estoque.buscarPorId(id);
            if (produtoOpt.isEmpty()) {
                System.out.println("Produto não encontrado!");
                return;
            \}

            Produto produto = produtoOpt.get();

            System.out.print("Digite a quantidade desejada: ");
            int quantidade = Integer.parseInt(scanner.nextLine());

            if (quantidade <= 0) {
                System.out.println("Quantidade deve ser maior que zero!");
                return;
            \}

            if (quantidade > produto.estoque()) {
                System.out.println("Quantidade indisponível! Estoque atual: " + produto.estoque());
                return;
            \}

            carrinho.add(new ItemCarrinho(produto, quantidade));
            System.out.println("✔ " + quantidade + "x " + produto.nome() + " adicionado ao carrinho!");

        \} catch (NumberFormatException e) {
            System.out.println("Erro: Por favor, insira apenas números inteiros.");
        \}
    \}

    private static void exibirCarrinho() {
        System.out.println("\\n--- SEU CARRINHO DE COMPRAS ---");
        if (carrinho.isEmpty()) {
            System.out.println("O seu carrinho está vazio.");
            return;
        \}

        System.out.printf("%-20s | %-6s | %-10s | %-10s\\n", "Produto", "Qtd", "Unitário", "Subtotal");
        System.out.println("---------------------------------------------------------");

        carrinho.forEach(item -> 
            System.out.printf("%-20s | %-6d | %-10s | %-10s\\n", 
                item.produto().nome(), 
                item.quantidade(), 
                moedaFormatar.format(item.produto().preco()), 
                moedaFormatar.format(item.getSubtotal()))
        );

        double total = carrinho.stream().mapToDouble(ItemCarrinho::getSubtotal).sum();
        System.out.println("---------------------------------------------------------");
        System.out.println("TOTAL DO CARRINHO: " + moedaFormatar.format(total));
    \}

    private static void finalizarCompra() {
        if (carrinho.isEmpty()) {
            System.out.println("\\nNão há itens no carrinho para finalizar a compra.");
            return;
        \}

        System.out.println("\\n--- FECHAMENTO DE CONTA ---");
        exibirCarrinho();

        // Deduz os itens do estoque e limpa o carrinho
        carrinho.forEach(item -> estoque.atualizarEstoque(item.produto().id(), item.quantidade()));
        carrinho.clear();

        System.out.println("\\n✔ Compra realizada com sucesso! Cupom fiscal emitido.");
    \}
\}$0