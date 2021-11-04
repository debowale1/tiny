const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      // url: 'http://127.0.0.1:2021/api/v1/users/login',
      url: 'http://localhost:2021/api/v1/users/login',
      data: {
        email,
        password
      }
    })
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault()
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  login(email, password)
})