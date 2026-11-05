public class SistemaAlunos {

    public static void main(String[] args) {

        Scanner entrada = new Scanner(System.in);

        ArrayList<String> alunos = new ArrayList<>();

        int opcao;

        do {
            System.out.println("\n===== SISTEMA DE ALUNOS =====");
            System.out.println("1 - Cadastrar aluno");
            System.out.println("2 - Listar alunos");
            System.out.println("3 - Sair");
            System.out.print("Escolha uma opção: ");

            opcao = entrada.nextInt();
            entrada.nextLine();

            switch (opcao) {

                case 1:
                    System.out.print("Digite o nome do aluno: ");
                    String nome = entrada.nextLine();

                    alunos.add(nome);

                    System.out.println("Aluno cadastrado com sucesso!");
                    break;

                case 2:
                    System.out.println("\n--- ALUNOS CADASTRADOS ---");

                    if (alunos.isEmpty()) {
                        System.out.println("Nenhum aluno cadastrado.");
                    } else {
                        for (int i = 0; i < alunos.size(); i++) {
                            System.out.println((i + 1) + " - " + alunos.get(i));
                        }
                    }
                    break;

                case 3:
                    System.out.println("Sistema encerrado!");
                    break;

                default:
                    System.out.println("Opção inválida!");
            }

        } while (opcao != 3);

        entrada.close();
    }
}



2. Explicação do código
Vamos entender as principais partes do sistema.

1. Importação das bibliotecas
import java.util.ArrayList;
import java.util.Scanner;


- Scanner: permite receber informações digitadas pelo usuário.
- ArrayList: permite armazenar vários nomes de alunos em uma lista.
2. Criação da classe
public class SistemaAlunos {


Cria a classe principal do programa, chamada SistemaAlunos.

3. Método principal
public static void main(String[] args) {


É o ponto de início da execução do programa Java.

4. Armazenamento dos alunos
ArrayList<String> alunos = new ArrayList<>();


Cria uma lista que armazena os nomes dos alunos.

5. Menu de opções
System.out.println("1 - Cadastrar aluno");
System.out.println("2 - Listar alunos");
System.out.println("3 - Sair");


Apresenta as opções disponíveis para o usuário.

6. Estrutura switch
switch (opcao) {
    case 1:
        // Cadastrar
        break;

    case 2:
        // Listar
        break;

    case 3:
        // Sair
        break;
}


Verifica qual opção foi escolhida e executa a ação correspondente.

7. Estrutura de repetição
do {
    // Executa o menu
} while (opcao != 3);