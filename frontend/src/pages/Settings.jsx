import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Settings() {

  const [formData, setFormData] = useState({
    module: '',
    grade: '',
  })

  const { module, grade } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <section className='heading'>
        <p>Select your major </p>
      </section>

      <div>
          <label for="major">Major </label>

          <select name="major" id="major">
            <option value="BZA">BZA</option>
            <option value="CS">CS</option>
            <option value="IS">IS</option>
            <option value="CEG">CEG</option>
          </select>
        </div>

        <p>---------------------------------</p>

        <section className='heading'>
        
        <p>Add your past modules</p>
      </section>

      <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='module'
              name='module'
              value={module}
              placeholder='Module Code'
              onChange={onChange}
            />
        </div>
        <div>
          <label for="major">Grade </label>

          <select name="major" id="major">
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
          </select>
        </div>
        <div className='form-group'>
            <button type='submit' className='btn'>
              Update
            </button>
          </div>

  
    </>
  )
}

export default Settings