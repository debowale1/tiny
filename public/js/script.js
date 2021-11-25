import '@babel/polyfill'
import { login, logout, register } from './auth'
import { updateData, updateUserPassword } from './updateSettings'
import { createPost, writeComment } from './posts'

const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')
const logoutBtn = document.getElementById('logout')
const updateDataForm = document.getElementById('updateDataForm')
const updatePasswordForm = document.getElementById('updatePasswordForm')
const addPostForm = document.getElementById('addPostForm')
const commentForm = document.getElementById('commentForm')

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

if(updatePasswordForm){
  updatePasswordForm.addEventListener('submit', e => {
    e.preventDefault()
    const currentPassword = document.querySelector('#passwordCurrent').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;
    console.log(currentPassword, password, passwordConfirm);
    updateUserPassword(currentPassword, password, passwordConfirm)
  })
}

if(addPostForm){
  addPostForm.addEventListener('submit', e => {
    e.preventDefault()
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const category = document.querySelector('#category').value;
    const tags = document.querySelector('#tags').value;
    console.log(title, body, category, tags)

    createPost(title, body, category, tags, image)
  })
}

if(commentForm){
  commentForm.addEventListener('submit', e => {
    e.preventDefault()
    const postId = document.querySelector('#postId').value;
    const comment = document.querySelector('#comment').value;
    writeComment(comment, postId)
    document.querySelector('#comment').value = '';
  })
}


let addTagsBtn = document.getElementById('addTagsBtn');
let tagList = document.querySelector('.tagList');
let tagDiv = document.querySelectorAll('.tagDiv')[0];

addTagsBtn.addEventListener('click', function(){
  let newTags = tagDiv.cloneNode(true);
  let input = newTags.getElementsByTagName('input')[0];
  input.value = '';
  tagList.appendChild(newTags);
});

