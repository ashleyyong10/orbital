import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ModuleItem from '../components/ModuleItem'
import Spinner from '../components/Spinner'
import { getModules, reset } from '../features/modules/moduleSlice'

function CoreMods() {
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
    
    <section className='content'>
        {(modules.filter((x) => x.type == "Core")).length > 0 ? (
          <>
          <section className='heading'>
              <p>You have completed: </p>
          </section>
          <div className='modules'>
            {modules.map((module) => (
              <ModuleItem key={module._id} module={module} />
            ))}
          </div>
          </>
        ) : (
          <h3>You have not completed any core modules</h3>
        )}
      </section>

    </>
    
  )
}

export default CoreMods
