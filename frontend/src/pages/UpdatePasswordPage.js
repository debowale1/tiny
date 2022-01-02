import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateMyPassword } from '../actions/userActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'


const UpdatePasswordPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdatePassword = useSelector(state => state.userUpdatePassword)
  const { loading:loadingUpdatePassword, success, error: errorUpdatePassword } = userUpdatePassword

  useEffect(() => {
    // if no user is logged in
    if(!userInfo){
      navigate('/login')
    }else{
      if(!user?.name){
        dispatch(getUserDetails())
      }
    }
  }, [userInfo, user, dispatch, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateMyPassword({currentPassword, password, confirmPassword}))
  }

  return (
    <div>
      <div className="row g5">
          <div className="col-md-8">
            { loading && <Spinner /> }
            { loadingUpdatePassword && <Spinner /> }
            { error && <Message variant='danger'>{error}</Message> }
            { errorUpdatePassword && <Message variant='danger'>{error}</Message> }
            { success && <Message variant='success'>Password Updated</Message> }
            <form method="post" onSubmit={submitHandler}>
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingName" 
                  placeholder="Name"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                <label htmlFor="floatingName">Current Password</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="newpassword" 
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value) } />
                <label htmlFor="newpassword">New Password</label>
              </div>
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmnewPassword" 
                  placeholder="COnfirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value) } />
                <label htmlFor="confirmnewPassword">Confirm Password</label>
              </div>
              <button type='submit' className='btn btn-primary btn-block'>Update Password</button>
            </form>
            
          </div>
          {/* <div className="col-md-4">
            main
          </div> */}
        </div>
    </div>
  )
}

export default UpdatePasswordPage
