import json
import time
from functools import wraps
from datetime import datetime

def medir_tempo(func):
    """Decorador para medir o tempo de execução de uma função."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        fim = time.time()
        print(f"\\n[LOG] A função '{func.__name__\}' executou em {fim - inicio:.4f\} segundos.")
        return resultado
    return wrapper

class Tarefa:
    def __init__(self, titulo, descricao, prioridade="Média", concluida=False, criada_em=None):
        self.titulo = titulo
        self.descricao = descricao
        self.prioridade = prioridade
        self.concluida = concluida
        self.criada_em = criada_em or datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    def concluir(self):
        self.concluida = True

    def para_dicionario(self):
        return {
            "titulo": self.titulo,
            "descricao": self.descricao,
            "prioridade": self.prioridade,
            "concluida": self.concluida,
            "criada_em": self.criada_em
        \}

class GerenciadorTarefas:
    def __init__(self, arquivo="tarefas.json"):
        self.arquivo = arquivo
        self.tarefas = self.carregar_tarefas()

    @medir_tempo
    def carregar_tarefas(self):
        """Lê as tarefas do arquivo JSON, se ele existir."""
        try:
            with open(self.arquivo, "r", encoding="utf-8") as f:
                dados = json.load(f)
                return [Tarefa(**t) for t in dados]
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    @medir_tempo
    def salvar_tarefas(self):
        """Salva a lista atual de tarefas no arquivo JSON."""
        with open(self.arquivo, "w", encoding="utf-8") as f:
            json.dump([t.para_dicionario() for t in self.tarefas], f, ensure_ascii=False, indent=4)

    def adicionar_tarefa(self, titulo, descricao, prioridade="Média"):
        nova = Tarefa(titulo, descricao, prioridade)
        self.tarefas.append(nova)
        self.salvar_tarefas()
        print(f"Sucesso: Tarefa '{titulo\}' adicionada!")

    def listar_tarefas(self):
        if not self.tarefas:
            print("\\nNenhuma tarefa cadastrada.")
            return
        
        print("\\n" + "="*30)
        print("     LISTA DE TAREFAS")
        print("="*30)
        for i, t in enumerate(self.tarefas, 1):
            status = "Concluída" if t.concluida else "Pendente"
            print(f"{i\}. [{status\}] {t.titulo\} (Prioridade: {t.prioridade\})")
            print(f"   Detalhes: {t.descricao\}")
            print(f"   Criada em: {t.criada_em\}")
            print("-" * 30)

# Exemplo de uso
if __name__ == "__main__":
    gerenciador = GerenciadorTarefas()
    
    # Adiciona tarefas de exemplo caso o arquivo esteja vazio
    if not gerenciador.tarefas:
        gerenciador.adicionar_tarefa("Estudar Python Avançado", "Praticar decoradores, geradores e POO.", "Alta")
        gerenciador.adicionar_tarefa("Fazer compras", "Comprar café, frutas e pão.", "Baixa")
    
    # Exibe as tarefas salvas
    gerenciador.listar_tarefas()$0