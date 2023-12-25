import { Button } from 'flowbite-react'
import { useLocation, useRoute } from 'wouter'

export default function SchoolBadge () {
  const [location, setLocation] = useLocation()
  const [match, params] = useRoute('/dashboard')

  return (
    <Button
      color={match ? 'red' : 'gray'}
      onClick={() => setLocation('/dashboard')}
      size='xs'
    >
      <span className='dark:text-white'>Mi centro</span>
    </Button>
  )
}
