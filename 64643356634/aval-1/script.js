public class Tarefa {
    private int codigo;
    private String titulo;
    private int prioridade; // 1 - Alta, 2 - Média, 3 - Baixa
    private boolean concluida;

    public Tarefa(int codigo, String titulo, int prioridade) {
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

    public void setPrioridade(int prioridade) {
        this.prioridade = prioridade;
    }

    public boolean isConcluida() {
        return concluida;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    @Override
    public String toString() {
        String status = concluida ? "Concluída" : "Pendente";
        String textoPrioridade = switch (prioridade) {
            case 1 -> "1 (Alta)";
            case 2 -> "2 (Média)";
            case 3 -> "3 (Baixa)";
            default -> String.valueOf(prioridade);
        };

        return String.format("Código: %-3d | Título: %-30s | Prioridade: %-10s | Status: %s",
                codigo, titulo, textoPrioridade, status);
    }
}