import java.util.ArrayList;
import java.util.List;

// Classe que representa a Postagem
class Postagem {
    String usuario;
    String legenda;
    String imagemUrl;

    public Postagem(String usuario, String legenda, String imagemUrl) {
        this.usuario = usuario;
        this.legenda = legenda;
        this.imagemUrl = imagemUrl;
    }

    public void exibirPost() {
        System.out.println("-----------------------------------------");
        System.out.println("👤 Usuário: @" + usuario);
        System.out.println("🖼️ Imagem: " + imagemUrl);
        System.out.println("💬 Legenda: " + legenda);
        System.out.println("-----------------------------------------");
    }
}

// Classe Principal do Aplicativo
public class InstagramApp {
    public static void main(String[] args) {
        // Criando a lista de posts do Luan
        List<Postagem> feed = new ArrayList<>();

        // Adicionando a postagem
        feed.add(new Postagem(
            "luan", 
            "Meu novo feed roxo! 💜", 
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"
        ));

        // Exibindo o Feed no console
        System.out.println("=== INSTAGRAM DO LUAN (MODO ROXO) ===");
        for (Postagem p : feed) {
            p.exibirPost();
        }
    }
}