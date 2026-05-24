requireAuth(['admin','user']);

function loadBooks() { return JSON.parse(localStorage.getItem('books')||'[]'); }
function saveBooks(arr){ localStorage.setItem('books',JSON.stringify(arr)); }
function loadStudents() { return JSON.parse(localStorage.getItem('students')||'[]'); }
function loadBorrows() { return JSON.parse(localStorage.getItem('borrows')||'[]'); }
function saveBorrows(arr) { localStorage.setItem('borrows',JSON.stringify(arr)); }

// Strict manual calculation to bypass system locale issues
function generateStrictDMYDate(dateObj) {
  let d = String(dateObj.getDate()).padStart(2, '0');
  let m = String(dateObj.getMonth() + 1).padStart(2, '0');
  let y = dateObj.getFullYear();
  return `${d}/${m}/${y}`;
}

function syncDashboard() {
  if (typeof statUpdate === 'function') statUpdate();
  if (typeof initDashboardChart === 'function') initDashboardChart();
}

function populateBorrowForm() {
  let bookSel = document.getElementById('borrowBook');
  let stuSel = document.getElementById('borrowStudent');
  let books = loadBooks();
  let students = loadStudents();
  
  bookSel.innerHTML = `<option value="">-- Select Available Book --</option>`;
  stuSel.innerHTML = `<option value="">-- Select Student --</option>`;
  
  books.forEach((b, i) => {
    if (!b.borrowed) {
      bookSel.innerHTML += `<option value="${i}">${b.title} (${b.author})</option>`;
    }
  });
  students.forEach((s) => {
    stuSel.innerHTML += `<option value="${s.regNo}">${s.name} [${s.regNo}]</option>`;
  });
}

function renderBorrows() {
  let tbody = document.querySelector("#borrowTable tbody");
  if (!tbody) return;

  let borrows = loadBorrows();
  const isAdmin = getCurrentUser().role === 'admin';
  tbody.innerHTML = '';
  
  // UPDATED: colspan 7 (Admin) or 6 (User) to accommodate the new "No." column
  if(!borrows.length) {
    let cols = isAdmin ? 7 : 6; 
    tbody.innerHTML = `<tr><td colspan="${cols}" style="text-align:center;"><i>No active library loans found in ledger.</i></td></tr>`;
    return;
  }
  
  borrows.forEach((b, idx) => {
    // UPDATED: Added ${idx + 1}. column
    let rowHTML = `
      <tr>
        <td style="text-align: center;">${idx + 1}.</td>
        <td>${b.date}</td>
        <td>${b.dueDate}</td>
        <td><strong>${b.bookTitle}</strong><br><small style="color:#666;">${b.bookAuthor}</small></td>
        <td>${b.studentName}</td>
        <td><code class="reg-badge">${b.studentReg}</code></td>
    `;
    
    if (isAdmin) {
      rowHTML += `
        <td>
          <div class="action-btns">
            <button class="del" onclick="delBorrow(${idx})"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </td>
      `;
    }
    
    rowHTML += `</tr>`;
    tbody.innerHTML += rowHTML;
  });
}

function openBorrowModal() {
  populateBorrowForm();
  document.getElementById('borrowModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeBorrowModal() {
  document.getElementById('borrowModal').classList.remove('show');
  document.body.style.overflow = '';
  setTimeout(() => { document.getElementById('borrowForm').reset(); }, 151);
}

document.getElementById('borrowForm').onsubmit = function(e) {
  e.preventDefault();
  let bookIdx = document.getElementById('borrowBook').value;
  let studentReg = document.getElementById('borrowStudent').value;
  
  if (bookIdx === '' || studentReg === '') {
    notify("All selection fields are critical!", "error");
    return;
  }
  
  let books = loadBooks();
  let students = loadStudents();
  let borrows = loadBorrows();

  if (books[bookIdx].borrowed) {
    notify("Target book item copy allocation is active elsewhere.", "error"); 
    return;
  }

  let activeStudentBorrows = borrows.filter(b => b.studentReg === studentReg && (!b.returned || b.status === "borrowed")).length;
  if (activeStudentBorrows >= 20) {
    notify("Borrow limit reached! Student cannot borrow more than 20 books.", "error");
    return;
  }

  let borrowDate = new Date();
  let dueDate = new Date();
  dueDate.setDate(borrowDate.getDate() + 14);

  let stu = students.find(s => s.regNo === studentReg);

  let newBorrow = {
    id: "BRW-" + Date.now(),
    bookTitle: books[bookIdx].title,
    bookAuthor: books[bookIdx].author,
    studentName: stu.name,
    studentReg: studentReg,
    date: generateStrictDMYDate(borrowDate), 
    dueDate: generateStrictDMYDate(dueDate),
    returnDate: null,
    status: "borrowed",
    returned: false,
    fine: "0.00"
  };

  borrows.push(newBorrow);
  saveBorrows(borrows);

  books[bookIdx].borrowed = true;
  books[bookIdx].borrowedBy = studentReg;
  books[bookIdx].borrowedByName = stu.name;
  saveBooks(books);

  syncDashboard();

  notify(`Issued. Due on: ${generateStrictDMYDate(dueDate)}`);
  closeBorrowModal();
  renderBorrows();
};

function delBorrow(idx) {
  if (confirm("Delete this borrow record permanently from ledger?")) {
    let borrows = loadBorrows(), books = loadBooks();
    let b = borrows[idx];
    
    let bookIdx = books.findIndex(x => x.title === b.bookTitle && x.author === b.bookAuthor && x.borrowedBy === b.studentReg);
    if (bookIdx !== -1) {
      books[bookIdx].borrowed = false;
      books[bookIdx].borrowedBy = null;
      books[bookIdx].borrowedByName = null;
      saveBooks(books);
    }
    
    borrows.splice(idx, 1);
    saveBorrows(borrows);
    
    syncDashboard();
    renderBorrows();
    notify("Ledger record execution canceled.", "info");
  }
}

window.onload = function() {
  if(localStorage.getItem('borrows') === null) {
      seedInitialData(); 
  }
  
  renderBorrows();
};

function notify(msg, type = 'success') {
  let n = document.getElementById('notification');
  if (!n) return;
  let toast = document.createElement('div');
  toast.className = 'toast ' + (type === 'error' ? 'danger' : type);
  toast.innerHTML = msg;
  n.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 2400);
}