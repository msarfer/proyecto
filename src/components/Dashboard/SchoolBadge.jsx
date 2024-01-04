import { Button } from 'flowbite-react'
import { useLocation, useRoute } from 'wouter'

export default function SchoolBadge () {
  const [location, setLocation] = useLocation()
  const [match, params] = useRoute('/dashboard')
  const [matchl, paramsl] = useRoute('/dashboard/lecturers')

  return (
    <Button
      color={match || matchl ? 'red' : 'gray'}
      onClick={() => setLocation('/dashboard')}
      size='xs'
    >
      <span className='dark:text-white'>Mi centro</span>
    </Button>
  )
}
