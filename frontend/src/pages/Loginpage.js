import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { login } from '../actions/userActions'
import Message from '../components/Message'

const Loginpage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const {loading, userInfo, error } = userLogin

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
    navigate('/')
    
  }

  return (
    <>
     <form className='form-signin' method='post' onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        {loading && <Spinner />}
        {error && <Message>{error}</Message> }
        <div className="form-floating">
          <input 
            type="email" 
            className="form-control" 
            id="floatingInput" 
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input 
            type="password" 
            className="form-control" 
            id="floatingPassword" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
      </form> 
    </>
  )
}

export default Loginpage
