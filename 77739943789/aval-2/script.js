package com.autofeed.model;

public class Post {
    private Long id;
    private String autor;
    private String tempo;
    private String texto;
    private String imagemUrl;
    private int curtidas;

    // Construtor completo
    public Post(Long id, String autor, String tempo, String texto, String imagemUrl, int curtidas) {
        this.id = id;
        this.autor = autor;
        this.tempo = tempo;
        this.texto = texto;
        this.imagemUrl = imagemUrl;
        this.curtidas = curtidas;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAutor() { return autor; }
    public void setAutor(String autor) { this.autor = autor; }

    public String getTempo() { return tempo; }
    public void setTempo(String tempo) { this.tempo = tempo; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }

    public int getCurtidas() { return curtidas; }
    public void setCurtidas(int curtidas) { this.curtidas = curtidas; }
}