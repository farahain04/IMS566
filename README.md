# IMS566
LibFlow - Library Management System (IMS566 Project)

This project is a web-based Library Management System (LMS) designed to simplify the daily operations of a library. I built this to solve the problem of manual record-keeping, allowing librarians to easily manage book inventory, track student borrowing/returning, and view dashboard statistics. It is a client-side web application, meaning it runs entirely in the browser using `localStorage` to save your data.

Key Features:
- User Authentication: Secure login and registration system with role-based access (Admin vs. Librarian).
- Dashboard: A visual hub displaying key metrics like total books, active loans, and overdue items using charts.
- Inventory Management (CRUD):
  - Add new books to the system.
  - Edit existing book details.
  - Remove books from inventory.
- Transaction Tracking:
  - Log new borrow requests.
  - Process book returns.
  - View real-time status of books (Available/Borrowed/Returned).
- Dark Mode: A toggleable theme for better accessibility and user preference.
- Responsive Design: Optimized for mobile, tablet, and desktop screens.

How to Test the Login:
1. Open index.html in your browser.
2. If you haven't registered yet, click "Create Account" and fill in the details.
3. If registering as an Admin, use the secret passcode: libAdmin2026
4. Once registered, log in using your created credentials.
5. If you forgot the password, you can make new password 

Frameworks & Libraries Used:
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+).
- Charts: Canvas-based chart rendering (Chart.js)
- Animations: Vanta.js (Clouds effect) and Three.js for the login/registration background.
- Icons: FontAwesome and Bootstrap Icons for the UI.
- Storage: Web Browser `localStorage` (handles data persistence without a backend).

Known Issues & Troubleshooting:
- Data Persistence: Because this uses `localStorage`, if you clear your browser cache, all book and user data will be wiped.
- Broken Layout: If the sidebar or tables look weird after an update, try refreshing the page; the CSS handles mobile breakpoints automatically.


Created by Farah Ain binti Mohd Padzli (2025143537)
