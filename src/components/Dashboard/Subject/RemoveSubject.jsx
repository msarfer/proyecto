import { Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useLocation, useParams } from 'wouter'
import { useStateStore } from '../../../store'

export default function RemoveSubject () {
  const { id } = useParams()
  const [location, setLocation] = useLocation()
  const user = useStateStore((state) => state.user)

  const handleRemove = async () => {
    await fetch(`http://localhost:8080/subjects/${id}`, {
      method: 'DELETE'
    })
    setLocation('/dashboard')
  }

  const handleCancel = () => {
    setLocation(`/dashboard/${id}`)
  }

  return (
    <div className='text-center bg-transparent h-full grid place-content-center'>
        {user.role === 'manager' &&
          <>
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14" />
          <h3 className="mb-5 text-lg font-normal">
            ¿Estas seguro de borrar la asignatura?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={handleRemove}>
              {'Sí, estoy seguro'}
            </Button>
            <Button color="indigo" onClick={handleCancel}>
              No
            </Button>
          </div>
          </>
        }
    </div>
  )
}
