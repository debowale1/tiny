import axios from 'axios'
import { showAlert } from './alert'

export const createPost = async(title, body, category, image) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/posts',
      data: {
        title,
        body,
        category,
        image
      }
    })

    if(res.data.status === 'success')
      showAlert()
    
  } catch (error) {
    showAlert('danger', error.response.data)
  }
}