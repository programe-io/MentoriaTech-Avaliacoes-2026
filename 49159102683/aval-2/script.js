import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

// Classe que representa cada Carta de Jogador
class JogadorFUT {
    private String nome;
    private int rating;
    private String posicao;
    private long preco;
    private int quantidadeComprada;

    public JogadorFUT(String nome, int rating, String posicao, long preco) {
        this.nome = nome;
        this.rating = rating;
        this.posicao = posicao;
        this.preco = preco;
        this.quantidadeComprada = 0;
    }

    public String getNome() { return nome; }
    public int getRating() { return rating; }
    public String getPosicao() { return posicao; }
    public long getPreco() { return preco; }
    public int getQuantidadeComprada() { return quantidadeComprada; }

    public void adicionar() { this.quantidadeComprada++; }
    public void vender() { if (this.quantidadeComprada > 0) this.quantidadeComprada--; }

    public void exibirCarta() {
        System.out.printf("[%d] %s (%s) - Preço: 🪙 %s | No Elenco: %x\n", 
            rating, nome, posicao, formatarCoins(preco), quantidadeComprada);
    }

    private String formatarCoins(long valor) {
        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("en", "US"));
        return nf.format(valor).replace("$", "🪙 ");
    }
}

// Classe Principal do Simulador FC 27 Ultimate Team
public class MainFC27 {
    private static final long SALDO_INICIAL = 10000000L; // 10 Milhões de Coins
    private static long coinsAtuais = SALDO_INICIAL;
    private static List<JogadorFUT> mercado = new ArrayList<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        inicializarMercado();

        int opcao = 0;
        while (opcao != 3) {
            exibirCabecalho();
            System.out.println("\n--- MENU ULTIMATE TEAM ---");
            System.out.println("1. Acessar Mercado de Transferências (Comprar/Vender)");
            System.out.println("2. Ver Meu Elenco Atual (Recibo)");
            System.out.println("3. Sair do Jogo");
            System.out.print("Escolha uma opção: ");

            if (scanner.hasNextInt()) {
                opcao = scanner.nextInt();
                switch (opcao) {
                    case 1:
                        gerenciarMercado(scanner);
                        break;
                    case 2:
                        exibirElenco();
                        break;
                    case 3:
                        System.out.println("\nObrigado por jogar o EA Sports FC 27 Ultimate Team!");
                        break;
                    default:
                        System.out.println("\nOpção inválida. Tente novamente.");
                }
            } else {
                System.out.println("\nPor favor, digite um número válido.");
                scanner.next();
            }
        }
        scanner.close();
    }

    private static void inicializarMercado() {
        mercado.add(new JogadorFUT("Lamine Yamal", 91, "RW", 1500000L));
        mercado.add(new JogadorFUT("Jude Bellingham", 93, "CM", 2800000L));
        mercado.add(new JogadorFUT("Kylian Mbappé", 94, "ST", 3500000L));
        mercado.add(new JogadorFUT("Erling Haaland", 93, "ST", 3000000L));
        mercado.add(new JogadorFUT("Vinicius Jr", 92, "LW", 2200000L));
        mercado.add(new JogadorFUT("Pelé (Icon)", 98, "CF", 7500000L));
        mercado.add(new JogadorFUT("Ronaldo Nazário (Icon)", 97, "ST", 7000000L));
        mercado.add(new JogadorFUT("Zinedine Zidane (Icon)", 96, "CAM", 5500000L));
    }

    private static void exibirCabecalho() {
        System.out.println("\n==============================================");
        System.out.println("          EA SPORTS FC 27 - UT MARKET         ");
        System.out.println("==============================================");
        System.out.printf("Saldo de Coins: 🪙 %,d\n", coinsAtuais);
    }

    private static void gerenciarMercado(Scanner scanner) {
        int escolha = -1;
        while (escolha != 0) {
            exibirCabecalho();
            System.out.println("\n--- MERCADO DE TRANSFERÊNCIAS ---");
            System.out.println("0. Voltar ao Menu Principal");
            for (int i = 0; i < mercado.size(); i++) {
                System.out.print((i + 1) + ". ");
                mercado.get(i).exibirCarta();
            }

            System.out.print("\nDigite o número do jogador para interagir (ou 0 para voltar): ");
            if (scanner.hasNextInt()) {
                escolha = scanner.nextInt();
                if (escolha > 0 && escolha <= mercado.size()) {
                    JogadorFUT jogador = mercado.get(escolha - 1);

                    System.out.println("\n1. Contratar (Comprar)");
                    System.out.println("2. Vender (Dispensar)");
                    System.out.print("Escolha a ação: ");
                    int acao = scanner.nextInt();

                    if (acao == 1) {
                        if (coinsAtuais >= jogador.getPreco()) {
                            coinsAtuais -= jogador.getPreco();
                            jogador.adicionar();
                            System.out.println("\n[Sucesso] Você contratou " + jogador.getNome() + "!");
                        } else {
                            System.out.println("\n[Erro] Coins insuficientes para esta contratação!");
                        }
                    } else if (acao == 2) {
                        if (jogador.getQuantidadeComprada() > 0) {
                            coinsAtuais += jogador.getPreco();
                            jogador.vender();
                            System.out.println("\n[Sucesso] Você vendeu " + jogador.getNome() + "!");
                        } else {
                            System.out.println("\n[Erro] Você não possui este jogador no seu elenco para vender!");
                        }
                    }
                } else if (escolha != 0) {
                    System.out.println("\nOpção de jogador inválida.");
                }
            } else {
                scanner.next();
                System.out.println("\nEntrada inválida.");
            }
        }
    }

    private static void exibirElenco() {
        System.out.println("\n==============================================");
        System.out.println("                MEU ELENCO ATIVO              ");
        System.out.println("==============================================");
        long valorTotalElenco = 0;
        boolean temJogadores = false;

        for (JogadorFUT jogador : mercado) {
            if (jogador.getQuantidadeComprada() > 0) {
                temJogadores = true;
                long subtotal = jogador.getQuantidadeComprada() * jogador.getPreco();
                valorTotalElenco += subtotal;
                System.out.printf("⭐ [%d] %s (%s) x%d - Valor: 🪙 %,d\n",
                    jogador.getRating(), jogador.getNome(), jogador.getPosicao(), jogador.getQuantidadeComprada(), subtotal);
            }
        }

        if (!temJogadores) {
            System.out.println("Seu elenco está vazio. Contrate jogadores no mercado!");
        } else {
            System.out.println("----------------------------------------------");
            System.out.printf("Valor Total Investido no Elenco: 🪙 %,d\n", valorTotalElenco);
        }
        System.out.println("==============================================");
    }
}