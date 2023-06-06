import { useDispatch } from 'react-redux'
import { deleteModule } from '../features/modules/moduleSlice'

function ModuleItem({ module }) {
  const dispatch = useDispatch()

  return (
    <div className='module'>
      <h1>{module.text}</h1>
      <h4>Grade: {module.grade}</h4>

      <button onClick={() => dispatch(deleteModule(module._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default ModuleItem
