import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createModule } from '../features/modules/moduleSlice'

function UpdateMajor() {
  const [formData, setFormData] = useState({
    text: '',
    grade: '',
  })

  const { text, grade } = formData

  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createModule({ text, grade }))
    setFormData({
      text: '',
      grade: '',
    })
  }


  return (
    <>
     <section className='heading'>
        <p>Update your major </p>
      </section>

      <section className='form'>
        <form onSubmit={() => {}}>
          
        <div className='form-group'>

            <select name= "major" id="major">
              <option value="" selected disabled hidden>Choose your major</option>
              <option value="BZA">BZA</option>
              <option value="CS">CS</option>
              <option value="IS">IS</option>
              <option value="CEG">CEG</option>
        </select>

        </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default UpdateMajor