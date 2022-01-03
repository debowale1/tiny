import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants';


const AdminEditUserPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [active, setActive] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {id} = useParams()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, user, error } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading:loadingUpdate, success, error:errorUpdate } = userUpdate




  useEffect(() => {
    if(success){
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/tiny-admin/users')
    }else{
      if(!user?.name || user?._id !== id){
        dispatch(getUserDetails(id))
      }else{
        setName(user?.name)
        setEmail(user?.email)
        setRole(user?.role)
        setActive(user?.active)
      }
    }
  }, [navigate, dispatch, id, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id: id, name, email, role, active}))
  }


  return (
    <>
     <div className="row g5">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>Update User</h1>
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
              placeholder="user's name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <label htmlFor="title">User's Name</label>
          </div>
          <div className="form-floating mb-3">
            <input 
              type='email'
              className="form-control" 
              placeholder="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <label htmlFor="body">User's email</label>
          </div>          
          <div className="form-floating mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="role" 
              placeholder="role"
              value={role}
              onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="role">User's Role</label>
          </div>
          <div className="form-check mb-3">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="isActive" 
              checked={active}
              onChange={(e) => setActive(e.target.checked)} />
            <label className="form-check-label" htmlFor="isActive">
              Active ?
            </label>
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

export default AdminEditUserPage
