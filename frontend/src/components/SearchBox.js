import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()){
      navigate(`/search/${keyword}`)
    }else{
      navigate('/')
    }
  }
  return (
    <form className="d-flex" onSubmit={submitHandler} >
      <input 
        name='q' 
        className="form-control me-sm-2" 
        type="text" 
        placeholder="Search Posts" 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </form>
  )
}

export default SearchBox
