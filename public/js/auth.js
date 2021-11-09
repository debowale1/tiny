import axios from 'axios'
import { showAlert } from './alert'

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:2021/api/v1/users/login',
      data: {
        email,
        password
      }
    })
    // console.log(res.data);
    if(res.data.status === 'success'){
      showAlert('success','successfully logged in!');
      setTimeout(() => {
        if(res.data.data.user.role === 'admin'){
          window.location.assign('/tiny-admin')
        }else{
          window.location.assign('/')
        }
      }, 1500)
    }
    // console.log(res);
  } catch (error) {
    // console.log(error.response);
    showAlert('danger', error.response.data.error);
  }
}

