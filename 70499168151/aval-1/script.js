
from datetime import datetime

projetos = []


def cadastrar_projeto():
    print("\n--- CADASTRAR PROJETO ---")

    nome = input("Nome do projeto: ")
    gerente = input("Gerente responsável: ")
    descricao = input("Descrição: ")
    inicio = input("Data de início (DD/MM/AAAA): ")
    prazo = input("Prazo final (DD/MM/AAAA): ")

    try:
        datetime.strptime(inicio, "%d/%m/%Y")
        datetime.strptime(prazo, "%d/%m/%Y")
    except ValueError:
        print("Erro: informe datas válidas.")
        return

    if datetime.strptime(prazo, "%d/%m/%Y") < datetime.strptime(
        inicio, "%d/%m/%Y"
    ):
        print("Erro: o prazo final não pode ser anterior ao início.")
        return

    try:
        orcamento = float(input("Orçamento previsto (R$): "))
    except ValueError:
        print("Erro: informe um orçamento válido.")
        return

    projeto = {
        "nome": nome,
        "gerente": gerente,
        "descricao": descricao,
        "inicio": inicio,
        "prazo": prazo,
        "orcamento": orcamento,
        "gasto": 0.0,
        "progresso": 0,
        "status": "Não iniciado",
        "tarefas": []
    }

    projetos.append(projeto)
    print("Projeto cadastrado com sucesso!")


def listar_projetos():
    print("\n--- LISTA DE PROJETOS ---")

    if not projetos:
        print("Nenhum projeto cadastrado.")
        return

    for i, p in enumerate(projetos, start=1):
        print(f"\nProjeto {i}: {p['nome']}")
        print(f"Gerente: {p['gerente']}")
        print(f"Prazo: {p['prazo']}")
        print(f"Orçamento: R$ {p['orcamento']:.2f}")
        print(f"Gasto: R$ {p['gasto']:.2f}")
        print(f"Progresso: {p['progresso']}%")
        print(f"Status: {p['status']}")
        print(f"Tarefas: {len(p['tarefas'])}")


def selecionar_projeto():
    listar_projetos()

    if not projetos:
        return None

    try:
        numero = int(input("\nNúmero do projeto: "))
        if 1 <= numero <= len(projetos):
            return projetos[numero - 1]
    except ValueError:
        pass

    print("Projeto inválido.")
    return None


def adicionar_tarefa():
    projeto = selecionar_projeto()
    if projeto is None:
        return

    nome = input("Nome da tarefa: ")
    responsavel = input("Responsável pela tarefa: ")

    tarefa = {
        "nome": nome,
        "responsavel": responsavel,
        "concluida": False
    }

    projeto["tarefas"].append(tarefa)
    print("Tarefa adicionada com sucesso!")


def atualizar_projeto():
    projeto = selecionar_projeto()
    if projeto is None:
        return

    try:
        progresso = int(input("Progresso do projeto (0 a 100): "))
        if not 0 <= progresso <= 100:
            print("O progresso deve estar entre 0 e 100.")
            return

        gasto = float(input("Gasto acumulado (R$): "))
        if gasto < 0:
            print("O gasto não pode ser negativo.")
            return

    except ValueError:
        print("Informe valores numéricos válidos.")
        return

    projeto["progresso"] = progresso
    projeto["gasto"] = gasto

    if progresso == 100:
        projeto["status"] = "Concluído"
    elif progresso == 0:
        projeto["status"] = "Não iniciado"
    else:
        projeto["status"] = "Em andamento"

    print("Projeto atualizado com sucesso!")


def listar_tarefas():
    projeto = selecionar_projeto()
    if projeto is None:
        return

    print(f"\n--- TAREFAS: {projeto['nome']} ---")

    if not projeto["tarefas"]:
        print("Nenhuma tarefa cadastrada.")
        return

    for i, tarefa in enumerate(projeto["tarefas"], start=1):
        status = "Concluída" if tarefa["concluida"] else "Pendente"
        print(
            f"{i}. {tarefa['nome']} | "
            f"Responsável: {tarefa['responsavel']} | "
            f"Status: {status}"
        )


def concluir_tarefa():
    projeto = selecionar_projeto()
    if projeto is None:
        return

    if not projeto["tarefas"]:
        print("Este projeto não possui tarefas.")
        return

    for i, tarefa in enumerate(projeto["tarefas"], start=1):
        status = "Concluída" if tarefa["concluida"] else "Pendente"
        print(f"{i}. {tarefa['nome']} - {status}")

    try:
        numero = int(input("Número da tarefa concluída: "))
        if not 1 <= numero <= len(projeto["tarefas"]):
            print("Tarefa inválida.")
            return
    except ValueError:
        print("Informe um número válido.")
        return

    projeto["tarefas"][numero - 1]["concluida"] = True
    print("Tarefa marcada como concluída!")


def relatorio():
    print("\n--- RELATÓRIO GERAL ---")

    if not projetos:
        print("Nenhum projeto cadastrado.")
        return

    total_orcamento = sum(p["orcamento"] for p in projetos)
    total_gasto = sum(p["gasto"] for p in projetos)
    media_progresso = sum(p["progresso"] for p in projetos) / len(projetos)

    print(f"Total de projetos: {len(projetos)}")
    print(f"Orçamento total: R$ {total_orcamento:.2f}")
    print(f"Gasto acumulado: R$ {total_gasto:.2f}")
    print(f"Saldo orçamentário: R$ {total_orcamento - total_gasto:.2f}")
    print(f"Progresso médio: {media_progresso:.1f}%")

    concluidos = sum(p["status"] == "Concluído" for p in projetos)
    andamento = sum(p["status"] == "Em andamento" for p in projetos)

    print(f"Projetos concluídos: {concluidos}")
    print(f"Projetos em andamento: {andamento}")


def menu():
    while True:
        print("\n===== GERENCIAMENTO DE PROJETOS =====")
        print("1 - Cadastrar projeto")
        print("2 - Listar projetos")
        print("3 - Adicionar tarefa")
        print("4 - Atualizar progresso e gastos")
        print("5 - Listar tarefas")
        print("6 - Concluir tarefa")
        print("7 - Gerar relatório")
        print("0 - Sair")

        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_projeto()
        elif opcao == "2":
            listar_projetos()
        elif opcao == "3":
            adicionar_tarefa()
        elif opcao == "4":
            atualizar_projeto()
        elif opcao == "5":
            listar_tarefas()
        elif opcao == "6":
            concluir_tarefa()
        elif opcao == "7":
            relatorio()
        elif opcao == "0":
            print("Sistema encerrado.")
            break
        else:
            print("Opção inválida. Tente novamente.")


if __name__ == "__main__":
    menu()