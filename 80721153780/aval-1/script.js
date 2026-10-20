rom datetime import datetime

# Obtém a hora atual
hora = datetime.now().hour

# Define a saudação com base na hora
if 5 <= hora < 12:
    saudacao = "Bom dia! 🌅"
    emoji_borda = "✨"
elif 12 <= hora < 18:
    saudacao = "Boa tarde! ☀️"
    emoji_borda = "⭐"
else:
    saudacao = "Boa noite! 🌙"
    emoji_borda = "✨"

# Design estilizado
borda = emoji_borda * 18
mensagem_personalizada = f"""
{borda}
  {saudacao} Que seu dia seja fantástico!
{borda}
"""

print(mensagem_personalizada)