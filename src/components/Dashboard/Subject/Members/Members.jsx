import { useEffect, useState } from 'react'
import { useSubject } from '../../../../hooks/useSubject'
import { Link, useParams } from 'wouter'
import StudentCard from './StudentCard'
import { Breadcrumb } from 'flowbite-react'
import { useStateStore } from '../../../../store'
import AddNew from './AddNew'
import { HiHome } from 'react-icons/hi'

const customTheme = {
  root: {
    base: '',
    list: 'flex items-center'
  },
  item: {
    base: 'group flex items-center',
    chevron: 'mx-1 h-4 w-4 text-gray-400 group-first:hidden md:mx-2',
    href: {
      off: 'flex items-center text-sm font-medium text-gray-500 dark:text-gray-400',
      on: 'flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
    },
    icon: 'mr-2 h-4 w-4'
  }
}

export default function Members () {
  const { id } = useParams()
  const { subject } = useSubject(id)
  const [members, setMembers] = useState([])
  const user = useStateStore((state) => state.user)

  useEffect(() => {
    if (JSON.stringify(subject) === '{}') return

    const getMembers = async () => {
      const fetchedNews = await Promise.all(subject.members.map(async (dni) => {
        const user = await fetch(`http://localhost:8080/users/${dni}`).then(res => res.status === 200 ? res.json() : undefined)
        delete user.password
        delete user.role
        return user
      }))
      setMembers(fetchedNews)
    }

    getMembers()
  }, [subject])

  const reloadPage = () => {
    window.location.reload(false)
  }

  return (
    <>
    <section className='flex justify-between mb-2 gap-4 items-end'>
        <Breadcrumb
          aria-label="Breadcrumb par"
          className="bg-gray-200 px-5 py-3 dark:bg-gray-800 flex-1 border-none"
          theme={customTheme}
        >
            <Breadcrumb.Item icon={HiHome}><Link href={`/dashboard/${id}`} className='hover:text-black dark:hover:text-white'>{subject.name}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Miembros</Breadcrumb.Item>
        </Breadcrumb>
        {user.role === 'manager' && <AddNew subjectId={id} onCreate={() => reloadPage()} members={members}/>}
      </section>
      <section className='flex gap-1 flex-wrap'>
      {members?.map(member => (<StudentCard key={member.id} data={member}/>))}
      </section>
    </>
  )
}
