import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import { getMyDetails, updateUserProfile } from '../actions/userActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'


const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const userMyDetails = useSelector(state => state.userMyDetails)
  const { loading, error, user } = userMyDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    // if no user is logged in
    if(!userInfo){
      navigate('/login')
    }else{
      if(!user?.name){
        dispatch(getMyDetails())
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, user, dispatch, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({name, email}))
  }

  return (
    <div>
      <div className="row g5">
          <div className="col-md-12">
            { loading && <Spinner /> }
            { error && <Message variant='danger'>{error}</Message> }
            { success && <Message variant='success'>Profile Updated</Message> }
            <form method="post" onSubmit={submitHandler}>
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  id="floatingName" 
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
                <label htmlFor="floatingName">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="floatingInput" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value) } />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <button type='submit' className='btn btn-primary btn-block'>Update</button>
            </form>
            
          </div>
          {/* <div className="col-md-4">
            main
          </div> */}
        </div>
    </div>
  )
}

export default ProfilePage
