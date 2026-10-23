package br.com.blog.efutebol;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/newsletter")
public class NewsletterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
      String email = request.getParameter("email");
      response.setContentType("text/html;charset=UTF-8");
      try (var out = response.getWriter()) {
          out.println("<html><body style='background:#144d14; color:#fff; text-align:center; font-family:sans-serif;'>");
          if (email != null && email.contains("@")) {
              out.println("<h2>Obrigado por se inscrever, " + email + "!</h2>");
              out.println("<p>Você receberá notícias do blog em seu e-mail.</p>");
          } else {
              out.println("<h2>E-mail inválido! Volte e tente novamente.</h2>");
          }
          out.println("<a href='index.html' style='color:#ffcc33;'>Voltar ao Blog</a>");
          out.println("</body></html>");
      }
    }
}
