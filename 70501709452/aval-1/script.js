python

import json
import os

ARQUIVO = "projetos.json"


def carregar_projetos():
    if os.path.exists(ARQUIVO):
        with open(ARQUIVO, "r", encoding="utf-8") as arquivo:
            return json.load(arquivo)
    return []


def salvar_projetos(projetos):
    with open(ARQUIVO, "w", encoding="utf-8") as arquivo:
        json.dump(projetos, arquivo, indent=4, ensure_ascii=False)


def cadastrar_projeto(projetos):
    nome = input("Nome do projeto: ")
    responsavel = input("Responsável: ")
    prazo = input("Prazo (DD/MM/AAAA): ")

    projeto = {
        "id": len(projetos) + 1,
        "nome": nome,
        "responsavel": responsavel,
        "prazo": prazo,
        "tarefas": []
    }

    projetos.append(projeto)
    salvar_projetos(projetos)
    print("Projeto cadastrado com sucesso!")


def listar_projetos(projetos):
    if not projetos:
        print("Nenhum projeto cadastrado.")
        return

    for projeto in projetos:
        tarefas = projeto["tarefas"]
        concluidas = sum(
            1 for tarefa in tarefas
            if tarefa["status"] == "Concluída"
        )
        progresso = (
            concluidas / len(tarefas) * 100 if tarefas else 0
        )

        print(f"\nID: {projeto['id']}")
        print(f"Projeto: {projeto['nome']}")
        print(f"Responsável: {projeto['responsavel']}")
        print(f"Prazo: {projeto['prazo']}")
        print(f"Progresso: {progresso:.1f}%")

        for tarefa in tarefas:
            print(
                f"  - {tarefa['nome']} | "
                f"{tarefa['status']}"
            )


def adicionar_tarefa(projetos):
    try:
        projeto_id = int(input("ID do projeto: "))
    except ValueError:
        print("Digite um ID numérico válido.")
        return

    projeto = next(
        (p for p in projetos if p["id"] == projeto_id),
        None
    )

    if projeto is None:
        print("Projeto não encontrado.")
        return

    nome = input("Nome da tarefa: ")

    projeto["tarefas"].append({
        "nome": nome,
        "status": "Pendente"
    })

    salvar_projetos(projetos)
    print("Tarefa adicionada com sucesso!")


def atualizar_tarefa(projetos):
    try:
        projeto_id = int(input("ID do projeto: "))
    except ValueError:
        print("Digite um ID numérico válido.")
        return

    projeto = next(
        (p for p in projetos if p["id"] == projeto_id),
        None
    )

    if projeto is None or not projeto["tarefas"]:
        print("Projeto não encontrado ou sem tarefas.")
        return

    for i, tarefa in enumerate(projeto["tarefas"], start=1):
        print(f"{i}. {tarefa['nome']} - {tarefa['status']}")

    try:
        numero = int(input("Número da tarefa: "))
        tarefa = projeto["tarefas"][numero - 1]
    except (ValueError, IndexError):
        print("Número de tarefa inválido.")
        return

    print("1 - Pendente")
    print("2 - Em andamento")
    print("3 - Concluída")

    status = input("Novo status: ")

    opcoes = {
        "1": "Pendente",
        "2": "Em andamento",
        "3": "Concluída"
    }

    if status not in opcoes:
        print("Status inválido.")
        return

    tarefa["status"] = opcoes[status]
    salvar_projetos(projetos)
    print("Tarefa atualizada com sucesso!")


def menu():
    projetos = carregar_projetos()

    while True:
        print("\n=== GERENCIAMENTO DE PROJETOS ===")
        print("1 - Cadastrar projeto")
        print("2 - Listar projetos")
        print("3 - Adicionar tarefa")
        print("4 - Atualizar tarefa")
        print("0 - Sair")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_projeto(projetos)
        elif opcao == "2":
            listar_projetos(projetos)
        elif opcao == "3":
            adicionar_tarefa(projetos)
        elif opcao == "4":
            atualizar_tarefa(projetos)
        elif opcao == "0":
            print("Sistema encerrado.")
            break
        else:
            print("Opção inválida.")


if __name__ == "__main__":
    menu()