
print("=" * 40)
print("       🍎 MINHA FRUTARIA")
print("=" * 40)

frutas = {
    1: ["Maçã", 5.00, 20],
    2: ["Banana", 4.00, 30],
    3: ["Uva", 8.00, 15],
    4: ["Laranja", 3.50, 25],
    5: ["Melancia", 10.00, 10],
    6: ["Morango", 12.00, 12]
}

total = 0

while True:
    print("\n🍓 CARDÁPIO DE FRUTAS")

    for codigo, fruta in frutas.items():
        print(
            f"{codigo} - {fruta[0]} | "
            f"R$ {fruta[1]:.2f} | Estoque: {fruta[2]}"
        )

    print("\n0 - Finalizar compra")

    try:
        escolha = int(input("\nEscolha uma fruta: "))

        if escolha == 0:
            break

        if escolha not in frutas:
            print("❌ Fruta não encontrada!")
            continue

        quantidade = int(input("Quantidade: "))

        if quantidade <= 0:
            print("Quantidade inválida!")
            continue

        fruta = frutas[escolha]

        if quantidade > fruta[2]:
            print("❌ Estoque insuficiente!")
            continue

        subtotal = quantidade * fruta[1]

        fruta[2] -= quantidade
        total += subtotal

        print(f"✅ {quantidade} {fruta[0]} adicionada(s)!")
        print(f"Subtotal: R$ {subtotal:.2f}")

    except ValueError:
        print("Digite apenas números!")

print("\n" + "=" * 40)
print("       🧾 RESUMO DA COMPRA")
print("=" * 40)

print(f"💰 TOTAL: R$ {total:.2f}")

print("\n🍉 Obrigado por comprar na frutaria!")
print("Volte sempre! ❤️")

