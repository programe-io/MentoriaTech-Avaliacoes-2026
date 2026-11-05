import java.util.ArrayList;
import java.util.Scanner;

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