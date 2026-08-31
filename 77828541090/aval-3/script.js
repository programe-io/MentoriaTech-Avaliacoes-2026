# Lista para armazenar as escolas cadastradas
escolas = []

def cadastrar_escola():
    nome = input("Digite o nome da escola: ")
    codigo_inep = input("Digite o código INEP da escola: ")
    cidade = input("Digite a cidade da escola: ")
    
    escola = {
        "nome": nome,
        "codigo_inep": codigo_inep,
        "cidade": cidade
    }
    
    escolas.append(escola)
    print(f"Escola '{nome}' cadastrada com sucesso!\n")

def listar_escolas():
    if not escolas:
        print("Nenhuma escola cadastrada.\n")
        return
    
    print("\n--- Lista de Escolas ---")
    for i, e in enumerate(escolas, 1):
        print(f"{i}. {e['nome']} (INEP: {e['codigo_inep']}) - {e['cidade']}")
    print("-" * 24 + "\n")

# Menu interativo simples
while True:
    print("1. Cadastrar escola")
    print("2. Listar escolas")
    print("3. Sair")
    
    opcao = input("Escolha uma opção: ")
    
    if opcao == "1":
        cadastrar_escola()
    elif opcao == "2":
        listar_escolas()
    elif opcao == "3":
        print("Saindo do programa...")
        break
    else:
        print("Opção inválida, tente novamente.\n")

