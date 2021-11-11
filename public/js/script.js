import '@babel/polyfill'
import { login, logout, register } from './auth'

const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')
const logoutBtn = document.getElementById('logout')

if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    login(email, password)
  })

}

if(registerForm){
  document.addEventListener('submit', e => {
    e.preventDefault()
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    const passwordConfirm = document.querySelector('.passwordConfirm').value;
    register(name, email, password, passwordConfirm)
  })
}

if(logoutBtn){
  logoutBtn.addEventListener('click', logout)
}
