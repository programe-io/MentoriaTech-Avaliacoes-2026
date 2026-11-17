
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/CalcularIMC")
public class CalcularIMC extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        String nome = request.getParameter("nome");

        double peso = Double.parseDouble(
            request.getParameter("peso"));

        double altura = Double.parseDouble(
            request.getParameter("altura"));

        double imc = peso / (altura * altura);

        String classificacao;

        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
        } else if (imc < 25) {
            classificacao = "Peso adequado";
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

        out.println("<html>");
        out.println("<head>");
        out.println("<title>Resultado do IMC</title>");
        out.println("<link rel='stylesheet' href='style.css'>");
        out.println("</head>");

        out.println("<body>");
        out.println("<div class='container'>");

        out.println("<h1>Resultado do IMC</h1>");

        out.println("<p>Paciente: " + nome + "</p>");

        out.println("<p>Peso: " + peso + " kg</p>");

        out.println("<p>Altura: " + altura + " m</p>");

        out.printf("<p>IMC: %.2f</p>", imc);

        out.println("<h3>" + classificacao + "</h3>");

        out.println("<a href='index.html'>Voltar</a>");

        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}
