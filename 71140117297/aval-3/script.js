const STORAGE_KEY = "biblioteca_escolar_v1";

let books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
let loans = JSON.parse(localStorage.getItem(STORAGE_KEY + "_emprestimos") || "[]");

// Livros de exemplo
if (books === null) {
  books = [
    {id: crypto.randomUUID(), title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", category: "Literatura", year: "1943", quantity: 3},
    {id: crypto.randomUUID(), title: "Alice no País das Maravilhas", author: "Lewis Carroll", category: "Fantasia", year: "1865", quantity: 2},
    {id: crypto.randomUUID(), title: "Dom Casmurro", author: "Machado de Assis", category: "Literatura", year: "1899", quantity: 2},
    {id: crypto.randomUUID(), title: "O Sítio do Picapau Amarelo", author: "Monteiro Lobato", category: "Contos e Fábulas", year: "1920", quantity: 2},
    {id: crypto.randomUUID(), title: "Uma Breve História do Tempo", author: "Stephen Hawking", category: "Ciências", year: "1988", quantity: 1},
    {id: crypto.randomUUID(), title: "O Diário de Anne Frank", author: "Anne Frank", category: "Biografia", year: "1947", quantity: 2},
    {id: crypto.randomUUID(), title: "Turma da Mônica: Laços", author: "Vitor e Lu Cafaggi", category: "Histórias em Quadrinhos", year: "2013", quantity: 4},
    {id: crypto.randomUUID(), title: "História do Brasil", author: "Boris Fausto", category: "História", year: "1994", quantity: 1},
    {id: crypto.randomUUID(), title: "Atlas Geográfico Escolar", author: "IBGE", category: "Geografia", year: "2018", quantity: 2},
    {id: crypto.randomUUID(), title: "Matemática: compreensão e prática", author: "Ênio Silveira", category: "Matemática", year: "2018", quantity: 2}
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

const $ = id => document.getElementById(id);

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

const formatDate = value =>
  value ? new Date(value+"T00:00:00").toLocaleDateString("pt-BR") : "—";

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  localStorage.setItem(STORAGE_KEY+"_emprestimos", JSON.stringify(loans));
  render();
};

const esc = value =>
  String(value ?? "").replace(/[&<>"']/g,c=>({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[c]));

const activeLoansFor = id =>
  loans.filter(l=>l.bookId===id && l.status==="Ativo").length;

const available = book =>
  Math.max(0,Number(book.quantity||1)-activeLoansFor(book.id));

$("today").textContent = new Date().toLocaleDateString("pt-BR",{
  weekday:"short",
  day:"2-digit",
  month:"short",
  year:"numeric"
});

function render() {
  $("totalBooks").textContent =
    books.reduce((s,b)=>s+Number(b.quantity||1),0);

  $("availableBooks").textContent =
    books.reduce((s,b)=>s+available(b),0);

  $("loanedBooks").textContent =
    loans.filter(l=>l.status==="Ativo").length;

  $("activeLoans").textContent =
    loans.filter(l=>l.status==="Ativo").length;

  const q = $("searchBook").value.toLowerCase();
  const filter = $("filterBook").value;

  const filtered = books.filter(b =>
    (`${b.title} ${b.author} ${b.category}`).toLowerCase().includes(q) &&
    (
      filter==="all" ||
      (filter==="available" ? available(b)>0 : available(b)===0)
    )
  );

  $("booksTable").innerHTML = filtered.map(b=>`
    <tr>
      <td>
        <div class="book-title">${esc(b.title)}</div>
        <div class="book-sub">
          ID ${esc(b.id.slice(-6))} · ${esc(b.quantity)} exemplar(es)
        </div>
      </td>

      <td>${esc(b.author)}</td>
      <td>${esc(b.category)}</td>
      <td>${esc(b.year||"—")}</td>

      <td>
        <span class="status ${available(b)>0?"available":"loaned"}">
          ${available(b)>0?"Disponível":"Emprestado"}
        </span>
      </td>

      <td>
        <div class="actions">
          ${available(b)>0?`
            <button class="action" data-action="loan" data-id="${b.id}">
              Emprestar
            </button>
          `:""}

          <button class="action" data-action="edit" data-id="${b.id}">
            Editar
          </button>

          <button class="action danger" data-action="delete" data-id="${b.id}">
            Excluir
          </button>
        </div>
      </td>
    </tr>
  `).join("");

  $("booksEmpty").classList.toggle("hidden",filtered.length>0);

  const active = loans.filter(l=>l.status==="Ativo").slice().reverse();

  $("loansTable").innerHTML = active.map(l=>{
    const b = books.find(x=>x.id===l.bookId);

    return `
      <tr>
        <td>
          <div class="book-title">${esc(b?.title||"Livro removido")}</div>
        </td>

        <td>${esc(l.student)}</td>
        <td>${formatDate(l.loanDate)}</td>
        <td>${formatDate(l.dueDate)}</td>

        <td>
          <span class="status loaned">Em andamento</span>
        </td>

        <td>
          <button class="action" data-action="return" data-id="${l.id}">
            Registrar devolução
          </button>
        </td>
      </tr>
    `;
  }).join("");

  $("loansEmpty").classList.toggle("hidden",active.length>0);
}

function openBook(book=null) {
  $("bookForm").reset();

  $("bookId").value = book?.id||"";
  $("dialogTitle").textContent = book ? "Editar livro" : "Cadastrar livro";

  $("title").value = book?.title||"";
  $("author").value = book?.author||"";
  $("category").value = book?.category||"";
  $("year").value = book?.year||"";
  $("quantity").value = book?.quantity||1;

  $("bookDialog").showModal();
}

$("newBookBtn").onclick = () => openBook();

$("closeBook").onclick = $("cancelBook").onclick = () =>
  $("bookDialog").close();

$("bookForm").onsubmit = e => {
  e.preventDefault();

  const id = $("bookId").value;

  const data = {
    id: id||crypto.randomUUID(),
    title: $("title").value.trim(),
    author: $("author").value.trim(),
    category: $("category").value.trim(),
    year: $("year").value,
    quantity: Number($("quantity").value)
  };

  if (id) {
    const borrowed = activeLoansFor(id);

    if (data.quantity < borrowed) {
      alert(`Quantidade não pode ser menor que ${borrowed}, exemplar(es) emprestado(s).`);
      return;
    }

    books = books.map(b=>b.id===id?data:b);
  } else {
    books.push(data);
  }

  $("bookDialog").close();
  save();
};

$("searchBook").oninput = render;
$("filterBook").onchange = render;

$("booksTable").onclick = e => {
  const btn = e.target.closest("button[data-action]");

  if (!btn) return;

  const b = books.find(x=>x.id===btn.dataset.id);

  switch(btn.dataset.action) {

    case "edit":
      openBook(b);
      break;

    case "delete":
      if (activeLoansFor(b.id)) {
        alert("Este livro possui empréstimo ativo. Registre a devolução antes de excluir.");
        return;
      }

      if (confirm(`Excluir o livro “${b.title}”?`)) {
        books = books.filter(x=>x.id!==b.id);
        save();
      }
      break;

    case "loan":
      $("loanForm").reset();

      $("loanBookId").value = b.id;
      $("loanBookName").textContent = b.title;
      $("loanDate").value = todayISO();

      const due = new Date();
      due.setDate(due.getDate()+14);

      $("dueDate").value =
        `${due.getFullYear()}-${String(due.getMonth()+1).padStart(2,"0")}-${String(due.getDate()).padStart(2,"0")}`;

      $("loanDialog").showModal();
      break;
  }
};

$("closeLoan").onclick = $("cancelLoan").onclick = () =>
  $("loanDialog").close();

$("loanForm").onsubmit = e => {
  e.preventDefault();

  const id = $("loanBookId").value;
  const b = books.find(x=>x.id===id);

  if (!b || available(b)<1) {
    alert("Não há exemplares disponíveis deste livro.");
    return;
  }

  if ($("dueDate").value < $("loanDate").value) {
    alert("A data de devolução deve ser igual ou posterior à data do empréstimo.");
    return;
  }

  loans.push({
    id: crypto.randomUUID(),
    bookId: id,
    student: $("student").value.trim(),
    loanDate: $("loanDate").value,
    dueDate: $("dueDate").value,
    status: "Ativo"
  });

  $("loanDialog").close();
  save();
};

$("loansTable").onclick = e => {
  const btn = e.target.closest('button[data-action="return"]');

  if (!btn) return;

  const loan = loans.find(l=>l.id===btn.dataset.id);

  if (loan && confirm("Confirmar a devolução deste livro?")) {
    loan.status = "Devolvido";
    loan.returnDate = todayISO();
    save();
  }
};

render();