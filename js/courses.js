requireAuth(['admin','user']);
let editCourseIdx = null;

function loadCourses() {
  return JSON.parse(localStorage.getItem('courses')||'[]');
}

function saveCourses(arr) {
  localStorage.setItem('courses', JSON.stringify(arr));
}

function renderCourses() {
  let tbody = document.querySelector("#courseTable tbody");
  if (!tbody) return;

  let arr = loadCourses();
  let searchInput = document.getElementById('searchCourse');
  let filter = searchInput ? searchInput.value.toLowerCase() : '';
  let showArr = arr.filter(c => c.toLowerCase().includes(filter));
  
  const isAdmin = getCurrentUser().role === 'admin';
  tbody.innerHTML = '';
  
  if(showArr.length === 0) {
    let cols = isAdmin ? 3 : 2;
    tbody.innerHTML = `<tr><td colspan="${cols}" style="text-align:center;"><i>No courses found.</i></td></tr>`;
    return;
  }
  
  showArr.forEach((c, i) => {
    let idx = arr.indexOf(c);
    
    tbody.innerHTML += `
      <tr>
        <td style="text-align: center;">${i + 1}.</td>
        <td>${c}</td>
        <td class="admin-only" style="white-space: nowrap;">
          <div class="action-btns" style="display: flex; gap: 8px; justify-content: flex-start;">
            <button class="edit" onclick="openCourseModal(${idx})"><i class="fas fa-edit"></i> Edit</button>
            <button class="del" onclick="delCourse(${idx})"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>`;
  });
  
  if(!isAdmin) {
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    let addBtn = document.getElementById('addCourseBtn');
    if(addBtn) addBtn.style.display = 'none';
  } else {
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
    let addBtn = document.getElementById('addCourseBtn');
    if(addBtn) addBtn.style.display = '';
  }
}

function openCourseModal(idx) {
  document.getElementById('courseModal').classList.add('show');
  document.body.style.overflow = 'hidden';
  
  editCourseIdx = (typeof idx === 'number') ? idx : null;
  
  const titleEl = document.getElementById('courseFormTitle');
  const inputEl = document.getElementById('courseName');
  
  if (editCourseIdx === null) {
    titleEl.textContent = "Add Course";
    inputEl.value = '';
  } else {
    titleEl.textContent = "Edit Course";
    inputEl.value = loadCourses()[editCourseIdx];
  }
}

function closeCourseModal() {
  document.getElementById('courseModal').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('courseForm').reset();
  editCourseIdx = null;
}

function delCourse(idx) {
  let arr = loadCourses();
  if(arr.length === 1) {
    notify("Cannot delete last course!", "error");
    return;
  }
  let delName = arr[idx];
  
  let students = JSON.parse(localStorage.getItem('students')||'[]');
  if(students.some(s => s.course === delName)) {
    notify("Cannot delete: In use by students.", "error");
    return;
  }
  
  if(confirm(`Delete "${delName}" forever?`)) {
    arr.splice(idx, 1);
    saveCourses(arr);
    renderCourses();
    notify("Course deleted.", "info");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem('courses') === null) {
    seedInitialData(); 
  }
  
  renderCourses();

  const searchInp = document.getElementById('searchCourse');
  if(searchInp) searchInp.oninput = renderCourses;

  const formEl = document.getElementById('courseForm');
  if(formEl) {
    formEl.onsubmit = function(e) {
      e.preventDefault();
      let arr = loadCourses();
      let name = document.getElementById('courseName').value.trim();
      
      if(!name) {
        notify("Course required.", "error");
        return;
      }
      
      if(arr.some((c, i) => c.toLowerCase() === name.toLowerCase() && i !== editCourseIdx)){
        notify("Course already exists", "error");
        return;
      }
      
      if(editCourseIdx === null) {
        arr.push(name);
        saveCourses(arr);
        notify("Course added successfully!");
      } else {
        let old = arr[editCourseIdx];
        arr[editCourseIdx] = name;
        
        let students = JSON.parse(localStorage.getItem('students')||'[]');
        students.forEach(s => {
          if(s.course === old) s.course = name;
        });
        localStorage.setItem('students', JSON.stringify(students));
        
        saveCourses(arr);
        notify("Course updated successfully!");
      }
      
      closeCourseModal();
      renderCourses();
    }
  }
});

function notify(msg, type='success') {
  let n = document.getElementById('notification');
  if(!n) return;
  let toast = document.createElement('div');
  toast.className = 'toast ' + (type==='error'?'danger':type);
  toast.innerHTML = msg;
  n.appendChild(toast);
  setTimeout(()=>{ toast.remove(); }, 2400);
}

window.openCourseModal = openCourseModal;
window.closeCourseModal = closeCourseModal;
window.delCourse = delCourse;