import '@babel/polyfill'
import { login } from './auth'

const loginForm = document.getElementById('loginForm')

if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    login(email, password)
  })

}
