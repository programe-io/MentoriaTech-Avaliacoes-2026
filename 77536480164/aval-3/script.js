import java.awt.Desktop;
import java.net.URI;

public class Main {
    public static void main(String[] args) {
        try {
            Desktop.getDesktop().browse(
                new URI("https://www.google.com")
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}