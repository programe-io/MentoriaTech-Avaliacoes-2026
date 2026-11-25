import java.util.ArrayList;
import java.util.List;

public class SistemaTarefas {

    // Classe interna representando uma tarefa
    static class Tarefa {
        private final String titulo;
        private boolean concluida;

        public Tarefa(String titulo) {
            this.titulo = titulo;
            this.concluida = false;
        }

        public void concluir() {
            this.concluida = true;
        }

        @Override
        public String toString() {
            String status = concluida ? "[X]" : "[ ]";
            return status + " " + titulo;
        }
    }

    private final List<Tarefa> tarefas = new ArrayList<>();

    public void adicionarTarefa(String titulo) {
        tarefas.add(new Tarefa(titulo));
    }

    public void concluirTarefa(int indice) {
        if (indice >= 0 && indice < tarefas.size()) {
            tarefas.get(indice).concluir();
        } else {
            System.out.println("Índice de tarefa inválido.");
        }
    }

    public void listarTarefas() {
        System.out.println("=== Lista de Tarefas ===");
        for (int i = 0; i < tarefas.size(); i++) {
            System.out.println(i + " - " + tarefas.get(i));
        }
    }

    public static void main(String[] args) {
        SistemaTarefas app = new SistemaTarefas();

        app.adicionarTarefa("Estudar classes e objetos em Java");
        app.adicionarTarefa("Praticar listas com ArrayList");
        app.adicionarTarefa("Criar um pequeno projeto");

        app.concluirTarefa(0);
        app.listarTarefas();
    }
}