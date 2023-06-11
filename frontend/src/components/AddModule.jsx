import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createModule } from '../features/modules/moduleSlice'

function AddModule() {
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
        <p>Add completed modules</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Module</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>

          <select name= "grade" id="grade" value={grade} onChange={onChange}>
            <option value="" disabled hidden>Select your grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
          </select>

        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Module
          </button>
        </div>
      </form>
    </section>
    </>
  )
}

export default AddModule
