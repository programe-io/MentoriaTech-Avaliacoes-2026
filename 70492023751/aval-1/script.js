package com.blogpiaui.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Define o modelo de dados para um Post do Blog
class Post {
    private String titulo;
    private String autor;
    private String data;
    private String conteudo;

    public Post(String titulo, String autor, String data, String conteudo) {
        this.titulo = titulo;
        this.autor = autor;
        this.data = data;
        this.conteudo = conteudo;
    }

    // Getters para o servidor conseguir ler as propriedades
    public String getTitulo() { return titulo; }
    public String getAutor() { return autor; }
    public String getData() { return data; }
    public String getConteudo() { return conteudo; }
}

@WebServlet("/home")
public class PostController extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 1. Criando dados dinâmicos sobre a sociedade do Piauí
        List<Post> listaPosts = new ArrayList<>();
        
        listaPosts.add(new Post(
            "O Reisado e as Tradições Vivas do Piauí",
            "Marta Cavalcante",
            "26/05/2026",
            "O Reisado permanece como uma das maiores expressões da cultura popular piauiense. Grupos de norte a sul do estado mantêm viva a dança, os trajes coloridos e as cantorias que movem comunidades inteiras."
        ));

        listaPosts.add(new Post(
            "Culinária Afetiva: O painço e a panelada na mesa piauiense",
            "Raimundo Neto",
            "25/05/2026",
            "Mais do que apenas sustento, a culinária do Piauí reflete a identidade do seu povo. Reunir a família em torno de uma panelada ou de um capote bem temperado é um ritual social sagrado em nosso estado."
        ));

        listaPosts.add(new Post(
            "Empreendedorismo e Transformação Social em Teresina",
            "Lucas Soares",
            "22/05/2026",
            "A capital piauiense vem se destacando no cenário de startups e tecnologia. Jovens da periferia estão transformando a realidade local através da inovação digital e de projetos sociais integradores."
        ));

        // 2. Guarda a lista na requisição para que o HTML/JSP possa acessar
        request.setAttribute("postsDoPiaui", listaPosts);

        // 3. Encaminha os dados para renderizar na página principal (index.jsp ou index.html)
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }
}