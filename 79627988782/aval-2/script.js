document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const posts = document.querySelectorAll('.post');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = modal.querySelector('.close-modal');
  const readMoreButtons = document.querySelectorAll('.read-more-btn');

  // Filtro de categorias
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      posts.forEach(post => {
        if(category === 'todos' || post.getAttribute('data-category') === category){
          post.style.display = 'flex';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });

  // Abrir modal com detalhes
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modalTitle.textContent = btn.getAttribute('data-title');
      modalContent.textContent = btn.getAttribute('data-content');
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
      closeModalBtn.focus();
    });
  });

  // Fechar modal
  closeModalBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
  });

  // Fechar modal com Escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false'){
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    }
  });

  // Newsletter
  const newsletterForm = document.getElementById('form-newsletter');
  const newsletterMsg = document.getElementById('newsletter-msg');

  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    newsletterMsg.textContent = `E-mail ${emailInput.value} cadastrado com sucesso! Obrigado!`;
    newsletterForm.reset();

    setTimeout(() => {
      newsletterMsg.textContent = '';
    }, 4000);
  });

  // Formulario contato
  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.reset();
    formResponse.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
    setTimeout(() => formResponse.textContent = '', 5000);
  });
});
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
            out.println("<html><body>");
            if (email != null && !email.isEmpty()) {
                out.println("<h2>Obrigado por se inscrever, " + email + "!</h2>");
            } else {
                out.println("<h2>Email inválido. Tente novamente.</h2>");
            }
            out.println("<a href=\"index.html\">Voltar ao blog</a>");
            out.println("</body></html>");
        }
    }
}
