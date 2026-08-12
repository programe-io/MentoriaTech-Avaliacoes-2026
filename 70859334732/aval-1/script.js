import java.util.ArrayList;
import java.util.Scanner;

public class LojaSuplementos {

    // =========================
    // CLASSE PRODUTO
    // =========================
    static class Produto {

        private int id;
        private String nome;
        private String categoria;
        private double preco;
        private int estoque;

        public Produto(int id, String nome, String categoria,
                       double preco, int estoque) {

            this.id = id;
            this.nome = nome;
            this.categoria = categoria;
            this.preco = preco;
            this.estoque = estoque;
        }

        public int getId() {
            return id;
        }

        public String getNome() {
            return nome;
        }

        public String getCategoria() {
            return categoria;
        }

        public double getPreco() {
            return preco;
        }

        public int getEstoque() {
            return estoque;
        }

        public boolean vender(int quantidade) {

            if (quantidade <= estoque) {
                estoque -= quantidade;
                return true;
            }

            return false;
        }

        public void devolverEstoque(int quantidade) {
            estoque += quantidade;
        }

        public void mostrarProduto() {

            System.out.println("--------------------------------");
            System.out.println("ID: " + id);
            System.out.println("Produto: " + nome);
            System.out.println("Categoria: " + categoria);
            System.out.printf("Preço: R$ %.2f%n", preco);
            System.out.println("Estoque: " + estoque);
        }
    }


    // =========================
    // ITEM DO CARRINHO
    // =========================
    static class ItemCarrinho {

        private Produto produto;
        private int quantidade;

        public ItemCarrinho(Produto produto, int quantidade) {
            this.produto = produto;
            this.quantidade = quantidade;
        }

        public Produto getProduto() {
            return produto;
        }

        public int getQuantidade() {
            return quantidade;
        }

        public double getSubtotal() {

            return produto.getPreco() * quantidade;
        }

        public void adicionarQuantidade(int quantidade) {
            this.quantidade += quantidade;
        }
    }


    // =========================
    // CARRINHO
    // =========================
    static class Carrinho {

        private ArrayList<ItemCarrinho> itens = new ArrayList<>();


        public void adicionarProduto(Produto produto, int quantidade) {

            if (quantidade <= 0) {
                System.out.println("Quantidade inválida.");
                return;
            }

            if (produto.getEstoque() < quantidade) {
                System.out.println("Estoque insuficiente.");
                return;
            }

            for (ItemCarrinho item : itens) {

                if (item.getProduto().getId() == produto.getId()) {

                    item.adicionarQuantidade(quantidade);
                    produto.vender(quantidade);

                    System.out.println("Produto atualizado no carrinho.");
                    return;
                }
            }

            produto.vender(quantidade);

            itens.add(
                new ItemCarrinho(produto, quantidade)
            );

            System.out.println("Produto adicionado ao carrinho.");
        }


        public double calcularSubtotal() {

            double total = 0;

            for (ItemCarrinho item : itens) {
                total += item.getSubtotal();
            }

            return total;
        }


        public double calcularDesconto() {

            double subtotal = calcularSubtotal();

            // 10% para compras acima de R$ 200
            if (subtotal >= 200) {
                return subtotal * 0.10;
            }

            return 0;
        }


        public double calcularTotal() {

            return calcularSubtotal() - calcularDesconto();
        }


        public boolean estaVazio() {

            return itens.isEmpty();
        }


        public void mostrarCarrinho() {

            System.out.println("\n================================");
            System.out.println("          🛒 CARRINHO");
            System.out.println("================================");

            if (itens.isEmpty()) {

                System.out.println("Carrinho vazio.");
                return;
            }

            for (ItemCarrinho item : itens) {

                System.out.println(
                    item.getProduto().getNome()
                    + " x"
                    + item.getQuantidade()
                );

                System.out.printf(
                    "Subtotal: R$ %.2f%n",
                    item.getSubtotal()
                );

                System.out.println("--------------------------------");
            }

            System.out.printf(
                "Subtotal: R$ %.2f%n",
                calcularSubtotal()
            );

            System.out.printf(
                "Desconto: R$ %.2f%n",
                calcularDesconto()
            );

            System.out.printf(
                "TOTAL: R$ %.2f%n",
                calcularTotal()
            );
        }


        public void limpar() {

            itens.clear();
        }
    }


    // =========================
    // CLIENTE
    // =========================
    static class Cliente {

        private String nome;
        private String email;

        public Cliente(String nome, String email) {

            this.nome = nome;
            this.email = email;
        }

        public void mostrarCliente() {

            System.out.println("\n👤 CLIENTE");
            System.out.println("Nome: " + nome);
            System.out.println("Email: " + email);
        }
    }


    // =========================
    // SISTEMA DA LOJA
    // =========================
    static ArrayList<Produto> produtos =
            new ArrayList<>();

    static Scanner scanner =
            new Scanner(System.in);


