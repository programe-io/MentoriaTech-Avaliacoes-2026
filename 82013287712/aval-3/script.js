java
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

// Record moderno para representar os adicionais (Toppings)
record Adicional(String nome, double preco) {\}

// Record moderno para representar o sabor do sorvete
record Sabor(String nome, String tipo) {\} // tipo: Cremoso, Fruta, Vegano

// Classe que representa o Item do Pedido
class ItemPedido {
    private final Sabor sabor;
    private final int bolas;
    private final List<Adicional> adicionais;
    private static final double PRECO_POR_BOLA = 4.50;

    public ItemPedido(Sabor sabor, int bolas) {
        this.sabor = sabor;
        this.bolas = bolas;
        this.adicionais = new ArrayList<>();
    \}

    public void adicionarTopping(Adicional adicional) {
        this.adicionais.add(adicional);
    \}

    public double calcularTotalItem() {
        double precoBase = this.bolas * PRECO_POR_BOLA;
        double precoAdicionais = this.adicionais.stream()
                .mapToDouble(Adicional::preco)
                .sum();
        return precoBase + precoAdicionais;
    \}

    @Override
    public String toString() {
        String toppingsStr = adicionais.isEmpty() ? "Nenhum" : 
            adicionais.stream().map(Adicional::nome).collect(Collectors.joining(", "));
        
        return String.format("%d bola(s) de %s (%s) | Adicionais: %s | Subtotal: R\$ %.2f", 
                bolas, sabor.nome(), sabor.tipo(), toppingsStr, calcularTotalItem());
    \}
\}

// Classe Principal do Sistema da Sorveteria
public final class SorveteriaGelato {
    private static final Scanner scanner = new Scanner(System.in);
    private static final List<Sabor> SABORES = List.of(
            new Sabor("Chocolate Belga", "Cremoso"),
            new Sabor("Morango Silvestre", "Fruta"),
            new Sabor("Pistache Premium", "Cremoso"),
            new Sabor("Maracujá", "Vegano/Fruta"),
            new Sabor("Baunilha Madagascar", "Cremoso")
    );
    private static final List<Adicional> ADICIONAIS = List.of(
            new Adicional("Nutella", 3.50),
            new Adicional("M&Ms", 2.00),
            new Adicional("Calda de Caramelo", 1.50),
            new Adicional("Farofa de Ninho", 2.50)
    );

    public static void main(String[] args) {
        System.out.println("=== 🍦 BEM-VINDO À GELATO PREMIUM 🍦 ===");
        List<ItemPedido> carrinho = new ArrayList<>();
        boolean continuarPedindo = true;

        while (continuarPedindo) {
            exibirCardapioSabores();
            Sabor saborEscolhido = escolherSabor();

            System.out.print("\\nQuantas bolas de sorvete deseja? (Max 5): ");
            int qtdBolas = lerOpcaoValida(1, 5);

            ItemPedido item = new ItemPedido(saborEscolhido, qtdBolas);

            boolean adicionarMaisToppings = true;
            while (adicionarMaisToppings) {
                exibirCardapioAdicionais();
                System.out.print("Deseja colocar algum adicional? (0 para nenhum/concluir): ");
                int opcaoTopping = lerOpcaoValida(0, ADICIONAIS.size());

                if (opcaoTopping == 0) {
                    adicionarMaisToppings = false;
                \} else {
                    Adicional topping = ADICIONAIS.get(opcaoTopping - 1);
                    item.adicionarTopping(topping);
                    System.out.printf("✨ %s adicionado com sucesso!\\n", topping.nome());
                \}
            \}

            carrinho.add(item);
            System.out.print("\\nDeseja adicionar outro sorvete ao seu carrinho? (S/N): ");
            String resposta = scanner.next().trim().toUpperCase();
            if (!resposta.equals("S")) {
                continuarPedindo = false;
            \}
        \}

        exibirCupomFiscal(carrinho);
    \}

    private static void exibirCardapioSabores() {
        System.out.println("\\n--- SABORES DISPONÍVEIS ---");
        for (int i = 0; i < SABORES.size(); i++) {
            System.out.printf("[%d] %s (%s)\\n", (i + 1), SABORES.get(i).nome(), SABORES.get(i).tipo());
        \}
    \}

    private static void exibirCardapioAdicionais() {
        System.out.println("\\n--- ADICIONAIS DISPONÍVEIS ---");
        for (int i = 0; i < ADICIONAIS.size(); i++) {
            System.out.printf("[%d] %s - R\$ %.2f\\n", (i + 1), ADICIONAIS.get(i).nome(), ADICIONAIS.get(i).preco());
        \}
    \}

    private static Sabor escolherSabor() {
        System.out.print("Escolha o número do sabor: ");
        int opcao = lerOpcaoValida(1, SABORES.size());
        return SABORES.get(opcao - 1);
    \}

    private static int lerOpcaoValida(int min, int max) {
        while (true) {
            try {
                int escolha = scanner.nextInt();
                if (escolha >= min && escolha <= max) {
                    return escolha;
                \}
                System.out.printf("Opção inválida! Digite um valor entre %d e %d: ", min, max);
            \} catch (Exception e) {
                System.out.print("Entrada inválida! Digite apenas números inteiros: ");
                scanner.next(); // limpa buffer do scanner
            \}
        \}
    \}

    private static void exibirCupomFiscal(List<ItemPedido> carrinho) {
        System.out.println("\\n=============================================");
        System.out.println("             🍦 RECIBO DO PEDIDO 🍦           ");
        System.out.println("=============================================");
        
        carrinho.forEach(item -> System.out.println("- " + item));
        
        double totalGeral = carrinho.stream()
                .mapToDouble(ItemPedido::calcularTotalItem)
                .sum();
        
        System.out.println("---------------------------------------------");
        System.out.printf(" TOTAL A PAGAR: R\$ %.2f\\n", totalGeral);
        System.out.println("=============================================");
        System.out.println("   Obrigado pela preferência e bom apetite!  ");
        System.out.println("=============================================");
    \}
\}$0