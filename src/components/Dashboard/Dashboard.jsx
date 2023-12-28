import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'wouter'
import { useStateStore } from '../../store'

import { Navbar } from 'flowbite-react'
import { useSubject } from '../../hooks/useSubject'
import Badge from './Badge'
import Subject from './Subject/Subject'
import SchoolBadge from './SchoolBadge'
import SchoolSite from './SchoolSite'

export default function Dashboard () {
  const [subjects, setSubjects] = useState([])
  const [location, setLocation] = useLocation()

  const { id } = useParams()
  const { subject } = useSubject(id)

  const user = useStateStore((state) => state.user)

  useEffect(() => {
    if (!user) setLocation('/login')

    const getSubjects = async () => {
      const response = await fetch('http://localhost:8080/subjects')
      const data = await response.json()
      const filterSubjects = data.filter(subject => {
        if (subject.id === 'site') return false
        else if (user.role === 'student') return subject.members.includes(user.dni)
        else if (user.role === 'lecturer') return subject.head === user.dni

        return true
      })
      setSubjects(filterSubjects)
    }
    getSubjects()
  }, [location])

  return (
    <div className='h-full w-full'>
      <Navbar fluid className="bg-gray-200 dark:bg-[#212528] h-[9%] pb-1 border-b-[1px] border-b-black">
        <div className="flex gap-2">
          <SchoolBadge />
          {subjects?.map((subject) => {
            return subject.id !== 'site' ? <Badge key={subject.id} subject={subject} selectedId={id}/> : null
          })}
        </div>
      </Navbar>
      <main className='h-[91%] w-full'>
      {
        id !== undefined ? <Subject subject={subject}/> : <SchoolSite />
      }
      </main>
    </div>
  )
}
