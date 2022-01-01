import React, { useState, useEffect, useRef } from 'react'
import JoditEditor from "jodit-react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { fetchPost, updatePost } from '../actions/postActions'
import { UPDATE_POST_RESET } from '../constants/postConstants';


const AdminEditPostPage = () => {
  const editor = useRef(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [snippet, setSnippet] = useState('')
  const [category, setCategory] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)

  const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {id} = useParams()

  const fetchCategories = useSelector(store => store.fetchCategories)
  const { categories } = fetchCategories

  const fetchSinglePost = useSelector(store => store.fetchSinglePost)
  const { loading, error, post } = fetchSinglePost

  const postUpdate = useSelector(store => store.postUpdate)
  const { loading: loadingUpdate, success, error: errorUpdate } = postUpdate


  useEffect(() => {
    // if(!userInfo || userInfo.data.user.role !== 'admin'){
    if(success){
      dispatch({ type: UPDATE_POST_RESET })
      navigate('/tiny-admin/posts')
    }else{
      if(!post?.title || post?._id !== id){
        dispatch(fetchPost(id))
      }else{
        setTitle(post?.title)
        setContent(post?.body)
        setCategory(post?.category)
        setSnippet(post?.snippet)
        setIsFeatured(post?.isFeatured)
      }
    }
  }, [navigate, dispatch, id, post, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updatePost({_id: id, title, body: content, snippet, isFeatured, category}))
  }

  console.log(category.id);

  return (
    <>
     <div className="row g5">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>Update Post</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error.message}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate.message}</Message>}
          {/* {success && <Message variant='success'>Post Updated Successfully!</Message>} */}
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
              id="body" 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              />
            <label htmlFor="body">Body</label>
          </div> */}
          <JoditEditor
            	ref={editor}
              value={content}
              config={config}
		          tabIndex={1} // tabIndex of textarea
		          onBlur={newContent => setContent(newContent)} 
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
          <select 
            className="form-select mb-3" 
            aria-label="Category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.map(category => <option key={category._id}>{category.name}</option>)}
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
          <button type='submit' className='btn btn-primary me-3'>Update</button>
          {loadingUpdate && <Spinner />}
          </form>  
        </div> 
      </div>
    </>
  )
}

export default AdminEditPostPage
