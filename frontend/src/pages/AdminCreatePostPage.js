import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { createNewPost } from '../actions/postActions'

const AdminCreatePostPage = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [snippet, setSnippet] = useState('')
  const [category, setCategory] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)


  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const fetchCategories = useSelector(store => store.fetchCategories)
  const { categories } = fetchCategories

  const createPost = useSelector(store => store.createPost)
  const { loading, success, error, post } = createPost


  useEffect(() => {
    if(!userInfo || userInfo.data.user.role !== 'admin'){
      navigate('/login')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createNewPost({title, body, snippet, isFeatured, category }))
  }
  return (
    <>
      <div className="row g5">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>Create New Post</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error.message}</Message>}
          {success && <Message variant='success'>Post created Successfully!</Message>}
          <form onSubmit={submitHandler} >
          <div className="form-floating mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              placeholder="title of post"
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="title">Title</label>
          </div>
          {/* <div className="form-floating mb-3">
            <textarea 
              className="form-control" 
              placeholder="Start Writing" 
              // id="body" 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              />
            <label htmlFor="body">Body</label>
          </div> */}
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          <div className="form-floating mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="snippet" 
              placeholder="Snippet"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)} />
            <label htmlFor="snippet">Snippet</label>
          </div>
          <select className="form-select mb-3" aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value=''>--Category--</option>
            {categories?.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
          </select>
          <div className="form-check mb-3">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="isFeatured" 
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)} />
            <label className="form-check-label" htmlFor="isFeatured">
              Featured ?
            </label>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="image" className="form-label">Select Image</label>
            <input className="form-control" type="file" id="image"/>
          </div> */}
          <button type='submit' className='btn btn-primary me-3'>Submit</button>
          {/* <button type='submit' className='btn btn-outline-primary'>Save Darft</button> */}
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminCreatePostPage
