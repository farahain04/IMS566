function seedInitialData() {
  if (localStorage.getItem('books') !== null) return;

  console.log("Seeding initial library data...");

  // 1. Seed Books
  localStorage.setItem('books', JSON.stringify([
    { title: "Systems Analysis and Design", author: "Kenneth E. Kendall", category: "Information Management", year: "2020", borrowed: false, borrowedBy: null, borrowedByName: null },
    { title: "Introduction to Computer Science", author: "Thomas H. Cormen", category: "Computer Science", year: "2022", borrowed: false, borrowedBy: null, borrowedByName: null },
    { title: "Cybersecurity Essentials", author: "Charles J. Brooks", category: "Cybersecurity", year: "2021", borrowed: false, borrowedBy: null, borrowedByName: null },
    { title: "Knowledge Management Systems", author: "Stuart Barnes", category: "Information Management", year: "2020", borrowed: true, borrowedBy: "S001", borrowedByName: "Ahmad Fakhrul Bin Rosli" }, // MATCH BR012
    { title: "Practical Data Science with R", author: "Nina Zumel", category: "Data Science", year: "2023", borrowed: false, borrowedBy: null, borrowedByName: null },
    { title: "Academic Writing and Research", author: "John Swales", category: "General Education", year: "2019", borrowed: false, borrowedBy: null, borrowedByName: null },
    { title: "Computer Networking Global Edition", author: "James Kurose", category: "Computer Science", year: "2021", borrowed: true, borrowedBy: "S003", borrowedByName: "Muhammad Farhan Bin Izham" }, // MATCH BR009
    { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "Artificial Intelligence", year: "2021", borrowed: true, borrowedBy: "S006", borrowedByName: "Khairul Amrin Bin Mohd Azmi" }, // MATCH BR010
    { title: "Records and Information Management", author: "Patricia C. Franks", category: "Information Management", year: "2020", borrowed: false, borrowedBy: null, borrowedByName: null },
    { title: "Cloud Computing Architecture", author: "Thomas Erl", category: "Computer Science", year: "2023", borrowed: true, borrowedBy: "S008", borrowedByName: "Adam Harith Bin Norizan" }, // MATCH BR011
    { title: "Strategic Management in Information Services", author: "David Baker", category: "Strategic Management", year: "2022", borrowed: false, borrowedBy: null, borrowedByName: null },
    { title: "Introduction to Python for Data Analytics", author: "Daniel Y. Chen", category: "Data Science", year: "2021", borrowed: false, borrowedBy: null, borrowedByName: null }
  ]));

  // 2. Seed Students
  localStorage.setItem('students', JSON.stringify([
      { id: "S001", name: "Ahmad Fakhrul Bin Rosli", regNo: "2024123456", course: "CDIM263 - Bachelor of Information Science (Hons.) Content Management" },
      { id: "S002", name: "Nurul Shuhada Binti Mohd Zaki", regNo: "2024987654", course: "CS240 - Bachelor of Information Technology (Hons.)" },
      { id: "S003", name: "Muhammad Farhan Bin Izham", regNo: "2023451298", course: "CS255 - Bachelor of Computer Science (Hons.) Computer Networks" },
      { id: "S004", name: "Siti Nuraisyah Binti Abdullah", regNo: "2025881234", course: "CDIM260 - Bachelor of Information Science (Hons.) Library Management" },
      { id: "S005", name: "Arif Daniel Bin Kamaruddin", regNo: "2024667123", course: "CS245 - Bachelor of Computer Science (Hons.) Data Science" },
      { id: "S006", name: "Khairul Amrin Bin Mohd Azmi", regNo: "2023114562", course: "CS270 - Bachelor of Computer Science (Hons.) Creative IT" },
      { id: "S007", name: "Farah Adriana Binti Hisham", regNo: "2024552198", course: "CDIM261 - Bachelor of Information Science (Hons.) Records Management" },
      { id: "S008", name: "Adam Harith Bin Norizan", regNo: "2025993412", course: "CS240 - Bachelor of Information Technology (Hons.)" },
      { id: "S009", name: "Anis Maisarah Binti Zulkifli", regNo: "2024228743", course: "CDIM263 - Bachelor of Information Science (Hons.) Content Management" },
      { id: "S010", name: "Daniel Asyraf Bin Shahrul", regNo: "2023774156", course: "CS255 - Bachelor of Computer Science (Hons.) Computer Networks" }
  ]));

  // 3. Seed Borrows
  localStorage.setItem('borrows', JSON.stringify([
      { id: "BR001", bookTitle: "Academic Writing and Research", bookAuthor: "John Swales", studentName: "Farah Adriana Binti Hisham", studentReg: "2024552198", date: "05/01/2026", dueDate: "19/01/2026", returnDate: "17/01/2026", returned: true, status: "returned", fine: "0.00" },
      { id: "BR002", bookTitle: "Introduction to Computer Science", bookAuthor: "Thomas H. Cormen", studentName: "Nurul Shuhada Binti Mohd Zaki", studentReg: "2024987654", date: "12/01/2026", dueDate: "26/01/2026", returnDate: "26/01/2026", returned: true, status: "returned", fine: "0.00" },
      { id: "BR003", bookTitle: "Practical Data Science with R", bookAuthor: "Nina Zumel", studentName: "Anis Maisarah Binti Zulkifli", studentReg: "2024228743", date: "02/02/2026", dueDate: "16/02/2026", returnDate: "15/02/2026", returned: true, status: "returned", fine: "0.00" },
      { id: "BR004", bookTitle: "Records and Information Management", bookAuthor: "Patricia C. Franks", studentName: "Daniel Asyraf Bin Shahrul", studentReg: "2023774156", date: "15/02/2026", dueDate: "01/03/2026", returnDate: "04/03/2026", returned: true, status: "returned", fine: "1.50" },
      { id: "BR005", bookTitle: "Cybersecurity Essentials", bookAuthor: "Charles J. Brooks", studentName: "Arif Daniel Bin Kamaruddin", studentReg: "2024667123", date: "04/03/2026", dueDate: "18/03/2026", returnDate: "18/03/2026", returned: true, status: "returned", fine: "0.00" },
      { id: "BR006", bookTitle: "Introduction to Python for Data Analytics", bookAuthor: "Daniel Y. Chen", studentName: "Adam Harith Bin Norizan", studentReg: "2025993412", date: "20/03/2026", dueDate: "03/04/2026", returnDate: "01/04/2026", returned: true, status: "returned", fine: "0.00" },
      { id: "BR007", bookTitle: "Systems Analysis and Design", bookAuthor: "Kenneth E. Kendall", studentName: "Siti Nuraisyah Binti Abdullah", studentReg: "2025881234", date: "08/04/2026", dueDate: "22/04/2026", returnDate: "20/04/2026", returned: true, status: "returned", fine: "0.00" },
      { id: "BR008", bookTitle: "Strategic Management in Information Services", bookAuthor: "David Baker", studentName: "Khairul Amrin Bin Mohd Azmi", studentReg: "2023114562", date: "15/04/2026", dueDate: "29/04/2026", returnDate: "02/05/2026", returned: true, status: "returned", fine: "1.50" },
      { id: "BR009", bookTitle: "Computer Networking Global Edition", bookAuthor: "James Kurose", studentName: "Muhammad Farhan Bin Izham", studentReg: "2023451298", date: "10/05/2026", dueDate: "24/05/2026", returnDate: null, returned: false, status: "borrowed", fine: "0.00" },
      { id: "BR010", bookTitle: "Artificial Intelligence: A Modern Approach", bookAuthor: "Stuart Russell", studentName: "Khairul Amrin Bin Mohd Azmi", studentReg: "2023114562", date: "12/05/2026", dueDate: "26/05/2026", returnDate: null, returned: false, status: "borrowed", fine: "0.00" },
      { id: "BR011", bookTitle: "Cloud Computing Architecture", bookAuthor: "Thomas Erl", studentName: "Adam Harith Bin Norizan", studentReg: "2025993412", date: "18/05/2026", dueDate: "01/06/2026", returnDate: null, returned: false, status: "borrowed", fine: "0.00" },
      { id: "BR012", bookTitle: "Knowledge Management Systems", bookAuthor: "Stuart Barnes", studentName: "Ahmad Fakhrul Bin Rosli", studentReg: "2024123456", date: "19/05/2026", dueDate: "02/06/2026", returnDate: null, returned: false, status: "borrowed", fine: "0.00" }
  ]));

  // 4. Seed Returns
  localStorage.setItem('returns', JSON.stringify([
      { id: "RT001", returnDate: "17/01/2026", bookTitle: "Academic Writing and Research", bookAuthor: "John Swales", studentName: "Farah Adriana Binti Hisham", studentReg: "2024552198", dueDate: "19/01/2026", fine: "0.00" },
      { id: "RT002", returnDate: "26/01/2026", bookTitle: "Introduction to Computer Science", bookAuthor: "Thomas H. Cormen", studentName: "Nurul Shuhada Binti Mohd Zaki", studentReg: "2024987654", dueDate: "26/01/2026", fine: "0.00" },
      { id: "RT003", returnDate: "15/02/2026", bookTitle: "Practical Data Science with R", bookAuthor: "Nina Zumel", studentName: "Anis Maisarah Binti Zulkifli", studentReg: "2024228743", dueDate: "16/02/2026", fine: "0.00" },
      { id: "RT004", returnDate: "04/03/2026", bookTitle: "Records and Information Management", bookAuthor: "Patricia C. Franks", studentName: "Daniel Asyraf Bin Shahrul", studentReg: "2023774156", dueDate: "01/03/2026", fine: "1.50" },
      { id: "RT005", returnDate: "18/03/2026", bookTitle: "Cybersecurity Essentials", bookAuthor: "Charles J. Brooks", studentName: "Arif Daniel Bin Kamaruddin", studentReg: "2024667123", dueDate: "18/03/2026", fine: "0.00" },
      { id: "RT006", returnDate: "01/04/2026", bookTitle: "Introduction to Python for Data Analytics", bookAuthor: "Daniel Y. Chen", studentName: "Adam Harith Bin Norizan", studentReg: "2025993412", dueDate: "03/04/2026", fine: "0.00" },
      { id: "RT007", returnDate: "20/04/2026", bookTitle: "Systems Analysis and Design", bookAuthor: "Kenneth E. Kendall", studentName: "Siti Nuraisyah Binti Abdullah", studentReg: "2025881234", dueDate: "22/04/2026", fine: "0.00" },
      { id: "RT008", returnDate: "02/05/2026", bookTitle: "Strategic Management in Information Services", bookAuthor: "David Baker", studentName: "Khairul Amrin Bin Mohd Azmi", studentReg: "2023114562", dueDate: "29/04/2026", fine: "1.50" }
    ]));


  // 5. Seed Categories & Courses
  localStorage.setItem('categories', JSON.stringify([
      { id: "T", name: "Technology (General)" },
      { id: "Q", name: "Science (General)" },
      { id: "QA", name: "Mathematics. Computer Science" },
      { id: "Z", name: "Bibliography. Library Science" },
      { id: "ZA", name: "Information Resources (General)" },
      { id: "H", name: "Social Sciences" },
      { id: "HD", name: "Industries. Land use. Labor management" }
  ]));
  localStorage.setItem('courses', JSON.stringify([
      "CDIM260 - Bachelor of Information Science (Hons.) Library Management",
      "CDIM262 - Bachelor of Information Science (Hons.) Information Systems Management",
      "CDIM261 - Bachelor of Information Science (Hons.) Records Management",
      "CDIM263 - Bachelor of Information Science (Hons.) Content Management",
      "CS240 - Bachelor of Information Technology (Hons.)",
      "CS245 - Bachelor of Computer Science (Hons.) Data Science",
      "CS255 - Bachelor of Computer Science (Hons.) Computer Networks",
      "CS270 - Bachelor of Computer Science (Hons.) Creative IT"
    ]));


window.dispatchEvent(new Event('DataSeeded'));
}

seedInitialData();