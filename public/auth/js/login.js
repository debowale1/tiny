const login = async (email, password) => {
    try {
      const res = await axios({
          method: "POST",
          url: `http://127.0.0.1:2021/api/v1/users/login`,
          data: {
              email,
              password
          }
      });
      if (res.data.status === 'success'){
        alert('log in successful')
        location.assign('/')
      }
    } catch (error) {
      console.log(error.response.data);
    }
};

document.querySelector('.loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    login(email, password);
})