package com.enzo.minifeed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class MiniFeedApplication {

    private static final List<Post> posts = new ArrayList<>();

    public static void main(String[] args) {
        // Post 1: Enzo (com foto do setup)
        posts.add(new Post(
            "Enzo",
            "15min atrás",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
            "Fala pessoal! Acabei de lançar a versão 1.1 do meu mini feed! Implementei o backend com Java Spring Boot, o frontend com HTML5 e CSS3 moderno. Tá fluindo bem! 💻🚀\n#JavaDev #WebDevelopment #CodingLife #FeedProject",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
        ));

        // Post 2: Julia
        posts.add(new Post(
            "Julia",
            "@dev_julia • 5min atrás",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
            "O feed tá muito massa, Enzo! Ótimo trampo! 👏",
            null
        ));

        SpringApplication.run(MiniFeedApplication.class, args);
    }

    @GetMapping
    public List<Post> getPosts() {
        return posts;
    }

    @PostMapping
    public Post criarPost(@RequestBody Post novoPost) {
        Post post = new Post(
            "Enzo",
            "Agora mesmo",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
            novoPost.getConteudo(),
            novoPost.getImagemUrl()
        );
        posts.add(0, post);
        return post;
    }

    public static class Post {
        private String autor;
        private String tempo;
        private String avatarUrl;
        private String conteudo;
        private String imagemUrl;

        public Post() {}

        public Post(String autor, String tempo, String avatarUrl, String conteudo, String imagemUrl) {
            this.autor = autor;
            this.tempo = tempo;
            this.avatarUrl = avatarUrl;
            this.conteudo = conteudo;
            this.imagemUrl = imagemUrl;
        }

        public String getAutor() { return autor; }
        public void setAutor(String autor) { this.autor = autor; }
        public String getTempo() { return tempo; }
        public void setTempo(String tempo) { this.tempo = tempo; }
        public String getAvatarUrl() { return avatarUrl; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
        public String getConteudo() { return conteudo; }
        public void setConteudo(String conteudo) { this.conteudo = conteudo; }
        public String getImagemUrl() { return imagemUrl; }
        public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
    }
}