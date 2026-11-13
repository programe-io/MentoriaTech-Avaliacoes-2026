import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InstagramServer {

    static class Post {
        int id;
        String usuario;
        String avatar;
        String local;
        String imagemUrl;
        String legenda;
        int curtidas;
        boolean curtido;
        List<String> comentarios = new ArrayList<>();

        Post(int id, String usuario, String avatar, String local, String imagemUrl, String legenda, int curtidas) {
            this.id = id;
            this.usuario = usuario;
            this.avatar = avatar;
            this.local = local;
            this.imagemUrl = imagemUrl;
            this.legenda = legenda;
            this.curtidas = curtidas;
        }
    }

    private static final List<Post> feed = new ArrayList<>();
    private static int proximoId = 1;

    public static void main(String[] args) throws IOException {
        // Posts iniciais
        Post p1 = new Post(
                proximoId++,
                "dev.brasil",
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
                "São Paulo, Brasil",
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
                "Arquitetura limpa: Java no back-end, HTML e CSS separados! ☕💻 #java #webdev",
                142
        );
        p1.comentarios.add("ana.tech: Ficou muito organizado!");
        feed.add(p1);

        Post p2 = new Post(
                proximoId++,
                "viagens.mundo",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                "Rio de Janeiro, RJ",
                "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
                "Fim de tarde inesquecível 🌅✨",
                318
        );
        feed.add(p2);

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Servir HTML e CSS da pasta public/
        server.createContext("/", exchange -> {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/")) {
                servirArquivo(exchange, Path.of("public/index.html"), "text/html; charset=UTF-8");
            } else if (path.equals("/style.css")) {
                servirArquivo(exchange, Path.of("public/style.css"), "text/css; charset=UTF-8");
            } else {
                exchange.sendResponseHeaders(404, -1);
            }
        });

        // API: Listar ou Criar Posts
        server.createContext("/api/posts", exchange -> {
            if ("GET".equals(exchange.getRequestMethod())) {
                enviarJson(exchange, converterFeedParaJson());
            } else if ("POST".equals(exchange.getRequestMethod())) {
                Map<String, String> dados = lerFormulario(exchange);
                String usuario = dados.getOrDefault("usuario", "usuario_java").trim();
                String local = dados.getOrDefault("local", "Brasil").trim();
                String imagemUrl = dados.getOrDefault("imagemUrl", "").trim();
                String legenda = dados.getOrDefault("legenda", "").trim();

                if (usuario.isEmpty()) usuario = "usuario_java";
                if (imagemUrl.isEmpty()) {
                    imagemUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800";
                }

                Post novo = new Post(
                        proximoId++,
                        usuario,
                        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
                        local,
                        imagemUrl,
                        legenda,
                        0
                );
                feed.add(0, novo);
                enviarJson(exchange, converterFeedParaJson());
            }
        });

        // API: Curtir / Descurtir
        server.createContext("/api/curtir", exchange -> {
            if ("POST".equals(exchange.getRequestMethod())) {
                Map<String, String> dados = lerFormulario(exchange);
                int id = Integer.parseInt(dados.getOrDefault("id", "0"));
                for (Post p : feed) {
                    if (p.id == id) {
                        p.curtido = !p.curtido;
                        p.curtidas += p.curtido ? 1 : -1;
                        break;
                    }
                }
                enviarJson(exchange, converterFeedParaJson());
            }
        });

        // API: Comentar
        server.createContext("/api/comentar", exchange -> {
            if ("POST".equals(exchange.getRequestMethod())) {
                Map<String, String> dados = lerFormulario(exchange);
                int id = Integer.parseInt(dados.getOrDefault("id", "0"));
                String texto = dados.getOrDefault("comentario", "").trim();
                if (!texto.isEmpty()) {
                    for (Post p : feed) {
                        if (p.id == id) {
                            p.comentarios.add("voce: " + texto);
                            break;
                        }
                    }
                }
                enviarJson(exchange, converterFeedParaJson());
            }
        });

        server.setExecutor(null);
        server.start();
        System.out.println("Servidor iniciado em http://localhost:8080");
    }

    private static void servirArquivo(HttpExchange exchange, Path caminho, String contentType) throws IOException {
        if (!Files.exists(caminho)) {
            exchange.sendResponseHeaders(404, -1);
            return;
        }
        byte[] bytes = Files.readAllBytes(caminho);
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(200, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static void enviarJson(HttpExchange exchange, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(200, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static Map<String, String> lerFormulario(HttpExchange exchange) throws IOException {
        String corpo = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, String> mapa = new HashMap<>();
        for (String par : corpo.split("&")) {
            String[] kv = par.split("=", 2);
            if (kv.length == 2) {
                mapa.put(
                    URLDecoder.decode(kv[0], StandardCharsets.UTF_8),
                    URLDecoder.decode(kv[1], StandardCharsets.UTF_8)
                );
            }
        }
        return mapa;
    }

    private static String converterFeedParaJson() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < feed.size(); i++) {
            Post p = feed.get(i);
            sb.append("{")
              .append("\"id\":").append(p.id).append(",")
              .append("\"usuario\":\"").append(escaparJson(p.usuario)).append("\",")
              .append("\"avatar\":\"").append(escaparJson(p.avatar)).append("\",")
              .append("\"local\":\"").append(escaparJson(p.local)).append("\",")
              .append("\"imagemUrl\":\"").append(escaparJson(p.imagemUrl)).append("\",")
              .append("\"legenda\":\"").append(escaparJson(p.legenda)).append("\",")
              .append("\"curtidas\":").append(p.curtidas).append(",")
              .append("\"curtido\":").append(p.curtido).append(",")
              .append("\"comentarios\":[");
            for (int j = 0; j < p.comentarios.size(); j++) {
                sb.append("\"").append(escaparJson(p.comentarios.get(j))).append("\"");
                if (j < p.comentarios.size() - 1) sb.append(",");
            }
            sb.append("]}");
            if (i < feed.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    private static String escaparJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "");
    }
}