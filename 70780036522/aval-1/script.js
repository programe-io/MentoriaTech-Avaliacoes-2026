
import java.util.ArrayList;
import java.util.List;

public class Main {

    static class Produto {
        int codigo;
        String descricao;
        int quantidade;
        double valor;

        Produto(int codigo, String descricao, int quantidade, double valor) {
            this.codigo = codigo;
            this.descricao = descricao;
            this.quantidade = quantidade;
            this.valor = valor;
        }
    }

    static List<Produto> produtos = new ArrayList<>();
    static int proximoCodigo = 1;

    // Validar dados do produto
    static void validarProduto(String descricao, int quantidade, double valor) {
        if (descricao == null || descricao.trim().length() < 5) {
            throw new IllegalArgumentException(
                "Descricao deve ter no minimo cinco caracteres."
            );
        }

        if (quantidade < 1) {
            throw new IllegalArgumentException(
                "Quantidade deve ser maior que zero."
            );
        }

        if (Double.isNaN(valor) || Double.isInfinite(valor) || valor < 0) {
            throw new IllegalArgumentException(
                "Valor deve ser maior ou igual a zero."
            );
        }
    }

    // Cadastrar produto
    static void cadastrarProduto(String descricao, int quantidade, double valor) {
        validarProduto(descricao, quantidade, valor);

        Produto novoProduto = new Produto(
            proximoCodigo++,
            descricao.trim(),
            quantidade,
            valor
        );

        produtos.add(novoProduto);
        System.out.println("Produto cadastrado com sucesso!");
    }

    // Listar produtos
    static void listarProdutos() {
        System.out.println("\n===== LISTA DE PRODUTOS =====");

        if (produtos.isEmpty()) {
            System.out.println("Nenhum produto cadastrado.");
            return;
        }

        for (Produto p : produtos) {
            System.out.println("----------------------------");
            System.out.println("Codigo: " + p.codigo);
            System.out.println("Descricao: " + p.descricao);
            System.out.println("Quantidade: " + p.quantidade);
            System.out.printf("Valor unitario: R$ %.2f%n", p.valor);
            System.out.printf(
                "Valor em estoque: R$ %.2f%n",
                p.quantidade * p.valor
            );
        }

        System.out.println("----------------------------");
    }

    // Buscar produto pelo codigo
    static Produto buscarProduto(int codigoProduto) {
        for (Produto p : produtos) {
            if (p.codigo == codigoProduto) {
                return p;
            }
        }
        return null;
    }

    // Atualizar valor do produto
    static void atualizarValor(int codigoProduto, double novoValor) {
        Produto produto = buscarProduto(codigoProduto);

        if (produto == null) {
            System.out.println("Erro: produto nao encontrado.");
            return;
        }

        if (Double.isNaN(novoValor)
                || Double.isInfinite(novoValor)
                || novoValor < 0) {
            System.out.println("Erro: valor invalido.");
            return;
        }

        produto.valor = novoValor;
        System.out.println("Valor atualizado com sucesso!");
    }

    // Atualizar quantidade
    static void atualizarQuantidade(int codigoProduto, int novaQuantidade) {
        Produto produto = buscarProduto(codigoProduto);

        if (produto == null) {
            System.out.println("Erro: produto nao encontrado.");
            return;
        }

        if (novaQuantidade < 1) {
            System.out.println("Erro: quantidade deve ser maior que zero.");
            return;
        }

        produto.quantidade = novaQuantidade;
        System.out.println("Quantidade atualizada com sucesso!");
    }

    // Excluir produto
    static void excluirProduto(int codigoProduto) {
        Produto produto = buscarProduto(codigoProduto);

        if (produto == null) {
            System.out.println("Erro: produto nao encontrado.");
            return;
        }

        produtos.remove(produto);
        System.out.println("Produto excluido com sucesso!");
    }

    // Programa principal
    public static void main(String[] args) {

        try {
            cadastrarProduto("Teclado mecanico", 10, 150.00);
            cadastrarProduto("Mouse gamer", 20, 89.90);
            cadastrarProduto("Monitor LED", 5, 799.90);

            listarProdutos();

            System.out.println("\n===== ATUALIZANDO PRODUTO =====");
            atualizarValor(1, 179.90);
            atualizarQuantidade(2, 25);

            listarProdutos();

            System.out.println("\n===== EXCLUINDO PRODUTO =====");
            excluirProduto(3);

            listarProdutos();

        } catch (IllegalArgumentException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }
}
