import { Breadcrumb } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'wouter'
import { useSubject } from '../../hooks/useSubject'
import { useStateStore } from '../../store'
import AddNew from './Subject/News/AddNew'
import CustomTable from './Subject/News/CustomTable'
import AddSubject from './AddSubject'
import AddUser from './AddUser'

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

export default function SchoolSite () {
  const [news, setNews] = useState([])
  const { subject } = useSubject('site')
  const user = useStateStore((state) => state.user)

  useEffect(() => {
    if (JSON.stringify(subject) === '{}') return

    const getNews = async () => {
      const fetchedNews = await Promise.all(subject.news.map(async (news) => {
        const user = await fetch(`http://localhost:8080/users/${news.author}`).then(res => res.status === 200 ? res.json() : undefined)
        return { ...news, author: `${user.name} ${user.surname}` }
      }))
      setNews(fetchedNews)
    }

    getNews()
  }, [subject])

  const reloadPage = () => {
    window.location.reload(false)
  }

  return (
    <section className='p-1'>
      <header className='flex justify-between mb-2 gap-4 items-end'>
        <Breadcrumb
          aria-label="Breadcrumb par"
          className="bg-gray-200 px-5 py-3 dark:bg-gray-800 flex-1 border-none"
          theme={customTheme}
        >
            <Breadcrumb.Item icon={HiHome}><Link href={'/dashboard'} className='hover:text-black dark:hover:text-white'>{subject.name}</Link></Breadcrumb.Item>
        </Breadcrumb>
        {user.role === 'manager' && <AddSubject onCreate={() => reloadPage()}/>}
        {user.role === 'manager' && <AddUser onCreate={() => reloadPage()}/>}
        {user.role === 'manager' && <AddNew subjectId={'site'} onCreate={() => reloadPage()}/>}
      </header>
      <body>
        {news.length > 0 && <CustomTable data={news} />}
      </body>
    </section>
  )
}
