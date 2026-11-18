import javax.swing.*;
import java.awt.*;

public class Calculadora extends JFrame {

    private JTextField display;
    private double primeiroNumero;
    private String operador = "";
    private boolean novoNumero = true;

    public Calculadora() {
        setTitle("Minha Calculadora");
        setSize(320, 430);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        display = new JTextField("0");
        display.setFont(new Font("Arial", Font.BOLD, 30));
        display.setHorizontalAlignment(JTextField.RIGHT);
        display.setEditable(false);

        add(display, BorderLayout.NORTH);

        JPanel painel = new JPanel(
            new GridLayout(5, 4, 10, 10)
        );

        String[] botoes = {
            "AC", "±", "%", "÷",
            "7", "8", "9", "×",
            "4", "5", "6", "−",
            "1", "2", "3", "+",
            "0", ".", "⌫", "="
        \};

        for (String texto : botoes) {
            JButton botao = new JButton(texto);
            botao.setFont(new Font("Arial", Font.BOLD, 22));

            botao.addActionListener(e ->
                clicar(texto)
            );

            painel.add(botao);
        \}

        add(painel, BorderLayout.CENTER);
        setVisible(true);
    \}

    private void clicar(String valor) {
        try {
            if (valor.matches("[0-9]") || valor.equals(".")) {
                if (novoNumero) {
                    display.setText(
                        valor.equals(".") ? "0." : valor
                    );
                    novoNumero = false;
                \} else if (valor.equals(".")) {
                    if (!display.getText().contains(".")) {
                        display.setText(display.getText() + ".");
                    \}
                \} else {
                    display.setText(display.getText().equals("0")
                        ? valor
                        : display.getText() + valor);
                \}
            \} else if (valor.equals("AC")) {
                display.setText("0");
                operador = "";
                primeiroNumero = 0;
                novoNumero = true;
            \} else if (valor.equals("±")) {
                display.setText(String.valueOf(
                    -Double.parseDouble(display.getText())
                ));
            \} else if (valor.equals("%")) {
                display.setText(String.valueOf(
                    Double.parseDouble(display.getText()) / 100
                ));
            \} else if (valor.equals("⌫")) {
                String atual = display.getText();
                display.setText(atual.length() > 1
                    ? atual.substring(0, atual.length() - 1)
                    : "0");
            \} else if (valor.equals("=")) {
                calcular();
            \} else {
                primeiroNumero = Double.parseDouble(display.getText());
                operador = valor;
                novoNumero = true;
            \}
        \} catch (Exception e) {
            display.setText("Erro");
            novoNumero = true;
        \}
    \}

    private void calcular() {
        if (operador.isEmpty()) return;

        double segundoNumero =
            Double.parseDouble(display.getText());

        double resultado = 0;

        switch (operador) {
            case "+": resultado = primeiroNumero + segundoNumero; break;
            case "−": resultado = primeiroNumero - segundoNumero; break;
            case "×": resultado = primeiroNumero * segundoNumero; break;
            case "÷":
                if (segundoNumero == 0) {
                    display.setText("Erro");
                    operador = "";
                    novoNumero = true;
                    return;
                \}
                resultado = primeiroNumero / segundoNumero;
                break;
        \}

        display.setText(String.valueOf(resultado));
        operador = "";
        novoNumero = true;
    \}

    public static void main(String[] args) {
        SwingUtilities.invokeLater(Calculadora::new);
    \}
\}$0