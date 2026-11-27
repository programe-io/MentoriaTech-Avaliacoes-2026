import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

// Classe que representa uma postagem no feed
class Postagem {
    private String autor;
    private String texto;
    private LocalDateTime dataHora;

    public Postagem(String autor, String texto) {
        this.autor = autor;
        this.texto = texto;
        this.dataHora = LocalDateTime.now();
    }

    public void exibirPostagem() {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        System.out.println("----------------------------------------");
        System.out.println("Autor: " + autor + " | Publicado em: " + dataHora.format(formato));
        System.out.println("Mensagem: " + texto);
        System.out.println("----------------------------------------");
    }
}

// Classe principal para executar o programa
public class MiniFeedApp {
    public static void main(String[] args) {
        List<Postagem> feed = new ArrayList<>();

        // Criando postagens de exemplo
        feed.add(new Postagem("Herói", "Belo dia para assistir a um filme do Homem-Aranha!"));
        feed.add(new Postagem("Utilizador", "A testar a aplicação em Java!"));

        // Exibindo todas as postagens do feed
        for (Postagem p : feed) {
            p.exibirPostagem();
        }
    }
}