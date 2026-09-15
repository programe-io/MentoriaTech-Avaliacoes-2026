from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation

# Criar a planilha
wb = Workbook()
ws = wb.active
ws.title = "Compras"

# Título
ws["A1"] = "LISTA DE COMPRAS - SUPERMERCADO"
ws.merge_cells("A1:F1")

ws["A1"].font = Font(size=16, bold=True, color="FFFFFF")
ws["A1"].fill = PatternFill("solid", fgColor="2E7D32")
ws["A1"].alignment = Alignment(horizontal="center")

# Cabeçalhos
cabecalhos = [
    "Produto",
    "Categoria",
    "Quantidade",
    "Preço Unitário",
    "Total",
    "Comprado?"
]

for coluna, nome in enumerate(cabecalhos, start=1):
    celula = ws.cell(row=3, column=coluna, value=nome)
    celula.font = Font(bold=True, color="FFFFFF")
    celula.fill = PatternFill("solid", fgColor="388E3C")
    celula.alignment = Alignment(horizontal="center")

# Produtos iniciais
produtos = [
    ["Arroz", "Alimentos", 2, 6.00],
    ["Feijão", "Alimentos", 2, 8.00],
    ["Leite", "Laticínios", 4, 5.50],
    ["Ovos", "Laticínios", 1, 12.00],
    ["Café", "Bebidas", 1, 15.00],
    ["Sabão", "Limpeza", 2, 7.00],
    ["Açúcar", "Alimentos", 1, 5.00],
    ["Macarrão", "Alimentos", 3, 4.50],
]

# Inserir produtos
linha_inicial = 4

for i, produto in enumerate(produtos, start=linha_inicial):
    ws.cell(i, 1, produto[0])
    ws.cell(i, 2, produto[1])
    ws.cell(i, 3, produto[2])
    ws.cell(i, 4, produto[3])

    # Fórmula do total
    ws.cell(i, 5, f"=C{i}*D{i}")

    # Status
    ws.cell(i, 6, "NÃO")

# Total geral
linha_total = linha_inicial + len(produtos) + 1

ws.cell(linha_total, 4, "TOTAL DA COMPRA:")
ws.cell(linha_total, 4).font = Font(bold=True)

ws.cell(linha_total, 5, f"=SUM(E{linha_inicial}:E{linha_total-2})")
ws.cell(linha_total, 5).font = Font(bold=True, color="FFFFFF")
ws.cell(linha_total, 5).fill = PatternFill("solid", fgColor="2E7D32")

# Total ainda não comprado
linha_restante = linha_total + 1

ws.cell(linha_restante, 4, "AINDA FALTA PAGAR:")
ws.cell(linha_restante, 4).font = Font(bold=True)

ws.cell(
    linha_restante,
    5,
    f'=SUMIF(F{linha_inicial}:F{linha_total-2},"NÃO",E{linha_inicial}:E{linha_total-2})'
)

ws.cell(linha_restante, 5).font = Font(bold=True)

# Formatação de moeda
for linha in range(linha_inicial, linha_restante + 1):
    ws.cell(linha, 4).number_format = 'R$ #,##0.00'
    ws.cell(linha, 5).number_format = 'R$ #,##0.00'

# Lista suspensa para "Comprado?"
validacao = DataValidation(
    type="list",
    formula1='"SIM,NÃO"',
    allow_blank=False
)

ws.add_data_validation(validacao)
validacao.add(
    f"F{linha_inicial}:F{linha_total-2}"
)

# Bordas
borda = Border(
    left=Side(style="thin", color="CCCCCC"),
    right=Side(style="thin", color="CCCCCC"),
    top=Side(style="thin", color="CCCCCC"),
    bottom=Side(style="thin", color="CCCCCC")
)

for linha in ws.iter_rows(
    min_row=3,
    max_row=linha_total-2,
    min_col=1,
    max_col=6
):
    for celula in linha:
        celula.border = borda
        celula.alignment = Alignment(vertical="center")

# Largura das colunas
larguras = {
    "A": 25,
    "B": 18,
    "C": 14,
    "D": 18,
    "E": 18,
    "F": 15
}

for coluna, largura in larguras.items():
    ws.column_dimensions[coluna].width = largura

# Congelar cabeçalho
ws.freeze_panes = "A4"

# Ativar filtro
ws.auto_filter.ref = f"A3:F{linha_total-2}"

# Salvar arquivo
wb.save("lista_compras_supermercado.xlsx")

print("Planilha criada com sucesso!")
print("Arquivo: lista_compras_supermercado.xlsx")
