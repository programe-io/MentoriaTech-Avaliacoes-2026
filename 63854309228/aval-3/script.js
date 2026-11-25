
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
            request.getParameter("peso").replace(",", ".")
        );

        double altura = Double.parseDouble(
            request.getParameter("altura").replace(",", ".")
        );

        response.setContentType("text/html;charset=UTF-8");

        if (peso <= 0 || altura <= 0) {
            response.getWriter().println("Peso e altura devem ser positivos.");
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

        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html lang='pt-br'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Resultado IMC</title>");
        out.println("<link rel='stylesheet' href='style.css'>");
        out.println("</head>");

        out.println("<body>");
        out.println("<div class='container'>");

        out.println("<h1>Resultado do IMC</h1>");

        out.printf("<p>Seu IMC é: <strong>%.2f</strong></p>", imc);

        out.println("<h2>" + classificacao + "</h2>");

        out.println("<br><a href='index.html'>");
        out.println("<button>Calcular novamente</button>");
        out.println("</a>");

        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}
