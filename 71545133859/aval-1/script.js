import javax.swing.*;
import java.awt.*;

public class JulioPerfil {

    public static void main(String[] args) {
        JFrame frame = new JFrame("Perfil de Julio de Souza Dias Neto");
        frame.setSize(600, 500);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        // Header
        JLabel titulo = new JLabel("Julio de Souza Dias Neto", SwingConstants.CENTER);
        titulo.setFont(new Font("Arial", Font.BOLD, 22));
        titulo.setForeground(Color.WHITE);

        JPanel header = new JPanel();
        header.setBackground(new Color(255, 102, 0));
        header.add(titulo);

        // Área de conteúdo
        JTextArea texto = new JTextArea();
        texto.setEditable(false);
        texto.setFont(new Font("Arial", Font.PLAIN, 14));
        texto.setText(
            "EMPREENDEDOR - LOJA DE MOTOS ZERO KM\n\n" +
            "Sobre:\n" +
            "Julio de Souza Dias Neto tem 16 anos e já se destaca como jovem empreendedor.\n\n" +
            "Negócio:\n" +
            "Proprietário de uma loja de motos zero km, atuando na venda e negociação de veículos.\n\n" +
            "Objetivo:\n" +
            "Expandir sua loja e se tornar referência no setor de motocicletas.\n\n" +
            "Contato:\n" +
            "Em breve redes sociais oficiais."
        );

        JScrollPane scroll = new JScrollPane(texto);

        // Footer
        JLabel footer = new JLabel("© 2026 - Perfil pessoal", SwingConstants.CENTER);
        footer.setFont(new Font("Arial", Font.PLAIN, 12));

        // Adicionando componentes
        frame.add(header, BorderLayout.NORTH);
        frame.add(scroll, BorderLayout.CENTER);
        frame.add(footer, BorderLayout.SOUTH);

        frame.setVisible(true);
    }
}