import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createModule } from '../features/modules/moduleSlice'

function ModuleForm() {
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
          <label htmlFor='grade'>Grade (Eg: A, B+)</label>
          <input
            type='grade'
            name='grade'
            id='grade'
            value={grade}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Module
          </button>
        </div>
      </form>
    </section>
  )
}

export default ModuleForm
