// Servidor da Ficha de Anamnese: SQLite + API REST + arquivos do site
// Requer Node.js 22.5 ou superior (SQLite embutido, sem instalar pacotes).
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const PORTA = process.env.PORT || 3000;

// ===== Banco de dados =====
const db = new DatabaseSync(path.join(__dirname, "anamnese.db"));
db.exec(fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8"));

const listar  = db.prepare("SELECT id, nome, idade, altura, peso FROM pessoas ORDER BY id");
const inserir = db.prepare("INSERT INTO pessoas (nome, idade, altura, peso) VALUES (?, ?, ?, ?)");
const apagar  = db.prepare("DELETE FROM pessoas WHERE id = ?");

// ===== Validação (mesmas regras do formulário) =====
function validarDados(d) {
  if (typeof d.nome !== "string" || d.nome.trim().length < 2) return "Informe o nome com no mínimo duas letras.";
  if (!Number.isInteger(d.idade) || d.idade < 1 || d.idade > 120) return "A idade deve ser um número inteiro entre 1 e 120.";
  if (!(d.altura >= 0.5 && d.altura <= 2.5)) return "A altura deve estar entre 0,5 m e 2,5 m.";
  if (!(d.peso >= 2 && d.peso <= 500)) return "O peso deve estar entre 2 kg e 500 kg.";
  return "";
}

// ===== Utilidades HTTP =====
function responderJSON(res, status, corpo) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(corpo));
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let texto = "";
    req.on("data", (parte) => {
      texto += parte;
      if (texto.length > 10_000) { reject(new Error("Corpo muito grande")); req.destroy(); }
    });
    req.on("end", () => {
      try { resolve(JSON.parse(texto || "{}")); }
      catch { reject(new Error("JSON inválido")); }
    });
  });
}

// Somente estes arquivos são públicos (o .db nunca é exposto)
const ARQUIVOS = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/index.html": ["index.html", "text/html; charset=utf-8"],
  "/style.css": ["style.css", "text/css; charset=utf-8"],
  "/script.js": ["script.js", "text/javascript; charset=utf-8"]
};

// ===== Rotas =====
const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  try {
    // GET /api/pessoas
    if (url.pathname === "/api/pessoas" && req.method === "GET") {
      return responderJSON(res, 200, listar.all());
    }

    // POST /api/pessoas
    if (url.pathname === "/api/pessoas" && req.method === "POST") {
      const d = await lerCorpo(req);
      const erro = validarDados(d);
      if (erro) return responderJSON(res, 400, { erro });
      const r = inserir.run(d.nome.trim(), d.idade, d.altura, d.peso);
      return responderJSON(res, 201, { id: Number(r.lastInsertRowid) });
    }

    // DELETE /api/pessoas/:id
    const m = url.pathname.match(/^\/api\/pessoas\/(\d+)$/);
    if (m && req.method === "DELETE") {
      const r = apagar.run(Number(m[1]));
      if (r.changes === 0) return responderJSON(res, 404, { erro: "Paciente não encontrado." });
      return responderJSON(res, 200, { ok: true });
    }

    // Arquivos do site
    if (req.method === "GET" && ARQUIVOS[url.pathname]) {
      const [arquivo, tipo] = ARQUIVOS[url.pathname];
      res.writeHead(200, { "Content-Type": tipo });
      return res.end(fs.readFileSync(path.join(__dirname, arquivo)));
    }

    responderJSON(res, 404, { erro: "Rota não encontrada." });
  } catch (e) {
    responderJSON(res, 500, { erro: e.message });
  }
});

servidor.listen(PORTA, () => {
  console.log("Ficha de Anamnese rodando em http://localhost:" + PORTA);
});