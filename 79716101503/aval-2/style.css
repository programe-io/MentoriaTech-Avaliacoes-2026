mport json
import time
from functools import wraps
from datetime import datetime

def registrar_log(func):
    """Decorador para registrar logs de quando uma transação é feita."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"\\n[LOG] Executando operação financeira: {func.__name__.upper()\}...")
        resultado = func(*args, **kwargs)
        print(f"[LOG] Operação concluída com sucesso.")
        return resultado
    return wrapper

class Transacao:
    def __init__(self, tipo, valor, categoria, descricao, data=None):
        self.tipo = tipo.lower()  # "receita" ou "despesa"
        self.valor = float(valor)
        self.categoria = categoria
        self.descricao = descricao
        self.data = data or datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def para_dicionario(self):
        return {
            "tipo": self.tipo,
            "valor": self.valor,
            "categoria": self.categoria,
            "descricao": self.descricao,
            "data": self.data
        \}

class Carteira:
    def __init__(self, arquivo="financas.json"):
        self.arquivo = arquivo
        self.transacoes = self.carregar_dados()

    def carregar_dados(self):
        """Carrega as transações salvas do arquivo JSON."""
        try:
            with open(self.arquivo, "r", encoding="utf-8") as f:
                dados = json.load(f)
                return [Transacao(**t) for t in dados]
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def salvar_dados(self):
        """Salva a lista de transações no arquivo JSON."""
        with open(self.arquivo, "w", encoding="utf-8") as f:
            json.dump([t.para_dicionario() for t in self.transacoes], f, ensure_ascii=False, indent=4)

    @registrar_log
    def adicionar_transacao(self, tipo, valor, categoria, descricao):
        if tipo.lower() not in ["receita", "despesa"]:
            print("Erro: O tipo deve ser 'receita' ou 'despesa'.")
            return
        
        nova = Transacao(tipo, valor, categoria, descricao)
        self.transacoes.append(nova)
        self.salvar_dados()
        print(f"-> {tipo.capitalize()\} de R\$ {valor:.2f\} ({categoria\}) adicionada.")

    def calcular_saldo(self):
        receitas = sum(t.valor for t in self.transacoes if t.tipo == "receita")
        despesas = sum(t.valor for t in self.transacoes if t.tipo == "despesa")
        return receitas - despesas, receitas, despesas

    def extrato(self):
        if not self.transacoes:
            print("\\nNenhuma transação registrada.")
            return

        print("\\n" + "="*40)
        print("          EXTRATO FINANCEIRO")
        print("="*40)
        for i, t in enumerate(self.transacoes, 1):
            sinal = "+" if t.tipo == "receita" else "-"
            print(f"{i\}. [{t.data\}] {t.tipo.upper()\} | R\$ {sinal\}{t.valor:.2f\}")
            print(f"   Categoria: {t.categoria\} - {t.descricao\}")
            print("-" * 40)
        
        saldo, total_receitas, total_despesas = self.calcular_saldo()
        print(f"Total Receitas: R\$ {total_receitas:.2f\}")
        print(f"Total Despesas: R\$ {total_despesas:.2f\}")
        print(f"Saldo Atual:    R\$ {saldo:.2f\}")
        print("="*40)

# Exemplo de uso
if __name__ == "__main__":
    minha_carteira = Carteira()
    
    # Adiciona dados de exemplo se a carteira estiver vazia
    if not minha_carteira.transacoes:
        minha_carteira.adicionar_transacao("receita", 3500.00, "Salário", "Pagamento mensal")
        minha_carteira.adicionar_transacao("despesa", 150.00, "Alimentação", "Supermercado da semana")
        minha_carteira.adicionar_transacao("despesa", 45.90, "Lazer", "Cinema com amigos")

    # Exibe o extrato e o saldo consolidado
    minha_carteira.extrato()$0