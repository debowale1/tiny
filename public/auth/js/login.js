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

const logout = async () => {
    try {
      const res = await axios({
          method: "GET",
          url: `http://127.0.0.1:2021/api/v1/users/logout`,
      });
      if (res.data.status === 'success'){
        alert('log out successful')
        window.location.href= '/';
      }
    } catch (error) {
      console.log(error);
    }
};

const loginForm = document.querySelector('.loginForm');
const logoutBtn = document.querySelector('.logout');

if(loginForm){
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    login(email, password);
  });
}

if(logoutBtn){
  logoutBtn.addEventListener('click', function(e){
    e.preventDefault();
    logout();
  });
}
