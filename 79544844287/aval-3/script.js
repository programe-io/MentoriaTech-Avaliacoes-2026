
import math

print("=" * 40)
print("       🧮 SUPER CALCULADORA")
print("=" * 40)

while True:

    print("\nEscolha uma operação:")
    print("1 - Soma (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("5 - Potência (**)")
    print("6 - Raiz quadrada (√)")
    print("7 - Tabuada")
    print("0 - Sair")

    opcao = input("\nDigite sua escolha: ")

    if opcao == "0":
        print("👋 Calculadora encerrada!")
        break

    if opcao == "7":
        numero = float(input("Digite um número: "))

        for i in range(1, 11):
            print(f"{numero:g} x {i} = {numero * i:g}")

        continue

    if opcao == "6":
        numero = float(input("Digite um número: "))

        if numero >= 0:
            print("Resultado:", math.sqrt(numero))
        else:
            print("Não existe raiz real desse número!")

        continue

    if opcao in ["1", "2", "3", "4", "5"]:

        n1 = float(input("Primeiro número: "))
        n2 = float(input("Segundo número: "))

        if opcao == "1":
            resultado = n1 + n2

        elif opcao == "2":
            resultado = n1 - n2

        elif opcao == "3":
            resultado = n1 * n2

        elif opcao == "4":
            if n2 == 0:
                print("❌ Não é possível dividir por zero!")
                continue
            resultado = n1 / n2

        elif opcao == "5":
            resultado = n1 ** n2

        print("\n✅ RESULTADO:", resultado)

    else:
        print("❌ Opção inválida!")

print("\nObrigado por usar a calculadora! 🧮")
