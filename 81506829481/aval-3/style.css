import json
import os
import random
import time

ARQUIVO_RANKING = "ranking.json"


def carregar_ranking():
    """Carrega o histórico de pontuações do arquivo JSON."""
    if not os.path.exists(ARQUIVO_RANKING):
        return []
    try:
        with open(ARQUIVO_RANKING, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        return []


def salvar_pontuacao(nome, tentativas, tempo_segundos, dificuldade):
    """Salva uma nova pontuação no ranking."""
    ranking = carregar_ranking()
    novo_registro = {
        "nome": nome,
        "tentativas": tentativas,
        "tempo_segundos": round(tempo_segundos, 1),
        "dificuldade": dificuldade,
    \}
    ranking.append(novo_registro)

    # Ordena pelo menor número de tentativas e menor tempo
    ranking.sort(key=lambda x: (x["tentativas"], x["tempo_segundos"]))

    try:
        with open(ARQUIVO_RANKING, "w", encoding="utf-8") as f:
            json.dump(ranking[:10], f, indent=4, ensure_ascii=False)
    except IOError:
        print("Erro ao salvar o ranking.")


def exibir_ranking():
    """Exibe o top 10 melhores pontuações."""
    ranking = carregar_ranking()
    if not ranking:
        print("\\nNenhuma pontuação registrada ainda!")
        return

    print("\\n================ TOP 10 RANKING ================")
    print(f"{'Pos.':<5\} {'Nome':<15\} {'Tentativas':<12\} {'Tempo (s)':<10\} {'Dificuldade'\}")
    print("-" * 55)
    for i, p in enumerate(ranking, 1):
        print(
            f"{i:<5\} {p['nome']:<15\} {p['tentativas']:<12\} {p['tempo_segundos']:<10\} {p['dificuldade']\}"
        )
    print("=================================================")


def escolher_dificuldade():
    """Retorna o número máximo e o total de tentativas de acordo com o nível."""
    print("\\nEscolha a dificuldade:")
    print("1. Fácil    (1 a 50  | 10 tentativas)")
    print("2. Média    (1 a 100 | 7 tentativas)")
    print("3. Difícil  (1 a 200 | 5 tentativas)")

    while True:
        opcao = input("Opção (1-3): ").strip()
        if opcao == "1":
            return 50, 10, "Fácil"
        elif opcao == "2":
            return 100, 7, "Média"
        elif opcao == "3":
            return 200, 5, "Difícil"
        print("Opção inválida! Escolha entre 1, 2 ou 3.")


def jogar():
    """Executa a lógica principal da partida."""
    limite_max, max_tentativas, nome_dificuldade = escolher_dificuldade()
    numero_secreto = random.randint(1, limite_max)
    tentativas = 0
    inicio_tempo = time.time()

    print(f"\\n🎮 Jogo iniciado! Adivinhe o número entre 1 e {limite_max\}.")
    print(f"Você tem {max_tentativas\} tentativas.")

    while tentativas < max_tentativas:
        tentativas_restantes = max_tentativas - tentativas
        print(f"\\nTentativa {tentativas + 1\}/{max_tentativas\}:")

        try:
            chute = int(input("Qual é o seu palpite? "))
        except ValueError:
            print("Por favor, insira apenas números inteiros!")
            continue

        if chute < 1 or chute > limite_max:
            print(f"Número fora do intervalo! Digite um valor entre 1 e {limite_max\}.")
            continue

        tentativas += 1

        if chute == numero_secreto:
            tempo_total = time.time() - inicio_tempo
            print(
                f"\\n🎉 PARABÉNS! Você acertou o número {numero_secreto\} em {tentativas\} tentativa(s)!"
            )
            print(f"⏱️ Tempo: {tempo_total:.1f\} segundos.")

            nome = input("Digite seu nome para o ranking: ").strip()
            if nome:
                salvar_pontuacao(nome, tentativas, tempo_total, nome_dificuldade)
            return

        elif chute < numero_secreto:
            print("💡 DICA: O número secreto é MAIOR.")
        else:
            print("💡 DICA: O número secreto é MENOR.")

        # Dica extra na metade das tentativas
        if tentativas == max_tentativas // 2:
            paridade = "PAR" if numero_secreto % 2 == 0 else "ÍMPAR"
            print(f"🔔 DICA EXTRA: O número secreto é {paridade\}!")

    print(f"\\n❌ Fim de jogo! Você esgotou suas tentativas. O número era {numero_secreto\}.")


def menu():
    """Exibe o menu principal."""
    while True:
        print("\\n=== JOGO DA ADIVINHAÇÃO ===")
        print("1. Jogar")
        print("2. Ver Ranking")
        print("3. Sair")

        opcao = input("\\nEscolha uma opção (1-3): ").strip()

        if opcao == "1":
            jogar()
        elif opcao == "2":
            exibir_ranking()
        elif opcao == "3":
            print("Obrigado por jogar! Até a próxima.")
            break
        else:
            print("Opção inválida!")


if __name__ == "__main__":
    menu()$0