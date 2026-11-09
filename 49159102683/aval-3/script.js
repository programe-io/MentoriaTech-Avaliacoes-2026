import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Classe que representa um veículo Honda
class Carro {
    private String modelo;
    private String categoria;
    private double precoBase;

    public Carro(String modelo, String categoria, double precoBase) {
        this.modelo = modelo;
        this.categoria = categoria;
        this.precoBase = precoBase;
    }

    public String getModelo() {
        return modelo;
    }

    public String getCategoria() {
        return categoria;
    }

    public double getPrecoBase() {
        return precoBase;
    }

    public void exibirDetalhes() {
        System.out.println("Modelo: " + modelo + " | Categoria: " + categoria + " | A partir de: R$ " + precoBase);
    }
}

// Classe que gerencia a concessionária
class Concessionaria {
    private String nome;
    private List<Carro> estoque;

    public Concessionaria(String nome) {
        this.nome = nome;
        this.estoque = new ArrayList<>();
        inicializarEstoque();
    }

    private void inicializarEstoque() {
        estoque.add(new Carro("Honda Civic Híbrido", "Sedan", 244900.00));
        estoque.add(new Carro("Honda HR-V", "SUV", 151200.00));
        estoque.add(new Carro("Honda ZR-V", "SUV", 214500.00));
    }

    public void exibirCatalogo() {
        System.out.println("\n=== Catálogo de Veículos - " + nome + " ===");
        for (int i = 0; i < estoque.size(); i++) {
            System.out.print((i + 1) + ". ");
            estoque.get(i).exibirDetalhes();
        }
    }

    public void agendarTestDrive(int escolha, String cliente, String telefone) {
        if (escolha >= 1 && escolha <= estoque.size()) {
            Carro carroEscolhido = estoque.get(escolha - 1);
            System.out.println("\n[Sucesso] Test-drive agendado!");
            System.out.println("Cliente: " + cliente);
            System.out.println("Telefone: " + telefone);
            System.out.println("Veículo: " + carroEscolhido.getModelo());
            System.out.println("Entraremos em contato para confirmar a data.");
        } else {
            System.out.println("\n[Erro] Opção de veículo inválida.");
        }
    }
}

// Classe Principal para Execução
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Concessionaria hondaPower = new Concessionaria("Honda Power Motors");

        System.out.println("Bem-vindo à Concessionária Honda!");
        
        hondaPower.exibirCatalogo();

        System.out.println("\nDeseja agendar um test-drive? (1 - Sim / 2 - Não)");
        int opcao = scanner.nextInt();
        scanner.nextLine(); // Limpar o buffer

        if (opcao == 1) {
            System.out.print("Digite seu nome completo: ");
            String nome = scanner.nextLine();

            System.out.print("Digite seu telefone/WhatsApp: ");
            String telefone = scanner.nextLine();

            hondaPower.exibirCatalogo();
            System.out.print("Escolha o número do carro para o test-drive: ");
            int escolhaCarro = scanner.nextInt();

            hondaPower.agendarTestDrive(escolhaCarro, nome, telefone);
        } else {
            System.out.println("Obrigado por visitar a Honda. Até logo!");
        }

        scanner.close();
    }
}