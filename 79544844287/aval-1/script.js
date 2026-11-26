
print("=" * 35)
print("       🍔 MEU RESTAURANTE")
print("=" * 35)

cardapio = {
    1: ["Hambúrguer", 15.00],
    2: ["Pizza", 30.00],
    3: ["Batata frita", 10.00],
    4: ["Hot Dog", 12.00],
    5: ["Refrigerante", 6.00],
    6: ["Sorvete", 8.00]
}

carrinho = []
total = 0

print("\n📋 CARDÁPIO")

for numero, produto in cardapio.items():
    print(f"{numero} - {produto[0]}: R$ {produto[1]:.2f}")

while True:
    print("\nDigite 0 para finalizar o pedido.")

    escolha = int(input("Escolha seu produto: "))

    if escolha == 0:
        break

    if escolha in cardapio:
        quantidade = int(input("Quantidade: "))

        if quantidade <= 0:
            print("Quantidade inválida!")
            continue

        nome, preco = cardapio[escolha]

        subtotal = preco * quantidade
        total += subtotal

        carrinho.append(
            (nome, quantidade, subtotal)
        )

        print(f"✅ {nome} adicionado ao pedido!")

    else:
        print("❌ Produto não encontrado!")

print("\n" + "=" * 35)
print("       🧾 NOTA FISCAL")
print("=" * 35)

for nome, quantidade, subtotal in carrinho:
    print(f"{nome} x{quantidade} = R$ {subtotal:.2f}")

print("-" * 35)
print(f"TOTAL: R$ {total:.2f}")

print("\n🍽️ Obrigado pela preferência!")
print("Volte sempre!")
