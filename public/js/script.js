import '@babel/polyfill'
import { login, logout } from './auth'

const loginForm = document.getElementById('loginForm')
const logoutBtn = document.getElementById('logout')

if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    login(email, password)
  })

}

if(logoutBtn){
  logoutBtn.addEventListener('click', logout)
}
