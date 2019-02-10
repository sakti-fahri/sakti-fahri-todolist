function login() {
  let username = document.getElementById('signinForm').value;
  let password = document.getElementById('passwordForm').value;

  if (username == 'impactbyte' && password == 'byte') {
    alert('Login Succesfully');
    window.location = 'app.html';
  } else {
    alert('Wrong username or password. Please try again.');
  }
}
