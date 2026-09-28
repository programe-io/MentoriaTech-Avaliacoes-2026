java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Record introduzido nas versões modernas do Java para representar dados imutáveis
record Brigadeiro(int id, String sabor, double preco) {
    public String getMenuFormatado() {
        return String.format("[%d] %-18s - R\$ %.2f", id, sabor, preco);
    \}
\}

class ItemCarrinho {
    private final Brigadeiro brigadeiro;
    private int quantidade;

    public ItemCarrinho(Brigadeiro brigadeiro, int quantidade) {
        this.brigadeiro = brigadeiro;
        this.quantidade = quantidade;
    \}

    public Brigadeiro getBrigadeiro() { return brigadeiro; \}
    public int getQuantidade() { return quantidade; \}
    public void adicionarQuantidade(int qtd) { this.quantidade += qtd; \}
    public double getTotalItem() { return brigadeiro.preco() * quantidade; \}
\}

public class MercadinhoBrigadeiro {
    private static final List<Brigadeiro> cardapio = List.of(
        new Brigadeiro(1, "Tradicional", 4.00),
        new Brigadeiro(2, "Ninho com Nutella", 5.50),
        new Brigadeiro(3, "Churros", 4.50),
        new Brigadeiro(4, "Pistache", 6.00),
        new Brigadeiro(5, "Moranguinho (Bicho de Pé)", 4.50)
    );

    private static final List<ItemCarrinho> carrinnho = new ArrayList<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.util.in);
        boolean executando = true;

        System.out.println("===========================================");
        System.out.println("  🍬 BEM-VINDO AO MERCADINHO DE BRIGADEIRO 🍬  ");
        System.out.println("===========================================");

        while (executando) {
            exibirMenuPrincipal();
            System.out.print("\\nEscolha uma opção: ");
            String opcao = scanner.nextLine().trim();

            // Uso do Switch Expression (Java Moderno)
            switch (opcao) {
                case "1" -> exibirCardapio();
                case "2" -> adicionarAoCarrinho(scanner);
                case "3" -> verCarrinho();
                case "4" -> finalizarPedido();
                case "5" -> {
                    System.out.println("\\nObrigado por visitar o Mercadinho de Brigadeiro! Volte sempre.   ");
                    executando = false;
                \}
                default -> System.out.println("Opção inválida! Tente novamente.");
            \}
        \}
        scanner.close();
    \}

    private static void exibirMenuPrincipal() {
        System.out.println("\\n--- MENU PRINCIPAL ---");
        System.out.println("1. Ver Cardápio");
        System.out.println("2. Adicionar Doce ao Carrinho");
        System.out.println("3. Visualizar Carrinho");
        System.out.println("4. Finalizar Pedido");
        System.out.println("5. Sair");
    \}

    private static void exibirCardapio() {
        System.out.println("\\n--- NOSSO CARDÁPIO ---");
        cardapio.forEach(b -> System.out.println(b.getMenuFormatado()));
    \}

    private static void adicionarAoCarrinho(Scanner scanner) {
        exibirCardapio();
        try {
            System.out.print("\\nDigite o ID do brigadeiro que deseja: ");
            int id = Integer.parseInt(scanner.nextLine());
            
            Brigadeiro selecionado = cardapio.stream()
                .filter(b -> b.id() == id)
                .findFirst()
                .orElse(null);

            if (selecionado == null) {
                System.out.println("ID inválido! Produto não encontrado.");
                return;
            \}

            System.out.print("Digite a quantidade desejada: ");
            int quantidade = Integer.parseInt(scanner.nextLine());

            if (quantidade <= 0) {
                System.out.println("A quantidade deve ser maior que zero.");
                return;
            \}

            // Se já existir no carrinho, apenas soma a quantidade
            ItemCarrinho itemExistente = carrinnho.stream()
                .filter(item -> item.getBrigadeiro().id() == id)
                .findFirst()
                .orElse(null);

            if (itemExistente != null) {
                itemExistente.adicionarQuantidade(quantidade);
            \} else {
                carrinnho.add(new ItemCarrinho(selecionado, quantidade));
            \}

            System.out.printf("✨ %d unidades de '%s' adicionadas ao carrinho!\\n", quantidade, selecionado.sabor());

        \} catch (NumberFormatException e) {
            System.out.println("Por favor, insira apenas números válidos.");
        \}
    \}

    private static void verCarrinho() {
        System.out.println("\\n--- SEU CARRINHO ---");
        if (carrinnho.isEmpty()) {
            System.out.println("O carrinho está vazio.");
            return;
        \}

        double totalGeral = 0;
        for (ItemCarrinho item : carrinnho) {
            System.out.format("%-18s x%d - R\$ %.2f\\n", 
                item.getBrigadeiro().sabor(), 
                item.getQuantidade(), 
                item.getTotalItem()
            );
            totalGeral += item.getTotalItem();
        \}
        System.out.println("------------------------------------");
        System.out.printf("Total Atual: R\$ %.2f\\n", totalGeral);
    \}

    private static void finalizarPedido() {
        System.out.println("\\n--- FINALIZANDO O PEDIDO ---");
        if (carrinnho.isEmpty()) {
            System.out.println("Seu carrinho está vazio! Adicione doces antes de finalizar.");
            return;
        \}

        verCarrinho();
        double total = carrinnho.stream().mapToDouble(ItemCarrinho::getTotalItem).sum();
        
        System.out.println("\\nPedido realizado com sucesso!");
        System.out.printf("Valor total a pagar: R\$ %.2f\\n", total);
        System.out.println("Seus brigadeiros serão preparados com muito amor! ❤️");
        
        carrinnho.clear(); // Limpa o carrinho após finalizar
    \}
\}$0