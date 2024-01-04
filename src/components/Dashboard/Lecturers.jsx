import { Breadcrumb, Card, Kbd } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { Link, useLocation } from 'wouter'
import { useStateStore } from '../../store'

export default function Lecturers () {
  const [lecturers, setLecturers] = useState([])
  const [subjects, setSubjects] = useState([])
  const [location, setLocation] = useLocation()
  const user = useStateStore((state) => state.user)

  useEffect(() => {
    if (user.role !== 'lecturer') setLocation('/dashboard')
  }, [user])

  useEffect(() => {
    const getLecturers = async () => {
      const users = await fetch('http://localhost:8080/users').then(res => res.status === 200 ? res.json() : undefined)
      const lecturers = users.filter(user => user.role === 'lecturer')
      setLecturers(lecturers)
    }

    const getSubjects = async () => {
      const response = await fetch('http://localhost:8080/subjects')
      const data = await response.json()
      setSubjects(data)
    }

    getLecturers()
    getSubjects()
  }, [])

  return (
    <section className='p-2'>
    <article className='flex justify-between mb-2 gap-4 items-end'>
        <Breadcrumb
          aria-label="Breadcrumb par"
          className="bg-gray-200 px-5 py-3 flex-1 border-none dark:bg-[#212528]"
        >
            <Breadcrumb.Item icon={HiHome}><Link href={'/dashboard'} className='text-[#333333] dark:text-white hover:text-black hover:cursor-pointer'>Mi centro</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Profesorado</Breadcrumb.Item>
        </Breadcrumb>
    </article>
    <article className='flex gap-1 flex-wrap'>
    {lecturers?.map(lecturer => {
      const subHead = subjects.filter(subject => subject.head === lecturer.dni)
      return (
        <Card key={lecturer.key} className="">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {lecturer.name} {lecturer.surname} - {lecturer.dni}
        </h5>
        <div className='flex gap-2'>
          {subHead.map(subject => <Kbd key={subject.id}>{subject.name}</Kbd>)}
        </div>
      </Card>
      )
    })}
    </article>
    </section>
  )
}
