from flask import Flask, render_template, request, redirect, url_for
import sqlite3
from datetime import datetime

app = Flask(__name__)

# Função para conectar ao banco de dados
def get_db_connection():
    conn = sqlite3.connect('blog.db')
    conn.row_factory = sqlite3.Row
    return conn

# Cria a tabela de posts automaticamente se não existir
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            conteudo TEXT NOT NULL,
            data_criacao TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Rota Principal: Lista todos os posts
@app.route('/')
def index():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts ORDER BY id DESC').fetchall()
    conn.close()
    return render_template('index.html', posts=posts)

# Rota para Criar Novo Post
@app.route('/novo', methods=('GET', 'POST'))
def novo_post():
    if request.method == 'POST':
        titulo = request.form['titulo']
        autor = request.form['autor']
        conteudo = request.form['conteudo']
        data_atual = datetime.now().strftime('%d/%m/%Y às %H:%M')

        if titulo and conteudo:
            conn = get_db_connection()
            conn.execute(
                'INSERT INTO posts (titulo, autor, conteudo, data_criacao) VALUES (?, ?, ?, ?)',
                (titulo, autor or 'Anônimo', conteudo, data_atual)
            )
            conn.commit()
            conn.close()
            return redirect(url_for('index'))

    return render_template('novo_post.html')

# Rota para Excluir Post
@app.route('/deletar/<int:id>', methods=('POST',))
def deletar_post(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM posts WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)