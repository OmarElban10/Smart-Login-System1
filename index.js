
const usersDB = JSON.parse(localStorage.getItem('users')) || [];

//login oage
function showLoginPage() {
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('navbar').style.display = 'none';
}

// display login page 
function showRegisterPage() {
  document.getElementById('registerPage').style.display = 'block';
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('navbar').style.display = 'none';
}

// login
function registerUser() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (!validateEmail(email)) {
    alert('Invalid email');
    return;
  }

  if (usersDB.some(user => user.email === email)) {
    alert('This email is already in use, please use another email.');
    return;
  }


  usersDB.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(usersDB));
  alert('Registration successfully! Now you can log in .');
  showLoginPage();
}

// login.

function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;


  const user = usersDB.find(user => user.email === email && user.password === password);

  if (user) {
    // Save active user in local storage.

    localStorage.setItem('activeUser', JSON.stringify(user));
    showHomePage(user.name);
  } else {
    alert('Invalid email or password .');
  }
}

// home page .

function showHomePage(userName) {
  document.getElementById('registerPage').style.display = 'none';
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('homePage').style.display = 'block';
  document.getElementById('navbar').style.display = 'block';

  document.getElementById('userName').textContent = userName;
}

// log out .

function logoutUser() {
  localStorage.removeItem('activeUser');
  showLoginPage();
}

// Verify email .

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Check if there is an active user .

window.onload = function () {
  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  if (activeUser) {
    showHomePage(activeUser.name);
  } else {
    showLoginPage();
  }
}
