import { useState, useEffect } from 'react'
import AddModule from '../components/AddModule'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import UpdateMajor from '../components/UpdateMajor'


function Settings() {

  return (
    <>
      <UpdateMajor />

        <p>-------------------------------------------------------------------------</p>

      <AddModule />
  
    </>
  )
}

export default Settings