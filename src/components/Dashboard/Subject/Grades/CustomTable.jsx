import { Table } from 'flowbite-react'
import { useStateStore } from '../../../../store'

const customTheme = {
  root: {
    base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 border dark:border-none',
    shadow: 'absolute bg-white dark:bg-black w-full h-full top-0 left-0 drop-shadow-md -z-10',
    wrapper: 'relative'
  },
  body: {
    base: 'group/body',
    cell: {
      base: ' px-6 py-4'
    }
  },
  head: {
    base: 'group/head text-xs uppercase text-gray-700 dark:text-gray-400',
    cell: {
      base: 'bg-gray-50 dark:bg-gray-700 px-6 py-3'
    }
  },
  row: {
    base: 'group/row',
    hovered: 'hover:bg-gray-50 dark:hover:bg-gray-600',
    striped: 'odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'
  }
}
export default function CustomTable ({ data }) {
  const user = useStateStore((state) => state.user)

  return (
    <div className="overflow-auto">
      <Table theme={customTheme}>
        <Table.Head>
          <Table.HeadCell>Título</Table.HeadCell>
          <Table.HeadCell>Nota</Table.HeadCell>
          { user.role !== 'student' && <Table.HeadCell>Estudiante</Table.HeadCell>}
          <Table.HeadCell>Fecha</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((d) => (
            <Table.Row key={d.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {d.title}
              </Table.Cell>
              <Table.Cell className='text-gray-800 dark:text-gray-300'>{d.grade}</Table.Cell>
              { user.role !== 'student' && <Table.Cell className='text-gray-800 dark:text-gray-300'>{d.student}</Table.Cell>}
              <Table.Cell className='text-gray-800 dark:text-gray-300'>{(new Date(Number(d.created))).toLocaleString('es')}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
