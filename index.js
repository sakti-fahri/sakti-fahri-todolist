function login() {
  event.preventDefault()

  const username = document.getElementById('signinForm').value
  const password = document.getElementById('passwordForm').value

  if (username == 'impactbyte' && password == 'byte') {
    alert('Login Succesfully')
    window.location = 'app.html'
  } else {
    alert('Wrong username or password. Please try again.')
    document.getElementById('signinForm').value = ''
    document.getElementById('passwordForm').value = ''
  }
}
