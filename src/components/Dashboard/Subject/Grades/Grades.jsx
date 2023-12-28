import { Link, useParams } from 'wouter'
import { useSubject } from '../../../../hooks/useSubject'
import CustomTable from './CustomTable'
import { useStateStore } from '../../../../store'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import AddNew from './AddNew'
import { useEffect, useState } from 'react'

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

export default function Grades () {
  const { id } = useParams()
  const { subject } = useSubject(id)
  const [grades, setGrades] = useState([])
  const user = useStateStore((state) => state.user)

  const reloadPage = () => {
    window.location.reload(false)
  }

  useEffect(() => {
    if (JSON.stringify(subject) === '{}') return
    let result = subject.grades
    if (user.role === 'student') result = subject.grades.filter(grade => grade.student === user.dni)

    const getGrades = async () => {
      const fetchedGrades = await Promise.all(result.map(async (grade) => {
        const user = await fetch(`http://localhost:8080/users/${grade.student}`).then(res => res.status === 200 ? res.json() : undefined)
        return { ...grade, student: `${user.name} ${user.surname}` }
      }))
      setGrades(fetchedGrades)
    }

    getGrades()
  }, [subject])

  return (
    <>
      <section className='flex justify-between mb-2 gap-4 items-end'>
        <Breadcrumb
          aria-label="Breadcrumb par"
          className="bg-gray-200 px-5 py-3 dark:bg-gray-800 flex-1 border-none"
          theme={customTheme}
        >
            <Breadcrumb.Item icon={HiHome}><Link href={`/dashboard/${id}`} className='hover:text-black dark:hover:text-white'>{subject.name}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Notas</Breadcrumb.Item>
        </Breadcrumb>
        {user.role !== 'student' && <AddNew subjectId={id} onCreate={() => reloadPage()}/>}
      </section>
      {grades.length >= 0 && <CustomTable data={grades} />}
    </>
  )
}
