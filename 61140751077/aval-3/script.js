
import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/calcular")
public class CalculadoraIMC extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        double peso = Double.parseDouble(
            request.getParameter("peso"));

        double altura = Double.parseDouble(
            request.getParameter("altura"));

        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = response.getWriter();

        if (peso <= 0 || altura <= 0) {
            out.println("<h2>Informe valores válidos!</h2>");
            return;
        }

        double imc = peso / (altura * altura);

        String classificacao;

        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
        } else if (imc < 25) {
            classificacao = "Peso normal";
        } else if (imc < 30) {
            classificacao = "Sobrepeso";
        } else if (imc < 35) {
            classificacao = "Obesidade grau I";
        } else if (imc < 40) {
            classificacao = "Obesidade grau II";
        } else {
            classificacao = "Obesidade grau III";
        }

        out.println("<html>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Resultado do IMC</title>");
        out.println("</head>");

        out.println("<body style='font-family: Arial; text-align:center; padding:50px;'>");

        out.println("<h1>Resultado do IMC</h1>");

        out.printf("<h2>Seu IMC: %.2f</h2>", imc);

        out.println("<h3>" + classificacao + "</h3>");

        out.println("<br><a href='index.html'>Voltar</a>");

        out.println("</body>");
        out.println("</html>");
    }
}