    // =========================
    // CADASTRAR PRODUTOS
    // =========================
    public static void cadastrarProdutos() {

        produtos.add(
            new Produto(
                1,
                "Whey Protein Chocolate",
                "Proteínas",
                99.90,
                20
            )
        );

        produtos.add(
            new Produto(
                2,
                "Creatina Monohidratada",
                "Performance",
                79.90,
                15
            )
        );

        produtos.add(
            new Produto(
                3,
                "Colágeno Hidrolisado",
                "Beleza",
                69.90,
                25
            )
        );

        produtos.add(
            new Produto(
                4,
                "Multivitamínico",
                "Vitaminas",
                59.90,
                30
            )
        );

        produtos.add(
            new Produto(
                5,
                "Whey Protein Baunilha",
                "Proteínas",
                109.90,
                12
            )
        );

        produtos.add(
            new Produto(
                6,
                "BCAA",
                "Performance",
                64.90,
                18
            )
        );
    }


    // =========================
    // MOSTRAR PRODUTOS
    // =========================
    public static void mostrarProdutos() {

        System.out.println("\n================================");
        System.out.println("       🌸 PRODUTOS");
        System.out.println("================================");

        for (Produto produto : produtos) {

            produto.mostrarProduto();
        }
    }


    // =========================
    // PROCURAR PRODUTO
    // =========================
    public static Produto procurarProduto(int id) {

        for (Produto produto : produtos) {

            if (produto.getId() == id) {
                return produto;
            }
        }

        return null;
    }


    // =========================
    // ADICIONAR AO CARRINHO
    // =========================
    public static void adicionarAoCarrinho(
            Carrinho carrinho) {

        mostrarProdutos();

        System.out.print("\nDigite o ID do produto: ");

        int id = scanner.nextInt();

        Produto produto = procurarProduto(id);

        if (produto == null) {

            System.out.println("Produto não encontrado.");
            return;
        }

        System.out.print("Digite a quantidade: ");

        int quantidade = scanner.nextInt();

        carrinho.adicionarProduto(
            produto,
            quantidade
        );
    }


    // =========================
    // FINALIZAR PEDIDO
    // =========================
    public static void finalizarPedido(
            Carrinho carrinho,
            Cliente cliente) {

        if (carrinho.estaVazio()) {

            System.out.println(
                "Não existem produtos no carrinho."
            );

            return;
        }

        carrinho.mostrarCarrinho();

        System.out.println("\n================================");
        System.out.println("       💳 PAGAMENTO");
        System.out.println("================================");

        System.out.println("1 - Pix");
        System.out.println("2 - Cartão de crédito");
        System.out.println("3 - Cartão de débito");

        System.out.print("Escolha: ");

        int pagamento = scanner.nextInt();

        String formaPagamento;

        switch (pagamento) {

            case 1:
                formaPagamento = "Pix";
                break;

            case 2:
                formaPagamento = "Cartão de crédito";
                break;

            case 3:
                formaPagamento = "Cartão de débito";
                break;

            default:
                System.out.println(
                    "Forma de pagamento inválida."
                );
                return;
        }

        System.out.println("\n================================");
        System.out.println("        ✅ PEDIDO REALIZADO");
        System.out.println("================================");

        cliente.mostrarCliente();

        System.out.println(
            "Pagamento: " + formaPagamento
        );

        System.out.printf(
            "Valor final: R$ %.2f%n",
            carrinho.calcularTotal()
        );

        System.out.println(
            "\n🌸 Obrigado por comprar na Power Woman!"
        );

        carrinho.limpar();
    }


    // =========================
    // MENU PRINCIPAL
    // =========================
    public static void menu() {

        Carrinho carrinho =
                new Carrinho();

        System.out.println(
            "========================================"
        );

        System.out.println(
            "       🌸 POWER WOMAN SUPLEMENTOS 🌸"
        );

        System.out.println(
            "========================================"
        );

        System.out.print("Digite seu nome: ");

        String nome = scanner.nextLine();

        System.out.print("Digite seu email: ");

        String email = scanner.nextLine();

        Cliente cliente =
                new Cliente(nome, email);


        int opcao;

        do {

            System.out.println("\n");
            System.out.println("========== MENU ==========");
            System.out.println("1 - Ver produtos");
            System.out.println("2 - Adicionar produto");
            System.out.println("3 - Ver carrinho");
            System.out.println("4 - Finalizar pedido");
            System.out.println("0 - Sair");

            System.out.print("Escolha uma opção: ");

            opcao = scanner.nextInt();


            switch (opcao) {

                case 1:

                    mostrarProdutos();

                    break;


                case 2:

                    adicionarAoCarrinho(carrinho);

                    break;


                case 3:

                    carrinho.mostrarCarrinho();

                    break;


                case 4:

                    finalizarPedido(
                        carrinho,
                        cliente
                    );

                    break;


                case 0:

                    System.out.println(
                        "\nAté logo! 🌸"
                    );

                    break;


                default:

                    System.out.println(
                        "Opção inválida."
                    );
            }

        } while (opcao != 0);
    }


    // =========================
    // MAIN
    // =========================
    public static void main(String[] args) {

        cadastrarProdutos();

        menu();

        scanner.close();
    }
}