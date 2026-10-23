
import java.util.ArrayList;
import java.util.Scanner;

public class BlogElivan {

    static class Publicacao {
        String autor;
        String texto;
        int curtidas;

        Publicacao(String autor, String texto) {
            this.autor = autor;
            this.texto = texto;
            this.curtidas = 0;
        }

        void mostrar(int numero) {
            System.out.println("\n--- Publicação " + numero + " ---");
            System.out.println("Autor: " + autor);
            System.out.println(texto);
            System.out.println("Curtidas: " + curtidas);
        }
    }

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        ArrayList<Publicacao> publicacoes = new ArrayList<>();

        publicacoes.add(new Publicacao(
            "Elivan",
            "Olá! Bem-vindo ao meu blog pessoal!"
        ));

        int opcao;

        do {
            System.out.println("\n===== BLOG DO ELIVAN =====");
            System.out.println("1 - Ver publicações");
            System.out.println("2 - Criar publicação");
            System.out.println("3 - Curtir publicação");
            System.out.println("4 - Sobre Elivan");
            System.out.println("0 - Sair");
            System.out.print("Escolha uma opção: ");

            while (!entrada.hasNextInt()) {
                System.out.print("Digite um número válido: ");
                entrada.next();
            }

            opcao = entrada.nextInt();
            entrada.nextLine();

            switch (opcao) {
                case 1:
                    if (publicacoes.isEmpty()) {
                        System.out.println("Nenhuma publicação ainda.");
                    } else {
                        for (int i = 0; i < publicacoes.size(); i++) {
                            publicacoes.get(i).mostrar(i + 1);
                        }
                    }
                    break;

                case 2:
                    System.out.print("Digite sua publicação: ");
                    String texto = entrada.nextLine();

                    if (texto.trim().isEmpty()) {
                        System.out.println("A publicação não pode ficar vazia.");
                    } else {
                        publicacoes.add(new Publicacao("Elivan", texto));
                        System.out.println("Publicação criada com sucesso!");
                    }
                    break;

                case 3:
                    if (publicacoes.isEmpty()) {
                        System.out.println("Não há publicações para curtir.");
                        break;
                    }

                    for (int i = 0; i < publicacoes.size(); i++) {
                        publicacoes.get(i).mostrar(i + 1);
                    }

                    System.out.print("Número da publicação para curtir: ");

                    if (entrada.hasNextInt()) {
                        int numero = entrada.nextInt();
                        entrada.nextLine();

                        if (numero >= 1 && numero <= publicacoes.size()) {
                            publicacoes.get(numero - 1).curtidas++;
                            System.out.println("Você curtiu a publicação!");
                        } else {
                            System.out.println("Número de publicação inválido.");
                        }
                    } else {
                        entrada.nextLine();
                        System.out.println("Digite um número válido.");
                    }
                    break;

                case 4:
                    System.out.println("\n===== SOBRE ELIVAN =====");
                    System.out.println("Este é meu blog pessoal!");
                    System.out.println("Aqui compartilho ideias e novidades.");
                    break;

                case 0:
                    System.out.println("Obrigado por visitar o Blog do Elivan!");
                    break;

                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }

        } while (opcao != 0);

        entrada.close();
    }
}
