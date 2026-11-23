
import java.util.Random;

public class Main {
    public static void main(String[] args) {

        String[] mensagens = {
            "Nunca desista dos seus sonhos! 🚀",
            "Hoje é um ótimo dia para aprender!",
            "Você é capaz de coisas incríveis!",
            "Continue programando! 💻",
            "O sucesso começa com pequenos passos!"
        };

        Random aleatorio = new Random();

        int numero = aleatorio.nextInt(mensagens.length);

        System.out.println(mensagens[numero]);
    }
}
