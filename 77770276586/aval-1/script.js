while True:
    print("1. Adicionar Receita")
    print("2. Adicionar Despesa")
    print("3. Ver Extrato")
    print("4. Sair")
    
    opcao = input("Escolha uma opção: ")
    
    if opcao == '1':
        valor = float(input("Valor: "))
        cat = input("Categoria (ex: Salário): ")
        data = input("Data (DD/MM/AAAA): ")
        adicionar_transacao('Receita', cat, valor, data)
    elif opcao == '2':
        valor = float(input("Valor: "))
        cat = input("Categoria (ex: Aluguel): ")
        data = input("Data (DD/MM/AAAA): ")
        adicionar_transacao('Despesa', cat, valor, data)
    elif opcao == '3':
        exibir_extrato()
    elif opcao == '4':
        break