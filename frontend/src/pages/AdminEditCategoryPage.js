import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { getCategory, updateCategory } from '../actions/categoryActions'
import { UPDATE_CATEGORY_RESET } from '../constants/categoryConstants';


const AdminEditCategoryPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {id} = useParams()

  const fetchCategory = useSelector(store => store.fetchCategory)
  const { loading, category, error } = fetchCategory

  const categoryUpdate = useSelector(store => store.categoryUpdate)
  const { loading: loadingUpdate, success, error: errorUpdate } = categoryUpdate


  useEffect(() => {
    if(success){
      dispatch({ type: UPDATE_CATEGORY_RESET })
      navigate('/tiny-admin/categories')
    }else{
      if(!category?.name || category?._id !== id){
        dispatch(getCategory(id))
      }else{
        setName(category?.name)
        setDescription(category?.description)
        setSlug(category?.slug)
      }
    }
  }, [navigate, dispatch, id, category, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateCategory({_id: id, name, description, slug}))
  }


  return (
    <>
     <div className="row g5">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>Update Category</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error.message}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate.message}</Message>}
          {success && <Message variant='success'>Category Updated Successfully!</Message>}
          <form onSubmit={submitHandler} >
          <div className="form-floating mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              placeholder="category name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label htmlFor="title">Category Name</label>
          </div>
          <div className="form-floating mb-3">
            <textarea 
              className="form-control" 
              placeholder="Start Writing" 
              id="body" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
            <label htmlFor="body">Description</label>
          </div>          
          <div className="form-floating mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="snippet" 
              placeholder="Snippet"
              value={slug}
              onChange={(e) => setSlug(e.target.value)} />
            <label htmlFor="snippet">Slug</label>
          </div>
          <button type='submit' className='btn btn-primary me-3'>
            {loadingUpdate ? <Spinner /> : 'Update Category'}
          </button>
          </form>  
        </div> 
      </div>
    </>
  )
}

export default AdminEditCategoryPage
