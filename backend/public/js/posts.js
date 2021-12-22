import axios from 'axios'
import { showAlert } from './alert'

export const createPost = async(title, body, category, tags, image) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/posts',
      data: {
        title,
        body,
        category,
        tags,
        image
      }
    })

    if(res.data.status === 'success')
      showAlert('success', 'New Post Added Successfully!')
    
  } catch (error) {
    showAlert('danger', error.response.data)
  }
}

export const writeComment = async (comment, postId) => {
  try {
    const res = await axios({
      url: `api/v1/posts/${postId}/comments`,
      method: "POST",
      data:{
        comment,
        postId
      }
    })

    if(res.data.status === 'success')
      showAlert('success', 'comment was successfully posted!')
  } catch (error) {
    showAlert('danger', error.response.data)
  }
}