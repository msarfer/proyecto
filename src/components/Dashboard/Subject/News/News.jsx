import { Link, useParams } from 'wouter'
import { useSubject } from '../../../../hooks/useSubject'
import CustomTable from './CustomTable'
import { useStateStore } from '../../../../store'
import { Breadcrumb, Button } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'

export default function News () {
  const { id } = useParams()
  const { subject } = useSubject(id)
  const user = useStateStore((state) => state.user)
  return (
    <>
      <Breadcrumb
        aria-label="Breadcrumb par "
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800 mb-2"
      >
          <Breadcrumb.Item icon={HiHome}><Link href={`/dashboard/${id}`} className='hover:text-black dark:hover:text-white'>{subject.name}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Noticias</Breadcrumb.Item>
          {user.role !== 'student' && <header className='bg-red-50 flex justify-end'> <Button color='red' size='xs' className='rounded-none'>Añadir noticias</Button></header>}
      </Breadcrumb>
      {subject.news && <CustomTable data={subject.news} />}
    </>
  )
}
