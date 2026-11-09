import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

// Classe que representa cada item disponível para compra
class Item {
    private String nome;
    private long preco;
    private String icone;
    private int quantidadeComprada;

    public Item(String nome, long preco, String icone) {
        this.nome = nome;
        this.preco = preco;
        this.icone = icone;
        this.quantidadeComprada = 0;
    }

    public String getNome() { return nome; }
    public long getPreco() { return preco; }
    public String getIcone() { return icone; }
    public int getQuantidadeComprada() { return quantidadeComprada; }

    public void adicionar() { this.quantidadeComprada++; }
    public void remover() { if (this.quantidadeComprada > 0) this.quantidadeComprada--; }
}

// Classe Principal do Simulador
public class SimuladorElonMusk {
    private static final long FORTUNA_INICIAL = 1000000000000L; // 1 Trilhão de USD
    private static long saldoAtual = FORTUNA_INICIAL;
    private static List<Item> catalogo = new ArrayList<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        inicializarCatalogo();

        int opcao = 0;
        while (opcao != 3) {
            exibirCabecalho();
            System.out.println("\n--- MENU PRINCIPAL ---");
            System.out.println("1. Ver catálogo e Comprar/Vender itens");
            System.out.println("2. Ver recibo atual de compras");
            System.out.println("3. Sair do programa");
            System.out.print("Escolha uma opção: ");

            if (scanner.hasNextInt()) {
                opcao = scanner.nextInt();
                switch (opcao) {
                    case 1:
                        gerenciarCompras(scanner);
                        break;
                    case 2:
                        exibirRecibo();
                        break;
                    case 3:
                        System.out.println("\nObrigado por gastar a fortuna do Elon Musk!");
                        break;
                    default:
                        System.out.println("\nOpção inválida. Tente novamente.");
                }
            } else {
                System.out.println("\nPor favor, digite um número válido.");
                scanner.next(); // Limpar entrada inválida
            }
        }
        scanner.close();
    }

    private static void inicializarCatalogo() {
        catalogo.add(new Item("Big Mac", 5L, "🍔"));
        catalogo.add(new Item("iPhone 16 Pro Max", 1200L, "📱"));
        catalogo.add(new Item("Tesla Model S Plaid", 90000L, "🏎️"));
        catalogo.add(new Item("Jato Particular Gulfstream", 75000000L, "🛩️"));
        catalogo.add(new Item("Ilha Particular no Caribe", 50000000L, "🏝️"));
        catalogo.add(new Item("Time de Futebol", 4000000000L, "⚽"));
        catalogo.add(new Item("Plataforma X (Twitter)", 44000000000L, "🐦"));
        catalogo.add(new Item("Empresa Starbucks", 110000000000L, "☕"));
    }

    private static void exibirCabecalho() {
        System.out.println("\n==============================================");
        System.out.println("       GASTE A FORTUNA DE ELON MUSK           ");
        System.out.println("==============================================");
        System.out.println("Saldo Restante: " + formatarMoeda(saldoAtual));
    }

    private static void gerenciarCompras(Scanner scanner) {
        int escolha = -1;
        while (escolha != 0) {
            exibirCabecalho();
            System.out.println("\n--- CATÁLOGO DE ITENS ---");
            System.out.println("0. Voltar ao Menu Principal");
            for (int i = 0; i < catalogo.size(); i++) {
                Item item = catalogo.get(i);
                System.out.printf("%d. %s %s - Preço: %s | Comprados: %d\n", 
                    (i + 1), item.getIcone(), item.getNome(), formatarMoeda(item.getPreco()), item.getQuantidadeComprada());
            }

            System.out.print("\nDigite o número do item que deseja interagir (ou 0 para voltar): ");
            if (scanner.hasNextInt()) {
                escolha = scanner.nextInt();
                if (escolha > 0 && escolha <= catalogo.size()) {
                    Item selecionado = catalogo.get(escolha - 1);
                    
                    System.out.println("\n1. Comprar 1x");
                    System.out.println("2. Vender 1x");
                    System