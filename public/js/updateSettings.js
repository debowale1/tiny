import axios from 'axios'
import { showAlert } from './alert'

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        name,
        email
      }
    })
    if(res.data.status === 'success'){
      showAlert('success', 'Data updated sucessfully!')
    }

  } catch (error) {
    console.log(error.response.data);
    showAlert('danger', error.response.data)
  }
}

export const updateUserPassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMyPassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm
      }
    })
    if(res.data.status === 'success'){
      showAlert('success', 'password updated successfully!')
    }
  } catch (error) {
    showAlert('danger', error.response.data.error)
  }
}