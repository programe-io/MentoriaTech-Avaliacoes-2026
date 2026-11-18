
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

public class CalculadoraIMC {

    public static void main(String[] args) throws IOException {

        HttpServer servidor = HttpServer.create(
            new InetSocketAddress(8080), 0
        );

        // Página principal
        servidor.createContext("/", exchange -> {
            String caminho = exchange.getRequestURI().getPath();

            if (caminho.equals("/")) {
                enviarArquivo(exchange, "web/index.html",
                    "text/html; charset=UTF-8");
            } else if (caminho.equals("/style.css")) {
                enviarArquivo(exchange, "web/style.css",
                    "text/css; charset=UTF-8");
            } else {
                enviarJSON(exchange, 404,
                    "{\"erro\":\"Página não encontrada.\"}");
            }
        });

        // Rota de cálculo
        servidor.createContext("/calcular", exchange -> {

            if (!exchange.getRequestMethod().equals("POST")) {
                enviarJSON(exchange, 405,
                    "{\"erro\":\"Método não permitido.\"}");
                return;
            }

            try {
                String corpo = new String(
                    exchange.getRequestBody().readAllBytes(),
                    StandardCharsets.UTF_8
                );

                Map<String, String> dados = new HashMap<>();

                for (String item : corpo.split("&")) {
                    String[] partes = item.split("=", 2);

                    if (partes.length == 2) {
                        String chave = URLDecoder.decode(
                            partes[0], StandardCharsets.UTF_8
                        );

                        String valor = URLDecoder.decode(
                            partes[1], StandardCharsets.UTF_8
                        );

                        dados.put(chave, valor);
                    }
                }

                String nome = dados.getOrDefault("nome", "").trim();
                String sexo = dados.getOrDefault("sexo", "").trim();

                if (nome.isEmpty()) {
                    nome = "Usuário";
                }

                if (nome.length() > 60) {
                    throw new IllegalArgumentException(
                        "Nome muito grande."
                    );
                }

                double peso = Double.parseDouble(
                    dados.get("peso").replace(",", ".")
                );

                double altura = Double.parseDouble(
                    dados.get("altura").replace(",", ".")
                );

                int idade = Integer.parseInt(dados.get("idade"));

                if (!Double.isFinite(peso) ||
                    !Double.isFinite(altura) ||
                    peso < 1 || peso > 500 ||
                    altura < 0.5 || altura > 2.8 ||
                    idade < 1 || idade > 120) {

                    throw new IllegalArgumentException(
                        "Confira os valores informados."
                    );
                }

                if (!sexo.equals("Masculino") &&
                    !sexo.equals("Feminino") &&
                    !sexo.equals("Outro")) {

                    throw new IllegalArgumentException(
                        "Selecione uma opção de sexo."
                    );
                }

                // Cálculo do IMC
                double imc = peso / (altura * altura);

                String classificacao;

                if (imc < 18.5) {
                    classificacao = "Abaixo do peso";
                } else if (imc < 25) {
                    classificacao = "Peso normal";
                } else if (imc < 30) {
                    classificacao = "Sobrepeso";
                } else {
                    classificacao = "Obesidade";
                }

                // As faixas apresentadas são para adultos.
                String aviso = idade < 20
                    ? "As faixas de IMC para adultos não se aplicam " +
                      "a menores de 20 anos. É necessária uma " +
                      "avaliação específica para idade e sexo."
                    : "";

                String resposta = String.format(
                    java.util.Locale.US,
                    "{\"nome\":\"%s\",\"peso\":%.2f," +
                    "\"altura\":%.2f,\"imc\":%.2f," +
                    "\"classificacao\":\"%s\",\"aviso\":\"%s\"}",
                    escaparJSON(nome),
                    peso,
                    altura,
                    imc,
                    classificacao,
                    escaparJSON(aviso)
                );

                enviarJSON(exchange, 200, resposta);

            } catch (IllegalArgumentException e) {
                enviarJSON(exchange, 400,
                    "{\"erro\":\"" + escaparJSON(
                        e.getMessage() == null
                            ? "Dados inválidos." : e.getMessage()
                    ) + "\"}");

            } catch (Exception e) {
                enviarJSON(exchange, 400,
                    "{\"erro\":\"Preencha todos os campos corretamente.\"}");
            }
        });

        servidor.setExecutor(null);
        servidor.start();

        System.out.println("--------------------------------");
        System.out.println("       IMC PRO INICIADO");
        System.out.println("--------------------------------");
        System.out.println("Acesse: http://localhost:8080");
        System.out.println("Para encerrar: CTRL + C");
    }

    // Enviar arquivos do site
    private static void enviarArquivo(
        HttpExchange exchange,
        String caminho,
        String tipo
    ) throws IOException {

        Path arquivo = Path.of(caminho);

        if (!Files.isRegularFile(arquivo)) {
            enviarJSON(exchange, 404,
                "{\"erro\":\"Arquivo não encontrado.\"}");
            return;
        }

        byte[] conteudo = Files.readAllBytes(arquivo);

        exchange.getResponseHeaders().set(
            "Content-Type", tipo
        );

        exchange.getResponseHeaders().set(
            "X-Content-Type-Options", "nosniff"
        );

        exchange.sendResponseHeaders(200, conteudo.length);

        try (OutputStream saida = exchange.getResponseBody()) {
            saida.write(conteudo);
        }
    }

    // Enviar respostas JSON
    private static void enviarJSON(
        HttpExchange exchange,
        int status,
        String resposta
    ) throws IOException {

        byte[] conteudo = resposta.getBytes(StandardCharsets.UTF_8);

        exchange.getResponseHeaders().set(
            "Content-Type", "application/json; charset=UTF-8"
        );

        exchange.getResponseHeaders().set(
            "Cache-Control", "no-store"
        );

        exchange.sendResponseHeaders(status, conteudo.length);

        try (OutputStream saida = exchange.getResponseBody()) {
            saida.write(conteudo);
        }
    }

    // Evitar problemas com aspas e caracteres no JSON
    private static String escaparJSON(String texto) {
        return texto
            .replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t");
    }
}
