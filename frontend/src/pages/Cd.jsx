import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ModuleItem from '../components/ModuleItem'
import Spinner from '../components/Spinner'
import { getModules, reset } from '../features/modules/moduleSlice'

function Cd() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { modules, isLoading, isError, message } = useSelector(
    (state) => state.modules
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getModules())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
    <section className='heading'>
        <p>You have completed: </p>
    </section>

    
    <section className='content'>
        {(modules.filter((x) => x.type == "CD")).length > 0 ? (
          <div className='modules'>
            {modules.map((module) => (
              <ModuleItem key={module._id} module={module} />
            ))}
          </div>
        ) : (
          <h3>You have not completed any CD modules</h3>
        )}
      </section>

    </>
    
  )
}

export default Cd