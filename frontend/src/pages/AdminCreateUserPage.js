import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { createNewUser } from '../actions/userActions'
import { USER_CREATE_RESET } from '../constants/userConstants'

const AdminCreateUserPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState(null)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userCreate = useSelector(state => state.userCreate)
  const { loading, success, error } = userCreate


  useEffect(() => {
    if(success){
      dispatch({ type: USER_CREATE_RESET })
      navigate('/tiny-admin/users')
    }
    if(!userInfo || userInfo.data.user.role !== 'admin'){
      navigate('/login')
    }
  }, [navigate, userInfo, success, dispatch])

  

  const submitHandler = (e) => {
    e.preventDefault()
    if(!name || !email){
      setMessage('Please fill all fields')
    }else{
      dispatch(createNewUser({ name, email, password, passwordConfirm, active }))
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
      setActive(false)
    }
  }
  return (
    <>
      <div className="row g5">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>Create New User</h1>
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
            <input 
              type='email'
              className="form-control" 
              placeholder="New user's email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <label htmlFor="body">User's email</label>
          </div>
          <div className="form-floating mb-3">
            <input 
              type='password'
              className="form-control" 
              placeholder="New user's password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <label htmlFor="body">User's password</label>
          </div>
          <div className="form-floating mb-3">
            <input 
              type='password'
              className="form-control" 
              placeholder="Enter password again" 
              id="passwordConfirm" 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            <label htmlFor="body">User's password confirmation</label>
          </div>
          <div className="form-check mb-3">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="active" 
              checked={active}
              onChange={(e) => setActive(e.target.checked)} />
            <label className="form-check-label" htmlFor="active">
              Active ?
            </label>
          </div>
          
          <button type='submit' className='btn btn-primary me-3'>Create User</button>
          </form>
        </div>
      </div>
    </>
  )
}




export default AdminCreateUserPage
