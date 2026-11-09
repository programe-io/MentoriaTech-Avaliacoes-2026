import json
import os
from datetime import datetime

ARQUIVO_DADOS = "tarefas.json"


def carregar_tarefas():
    """Carrega as tarefas do arquivo JSON, se existir."""
    if not os.path.exists(ARQUIVO_DADOS):
        return []
    try:
        with open(ARQUIVO_DADOS, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        print("Aviso: Não foi possível ler o arquivo de dados. Iniciando lista vazia.")
        return []


def salvar_tarefas(tarefas):
    """Salva a lista de tarefas no arquivo JSON."""
    try:
        with open(ARQUIVO_DADOS, "w", encoding="utf-8") as f:
            json.dump(tarefas, f, indent=4, ensure_ascii=False)
    except IOError:
        print("Erro ao salvar as tarefas no arquivo.")


def adicionar_tarefa(tarefas):
    """Adiciona uma nova tarefa à lista."""
    descricao = input("Descrição da tarefa: ").strip()
    if not descricao:
        print("A descrição não pode ser vazia!")
        return

    tarefa = {
        "id": len(tarefas) + 1,
        "descricao": descricao,
        "concluida": False,
        "data_criacao": datetime.now().strftime("%d/%m/%Y %H:%M"),
    \}
    tarefas.append(tarefa)
    salvar_tarefas(tarefas)
    print(f"✓ Tarefa '{descricao\}' adicionada com sucesso!")


def listar_tarefas(tarefas):
    """Exibe todas as tarefas cadastradas."""
    if not tarefas:
        print("\\nNenhuma tarefa cadastrada.")
        return

    print("\\n--- LISTA DE TAREFAS ---")
    for t in tarefas:
        status = "[X]" if t["concluida"] else "[ ]"
        print(f"{t['id']\}. {status\} {t['descricao']\} (Criada em: {t['data_criacao']\})")
    print("------------------------")


def concluir_tarefa(tarefas):
    """Marca uma tarefa existente como concluída."""
    listar_tarefas(tarefas)
    if not tarefas:
        return

    try:
        id_tarefa = int(input("\\nDigite o ID da tarefa a ser concluída: "))
        for t in tarefas:
            if t["id"] == id_tarefa:
                if t["concluida"]:
                    print("Esta tarefa já está concluída!")
                else:
                    t["concluida"] = True
                    salvar_tarefas(tarefas)
                    print(f"✓ Tarefa {id_tarefa\} marcada como concluída!")
                return
        print("ID não encontrado.")
    except ValueError:
        print("Por favor, digite um número válido.")


def remover_tarefa(tarefas):
    """Remove uma tarefa da lista."""
    listar_tarefas(tarefas)
    if not tarefas:
        return

    try:
        id_tarefa = int(input("\\nDigite o ID da tarefa a ser removida: "))
        for idx, t in enumerate(tarefas):
            if t["id"] == id_tarefa:
                removida = tarefas.pop(idx)
                # Reorganiza os IDs
                for i, item in enumerate(tarefas):
                    item["id"] = i + 1
                salvar_tarefas(tarefas)
                print(f"✓ Tarefa '{removida['descricao']\}' removida!")
                return
        print("ID não encontrado.")
    except ValueError:
        print("Por favor, digite um número válido.")


def menu_principal():
    """Exibe o menu interativo do sistema."""
    tarefas = carregar_tarefas()

    while True:
        print("\\n=== GERENCIADOR DE TAREFAS ===")
        print("1. Listar Tarefas")
        print("2. Adicionar Tarefa")
        print("3. Concluir Tarefa")
        print("4. Remover Tarefa")
        print("5. Sair")

        opcao = input("\\nEscolha uma opção (1-5): ").strip()

        if opcao == "1":
            listar_tarefas(tarefas)
        elif opcao == "2":
            adicionar_tarefa(tarefas)
        elif opcao == "3":
            concluir_tarefa(tarefas)
        elif opcao == "4":
            remover_tarefa(tarefas)
        elif opcao == "5":
            print("Saindo... Até logo!")
            break
        else:
            print("Opção inválida! Tente novamente.")


if __name__ == "__main__":
    menu_principal()$0