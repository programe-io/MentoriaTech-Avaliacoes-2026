import json
import os
from datetime import datetime

ARQUIVO = "projetos.json"


def carregar_projetos():
    if os.path.exists(ARQUIVO):
        with open(ARQUIVO, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


def salvar_projetos(projetos):
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump(projetos, f, ensure_ascii=False, indent=4)


def cadastrar_projeto(projetos):
    nome = input("Nome do projeto: ")
    responsavel = input("Responsável: ")
    prazo = input("Prazo (DD/MM/AAAA): ")

    try:
        datetime.strptime(prazo, "%d/%m/%Y")
    except ValueError:
        print("Data inválida!")
        return

    projeto = {
        "nome": nome,
        "responsavel": responsavel,
        "prazo": prazo,
        "tarefas": []
    }

    projetos.append(projeto)
    salvar_projetos(projetos)
    print("Projeto cadastrado com sucesso!")


def adicionar_tarefa(projetos):
    if not projetos:
        print("Nenhum projeto cadastrado.")
        return

    listar_projetos(projetos)

    try:
        indice = int(input("Número do projeto: ")) - 1
        projeto = projetos[indice]
    except (ValueError, IndexError):
        print("Projeto inválido.")
        return

    descricao = input("Descrição da tarefa: ")
    responsavel = input("Responsável pela tarefa: ")

    projeto["tarefas"].append({
        "descricao": descricao,
        "responsavel": responsavel,
        "status": "Pendente"
    })

    salvar_projetos(projetos)
    print("Tarefa adicionada!")


def listar_projetos(projetos):
    if not projetos:
        print("Nenhum projeto cadastrado.")
        return

    for i, projeto in enumerate(projetos, start=1):
        total = len(projeto["tarefas"])
        concluidas = sum(
            t["status"] == "Concluída"
            for t in projeto["tarefas"]
        )
        progresso = concluidas / total * 100 if total else 0

        print(f"\n{i}. {projeto['nome']}")
        print(f"   Responsável: {projeto['responsavel']}")
        print(f"   Prazo: {projeto['prazo']}")
        print(f"   Progresso: {progresso:.0f}%")

        for tarefa in projeto["tarefas"]:
            print(
                f"   - {tarefa['descricao']} | "
                f"{tarefa['responsavel']} | {tarefa['status']}"
            )


def concluir_tarefa(projetos):
    listar_projetos(projetos)

    try:
        indice = int(input("Número do projeto: ")) - 1
        projeto = projetos[indice]

        for i, tarefa in enumerate(projeto["tarefas"], start=1):
            print(f"{i}. {tarefa['descricao']} - {tarefa['status']}")

        numero = int(input("Número da tarefa: ")) - 1
        projeto["tarefas"][numero]["status"] = "Concluída"

        salvar_projetos(projetos)
        print("Tarefa concluída!")
    except (ValueError, IndexError):
        print("Projeto ou tarefa inválida.")


def menu():
    projetos = carregar_projetos()

    while True:
        print("\n=== GERENCIAMENTO DE PROJETOS ===")
        print("1. Cadastrar projeto")
        print("2. Adicionar tarefa")
        print("3. Listar projetos")
        print("4. Concluir tarefa")
        print("0. Sair")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_projeto(projetos)
        elif opcao == "2":
            adicionar_tarefa(projetos)
        elif opcao == "3":
            listar_projetos(projetos)
        elif opcao == "4":
            concluir_tarefa(projetos)
        elif opcao == "0":
            break
        else:
            print("Opção inválida.")


if __name__ == "__main__":
    menu()