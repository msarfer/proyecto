import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'wouter'
import { useStateStore } from '../../store'

import { Navbar } from 'flowbite-react'
import { useSubject } from '../../hooks/useSubject'
import Badge from './Badge'
import Subject from './Subject/Subject'

export default function Dashboard () {
  const [subjects, setSubjects] = useState([])
  const [location, setLocation] = useLocation()

  const { id } = useParams()
  const { subject } = useSubject(id)

  const user = useStateStore((state) => state.user)
  const setUser = useStateStore((state) => state.setUser)

  useEffect(() => {
    if (!user) setLocation('/login')

    fetch('http://localhost:8080/subjects')
      .then((res) => res.json())
      .then((data) => {
        const _subjects = data.filter(subject => {
          if (user.role === 'student') return subject.members.includes(user.dni)
          else if (user.role === 'lecturer') return subject.head === user.dni

          return true
        })
        setSubjects(_subjects)
      })
  }, [location])

  return (
    <div className='h-full'>
      <Navbar fluid className="bg-gray-200 dark:bg-[#212528] h-[8%] pb-1 border-b-[1px] border-b-black">
        <div className="flex gap-2">
          {subjects?.map((subject) => (
            <Badge key={subject.id} subject={subject} selectedId={id}/>
          ))}
        </div>
      </Navbar>
      <main className='h-[92%]'>
      {
        id !== undefined && <Subject subject={subject}/>
      }
      </main>
    </div>
  )
}
