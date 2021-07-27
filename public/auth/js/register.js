document.querySelector('.registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;

  register(name, email, password, passwordConfirm);
});

const register = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'http://127.0.0.1:2021/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    })
    if(res.data.status === 'success') {
      alert('account created Successfully!')
      window.location.href = '/';
    };
  } catch (error) {
    console.log(error.response.data);
  }

}