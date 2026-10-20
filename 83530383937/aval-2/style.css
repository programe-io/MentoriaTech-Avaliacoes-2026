import matplotlib.pyplot as plt
import seaborn as sns

# Definindo o estilo visual do gráfico
sns.set_theme(style="whitegrid")
plt.figure(figsize=(10, 6))

# Criando o gráfico de barras dos preços
ax = sns.barplot(
    x="Preço (R$)",
    y="Produto",
    data=df_v2.sort_values("Preço (R$)", ascending=False),
    palette="viridis"
)

# Adicionando rótulos com os preços em cima de cada barra
for p in ax.patches:
    width = p.get_width()
    ax.text(
        width + 0.5,
        p.get_y() + p.get_height() / 2,
        f"R$ {width:.2f}",
        ha="left",
        va="center",
        fontsize=10,
        fontweight="bold"
    )

# Títulos e formatações adicionais
plt.title("Comparativo de Preços de Mercado", fontsize=16, fontweight="bold", pad=15)
plt.xlabel("Preço (R$)", fontsize=12)
plt.ylabel("Produto", fontsize=12)
plt.xlim(0, df_v2["Preço (R$)"].max() + 5)

sns.despine(left=True, bottom=True)
plt.tight_layout()
plt.show()