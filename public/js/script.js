import '@babel/polyfill'
import { login, logout, register } from './auth'
import { updateData } from './updateSettings'

const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')
const logoutBtn = document.getElementById('logout')
const updateDataForm = document.getElementById('updateDataForm')

if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    login(email, password)
  })

}

if(registerForm){
  registerForm.addEventListener('submit', e => {
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


if(updateDataForm){
  updateDataForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    updateData(name, email)

  })
}

