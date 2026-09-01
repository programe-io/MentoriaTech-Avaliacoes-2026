import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Main {

    // Classe que representa a Estrutura de uma Tarefa
    static class Tarefa {
        private final int codigo;
        private String titulo;
        private int prioridade;
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

        public String getPrioridadeTexto() {
            switch (this.prioridade) {
                case 1: return "Alta";
                case 2: return "Média";
                case 3: return "Baixa";
                default: return "Desconhecida";
            }
        }

        @Override
        public String toString() {
            String status = concluida ? "[X] Concluída" : "[ ] Pendente";
            return String.format("Código: %d | Título: \"%s\" | Prioridade: %s (%d) | Status: %s",
                    codigo, titulo, getPrioridadeTexto(), prioridade, status);
        }
    }

    // Classe responsável pelas Regras de Negócio
    static class GerenciadorDeTarefas {
        private final List<Tarefa> tarefas;
        private int proximoCodigo;

        public GerenciadorDeTarefas() {
            this.tarefas = new ArrayList<>();
            this.proximoCodigo = 1;
        }

        // 1. Cadastrar uma nova tarefa
        public Tarefa cadastrarTarefa(String titulo, int prioridade) {
            if (titulo == null || titulo.trim().length() < 5) {
                System.err.println("Erro: O título deve ter no mínimo 5 caracteres.");
                return null;
            }

            if (prioridade < 1 || prioridade > 3) {
                System.err.println("Erro: A prioridade deve ser 1 (Alta), 2 (Média) ou 3 (Baixa).");
                return null;
            }

            Tarefa novaTarefa = new Tarefa(proximoCodigo++, titulo.trim(), prioridade);
            tarefas.add(novaTarefa);
            System.out.println("Tarefa \"" + novaTarefa.getTitulo() + "\" cadastrada com sucesso! (Código: " + novaTarefa.getCodigo() + ")");
            return novaTarefa;
        }

        // 2. Listar as tarefas cadastradas
        public void listarTarefas() {
            if (tarefas.isEmpty()) {
                System.out.println("Nenhuma tarefa cadastrada.");
                return;
            }

            System.out.println("\n--- LISTA DE TAREFAS ---");
            for (Tarefa tarefa : tarefas) {
                System.out.println(tarefa);
            }
            System.out.println("------------------------\n");
        }

        // 3. Marcar uma tarefa como concluída
        public boolean marcarComoConcluida(int codigo) {
            Optional<Tarefa> tarefaOpt = buscarPorCodigo(codigo);

            if (!tarefaOpt.isPresent()) {
                System.err.println("Erro: Tarefa com código " + codigo + " não encontrada.");
                return false;
            }

            Tarefa tarefa = tarefaOpt.get();
            tarefa.setConcluida(true);
            System.out.println("Tarefa de código " + codigo + " (\"" + tarefa.getTitulo() + "\") foi marcada como concluída.");
            return true;
        }

        // 4. Alterar a prioridade de uma tarefa
        public boolean alterarPrioridade(int codigo, int novaPrioridade) {
            if (novaPrioridade < 1 || novaPrioridade > 3) {
                System.err.println("Erro: A prioridade deve ser 1 (Alta), 2 (Média) ou 3 (Baixa).");
                return false;
            }

            Optional<Tarefa> tarefaOpt = buscarPorCodigo(codigo);

            if (!tarefaOpt.isPresent()) {
                System.err.println("Erro: Tarefa com código " + codigo + " não encontrada.");
                return false;
            }

            Tarefa tarefa = tarefaOpt.get();
            tarefa.setPrioridade(novaPrioridade);
            System.out.println("Prioridade da tarefa " + codigo + " (\"" + tarefa.getTitulo() + "\") alterada para " + novaPrioridade + ".");
            return true;
        }

        private Optional<Tarefa> buscarPorCodigo(int codigo) {
            return tarefas.stream()
                    .filter(t -> t.getCodigo() == codigo)
                    .findFirst();
        }
    }

    // Método Principal para Execução e Testes
    public static void main(String[] args) {
        GerenciadorDeTarefas sistema = new GerenciadorDeTarefas();

        // Testes de Cadastro (Validados e Inválidos)
        sistema.cadastrarTarefa("Estudar Java SE", 1);
        sistema.cadastrarTarefa("Fazer compras do mês", 2);
        sistema.cadastrarTarefa("Ler", 3);                 // Erro: título < 5
        sistema.cadastrarTarefa("Arrumar o quarto", 5);     // Erro: prioridade inválida

        // Listagem Inicial
        sistema.listarTarefas();

        // Marcar tarefa como concluída
        sistema.marcarComoConcluida(1);

        // Alterar prioridade
        sistema.alterarPrioridade(2, 1);

        // Listagem Final
        sistema.listarTarefas();
    }
}