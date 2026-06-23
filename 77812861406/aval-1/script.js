package historia;

import java.util.ArrayList;
import java.util.List;

// A classe principal que roda o país
public class Brasil {
    private String formaDeGoverno;
    private boolean statusDemocrático;
    private double insatisfacaoPopular;

    public Brasil() {
        // Inicialização do sistema em 1500
        this.formaDeGoverno = "Colônia de Exploração";
        this.statusDemocrático = false;
        this.insatisfacaoPopular = 0.1;
    }

    // Método que processa a evolução do tempo e as mudanças de estado
    public void processarLinhaDoTempo(int ano) {
        if (ano >= 1500 && ano < 1822) {
            this.formaDeGoverno = "Colônia Portuguesa";
            this.insatisfacaoPopular += 0.05; // Impostos como o Quinto geram revolta
        } 
        else if (ano == 1822) {
            System.out.println("Grito do Ipiranga! Executando Independencia.exe");
            this.formaDeGoverno = "Império (Monarquia Constitucional)";
        } 
        else if (ano == 1889) {
            System.out.println("Alerta de Sistema: Golpe Militar. Proclamação da República.");
            this.formaDeGoverno = "República Oligárquica";
        } 
        else if (ano == 1930) {
            this.formaDeGoverno = "Era Vargas (Governo Provisório/Ditadura)";
            this.statusDemocrático = false;
        } 
        else if (ano == 1964) {
            // Trigger de exceção no sistema democrático
            this.formaDeGoverno = "Ditadura Militar";
            this.statusDemocrático = false;
            throw new RegimeExcecaoException("Direitos Políticos revogados. AI-5 ativado.");
        } 
        else if (ano == 1985) {
            System.out.println("Reiniciando o sistema: Diretas Já.");
            this.formaDeGoverno = "República Presidencialista";
            this.statusDemocrático = true;
            this.insatisfacaoPopular = 0.3; // Reseta, mas o desafio continua
        }
    }

    // Getter para o mundo ver o status atual do país
    public void exibirStatusAtual() {
        System.out.println("Governo atual: " + this.formaDeGoverno);
        System.out.println("Democracia ativa? " + (this.statusDemocrático ? "Sim" : "Não"));
    }
}

// Classe customizada para tratar os momentos de ruptura da história
class RegimeExcecaoException extends RuntimeException {
    public RegimeExcecaoException(String mensagem) {
        super(mensagem);
    }
}