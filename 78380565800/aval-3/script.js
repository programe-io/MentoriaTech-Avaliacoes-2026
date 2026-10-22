
import java.util.ArrayList;
import java.util.Scanner;

public class GameZone {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        ArrayList<String> jogos = new ArrayList<>();

        jogos.add("Minecraft");
        jogos.add("GTA V");
        jogos.add("Free Fire");
        jogos.add("FIFA");

        int opcao;

        do {
            System.out.println("\n===== GAMEZONE =====");
            System.out.println("1 - Ver jogos");
            System.out.println("2 - Adicionar jogo");
            System.out.println("0 - Sair");
            System.out.print("Escolha uma opção: ");

            opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao) {
                case 1:
                    System.out.println("\n--- LISTA DE JOGOS ---");

                    for (String jogo : jogos) {
                        System.out.println("- " + jogo);
                    }
                    break;

                case 2:
                    System.out.print("Digite o nome do jogo: ");
                    String nome = scanner.nextLine();

                    jogos.add(nome);

                    System.out.println(
                        nome + " foi adicionado ao GameZone!"
                    );
                    break;

                case 0:
                    System.out.println("Obrigado por jogar!");
                    break;

                default:
                    System.out.println("Opção inválida!");
            }

        } while (opcao != 0);

        scanner.close();
    }
}
Como executar
Instale o JDK (Java).

Salve o código em um arquivo chamado GameZone.java.

Abra o terminal nessa pasta.

Execute:


bash
javac GameZone.java
java GameZone
Esse exemplo funciona no terminal, não como uma página visual na internet.

Você quer qual versão?

1. Blog de games com interface visual no navegador e Java no backend (Spring Boot).

2. Projeto simples em Java para iniciantes, executado no terminal.


O ChatGPT é uma IA e pode errar.

Novo chat
Imagens
Plugins
Ver planos e preços
Ajuda

Investigar a fundo
Definições
Obtenha respostas personalizadas
Inicie sessão para obter respostas com base em chats guardados, além de criar imagens e carregar ficheiros.

Vai obter respostas mais in