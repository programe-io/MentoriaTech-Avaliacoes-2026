"""
SISTEMA DE GERENCIAMENTO DE TAREFAS (Python)

Cada tarefa possui: codigo, titulo, prioridade e concluida (status).

Regras de validacao:
  - titulo: no minimo 5 caracteres
  - prioridade: valor entre 1 (alta) e 3 (baixa)
"""

# ===================== CONFIGURACOES =====================
TITULO_MINIMO = 5
PRIORIDADE_ALTA = 1
PRIORIDADE_BAIXA = 3

NOMES_PRIORIDADE = {1: "Alta", 2: "Media", 3: "Baixa"}

# ===================== DADOS =====================
tarefas = []
proximo_codigo = 1


# ===================== VALIDACOES =====================
def titulo_valido(titulo):
    return isinstance(titulo, str) and len(titulo.strip()) >= TITULO_MINIMO


def prioridade_valida(prioridade):
    return (
        isinstance(prioridade, int)
        and not isinstance(prioridade, bool)
        and PRIORIDADE_ALTA <= prioridade <= PRIORIDADE_BAIXA
    )


def buscar_tarefa(codigo):
    for tarefa in tarefas:
        if tarefa["codigo"] == codigo:
            return tarefa
    return None


# ===================== FUNCIONALIDADES =====================

# 1. Cadastrar uma nova tarefa
def cadastrar_tarefa(titulo, prioridade):
    global proximo_codigo

    if not titulo_valido(titulo):
        print(f"[ERRO] O titulo deve ter no minimo {TITULO_MINIMO} caracteres.")
        return None
    if not prioridade_valida(prioridade):
        print("[ERRO] A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).")
        return None

    tarefa = {
        "codigo": proximo_codigo,
        "titulo": titulo.strip(),
        "prioridade": prioridade,
        "concluida": False,
    }
    proximo_codigo += 1
    tarefas.append(tarefa)
    print(f'[OK] Tarefa "{tarefa["titulo"]}" cadastrada com o codigo {tarefa["codigo"]}.')
    return tarefa


# 2. Listar as tarefas cadastradas
def listar_tarefas():
    print("\n================ TAREFAS CADASTRADAS ================")
    if not tarefas:
        print("Nenhuma tarefa cadastrada.")
    else:
        for t in tarefas:
            status = "Concluida" if t["concluida"] else "Pendente"
            print(
                f'Codigo: {t["codigo"]} | '
                f'Titulo: {t["titulo"]} | '
                f'Prioridade: {t["prioridade"]} ({NOMES_PRIORIDADE[t["prioridade"]]}) | '
                f"Status: {status}"
            )
    print("=====================================================\n")


# 3. Marcar uma tarefa como concluida
def concluir_tarefa(codigo):
    tarefa = buscar_tarefa(codigo)

    if tarefa is None:
        print(f"[ERRO] Tarefa de codigo {codigo} nao encontrada.")
        return False
    if tarefa["concluida"]:
        print(f"[AVISO] A tarefa {codigo} ja estava concluida.")
        return False

    tarefa["concluida"] = True
    print(f"[OK] Tarefa {codigo} marcada como concluida.")
    return True


# 4. Alterar a prioridade de uma tarefa
def alterar_prioridade(codigo, nova_prioridade):
    tarefa = buscar_tarefa(codigo)

    if tarefa is None:
        print(f"[ERRO] Tarefa de codigo {codigo} nao encontrada.")
        return False
    if not prioridade_valida(nova_prioridade):
        print("[ERRO] A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).")
        return False

    tarefa["prioridade"] = nova_prioridade
    print(
        f"[OK] Prioridade da tarefa {codigo} alterada para "
        f"{nova_prioridade} ({NOMES_PRIORIDADE[nova_prioridade]})."
    )
    return True


# ===================== DEMONSTRACAO =====================
print("--- Cadastrando tarefas ---")
cadastrar_tarefa("Estudar Python", 1)
cadastrar_tarefa("Lavar o carro", 3)
cadastrar_tarefa("Pagar contas", 2)

print("\n--- Testando validacoes ---")
cadastrar_tarefa("Abc", 2)            # titulo com menos de 5 caracteres
cadastrar_tarefa("Fazer compras", 5)  # prioridade fora do intervalo 1 a 3

listar_tarefas()

print("--- Concluindo e alterando ---")
concluir_tarefa(1)
concluir_tarefa(1)                    # ja concluida
alterar_prioridade(2, 1)
alterar_prioridade(2, 7)              # prioridade invalida
concluir_tarefa(99)                   # codigo inexistente

listar_tarefas()


# ===================== CONFIRMACAO (TESTES) =====================
def verificar(descricao, condicao):
    print(f"[{'OK' if condicao else 'FALHOU'}] {descricao}")


print("=============== CONFIRMACAO DOS RESULTADOS ===============")
verificar("3 tarefas foram cadastradas (as invalidas foram recusadas)", len(tarefas) == 3)
verificar("Titulo com menos de 5 caracteres e recusado", not titulo_valido("Abc"))
verificar("Titulo com 5 caracteres e aceito", titulo_valido("Abcde"))
verificar("Prioridade 0 e recusada", not prioridade_valida(0))
verificar("Prioridade 4 e recusada", not prioridade_valida(4))
verificar("Prioridades 1, 2 e 3 sao aceitas", all(prioridade_valida(p) for p in (1, 2, 3)))
verificar("Tarefa 1 esta concluida", buscar_tarefa(1)["concluida"] is True)
verificar("Tarefa 2 continua pendente", buscar_tarefa(2)["concluida"] is False)
verificar("Prioridade da tarefa 2 mudou de 3 para 1", buscar_tarefa(2)["prioridade"] == 1)
verificar("Prioridade da tarefa 3 continua 2", buscar_tarefa(3)["prioridade"] == 2)
verificar("Tarefa 99 nao existe", buscar_tarefa(99) is None)