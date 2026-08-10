import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.DefaultTableCellRenderer;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;

public class SistemaSeducPI extends JFrame {

    private final Color AZUL = new Color(0, 82, 147);
    private final Color AZUL_CLARO = new Color(230, 242, 250);
    private final Color VERDE = new Color(39, 174, 96);
    private final Color VERMELHO = new Color(192, 57, 43);
    private final Color LARANJA = new Color(230, 126, 34);
    private final Color FUNDO = new Color(245, 247, 250);

    private JTable tabela;
    private DefaultTableModel modelo;
    private JTextField campoBusca;

    private List<Aluno> alunos = new ArrayList<>();

    public SistemaSeducPI() {
        configurarJanela();
        criarInterface();
        carregarExemplos();
    }

    private void configurarJanela() {
        setTitle("SEDUC-PI | Controle de Notas e Frequência");
        setSize(1150, 700);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        getContentPane().setBackground(FUNDO);
    }

    private void criarInterface() {

        // =========================
        // CABEÇALHO
        // =========================

        JPanel cabecalho = new JPanel(new BorderLayout());
        cabecalho.setBackground(AZUL);
        cabecalho.setBorder(BorderFactory.createEmptyBorder(18, 25, 18, 25));

        JLabel titulo = new JLabel("SEDUC-PI");
        titulo.setForeground(Color.WHITE);
        titulo.setFont(new Font("Arial", Font.BOLD, 28));

        JLabel subtitulo = new JLabel("Controle de Notas e Frequência");
        subtitulo.setForeground(Color.WHITE);
        subtitulo.setFont(new Font("Arial", Font.PLAIN, 14));

        JPanel textos = new JPanel();
        textos.setOpaque(false);
        textos.setLayout(new BoxLayout(textos, BoxLayout.Y_AXIS));

        textos.add(titulo);
        textos.add(subtitulo);

        cabecalho.add(textos, BorderLayout.WEST);

        JLabel usuario = new JLabel("👤 Professor");
        usuario.setForeground(Color.WHITE);
        usuario.setFont(new Font("Arial", Font.BOLD, 14));

        cabecalho.add(usuario, BorderLayout.EAST);

        add(cabecalho, BorderLayout.NORTH);

        // =========================
        // PAINEL SUPERIOR
        // =========================

        JPanel superior = new JPanel(new BorderLayout());
        superior.setBackground(FUNDO);
        superior.setBorder(BorderFactory.createEmptyBorder(20, 25, 10, 25));

        JLabel tituloTabela = new JLabel("Alunos cadastrados");
        tituloTabela.setFont(new Font("Arial", Font.BOLD, 22));
        tituloTabela.setForeground(new Color(45, 45, 45));

        superior.add(tituloTabela, BorderLayout.WEST);

        JPanel pesquisa = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        pesquisa.setOpaque(false);

        campoBusca = new JTextField(20);
        campoBusca.setPreferredSize(new Dimension(220, 35));

        JButton btnBuscar = criarBotao("Pesquisar", AZUL);

        btnBuscar.addActionListener(e -> atualizarTabela());

        pesquisa.add(campoBusca);
        pesquisa.add(btnBuscar);

        superior.add(pesquisa, BorderLayout.EAST);

        add(superior, BorderLayout.BEFORE_FIRST_LINE);

        // =========================
        // TABELA
        // =========================

        String[] colunas = {
                "Matrícula",
                "Aluno",
                "Turma",
                "1º Bim.",
                "2º Bim.",
                "3º Bim.",
                "4º Bim.",
                "Média",
                "Faltas",
                "Frequência",
                "Situação"
        };

        modelo = new DefaultTableModel(colunas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        tabela = new JTable(modelo);

        tabela.setRowHeight(36);
        tabela.setFont(new Font("Arial", Font.PLAIN, 13));
        tabela.getTableHeader().setFont(new Font("Arial", Font.BOLD, 13));
        tabela.getTableHeader().setBackground(AZUL);
        tabela.getTableHeader().setForeground(Color.WHITE);

        tabela.setSelectionBackground(AZUL_CLARO);
        tabela.setGridColor(new Color(220, 220, 220));

        DefaultTableCellRenderer centralizar = new DefaultTableCellRenderer();
        centralizar.setHorizontalAlignment(SwingConstants.CENTER);

        for (int i = 0; i < tabela.getColumnCount(); i++) {
            tabela.getColumnModel().getColumn(i).setCellRenderer(centralizar);
        }

        JScrollPane scroll = new JScrollPane(tabela);
        scroll.setBorder(BorderFactory.createEmptyBorder(0, 25, 10, 25));

        add(scroll, BorderLayout.CENTER);

        // =========================
        // BOTÕES
        // =========================

        JPanel rodape = new JPanel(new FlowLayout(FlowLayout.LEFT, 12, 15));
        rodape.setBackground(Color.WHITE);
        rodape.setBorder(BorderFactory.createEmptyBorder(5, 25, 5, 25));

        JButton adicionar = criarBotao("+ Novo Aluno", VERDE);
        JButton editar = criarBotao("✎ Editar", AZUL);
        JButton excluir = criarBotao("🗑 Excluir", VERMELHO);
        JButton detalhes = criarBotao("Ver detalhes", LARANJA);

        adicionar.addActionListener(e -> abrirFormulario(null));

        editar.addActionListener(e -> editarAluno());

        excluir.addActionListener(e -> excluirAluno());

        detalhes.addActionListener(e -> mostrarDetalhes());

        rodape.add(adicionar);
        rodape.add(editar);
        rodape.add(excluir);
        rodape.add(detalhes);

        add(rodape, BorderLayout.SOUTH);
    }

    // =========================
    // BOTÃO
    // =========================

    private JButton criarBotao(String texto, Color cor) {

        JButton botao = new JButton(texto);

        botao.setBackground(cor);
        botao.setForeground(Color.WHITE);
        botao.setFont(new Font("Arial", Font.BOLD, 13));
        botao.setFocusPainted(false);
        botao.setBorderPainted(false);
        botao.setPreferredSize(new Dimension(140, 38));

        return botao;
    }

    // =========================
    // FORMULÁRIO
    // =========================

    private void abrirFormulario(Aluno alunoExistente) {

        boolean editar = alunoExistente != null;

        JDialog dialog = new JDialog(this,
                editar ? "Editar aluno" : "Cadastrar aluno",
                true);

        dialog.setSize(450, 520);
        dialog.setLocationRelativeTo(this);

        JPanel painel = new JPanel();
        painel.setBorder(BorderFactory.createEmptyBorder(20, 25, 20, 25));
        painel.setLayout(new GridLayout(0, 2, 10, 10));

        JTextField matricula = new JTextField();
        JTextField nome = new JTextField();
        JTextField turma = new JTextField();

        JTextField n1 = new JTextField();
        JTextField n2 = new JTextField();
        JTextField n3 = new JTextField();
        JTextField n4 = new JTextField();

        JTextField faltas = new JTextField();

        painel.add(new JLabel("Matrícula:"));
        painel.add(matricula);

        painel.add(new JLabel("Nome completo:"));
        painel.add(nome);

        painel.add(new JLabel("Turma:"));
        painel.add(turma);

        painel.add(new JLabel("Nota 1º Bimestre:"));
        painel.add(n1);

        painel.add(new JLabel("Nota 2º Bimestre:"));
        painel.add(n2);

        painel.add(new JLabel("Nota 3º Bimestre:"));
        painel.add(n3);

        painel.add(new JLabel("Nota 4º Bimestre:"));
        painel.add(n4);

        painel.add(new JLabel("Número de faltas:"));
        painel.add(faltas);

        if (editar) {

            matricula.setText(alunoExistente.matricula);
            nome.setText(alunoExistente.nome);
            turma.setText(alunoExistente.turma);

            n1.setText(String.valueOf(alunoExistente.n1));
            n2.setText(String.valueOf(alunoExistente.n2));
            n3.setText(String.valueOf(alunoExistente.n3));
            n4.setText(String.valueOf(alunoExistente.n4));

            faltas.setText(String.valueOf(alunoExistente.faltas));
        }

        JButton salvar = criarBotao("Salvar", VERDE);

        salvar.addActionListener(e -> {

            try {

                String matriculaValor = matricula.getText().trim();
                String nomeValor = nome.getText().trim();
                String turmaValor = turma.getText().trim();

                double nota1 = Double.parseDouble(n1.getText().replace(",", "."));
                double nota2 = Double.parseDouble(n2.getText().replace(",", "."));
                double nota3 = Double.parseDouble(n3.getText().replace(",", "."));
                double nota4 = Double.parseDouble(n4.getText().replace(",", "."));

                int faltasValor = Integer.parseInt(faltas.getText());

                if (nomeValor.isEmpty()) {
                    JOptionPane.showMessageDialog(dialog,
                            "Digite o nome do aluno.");
                    return;
                }

                if (nota1 < 0 || nota1 > 10 ||
                        nota2 < 0 || nota2 > 10 ||
                        nota3 < 0 || nota3 > 10 ||
                        nota4 < 0 || nota4 > 10) {

                    JOptionPane.showMessageDialog(dialog,
                            "As notas devem estar entre 0 e 10.");

                    return;
                }

                if (editar) {

                    alunoExistente.matricula = matriculaValor;
                    alunoExistente.nome = nomeValor;
                    alunoExistente.turma = turmaValor;

                    alunoExistente.n1 = nota1;
                    alunoExistente.n2 = nota2;
                    alunoExistente.n3 = nota3;
                    alunoExistente.n4 = nota4;

                    alunoExistente.faltas = faltasValor;

                } else {

                    Aluno novo = new Aluno(
                            matriculaValor,
                            nomeValor,
                            turmaValor,
                            nota1,
                            nota2,
                            nota3,
                            nota4,
                            faltasValor
                    );

                    alunos.add(novo);
                }

                atualizarTabela();

                dialog.dispose();

            } catch (NumberFormatException ex) {

                JOptionPane.showMessageDialog(dialog,
                        "Digite valores numéricos válidos.");
            }
        });

        JPanel principal = new JPanel(new BorderLayout());

        principal.add(painel, BorderLayout.CENTER);

        JPanel botoes = new JPanel();
        botoes.add(salvar);

        principal.add(botoes, BorderLayout.SOUTH);

        dialog.add(principal);
        dialog.setVisible(true);
    }

    // =========================
    // EDITAR
    // =========================

    private void editarAluno() {

        int linha = tabela.getSelectedRow();

        if (linha == -1) {

            JOptionPane.showMessageDialog(this,
                    "Selecione um aluno na tabela.");

            return;
        }

        int indice = tabela.convertRowIndexToModel(linha);

        Aluno aluno = alunos.get(indice);

        abrirFormulario(aluno);
    }

    // =========================
    // EXCLUIR
    // =========================

    private void excluirAluno() {

        int linha = tabela.getSelectedRow();

        if (linha == -1) {

            JOptionPane.showMessageDialog(this,
                    "Selecione um aluno.");

            return;
        }

        int resposta = JOptionPane.showConfirmDialog(
                this,
                "Deseja realmente excluir este aluno?",
                "Confirmação",
                JOptionPane.YES_NO_OPTION
        );

        if (resposta == JOptionPane.YES_OPTION) {

            int indice = tabela.convertRowIndexToModel(linha);

            alunos.remove(indice);

            atualizarTabela();
        }
    }

    // =========================
    // DETALHES
    // =========================

    private void mostrarDetalhes() {

        int linha = tabela.getSelectedRow();

        if (linha == -1) {

            JOptionPane.showMessageDialog(this,
                    "Selecione um aluno.");

            return;
        }

        int indice = tabela.convertRowIndexToModel(linha);

        Aluno a = alunos.get(indice);

        String mensagem =
                "ALUNO: " + a.nome +
                "\n\nMatrícula: " + a.matricula +
                "\nTurma: " + a.turma +
                "\n\n1º Bimestre: " + a.n1 +
                "\n2º Bimestre: " + a.n2 +
                "\n3º Bimestre: " + a.n3 +
                "\n4º Bimestre: " + a.n4 +
                "\n\nMédia final: " + String.format("%.2f", a.media()) +
                "\nFaltas: " + a.faltas +
                "\nFrequência: " + String.format("%.1f%%", a.frequencia()) +
                "\nSituação: " + a.situacao();

        JOptionPane.showMessageDialog(
                this,
                mensagem,
                "Detalhes do aluno",
                JOptionPane.INFORMATION_MESSAGE
        );
    }

    // =========================
    // ATUALIZAR TABELA
    // =========================

    private void atualizarTabela() {

        modelo.setRowCount(0);

        String busca = campoBusca.getText()
                .trim()
                .toLowerCase();

        for (Aluno a : alunos) {

            if (!busca.isEmpty() &&
                    !a.nome.toLowerCase().contains(busca) &&
                    !a.matricula.toLowerCase().contains(busca)) {

                continue;
            }

            modelo.addRow(new Object[]{
                    a.matricula,
                    a.nome,
                    a.turma,
                    formatar(a.n1),
                    formatar(a.n2),
                    formatar(a.n3),
                    formatar(a.n4),
                    formatar(a.media()),
                    a.faltas,
                    String.format("%.1f%%", a.frequencia()),
                    a.situacao()
            });
        }
    }

    private String formatar(double valor) {
        return String.format("%.2f", valor);
    }

    // =========================
    // EXEMPLOS
    // =========================

    private void carregarExemplos() {

        alunos.add(new Aluno(
                "2026001",
                "Ana Beatriz Silva",
                "9º Ano A",
                8.5,
                9.0,
                8.0,
                9.5,
                5
        ));

        alunos.add(new Aluno(
                "2026002",
                "João Pedro Santos",
                "9º Ano A",
                6.0,
                5.5,
                7.0,
                6.5,
                12
        ));

        alunos.add(new Aluno(
                "2026003",
                "Maria Vitória Oliveira",
                "9º Ano B",
                4.0,
                5.0,
                4.5,
                5.0,
                25
        ));

        atualizarTabela();
    }

    // =========================
    // CLASSE ALUNO
    // =========================

    static class Aluno {

        String matricula;
        String nome;
        String turma;

        double n1;
        double n2;
        double n3;
        double n4;

        int faltas;

        public Aluno(
                String matricula,
                String nome,
                String turma,
                double n1,
                double n2,
                double n3,
                double n4,
                int faltas) {

            this.matricula = matricula;
            this.nome = nome;
            this.turma = turma;

            this.n1 = n1;
            this.n2 = n2;
            this.n3 = n3;
            this.n4 = n4;

            this.faltas = faltas;
        }

        public double media() {

            return (n1 + n2 + n3 + n4) / 4;
        }

        public double frequencia() {

            // Considerando 200 aulas no ano
            double totalAulas = 200;

            double frequencia =
                    ((totalAulas - faltas) / totalAulas) * 100;

            return Math.max(0, frequencia);
        }

        public String situacao() {

            double media = media();
            double freq = frequencia();

            if (freq < 75) {
                return "REPROVADO";
            }

            if (media >= 7) {
                return "APROVADO";
            }

            if (media >= 5) {
                return "RECUPERAÇÃO";
            }

            return "REPROVADO";
        }
    }

    // =========================
    // MAIN
    // =========================

    public static void main(String[] args) {

        SwingUtilities.invokeLater(() -> {

            try {
                UIManager.setLookAndFeel(
                        UIManager.getSystemLookAndFeelClassName()
                );
            } catch (Exception ignored) {
            }

            new SistemaSeducPI().setVisible(true);
        });
    }
}