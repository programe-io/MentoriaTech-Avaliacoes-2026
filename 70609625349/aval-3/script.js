public class Tarefa {

    private int codigo;
    private String titulo;
    private int prioridade;
    private boolean concluida;

    public Tarefa(int codigo, String titulo, int prioridade) {

        if (titulo.length() < 5) {
            throw new IllegalArgumentException(
                "O título deve ter no mínimo 5 caracteres."
            );
        }

        if (prioridade < 1 || prioridade > 3) {
            throw new IllegalArgumentException(
                "A prioridade deve estar entre 1 e 3."
            );
        }

        this.codigo = codigo;
        this.titulo = titulo;
        this.prioridade = prioridade;
        this.concluida = false;
    }

    public int getCodigo() {
        return codigo;
    }

    public String getTitulo() {
        return titulo;
    }

    public int getPrioridade() {
        return prioridade;
    }

    public boolean isConcluida() {
        return concluida;
    }

    public void concluir() {
        concluida = true;
    }

    public void alterarPrioridade(int prioridade) {

        if (prioridade < 1 || prioridade > 3) {
            throw new IllegalArgumentException(
                "A prioridade deve estar entre 1 e 3."
            );
        }

        this.prioridade = prioridade;
    }
}