
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/CalculadoraGSM")
public class CalculadoraGSM extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        double largura = Double.parseDouble(
            request.getParameter("largura"));

        double comprimento = Double.parseDouble(
            request.getParameter("comprimento"));

        double gsm = Double.parseDouble(
            request.getParameter("gsm"));

        // Área em metros quadrados
        double area = largura * comprimento;

        // Peso em gramas
        double pesoGramas = area * gsm;

        // Conversão para quilogramas
        double pesoKg = pesoGramas / 1000;

        PrintWriter out = response.getWriter();

        out.println("<html><head><meta charset='UTF-8'>");
        out.println("<title>Resultado GSM</title>");
        out.println("<link rel='stylesheet' href='style.css'>");
        out.println("</head><body>");

        out.println("<div class='container'>");
        out.println("<h1>Resultado</h1>");

        out.println("<p>Área: " + area + " m²</p>");
        out.println("<p>Gramatura: " + gsm + " GSM</p>");

        out.println("<h2>Peso em gramas: "
            + String.format("%.2f", pesoGramas) + " g</h2>");

        out.println("<h2>Peso em KG: "
            + String.format("%.3f", pesoKg) + " kg</h2>");

        out.println("<br><a href='index.html'>");
        out.println("<button>Nova consulta</button></a>");

        out.println("</div></body></html>");
    }
}
