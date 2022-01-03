import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { createNewCategory } from '../actions/categoryActions'
import { CREATE_CATEGORY_RESET } from '../constants/categoryConstants'

const AdminCreateCategoryPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState(null)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const createCategory = useSelector(store => store.createCategory)
  const { loading, success, error } = createCategory


  useEffect(() => {
    if(success){
      dispatch({ type: CREATE_CATEGORY_RESET })
      navigate('/tiny-admin/categories')
    }
    if(!userInfo || userInfo.data.user.role !== 'admin'){
      navigate('/login')
    }
  }, [navigate, userInfo, success, dispatch])

  

  const submitHandler = (e) => {
    e.preventDefault()
    if(!name || !description){
      setMessage('Please fill all fields')
    }else{
      dispatch(createNewCategory({ name, description }))
      setName('')
      setDescription('')
    }
  }
  return (
    <>
      <div className="row g5">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>Create New Category</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error.message}</Message>}
          {message && <Message variant='danger'>{message}</Message>}
          {success && <Message variant='success'>Category created Successfully!</Message>}
          <form onSubmit={submitHandler} >
          <div className="form-floating mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <textarea 
              className="form-control" 
              placeholder="category description" 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
            <label htmlFor="body">Description</label>
          </div>
          
          <button type='submit' className='btn btn-primary me-3'>Create Category</button>
          {/* <button type='submit' className='btn btn-outline-primary'>Save Darft</button> */}
          </form>
        </div>
      </div>
    </>
  )
}




export default AdminCreateCategoryPage
