import java.util.ArrayList;
import java.util.List;

public class GerenciadorTarefas {

    static class Tarefa {
        int id;
        String titulo;
        String prioridade;
        boolean concluida;

        Tarefa(int id, String titulo, String prioridade) {
            this.id = id;
            this.titulo = titulo;
            this.prioridade = prioridade;
            this.concluida = false;
        }
    }

    private final List<Tarefa> tarefas = new ArrayList<>();
    private int proximoId = 1;

    public void adicionar(String titulo, String prioridade) {
        if (titulo == null || titulo.trim().isEmpty()) {
            throw new IllegalArgumentException(
                "Digite o nome da tarefa."
            );
        }

        tarefas.add(new Tarefa(
            proximoId++, titulo.trim(), prioridade
        ));
    }

    public Tarefa buscar(int id) {
        for (Tarefa tarefa : tarefas) {
            if (tarefa.id == id) {
                return tarefa;
            }
        }
        return null;
    }

    public void concluir(int id) {
        Tarefa tarefa = buscar(id);

        if (tarefa == null) {
            throw new IllegalArgumentException(
                "Tarefa não encontrada."
            );
        }

        tarefa.concluida = !tarefa.concluida;
    }

    public void alterarPrioridade(int id, String prioridade) {
        Tarefa tarefa = buscar(id);

        if (tarefa == null) {
            throw new IllegalArgumentException(
                "Tarefa não encontrada."
            );
        }

        tarefa.prioridade = prioridade;
    }

    public void excluir(int id) {
        Tarefa tarefa = buscar(id);

        if (tarefa == null) {
            throw new IllegalArgumentException(
                "Tarefa não encontrada."
            );
        }

        tarefas.remove(tarefa);
    }

    public List<Tarefa> listar() {
        return new ArrayList<>(tarefas);
    }

    public static void main(String[] args) {
        GerenciadorTarefas gerenciador =
            new GerenciadorTarefas();

        gerenciador.adicionar(
            "Estudar Java", "Alta"
        );

        gerenciador.adicionar(
            "Fazer atividade", "Média"
        );

        gerenciador.concluir(1);

        for (Tarefa tarefa : gerenciador.listar()) {
            System.out.println(
                tarefa.id + " - " +
                tarefa.titulo + " - " +
                tarefa.prioridade + " - " +
                (tarefa.concluida
                    ? "Concluída" : "Pendente")
            );
        }
    }
}