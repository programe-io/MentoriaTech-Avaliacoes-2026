
print("🌱 MEU JARDIM 🌱")

plantas = {
    "Rosa": "Precisa de sol e água regularmente.",
    "Girassol": "Gosta de bastante luz solar.",
    "Cacto": "Precisa de pouca água.",
    "Orquídea": "Prefere luz indireta e umidade.",
    "Samambaia": "Gosta de sombra e umidade."
}

print("\n🌼 Plantas disponíveis:")

for planta in plantas:
    print("-", planta)

escolha = input("\nDigite o nome de uma planta: ").capitalize()

if escolha in plantas:
    print("\n🌿 Cuidados com sua planta:")
    print(plantas[escolha])
else:
    print("Planta não encontrada!")

print("\n💚 Cuide bem das plantas!")
